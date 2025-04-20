import{r as I,al as me,d as ie,bS as pt,bT as gt,R as We,P as fn,l as d,b1 as bt,bU as mt,cm as wn,am as Fn,a as N,aA as $,c as te,u as He,g as ue,cn as yt,aX as Tn,as as ce,co as wt,h as O,b4 as le,i as Ne,aZ as Nn,bp as Pe,bY as fe,T as hn,cp as vn,az as J,aT as Ae,f as pn,t as Q,cq as xt,au as be,bd as Ct,bi as St,ar as Rt,b0 as Pt,bg as Ot,cr as en,cs as kt,ct as Ft,a2 as Tt,cu as Nt,cv as zt,af as nn,ab as zn,F as Mn,e as sn,b_ as Mt,b as _t,j as It,k as dn,V as _n,m as In,o as An,w as At,ao as $t,p as xn,cw as Bt,s as Kt,a_ as Et,v as se,cx as Lt,aG as Dt,b3 as $n,aq as gn,aW as bn,aw as Bn,ch as jt,cy as Vt,cz as Wt,ax as Ht,av as Gt,c7 as Ut,c8 as Kn,cA as qt}from"./index-fbbac701.js";import{V as Zt,h as Te,F as Xt,u as Yt}from"./FocusDetector-10318a71.js";function Jt(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function Qt(e){return n=>{n?e.value=n.$el:e.value=null}}function tn(e){const n=e.filter(t=>t!==void 0);if(n.length!==0)return n.length===1?n[0]:t=>{e.forEach(o=>{o&&o(t)})}}function eo(e,n,t){if(!n)return e;const o=I(e.value);let r=null;return me(e,i=>{r!==null&&window.clearTimeout(r),i===!0?t&&!t.value?o.value=!0:r=window.setTimeout(()=>{o.value=!0},n):o.value=!1}),o}const Re="v-hidden",no=mt("[v-hidden]",{display:"none!important"}),Cn=ie({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(e,{slots:n}){const t=I(null),o=I(null);function r(){const{value:l}=t,{getCounter:a,getTail:c}=e;let f;if(a!==void 0?f=a():f=o.value,!l||!f)return;f.hasAttribute(Re)&&f.removeAttribute(Re);const{children:h}=l,p=l.offsetWidth,R=[],T=n.tail?c==null?void 0:c():null;let g=T?T.offsetWidth:0,F=!1;const _=l.children.length-(n.tail?1:0);for(let P=0;P<_-1;++P){if(P<0)continue;const j=h[P];if(F){j.hasAttribute(Re)||j.setAttribute(Re,"");continue}else j.hasAttribute(Re)&&j.removeAttribute(Re);const y=j.offsetWidth;if(g+=y,R[P]=y,g>p){const{updateCounter:w}=e;for(let z=P;z>=0;--z){const W=_-1-z;w!==void 0?w(W):f.textContent=`${W}`;const H=f.offsetWidth;if(g-=R[z],g+H<=p||z===0){F=!0,P=z-1,T&&(P===-1?(T.style.maxWidth=`${p-H}px`,T.style.boxSizing="border-box"):T.style.maxWidth="");break}}}}const{onUpdateOverflow:S}=e;F?S!==void 0&&S(!0):(S!==void 0&&S(!1),f.setAttribute(Re,""))}const i=pt();return no.mount({id:"vueuc/overflow",head:!0,anchorMetaName:gt,ssr:i}),We(r),{selfRef:t,counterRef:o,sync:r}},render(){const{$slots:e}=this;return fn(this.sync),d("div",{class:"v-overflow",ref:"selfRef"},[bt(e,"default"),e.counter?e.counter():d("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function En(e,n){n&&(We(()=>{const{value:t}=e;t&&wn.registerHandler(t,n)}),Fn(()=>{const{value:t}=e;t&&wn.unregisterHandler(t)}))}const to=ie({name:"Checkmark",render(){return d("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},d("g",{fill:"none"},d("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),oo=ie({name:"Empty",render(){return d("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),d("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}});function Sn(e){return Array.isArray(e)?e:[e]}const un={STOP:"STOP"};function Ln(e,n){const t=n(e);e.children!==void 0&&t!==un.STOP&&e.children.forEach(o=>Ln(o,n))}function ro(e,n={}){const{preserveGroup:t=!1}=n,o=[],r=t?l=>{l.isLeaf||(o.push(l.key),i(l.children))}:l=>{l.isLeaf||(l.isGroup||o.push(l.key),i(l.children))};function i(l){l.forEach(r)}return i(e),o}function io(e,n){const{isLeaf:t}=e;return t!==void 0?t:!n(e)}function lo(e){return e.children}function ao(e){return e.key}function so(){return!1}function uo(e,n){const{isLeaf:t}=e;return!(t===!1&&!Array.isArray(n(e)))}function co(e){return e.disabled===!0}function fo(e,n){return e.isLeaf===!1&&!Array.isArray(n(e))}function on(e){var n;return e==null?[]:Array.isArray(e)?e:(n=e.checkedKeys)!==null&&n!==void 0?n:[]}function rn(e){var n;return e==null||Array.isArray(e)?[]:(n=e.indeterminateKeys)!==null&&n!==void 0?n:[]}function ho(e,n){const t=new Set(e);return n.forEach(o=>{t.has(o)||t.add(o)}),Array.from(t)}function vo(e,n){const t=new Set(e);return n.forEach(o=>{t.has(o)&&t.delete(o)}),Array.from(t)}function po(e){return(e==null?void 0:e.type)==="group"}function go(e){const n=new Map;return e.forEach((t,o)=>{n.set(t.key,o)}),t=>{var o;return(o=n.get(t))!==null&&o!==void 0?o:null}}class bo extends Error{constructor(){super(),this.message="SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded."}}function mo(e,n,t,o){return je(n.concat(e),t,o,!1)}function yo(e,n){const t=new Set;return e.forEach(o=>{const r=n.treeNodeMap.get(o);if(r!==void 0){let i=r.parent;for(;i!==null&&!(i.disabled||t.has(i.key));)t.add(i.key),i=i.parent}}),t}function wo(e,n,t,o){const r=je(n,t,o,!1),i=je(e,t,o,!0),l=yo(e,t),a=[];return r.forEach(c=>{(i.has(c)||l.has(c))&&a.push(c)}),a.forEach(c=>r.delete(c)),r}function ln(e,n){const{checkedKeys:t,keysToCheck:o,keysToUncheck:r,indeterminateKeys:i,cascade:l,leafOnly:a,checkStrategy:c,allowNotLoaded:f}=e;if(!l)return o!==void 0?{checkedKeys:ho(t,o),indeterminateKeys:Array.from(i)}:r!==void 0?{checkedKeys:vo(t,r),indeterminateKeys:Array.from(i)}:{checkedKeys:Array.from(t),indeterminateKeys:Array.from(i)};const{levelTreeNodeMap:h}=n;let p;r!==void 0?p=wo(r,t,n,f):o!==void 0?p=mo(o,t,n,f):p=je(t,n,f,!1);const R=c==="parent",T=c==="child"||a,g=p,F=new Set,_=Math.max.apply(null,Array.from(h.keys()));for(let S=_;S>=0;S-=1){const P=S===0,j=h.get(S);for(const y of j){if(y.isLeaf)continue;const{key:w,shallowLoaded:z}=y;if(T&&z&&y.children.forEach(B=>{!B.disabled&&!B.isLeaf&&B.shallowLoaded&&g.has(B.key)&&g.delete(B.key)}),y.disabled||!z)continue;let W=!0,H=!1,X=!0;for(const B of y.children){const Y=B.key;if(!B.disabled){if(X&&(X=!1),g.has(Y))H=!0;else if(F.has(Y)){H=!0,W=!1;break}else if(W=!1,H)break}}W&&!X?(R&&y.children.forEach(B=>{!B.disabled&&g.has(B.key)&&g.delete(B.key)}),g.add(w)):H&&F.add(w),P&&T&&g.has(w)&&g.delete(w)}}return{checkedKeys:Array.from(g),indeterminateKeys:Array.from(F)}}function je(e,n,t,o){const{treeNodeMap:r,getChildren:i}=n,l=new Set,a=new Set(e);return e.forEach(c=>{const f=r.get(c);f!==void 0&&Ln(f,h=>{if(h.disabled)return un.STOP;const{key:p}=h;if(!l.has(p)&&(l.add(p),a.add(p),fo(h.rawNode,i))){if(o)return un.STOP;if(!t)throw new bo}})}),a}function xo(e,{includeGroup:n=!1,includeSelf:t=!0},o){var r;const i=o.treeNodeMap;let l=e==null?null:(r=i.get(e))!==null&&r!==void 0?r:null;const a={keyPath:[],treeNodePath:[],treeNode:l};if(l!=null&&l.ignored)return a.treeNode=null,a;for(;l;)!l.ignored&&(n||!l.isGroup)&&a.treeNodePath.push(l),l=l.parent;return a.treeNodePath.reverse(),t||a.treeNodePath.pop(),a.keyPath=a.treeNodePath.map(c=>c.key),a}function Co(e){if(e.length===0)return null;const n=e[0];return n.isGroup||n.ignored||n.disabled?n.getNext():n}function So(e,n){const t=e.siblings,o=t.length,{index:r}=e;return n?t[(r+1)%o]:r===t.length-1?null:t[r+1]}function Rn(e,n,{loop:t=!1,includeDisabled:o=!1}={}){const r=n==="prev"?Ro:So,i={reverse:n==="prev"};let l=!1,a=null;function c(f){if(f!==null){if(f===e){if(!l)l=!0;else if(!e.disabled&&!e.isGroup){a=e;return}}else if((!f.disabled||o)&&!f.ignored&&!f.isGroup){a=f;return}if(f.isGroup){const h=mn(f,i);h!==null?a=h:c(r(f,t))}else{const h=r(f,!1);if(h!==null)c(h);else{const p=Po(f);p!=null&&p.isGroup?c(r(p,t)):t&&c(r(f,!0))}}}}return c(e),a}function Ro(e,n){const t=e.siblings,o=t.length,{index:r}=e;return n?t[(r-1+o)%o]:r===0?null:t[r-1]}function Po(e){return e.parent}function mn(e,n={}){const{reverse:t=!1}=n,{children:o}=e;if(o){const{length:r}=o,i=t?r-1:0,l=t?-1:r,a=t?-1:1;for(let c=i;c!==l;c+=a){const f=o[c];if(!f.disabled&&!f.ignored)if(f.isGroup){const h=mn(f,n);if(h!==null)return h}else return f}}return null}const Oo={getChild(){return this.ignored?null:mn(this)},getParent(){const{parent:e}=this;return e!=null&&e.isGroup?e.getParent():e},getNext(e={}){return Rn(this,"next",e)},getPrev(e={}){return Rn(this,"prev",e)}};function ko(e,n){const t=n?new Set(n):void 0,o=[];function r(i){i.forEach(l=>{o.push(l),!(l.isLeaf||!l.children||l.ignored)&&(l.isGroup||t===void 0||t.has(l.key))&&r(l.children)})}return r(e),o}function Fo(e,n){const t=e.key;for(;n;){if(n.key===t)return!0;n=n.parent}return!1}function Dn(e,n,t,o,r,i=null,l=0){const a=[];return e.forEach((c,f)=>{var h;const p=Object.create(o);if(p.rawNode=c,p.siblings=a,p.level=l,p.index=f,p.isFirstChild=f===0,p.isLastChild=f+1===e.length,p.parent=i,!p.ignored){const R=r(c);Array.isArray(R)&&(p.children=Dn(R,n,t,o,r,p,l+1))}a.push(p),n.set(p.key,p),t.has(l)||t.set(l,[]),(h=t.get(l))===null||h===void 0||h.push(p)}),a}function jn(e,n={}){var t;const o=new Map,r=new Map,{getDisabled:i=co,getIgnored:l=so,getIsGroup:a=po,getKey:c=ao}=n,f=(t=n.getChildren)!==null&&t!==void 0?t:lo,h=n.ignoreEmptyChildren?y=>{const w=f(y);return Array.isArray(w)?w.length?w:null:w}:f,p=Object.assign({get key(){return c(this.rawNode)},get disabled(){return i(this.rawNode)},get isGroup(){return a(this.rawNode)},get isLeaf(){return io(this.rawNode,h)},get shallowLoaded(){return uo(this.rawNode,h)},get ignored(){return l(this.rawNode)},contains(y){return Fo(this,y)}},Oo),R=Dn(e,o,r,p,h);function T(y){if(y==null)return null;const w=o.get(y);return w&&!w.isGroup&&!w.ignored?w:null}function g(y){if(y==null)return null;const w=o.get(y);return w&&!w.ignored?w:null}function F(y,w){const z=g(y);return z?z.getPrev(w):null}function _(y,w){const z=g(y);return z?z.getNext(w):null}function S(y){const w=g(y);return w?w.getParent():null}function P(y){const w=g(y);return w?w.getChild():null}const j={treeNodes:R,treeNodeMap:o,levelTreeNodeMap:r,maxLevel:Math.max(...r.keys()),getChildren:h,getFlattenedNodes(y){return ko(R,y)},getNode:T,getPrev:F,getNext:_,getParent:S,getChild:P,getFirstAvailableNode(){return Co(R)},getPath(y,w={}){return xo(y,w,j)},getCheckedKeys(y,w={}){const{cascade:z=!0,leafOnly:W=!1,checkStrategy:H="all",allowNotLoaded:X=!1}=w;return ln({checkedKeys:on(y),indeterminateKeys:rn(y),cascade:z,leafOnly:W,checkStrategy:H,allowNotLoaded:X},j)},check(y,w,z={}){const{cascade:W=!0,leafOnly:H=!1,checkStrategy:X="all",allowNotLoaded:B=!1}=z;return ln({checkedKeys:on(w),indeterminateKeys:rn(w),keysToCheck:y==null?[]:Sn(y),cascade:W,leafOnly:H,checkStrategy:X,allowNotLoaded:B},j)},uncheck(y,w,z={}){const{cascade:W=!0,leafOnly:H=!1,checkStrategy:X="all",allowNotLoaded:B=!1}=z;return ln({checkedKeys:on(w),indeterminateKeys:rn(w),keysToUncheck:y==null?[]:Sn(y),cascade:W,leafOnly:H,checkStrategy:X,allowNotLoaded:B},j)},getNonLeafKeys(y={}){return ro(R,y)}};return j}const To=N("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[$("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[te("+",[$("description",`
 margin-top: 8px;
 `)])]),$("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),$("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),No=Object.assign(Object.assign({},ue.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),zo=ie({name:"Empty",props:No,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:t}=He(e),o=ue("Empty","-empty",To,yt,e,n),{localeRef:r}=Tn("Empty"),i=ce(wt,null),l=O(()=>{var h,p,R;return(h=e.description)!==null&&h!==void 0?h:(R=(p=i==null?void 0:i.mergedComponentPropsRef.value)===null||p===void 0?void 0:p.Empty)===null||R===void 0?void 0:R.description}),a=O(()=>{var h,p;return((p=(h=i==null?void 0:i.mergedComponentPropsRef.value)===null||h===void 0?void 0:h.Empty)===null||p===void 0?void 0:p.renderIcon)||(()=>d(oo,null))}),c=O(()=>{const{size:h}=e,{common:{cubicBezierEaseInOut:p},self:{[le("iconSize",h)]:R,[le("fontSize",h)]:T,textColor:g,iconColor:F,extraTextColor:_}}=o.value;return{"--n-icon-size":R,"--n-font-size":T,"--n-bezier":p,"--n-text-color":g,"--n-icon-color":F,"--n-extra-text-color":_}}),f=t?Ne("empty",O(()=>{let h="";const{size:p}=e;return h+=p[0],h}),c,e):void 0;return{mergedClsPrefix:n,mergedRenderIcon:a,localizedDescription:O(()=>l.value||r.value.description),cssVars:t?void 0:c,themeClass:f==null?void 0:f.themeClass,onRender:f==null?void 0:f.onRender}},render(){const{$slots:e,mergedClsPrefix:n,onRender:t}=this;return t==null||t(),d("div",{class:[`${n}-empty`,this.themeClass],style:this.cssVars},this.showIcon?d("div",{class:`${n}-empty__icon`},e.icon?e.icon():d(Nn,{clsPrefix:n},{default:this.mergedRenderIcon})):null,this.showDescription?d("div",{class:`${n}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?d("div",{class:`${n}-empty__extra`},e.extra()):null)}});function Mo(e,n){return d(hn,{name:"fade-in-scale-up-transition"},{default:()=>e?d(Nn,{clsPrefix:n,class:`${n}-base-select-option__check`},{default:()=>d(to)}):null})}const Pn=ie({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:n,pendingTmNodeRef:t,multipleRef:o,valueSetRef:r,renderLabelRef:i,renderOptionRef:l,labelFieldRef:a,valueFieldRef:c,showCheckmarkRef:f,nodePropsRef:h,handleOptionClick:p,handleOptionMouseEnter:R}=ce(vn),T=Pe(()=>{const{value:S}=t;return S?e.tmNode.key===S.key:!1});function g(S){const{tmNode:P}=e;P.disabled||p(S,P)}function F(S){const{tmNode:P}=e;P.disabled||R(S,P)}function _(S){const{tmNode:P}=e,{value:j}=T;P.disabled||j||R(S,P)}return{multiple:o,isGrouped:Pe(()=>{const{tmNode:S}=e,{parent:P}=S;return P&&P.rawNode.type==="group"}),showCheckmark:f,nodeProps:h,isPending:T,isSelected:Pe(()=>{const{value:S}=n,{value:P}=o;if(S===null)return!1;const j=e.tmNode.rawNode[c.value];if(P){const{value:y}=r;return y.has(j)}else return S===j}),labelField:a,renderLabel:i,renderOption:l,handleMouseMove:_,handleMouseEnter:F,handleClick:g}},render(){const{clsPrefix:e,tmNode:{rawNode:n},isSelected:t,isPending:o,isGrouped:r,showCheckmark:i,nodeProps:l,renderOption:a,renderLabel:c,handleClick:f,handleMouseEnter:h,handleMouseMove:p}=this,R=Mo(t,e),T=c?[c(n,t),i&&R]:[fe(n[this.labelField],n,t),i&&R],g=l==null?void 0:l(n),F=d("div",Object.assign({},g,{class:[`${e}-base-select-option`,n.class,g==null?void 0:g.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:t,[`${e}-base-select-option--grouped`]:r,[`${e}-base-select-option--pending`]:o,[`${e}-base-select-option--show-checkmark`]:i}],style:[(g==null?void 0:g.style)||"",n.style||""],onClick:tn([f,g==null?void 0:g.onClick]),onMouseenter:tn([h,g==null?void 0:g.onMouseenter]),onMousemove:tn([p,g==null?void 0:g.onMousemove])}),d("div",{class:`${e}-base-select-option__content`},T));return n.render?n.render({node:F,option:n,selected:t}):a?a({node:F,option:n,selected:t}):F}}),On=ie({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:n,labelFieldRef:t,nodePropsRef:o}=ce(vn);return{labelField:t,nodeProps:o,renderLabel:e,renderOption:n}},render(){const{clsPrefix:e,renderLabel:n,renderOption:t,nodeProps:o,tmNode:{rawNode:r}}=this,i=o==null?void 0:o(r),l=n?n(r,!1):fe(r[this.labelField],r,!1),a=d("div",Object.assign({},i,{class:[`${e}-base-select-group-header`,i==null?void 0:i.class]}),l);return r.render?r.render({node:a,option:r}):t?t({node:a,option:r,selected:!1}):a}}),_o=N("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[N("scrollbar",`
 max-height: var(--n-height);
 `),N("virtual-list",`
 max-height: var(--n-height);
 `),N("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[$("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),N("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),N("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),$("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),$("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),$("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),N("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),N("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[J("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),te("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),te("&:active",`
 color: var(--n-option-text-color-pressed);
 `),J("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),J("pending",[te("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),J("selected",`
 color: var(--n-option-text-color-active);
 `,[te("&::before",`
 background-color: var(--n-option-color-active);
 `),J("pending",[te("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),J("disabled",`
 cursor: not-allowed;
 `,[Ae("selected",`
 color: var(--n-option-text-color-disabled);
 `),J("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),$("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[pn({enterScale:"0.5"})])])]),Io=ie({name:"InternalSelectMenu",props:Object.assign(Object.assign({},ue.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const n=ue("InternalSelectMenu","-internal-select-menu",_o,xt,e,Q(e,"clsPrefix")),t=I(null),o=I(null),r=I(null),i=O(()=>e.treeMate.getFlattenedNodes()),l=O(()=>go(i.value)),a=I(null);function c(){const{treeMate:u}=e;let b=null;const{value:Z}=e;Z===null?b=u.getFirstAvailableNode():(e.multiple?b=u.getNode((Z||[])[(Z||[]).length-1]):b=u.getNode(Z),(!b||b.disabled)&&(b=u.getFirstAvailableNode())),Y(b||null)}function f(){const{value:u}=a;u&&!e.treeMate.getNode(u.key)&&(a.value=null)}let h;me(()=>e.show,u=>{u?h=me(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?c():f(),fn(C)):f()},{immediate:!0}):h==null||h()},{immediate:!0}),Fn(()=>{h==null||h()});const p=O(()=>Ot(n.value.self[le("optionHeight",e.size)])),R=O(()=>en(n.value.self[le("padding",e.size)])),T=O(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),g=O(()=>{const u=i.value;return u&&u.length===0});function F(u){const{onToggle:b}=e;b&&b(u)}function _(u){const{onScroll:b}=e;b&&b(u)}function S(u){var b;(b=r.value)===null||b===void 0||b.sync(),_(u)}function P(){var u;(u=r.value)===null||u===void 0||u.sync()}function j(){const{value:u}=a;return u||null}function y(u,b){b.disabled||Y(b,!1)}function w(u,b){b.disabled||F(b)}function z(u){var b;Te(u,"action")||(b=e.onKeyup)===null||b===void 0||b.call(e,u)}function W(u){var b;Te(u,"action")||(b=e.onKeydown)===null||b===void 0||b.call(e,u)}function H(u){var b;(b=e.onMousedown)===null||b===void 0||b.call(e,u),!e.focusable&&u.preventDefault()}function X(){const{value:u}=a;u&&Y(u.getNext({loop:!0}),!0)}function B(){const{value:u}=a;u&&Y(u.getPrev({loop:!0}),!0)}function Y(u,b=!1){a.value=u,b&&C()}function C(){var u,b;const Z=a.value;if(!Z)return;const re=l.value(Z.key);re!==null&&(e.virtualScroll?(u=o.value)===null||u===void 0||u.scrollTo({index:re}):(b=r.value)===null||b===void 0||b.scrollTo({index:re,elSize:p.value}))}function U(u){var b,Z;!((b=t.value)===null||b===void 0)&&b.contains(u.target)&&((Z=e.onFocus)===null||Z===void 0||Z.call(e,u))}function K(u){var b,Z;!((b=t.value)===null||b===void 0)&&b.contains(u.relatedTarget)||(Z=e.onBlur)===null||Z===void 0||Z.call(e,u)}be(vn,{handleOptionMouseEnter:y,handleOptionClick:w,valueSetRef:T,pendingTmNodeRef:a,nodePropsRef:Q(e,"nodeProps"),showCheckmarkRef:Q(e,"showCheckmark"),multipleRef:Q(e,"multiple"),valueRef:Q(e,"value"),renderLabelRef:Q(e,"renderLabel"),renderOptionRef:Q(e,"renderOption"),labelFieldRef:Q(e,"labelField"),valueFieldRef:Q(e,"valueField")}),be(kt,t),We(()=>{const{value:u}=r;u&&u.sync()});const A=O(()=>{const{size:u}=e,{common:{cubicBezierEaseInOut:b},self:{height:Z,borderRadius:re,color:ye,groupHeaderTextColor:we,actionDividerColor:xe,optionTextColorPressed:ve,optionTextColor:q,optionTextColorDisabled:he,optionTextColorActive:ae,optionOpacityDisabled:Oe,optionCheckColor:pe,actionTextColor:ze,optionColorPending:Ce,optionColorActive:Se,loadingColor:Me,loadingSize:_e,optionColorActivePending:Ie,[le("optionFontSize",u)]:ke,[le("optionHeight",u)]:Fe,[le("optionPadding",u)]:de}}=n.value;return{"--n-height":Z,"--n-action-divider-color":xe,"--n-action-text-color":ze,"--n-bezier":b,"--n-border-radius":re,"--n-color":ye,"--n-option-font-size":ke,"--n-group-header-text-color":we,"--n-option-check-color":pe,"--n-option-color-pending":Ce,"--n-option-color-active":Se,"--n-option-color-active-pending":Ie,"--n-option-height":Fe,"--n-option-opacity-disabled":Oe,"--n-option-text-color":q,"--n-option-text-color-active":ae,"--n-option-text-color-disabled":he,"--n-option-text-color-pressed":ve,"--n-option-padding":de,"--n-option-padding-left":en(de,"left"),"--n-option-padding-right":en(de,"right"),"--n-loading-color":Me,"--n-loading-size":_e}}),{inlineThemeDisabled:ne}=e,k=ne?Ne("internal-select-menu",O(()=>e.size[0]),A,e):void 0,G={selfRef:t,next:X,prev:B,getPendingTmNode:j};return En(t,e.onResize),Object.assign({mergedTheme:n,virtualListRef:o,scrollbarRef:r,itemSize:p,padding:R,flattenedNodes:i,empty:g,virtualListContainer(){const{value:u}=o;return u==null?void 0:u.listElRef},virtualListContent(){const{value:u}=o;return u==null?void 0:u.itemsElRef},doScroll:_,handleFocusin:U,handleFocusout:K,handleKeyUp:z,handleKeyDown:W,handleMouseDown:H,handleVirtualListResize:P,handleVirtualListScroll:S,cssVars:ne?void 0:A,themeClass:k==null?void 0:k.themeClass,onRender:k==null?void 0:k.onRender},G)},render(){const{$slots:e,virtualScroll:n,clsPrefix:t,mergedTheme:o,themeClass:r,onRender:i}=this;return i==null||i(),d("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${t}-base-select-menu`,r,this.multiple&&`${t}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},this.loading?d("div",{class:`${t}-base-select-menu__loading`},d(St,{clsPrefix:t,strokeWidth:20})):this.empty?d("div",{class:`${t}-base-select-menu__empty`,"data-empty":!0},Pt(e.empty,()=>[d(zo,{theme:o.peers.Empty,themeOverrides:o.peerOverrides.Empty})])):d(Rt,{ref:"scrollbarRef",theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},{default:()=>n?d(Zt,{ref:"virtualListRef",class:`${t}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:l})=>l.isGroup?d(On,{key:l.key,clsPrefix:t,tmNode:l}):l.ignored?null:d(Pn,{clsPrefix:t,key:l.key,tmNode:l})}):d("div",{class:`${t}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(l=>l.isGroup?d(On,{key:l.key,clsPrefix:t,tmNode:l}):d(Pn,{clsPrefix:t,key:l.key,tmNode:l})))}),Ct(e.action,l=>l&&[d("div",{class:`${t}-base-select-menu__action`,"data-action":!0,key:"action"},l),d(Xt,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Ao=te([N("base-selection",`
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[N("base-loading",`
 color: var(--n-loading-color);
 `),N("base-selection-tags","min-height: var(--n-height);"),$("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),$("state-border",`
 z-index: 1;
 border-color: #0000;
 `),N("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[$("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),N("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[$("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),N("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[$("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),N("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),N("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[N("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[$("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),$("render-label",`
 color: var(--n-text-color);
 `)]),Ae("disabled",[te("&:hover",[$("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),J("focus",[$("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),J("active",[$("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),N("base-selection-label","background-color: var(--n-color-active);"),N("base-selection-tags","background-color: var(--n-color-active);")])]),J("disabled","cursor: not-allowed;",[$("arrow",`
 color: var(--n-arrow-color-disabled);
 `),N("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[N("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),$("render-label",`
 color: var(--n-text-color-disabled);
 `)]),N("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),N("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),N("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[$("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),$("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>J(`${e}-status`,[$("state-border",`border: var(--n-border-${e});`),Ae("disabled",[te("&:hover",[$("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),J("active",[$("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),N("base-selection-label",`background-color: var(--n-color-active-${e});`),N("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),J("focus",[$("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),N("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),N("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[te("&:last-child","padding-right: 0;"),N("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[$("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),$o=ie({name:"InternalSelection",props:Object.assign(Object.assign({},ue.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const n=I(null),t=I(null),o=I(null),r=I(null),i=I(null),l=I(null),a=I(null),c=I(null),f=I(null),h=I(null),p=I(!1),R=I(!1),T=I(!1),g=ue("InternalSelection","-internal-selection",Ao,Ft,e,Q(e,"clsPrefix")),F=O(()=>e.clearable&&!e.disabled&&(T.value||e.active)),_=O(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):fe(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),S=O(()=>{const v=e.selectedOption;if(v)return v[e.labelField]}),P=O(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function j(){var v;const{value:x}=n;if(x){const{value:ee}=t;ee&&(ee.style.width=`${x.offsetWidth}px`,e.maxTagCount!=="responsive"&&((v=f.value)===null||v===void 0||v.sync()))}}function y(){const{value:v}=h;v&&(v.style.display="none")}function w(){const{value:v}=h;v&&(v.style.display="inline-block")}me(Q(e,"active"),v=>{v||y()}),me(Q(e,"pattern"),()=>{e.multiple&&fn(j)});function z(v){const{onFocus:x}=e;x&&x(v)}function W(v){const{onBlur:x}=e;x&&x(v)}function H(v){const{onDeleteOption:x}=e;x&&x(v)}function X(v){const{onClear:x}=e;x&&x(v)}function B(v){const{onPatternInput:x}=e;x&&x(v)}function Y(v){var x;(!v.relatedTarget||!(!((x=o.value)===null||x===void 0)&&x.contains(v.relatedTarget)))&&z(v)}function C(v){var x;!((x=o.value)===null||x===void 0)&&x.contains(v.relatedTarget)||W(v)}function U(v){X(v)}function K(){T.value=!0}function A(){T.value=!1}function ne(v){!e.active||!e.filterable||v.target!==t.value&&v.preventDefault()}function k(v){H(v)}function G(v){if(v.key==="Backspace"&&!u.value&&!e.pattern.length){const{selectedOptions:x}=e;x!=null&&x.length&&k(x[x.length-1])}}const u=I(!1);let b=null;function Z(v){const{value:x}=n;if(x){const ee=v.target.value;x.textContent=ee,j()}e.ignoreComposition&&u.value?b=v:B(v)}function re(){u.value=!0}function ye(){u.value=!1,e.ignoreComposition&&B(b),b=null}function we(v){var x;R.value=!0,(x=e.onPatternFocus)===null||x===void 0||x.call(e,v)}function xe(v){var x;R.value=!1,(x=e.onPatternBlur)===null||x===void 0||x.call(e,v)}function ve(){var v,x;if(e.filterable)R.value=!1,(v=l.value)===null||v===void 0||v.blur(),(x=t.value)===null||x===void 0||x.blur();else if(e.multiple){const{value:ee}=r;ee==null||ee.blur()}else{const{value:ee}=i;ee==null||ee.blur()}}function q(){var v,x,ee;e.filterable?(R.value=!1,(v=l.value)===null||v===void 0||v.focus()):e.multiple?(x=r.value)===null||x===void 0||x.focus():(ee=i.value)===null||ee===void 0||ee.focus()}function he(){const{value:v}=t;v&&(w(),v.focus())}function ae(){const{value:v}=t;v&&v.blur()}function Oe(v){const{value:x}=a;x&&x.setTextContent(`+${v}`)}function pe(){const{value:v}=c;return v}function ze(){return t.value}let Ce=null;function Se(){Ce!==null&&window.clearTimeout(Ce)}function Me(){e.disabled||e.active||(Se(),Ce=window.setTimeout(()=>{P.value&&(p.value=!0)},100))}function _e(){Se()}function Ie(v){v||(Se(),p.value=!1)}me(P,v=>{v||(p.value=!1)}),We(()=>{Tt(()=>{const v=l.value;v&&(v.tabIndex=e.disabled||R.value?-1:0)})}),En(o,e.onResize);const{inlineThemeDisabled:ke}=e,Fe=O(()=>{const{size:v}=e,{common:{cubicBezierEaseInOut:x},self:{borderRadius:ee,color:$e,placeholderColor:Ue,textColor:qe,paddingSingle:Ze,paddingMultiple:Xe,caretColor:Be,colorDisabled:Ke,textColorDisabled:Ee,placeholderColorDisabled:Ye,colorActive:Je,boxShadowFocus:Le,boxShadowActive:ge,boxShadowHover:s,border:m,borderFocus:M,borderHover:V,borderActive:E,arrowColor:D,arrowColorDisabled:L,loadingColor:oe,colorActiveWarning:De,boxShadowFocusWarning:Qe,boxShadowActiveWarning:qn,boxShadowHoverWarning:Zn,borderWarning:Xn,borderFocusWarning:Yn,borderHoverWarning:Jn,borderActiveWarning:Qn,colorActiveError:et,boxShadowFocusError:nt,boxShadowActiveError:tt,boxShadowHoverError:ot,borderError:rt,borderFocusError:it,borderHoverError:lt,borderActiveError:at,clearColor:st,clearColorHover:dt,clearColorPressed:ut,clearSize:ct,arrowSize:ft,[le("height",v)]:ht,[le("fontSize",v)]:vt}}=g.value;return{"--n-bezier":x,"--n-border":m,"--n-border-active":E,"--n-border-focus":M,"--n-border-hover":V,"--n-border-radius":ee,"--n-box-shadow-active":ge,"--n-box-shadow-focus":Le,"--n-box-shadow-hover":s,"--n-caret-color":Be,"--n-color":$e,"--n-color-active":Je,"--n-color-disabled":Ke,"--n-font-size":vt,"--n-height":ht,"--n-padding-single":Ze,"--n-padding-multiple":Xe,"--n-placeholder-color":Ue,"--n-placeholder-color-disabled":Ye,"--n-text-color":qe,"--n-text-color-disabled":Ee,"--n-arrow-color":D,"--n-arrow-color-disabled":L,"--n-loading-color":oe,"--n-color-active-warning":De,"--n-box-shadow-focus-warning":Qe,"--n-box-shadow-active-warning":qn,"--n-box-shadow-hover-warning":Zn,"--n-border-warning":Xn,"--n-border-focus-warning":Yn,"--n-border-hover-warning":Jn,"--n-border-active-warning":Qn,"--n-color-active-error":et,"--n-box-shadow-focus-error":nt,"--n-box-shadow-active-error":tt,"--n-box-shadow-hover-error":ot,"--n-border-error":rt,"--n-border-focus-error":it,"--n-border-hover-error":lt,"--n-border-active-error":at,"--n-clear-size":ct,"--n-clear-color":st,"--n-clear-color-hover":dt,"--n-clear-color-pressed":ut,"--n-arrow-size":ft}}),de=ke?Ne("internal-selection",O(()=>e.size[0]),Fe,e):void 0;return{mergedTheme:g,mergedClearable:F,patternInputFocused:R,filterablePlaceholder:_,label:S,selected:P,showTagsPanel:p,isComposing:u,counterRef:a,counterWrapperRef:c,patternInputMirrorRef:n,patternInputRef:t,selfRef:o,multipleElRef:r,singleElRef:i,patternInputWrapperRef:l,overflowRef:f,inputTagElRef:h,handleMouseDown:ne,handleFocusin:Y,handleClear:U,handleMouseEnter:K,handleMouseLeave:A,handleDeleteOption:k,handlePatternKeyDown:G,handlePatternInputInput:Z,handlePatternInputBlur:xe,handlePatternInputFocus:we,handleMouseEnterCounter:Me,handleMouseLeaveCounter:_e,handleFocusout:C,handleCompositionEnd:ye,handleCompositionStart:re,onPopoverUpdateShow:Ie,focus:q,focusInput:he,blur:ve,blurInput:ae,updateCounter:Oe,getCounter:pe,getTail:ze,renderLabel:e.renderLabel,cssVars:ke?void 0:Fe,themeClass:de==null?void 0:de.themeClass,onRender:de==null?void 0:de.onRender}},render(){const{status:e,multiple:n,size:t,disabled:o,filterable:r,maxTagCount:i,bordered:l,clsPrefix:a,onRender:c,renderTag:f,renderLabel:h}=this;c==null||c();const p=i==="responsive",R=typeof i=="number",T=p||R,g=d(zt,null,{default:()=>d(Nt,{clsPrefix:a,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var _,S;return(S=(_=this.$slots).arrow)===null||S===void 0?void 0:S.call(_)}})});let F;if(n){const{labelField:_}=this,S=C=>d("div",{class:`${a}-base-selection-tag-wrapper`,key:C.value},f?f({option:C,handleClose:()=>this.handleDeleteOption(C)}):d(nn,{size:t,closable:!C.disabled,disabled:o,onClose:()=>this.handleDeleteOption(C),internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>h?h(C,!0):fe(C[_],C,!0)})),P=()=>(R?this.selectedOptions.slice(0,i):this.selectedOptions).map(S),j=r?d("div",{class:`${a}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},d("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:o,value:this.pattern,autofocus:this.autofocus,class:`${a}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),d("span",{ref:"patternInputMirrorRef",class:`${a}-base-selection-input-tag__mirror`},this.pattern)):null,y=p?()=>d("div",{class:`${a}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},d(nn,{size:t,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:o})):void 0;let w;if(R){const C=this.selectedOptions.length-i;C>0&&(w=d("div",{class:`${a}-base-selection-tag-wrapper`,key:"__counter__"},d(nn,{size:t,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:o},{default:()=>`+${C}`})))}const z=p?r?d(Cn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:P,counter:y,tail:()=>j}):d(Cn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:P,counter:y}):R?P().concat(w):P(),W=T?()=>d("div",{class:`${a}-base-selection-popover`},p?P():this.selectedOptions.map(S)):void 0,H=T?{show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover}:null,B=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?d("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`},d("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)):null,Y=r?d("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-tags`},z,p?null:j,g):d("div",{ref:"multipleElRef",class:`${a}-base-selection-tags`,tabindex:o?void 0:0},z,g);F=d(Mn,null,T?d(zn,Object.assign({},H,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>Y,default:W}):Y,B)}else if(r){const _=this.pattern||this.isComposing,S=this.active?!_:!this.selected,P=this.active?!1:this.selected;F=d("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-label`},d("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${a}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:o,disabled:o,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),P?d("div",{class:`${a}-base-selection-label__render-label ${a}-base-selection-overlay`,key:"input"},d("div",{class:`${a}-base-selection-overlay__wrapper`},f?f({option:this.selectedOption,handleClose:()=>{}}):h?h(this.selectedOption,!0):fe(this.label,this.selectedOption,!0))):null,S?d("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},d("div",{class:`${a}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,g)}else F=d("div",{ref:"singleElRef",class:`${a}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?d("div",{class:`${a}-base-selection-input`,title:Jt(this.label),key:"input"},d("div",{class:`${a}-base-selection-input__content`},f?f({option:this.selectedOption,handleClose:()=>{}}):h?h(this.selectedOption,!0):fe(this.label,this.selectedOption,!0))):d("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},d("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)),g);return d("div",{ref:"selfRef",class:[`${a}-base-selection`,this.themeClass,e&&`${a}-base-selection--${e}-status`,{[`${a}-base-selection--active`]:this.active,[`${a}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${a}-base-selection--disabled`]:this.disabled,[`${a}-base-selection--multiple`]:this.multiple,[`${a}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},F,l?d("div",{class:`${a}-base-selection__border`}):null,l?d("div",{class:`${a}-base-selection__state-border`}):null)}});function Ve(e){return e.type==="group"}function Vn(e){return e.type==="ignored"}function an(e,n){try{return!!(1+n.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Bo(e,n){return{getIsGroup:Ve,getIgnored:Vn,getKey(o){return Ve(o)?o.name||o.key||"key-required":o[e]},getChildren(o){return o[n]}}}function Ko(e,n,t,o){if(!n)return e;function r(i){if(!Array.isArray(i))return[];const l=[];for(const a of i)if(Ve(a)){const c=r(a[o]);c.length&&l.push(Object.assign({},a,{[o]:c}))}else{if(Vn(a))continue;n(t,a)&&l.push(a)}return l}return r(e)}function Eo(e,n,t){const o=new Map;return e.forEach(r=>{Ve(r)?r[t].forEach(i=>{o.set(i[n],i)}):o.set(r[n],r)}),o}const Lo=te([N("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 `),N("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[pn({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),Do=Object.assign(Object.assign({},ue.props),{to:dn.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),tr=ie({name:"Select",props:Do,setup(e){const{mergedClsPrefixRef:n,mergedBorderedRef:t,namespaceRef:o,inlineThemeDisabled:r}=He(e),i=ue("Select","-select",Lo,Bt,e,n),l=I(e.defaultValue),a=Q(e,"value"),c=sn(a,l),f=I(!1),h=I(""),p=O(()=>{const{valueField:s,childrenField:m}=e,M=Bo(s,m);return jn(C.value,M)}),R=O(()=>Eo(B.value,e.valueField,e.childrenField)),T=I(!1),g=sn(Q(e,"show"),T),F=I(null),_=I(null),S=I(null),{localeRef:P}=Tn("Select"),j=O(()=>{var s;return(s=e.placeholder)!==null&&s!==void 0?s:P.value.placeholder}),y=Mt(e,["items","options"]),w=[],z=I([]),W=I([]),H=I(new Map),X=O(()=>{const{fallbackOption:s}=e;if(s===void 0){const{labelField:m,valueField:M}=e;return V=>({[m]:String(V),[M]:V})}return s===!1?!1:m=>Object.assign(s(m),{value:m})}),B=O(()=>W.value.concat(z.value).concat(y.value)),Y=O(()=>{const{filter:s}=e;if(s)return s;const{labelField:m,valueField:M}=e;return(V,E)=>{if(!E)return!1;const D=E[m];if(typeof D=="string")return an(V,D);const L=E[M];return typeof L=="string"?an(V,L):typeof L=="number"?an(V,String(L)):!1}}),C=O(()=>{if(e.remote)return y.value;{const{value:s}=B,{value:m}=h;return!m.length||!e.filterable?s:Ko(s,Y.value,m,e.childrenField)}});function U(s){const m=e.remote,{value:M}=H,{value:V}=R,{value:E}=X,D=[];return s.forEach(L=>{if(V.has(L))D.push(V.get(L));else if(m&&M.has(L))D.push(M.get(L));else if(E){const oe=E(L);oe&&D.push(oe)}}),D}const K=O(()=>{if(e.multiple){const{value:s}=c;return Array.isArray(s)?U(s):[]}return null}),A=O(()=>{const{value:s}=c;return!e.multiple&&!Array.isArray(s)?s===null?null:U([s])[0]||null:null}),ne=_t(e),{mergedSizeRef:k,mergedDisabledRef:G,mergedStatusRef:u}=ne;function b(s,m){const{onChange:M,"onUpdate:value":V,onUpdateValue:E}=e,{nTriggerFormChange:D,nTriggerFormInput:L}=ne;M&&se(M,s,m),E&&se(E,s,m),V&&se(V,s,m),l.value=s,D(),L()}function Z(s){const{onBlur:m}=e,{nTriggerFormBlur:M}=ne;m&&se(m,s),M()}function re(){const{onClear:s}=e;s&&se(s)}function ye(s){const{onFocus:m,showOnFocus:M}=e,{nTriggerFormFocus:V}=ne;m&&se(m,s),V(),M&&he()}function we(s){const{onSearch:m}=e;m&&se(m,s)}function xe(s){const{onScroll:m}=e;m&&se(m,s)}function ve(){var s;const{remote:m,multiple:M}=e;if(m){const{value:V}=H;if(M){const{valueField:E}=e;(s=K.value)===null||s===void 0||s.forEach(D=>{V.set(D[E],D)})}else{const E=A.value;E&&V.set(E[e.valueField],E)}}}function q(s){const{onUpdateShow:m,"onUpdate:show":M}=e;m&&se(m,s),M&&se(M,s),T.value=s}function he(){G.value||(q(!0),T.value=!0,e.filterable&&Ee())}function ae(){q(!1)}function Oe(){h.value="",W.value=w}const pe=I(!1);function ze(){e.filterable&&(pe.value=!0)}function Ce(){e.filterable&&(pe.value=!1,g.value||Oe())}function Se(){G.value||(g.value?e.filterable?Ee():ae():he())}function Me(s){var m,M;!((M=(m=S.value)===null||m===void 0?void 0:m.selfRef)===null||M===void 0)&&M.contains(s.relatedTarget)||(f.value=!1,Z(s),ae())}function _e(s){ye(s),f.value=!0}function Ie(s){f.value=!0}function ke(s){var m;!((m=F.value)===null||m===void 0)&&m.$el.contains(s.relatedTarget)||(f.value=!1,Z(s),ae())}function Fe(){var s;(s=F.value)===null||s===void 0||s.focus(),ae()}function de(s){var m;g.value&&(!((m=F.value)===null||m===void 0)&&m.$el.contains(Kt(s))||ae())}function v(s){if(!Array.isArray(s))return[];if(X.value)return Array.from(s);{const{remote:m}=e,{value:M}=R;if(m){const{value:V}=H;return s.filter(E=>M.has(E)||V.has(E))}else return s.filter(V=>M.has(V))}}function x(s){ee(s.rawNode)}function ee(s){if(G.value)return;const{tag:m,remote:M,clearFilterAfterSelect:V,valueField:E}=e;if(m&&!M){const{value:D}=W,L=D[0]||null;if(L){const oe=z.value;oe.length?oe.push(L):z.value=[L],W.value=w}}if(M&&H.value.set(s[E],s),e.multiple){const D=v(c.value),L=D.findIndex(oe=>oe===s[E]);if(~L){if(D.splice(L,1),m&&!M){const oe=$e(s[E]);~oe&&(z.value.splice(oe,1),V&&(h.value=""))}}else D.push(s[E]),V&&(h.value="");b(D,U(D))}else{if(m&&!M){const D=$e(s[E]);~D?z.value=[z.value[D]]:z.value=w}Ke(),ae(),b(s[E],s)}}function $e(s){return z.value.findIndex(M=>M[e.valueField]===s)}function Ue(s){g.value||he();const{value:m}=s.target;h.value=m;const{tag:M,remote:V}=e;if(we(m),M&&!V){if(!m){W.value=w;return}const{onCreate:E}=e,D=E?E(m):{[e.labelField]:m,[e.valueField]:m},{valueField:L}=e;y.value.some(oe=>oe[L]===D[L])||z.value.some(oe=>oe[L]===D[L])?W.value=w:W.value=[D]}}function qe(s){s.stopPropagation();const{multiple:m}=e;!m&&e.filterable&&ae(),re(),m?b([],[]):b(null,null)}function Ze(s){!Te(s,"action")&&!Te(s,"empty")&&s.preventDefault()}function Xe(s){xe(s)}function Be(s){var m,M,V,E,D;switch(s.key){case" ":if(e.filterable)break;s.preventDefault();case"Enter":if(!(!((m=F.value)===null||m===void 0)&&m.isComposing)){if(g.value){const L=(M=S.value)===null||M===void 0?void 0:M.getPendingTmNode();L?x(L):e.filterable||(ae(),Ke())}else if(he(),e.tag&&pe.value){const L=W.value[0];if(L){const oe=L[e.valueField],{value:De}=c;e.multiple&&Array.isArray(De)&&De.some(Qe=>Qe===oe)||ee(L)}}}s.preventDefault();break;case"ArrowUp":if(s.preventDefault(),e.loading)return;g.value&&((V=S.value)===null||V===void 0||V.prev());break;case"ArrowDown":if(s.preventDefault(),e.loading)return;g.value?(E=S.value)===null||E===void 0||E.next():he();break;case"Escape":g.value&&(Et(s),ae()),(D=F.value)===null||D===void 0||D.focus();break}}function Ke(){var s;(s=F.value)===null||s===void 0||s.focus()}function Ee(){var s;(s=F.value)===null||s===void 0||s.focusInput()}function Ye(){var s;g.value&&((s=_.value)===null||s===void 0||s.syncPosition())}ve(),me(Q(e,"options"),ve);const Je={focus:()=>{var s;(s=F.value)===null||s===void 0||s.focus()},blur:()=>{var s;(s=F.value)===null||s===void 0||s.blur()}},Le=O(()=>{const{self:{menuBoxShadow:s}}=i.value;return{"--n-menu-box-shadow":s}}),ge=r?Ne("select",void 0,Le,e):void 0;return Object.assign(Object.assign({},Je),{mergedStatus:u,mergedClsPrefix:n,mergedBordered:t,namespace:o,treeMate:p,isMounted:It(),triggerRef:F,menuRef:S,pattern:h,uncontrolledShow:T,mergedShow:g,adjustedTo:dn(e),uncontrolledValue:l,mergedValue:c,followerRef:_,localizedPlaceholder:j,selectedOption:A,selectedOptions:K,mergedSize:k,mergedDisabled:G,focused:f,activeWithoutMenuOpen:pe,inlineThemeDisabled:r,onTriggerInputFocus:ze,onTriggerInputBlur:Ce,handleTriggerOrMenuResize:Ye,handleMenuFocus:Ie,handleMenuBlur:ke,handleMenuTabOut:Fe,handleTriggerClick:Se,handleToggle:x,handleDeleteOption:ee,handlePatternInput:Ue,handleClear:qe,handleTriggerBlur:Me,handleTriggerFocus:_e,handleKeydown:Be,handleMenuAfterLeave:Oe,handleMenuClickOutside:de,handleMenuScroll:Xe,handleMenuKeydown:Be,handleMenuMousedown:Ze,mergedTheme:i,cssVars:r?void 0:Le,themeClass:ge==null?void 0:ge.themeClass,onRender:ge==null?void 0:ge.onRender})},render(){return d("div",{class:`${this.mergedClsPrefix}-select`},d(_n,null,{default:()=>[d(In,null,{default:()=>d($o,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,n;return[(n=(e=this.$slots).arrow)===null||n===void 0?void 0:n.call(e)]}})}),d(An,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===dn.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>d(hn,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,n,t;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),At(d(Io,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(n=this.menuProps)===null||n===void 0?void 0:n.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:"medium",renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(t=this.menuProps)===null||t===void 0?void 0:t.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var o,r;return[(r=(o=this.$slots).empty)===null||r===void 0?void 0:r.call(o)]},action:()=>{var o,r;return[(r=(o=this.$slots).action)===null||r===void 0?void 0:r.call(o)]}}),this.displayDirective==="show"?[[$t,this.mergedShow],[xn,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[xn,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),Wn=ie({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return d("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),jo=N("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[J("color-transition",{transition:"color .3s var(--n-bezier)"}),J("depth",{color:"var(--n-color)"},[te("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),te("svg",{height:"1em",width:"1em"})]),Vo=Object.assign(Object.assign({},ue.props),{depth:[String,Number],size:[Number,String],color:String,component:Object}),Wo=ie({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:Vo,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:t}=He(e),o=ue("Icon","-icon",jo,Lt,e,n),r=O(()=>{const{depth:l}=e,{common:{cubicBezierEaseInOut:a},self:c}=o.value;if(l!==void 0){const{color:f,[`opacity${l}Depth`]:h}=c;return{"--n-bezier":a,"--n-color":f,"--n-opacity":h}}return{"--n-bezier":a,"--n-color":"","--n-opacity":""}}),i=t?Ne("icon",O(()=>`${e.depth||"d"}`),r,e):void 0;return{mergedClsPrefix:n,mergedStyle:O(()=>{const{size:l,color:a}=e;return{fontSize:Dt(l),color:a}}),cssVars:t?void 0:r,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e;const{$parent:n,depth:t,mergedClsPrefix:o,component:r,onRender:i,themeClass:l}=this;return!((e=n==null?void 0:n.$options)===null||e===void 0)&&e._n_icon__&&$n("icon","don't wrap `n-icon` inside `n-icon`"),i==null||i(),d("i",gn(this.$attrs,{role:"img",class:[`${o}-icon`,l,{[`${o}-icon--depth`]:t,[`${o}-icon--color-transition`]:t!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?d(r):this.$slots)}}),yn=bn("n-dropdown-menu"),Ge=bn("n-dropdown"),kn=bn("n-dropdown-option");function cn(e,n){return e.type==="submenu"||e.type===void 0&&e[n]!==void 0}function Ho(e){return e.type==="group"}function Hn(e){return e.type==="divider"}function Go(e){return e.type==="render"}const Gn=ie({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const n=ce(Ge),{hoverKeyRef:t,keyboardKeyRef:o,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:i,activeKeyPathRef:l,animatedRef:a,mergedShowRef:c,renderLabelRef:f,renderIconRef:h,labelFieldRef:p,childrenFieldRef:R,renderOptionRef:T,nodePropsRef:g,menuPropsRef:F}=n,_=ce(kn,null),S=ce(yn),P=ce(Bn),j=O(()=>e.tmNode.rawNode),y=O(()=>{const{value:k}=R;return cn(e.tmNode.rawNode,k)}),w=O(()=>{const{disabled:k}=e.tmNode;return k}),z=O(()=>{if(!y.value)return!1;const{key:k,disabled:G}=e.tmNode;if(G)return!1;const{value:u}=t,{value:b}=o,{value:Z}=r,{value:re}=i;return u!==null?re.includes(k):b!==null?re.includes(k)&&re[re.length-1]!==k:Z!==null?re.includes(k):!1}),W=O(()=>o.value===null&&!a.value),H=eo(z,300,W),X=O(()=>!!(_!=null&&_.enteringSubmenuRef.value)),B=I(!1);be(kn,{enteringSubmenuRef:B});function Y(){B.value=!0}function C(){B.value=!1}function U(){const{parentKey:k,tmNode:G}=e;G.disabled||c.value&&(r.value=k,o.value=null,t.value=G.key)}function K(){const{tmNode:k}=e;k.disabled||c.value&&t.value!==k.key&&U()}function A(k){if(e.tmNode.disabled||!c.value)return;const{relatedTarget:G}=k;G&&!Te({target:G},"dropdownOption")&&!Te({target:G},"scrollbarRail")&&(t.value=null)}function ne(){const{value:k}=y,{tmNode:G}=e;c.value&&!k&&!G.disabled&&(n.doSelect(G.key,G.rawNode),n.doUpdateShow(!1))}return{labelField:p,renderLabel:f,renderIcon:h,siblingHasIcon:S.showIconRef,siblingHasSubmenu:S.hasSubmenuRef,menuProps:F,popoverBody:P,animated:a,mergedShowSubmenu:O(()=>H.value&&!X.value),rawNode:j,hasSubmenu:y,pending:Pe(()=>{const{value:k}=i,{key:G}=e.tmNode;return k.includes(G)}),childActive:Pe(()=>{const{value:k}=l,{key:G}=e.tmNode,u=k.findIndex(b=>G===b);return u===-1?!1:u<k.length-1}),active:Pe(()=>{const{value:k}=l,{key:G}=e.tmNode,u=k.findIndex(b=>G===b);return u===-1?!1:u===k.length-1}),mergedDisabled:w,renderOption:T,nodeProps:g,handleClick:ne,handleMouseMove:K,handleMouseEnter:U,handleMouseLeave:A,handleSubmenuBeforeEnter:Y,handleSubmenuAfterEnter:C}},render(){var e,n;const{animated:t,rawNode:o,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:l,siblingHasSubmenu:a,renderLabel:c,renderIcon:f,renderOption:h,nodeProps:p,props:R,scrollable:T}=this;let g=null;if(r){const P=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,o,o.children);g=d(Un,Object.assign({},P,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const F={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},_=p==null?void 0:p(o),S=d("div",Object.assign({class:[`${i}-dropdown-option`,_==null?void 0:_.class],"data-dropdown-option":!0},_),d("div",gn(F,R),[d("div",{class:[`${i}-dropdown-option-body__prefix`,l&&`${i}-dropdown-option-body__prefix--show-icon`]},[f?f(o):fe(o.icon)]),d("div",{"data-dropdown-option":!0,class:`${i}-dropdown-option-body__label`},c?c(o):fe((n=o[this.labelField])!==null&&n!==void 0?n:o.title)),d("div",{"data-dropdown-option":!0,class:[`${i}-dropdown-option-body__suffix`,a&&`${i}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?d(Wo,null,{default:()=>d(jt,null)}):null)]),this.hasSubmenu?d(_n,null,{default:()=>[d(In,null,{default:()=>d("div",{class:`${i}-dropdown-offset-container`},d(An,{show:this.mergedShowSubmenu,placement:this.placement,to:T&&this.popoverBody||void 0,teleportDisabled:!T},{default:()=>d("div",{class:`${i}-dropdown-menu-wrapper`},t?d(hn,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>g}):g)}))})]}):null);return h?h({node:S,option:o}):S}}),Uo=ie({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:n}=ce(yn),{renderLabelRef:t,labelFieldRef:o,nodePropsRef:r,renderOptionRef:i}=ce(Ge);return{labelField:o,showIcon:e,hasSubmenu:n,renderLabel:t,nodeProps:r,renderOption:i}},render(){var e;const{clsPrefix:n,hasSubmenu:t,showIcon:o,nodeProps:r,renderLabel:i,renderOption:l}=this,{rawNode:a}=this.tmNode,c=d("div",Object.assign({class:`${n}-dropdown-option`},r==null?void 0:r(a)),d("div",{class:`${n}-dropdown-option-body ${n}-dropdown-option-body--group`},d("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__prefix`,o&&`${n}-dropdown-option-body__prefix--show-icon`]},fe(a.icon)),d("div",{class:`${n}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(a):fe((e=a.title)!==null&&e!==void 0?e:a[this.labelField])),d("div",{class:[`${n}-dropdown-option-body__suffix`,t&&`${n}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return l?l({node:c,option:a}):c}}),qo=ie({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:n,clsPrefix:t}=this,{children:o}=e;return d(Mn,null,d(Uo,{clsPrefix:t,tmNode:e,key:e.key}),o==null?void 0:o.map(r=>{const{rawNode:i}=r;return i.show===!1?null:Hn(i)?d(Wn,{clsPrefix:t,key:r.key}):r.isGroup?($n("dropdown","`group` node is not allowed to be put in `group` node."),null):d(Gn,{clsPrefix:t,tmNode:r,parentKey:n,key:r.key})}))}}),Zo=ie({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:n}}=this.tmNode;return d("div",n,[e==null?void 0:e()])}}),Un=ie({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:n,childrenFieldRef:t}=ce(Ge);be(yn,{showIconRef:O(()=>{const r=n.value;return e.tmNodes.some(i=>{var l;if(i.isGroup)return(l=i.children)===null||l===void 0?void 0:l.some(({rawNode:c})=>r?r(c):c.icon);const{rawNode:a}=i;return r?r(a):a.icon})}),hasSubmenuRef:O(()=>{const{value:r}=t;return e.tmNodes.some(i=>{var l;if(i.isGroup)return(l=i.children)===null||l===void 0?void 0:l.some(({rawNode:c})=>cn(c,r));const{rawNode:a}=i;return cn(a,r)})})});const o=I(null);return be(Ht,null),be(Gt,null),be(Bn,o),{bodyRef:o}},render(){const{parentKey:e,clsPrefix:n,scrollable:t}=this,o=this.tmNodes.map(r=>{const{rawNode:i}=r;return i.show===!1?null:Go(i)?d(Zo,{tmNode:r,key:r.key}):Hn(i)?d(Wn,{clsPrefix:n,key:r.key}):Ho(i)?d(qo,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key}):d(Gn,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:t})});return d("div",{class:[`${n}-dropdown-menu`,t&&`${n}-dropdown-menu--scrollable`],ref:"bodyRef"},t?d(Wt,{contentClass:`${n}-dropdown-menu__content`},{default:()=>o}):o,this.showArrow?Vt({clsPrefix:n,arrowStyle:this.arrowStyle}):null)}}),Xo=N("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[pn(),N("dropdown-option",`
 position: relative;
 `,[te("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[te("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),N("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[te("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),Ae("disabled",[J("pending",`
 color: var(--n-option-text-color-hover);
 `,[$("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),te("&::before","background-color: var(--n-option-color-hover);")]),J("active",`
 color: var(--n-option-text-color-active);
 `,[$("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),te("&::before","background-color: var(--n-option-color-active);")]),J("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[$("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),J("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),J("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[$("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[J("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),$("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[J("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),N("icon",`
 font-size: var(--n-option-icon-size);
 `)]),$("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),$("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[J("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),N("icon",`
 font-size: var(--n-option-icon-size);
 `)]),N("dropdown-menu","pointer-events: all;")]),N("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),N("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),N("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),te(">",[N("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),Ae("scrollable",`
 padding: var(--n-padding);
 `),J("scrollable",[$("content",`
 padding: var(--n-padding);
 `)])]),Yo={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},Jo=Object.keys(Kn),Qo=Object.assign(Object.assign(Object.assign({},Kn),Yo),ue.props),or=ie({name:"Dropdown",inheritAttrs:!1,props:Qo,setup(e){const n=I(!1),t=sn(Q(e,"show"),n),o=O(()=>{const{keyField:C,childrenField:U}=e;return jn(e.options,{getKey(K){return K[C]},getDisabled(K){return K.disabled===!0},getIgnored(K){return K.type==="divider"||K.type==="render"},getChildren(K){return K[U]}})}),r=O(()=>o.value.treeNodes),i=I(null),l=I(null),a=I(null),c=O(()=>{var C,U,K;return(K=(U=(C=i.value)!==null&&C!==void 0?C:l.value)!==null&&U!==void 0?U:a.value)!==null&&K!==void 0?K:null}),f=O(()=>o.value.getPath(c.value).keyPath),h=O(()=>o.value.getPath(e.value).keyPath),p=Pe(()=>e.keyboard&&t.value);Yt({keydown:{ArrowUp:{prevent:!0,handler:w},ArrowRight:{prevent:!0,handler:y},ArrowDown:{prevent:!0,handler:z},ArrowLeft:{prevent:!0,handler:j},Enter:{prevent:!0,handler:W},Escape:P}},p);const{mergedClsPrefixRef:R,inlineThemeDisabled:T}=He(e),g=ue("Dropdown","-dropdown",Xo,qt,e,R);be(Ge,{labelFieldRef:Q(e,"labelField"),childrenFieldRef:Q(e,"childrenField"),renderLabelRef:Q(e,"renderLabel"),renderIconRef:Q(e,"renderIcon"),hoverKeyRef:i,keyboardKeyRef:l,lastToggledSubmenuKeyRef:a,pendingKeyPathRef:f,activeKeyPathRef:h,animatedRef:Q(e,"animated"),mergedShowRef:t,nodePropsRef:Q(e,"nodeProps"),renderOptionRef:Q(e,"renderOption"),menuPropsRef:Q(e,"menuProps"),doSelect:F,doUpdateShow:_}),me(t,C=>{!e.animated&&!C&&S()});function F(C,U){const{onSelect:K}=e;K&&se(K,C,U)}function _(C){const{"onUpdate:show":U,onUpdateShow:K}=e;U&&se(U,C),K&&se(K,C),n.value=C}function S(){i.value=null,l.value=null,a.value=null}function P(){_(!1)}function j(){X("left")}function y(){X("right")}function w(){X("up")}function z(){X("down")}function W(){const C=H();C!=null&&C.isLeaf&&t.value&&(F(C.key,C.rawNode),_(!1))}function H(){var C;const{value:U}=o,{value:K}=c;return!U||K===null?null:(C=U.getNode(K))!==null&&C!==void 0?C:null}function X(C){const{value:U}=c,{value:{getFirstAvailableNode:K}}=o;let A=null;if(U===null){const ne=K();ne!==null&&(A=ne.key)}else{const ne=H();if(ne){let k;switch(C){case"down":k=ne.getNext();break;case"up":k=ne.getPrev();break;case"right":k=ne.getChild();break;case"left":k=ne.getParent();break}k&&(A=k.key)}}A!==null&&(i.value=null,l.value=A)}const B=O(()=>{const{size:C,inverted:U}=e,{common:{cubicBezierEaseInOut:K},self:A}=g.value,{padding:ne,dividerColor:k,borderRadius:G,optionOpacityDisabled:u,[le("optionIconSuffixWidth",C)]:b,[le("optionSuffixWidth",C)]:Z,[le("optionIconPrefixWidth",C)]:re,[le("optionPrefixWidth",C)]:ye,[le("fontSize",C)]:we,[le("optionHeight",C)]:xe,[le("optionIconSize",C)]:ve}=A,q={"--n-bezier":K,"--n-font-size":we,"--n-padding":ne,"--n-border-radius":G,"--n-option-height":xe,"--n-option-prefix-width":ye,"--n-option-icon-prefix-width":re,"--n-option-suffix-width":Z,"--n-option-icon-suffix-width":b,"--n-option-icon-size":ve,"--n-divider-color":k,"--n-option-opacity-disabled":u};return U?(q["--n-color"]=A.colorInverted,q["--n-option-color-hover"]=A.optionColorHoverInverted,q["--n-option-color-active"]=A.optionColorActiveInverted,q["--n-option-text-color"]=A.optionTextColorInverted,q["--n-option-text-color-hover"]=A.optionTextColorHoverInverted,q["--n-option-text-color-active"]=A.optionTextColorActiveInverted,q["--n-option-text-color-child-active"]=A.optionTextColorChildActiveInverted,q["--n-prefix-color"]=A.prefixColorInverted,q["--n-suffix-color"]=A.suffixColorInverted,q["--n-group-header-text-color"]=A.groupHeaderTextColorInverted):(q["--n-color"]=A.color,q["--n-option-color-hover"]=A.optionColorHover,q["--n-option-color-active"]=A.optionColorActive,q["--n-option-text-color"]=A.optionTextColor,q["--n-option-text-color-hover"]=A.optionTextColorHover,q["--n-option-text-color-active"]=A.optionTextColorActive,q["--n-option-text-color-child-active"]=A.optionTextColorChildActive,q["--n-prefix-color"]=A.prefixColor,q["--n-suffix-color"]=A.suffixColor,q["--n-group-header-text-color"]=A.groupHeaderTextColor),q}),Y=T?Ne("dropdown",O(()=>`${e.size[0]}${e.inverted?"i":""}`),B,e):void 0;return{mergedClsPrefix:R,mergedTheme:g,tmNodes:r,mergedShow:t,handleAfterLeave:()=>{e.animated&&S()},doUpdateShow:_,cssVars:T?void 0:B,themeClass:Y==null?void 0:Y.themeClass,onRender:Y==null?void 0:Y.onRender}},render(){const e=(o,r,i,l,a)=>{var c;const{mergedClsPrefix:f,menuProps:h}=this;(c=this.onRender)===null||c===void 0||c.call(this);const p=(h==null?void 0:h(void 0,this.tmNodes.map(T=>T.rawNode)))||{},R={ref:Qt(r),class:[o,`${f}-dropdown`,this.themeClass],clsPrefix:f,tmNodes:this.tmNodes,style:[i,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:l,onMouseleave:a};return d(Un,gn(this.$attrs,R,p))},{mergedTheme:n}=this,t={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return d(zn,Object.assign({},Ut(this.$props,Jo),t),{trigger:()=>{var o,r;return(r=(o=this.$slots).default)===null||r===void 0?void 0:r.call(o)}})}});export{Io as N,Bo as a,tr as b,jn as c,or as d,Qt as e,zo as f,tn as m};
