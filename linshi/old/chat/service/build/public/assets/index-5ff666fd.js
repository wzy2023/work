import{a as R,aT as Q,aA as y,az as S,d as I,u as Z,g as H,bz as _e,h as N,i as ee,l as d,F as M,c as B,bA as $e,bB as Ce,ak as se,bC as ze,au as Pe,t as Re,aW as Se,as as Te,aI as Le,bD as Ne,_ as je,U as de,$ as ce,r as L,x as T,A,K as p,I as g,B as X,H as a,z as s,C as t,a9 as V,L as C,a5 as ue,M as z,bE as ve,y as U,bk as me,O as Y,a0 as Ee,al as De,N as W,E as F,W as m,J as Be}from"./index-fbbac701.js";import{N as ae}from"./Space-aba0b5a7.js";import{a as Oe,N as ne}from"./Tabs-e1241e11.js";import{b as Ue}from"./DataTable-1f6f0c54.js";import"./Forward-3cd0631b.js";import"./Add-e4db921f.js";import"./Dropdown-178d9d7e.js";import"./FocusDetector-10318a71.js";const Ie=R("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[Q("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[Q("no-title",`
 display: flex;
 align-items: center;
 `)]),y("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),S("title-position-left",[y("line",[S("left",{width:"28px"})])]),S("title-position-right",[y("line",[S("right",{width:"28px"})])]),S("dashed",[y("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),S("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),y("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),Q("dashed",[y("line",{backgroundColor:"var(--n-color)"})]),S("dashed",[y("line",{borderColor:"var(--n-color)"})]),S("vertical",{backgroundColor:"var(--n-color)"})]),Ve=Object.assign(Object.assign({},H.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean}),Me=I({name:"Divider",props:Ve,setup(o){const{mergedClsPrefixRef:e,inlineThemeDisabled:u}=Z(o),n=H("Divider","-divider",Ie,_e,o,e),k=N(()=>{const{common:{cubicBezierEaseInOut:v},self:{color:_,textColor:f,fontWeight:b}}=n.value;return{"--n-bezier":v,"--n-color":_,"--n-text-color":f,"--n-font-weight":b}}),h=u?ee("divider",void 0,k,o):void 0;return{mergedClsPrefix:e,cssVars:u?void 0:k,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){var o;const{$slots:e,titlePlacement:u,vertical:n,dashed:k,cssVars:h,mergedClsPrefix:v}=this;return(o=this.onRender)===null||o===void 0||o.call(this),d("div",{role:"separator",class:[`${v}-divider`,this.themeClass,{[`${v}-divider--vertical`]:n,[`${v}-divider--no-title`]:!e.default,[`${v}-divider--dashed`]:k,[`${v}-divider--title-position-${u}`]:e.default&&u}],style:h},n?null:d("div",{class:`${v}-divider__line ${v}-divider__line--left`}),!n&&e.default?d(M,null,d("div",{class:`${v}-divider__title`},this.$slots),d("div",{class:`${v}-divider__line ${v}-divider__line--right`})):null)}}),He=B([R("list",`
 --n-merged-border-color: var(--n-border-color);
 --n-merged-color: var(--n-color);
 --n-merged-color-hover: var(--n-color-hover);
 margin: 0;
 font-size: var(--n-font-size);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 padding: 0;
 list-style-type: none;
 color: var(--n-text-color);
 background-color: var(--n-merged-color);
 `,[S("show-divider",[R("list-item",[B("&:not(:last-child)",[y("divider",`
 background-color: var(--n-merged-border-color);
 `)])])]),S("clickable",[R("list-item",`
 cursor: pointer;
 `)]),S("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `),S("hoverable",[R("list-item",`
 border-radius: var(--n-border-radius);
 `,[B("&:hover",`
 background-color: var(--n-merged-color-hover);
 `,[y("divider",`
 background-color: transparent;
 `)])])]),S("bordered, hoverable",[R("list-item",`
 padding: 12px 20px;
 `),y("header, footer",`
 padding: 12px 20px;
 `)]),y("header, footer",`
 padding: 12px 0;
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[B("&:not(:last-child)",`
 border-bottom: 1px solid var(--n-merged-border-color);
 `)]),R("list-item",`
 position: relative;
 padding: 12px 0; 
 box-sizing: border-box;
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[y("prefix",`
 margin-right: 20px;
 flex: 0;
 `),y("suffix",`
 margin-left: 20px;
 flex: 0;
 `),y("main",`
 flex: 1;
 `),y("divider",`
 height: 1px;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: transparent;
 transition: background-color .3s var(--n-bezier);
 pointer-events: none;
 `)])]),$e(R("list",`
 --n-merged-color-hover: var(--n-color-hover-modal);
 --n-merged-color: var(--n-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),Ce(R("list",`
 --n-merged-color-hover: var(--n-color-hover-popover);
 --n-merged-color: var(--n-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Je=Object.assign(Object.assign({},H.props),{size:{type:String,default:"medium"},bordered:Boolean,clickable:Boolean,hoverable:Boolean,showDivider:{type:Boolean,default:!0}}),pe=Se("n-list"),Ke=I({name:"List",props:Je,setup(o){const{mergedClsPrefixRef:e,inlineThemeDisabled:u,mergedRtlRef:n}=Z(o),k=se("List",n,e),h=H("List","-list",He,ze,o,e);Pe(pe,{showDividerRef:Re(o,"showDivider"),mergedClsPrefixRef:e});const v=N(()=>{const{common:{cubicBezierEaseInOut:f},self:{fontSize:b,textColor:c,color:E,colorModal:w,colorPopover:P,borderColor:$,borderColorModal:O,borderColorPopover:J,borderRadius:D,colorHover:j,colorHoverModal:G,colorHoverPopover:q}}=h.value;return{"--n-font-size":b,"--n-bezier":f,"--n-text-color":c,"--n-color":E,"--n-border-radius":D,"--n-border-color":$,"--n-border-color-modal":O,"--n-border-color-popover":J,"--n-color-modal":w,"--n-color-popover":P,"--n-color-hover":j,"--n-color-hover-modal":G,"--n-color-hover-popover":q}}),_=u?ee("list",void 0,v,o):void 0;return{mergedClsPrefix:e,rtlEnabled:k,cssVars:u?void 0:v,themeClass:_==null?void 0:_.themeClass,onRender:_==null?void 0:_.onRender}},render(){var o;const{$slots:e,mergedClsPrefix:u,onRender:n}=this;return n==null||n(),d("ul",{class:[`${u}-list`,this.rtlEnabled&&`${u}-list--rtl`,this.bordered&&`${u}-list--bordered`,this.showDivider&&`${u}-list--show-divider`,this.hoverable&&`${u}-list--hoverable`,this.clickable&&`${u}-list--clickable`,this.themeClass],style:this.cssVars},e.header?d("div",{class:`${u}-list__header`},e.header()):null,(o=e.default)===null||o===void 0?void 0:o.call(e),e.footer?d("div",{class:`${u}-list__footer`},e.footer()):null)}}),We=I({name:"ListItem",setup(){const o=Te(pe,null);return o||Le("list-item","`n-list-item` must be placed in `n-list`."),{showDivider:o.showDividerRef,mergedClsPrefix:o.mergedClsPrefixRef}},render(){const{$slots:o,mergedClsPrefix:e}=this;return d("li",{class:`${e}-list-item`},o.prefix?d("div",{class:`${e}-list-item__prefix`},o.prefix()):null,o.default?d("div",{class:`${e}-list-item__main`},o):null,o.suffix?d("div",{class:`${e}-list-item__suffix`},o.suffix()):null,this.showDivider&&d("div",{class:`${e}-list-item__divider`}))}}),Ae=R("thing",`
 display: flex;
 transition: color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 color: var(--n-text-color);
`,[R("thing-avatar",`
 margin-right: 12px;
 margin-top: 2px;
 `),R("thing-avatar-header-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 `,[R("thing-header-wrapper",`
 flex: 1;
 `)]),R("thing-main",`
 flex-grow: 1;
 `,[R("thing-header",`
 display: flex;
 margin-bottom: 4px;
 justify-content: space-between;
 align-items: center;
 `,[y("title",`
 font-size: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-title-text-color);
 `)]),y("description",[B("&:not(:last-child)",`
 margin-bottom: 4px;
 `)]),y("content",[B("&:not(:first-child)",`
 margin-top: 12px;
 `)]),y("footer",[B("&:not(:first-child)",`
 margin-top: 12px;
 `)]),y("action",[B("&:not(:first-child)",`
 margin-top: 12px;
 `)])])]),Fe=Object.assign(Object.assign({},H.props),{title:String,titleExtra:String,description:String,descriptionStyle:[String,Object],content:String,contentStyle:[String,Object],contentIndented:Boolean}),Ge=I({name:"Thing",props:Fe,setup(o,{slots:e}){const{mergedClsPrefixRef:u,inlineThemeDisabled:n,mergedRtlRef:k}=Z(o),h=H("Thing","-thing",Ae,Ne,o,u),v=se("Thing",k,u),_=N(()=>{const{self:{titleTextColor:b,textColor:c,titleFontWeight:E,fontSize:w},common:{cubicBezierEaseInOut:P}}=h.value;return{"--n-bezier":P,"--n-font-size":w,"--n-text-color":c,"--n-title-font-weight":E,"--n-title-text-color":b}}),f=n?ee("thing",void 0,_,o):void 0;return()=>{var b;const{value:c}=u,E=v?v.value:!1;return(b=f==null?void 0:f.onRender)===null||b===void 0||b.call(f),d("div",{class:[`${c}-thing`,f==null?void 0:f.themeClass,E&&`${c}-thing--rtl`],style:n?void 0:_.value},e.avatar&&o.contentIndented?d("div",{class:`${c}-thing-avatar`},e.avatar()):null,d("div",{class:`${c}-thing-main`},!o.contentIndented&&(e.header||o.title||e["header-extra"]||o.titleExtra||e.avatar)?d("div",{class:`${c}-thing-avatar-header-wrapper`},e.avatar?d("div",{class:`${c}-thing-avatar`},e.avatar()):null,e.header||o.title||e["header-extra"]||o.titleExtra?d("div",{class:`${c}-thing-header-wrapper`},d("div",{class:`${c}-thing-header`},e.header||o.title?d("div",{class:`${c}-thing-header__title`},e.header?e.header():o.title):null,e["header-extra"]||o.titleExtra?d("div",{class:`${c}-thing-header__extra`},e["header-extra"]?e["header-extra"]():o.titleExtra):null),e.description||o.description?d("div",{class:`${c}-thing-main__description`,style:o.descriptionStyle},e.description?e.description():o.description):null):null):d(M,null,e.header||o.title||e["header-extra"]||o.titleExtra?d("div",{class:`${c}-thing-header`},e.header||o.title?d("div",{class:`${c}-thing-header__title`},e.header?e.header():o.title):null,e["header-extra"]||o.titleExtra?d("div",{class:`${c}-thing-header__extra`},e["header-extra"]?e["header-extra"]():o.titleExtra):null):null,e.description||o.description?d("div",{class:`${c}-thing-main__description`,style:o.descriptionStyle},e.description?e.description():o.description):null),e.default||o.content?d("div",{class:`${c}-thing-main__content`,style:o.contentStyle},e.default?e.default():o.content):null,e.footer?d("div",{class:`${c}-thing-main__footer`},e.footer()):null,e.action?d("div",{class:`${c}-thing-main__action`},e.action()):null))}}}),qe={class:"p-2 pt-0 space-y-5 min-h-[200px]"},Qe={class:"space-y-6"},Xe=p("div",{class:"flex items-center space-x-4"},[p("span",{class:"flex-shrink-0 w-[100px]"}," 当前版本 "),p("span",{class:"flex-1"}," 1.2.0 ")],-1),Ye={class:"flex items-center space-x-4"},Ze={class:"flex-shrink-0 w-[100px]"},et={class:"flex flex-wrap items-center gap-4"},tt={class:"flex-shrink-0 w-[100px]"},ot={class:"flex flex-wrap items-center gap-4"},rt={class:"flex items-center space-x-4"},it={class:"flex-shrink-0 w-[100px]"},lt={class:"flex items-center space-x-4"},at={class:"flex-shrink-0 w-[100px]"},nt=I({__name:"General",setup(o){const e=je();de();const{isMobile:u}=ce(),n=N(()=>e.theme),k=L(!1),h=[{label:"Auto",key:"auto",icon:"ri:contrast-line"},{label:"Light",key:"light",icon:"ri:sun-foggy-line"},{label:"Dark",key:"dark",icon:"ri:moon-foggy-line"}];function v(){localStorage.removeItem("chatStorage"),location.reload()}function _(){localStorage.removeItem("token"),location.reload()}return(f,b)=>(T(),A("div",qe,[p("div",Qe,[Xe,p("div",Ye,[p("span",Ze,g(f.$t("setting.theme")),1),p("div",et,[(T(),A(M,null,X(h,c=>a(t(C),{key:c.key,size:"small",type:c.key===t(n)?"primary":void 0,onClick:E=>t(e).setTheme(c.key)},{icon:s(()=>[a(t(V),{icon:c.icon},null,8,["icon"])]),_:2},1032,["type","onClick"])),64))])]),p("div",{class:ue(["flex items-center space-x-4",t(u)&&"items-start"])},[p("span",tt,g(f.$t("setting.chatHistory")),1),p("div",ot,[a(t(ve),{placement:"bottom",onPositiveClick:v},{trigger:s(()=>[a(t(C),{size:"small"},{icon:s(()=>[a(t(V),{icon:"ri:close-circle-line"})]),default:s(()=>[z(" "+g(f.$t("common.clear")),1)]),_:1})]),default:s(()=>[z(" "+g(f.$t("chat.clearHistoryConfirm")),1)]),_:1})])],2),p("div",rt,[p("span",it,g(f.$t("store.siderButton")),1),a(t(C),{size:"small",onClick:b[0]||(b[0]=c=>k.value=!0)},{icon:s(()=>[a(t(V),{icon:"ri:settings-3-line"})]),default:s(()=>[z(" "+g(f.$t("setting.config")),1)]),_:1})]),p("div",lt,[p("span",at,g(f.$t("setting.account")),1),a(t(C),{size:"small",onClick:_},{icon:s(()=>[a(t(V),{icon:"ri:logout-box-line"})]),default:s(()=>[z(" "+g(f.$t("setting.logout")),1)]),_:1})])]),a(t(xt),{visible:k.value,"onUpdate:visible":b[1]||(b[1]=c=>k.value=c)},null,8,["visible"])]))}}),St=I({__name:"index",props:{visible:{type:Boolean}},emits:["update:visible"],setup(o,{emit:e}){const u=o,n=N({get(){return u.visible},set(k){e("update:visible",k)}});return(k,h)=>(T(),U(t(Y),{show:t(n),"onUpdate:show":h[0]||(h[0]=v=>me(n)?n.value=v:null),title:"设置","auto-focus":!1,preset:"card",style:{width:"95%","max-width":"640px"}},{default:s(()=>[a(nt)]),_:1},8,["show"]))}}),st=[{key:"awesome-prompts-zh",desc:"Prompt 中文调教指南",downloadUrl:"https://raw.githubusercontent.com/PlexPt/awesome-chatgpt-prompts-zh/main/prompts-zh.json",url:"https://github.com/PlexPt/awesome-chatgpt-prompts-zh"},{key:"awesome-prompts-zh-TW",desc:"Prompt 中文調教指南 (從簡體中文轉換為繁體中文的版本)",downloadUrl:"https://raw.githubusercontent.com/PlexPt/awesome-chatgpt-prompts-zh/main/prompts-zh-TW.json",url:"https://github.com/PlexPt/awesome-chatgpt-prompts-zh"}],dt={class:"space-y-4"},ct={class:"flex items-center space-x-4"},ut={class:"flex items-center"},vt={class:"flex flex-col items-center gap-2"},mt={class:"mb-4"},pt={class:"flex items-center gap-4"},ft={class:"max-h-[360px] overflow-y-auto space-y-4"},ht=["title"],gt={class:"flex items-center justify-end space-x-4"},bt=["href"],xt=I({__name:"index",props:{visible:{type:Boolean}},emits:["update:visible"],setup(o,{emit:e}){const u=o,n=de(),k=N({get:()=>u.visible,set:l=>e("update:visible",l)}),h=L(!1),v=L(!1),_=L(!1),f=L(""),{isMobile:b}=ce(),c=Ee(),E=st,w=L(c.promptList),P=L(""),$=L(""),O=L(""),J=L({}),D=(l,r={key:"",value:""})=>{l==="add"?(P.value="",$.value=""):l==="modify"?(J.value={...r},P.value=r.key,$.value=r.value):l==="local_import"&&(P.value="local_import",$.value=""),h.value=!h.value,O.value=l},j=L(""),G=N(()=>j.value.trim().length<1),q=l=>{j.value=l},te=N(()=>P.value.trim().length<1||$.value.trim().length<1),fe=()=>{for(const l of w.value){if(l.key===P.value){n.error(m("store.addRepeatTitleTips"));return}if(l.value===$.value){n.error(m("store.addRepeatContentTips",{msg:P.value}));return}}w.value.unshift({key:P.value,value:$.value}),n.success(m("common.addSuccess")),D("add")},he=()=>{let l=0;for(const i of w.value){if(i.key===J.value.key&&i.value===J.value.value)break;l=l+1}const r=w.value.filter((i,x)=>x!==l);for(const i of r){if(i.key===P.value){n.error(m("store.editRepeatTitleTips"));return}if(i.value===$.value){n.error(m("store.editRepeatContentTips",{msg:i.key}));return}}w.value=[{key:P.value,value:$.value},...r],n.success(m("common.editSuccess")),D("modify")},oe=l=>{w.value=[...w.value.filter(r=>r.key!==l.key)],n.success(m("common.deleteSuccess"))},ge=()=>{w.value=[],n.success(m("common.clearSuccess"))},re=()=>{try{const l=JSON.parse($.value);let r="",i="";if("key"in l[0])r="key",i="value";else if("act"in l[0])r="act",i="prompt";else throw n.warning("prompt key not supported."),new Error("prompt key not supported.");for(const x of l){if(!("key"in x)||!("value"in x))throw new Error(m("store.importError"));let K=!0;for(const le of w.value){if(le.key===x[r]){n.warning(m("store.importRepeatTitle",{msg:x[r]})),K=!1;break}if(le.value===x[i]){n.warning(m("store.importRepeatContent",{msg:x[r]})),K=!1;break}}K&&w.value.unshift({key:x[r],value:x[i]})}n.success(m("common.importSuccess"))}catch{n.error("JSON 格式错误，请检查 JSON 格式")}},be=()=>{_.value=!0;const l=JSON.stringify(w.value),r=new Blob([l],{type:"application/json"}),i=URL.createObjectURL(r),x=document.createElement("a");x.href=i,x.download="ChatGPTPromptTemplate.json",x.click(),URL.revokeObjectURL(i),_.value=!1},xe=async()=>{try{v.value=!0;const r=await(await fetch(j.value)).json();if("key"in r[0]&&"value"in r[0]&&($.value=JSON.stringify(r)),"act"in r[0]&&"prompt"in r[0]){const i=r.map(x=>({key:x.act,value:x.prompt}));$.value=JSON.stringify(i)}re(),j.value=""}catch{n.error(m("store.downloadError")),j.value=""}finally{v.value=!1}},ye=()=>{const[l,r]=b.value?[10,30]:[15,50];return w.value.map(i=>({renderKey:i.key.length<=l?i.key:`${i.key.substring(0,l)}...`,renderValue:i.value.length<=r?i.value:`${i.value.substring(0,r)}...`,key:i.key,value:i.value}))},ke=N(()=>{const[l,r]=b.value?[6,5]:[7,15];return{pageSize:l,pageSlot:r}}),we=(()=>[{title:m("store.title"),key:"renderKey"},{title:m("store.description"),key:"renderValue"},{title:m("common.action"),key:"actions",width:100,align:"center",render(l){return d("div",{class:"flex items-center flex-col gap-2"},{default:()=>[d(C,{tertiary:!0,size:"small",type:"info",onClick:()=>D("modify",l)},{default:()=>m("common.edit")}),d(C,{tertiary:!0,size:"small",type:"error",onClick:()=>oe(l)},{default:()=>m("common.delete")})]})}}])();De(()=>w,()=>{c.updatePromptList(w.value)},{deep:!0});const ie=N(()=>{const l=ye(),r=f.value;return r&&r!==""?l.filter(i=>i.renderKey.includes(r)||i.renderValue.includes(r)):l});return(l,r)=>(T(),A(M,null,[a(t(Y),{title:"提示词管理",show:t(k),"onUpdate:show":r[6]||(r[6]=i=>me(k)?k.value=i:null),style:{width:"90%","max-width":"900px"},preset:"card"},{default:s(()=>[p("div",dt,[a(t(Oe),{type:"segment"},{default:s(()=>[a(t(ne),{name:"local",tab:l.$t("store.local")},{default:s(()=>[p("div",{class:ue(["flex gap-3 mb-4",[t(b)?"flex-col":"flex-row justify-between"]])},[p("div",ct,[a(t(C),{type:"primary",size:"small",onClick:r[0]||(r[0]=i=>D("add"))},{default:s(()=>[z(g(l.$t("common.add")),1)]),_:1}),a(t(C),{size:"small",onClick:r[1]||(r[1]=i=>D("local_import"))},{default:s(()=>[z(g(l.$t("common.import")),1)]),_:1}),a(t(C),{size:"small",loading:_.value,onClick:r[2]||(r[2]=i=>be())},{default:s(()=>[z(g(l.$t("common.export")),1)]),_:1},8,["loading"]),a(t(ve),{onPositiveClick:ge},{trigger:s(()=>[a(t(C),{size:"small"},{default:s(()=>[z(g(l.$t("common.clear")),1)]),_:1})]),default:s(()=>[z(" "+g(l.$t("store.clearStoreConfirm")),1)]),_:1})]),p("div",ut,[a(t(W),{value:f.value,"onUpdate:value":r[3]||(r[3]=i=>f.value=i),style:{width:"100%"}},null,8,["value"])])],2),t(b)?F("",!0):(T(),U(t(Ue),{key:0,"max-height":400,columns:t(we),data:t(ie),pagination:t(ke),bordered:!1},null,8,["columns","data","pagination"])),t(b)?(T(),U(t(Ke),{key:1,style:{"max-height":"400px","overflow-y":"auto"}},{default:s(()=>[(T(!0),A(M,null,X(t(ie),(i,x)=>(T(),U(t(We),{key:x},{suffix:s(()=>[p("div",vt,[a(t(C),{tertiary:"",size:"small",type:"info",onClick:K=>D("modify",i)},{default:s(()=>[z(g(t(m)("common.edit")),1)]),_:2},1032,["onClick"]),a(t(C),{tertiary:"",size:"small",type:"error",onClick:K=>oe(i)},{default:s(()=>[z(g(t(m)("common.delete")),1)]),_:2},1032,["onClick"])])]),default:s(()=>[a(t(Ge),{title:i.renderKey,description:i.renderValue},null,8,["title","description"])]),_:2},1024))),128))]),_:1})):F("",!0)]),_:1},8,["tab"]),a(t(ne),{name:"download",tab:l.$t("store.online")},{default:s(()=>[p("p",mt,g(l.$t("store.onlineImportWarning")),1),p("div",pt,[a(t(W),{value:j.value,"onUpdate:value":r[4]||(r[4]=i=>j.value=i),placeholder:""},null,8,["value"]),a(t(C),{strong:"",secondary:"",disabled:t(G),loading:v.value,onClick:r[5]||(r[5]=i=>xe())},{default:s(()=>[z(g(l.$t("common.download")),1)]),_:1},8,["disabled","loading"])]),a(t(Me)),p("div",ft,[(T(!0),A(M,null,X(t(E),i=>(T(),U(t(Be),{key:i.key,title:i.key,bordered:!0,embedded:""},{footer:s(()=>[p("div",gt,[a(t(C),{text:""},{default:s(()=>[p("a",{href:i.url,target:"_blank"},[a(t(V),{class:"text-xl",icon:"ri:link"})],8,bt)]),_:2},1024),a(t(C),{text:"",onClick:x=>q(i.downloadUrl)},{default:s(()=>[a(t(V),{class:"text-xl",icon:"ri:add-fill"})]),_:2},1032,["onClick"])])]),default:s(()=>[p("p",{class:"overflow-hidden text-ellipsis whitespace-nowrap",title:i.desc},g(i.desc),9,ht)]),_:2},1032,["title"]))),128))])]),_:1},8,["tab"])]),_:1})])]),_:1},8,["show"]),a(t(Y),{show:h.value,"onUpdate:show":r[12]||(r[12]=i=>h.value=i),style:{width:"90%","max-width":"600px"},preset:"card"},{default:s(()=>[O.value==="add"||O.value==="modify"?(T(),U(t(ae),{key:0,vertical:""},{default:s(()=>[z(g(t(m)("store.title"))+" ",1),a(t(W),{value:P.value,"onUpdate:value":r[7]||(r[7]=i=>P.value=i)},null,8,["value"]),z(" "+g(t(m)("store.description"))+" ",1),a(t(W),{value:$.value,"onUpdate:value":r[8]||(r[8]=i=>$.value=i),type:"textarea"},null,8,["value"]),a(t(C),{block:"",type:"primary",disabled:t(te),onClick:r[9]||(r[9]=()=>{O.value==="add"?fe():he()})},{default:s(()=>[z(g(t(m)("common.confirm")),1)]),_:1},8,["disabled"])]),_:1})):F("",!0),O.value==="local_import"?(T(),U(t(ae),{key:1,vertical:""},{default:s(()=>[a(t(W),{value:$.value,"onUpdate:value":r[10]||(r[10]=i=>$.value=i),placeholder:t(m)("store.importPlaceholder"),autosize:{minRows:3,maxRows:15},type:"textarea"},null,8,["value","placeholder"]),a(t(C),{block:"",type:"primary",disabled:t(te),onClick:r[11]||(r[11]=()=>{re()})},{default:s(()=>[z(g(t(m)("common.import")),1)]),_:1},8,["disabled"])]),_:1})):F("",!0)]),_:1},8,["show"])],64))}});export{St as default};
