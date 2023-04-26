import{m as W,n as X,q as Z,u as ee,v as Y,w as te}from"./index-ce5cced2.js";function _(t,n){return[ee(n)*Y(t),Y(n)]}_.invert=Z(te);function ue(){return W(_).scale(249.5).clipAngle(90+X)}function ne(t,n=document){return typeof t=="string"?Array.from(n.querySelectorAll(t)):t instanceof Element?[t]:t instanceof NodeList?Array.from(t):t instanceof Array?t:[]}function oe(t){const n=document.createElement("div");n.className=`scrollama__debug-step ${t}`,n.style.position="fixed",n.style.left="0",n.style.width="100%",n.style.zIndex="9999",n.style.borderTop="2px solid black",n.style.borderBottom="2px solid black";const o=document.createElement("p");return o.style.position="absolute",o.style.left="0",o.style.height="1px",o.style.width="100%",o.style.borderTop="1px dashed black",n.appendChild(o),document.body.appendChild(n),n}function re({id:t,step:n,marginTop:o}){const{index:f,height:l}=n,u=`scrollama__debug-step--${t}-${f}`;let d=document.querySelector(`.${u}`);d||(d=oe(u)),d.style.top=`${o*-1}px`,d.style.height=`${l}px`,d.querySelector("p").style.top=`${l/2}px`}function se(){const t="abcdefghijklmnopqrstuvwxyz",n=Date.now(),o=[];for(let f=0;f<6;f+=1){const l=t[Math.floor(Math.random()*t.length)];o.push(l)}return`${o.join("")}${n}`}function w(t){console.error(`scrollama error: ${t}`)}function y(t){return+t.getAttribute("data-scrollama-index")}function ie(t,n){const o=Math.ceil(t/n),f=[],l=1/o;for(let u=0;u<o+1;u+=1)f.push(u*l);return f}function M(t){if(typeof t=="string"&&t.indexOf("px")>0){const n=+t.replace("px","");return isNaN(n)?(err("offset value must be in 'px' format. Fallback to 0.5."),{format:"percent",value:.5}):{format:"pixels",value:n}}else if(typeof t=="number"||!isNaN(+t))return t>1&&err("offset value is greater than 1. Fallback to 1."),t<0&&err("offset value is lower than 0. Fallback to 0."),{format:"percent",value:Math.min(Math.max(0,t),1)};return null}function ce(t){t.forEach(n=>n.node.setAttribute("data-scrollama-index",n.index))}function fe(t){const{top:n}=t.getBoundingClientRect(),o=window.pageYOffset,f=document.body.clientTop||0;return n+o-f}let x,O,p;function C(t){const n=t?t.scrollTop:window.pageYOffset;x!==n&&(x=n,x>O?p="down":x<O&&(p="up"),O=x)}function ae(t){x=0,O=0,document.addEventListener("scroll",()=>C(t))}function pe(){let t={},n=se(),o=[],f,l,u,d=0,$=!1,T=!1,q=!1,A=!1,P=[];function I(){t={stepEnter:()=>{},stepExit:()=>{},stepProgress:()=>{}},P=[]}function E(e){e&&!$&&z(),!e&&$&&R(),$=e}function k(e,s){const r=y(e),i=o[r];s!==void 0&&(i.progress=s);const a={element:e,index:r,progress:s,direction:p};i.state==="enter"&&t.stepProgress(a)}function F(e,s=!0){const r=y(e),i=o[r],a={element:e,index:r,direction:p};i.direction=p,i.state="enter",P[r]||t.stepEnter(a),A&&(P[r]=!0)}function D(e,s=!0){const r=y(e),i=o[r];if(!i.state)return!1;const a={element:e,index:r,direction:p};T&&(p==="down"&&i.progress<1?k(e,1):p==="up"&&i.progress>0&&k(e,0)),i.direction=p,i.state="exit",t.stepExit(a)}function L([e]){const s=y(e.target),r=o[s],i=e.target.offsetHeight;i!==r.height&&(r.height=i,N(r),B(r),j(r))}function G([e]){C(l);const{isIntersecting:s,target:r}=e;s?F(r):D(r)}function J([e]){const s=y(e.target),r=o[s],{isIntersecting:i,intersectionRatio:a,target:h}=e;i&&r.state==="enter"&&k(h,a)}function N({observers:e}){Object.keys(e).map(s=>{e[s].disconnect()})}function R(){o.forEach(N)}function j(e){const s=new ResizeObserver(L);s.observe(e.node),e.observers.resize=s}function K(){o.forEach(j)}function B(e){const s=window.innerHeight,r=e.offset||f,i=r.format==="pixels"?1:s,a=r.value*i,h=e.height/2-a,b=e.height/2-(s-a),m={rootMargin:`${h}px 0px ${b}px 0px`,threshold:.5,root:u},H=new IntersectionObserver(G,m);H.observe(e.node),e.observers.step=H,q&&re({id:n,step:e,marginTop:h,marginBottom:b})}function Q(){o.forEach(B)}function U(e){const s=window.innerHeight,r=e.offset||f,i=r.format==="pixels"?1:s,a=r.value*i,h=-a+e.height,b=a-s,v=`${h}px 0px ${b}px 0px`,S=ie(e.height,d),g={rootMargin:v,threshold:S},m=new IntersectionObserver(J,g);m.observe(e.node),e.observers.progress=m}function V(){o.forEach(U)}function z(){R(),K(),Q(),T&&V()}const c={};return c.setup=({step:e,parent:s,offset:r=.5,threshold:i=4,progress:a=!1,once:h=!1,debug:b=!1,container:v=void 0,root:S=null})=>(ae(v),o=ne(e,s).map((g,m)=>({index:m,direction:void 0,height:g.offsetHeight,node:g,observers:{},offset:M(g.dataset.offset),top:fe(g),progress:0,state:void 0})),o.length?(T=a,A=h,q=b,d=Math.max(1,+i),f=M(r),l=v,u=S,I(),ce(o),E(!0),c):(w("no step elements"),c)),c.enable=()=>(E(!0),c),c.disable=()=>(E(!1),c),c.destroy=()=>(E(!1),I(),c),c.resize=()=>(z(),c),c.offset=e=>e==null?f.value:(f=M(e),z(),c),c.onStepEnter=e=>(typeof e=="function"?t.stepEnter=e:w("onStepEnter requires a function"),c),c.onStepExit=e=>(typeof e=="function"?t.stepExit=e:w("onStepExit requires a function"),c),c.onStepProgress=e=>(typeof e=="function"?t.stepProgress=e:w("onStepProgress requires a function"),c),c}export{ue as o,pe as s};
