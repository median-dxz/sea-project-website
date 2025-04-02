"use strict";(self.webpackChunksea_project_website=self.webpackChunksea_project_website||[]).push([[9392],{813:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>t,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>a});const c=JSON.parse('{"id":"core-api-reference/core-architecture","title":"\u6838\u5fc3\u4e4b\u4e0b","description":"\u6d4f\u89c8 SEAC \u5168\u8c8c\u3002","source":"@site/docs/core-api-reference/core-architecture.md","sourceDirName":"core-api-reference","slug":"/core-api-reference/core-architecture","permalink":"/sea-project-website/docs/core-api-reference/core-architecture","draft":false,"unlisted":false,"editUrl":"https://github.com/median-dxz/sea-project-website/tree/main/docs/core-api-reference/core-architecture.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"SEAC \u5b8c\u5168\u6307\u5357","permalink":"/sea-project-website/docs/category/seac-\u5b8c\u5168\u6307\u5357"},"next":{"title":"Common \u6a21\u5757","permalink":"/sea-project-website/docs/core-api-reference/common"}}');var s=r(3420),i=r(8356);const o={sidebar_position:1},t="\u6838\u5fc3\u4e4b\u4e0b",d={},a=[{value:"\u4ece\u96f6\u5f00\u59cb",id:"\u4ece\u96f6\u5f00\u59cb",level:2},{value:"\u6e38\u620f\u4fee\u6539 - Common \u6a21\u5757",id:"\u6e38\u620f\u4fee\u6539---common-\u6a21\u5757",level:2},{value:"\u6e38\u620f\u5e38\u91cf\u4e0e TypeMaps - Constant \u6a21\u5757",id:"\u6e38\u620f\u5e38\u91cf\u4e0e-typemaps---constant-\u6a21\u5757",level:2},{value:"\u5185\u7f6e\u529f\u80fd\u96c6\u5408 - Engine \u6a21\u5757",id:"\u5185\u7f6e\u529f\u80fd\u96c6\u5408---engine-\u6a21\u5757",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"\u6838\u5fc3\u4e4b\u4e0b",children:"\u6838\u5fc3\u4e4b\u4e0b"})}),"\n",(0,s.jsx)(n.p,{children:"\u6d4f\u89c8 SEAC \u5168\u8c8c\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u4ece\u96f6\u5f00\u59cb",children:"\u4ece\u96f6\u5f00\u59cb"}),"\n",(0,s.jsxs)(n.p,{children:["\u5927\u4f53\u4e0a\uff0c\u4e00\u4e2a\u767b\u5f55\u5668\u9996\u8981\u76ee\u6807\u662f",(0,s.jsx)(n.strong,{children:"\u4ee5\u7f16\u7a0b\u65b9\u5f0f\u64cd\u4f5c\u6e38\u620f\u6216\u4fee\u6539\u6e38\u620f"}),"\uff0c\u7136\u540e\u624d\u80fd\u5b9e\u73b0\u5404\u79cd\u529f\u80fd\u3002\u800c\u8981\u5b9e\u73b0\u8fd9\u4e00\u70b9\uff0c\u5927\u81f4\u6709\u4ee5\u4e0b\u51e0\u79cd\u601d\u8def\uff1a"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"\u57fa\u4e8e\u56fe\u50cf\u8bc6\u522b\u7684\u5c4f\u5e55\u70b9\u51fb"}),"\n",(0,s.jsx)(n.li,{children:"\u57fa\u4e8e\u5185\u5b58\u4fee\u6539\u7684\u4ee3\u7801\u6ce8\u5165\u548c\u52ab\u6301"}),"\n",(0,s.jsx)(n.li,{children:"\u5bf9\u4e8e\u7f51\u7edc\u6e38\u620f\uff0c\u989d\u5916\u53ef\u4ee5\u4f7f\u7528\u57fa\u4e8e Socket \u7684\u6536\u53d1\u5305\u62e6\u622a\u4e0e\u4fee\u6539"}),"\n",(0,s.jsx)(n.li,{children:"\u57fa\u4e8e\u53cd\u7f16\u8bd1\u7684\u5ba2\u6237\u7aef\u76f4\u63a5\u4fee\u6539\uff0c\u751a\u81f3\u5ba2\u6237\u7aef\u76f4\u63a5\u6216\u95f4\u63a5\u5bf9\u5916\u66b4\u9732\u4e86\u63a5\u53e3"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u663e\u7136\u65b9\u6848\u4e8c\u4e09\u662f\u6e38\u620f\u5916\u6302\u7070\u4ea7\u7684\u91cd\u707e\u533a\uff0c\u65b9\u6848\u4e00\u4e3b\u8981\u5728\u624b\u6e38\u9886\u57df\u53d1\u626c\u5149\u5927\uff0c\u800c\u65b9\u6848\u56db\u4e3b\u8981\u5e94\u7528\u5728\u4e00\u4e9b\u53cd\u7f16\u8bd1\u96be\u5ea6\u8f83\u4f4e\uff0c\u6216\u8005\u5b98\u65b9\u76f4\u63a5\u63d0\u4f9b mod \u6846\u67b6\u7684\u6e38\u620f\u4e2d\u3002\u65b9\u6848\u56db\u7684\u5b9e\u73b0\u96be\u5ea6\u89c6\u60c5\u51b5\u800c\u5b9a\uff0c\u4f46\u662f\u4e00\u65e6\u5b9e\u73b0\uff0c\u5177\u6709\u524d\u4e09\u79cd\u65b9\u6848\u5b8c\u5168\u65e0\u6cd5\u6bd4\u62df\u7684\u4f18\u52bf\uff1a"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u5b8c\u5168\u7684\u81ea\u7531\u5ea6"}),"\n",(0,s.jsx)(n.li,{children:"\u548c\u539f\u6e38\u620f\u5177\u6709\u826f\u597d\u7684\u4e92\u64cd\u4f5c\u6027"}),"\n",(0,s.jsx)(n.li,{children:"\u9ad8\u7a33\u5b9a\u6027"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["SEAC \u91c7\u7528\u7684\u5373\u7b2c\u56db\u79cd\u65b9\u6848\uff0c\u65b9\u6848\u7684\u5177\u4f53\u5b9e\u73b0\u65b9\u5f0f\u5e76\u4e0d\u9002\u5408\u5c55\u5f00\u8bf4\u660e\uff0c\u6bd5\u7adf\u8fd9\u662f\u4e00\u79cd\u4e8b\u5b9e\u610f\u4e49\u4e0a\u7684",(0,s.jsx)(n.strong,{children:"\u53cd\u7f16\u8bd1\u548c\u53cd\u6df7\u6dc6"}),"\u884c\u4e3a\uff08\u8fd9\u90e8\u5206\u5185\u5bb9\u8bf7\u5728",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/404",children:"discord \u9891\u9053"}),"\u4e0a\u67e5\u770b\uff09\u3002\u8fd9\u90e8\u5206\u5185\u5bb9\u4ec5\u4f9b\u5b66\u4e60\u53c2\u8003\uff0c\u4e0d\u7ba1\u4f60\u662f\u5f00\u53d1\u8005\u8fd8\u662f\u666e\u901a\u73a9\u5bb6\uff0c\u8bf7\u9075\u5b88 SEA \u7684",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/404",children:"\u6700\u7ec8\u7528\u6237\u5b88\u5219"}),"\uff0c\u5e76\u5c0a\u91cd\u5e76\u6dd8\u7c73\u7684\u4e00\u5207\u77e5\u8bc6\u4ea7\u6743\uff01"]}),"\n",(0,s.jsxs)(n.p,{children:["\u73b0\u5728\u4f60\u53ea\u9700\u8981\u5047\u8bbe\u8fd9\u4e00\u6b65\u76f8\u5173\u7684\u5185\u5bb9\u90fd\u5df2\u7ecf\u5b8c\u6210\uff0c\u5e76\u4e14\u5f00\u5c55\u76f8\u5173\u5de5\u4f5c\u7684\u652f\u6301\u4e3b\u8981\u662f\u5728",(0,s.jsx)(n.code,{children:"server"}),"\u548c",(0,s.jsx)(n.code,{children:"launcher"}),"\u4e2d\u63d0\u4f9b\u7684\uff0ccore \u4e2d\u53ea\u662f\u63d0\u4f9b\u4e86\u4e00\u4efd",(0,s.jsx)(n.code,{children:"d.ts"}),"\u5b9a\u4e49\u6587\u4ef6\uff0c\u4f60\u53ef\u4ee5\u5728",(0,s.jsx)(n.code,{children:"core/types/@seerh5"}),"\u4e2d\u67e5\u770b\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"\u4e0b\u9762\u5f00\u59cb\u6b63\u5f0f\u4ecb\u7ecd\u5728 SEA \u7684\u6838\u5fc3\u4e4b\u4e0b\u5230\u5e95\u8fdb\u884c\u4e86\u54ea\u4e9b\u5de5\u4f5c\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u6e38\u620f\u4fee\u6539---common-\u6a21\u5757",children:"\u6e38\u620f\u4fee\u6539 - Common \u6a21\u5757"}),"\n",(0,s.jsx)(n.p,{children:"\u5de5\u5177\u51fd\u6570\u4e0e\u94a9\u5b50\uff0cSEAC \u63d0\u4f9b\u7684\u6700\u57fa\u7840\u80fd\u529b\u3002"}),"\n",(0,s.jsxs)(n.p,{children:["\u8bf7\u53c2\u9605",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/common",children:"Common \u6a21\u5757"}),"\u4e86\u89e3 SEAC \u63d0\u4f9b\u7684\u5de5\u5177\u51fd\u6570\u96c6\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u53e6\u5916\u8bf7\u52a1\u5fc5\u67e5\u770b",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/hook",children:"Hook \u6559\u7a0b"}),"\u3002"]}),"\n",(0,s.jsx)(n.h2,{id:"\u6e38\u620f\u5e38\u91cf\u4e0e-typemaps---constant-\u6a21\u5757",children:"\u6e38\u620f\u5e38\u91cf\u4e0e TypeMaps - Constant \u6a21\u5757"}),"\n",(0,s.jsx)(n.p,{children:"\u4e00\u4e9b\u5e38\u7528\u679a\u4e3e\uff0c\u4ee5\u53ca\u6269\u5c55\u70b9\u6240\u7528\u5230\u7684 TypeMaps\u3002"}),"\n",(0,s.jsxs)(n.p,{children:["\u8bf7\u53c2\u9605",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/constant",children:"Constant \u6a21\u5757"}),"\u67e5\u770b\u6240\u7528\u53ef\u7528\u7684\u5e38\u91cf\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u53e6\u8bf7\u53c2\u9605\uff1a",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/extend-core",children:"\u6269\u5c55\u70b9\u6559\u7a0b"})]}),"\n",(0,s.jsx)(n.h2,{id:"\u5185\u7f6e\u529f\u80fd\u96c6\u5408---engine-\u6a21\u5757",children:"\u5185\u7f6e\u529f\u80fd\u96c6\u5408 - Engine \u6a21\u5757"}),"\n",(0,s.jsx)(n.p,{children:"SEAC \u63d0\u4f9b\u7684\u5185\u7f6e\u6e38\u620f\u529f\u80fd\u5408\u96c6\u3002SEAC \u7684\u804c\u80fd\u662f\u5bf9\u4e0b\u8fdb\u884c\u5c01\u88c5\uff0c\u5bf9\u4e0a\u63d0\u4f9b\u63a5\u53e3\u4e0e\u62bd\u8c61\u3002\u8fd9\u4e2a\u6a21\u5757\u5c31\u662f\u6700\u76f4\u63a5\u5b9e\u8df5\u8fd9\u4e00\u804c\u80fd\u7684\u90e8\u5206\u3002"}),"\n",(0,s.jsxs)(n.p,{children:["\u8bf7\u53c2\u9605",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/engine",children:"Engine \u6a21\u5757"}),"\u67e5\u770b\u8fd9\u4e9b\u57fa\u672c\u7684\u529f\u80fd\u51fd\u6570\u3002"]}),"\n",(0,s.jsxs)(n.p,{children:["\u4ee5\u53ca\u548c Engine \u6a21\u5757\u914d\u5957\u7684",(0,s.jsx)(n.a,{href:"/sea-project-website/docs/core-api-reference/socket",children:"\u6536\u53d1\u5305\u6559\u7a0b"}),"\u3002"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8356:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>t});var c=r(6672);const s={},i=c.createContext(s);function o(e){const n=c.useContext(i);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),c.createElement(i.Provider,{value:n},e.children)}}}]);