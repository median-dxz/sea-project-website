# 教程：策略，对战和关卡

## 概述

SEA 框架使用一个三层模型来表述自动战斗:

> Level -> Battle -> Strategy

可以看到，这个模型包含 3 个层次：`Level`，`Battle`和`Strategy`，描述了 SEA 的执行器应该如何执行自动战斗。

- `Level`（关卡层）是最高级的层，它描述了一个**关卡**如何执行。在后面可以看到，一个`Level`层的实体可能通过`selectLevelBattle`方法动态绑定不同的`Battle`层实体。

- `Battle`（对战层）负责**对战准备**，`Level`层实体可以自行处理非战斗部分的收发包，但是*动作列表*中如果有进入对战的*动作*，那么就需要调用`Battle`实体进行处理。`Battle`层实体仍然没有描述对战的出招细节。一个`Battle`层实体只能绑定唯一的`Strategy`层实体。

- `Strategy`（策略层）负责对战中的具体**出招**。其详细描述了每一轮（Round）应该如何行动。

<details>
    <summary>扩展阅读</summary>

`Battle`和`Strategy`的 API 正在向声明式迭代，但是目前仍偏向使用命令式的 API 进行编写。

看完上面的描述后，你可能会问的一个问题是：为什么要将`Battle`和`Strategy`解耦？这个问题主要有两方面考虑：

1. `Battle`实体有一个非常重要的字段：**玩家的阵容**。虽然阵容和出招之间大多数时候是一一对应的关系，但是通过将二者解绑，我们可以更灵活的将**不同玩家的阵容**（由于不同玩家的精灵池不同）绑定到**相同的策略**上，从而省去了由于精灵差异造成的多种重复策略编写。一个常见的例子是：编写一个通用的弹伤策略，然后将不同的弹伤阵容绑定到这个策略上。这比编写针对多个变种阵容的策略要方便。

2. `Battle`实体中的玩家阵容需要在 SEAL 中通过 ct 表转换为玩家的精灵 ct，因此将二者分开有利于保持不同实体职能的单一性。

</details>

## 关卡运行器

本小节对介绍如何编写*关卡运行器*，即`LevelRunner`，*关卡运行器*实现了上述三层模型中的`Level`层。

要编写*关卡运行器*，首先需要对关卡进行建模，关卡使用的思维模型是**状态机**，你应该以状态机的视角来建模赛尔号中的关卡。

在`Level`这一层次，SEAC 的执行器会不断执行一个基本循环：获取关卡信息 -> 决定下一个动作 -> 执行该动作 -> 重新获取关卡信息。

而关卡运行器需要提供的就是如何更新关卡的状态合集、动作列表以及每个动作对应的收发包。在这一层不涉及对战相关的细节，常用的辅助 API 均为收发包。

让我们以精灵因子为例，思考如何编写一个简化版的精灵因子关卡，其完整版代码可以参见主仓库的`packages\launcher\src\builtin\petFragment\index.ts`。

### 导出关卡

首先，来看一下如何从模组中导出一个关卡：

```ts
import { task } from "@sea/mod-type";

export default function ({ battle, logger }: SEAModContext<typeof metadata>) {
  const taskMetadata = {
    name: "精灵因子",
    id: PET_FRAGMENT_LEVEL_ID,
  };

  const tasks = [
    task({
      metadata: taskMetadata,
      runner() {
        return {
          // PetFragmentRunner的定义
        };
      },
    }),
  ];

  return {
    tasks,
  } as SEAModExport;
}
```

可以看到，mod 可以导出一个`tasks`数组，其中的元素使用`task`辅助函数定义。

<details>
    <summary>扩展阅读</summary>

之所以用更通用的*task*命名，是因为关卡可以不进入战斗，这样可以将签到等也归类为广义上的*关卡*。参考`sdk\mods\median\sign\daily.ts`

该`task`函数并无实际作用，仅仅是为了更好类型提示。

</details>

你需要向`task`函数传递一个满足`Task`接口的任务配置对象（类型已简化）：

```ts
export interface Task<
  TSchema extends SEAConfigSchema | undefined = undefined,
  TData extends LevelData,
  TActions extends string = string
> {
  readonly metadata: { id: string; name: string };
  readonly configSchema?: TSchema;
  runner(options: TSchema): LevelRunner<TData>;
}
```

你需要声明`metadata`对象和`runner`函数。`configSchema`是可选的，当关卡需要通过 SEAL 的配置接口动态传入配置时使用。

> 关于`configSchema`的定义和使用，请参阅（还没写）。

#### metadata

`metadata`对象有两个字段：

- `name`（必填）：task 在自动执行界面展示的名称。
- `id`（必填）：task 在 SEAL 内部使用的名称。该名称会和模组的 scope 以及 id 复合，因此只需要保证同一个模组内的 id 不重复即可。

#### runner

`runner`函数用于组装真正的*关卡运行器*。你需要返回一个满足`LevelRunner`接口的对象。

### 实现一个关卡运行器

接下来需要组装一个*关卡运行器*对象作为`runner`函数的返回值。`LevelRunner`接口的定义如下：

```ts
/** 关卡的动态数据 */
export interface LevelData {
  /** 当日最大次数 */
  maxTimes: number;
  /** 剩余的每日次数 */
  remainingTimes: number;
  /** 当前次数下的进度 */
  progress: number;
}

/** 关卡状态机, 由LevelManager来运行 */
export interface LevelRunner<TData extends LevelData> {
  data: TData;
  /** 更新关卡动态数据 */
  update(): Promise<void>;
  /** 获取下一个动作 */
  next(): string;
  /** 选择对战模型 */
  selectLevelBattle?(): LevelBattle;

  logger: AnyFunction;

  /** 关卡能做出的动作 */
  actions: Record<string, () => Promise<void> | void> & ThisType<LevelRunner>;
}
```

<details>
    <summary>关于`logger`字段</summary>

`logger`字段一般传递空函数`NOOP`或者直接使用模组上下文自带的 logger，例如：

```ts
export default function ({ logger, battle }: SEAModContext<typeof metadata>) {
  const myTask = task({
    metadata: taskMetadata,
    runner(options: never) {
      return {
        // 其他字段和方法...
        logger,
      };
    },
  });
}

// 或者
import { NOOP } from "@sea/core";

export default function ({ battle }: SEAModContext<typeof metadata>) {
  const myTask = task({
    metadata: taskMetadata,
    runner(options: never) {
      return {
        // 其他字段和方法...
        logger: NOOP, // () => {}
      };
    },
  });
}
```

</details>

回顾一下状态机的执行过程，这个执行过程贯穿关卡编写的始终：

> 获取关卡信息 -> 决定下一个动作 -> 执行该动作 -> 重新获取关卡信息

SEA 框架将这个过程中的每步进行了严格的区分，以一种固执己见的方式将异步计算/同步计算/副作用分割开来。

你可以在下面的教程中看到：获取关卡信息这一步应该严格的进行*服务端读*和*本地计算*，决定下一个动作时必须是严格的*本地逻辑判断*，执行动作时则进行存粹的*服务端副作用*。

这样有助于心智模型的简化和思考，同时可以防止一些常见的状态管理陷阱。

### 定义关卡信息

什么是关卡信息？关卡信息就是`LevelData`，关卡的*当前状态*和*静态信息*的**总和**，状态机的所有决策都应该基于`LevelData`。*静态信息*描述的是关卡自带的一些属性，而*当前状态*则会随着关卡的更新不断变动。所有关卡共有的关卡信息有：

- maxTimes（静态）：关卡每天可以挑战多少次，例如勇者之塔一天可以打五次，闪皮挑战一天可以打两次。
- remainingTimes（动态）：剩余的每日次数，如果获取到的是已经完成的挑战次数，一般和`maxTimes`做差来得到`remainingTimes`。
- progress（动态）：用以 SEAL 显示关卡的单次挑战进度。

为了描述关卡状态，一般需要扩展`LevelData`接口，精灵因子关卡的状态描述如下：

```ts
export interface PetFragmentLevelData extends LevelData {
  piecesOwned: number; // 玩家当前拥有的因子数量
  isChallenge: boolean; // 是否正在挑战中
  curDifficulty: Difficulty; // 当前难度，isChallenge才有意义
  failedTimes: number; // 以及失败次数
  curPosition: number; // 当前位置，即挑战到第几个BOSS
  canSweep: boolean; // 目标难度是否可以扫荡
  // 静态信息
  id: number; // 目标关卡id
  difficulty: 1 | 2 | 3; // 难度
  sweep: boolean; // 是否扫荡
  battle: string[]; // 对战实体列表
}

task({
  metadata: taskMetadata,
  runner(options: never) {
    let pfId: number; // 设置为你想要执行的任意因子Id
    return {
      // 使用 as 进行类型转换
      // 一是初始化的时候只给出静态信息较为方便
      // 二是为了类型推导
      data: {
        maxTimes: 3,
        id: pfId,
        difficulty: 1,
        sweep: false,
        battle: ["battle1", "battle2", "battle3", "battle4", "battle5"],
      } as PetFragmentLevelData,
    };
  },
});
```

<details>
    <summary>扩展阅读</summary>

对于实际的`PetFragmentLevelRunner`实现，上面的静态信息将通过 SEAL 动态注入到 options 中。

像这种需要玩家配置的选项，一般是通过`configSchema`定义，然后在 runner 函数中通过`options`参数获取来使用。

可以参见`sdk\mods\median\realm`中的关卡。

</details>

### 获取/更新关卡信息

下一步是告诉执行器如何更新关卡信息。显然，只需要更新`LevelData`中的动态部分。

```ts
task({
  metadata: taskMetadata,
  runner(options: never) {
    let pfId: number;
    const allLevelObj = config.xml.getAnyRes("new_super_design").Root.Design;
    const level = new PetFragmentLevel(
      allLevelObj.find((level) => level.ID === pfId)
    );

    return {
      async update() {
        const { data } = this;
        // 步骤一：批量查询 multiValues 和各种数据
        const values = await socket.multiValue(
          level.values.openTimes,
          level.values.failTimes,
          level.values.progress,
          level.values.gain
        );

        data.piecesOwned = await engine.itemNum(level.petFragment.itemId);

        // 步骤二：设置需要进一步获得的计算属性
        data.remainingTimes = data.maxTimes - values[0];
        data.failedTimes = values[1];
        data.curDifficulty = (values[2] >> 8) & 255;
        data.curPosition = values[2] >> 16;
        data.isChallenge =
          data.curDifficulty !== Difficulty.NotSelected &&
          data.curPosition !== 0;
        data.progress = (data.curPosition / 5) * 100;

        data.canSweep = false;
        if (data.curDifficulty === Difficulty.NotSelected) {
          data.canSweep = Boolean(
            (values[3] >> (4 + this.data.difficulty)) & 1
          );
        }
      },
    };
  },
});
```

需要注意的是，`update`函数会在每次状态更新过程中被调用，并且不会区分上一次的动作是什么。这是 SEA 架构的设计理念：你应该**始终在且只在**`update`中更新关卡的状态，而且是一次性更新**所有的状态**。

**此外尤其要注意的是：不要在`update`中进行服务端副作用，`update`应该仅仅读取服务端状态，而不进行任何变异。**

### 决定下一个动作

状态更新后，你应该根据当前状态决定关卡的下一个动作，为此你需要编写*动作列表*和`next`函数。

首先需要定义*动作列表*，动作列表是一组使用字符串作为键的异步函数，所谓的动作就是执行一组收发包。

你可以从`@sea/core`中导入`LevelAction`对象，该对象包含保留的动作键名，目前包含三个键：

- `LevelAction.BATTLE`
- `LevelAction.AWARD`
- `LevelAction.STOP`

其中，`LevelAction.BATTLE`用于进入战斗，`LevelAction.STOP`用于指示*关卡运行器*停止，`LevelAction.AWARD`和自定义键没有区别，只是约定为领取奖励时执行的动作。

对于精灵因子关卡，玩家可以执行的动作（收发包组）只有两个：

- `LevelAction.BATTLE`：进入对战
- "sweep"：扫荡

```ts
task({
  metadata: taskMetadata,
  runner(options: never) {
    return {
      actions: {
        sweep: async () => {
          await socket.sendByQueue(41283, [
            this.designId,
            4 + this.data.difficulty,
          ]);
          this.logger("执行一次扫荡");
        },
        [LevelAction.BATTLE]: async () => {
          // 在此编写进入战斗的逻辑...
        },
      },
    };
  },
});
```

上面的代码中有两点需要着重说明：

1. 动作函数的逻辑应该是纯发包。理论上，`next`函数会检查关卡状态来派发对应的动作，如果遇到了一个出错的情况导致*关卡运行器*无法正常运行，那么一般有两种选择：
   1. 在`action`函数中添加额外判断，如果出错则抛出*Error*，调度器会 catch 这个 Error 并强行终止*关卡运行器*。
   2. 添加一个`error`动作（可以是任意错误名称），在该动作内处理错误。
2. `LevelAction.BATTLE`键比较特殊，你在*动作列表*中定义的 BATTLE 动作实际上是作为参数传入`manager.takeover`中的。换而言之，这个动作的发包要保证可以**进入对战**。

目前的错误处理机制尚不完善，推荐使用第一种方法。

接下来是编写`next`函数，该函数应该根据关卡状态返回特定动作的保留键或者自定动作的键：

```ts
task({
  metadata: taskMetadata,
  runner(options: never) {
    return {
      next() {
        const { data } = this;

        if (data.isChallenge || data.remainingTimes > 0) {
          if (this.options.sweep) {
            return "sweep";
          } else {
            return LevelAction.BATTLE;
          }
        }

        return LevelAction.STOP;
      },
    };
  },
});
```

### 绑定对战模型

完成上述工作后，一个*关卡运行器*就差不多写好了，在此先简单回顾一下你需要编写的内容：

1. 编写模组的样板代码，使用`task`辅助函数定义你的关卡（或不带战斗的其他类型任务）。
2. 编写关卡运行器的样板代码，填充`metadata`字段和`runner`函数。
3. 定义关卡的状态和静态信息（高级一点还会用到用户自定义配置），并编写用于读取最新状态的`update`函数。
4. 定义关卡可以执行的动作列表（副作用列表），并编写根据当前状态获取下一个动作的`next`函数。

不过还有最后一个问题没有解决：关卡或者 SEAL 应该如何决定进入对战后使用的`Battle`层实体，即后面要介绍的*对战模型*？

回顾一下`LevelRunner`的接口定义，其中有一条是`selectLevelBattle?(): LevelBattle`。该函数用于决定进入对战时应该使用哪个`LevelBattle`，即对战模型。

固然，此时你可以直接构造一个`LevelBattle`返回，但是此处更推荐的做法是使用模组上下文提供的`battle`函数，从 SEAL 的对战模型注册表中获取对战模型名称对应的`LevelBattle`。

例如常见的一种做法是：

```ts
const configSchema = {
  battle: {
    name: "对战方案",
    type: "battle",
    default: "",
  },
} satisfies SEAConfigSchema;

task({
  metadata: taskMetadata,
  configSchema,
  runner(options) {
    return {
      selectLevelBattle() {
        return battle(options.battle);
      },
    };
  },
});
```

在上面的例子中，我们在`configSchema`声明了一个*battle*类型的配置项，这样一来，玩家就可以在 SEAL 中自由配置要使用的战斗模型。

总之，`selectLevelBattle`需要返回一个`LevelBattle`，且可以通过`battle`函数获取 SEAL 中注册的对战模型。对于使用`battle`函数的情况，常见的实践是在你的模组中导出一组对战模型，然后直接使用`battle`来使用这些对战模型。

## 对战模型

对战模型（`LevelBattle`）位于 SEA 框架提供的三层模型的第二层。正如一开始所说，该层负责的是对战的前置准备工作。

你可以在模组中导出一组对战模型，供用户或者你自己的模组使用。具体来说，你需要导出一组满足`Battle`接口约束的对象。

```ts
export interface Battle {
  name: string;
  strategy: string;
  pets: string[];
  beforeBattle?: () => Promise<void>;
}

export default function builtinBattle({
  ct,
}: SEAModContext<typeof metadata>): SEAModExport {
  const battles: Battle[] = [
    {
      name: "潘蒂表必先",
      pets: ["潘克多斯", "蒂朵", "帝皇之御", "魔钰", "月照星魂", "时空界皇"],
      beforeBattle: () =>
        engine.lowerHp(
          ct("潘克多斯", "蒂朵", "帝皇之御", "魔钰", "月照星魂", "时空界皇")
        ),
      strategy: "潘蒂表必先",
    },
  ];

  return {
    battles,
  };
}
```

对比一下之前在[关卡运行器](./strategy-and-level-battle.md#实现一个关卡运行器)小节中的`LevelBattle`接口，可以看到`Battle`接口的`strategy`字段类型是`string`，且需要一个`name`。可以理解为一个是模组导出的声明用接口，而另一个是 SEAC 内部的实现用接口。后面的`Strategy`和`MoveStrategy`同理。

### Battle.name

先来看`name`字段，为了将你的对战模型注册到 SEAL 中，你需要为对战模型提供一个名称。该名称**不会**和模组 id 以及 scope 复合，你需要确保名称的**全局唯一性**，否则后注册的模组中的同名对战模型会覆盖先注册的。

> 由于缺乏足够的用户反馈，此处冲突设计暂定如此，后面的行动策略（MoveStrategy）同理。

### Battle.pets

下一个比较好理解的字段是`pets`字段，pets 字段声明了该对战模型需要使用的精灵列表。玩家的背包会被严格调整为 pets 数组设置的内容。实际上，SEAC 会在内部对 pets 数组调用`engine.switchBag`方法：

```ts
/**
 * 切换背包
 * 若数组为空, 则清空背包, 若数组长度大于6, 则截断至前六个
 * 数组的第一个元素会被**设为首发**
 *
 * @param pets 要切换的精灵列表, 可以是ct或者Pet实例
 */
const switchBag: (pets: number[] | Pet[]) => Promise<void>;
```

此外需要注意的是 SEAL 会检查 pets 的合法性，具体的时机是在模组调用`battle`辅助函数的时候（常见场景是调用`LevelRunner`对象的`selectBattle`方法时），如果当前玩家的精灵池不够则会报错。

### Battle.beforeBattle

`beforeBattle`用于声明一个可选的异步函数，用于战斗前的准备，常见用例有：

- 给精灵使用道具
- 更换套装/称号/目镜
- 压血

下面是一个典型的`beforeBattle`函数：

```ts
const battle = {
  beforeBattle: async () => {
    const pet = ct("武心婵")[0];
    await engine.lowerHp(ct("茉蕊儿", "神寂·克罗诺斯"));
    await spet(pet).cure().useItem(300697).done; // 全面提升药剂
    await engine.changeSuit(448); // 漆黑天使
    await engine.changeTitle(418); // 音浪袭来
    await engine.changeEquipment("eye", 1300874); // 魔界之风
  },
};
```

与`battle`辅助函数类似，你可以使用模组上下文的`ct`函数来动态获取当前玩家的对应精灵的 ct。

在`beforeBattle`中可以自由使用[`engine`](../core-api-reference/engine.md)和[`spet`](../core-api-reference/pet-helper.md)提供的操作，或手动进行发包。

### Battle.stategy

最后是`stategy`字段，用于绑定行动策略，即策略层的实体。每个对战模型只能绑定唯一的一个行动策略。

## 行动策略

行动策略（`MoveStrategy`）位于 SEA 框架提供的三层模型的第三层，用于对战内的具体行动逻辑。这一层和传统的出招脚本最为接近，但在 api 设计上有着本质的不同。

### 导出策略

和`Battle`以及`Task`一样，*行动策略*同样需要在你的模组中导出。此外，和`Battle`一致，导出策略的时候必须要指定一个**全局唯一的策略名**。该策略名可以在**对战模型**中进行绑定。

```ts
export type Strategy = MoveStrategy & {
  name: string;
};

export interface MoveStrategy {
  resolveNoBlood: MoveHandler;
  resolveMove: MoveHandler;
}

export default function builtinStrategy(
  context: SEAModContext<typeof metadata>
): SEAModExport {
  const strategies: Strategy[] = [
    {
      name: "圣谱单挑",
      resolveMove: (state, skills, pets) =>
        battle.executor.useSkill(
          match(state, skills, pets)(rotating("光荣之梦", "神灵救世光"))
        ),
      resolveNoBlood: auto.noBlood(),
    },
  ];

  return {
    strategies,
  };
}
```

为了编写一个*行动策略*，你需要声明两个函数：`resolveMove`和`resolveNoBlood`，分别用于描述回合内的行动和死切回合的**切精灵**逻辑。

首先认识一下编写这两个函数用到的相关类型：

```ts
export type MoveHandler = (
  battleState: RoundData,
  skills: Skill[],
  pets: Pet[]
) => Promise<boolean>;

export interface MoveStrategy {
  resolveNoBlood: MoveHandler;
  resolveMove: MoveHandler;
}

export type Matcher = (...args: Parameters<MoveHandler>) => number | undefined;
```

可以看到，这两个函数的签名都是`MoveHandler`，编写`MoveHandler`的思路很简单，你可以在里面通过`@sea/core`导入的`battle.executor`进行单回合的操作，而操作所需的决策信息都通过参数传递。

最终你需要返回一个 boolean 值来告诉关卡执行器回合操作是否成功，以便进行 fallback 和出错处理。而`battle.executor`正好满足返回布尔值的需求。例如：

```ts
async (state, skills, pets) => {
  const enemyHp = state.other.hp;
  if (Math.trunc((enemyHp.max - enemyHp.remain) * 0.2) - 1 > enemyHp.remain) {
    return battle.executor.useSkill(
      match(state, skills, pets)(name("希望圣歌"))
    );
  }
  return battle.executor.useItem(PotionId.中级活力药剂);
};
```

下面开始*行动策略*编写的深入讲解。

### 自动策略

对于简单的情况，其实没有必要手动编写策略，直接使用`strategy`明明空间下的 auto 策略对象即可。

以下是灵巢之主地狱因子第二关的行动策略：

```ts
import { strategy as sg } from "@sea/core";

const { name, rotating, auto, round, match } = sg;
const strategies: Strategy[] = [
  {
    name: "lczz2",
    resolveMove: auto.move([
      "星·灿漫群芳",
      "幻梦芳逝",
      "诸界混一击",
      "梦境残缺",
      "月下华尔兹",
      "守御八方",
    ]),
    resolveNoBlood: auto.noBlood([
      "西塔伦",
      "蒂朵",
      "帝皇之御",
      "魔钰",
      "月照星魂",
      "时空界皇",
    ]),
  },
];
```

使用`auto.move`编写出招，使用`auto.noBlood`编写死切顺序，二者会自动构造并返回对应的`MoveHandler`。

`auto.move`构造出来的`MoveHandler`会从上到下检索技能名称数组，依次尝试匹配出招，有匹配的技能则自动使用。`auto.noBlood`则会检测死切回合的精灵，并自动检索数组中对应的下一只精灵尝试死切。

对`auto.noBlood`举一个简单的例子，比如这一轮死切的精灵是*帝皇之御*，那么`auto.noBlood`返回的`MoveHandler`就会遍历参数，找到帝皇之御**第一次**出现的下标，加一后得到要切换的精灵名称是*魔钰*。然后尝试找到存活精灵中的第一只魔钰，进行切换。

### MoveHandler 基础

下面介绍`MoveHandler`的编写。

首先，你需要在`MoveHandler`中使用`battle.executor`进行回合内操作。`executor`对象目前支持如下操作：

```ts
export const executor = {
  auto,
  useSkill,
  escape,
  useItem,
  switchPet,
};
```

请注意每回合只能进行唯一的有效操作，而每个操作都返回一个`Promise<boolean>`，因此一个基本的`MoveHandler`结构可以举例如下：

```ts
async (state, skills, pets) => {
  if (someCondition1) {
    return battle.executor.useSkill(skillId);
  } else if (someCondition2) {
    return battle.executor.useItem(ItemId);
  } else {
    return battle.auto();
  }
};
```

需要注意：

1. 目前 SEAC 和 SEAL 都不支持直接的 fallback（回退）功能，因此你应该尽量在自己的`MoveHandler`自行处理所有的情况。

2. 你不应该指望操作的发包报错，而应该提前自行考虑可能的非法情况。

上面两点总结一下，就是对于出错处理，除非你阅读并理解了 SEAC 中关于`battle.manager`对行动策略的处理逻辑，以及`battle.executor`是如何封装发包的，否则应该尽量在`MoveHandler`中考虑清楚执行操作的相关条件。

例如最基础的，如果是站场脚本，你应该考虑 pp 耗空的情况并手动处理。

#### executor.auto

该操作对应的是原本客户端的超时空过，即在有技能 pp 的时候自动使用，所有技能没有都 pp 时进行空过。

> 目前版本暂不支持直接空过操作，建议使用磕 pp 药代替。

#### executor.useSkill

```ts
function useSkill(skillId?: number): Promise<boolean>;
```

传入*skillId*，使用技能。

#### executor.escape

退出对战，即逃跑。

#### executor.useItem

```ts
function useItem(itemId?: number): Promise<boolean>;
```

使用物品。常见对局用药剂 id 常量可以通过`PotionId`对象使用。

#### executor.switchPet

```ts
function switchPet(index?: number): Promise<boolean>;
```

切精灵，index 是精灵的出战顺位（后面会解释如何获取 index）。

### MoveHandler 上下文

回顾一下`MoveHandler`的签名：

```ts
export type MoveHandler = (
  battleState: RoundData,
  skills: Skill[],
  pets: Pet[]
) => Promise<boolean>;
```

这些参数就是`battle.manager`传递给`MoveHandler`的上下文信息。你的决策判断应该基于这三个参数。相关的类型较为复杂，建议自行在 IDE 中通过 ts 的类型提示查阅。这里着重强调两个属性：

- `battleState.isSwitchNoBlood`：指明了当前回合是否是一个死切回合。
- `pets`：其数组中的精灵顺序就是执行`executor.switchPet`时需要的 index 参数。

### 策略算子

通过上下文和执行器 API，你已经可以命令式的编写你的对局策略了。但是为了`MoveHandler`的 API 具有更大的潜力（纯画饼），SEAC 提供了一套基于组合式 API 的策略编写函数，这些函数被称为*策略算子*。*策略算子*全都是**纯函数**，可以使用策略算子的组合实现对战逻辑。

从`@sea/core`中导入`strategy`，*策略算子*都在该命名空间下。

### MoveHandler 编写实战

本节将通过一组例子，带你在实际应用中综合以上知识编写`MoveHandler`，并着重介绍*策略算子*的使用。

假设现在要编写一组策略，用于灵巢之主地狱因子的 1~5 关。

第一关的策略用文字描述如下：

> 高热/冰冷千裳战场，等 boss 血量进技能“希望圣歌”的斩杀线时，使用技能斩杀。

下面来看实现：

```ts
import { PotionId, battle, strategy as sg } from "@sea/core";
const { name, rotating, auto, round, match } = sg;

const sgs: Strategy[] = [
  {
    name: "lczz1",
    resolveMove: async (state, skills, pets) => {
      const enemyHp = state.other.hp;
      if (
        Math.trunc((enemyHp.max - enemyHp.remain) * 0.2) - 1 >
        enemyHp.remain
      ) {
        return battle.executor.useSkill(
          match(state, skills, pets)(name("希望圣歌"))
        );
      }
      return battle.executor.useItem(PotionId.中级活力药剂);
    },
    resolveNoBlood: auto.noBlood(),
  },
];
```

根据我们上面的所学，`MoveHandler`的基本编写思路可以概况为：
从上下文获取条件 -> 判断条件 -> 获取对战操作需要的参数 -> 执行对战操作并返回

可以看到，上面的代码也是遵循这样的思路。首先需要判断 boss 血量是否进了斩杀线，否则进行站场嗑药。
这里使用`state.other.hp`获取 boss 的血量 Object，通过`enemyHp.max`和`enemyHp.remain`进行计算，判断 boss 血量是否低于最大血量的 20%。

然后重点来了，算子中提供了 match 函数用于将 api 的启动。
具体来说就是上面的`match(state, skills, pets)(name("希望圣歌")`这句。

算子的编写模式就是先使用 match 函数传入`state`、`skills`和`pets`，然后在返回的函数中填入一组策略算子作为参数。同组的策略算子会从前到后匹配，返回首次匹配成功的值。

> 目前的策略算子只支持切换精灵和使用技能两种操作，未来可能将其他操作统一到策略算子中。

在这里，我们使用`name`算子来匹配技能名称。在不使用算子的情况下，要根据名称使用一个技能大概类似这样：

```ts
battle.executor.useSkill(skills.find((s) => s.name === "虚假之忆"));
```

你可能会觉得这也没简化多少，但是且慢，`name`算子实际上可以接受一组技能名称作为参数，从左向右匹配。而且 name 内部还有额外的 pp 判断。这些*策略算子*封装了常见的处理，使模组作者可以专注于行动策略本身的逻辑上。

如果你去查看`auto.move`的实现就会发现，实际上它只是调用了`name`算子：

```ts
function move(skills?: string[]): MoveHandler {
  return async (state, allSkills, pets) => {
    let r = false;
    if (skills) {
      r = await executor.useSkill(
        match(state, allSkills, pets)(name(...skills))
      );
    }
    !r && (await executor.auto());
    return Promise.resolve(true);
  };
}
```

第二关使用西蒂表必先，可以直接使用自动策略：

```ts
const sgs = [
  {
    name: "lczz2",
    resolveMove: auto.move([
      "星·灿漫群芳",
      "幻梦芳逝",
      "诸界混一击",
      "梦境残缺",
      "月下华尔兹",
      "守御八方",
    ]),
    resolveNoBlood: auto.noBlood([
      "西塔伦",
      "蒂朵",
      "帝皇之御",
      "魔钰",
      "月照星魂",
      "时空界皇",
    ]),
  },
];
```

第三关使用奇镰解放单撸，和第二关情况类似。而第四关和第五关的编写思路类似，因此下面直接进入最复杂的第五关。

同样，我们还是先将出招逻辑用文字描述：

> 使用双切手法给婵套上小草王的盾和克罗减伤，然后点出梦示。之后对点攻击技能，没 pp 补 pp，梦示回合效果快结束时补上梦示。

这应该算是 PVE 的常见出招思路中最复杂的一种情况。这里直接结合实现，在注释中讲解：

```ts
// 这里混用了算子 API 和原有的命令式写法，主要还是因为算子 API 不够完善。
const sgs = [
  {
    name: "lczz5",
    resolveMove: async (state, skills, pets) => {
      const pet_神寂_克罗诺斯 = pets.find(
        (pet) => pet.name === "神寂·克罗诺斯"
      );
      // 为了实现双切，需要在死切的行动回合切人
      // 注意上文提到的，应该尽量检查好操作所需的各个条件
      // 这样你的策略才能更为通用，拥有更高的容错性
      if (
        state.isSwitchNoBlood &&
        pet_神寂_克罗诺斯 &&
        pet_神寂_克罗诺斯.hp > 0
      ) {
        return battle.executor.switchPet(pets.indexOf(pet_神寂_克罗诺斯)); // 双切
      }
      const skill_瓏灵_绯 = skills.find((skill) => skill.name === "瓏灵·绯");
      if (skill_瓏灵_绯) {
        // 这里使用了rotating算子，该算子会创建一个内部计数器，用于循环选取列出的技能
        // 其实就是实现了技能对点，同样地，这里也有额外的pp判断逻辑。对于没有pp的技能会进行跳过
        // match返回一个包含当前上下文的匹配器
        // 向匹配器输入一组算子，输出的就是算子匹配的结果，即选中的技能id
        const r = sg.match(
          state,
          skills,
          pets
        )(rotating("梦示", "瓏灵·绯", "瓏灵·绯", "瓏啸·绛"));
        // 如果瓏灵·绯没有pp且当前回合要使用瓏啸·绛，此时必须补pp
        if (
          skill_瓏灵_绯.pp === 0 &&
          r === skills.find((skill) => skill.name === "瓏啸·绛")?.id
        ) {
          // resetCount不是算子，而是算子的辅助函数，用于重置对点算子的内部计数器
          sg.resetCount("梦示", "瓏灵·绯", "瓏灵·绯", "瓏啸·绛");
          return battle.executor.useItem(PotionId.中级活力药剂);
        } else {
          return battle.executor.useSkill(r);
        }
      } else {
        return battle.executor.auto();
      }
    },
    // 对于双切，你需要先考虑清楚死切的顺序：
    // 在小草王送掉后，切武心婵，再马上切克罗
    // 从顺序上来说，只需要保证婵跟在其他两只精灵后面就能达到目的
    resolveNoBlood: auto.noBlood([
      "茉蕊儿",
      "武心婵",
      "神寂·克罗诺斯",
      "武心婵",
    ]),
  },
];
```

> 是的，js/ts 支持中文变量名，或者说变量名支持 utf8 字符集。

最后，再来看一个勇者之塔的例子，体会一下策略算子 API 的简洁和强大：

```ts
const sgs = [
  {
    name: "LevelCourageTower",
    async resolveMove(state, skills, pets) {
      const matcher = match(state, skills, pets);
      const r = await battle.executor.useSkill(
        matcher(
          name("竭血残蝶", "时空牵绊"),
          rotating("光荣之梦", "神灵救世光"),
          rotating("龙子诞生", "王·龙子盛威决"),
          rotating("狂龙击杀", "王·龙战八荒")
        )
      );
      if (!r) battle.executor.auto();
      return true;
    },
    resolveNoBlood: auto.noBlood(["幻影蝶", "王之哈莫", "蒂朵"]),
  },
];
```

策略算子 API 仍在开发测试阶段，欢迎到我们的 DC 服务器获取帮助或者提出你的宝贵意见。
