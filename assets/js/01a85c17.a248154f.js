"use strict";(self.webpackChunk_sea_website=self.webpackChunk_sea_website||[]).push([[4013],{7410:(e,s,t)=>{t.d(s,{Z:()=>v});var a=t(79),i=t(9577),r=t(183),l=t(6530),n=t(1131),c=t(3407),o=t(7911),m=t(2308);function d(e){const{pathname:s}=(0,o.TH)();return(0,a.useMemo)((()=>e.filter((e=>function(e,s){return!(e.unlisted&&!(0,m.Mg)(e.permalink,s))}(e,s)))),[e,s])}const g={sidebar:"sidebar_EEP6",sidebarItemTitle:"sidebarItemTitle_F7Nz",sidebarItemList:"sidebarItemList_X1zE",sidebarItem:"sidebarItem_FAkL",sidebarItemLink:"sidebarItemLink_Acjc",sidebarItemLinkActive:"sidebarItemLinkActive_GAgD"};var u=t(5250);function b(e){let{sidebar:s}=e;const t=d(s.items);return(0,u.jsx)("aside",{className:"col col--3",children:(0,u.jsxs)("nav",{className:(0,i.Z)(g.sidebar,"thin-scrollbar"),"aria-label":(0,c.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,u.jsx)("div",{className:(0,i.Z)(g.sidebarItemTitle,"margin-bottom--md"),children:s.title}),(0,u.jsx)("ul",{className:(0,i.Z)(g.sidebarItemList,"clean-list"),children:t.map((e=>(0,u.jsx)("li",{className:g.sidebarItem,children:(0,u.jsx)(n.Z,{isNavLink:!0,to:e.permalink,className:g.sidebarItemLink,activeClassName:g.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var h=t(8843);function j(e){let{sidebar:s}=e;const t=d(s.items);return(0,u.jsx)("ul",{className:"menu__list",children:t.map((e=>(0,u.jsx)("li",{className:"menu__list-item",children:(0,u.jsx)(n.Z,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function p(e){return(0,u.jsx)(h.Zo,{component:j,props:e})}function x(e){let{sidebar:s}=e;const t=(0,l.i)();return s?.items.length?"mobile"===t?(0,u.jsx)(p,{sidebar:s}):(0,u.jsx)(b,{sidebar:s}):null}function v(e){const{sidebar:s,toc:t,children:a,...l}=e,n=s&&s.items.length>0;return(0,u.jsx)(r.Z,{...l,children:(0,u.jsx)("div",{className:"container margin-vert--lg",children:(0,u.jsxs)("div",{className:"row",children:[(0,u.jsx)(x,{sidebar:s}),(0,u.jsx)("main",{className:(0,i.Z)("col",{"col--7":n,"col--9 col--offset-1":!n}),itemScope:!0,itemType:"https://schema.org/Blog",children:a}),t&&(0,u.jsx)("div",{className:"col col--2",children:t})]})})})}},4398:(e,s,t)=>{t.r(s),t.d(s,{default:()=>j});t(79);var a=t(9577),i=t(3407);const r=()=>(0,i.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});var l=t(284),n=t(1168),c=t(7410),o=t(7004),m=t(9450);const d={tag:"tag_Ag67"};var g=t(5250);function u(e){let{letterEntry:s}=e;return(0,g.jsxs)("article",{children:[(0,g.jsx)(m.Z,{as:"h2",id:s.letter,children:s.letter}),(0,g.jsx)("ul",{className:"padding--none",children:s.tags.map((e=>(0,g.jsx)("li",{className:d.tag,children:(0,g.jsx)(o.Z,{...e})},e.permalink)))}),(0,g.jsx)("hr",{})]})}function b(e){let{tags:s}=e;const t=function(e){const s={};return Object.values(e).forEach((e=>{const t=function(e){return e[0].toUpperCase()}(e.label);s[t]??=[],s[t].push(e)})),Object.entries(s).sort(((e,s)=>{let[t]=e,[a]=s;return t.localeCompare(a)})).map((e=>{let[s,t]=e;return{letter:s,tags:t.sort(((e,s)=>e.label.localeCompare(s.label)))}}))}(s);return(0,g.jsx)("section",{className:"margin-vert--lg",children:t.map((e=>(0,g.jsx)(u,{letterEntry:e},e.letter)))})}var h=t(2180);function j(e){let{tags:s,sidebar:t}=e;const i=r();return(0,g.jsxs)(l.FG,{className:(0,a.Z)(n.k.wrapper.blogPages,n.k.page.blogTagsListPage),children:[(0,g.jsx)(l.d,{title:i}),(0,g.jsx)(h.Z,{tag:"blog_tags_list"}),(0,g.jsxs)(c.Z,{sidebar:t,children:[(0,g.jsx)(m.Z,{as:"h1",children:i}),(0,g.jsx)(b,{tags:s})]})]})}},7004:(e,s,t)=>{t.d(s,{Z:()=>n});t(79);var a=t(9577),i=t(1131);const r={tag:"tag_bz9N",tagRegular:"tagRegular_sSmc",tagWithCount:"tagWithCount_BEwV"};var l=t(5250);function n(e){let{permalink:s,label:t,count:n}=e;return(0,l.jsxs)(i.Z,{href:s,className:(0,a.Z)(r.tag,n?r.tagWithCount:r.tagRegular),children:[t,n&&(0,l.jsx)("span",{children:n})]})}}}]);