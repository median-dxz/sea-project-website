"use strict";(self.webpackChunk_sea_website=self.webpackChunk_sea_website||[]).push([[3431],{4951:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>t,contentTitle:()=>i,default:()=>a,frontMatter:()=>c,metadata:()=>d,toc:()=>l});var o=r(5250),s=r(1456);const c={sidebar_position:2},i="Common \u6a21\u5757",d={id:"core-api-reference/common",title:"Common \u6a21\u5757",description:"\u4f60\u4f1a\u7528\u5230\u7684\uff01",source:"@site/docs/core-api-reference/common.md",sourceDirName:"core-api-reference",slug:"/core-api-reference/common",permalink:"/sea-project-website/docs/core-api-reference/common",draft:!1,unlisted:!1,editUrl:"https://github.com/median-dxz/seerh5-assistant/tree/master/website/docs/docs/core-api-reference/common.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u6838\u5fc3\u4e4b\u4e0b",permalink:"/sea-project-website/docs/core-api-reference/core-architecture"},next:{title:"Hook \u6559\u7a0b",permalink:"/sea-project-website/docs/core-api-reference/hook"}},t={},l=[{value:"hook \u76f8\u5173",id:"hook-\u76f8\u5173",level:2},{value:"hookFn",id:"hookfn",level:3},{value:"hookPrototype",id:"hookprototype",level:3},{value:"wrapper",id:"wrapper",level:3},{value:"restoreHookedFn",id:"restorehookedfn",level:3},{value:"experiment_hookConstructor",id:"experiment_hookconstructor",level:3},{value:"assertIsHookedFunction",id:"assertishookedfunction",level:3},{value:"assertIsWrappedFunction",id:"assertiswrappedfunction",level:3},{value:"\u5ef6\u65f6\u76f8\u5173",id:"\u5ef6\u65f6\u76f8\u5173",level:2},{value:"delay",id:"delay",level:3},{value:"debounce",id:"debounce",level:3},{value:"throttle",id:"throttle",level:3},{value:"\u5e38\u91cf",id:"\u5e38\u91cf",level:2},{value:"NOOP",id:"noop",level:3},{value:"\u5b9e\u7528\u7c7b\u578b",id:"\u5b9e\u7528\u7c7b\u578b",level:2},{value:"AnyFunction",id:"anyfunction",level:3},{value:"Constructor",id:"constructor",level:3},{value:"ValueOf",id:"valueof",level:3},{value:"WithClass",id:"withclass",level:3}];function h(e){const n={a:"a",admonition:"admonition",code:"code",del:"del",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"common-\u6a21\u5757",children:"Common \u6a21\u5757"}),"\n",(0,o.jsx)(n.p,{children:"\u4f60\u4f1a\u7528\u5230\u7684\uff01"}),"\n",(0,o.jsx)(n.h2,{id:"hook-\u76f8\u5173",children:"hook \u76f8\u5173"}),"\n",(0,o.jsxs)(n.p,{children:["\u76ee\u524d SEAC \u5185\u7f6e\u4e86\u4e24\u79cd\u76f8\u5bf9\u5b89\u5168\u7684 hook \u65b9\u5f0f\uff1a",(0,o.jsx)(n.code,{children:"wrapper"})," \u548c ",(0,o.jsx)(n.code,{children:"hookFn"})," \u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"hookfn",children:"hookFn"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function hookFn<T extends object, K extends keyof T>(target: T, funcName: K, override: HookFunction<T, K>): void;\r\n\r\ntype HookFunction<T extends object, K extends keyof T> = T[K] extends (...args: infer P) => infer R\r\n  ? (this: T, originalFunc: (...args: P) => R, ...args: P) => R\r\n  : never;\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u5c31\u5730\u4fee\u6539\u4e00\u4e2a\u51fd\u6570\u3002"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"window.fn = function fn(arg: string) {\r\n  return arg;\r\n};\r\n\r\nconst obj = {\r\n  fn: () => {\r\n    console.log('obj.fn');\r\n  },\r\n};\r\n\r\n// \u5fc5\u987b\u6307\u5b9a\u4e00\u4e2a\u6302\u8f7d\u5bf9\u8c61\r\nhook(window, 'fn', (f, arg) => {\r\n  // fully typed\r\n  console.log(arg);\r\n  return f(arg + '->hook');\r\n});\r\n\r\nhook(obj, 'fn', function () {\r\n  console.log(obj === this); // <- this\u6709\u7c7b\u578b\u63a8\u5bfc\uff01\r\n});\r\n\r\nfn('fn');\r\n// \u8f93\u51fa 'fn'\r\n// \u8fd4\u56de 'fn->hook'\r\n\r\nobj.fn();\r\n// \u4ec0\u4e48\u4e5f\u6ca1\u53d1\u751f\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u66ff\u6362\u6302\u8f7d\u5bf9\u8c61\u4e0a\u7684\u76ee\u6807\u51fd\u6570\u3002\u662f\u7ed9\u6e38\u620f\u6dfb\u52a0/\u79fb\u9664/\u4fee\u6539\u529f\u80fd\u7684\u7ec8\u6781\u624b\u6bb5\u3002\u4f60\u9700\u8981\u6307\u5b9a\u6302\u8f7d\u5bf9\u8c61\u548c\u51fd\u6570\u540d\u79f0\uff0c\u4ee5\u4fbf ",(0,o.jsx)(n.code,{children:"hookFn"})," \u5185\u90e8\u80fd\u8bb0\u5f55\u8db3\u591f\u7684\u4fe1\u606f\uff0c\u8fd9\u5c06\u5141\u8bb8\u4f60\uff1a"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u901a\u8fc7 ",(0,o.jsx)(n.code,{children:"restoreHookedFn"})," \u8fd8\u539f\u51fd\u6570"]}),"\n",(0,o.jsxs)(n.li,{children:["\u901a\u8fc7 ",(0,o.jsx)(n.code,{children:"assertIsWrappedFunction"})," \u548c ",(0,o.jsx)(n.code,{children:"assertIsHookedFunction"})," \u65ad\u8a00 hook \u7c7b\u578b"]}),"\n",(0,o.jsxs)(n.li,{children:["\u5bf9\u975e\u5e42\u7b49\u7684 ",(0,o.jsx)(n.code,{children:"wrapper"})," \u548c ",(0,o.jsx)(n.code,{children:"hookFn"})," \u8fdb\u884c\u7279\u6b8a\u5904\u7406"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u4f60\u9700\u8981\u4f20\u5165\u4e00\u4e2a\u51fd\u6570 ",(0,o.jsx)(n.code,{children:"override"})," \u6765\u66ff\u6362\u539f\u51fd\u6570\uff0c",(0,o.jsx)(n.code,{children:"override"}),"\u7684\u53c2\u6570\u5206\u4e24\u90e8\u5206\uff1a ",(0,o.jsx)(n.code,{children:"originalFunc"})," \u662f",(0,o.jsx)(n.strong,{children:"\u7ed1\u5b9a\u4e86\u6302\u8f7d\u5bf9\u8c61\u4f5c\u4e3a this"}),"\u7684\u539f\u51fd\u6570\uff0c\u540e\u9762\u8ddf\u7740\u7684\u662f\u539f\u51fd\u6570\u7684\u5165\u53c2\uff0c\u4f60\u53ef\u4ee5\u9009\u62e9\u4f7f\u7528\u5b83\u4eec\u6216\u5b8c\u5168\u5ffd\u7565\u3002"]}),"\n",(0,o.jsx)(n.p,{children:"\u4e00\u822c\u6765\u8bf4\uff0c\u4f60\u53ea\u4f1a\u5c06 hook \u5e94\u7528\u5728\u6e38\u620f\u66b4\u9732\u51fa\u6765\u7684\u5bf9\u8c61\u4e2d\uff0c\u6781\u7aef\u60c5\u51b5\u6709\u4e0b\u5217\u82e5\u5e72\u79cd\uff1a"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"\u76ee\u6807\u51fd\u6570\u662f\u4e00\u4e2a\u6784\u9020\u51fd\u6570"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u8fd9\u79cd\u60c5\u51b5\u4e0b ",(0,o.jsx)(n.code,{children:"hookFn"})," \u4e5f\u80fd\u751f\u6548\uff0c\u4f46\u662f\u5199\u8d77\u6765\u8f83\u4e3a\u9ebb\u70e6\uff0c\u800c\u4e14\u4f60\u7684 typescript \u7f16\u8bd1\u5668\u5c31\u4e0d\u4e50\u610f\u4e86\uff0c\u76ee\u524d\u53ef\u4ee5\u901a\u8fc7\u6700\u65b0\u7684\u5b9e\u9a8c\u6027 api ",(0,o.jsx)(n.a,{href:"#experiment_hookconstructor",children:"experiment_hookConstructor"})," \u89e3\u51b3\u3002"]}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsx)(n.li,{children:"\u76ee\u6807\u51fd\u6570\u5728\u9876\u7ea7\u4f5c\u7528\u57df"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u8bf4\u660e\u8fd9\u4e2a\u51fd\u6570\u88ab\u6302\u8f7d\u5728 ",(0,o.jsx)(n.code,{children:"globalThis"})," \u6216\u8005\u8bf4 ",(0,o.jsx)(n.code,{children:"window"})," \u4e0a\u4e86\uff0c\u56e0\u4e3a\u6e38\u620f\u4e2d\u7684\u6a21\u5757\u662f\u4f7f\u7528 IIFE \u52a0\u8f7d\u7684\u3002"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"\u76ee\u6807\u51fd\u6570\u662f\u4e00\u4e2a getter"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5305\u62ec\u4e0b\u9762\u7684 ",(0,o.jsx)(n.code,{children:"wrapper"}),"\uff0c\u6682\u65f6\u4e0d\u652f\u6301\u8fd9\u79cd\u7279\u6b8a\u60c5\u51b5\uff0c\u4f60\u53ef\u4ee5\u9009\u62e9\u76f4\u63a5\u4fee\u6539\u8fd9\u4e2a getter\uff0c\u6216\u8005\u63d0\u4e00\u4e2a ",(0,o.jsx)(n.strong,{children:"issue"})," \u6765\u8ba8\u8bba\u8fd9\u79cd\u60c5\u51b5\u3002"]}),"\n",(0,o.jsxs)(n.ol,{start:"4",children:["\n",(0,o.jsx)(n.li,{children:"\u76ee\u6807\u51fd\u6570\u5df2\u7ecf\u88ab hook \u8fc7"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5982\u679c\u76ee\u6807\u51fd\u6570\u53ea\u7528 ",(0,o.jsx)(n.code,{children:"hookFn"})," \u4fee\u6539\u8fc7\uff0c\u90a3\u4e48\u4e4b\u524d\u7684\u6240\u6709\u66f4\u6539\u90fd\u4f1a\u88ab",(0,o.jsx)(n.strong,{children:"\u4e22\u5f03"}),"\uff08SEAC \u4f1a\u5728\u51fa\u73b0\u4e22\u5f03\u4fee\u6539\u884c\u4e3a\u7684\u65f6\u5019\u53d1\u51fa\u8b66\u544a\uff09\uff0c\u5728\u4f60\u7684",(0,o.jsx)(n.code,{children:"override"})," \u4e2d\u4f20\u5165\u7684\uff0c",(0,o.jsx)(n.strong,{children:"\u662f\u6700\u521d\u7684\u539f\u51fd\u6570"}),"\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u53e6\u8bf7\u52a1\u5fc5\u53c2\u9605",(0,o.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/hook#%E4%BA%92%E6%93%8D%E4%BD%9C%E6%80%A7",children:"hook \u6559\u7a0b"}),"\u4e2d\u5bf9 ",(0,o.jsx)(n.code,{children:"hookFn"})," \u548c ",(0,o.jsx)(n.code,{children:"wrapper"})," \u4e24\u8005",(0,o.jsx)(n.strong,{children:"\u4e92\u64cd\u4f5c\u6027"}),"\u7684\u63cf\u8ff0\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"hookprototype",children:"hookPrototype"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function hookPrototype<T extends HasPrototype, K extends keyof T['prototype']>(\r\n  target: T,\r\n  funcName: K,\r\n  override: HookFunction<T['prototype'], K>\r\n): void;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u5bf9",(0,o.jsx)(n.code,{children:"hookFn"}),"\u7684\u4e00\u4e2a\u7b80\u5355\u5305\u88c5\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"hookPrototype(a, 'fnName', hooked);\r\n// \u7b49\u4ef7\u4e8e\r\nhookFn(a.prototype, 'fnName', hooked);\n"})}),"\n",(0,o.jsx)(n.h3,{id:"wrapper",children:"wrapper"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function wrapper<F extends AnyFunction>(func: F | HookedFunction<F> | WrappedFunction<F>): WrappedFunction<F>;\r\n\r\ninterface WrappedFunction<F extends AnyFunction> extends HookedFunction<F> {\r\n  (...args: Parameters<F>): ReturnType<F>;\r\n  after(this: WrappedFunction<F>, decorator: AfterDecorator<F>): WrappedFunction<F>;\r\n  before(this: WrappedFunction<F>, decorator: BeforeDecorator<F>): WrappedFunction<F>;\r\n}\r\n\r\ntype BeforeDecorator<F extends AnyFunction> = (...args: Parameters<F>) => void;\r\ntype AfterDecorator<F extends AnyFunction> = (\r\n  result: ConvertVoid<InferPromiseResultType<ReturnType<F>>>,\r\n  ...args: Parameters<F>\r\n) => void;\n"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.del,{children:"\u5199\u7c7b\u578b\u4f53\u64cd\u5199\u7684"})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"wrapper"})," \u53ef\u4ee5\u7ed9\u76ee\u6807\u51fd\u6570\u6dfb\u52a0 ",(0,o.jsx)(n.code,{children:"before"})," \u548c ",(0,o.jsx)(n.code,{children:"after"})," \u94a9\u5b50\uff0c\u540c\u65f6\u4e0d\u5f71\u54cd\u539f\u51fd\u6570\u7684\u884c\u4e3a\uff0c\u4ece\u800c\u8ba9\u4f60\u53ef\u4ee5\u5b89\u5168\u7684\u62e6\u622a\u5165\u53c2\u4ee5\u53ca\u8fd4\u56de\u503c\u3002\u4f46\u662f\u548c ",(0,o.jsx)(n.code,{children:"hookFn"})," \u4e0d\u540c\u7684\u662f\uff0c",(0,o.jsx)(n.code,{children:"wrapper"})," \u6ca1\u6709\u4fee\u6539\u539f\u51fd\u6570\u884c\u4e3a\u7684\u80fd\u529b\uff0c\u4e24\u4e2a\u94a9\u5b50\u4e0d\u4f1a\u5bf9\u539f\u51fd\u6570\u7684\u6267\u884c\u9020\u6210\u4efb\u4f55\u5f71\u54cd\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"wrapper"})," \u7684\u4f7f\u7528\u975e\u5e38\u7b80\u5355\uff0c\u4f60\u53ea\u9700\u8981\u4f20\u5165\u76ee\u6807\u51fd\u6570\uff0c\u7136\u540e\u4f7f\u7528",(0,o.jsx)(n.em,{children:"\u94fe\u5f0f\u8bed\u6cd5"}),"\u5411\u94a9\u5b50\u4e0a\u6dfb\u52a0\u88c5\u9970\u5668\uff0c\u6700\u540e\u5c06\u4fee\u6539\u5b8c\u6210\u7684\u51fd\u6570\u8d4b\u503c\u7ed9\u539f\u51fd\u6570\u5373\u53ef\u3002"]}),"\n",(0,o.jsx)(n.p,{children:"\u4f8b\u5982\uff1a"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function f(arg1: string) {\r\n  console.log('fn call');\r\n  return '2';\r\n}\r\n\r\nf = wrapper(f)\r\n  .before((arg1) => {\r\n    console.log(arg1); // <- arg1\u4f1a\u88ab\u63a8\u5bfc\u4e3astring\r\n  })\r\n  .after((result, arg1) => {\r\n    console.log(result); // <- result\u4e5f\u4f1a\u63a8\u5bfc\u51fa\u6765\r\n  });\r\n\r\nf('1');\r\n// \u8f93\u51fa:\r\n// '1'\r\n// 'fn call'\r\n// '2'\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u5728 ",(0,o.jsx)(n.code,{children:"before"})," \u88c5\u9970\u5668 \u548c ",(0,o.jsx)(n.code,{children:"after"})," \u88c5\u9970\u5668\u5185\u90fd\u53ef\u4ee5\u83b7\u5f97\u539f\u51fd\u6570\u7684\u8c03\u7528\u53c2\u6570\uff0c",(0,o.jsx)(n.code,{children:"after"})," \u88c5\u9970\u5668\u5185\u53ef\u4ee5\u989d\u5916\u83b7\u5f97\u539f\u51fd\u6570\u7684\u8fd4\u56de\u503c\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5728\u4f7f\u7528 ",(0,o.jsx)(n.code,{children:"wrapper"})," \u7684\u65f6\u5019\uff0c\u6709\u4e00\u4e9b\u9700\u8981\u6ce8\u610f\u7684\u5730\u65b9\u3002"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u5e42\u7b49\u6027\u4e0e\u4e0d\u53ef\u53d8\u6027"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5982\u679c\u4f60\u4f20\u5165\u4e86\u4e00\u4e2a\u5df2\u7ecf\u88ab ",(0,o.jsx)(n.code,{children:"hookFn"})," \u6216 ",(0,o.jsx)(n.code,{children:"wrapper"})," \u4fee\u6539\u8fc7\u7684\u51fd\u6570\uff0c\u90a3\u4e48 ",(0,o.jsx)(n.code,{children:"wrapper"})," \u4f1a\u5728",(0,o.jsx)(n.strong,{children:"\u4fee\u6539\u540e\u7684\u57fa\u7840"}),"\u4e0a\u8fdb\u884c\u5305\u88c5\u3002\u53e6\u5916\uff0c ",(0,o.jsx)(n.code,{children:"wrapper"})," \u3001 ",(0,o.jsx)(n.code,{children:"after"})," \u548c ",(0,o.jsx)(n.code,{children:"before"}),"\u8c03\u7528\u540e\u4fdd\u8bc1\u8fd4\u56de\u4e00\u4e2a\u5168\u65b0\u7684\u51fd\u6570\u3002\u6362\u800c\u8a00\u4e4b\uff0c\u8fd9\u4e09\u4e2a\u64cd\u4f5c\u90fd\u662f\u7eaf\u51fd\u6570\u64cd\u4f5c\u3002\u56e0\u6b64\u4f60\u53ef\u4ee5\u653e\u5fc3\u7684\u4f7f\u7528 ",(0,o.jsx)(n.code,{children:"wrapper"})," \u5305\u88c5\u51fd\u6570\u5e76\u6dfb\u52a0\u88c5\u9970\u5668\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u53e6\u8bf7\u52a1\u5fc5\u53c2\u9605",(0,o.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/hook#%E4%BA%92%E6%93%8D%E4%BD%9C%E6%80%A7",children:"hook \u6559\u7a0b"}),"\u4e2d\u5bf9\u4e24\u8005",(0,o.jsx)(n.strong,{children:"\u4e92\u64cd\u4f5c\u6027"}),"\u7684\u63cf\u8ff0\u3002"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"this"})," \u7684\u5904\u7406"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u4f60\u53ef\u4ee5\u7ed9 ",(0,o.jsx)(n.code,{children:"before"})," \u6216 ",(0,o.jsx)(n.code,{children:"after"})," \u94a9\u5b50\u4f20\u5165\u4e00\u4e2a\u7eaf\u6b63\u7684 ",(0,o.jsx)(n.code,{children:"function"})," \u800c\u4e0d\u662f\u533f\u540d\u51fd\u6570\uff0c\u8fd9\u6837 ",(0,o.jsx)(n.code,{children:"this"})," \u6307\u9488\u5c31\u53ef\u4ee5\u88ab\u6b63\u786e\u7684\u7ed1\u5b9a\uff08\u4e0e\u539f\u51fd\u6570\u7684 ",(0,o.jsx)(n.code,{children:"this"})," \u4e3a\u540c\u4e00\u6307\u5411\uff09\uff0c\u4e0d\u8fc7\u8bf7\u6ce8\u610f\u4f60\u9700\u8981\u624b\u52a8\u58f0\u660e ",(0,o.jsx)(n.code,{children:"this"})," \u7684\u7c7b\u578b\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"const object = {\r\n  f() {\r\n    console.log(this === object);\r\n  },\r\n};\r\n\r\nobject.f = wrapper(object.f).after(function (this: typeof object) {\r\n  console.log(this === object);\r\n});\r\n\r\nobject.f();\r\n// \u8f93\u51fa:\r\n// true\r\n// true\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u8fd4\u56de ",(0,o.jsx)(n.code,{children:"void"})," \u7684\u51fd\u6570"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5bf9\u4e8e ",(0,o.jsx)(n.code,{children:"after"})," \u94a9\u5b50\uff0c\u8fd4\u56de\u7c7b\u578b\u5982\u679c\u662f ",(0,o.jsx)(n.code,{children:"void"})," \u4f1a\u81ea\u52a8\u8f6c\u4e3a ",(0,o.jsx)(n.code,{children:"undefined"})," \u3002"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\u8fd4\u56de ",(0,o.jsx)(n.code,{children:"Promise"})," \u7684\u51fd\u6570"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u5bf9\u4e8e ",(0,o.jsx)(n.code,{children:"after"})," \u94a9\u5b50\uff0c\u5982\u679c\u539f\u51fd\u6570\u7684\u8fd4\u56de\u662f\u4e00\u4e2a ",(0,o.jsx)(n.code,{children:"Promise"}),"\uff0c\u90a3\u4e48\u6240\u6709\u7684 ",(0,o.jsx)(n.code,{children:"after"})," \u88c5\u9970\u5668\u4f1a\u5f97\u5230\u539f\u51fd\u6570 ",(0,o.jsx)(n.code,{children:"fulfilled"})," \u540e\u518d\u6267\u884c\u3002\u4e5f\u5c31\u662f\u8bf4\uff0c\u4f60\u7684\u88c5\u9970\u5668\u91cc\u9762\u62ff\u5230\u7684\u662f ",(0,o.jsx)(n.code,{children:"Promise"})," \u5185\u7684\u7ed3\u679c\uff0c ",(0,o.jsx)(n.code,{children:"wrapper"})," \u5728\u5185\u90e8\u5e2e\u4f60 ",(0,o.jsx)(n.code,{children:"await"})," \u4e86\u8fd9\u4e2a ",(0,o.jsx)(n.code,{children:"Promise"}),"\u3002"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u8c03\u7528\u987a\u5e8f"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["\u88c5\u9970\u5668\u4f1a\u5206\u522b\u6309\u7167\u5728 ",(0,o.jsx)(n.code,{children:"after"})," \u548c ",(0,o.jsx)(n.code,{children:"before"})," \u4e0a\u88ab\u6dfb\u52a0\u7684\u987a\u5e8f\u6267\u884c\uff0c\u4f46\u662f\u4e4b\u95f4\u4e0d\u4f1a\u6709\u5f02\u6b65\u7b49\u5f85\u5173\u7cfb\uff0c\u4e8b\u5b9e\u4e0a\u4f60\u4e0d\u5e94\u8be5\u4f9d\u8d56\u8fd9\u4e2a\u884c\u4e3a\uff0c\u4e0d\u540c\u7684\u88c5\u9970\u5668\u4e4b\u95f4\u662f\u5e94\u8be5\u662f\u72ec\u7acb\u7684\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"restorehookedfn",children:"restoreHookedFn"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function restoreHookedFn<T extends object, K extends keyof T>(target: T, funcName: K): void;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u8fd8\u539f\u88ab\u4fee\u6539\u7684\u51fd\u6570\u5230\u6700\u521d\u7684\u6837\u5b50\uff0c\u8fd9\u4e00\u8282\u5217\u51fa\u7684\u6240\u6709 hook \u65b9\u5f0f\u90fd\u53ef\u4ee5\u8fd8\u539f\u3002\u8c03\u7528\u5f62\u5f0f\u548c",(0,o.jsx)(n.code,{children:"hookFn"}),"\u4e00\u81f4\u3002"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"restoreHookedFn(object, 'f'); // \u8fd8\u539f\u4e0a\u9762\u7684object\r\nobject.f();\r\n// \u8f93\u51fa true\n"})}),"\n",(0,o.jsx)(n.h3,{id:"experiment_hookconstructor",children:"experiment_hookConstructor"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function experiment_hookConstructor<TClass extends Constructor<any>>(\r\n  classType: TClass,\r\n  className: string,\r\n  override: (ins: InstanceType<TClass>, ...args: ConstructorParameters<TClass>) => void\r\n): void;\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u4fee\u6539\u4e00\u4e2a\u6784\u9020\u51fd\u6570\u3002\u6bd4\u8f83\u7279\u6b8a\u7684\u662f\uff0c\u4f60\u53ea\u80fd\u64cd\u4f5c\u5df2\u7ecf\u521b\u5efa\u597d\u7684\u5b9e\u4f8b\u3002"}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"experiment"}),": \u8fd9\u662f\u4e00\u4e2a\u5b9e\u9a8c\u6027 API"]})}),"\n",(0,o.jsx)(n.h3,{id:"assertishookedfunction",children:"assertIsHookedFunction"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function assertIsHookedFunction<F extends AnyFunction>(func: F | HookedFunction<F>): func is HookedFunction<F>;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u65ad\u8a00 ",(0,o.jsx)(n.code,{children:"func"})," \u662f\u5426\u88ab SEAC \u7684 hook \u51fd\u6570\u4fee\u6539\u8fc7\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"assertiswrappedfunction",children:"assertIsWrappedFunction"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function assertIsWrappedFunction<F extends AnyFunction>(func: F | WrappedFunction<F>): func is WrappedFunction<F>;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u65ad\u8a00 ",(0,o.jsx)(n.code,{children:"func"})," \u662f\u5426\u662f\u4e00\u4e2a wrapped \u7684\u51fd\u6570\uff0c\u6ce8\u610f\u4e00\u4e2a wrapped \u51fd\u6570\u4e00\u5b9a\u662f hooked\uff0c\u53cd\u4e4b\u4e0d\u4e00\u5b9a\u3002"]}),"\n",(0,o.jsxs)(n.p,{children:["\u8fd9\u91cc\u7684 hooked \u6307\u8be5\u51fd\u6570\u88ab SEAC \u7684 hook \u51fd\u6570\u4fee\u6539\u8fc7\uff0c\u800c wrapped \u7279\u6307\u8be5\u51fd\u6570\u662f\u4f7f\u7528 ",(0,o.jsx)(n.code,{children:"wrapper"})," \u4fee\u6539\u7684\u3002\u5728",(0,o.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/hook",children:"Hook \u6559\u7a0b"}),"\u4e2d\u8fd9\u4e24\u4e2a\u8bcd\u548c",(0,o.jsx)(n.em,{children:"WrappedFunction"}),"\u3001",(0,o.jsx)(n.em,{children:"HookedFunction"}),"\u6307\u4ee3\u76f8\u540c\u3002"]}),"\n",(0,o.jsx)(n.h2,{id:"\u5ef6\u65f6\u76f8\u5173",children:"\u5ef6\u65f6\u76f8\u5173"}),"\n",(0,o.jsxs)(n.admonition,{type:"tip",children:[(0,o.jsx)(n.p,{children:"\u4e0d\u4ec5\u662f\u4e3a\u4e86\u8282\u7ea6\u8ba1\u7b97\u8d44\u6e90\uff0c\u51cf\u5c11\u53ef\u80fd\u7684\u7adf\u6001\u5f71\u54cd\uff1b\u540c\u65f6\u4e5f\u662f\u4e3a\u4e86\u964d\u4f4e\u8d26\u53f7\u98ce\u63a7\uff0c\u51cf\u5c11\u88ab\u65ad\u7ebf\u7684\u53ef\u80fd\uff0c\u8bf7\u4e0d\u8981\u9ad8\u9891\u53d1\u5305\u3002"}),(0,o.jsx)(n.p,{children:"\u4e0b\u9762\u7684\u4e09\u4e2a\u51fd\u6570\u53ef\u4ee5\u5e2e\u4f60\u8f7b\u677e\u505a\u5230\u8fd9\u4e00\u70b9\u3002"})]}),"\n",(0,o.jsx)(n.h3,{id:"delay",children:"delay"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function delay(time: number): Promise<void>;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u5ef6\u65f6\u51fd\u6570\uff0c",(0,o.jsx)(n.code,{children:"setTimeout"}),"\u7684",(0,o.jsx)(n.code,{children:"promisify"}),"\u7248\u672c\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"debounce",children:"debounce"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function debounce<F extends AnyFunction>(func: F, time: number): F;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u53bb\u6296\u51fd\u6570\uff0c\u53c2\u89c1",(0,o.jsx)(n.a,{href:"https://rxjs.dev/api/index/function/debounceTime",children:"debounceTime"}),"\u4e86\u89e3\u53bb\u6296\u7684\u542b\u4e49\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"throttle",children:"throttle"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"function throttle<F extends AnyFunction>(func: F, time: number): F;\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u8282\u6d41\u51fd\u6570\uff0c\u53c2\u89c1",(0,o.jsx)(n.a,{href:"https://rxjs.dev/api/index/function/throttleTime",children:"throttleTime"}),"\u4e86\u89e3\u8282\u6d41\u7684\u542b\u4e49\u3002"]}),"\n",(0,o.jsx)(n.h2,{id:"\u5e38\u91cf",children:"\u5e38\u91cf"}),"\n",(0,o.jsx)(n.h3,{id:"noop",children:"NOOP"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"const NOOP: () => void;\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u7a7a\u51fd\u6570\uff0c\u51cf\u5c11\u521b\u5efa\u7a7a\u533f\u540d\u51fd\u6570\u7684\u8d44\u6e90\u6d6a\u8d39\uff0c\u540c\u65f6\u63d0\u4f9b\u66f4\u597d\u7684\u8bed\u4e49\u3002"}),"\n",(0,o.jsx)(n.h2,{id:"\u5b9e\u7528\u7c7b\u578b",children:"\u5b9e\u7528\u7c7b\u578b"}),"\n",(0,o.jsx)(n.h3,{id:"anyfunction",children:"AnyFunction"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"type AnyFunction = (...args: any[]) => unknown;\n"})}),"\n",(0,o.jsx)(n.p,{children:"\u8868\u793a\u4efb\u610f\u51fd\u6570\u3002"}),"\n",(0,o.jsx)(n.h3,{id:"constructor",children:"Constructor"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"type Constructor<T> = { new (...args: any[]): T };\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u8868\u793a\u4efb\u610f\u6784\u9020\u51fd\u6570\uff0c\u6216\u8005\u5b9e\u4f8b\u7684",(0,o.jsx)(n.strong,{children:"\u7c7b\u7c7b\u578b"}),"\uff0c\u548c InstanceType \u76f8\u53cd\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"valueof",children:"ValueOf"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"type ValueOf<T> = T[keyof T];\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u4e00\u822c\u7528\u4e8e TypeMap\uff0c\u53ef\u4ee5\u770b\u4f5c\u7c7b\u578b\u4e0a\u7684",(0,o.jsx)(n.code,{children:"Map.prototype.values()"}),"\u3002"]}),"\n",(0,o.jsx)(n.h3,{id:"withclass",children:"WithClass"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"type WithClass<T> = T & { __class__: string };\n"})}),"\n",(0,o.jsxs)(n.p,{children:["\u4e00\u822c\u7528\u4e8e\u65ad\u8a00",(0,o.jsx)(n.code,{children:"egret"}),"\u4e0a\u7684\u5b9e\u4f8b\u5bf9\u8c61\uff0c\u83b7\u53d6\u5176\u4f5c\u4e3a\u5143\u6570\u636e\u7684",(0,o.jsx)(n.code,{children:"__class__"}),"\u5c5e\u6027\u3002"]})]})}function a(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1456:(e,n,r)=>{r.d(n,{Z:()=>d,a:()=>i});var o=r(79);const s={},c=o.createContext(s);function i(e){const n=o.useContext(c);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(c.Provider,{value:n},e.children)}}}]);