import{d as I,r as w,h as S,u as Q,ak as Se,a2 as ze,al as $e,am as ke,an as Ce,w as N,ao as W,l as i,ap as xe,T as Z,aq as Be,ar as ee,as as te,at as Y,p as Ee,au as O,av as Re,aw as Te,ax as Me,c as s,ay as D,a as p,az as $,aA as T,aB as Ae,j as Fe,g as re,e as X,t as V,aC as Oe,i as Ie,aD as De,aE as _e,aF as Pe,aG as K,aH as He,v as E,aI as je,aJ as Ue,aK as q,x as L,A as oe,B as Ne,y as Le,C as M,F as Ye,U as We,R as Xe,H as F,z as U,aL as Ve,J as Ke,ae as qe,af as J,L as Je}from"./index-fbbac701.js";import{_ as Ge}from"./index.vue_vue_type_script_setup_true_lang-9e073c9f.js";import{b as Qe}from"./DataTable-1f6f0c54.js";import{N as G}from"./Time-e45edf09.js";import"./Dropdown-178d9d7e.js";import"./FocusDetector-10318a71.js";import"./Forward-3cd0631b.js";import"./index-f5ac7aca.js";const Ze=I({name:"NDrawerContent",inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(e){const t=w(!!e.show),r=w(null),u=te(Y);let n=0,l="",d=null;const f=w(!1),m=w(!1),g=S(()=>e.placement==="top"||e.placement==="bottom"),{mergedClsPrefixRef:v,mergedRtlRef:o}=Q(e),b=Se("Drawer",o,v),C=a=>{m.value=!0,n=g.value?a.clientY:a.clientX,l=document.body.style.cursor,document.body.style.cursor=g.value?"ns-resize":"ew-resize",document.body.addEventListener("mousemove",R),document.body.addEventListener("mouseleave",z),document.body.addEventListener("mouseup",k)},_=()=>{d!==null&&(window.clearTimeout(d),d=null),m.value?f.value=!0:d=window.setTimeout(()=>{f.value=!0},300)},P=()=>{d!==null&&(window.clearTimeout(d),d=null),f.value=!1},{doUpdateHeight:H,doUpdateWidth:j}=u,R=a=>{var y,A;if(m.value)if(g.value){let x=((y=r.value)===null||y===void 0?void 0:y.offsetHeight)||0;const B=n-a.clientY;x+=e.placement==="bottom"?B:-B,H(x),n=a.clientY}else{let x=((A=r.value)===null||A===void 0?void 0:A.offsetWidth)||0;const B=n-a.clientX;x+=e.placement==="right"?B:-B,j(x),n=a.clientX}},k=()=>{m.value&&(n=0,m.value=!1,document.body.style.cursor=l,document.body.removeEventListener("mousemove",R),document.body.removeEventListener("mouseup",k),document.body.removeEventListener("mouseleave",z))},z=k;ze(()=>{e.show&&(t.value=!0)}),$e(()=>e.show,a=>{a||k()}),ke(()=>{k()});const c=S(()=>{const{show:a}=e,y=[[W,a]];return e.showMask||y.push([Ee,e.onClickoutside,void 0,{capture:!0}]),y});function h(){var a;t.value=!1,(a=e.onAfterLeave)===null||a===void 0||a.call(e)}return Ce(S(()=>e.blockScroll&&t.value)),O(Re,r),O(Te,null),O(Me,null),{bodyRef:r,rtlEnabled:b,mergedClsPrefix:u.mergedClsPrefixRef,isMounted:u.isMountedRef,mergedTheme:u.mergedThemeRef,displayed:t,transitionName:S(()=>({right:"slide-in-from-right-transition",left:"slide-in-from-left-transition",top:"slide-in-from-top-transition",bottom:"slide-in-from-bottom-transition"})[e.placement]),handleAfterLeave:h,bodyDirectives:c,handleMousedownResizeTrigger:C,handleMouseenterResizeTrigger:_,handleMouseleaveResizeTrigger:P,isDragging:m,isHoverOnResizeTrigger:f}},render(){const{$slots:e,mergedClsPrefix:t}=this;return this.displayDirective==="show"||this.displayed||this.show?N(i("div",{role:"none"},i(xe,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>i(Z,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>N(i("div",Be(this.$attrs,{role:"dialog",ref:"bodyRef","aria-modal":"true",class:[`${t}-drawer`,this.rtlEnabled&&`${t}-drawer--rtl`,`${t}-drawer--${this.placement}-placement`,this.isDragging&&`${t}-drawer--unselectable`,this.nativeScrollbar&&`${t}-drawer--native-scrollbar`]}),[this.resizable?i("div",{class:[`${t}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${t}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?i("div",{class:`${t}-drawer-content-wrapper`,style:this.contentStyle,role:"none"},e):i(ee,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:`${t}-drawer-content-wrapper`,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),e)]),this.bodyDirectives)})})),[[W,this.displayDirective==="if"||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:et,cubicBezierEaseOut:tt}=D;function rt({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-right"}={}){return[s(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${et}`}),s(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${tt}`}),s(`&.${r}-transition-enter-to`,{transform:"translateX(0)"}),s(`&.${r}-transition-enter-from`,{transform:"translateX(100%)"}),s(`&.${r}-transition-leave-from`,{transform:"translateX(0)"}),s(`&.${r}-transition-leave-to`,{transform:"translateX(100%)"})]}const{cubicBezierEaseIn:ot,cubicBezierEaseOut:nt}=D;function at({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-left"}={}){return[s(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${ot}`}),s(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${nt}`}),s(`&.${r}-transition-enter-to`,{transform:"translateX(0)"}),s(`&.${r}-transition-enter-from`,{transform:"translateX(-100%)"}),s(`&.${r}-transition-leave-from`,{transform:"translateX(0)"}),s(`&.${r}-transition-leave-to`,{transform:"translateX(-100%)"})]}const{cubicBezierEaseIn:st,cubicBezierEaseOut:it}=D;function lt({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-top"}={}){return[s(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${st}`}),s(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${it}`}),s(`&.${r}-transition-enter-to`,{transform:"translateY(0)"}),s(`&.${r}-transition-enter-from`,{transform:"translateY(-100%)"}),s(`&.${r}-transition-leave-from`,{transform:"translateY(0)"}),s(`&.${r}-transition-leave-to`,{transform:"translateY(-100%)"})]}const{cubicBezierEaseIn:ct,cubicBezierEaseOut:dt}=D;function ut({duration:e="0.3s",leaveDuration:t="0.2s",name:r="slide-in-from-bottom"}={}){return[s(`&.${r}-transition-leave-active`,{transition:`transform ${t} ${ct}`}),s(`&.${r}-transition-enter-active`,{transition:`transform ${e} ${dt}`}),s(`&.${r}-transition-enter-to`,{transform:"translateY(0)"}),s(`&.${r}-transition-enter-from`,{transform:"translateY(100%)"}),s(`&.${r}-transition-leave-from`,{transform:"translateY(0)"}),s(`&.${r}-transition-leave-to`,{transform:"translateY(100%)"})]}const ht=s([p("drawer",`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[rt(),at(),lt(),ut(),$("unselectable",`
 user-select: none; 
 -webkit-user-select: none;
 `),$("native-scrollbar",[p("drawer-content-wrapper",`
 overflow: auto;
 height: 100%;
 `)]),T("resize-trigger",`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[$("hover",`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),p("drawer-content-wrapper",`
 box-sizing: border-box;
 `),p("drawer-content",`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[$("native-scrollbar",[p("drawer-body-content-wrapper",`
 height: 100%;
 overflow: auto;
 `)]),p("drawer-body",`
 flex: 1 0 0;
 overflow: hidden;
 `),p("drawer-body-content-wrapper",`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),p("drawer-header",`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[T("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),p("drawer-footer",`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),$("right-placement",`
 top: 0;
 bottom: 0;
 right: 0;
 `,[T("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),$("left-placement",`
 top: 0;
 bottom: 0;
 left: 0;
 `,[T("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),$("top-placement",`
 top: 0;
 left: 0;
 right: 0;
 `,[T("resize-trigger",`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),$("bottom-placement",`
 left: 0;
 bottom: 0;
 right: 0;
 `,[T("resize-trigger",`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),s("body",[s(">",[p("drawer-container",{position:"fixed"})])]),p("drawer-container",`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[s("> *",{pointerEvents:"all"})]),p("drawer-mask",`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[$("invisible",`
 background-color: rgba(0, 0, 0, 0)
 `),Ae({enterDuration:"0.2s",leaveDuration:"0.2s",enterCubicBezier:"var(--n-bezier-in)",leaveCubicBezier:"var(--n-bezier-out)"})])]),ft=Object.assign(Object.assign({},re.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:"right"},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:"if"},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),mt=I({name:"Drawer",inheritAttrs:!1,props:ft,setup(e){const{mergedClsPrefixRef:t,namespaceRef:r,inlineThemeDisabled:u}=Q(e),n=Fe(),l=re("Drawer","-drawer",ht,Pe,e,t),d=w(e.defaultWidth),f=w(e.defaultHeight),m=X(V(e,"width"),d),g=X(V(e,"height"),f),v=S(()=>{const{placement:c}=e;return c==="top"||c==="bottom"?"":K(m.value)}),o=S(()=>{const{placement:c}=e;return c==="left"||c==="right"?"":K(g.value)}),b=c=>{const{onUpdateWidth:h,"onUpdate:width":a}=e;h&&E(h,c),a&&E(a,c),d.value=c},C=c=>{const{onUpdateHeight:h,"onUpdate:width":a}=e;h&&E(h,c),a&&E(a,c),f.value=c},_=S(()=>[{width:v.value,height:o.value},e.drawerStyle||""]);function P(c){const{onMaskClick:h,maskClosable:a}=e;a&&R(!1),h&&h(c)}const H=Oe();function j(c){var h;(h=e.onEsc)===null||h===void 0||h.call(e),e.show&&e.closeOnEsc&&He(c)&&!H.value&&R(!1)}function R(c){const{onHide:h,onUpdateShow:a,"onUpdate:show":y}=e;a&&E(a,c),y&&E(y,c),h&&!c&&E(h,c)}O(Y,{isMountedRef:n,mergedThemeRef:l,mergedClsPrefixRef:t,doUpdateShow:R,doUpdateHeight:C,doUpdateWidth:b});const k=S(()=>{const{common:{cubicBezierEaseInOut:c,cubicBezierEaseIn:h,cubicBezierEaseOut:a},self:{color:y,textColor:A,boxShadow:x,lineHeight:B,headerPadding:ne,footerPadding:ae,bodyPadding:se,titleFontSize:ie,titleTextColor:le,titleFontWeight:ce,headerBorderBottom:de,footerBorderTop:ue,closeIconColor:he,closeIconColorHover:fe,closeIconColorPressed:me,closeColorHover:ge,closeColorPressed:ve,closeIconSize:be,closeSize:pe,closeBorderRadius:we,resizableTriggerColorHover:ye}}=l.value;return{"--n-line-height":B,"--n-color":y,"--n-text-color":A,"--n-box-shadow":x,"--n-bezier":c,"--n-bezier-out":a,"--n-bezier-in":h,"--n-header-padding":ne,"--n-body-padding":se,"--n-footer-padding":ae,"--n-title-text-color":le,"--n-title-font-size":ie,"--n-title-font-weight":ce,"--n-header-border-bottom":de,"--n-footer-border-top":ue,"--n-close-icon-color":he,"--n-close-icon-color-hover":fe,"--n-close-icon-color-pressed":me,"--n-close-size":pe,"--n-close-color-hover":ge,"--n-close-color-pressed":ve,"--n-close-icon-size":be,"--n-close-border-radius":we,"--n-resize-trigger-color-hover":ye}}),z=u?Ie("drawer",void 0,k,e):void 0;return{mergedClsPrefix:t,namespace:r,mergedBodyStyle:_,handleMaskClick:P,handleEsc:j,mergedTheme:l,cssVars:u?void 0:k,themeClass:z==null?void 0:z.themeClass,onRender:z==null?void 0:z.onRender,isMounted:n}},render(){const{mergedClsPrefix:e}=this;return i(_e,{to:this.to,show:this.show},{default:()=>{var t;return(t=this.onRender)===null||t===void 0||t.call(this),N(i("div",{class:[`${e}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:"none"},this.showMask?i(Z,{name:"fade-in-transition",appear:this.isMounted},{default:()=>this.show?i("div",{"aria-hidden":!0,class:[`${e}-drawer-mask`,this.showMask==="transparent"&&`${e}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,i(Ze,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleMaskClick}),this.$slots)),[[De,{zIndex:this.zIndex,enabled:this.show}]])}})}}),gt={title:{type:String},headerStyle:[Object,String],footerStyle:[Object,String],bodyStyle:[Object,String],bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},vt=I({name:"DrawerContent",props:gt,setup(){const e=te(Y,null);e||je("drawer-content","`n-drawer-content` must be placed inside `n-drawer`.");const{doUpdateShow:t}=e;function r(){t(!1)}return{handleCloseClick:r,mergedTheme:e.mergedThemeRef,mergedClsPrefix:e.mergedClsPrefixRef}},render(){const{title:e,mergedClsPrefix:t,nativeScrollbar:r,mergedTheme:u,bodyStyle:n,bodyContentStyle:l,headerStyle:d,footerStyle:f,scrollbarProps:m,closable:g,$slots:v}=this;return i("div",{role:"none",class:[`${t}-drawer-content`,r&&`${t}-drawer-content--native-scrollbar`]},v.header||e||g?i("div",{class:`${t}-drawer-header`,style:d,role:"none"},i("div",{class:`${t}-drawer-header__main`,role:"heading","aria-level":"1"},v.header!==void 0?v.header():e),g&&i(Ue,{onClick:this.handleCloseClick,clsPrefix:t,class:`${t}-drawer-header__close`,absolute:!0})):null,r?i("div",{class:`${t}-drawer-body`,style:n,role:"none"},i("div",{class:`${t}-drawer-body-content-wrapper`,style:l,role:"none"},v)):i(ee,Object.assign({themeOverrides:u.peerOverrides.Scrollbar,theme:u.peers.Scrollbar},m,{class:`${t}-drawer-body`,contentClass:`${t}-drawer-body-content-wrapper`,contentStyle:l}),v),v.footer?i("div",{class:`${t}-drawer-footer`,style:f,role:"none"},v.footer()):null)}}),bt={__name:"Talks",props:{currentItem:{type:Object,default:()=>({})}},setup(e){const{currentItem:t}=e,r=S(()=>((t==null?void 0:t.talks)||[]).reduce((u,n)=>{var l,d;return u.push({dateTime:n.createAt||n.time?q(n.createAt||n.time).format("YYYY/MM/DD HH:mm:ss"):"",text:((l=n==null?void 0:n.prompt)==null?void 0:l.trim())||"",inversion:!0,isSuccess:n.isSuccess,count:n.count}),u.push({dateTime:n.updateAt||n.time?q(n.updateAt||n.time).format("YYYY/MM/DD HH:mm:ss"):"",text:((d=n==null?void 0:n.text)==null?void 0:d.trim())||"",inversion:!1,isSuccess:n.isSuccess,count:n.count}),u},[]));return(u,n)=>(L(!0),oe(Ye,null,Ne(M(r),(l,d)=>{var f,m,g;return L(),Le(Ge,{key:d,"date-time":l.dateTime,text:l.text,inversion:l.inversion,error:l.error,loading:l.loading,isSuccess:l.isSuccess,count:l.count,avatar:(g=(m=(f=e.currentItem)==null?void 0:f.user)==null?void 0:m.wx)==null?void 0:g.headimgurl,isView:""},null,8,["date-time","text","inversion","error","loading","isSuccess","count","avatar"])}),128))}},xt=I({__name:"index",setup(e){const t=We(),r=w(!1),u=w(!1),n=w(),l=w({updateAt:"descend"}),d=w({page:1,pageSize:10,itemCount:0,showSizePicker:!0,pageSizes:[10,20,50,100],onChange:o=>{d.value.page=o,f()},onUpdatePageSize:o=>{d.value.pageSize=o,d.value.page=1,f()},prefix:o=>`共 ${o.itemCount} 条`}),f=async()=>{try{r.value=!0;const{data:o}=await Ve({page:{current:d.value.page,pageSize:d.value.pageSize},sort:l.value});if(r.value=!1,!o)return;m.value=o.list,d.value.itemCount=o.total}catch(o){t.error(o==null?void 0:o.message)}},m=w([]),g=S(()=>[{title:"chatId",key:"chatId",align:"center"},{title:"用户",key:"wx",align:"center",render:o=>i(qe,{userInfo:o.user,showDetail:!0})},{title:"昵称",key:"user.wx.nickname",align:"center"},{title:"对话条数",key:"talks",align:"center",render:o=>i(J,{type:"default"},o.talks.length)},{title:"现有点数",key:"count",align:"center",render:o=>i(J,{type:"default"},()=>{var b;return(b=o.user)==null?void 0:b.count})},{title:"开始时间",key:"createAt",align:"center",sortOrder:l.value.createAt||!1,sorter:(o,b)=>o.createAt-b.createAt,render:o=>i(G,{time:Number(o.createAt)})},{title:"结束时间",key:"updateAt",align:"center",sortOrder:l.value.updateAt||!1,sorter:(o,b)=>o.updateAt-b.updateAt,render:o=>i(G,{time:Number(o.updateAt)})},{title:"操作",key:"action",align:"center",render:o=>i("div",{onClick:()=>{u.value=!0,n.value=o}},i(Je,{type:"primary",size:"small"},"查看"))}]);Xe(()=>{f()});const v=o=>{if(!o.order){l.value={};return}l.value={[o.columnKey]:o.order},f()};return(o,b)=>(L(),oe("div",null,[F(M(Ke),{title:"对话日志",size:"small"},{default:U(()=>[F(M(Qe),{remote:"","row-key":C=>C.chatId,loading:r.value,columns:M(g),data:m.value,bordered:!1,pagination:d.value,"onUpdate:sorter":v,"scroll-x":"1350"},null,8,["row-key","loading","columns","data","pagination"])]),_:1}),F(M(mt),{show:u.value,"onUpdate:show":b[0]||(b[0]=C=>u.value=C),width:"60%",placement:"right"},{default:U(()=>[F(M(vt),{title:"日志"},{default:U(()=>[F(bt,{currentItem:n.value},null,8,["currentItem"])]),_:1})]),_:1},8,["show"])]))}});export{xt as default};
