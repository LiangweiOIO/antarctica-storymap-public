import{s as ae,o as vt}from"./entry-f78b3598.js";import{_ as zt,a as se,f as ie,s as _,z as le,i as ft,c as Tt,o as Vt,e as Xt,h as Y,j as Mt,A as ue,g as Wt,B as Ht,C as Lt,p as ce,k as fe}from"./index-ce5cced2.js";const Dt=new Date,wt=new Date;function I(t,e,n,r){function i(s){return t(s=arguments.length===0?new Date:new Date(+s)),s}return i.floor=s=>(t(s=new Date(+s)),s),i.ceil=s=>(t(s=new Date(s-1)),e(s,1),t(s),s),i.round=s=>{const u=i(s),p=i.ceil(s);return s-u<p-s?u:p},i.offset=(s,u)=>(e(s=new Date(+s),u==null?1:Math.floor(u)),s),i.range=(s,u,p)=>{const f=[];if(s=i.ceil(s),p=p==null?1:Math.floor(p),!(s<u)||!(p>0))return f;let T;do f.push(T=new Date(+s)),e(s,p),t(s);while(T<s&&s<u);return f},i.filter=s=>I(u=>{if(u>=u)for(;t(u),!s(u);)u.setTime(u-1)},(u,p)=>{if(u>=u)if(p<0)for(;++p<=0;)for(;e(u,-1),!s(u););else for(;--p>=0;)for(;e(u,1),!s(u););}),n&&(i.count=(s,u)=>(Dt.setTime(+s),wt.setTime(+u),t(Dt),t(wt),Math.floor(n(Dt,wt))),i.every=s=>(s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?i.filter(r?u=>r(u)%s===0:u=>i.count(0,u)%s===0):i)),i}const de=1e3,bt=de*60,pe=bt*60,yt=pe*24,jt=yt*7,_t=I(t=>t.setHours(0,0,0,0),(t,e)=>t.setDate(t.getDate()+e),(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*bt)/yt,t=>t.getDate()-1);_t.range;const kt=I(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/yt,t=>t.getUTCDate()-1);kt.range;const he=I(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/yt,t=>Math.floor(t/yt));he.range;function tt(t){return I(e=>{e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},(e,n)=>{e.setDate(e.getDate()+n*7)},(e,n)=>(n-e-(n.getTimezoneOffset()-e.getTimezoneOffset())*bt)/jt)}const Bt=tt(0),Ct=tt(1),ye=tt(2),ge=tt(3),it=tt(4),me=tt(5),ve=tt(6);Bt.range;Ct.range;ye.range;ge.range;it.range;me.range;ve.range;function et(t){return I(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCDate(e.getUTCDate()+n*7)},(e,n)=>(n-e)/jt)}const Qt=et(0),xt=et(1),Te=et(2),Me=et(3),lt=et(4),Ce=et(5),xe=et(6);Qt.range;xt.range;Te.range;Me.range;lt.range;Ce.range;xe.range;const J=I(t=>{t.setMonth(0,1),t.setHours(0,0,0,0)},(t,e)=>{t.setFullYear(t.getFullYear()+e)},(t,e)=>e.getFullYear()-t.getFullYear(),t=>t.getFullYear());J.every=t=>!isFinite(t=Math.floor(t))||!(t>0)?null:I(e=>{e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,n)=>{e.setFullYear(e.getFullYear()+n*t)});J.range;const K=I(t=>{t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCFullYear(t.getUTCFullYear()+e)},(t,e)=>e.getUTCFullYear()-t.getUTCFullYear(),t=>t.getUTCFullYear());K.every=t=>!isFinite(t=Math.floor(t))||!(t>0)?null:I(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,n)=>{e.setUTCFullYear(e.getUTCFullYear()+n*t)});K.range;function Ut(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function St(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function dt(t,e,n){return{y:t,m:e,d:n,H:0,M:0,S:0,L:0}}function De(t){var e=t.dateTime,n=t.date,r=t.time,i=t.periods,s=t.days,u=t.shortDays,p=t.months,f=t.shortMonths,T=pt(i),S=ht(i),W=pt(s),C=ht(s),D=pt(u),Yt=ht(u),nt=pt(p),k=ht(p),gt=pt(f),mt=ht(f),P={a:ut,A:B,b:N,B:at,c:null,d:$t,e:$t,f:Ve,g:nn,G:on,H:Ee,I:qe,j:ze,L:Gt,m:Xe,M:je,p:V,q:$,Q:Et,s:qt,S:Be,u:Qe,U:Ge,V:Je,w:Ke,W:tn,x:null,X:null,y:en,Y:rn,Z:an,"%":Zt},O={a:Q,A:R,b:Z,B:E,c:null,d:Rt,e:Rt,f:cn,g:Mn,G:xn,H:sn,I:ln,j:un,L:Kt,m:fn,M:dn,p:X,q:G,Q:Et,s:qt,S:pn,u:hn,U:yn,V:gn,w:mn,W:vn,x:null,X:null,y:Tn,Y:Cn,Z:Dn,"%":Zt},m={a:F,A:rt,b:v,B:H,c:z,d:Ot,e:Ot,f:Ne,g:Pt,G:It,H:Nt,I:Nt,j:Ae,L:Oe,m:Le,M:Ie,p:j,q:He,Q:Re,s:Ze,S:Pe,u:_e,U:ke,V:Ye,w:be,W:Fe,x:ot,X:L,y:Pt,Y:It,Z:We,"%":$e};P.x=g(n,P),P.X=g(r,P),P.c=g(e,P),O.x=g(n,O),O.X=g(r,O),O.c=g(e,O);function g(a,l){return function(c){var o=[],x=-1,h=0,w=a.length,U,A,ct;for(c instanceof Date||(c=new Date(+c));++x<w;)a.charCodeAt(x)===37&&(o.push(a.slice(h,x)),(A=At[U=a.charAt(++x)])!=null?U=a.charAt(++x):A=U==="e"?" ":"0",(ct=l[U])&&(U=ct(c,A)),o.push(U),h=x+1);return o.push(a.slice(h,x)),o.join("")}}function y(a,l){return function(c){var o=dt(1900,void 0,1),x=b(o,a,c+="",0),h,w;if(x!=c.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(o.s*1e3+("L"in o?o.L:0));if(l&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+o.p*12),o.m===void 0&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(h=St(dt(o.y,0,1)),w=h.getUTCDay(),h=w>4||w===0?xt.ceil(h):xt(h),h=kt.offset(h,(o.V-1)*7),o.y=h.getUTCFullYear(),o.m=h.getUTCMonth(),o.d=h.getUTCDate()+(o.w+6)%7):(h=Ut(dt(o.y,0,1)),w=h.getDay(),h=w>4||w===0?Ct.ceil(h):Ct(h),h=_t.offset(h,(o.V-1)*7),o.y=h.getFullYear(),o.m=h.getMonth(),o.d=h.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),w="Z"in o?St(dt(o.y,0,1)).getUTCDay():Ut(dt(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+o.W*7-(w+5)%7:o.w+o.U*7-(w+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,St(o)):Ut(o)}}function b(a,l,c,o){for(var x=0,h=l.length,w=c.length,U,A;x<h;){if(o>=w)return-1;if(U=l.charCodeAt(x++),U===37){if(U=l.charAt(x++),A=m[U in At?l.charAt(x++):U],!A||(o=A(a,c,o))<0)return-1}else if(U!=c.charCodeAt(o++))return-1}return o}function j(a,l,c){var o=T.exec(l.slice(c));return o?(a.p=S.get(o[0].toLowerCase()),c+o[0].length):-1}function F(a,l,c){var o=D.exec(l.slice(c));return o?(a.w=Yt.get(o[0].toLowerCase()),c+o[0].length):-1}function rt(a,l,c){var o=W.exec(l.slice(c));return o?(a.w=C.get(o[0].toLowerCase()),c+o[0].length):-1}function v(a,l,c){var o=gt.exec(l.slice(c));return o?(a.m=mt.get(o[0].toLowerCase()),c+o[0].length):-1}function H(a,l,c){var o=nt.exec(l.slice(c));return o?(a.m=k.get(o[0].toLowerCase()),c+o[0].length):-1}function z(a,l,c){return b(a,e,l,c)}function ot(a,l,c){return b(a,n,l,c)}function L(a,l,c){return b(a,r,l,c)}function ut(a){return u[a.getDay()]}function B(a){return s[a.getDay()]}function N(a){return f[a.getMonth()]}function at(a){return p[a.getMonth()]}function V(a){return i[+(a.getHours()>=12)]}function $(a){return 1+~~(a.getMonth()/3)}function Q(a){return u[a.getUTCDay()]}function R(a){return s[a.getUTCDay()]}function Z(a){return f[a.getUTCMonth()]}function E(a){return p[a.getUTCMonth()]}function X(a){return i[+(a.getUTCHours()>=12)]}function G(a){return 1+~~(a.getUTCMonth()/3)}return{format:function(a){var l=g(a+="",P);return l.toString=function(){return a},l},parse:function(a){var l=y(a+="",!1);return l.toString=function(){return a},l},utcFormat:function(a){var l=g(a+="",O);return l.toString=function(){return a},l},utcParse:function(a){var l=y(a+="",!0);return l.toString=function(){return a},l}}}var At={"-":"",_:" ",0:"0"},M=/^\s*\d+/,we=/^%/,Ue=/[\\^$*+?|[\]().{}]/g;function d(t,e,n){var r=t<0?"-":"",i=(r?-t:t)+"",s=i.length;return r+(s<n?new Array(n-s+1).join(e)+i:i)}function Se(t){return t.replace(Ue,"\\$&")}function pt(t){return new RegExp("^(?:"+t.map(Se).join("|")+")","i")}function ht(t){return new Map(t.map((e,n)=>[e.toLowerCase(),n]))}function be(t,e,n){var r=M.exec(e.slice(n,n+1));return r?(t.w=+r[0],n+r[0].length):-1}function _e(t,e,n){var r=M.exec(e.slice(n,n+1));return r?(t.u=+r[0],n+r[0].length):-1}function ke(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.U=+r[0],n+r[0].length):-1}function Ye(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.V=+r[0],n+r[0].length):-1}function Fe(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.W=+r[0],n+r[0].length):-1}function It(t,e,n){var r=M.exec(e.slice(n,n+4));return r?(t.y=+r[0],n+r[0].length):-1}function Pt(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function We(t,e,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n,n+6));return r?(t.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function He(t,e,n){var r=M.exec(e.slice(n,n+1));return r?(t.q=r[0]*3-3,n+r[0].length):-1}function Le(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.m=r[0]-1,n+r[0].length):-1}function Ot(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.d=+r[0],n+r[0].length):-1}function Ae(t,e,n){var r=M.exec(e.slice(n,n+3));return r?(t.m=0,t.d=+r[0],n+r[0].length):-1}function Nt(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.H=+r[0],n+r[0].length):-1}function Ie(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.M=+r[0],n+r[0].length):-1}function Pe(t,e,n){var r=M.exec(e.slice(n,n+2));return r?(t.S=+r[0],n+r[0].length):-1}function Oe(t,e,n){var r=M.exec(e.slice(n,n+3));return r?(t.L=+r[0],n+r[0].length):-1}function Ne(t,e,n){var r=M.exec(e.slice(n,n+6));return r?(t.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function $e(t,e,n){var r=we.exec(e.slice(n,n+1));return r?n+r[0].length:-1}function Re(t,e,n){var r=M.exec(e.slice(n));return r?(t.Q=+r[0],n+r[0].length):-1}function Ze(t,e,n){var r=M.exec(e.slice(n));return r?(t.s=+r[0],n+r[0].length):-1}function $t(t,e){return d(t.getDate(),e,2)}function Ee(t,e){return d(t.getHours(),e,2)}function qe(t,e){return d(t.getHours()%12||12,e,2)}function ze(t,e){return d(1+_t.count(J(t),t),e,3)}function Gt(t,e){return d(t.getMilliseconds(),e,3)}function Ve(t,e){return Gt(t,e)+"000"}function Xe(t,e){return d(t.getMonth()+1,e,2)}function je(t,e){return d(t.getMinutes(),e,2)}function Be(t,e){return d(t.getSeconds(),e,2)}function Qe(t){var e=t.getDay();return e===0?7:e}function Ge(t,e){return d(Bt.count(J(t)-1,t),e,2)}function Jt(t){var e=t.getDay();return e>=4||e===0?it(t):it.ceil(t)}function Je(t,e){return t=Jt(t),d(it.count(J(t),t)+(J(t).getDay()===4),e,2)}function Ke(t){return t.getDay()}function tn(t,e){return d(Ct.count(J(t)-1,t),e,2)}function en(t,e){return d(t.getFullYear()%100,e,2)}function nn(t,e){return t=Jt(t),d(t.getFullYear()%100,e,2)}function rn(t,e){return d(t.getFullYear()%1e4,e,4)}function on(t,e){var n=t.getDay();return t=n>=4||n===0?it(t):it.ceil(t),d(t.getFullYear()%1e4,e,4)}function an(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+d(e/60|0,"0",2)+d(e%60,"0",2)}function Rt(t,e){return d(t.getUTCDate(),e,2)}function sn(t,e){return d(t.getUTCHours(),e,2)}function ln(t,e){return d(t.getUTCHours()%12||12,e,2)}function un(t,e){return d(1+kt.count(K(t),t),e,3)}function Kt(t,e){return d(t.getUTCMilliseconds(),e,3)}function cn(t,e){return Kt(t,e)+"000"}function fn(t,e){return d(t.getUTCMonth()+1,e,2)}function dn(t,e){return d(t.getUTCMinutes(),e,2)}function pn(t,e){return d(t.getUTCSeconds(),e,2)}function hn(t){var e=t.getUTCDay();return e===0?7:e}function yn(t,e){return d(Qt.count(K(t)-1,t),e,2)}function te(t){var e=t.getUTCDay();return e>=4||e===0?lt(t):lt.ceil(t)}function gn(t,e){return t=te(t),d(lt.count(K(t),t)+(K(t).getUTCDay()===4),e,2)}function mn(t){return t.getUTCDay()}function vn(t,e){return d(xt.count(K(t)-1,t),e,2)}function Tn(t,e){return d(t.getUTCFullYear()%100,e,2)}function Mn(t,e){return t=te(t),d(t.getUTCFullYear()%100,e,2)}function Cn(t,e){return d(t.getUTCFullYear()%1e4,e,4)}function xn(t,e){var n=t.getUTCDay();return t=n>=4||n===0?lt(t):lt.ceil(t),d(t.getUTCFullYear()%1e4,e,4)}function Dn(){return"+0000"}function Zt(){return"%"}function Et(t){return+t}function qt(t){return Math.floor(+t/1e3)}var st,ee;wn({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function wn(t){return st=De(t),ee=st.format,st.parse,st.utcFormat,st.utcParse,st}const Un={data(){return{land110:{},location:[0,-60],colors:{night:"#719fb6",day:"#ffe438",grid:"#4b6a79",ocean:"lightblue",land:"#f5f1dc",sun:"#ffe438"},EventType:{LocationChange:"LOCATION_CHANGE",DateHourChange:"DATE_HOUR_CHANGE"},text1:"春分至夏至",text2:"夏至至秋分",text3:"秋分至冬至",text4:"冬至至春分"}},async mounted(){const t=this;try{const n=(await se.get("/data/land-110m.json")).data;t.land110=ie(n,n.objects.land),this.initScrollama(this)}catch(e){console.log(e)}},methods:{initScrollama(t){var e=_("div"),n=e.select("#scrolly3"),r=n.select("#figure3"),i=n.select("article"),s=i.selectAll(".step"),u=ae();function p(){var S=Math.floor(window.innerHeight*1);s.style("height",S+"px");var W=Math.floor(window.innerHeight*1),C=(window.innerHeight-W)/2;r.style("height",W+"px").style("top",C+"px"),u.resize()}function f(S){let W=S.index;s.classed("is-active",function(C,D){return D===W})}function T(){p();const S=document.querySelector("#figure3"),W=new Date(Date.UTC(2023,2,21,0,0,0)),C=new Date(Date.UTC(2024,2,21,0,0,0));let D=document.getElementById("daylight-step1");D.innerHTML="",t.drawmap(S.offsetWidth*1,S.offsetHeight,W,C),u.setup({step:"#scrolly3 article .step",offset:.33,debug:!1}).onStepEnter(f)}T()},drawmap(t,e,n,r){const i=this.colors,s=m=>m*180/Math.PI,u=(m,g)=>{const y=new Date(m.getFullYear(),0,1),b=Math.floor((m.getTime()-y.getTime())/864e5)+1,j=.2163108+2*Math.atan(.9671396*Math.tan(.0086*(b-186))),F=Math.asin(.39795*Math.cos(j)),v=(Math.sin(.8333*Math.PI/180)+Math.sin(g*Math.PI/180)*Math.sin(F))/(Math.cos(g*Math.PI/180)*Math.cos(F));return v>=1?24:v<=-1?0:24-24*Math.acos(v)/Math.PI},p=m=>(T(m)+10)/365*Math.PI*2-Math.PI/2,f=12,T=m=>{const g=new Date(m.getFullYear(),0,1);return Math.floor((m.getTime()-g.getTime())/864e5)+1},S=(m,{width:g,location:y,date:b,hour:j})=>{const F=p(b),rt=s(F),v=360*((j+12)/24),H=180+-y[0]+rt+v,z=0-y[1],ot=vt().fitWidth(g,Wt()).rotate([H,z,23.5]),L=ft(ot),ut=vt().clipAngle(null).fitWidth(g,Wt()).rotate([H,z,23.5]),B=ft(ut),N=m.append("g"),at=m.append("g").style("opacity",.75),V=m.append("g");at.append("path").attr("d",L({type:"Sphere"})).attr("fill",i.ocean).attr("stroke","#9ecbda"),at.append("path").attr("d",L(this.land110)).attr("fill",i.land),N.append("path").attr("d",B({type:"Point",coordinates:y})).attr("fill","red");const $=(q,re,Ft)=>Lt(re,Ft,2).concat(Ft).map(oe=>[oe,q]),Q=Ht([-v,0]),R=Ht([0,0,0]),Z=360*u(b,y[1])/24,E=360-Z,X=[y[0],-45],G=360*u(b,X[1])/24;let a=$(X[1],X[0]-G/2,X[0]+G/2).map(q=>Q(q)),l=a[0][1],c=a[0][0],o=a[a.length-1][0],x=[c,l],h=[o,l],w=[c-180,0-l],U=[o-180,0-l];const A={type:"LineString",coordinates:$(y[1],y[0]-Z/2,y[0]+Z/2).map(q=>Q(q))},ct={type:"LineString",coordinates:$(y[1],y[0]-Z/2-E,y[0]-Z/2).map(q=>Q(q))};N.append("path").attr("d",B(A)).attr("fill","none").attr("stroke",i.day).attr("stroke-width",3),N.append("path").attr("d",B(ct)).attr("fill","none").attr("stroke",i.night).attr("stroke-width",3),V.append("path").attr("d",L(A)).attr("fill","none").attr("stroke",i.day).attr("stroke-width",3),V.append("path").attr("d",L(ct)).attr("fill","none").attr("stroke",i.night).attr("stroke-width",3),V.append("path").attr("d",L({type:"Point",coordinates:y})).attr("fill","red");const ne=[x,h,w,U,x].map(q=>R(q));V.append("path").attr("d",L({type:"Polygon",coordinates:[ne]})).attr("fill","rgba(0, 0, 0, 0.25)")},W=(m,g,y,b,j)=>{const F=.04*g,rt=.06*g,v=g/2-20,H=.3,z=p(b),ot=z*180/Math.PI,L=v*Math.sin(z),ut=H*v*Math.cos(z),B=180+-y[0]+ot+360*((j+12)/24),N={type:"Sphere"},at=vt().fitWidth(F*2,N).rotate([B,0,23.5]).translate([0,0]),V=vt().fitWidth(F*2,N).rotate([ot-90,0]).translate([0,0]),$=ft(at).pointRadius(1.5),Q=ft(V),R=m.append("g").attr("transform",`translate(${g/2})`);R.append("circle").attr("r",rt).attr("fill",i.sun),R.append("ellipse").attr("rx",v).attr("ry",H*v).attr("fill","none").attr("stroke","lightgray");const Z=ee("%b");Lt(12).map(G=>{const a=new Date(b.getFullYear(),G,1),l=p(a);R.append("line").attr("x1",(v+8)*Math.sin(l)).attr("y1",(v+8)*H*Math.cos(l)).attr("x2",(v-8)*Math.sin(l)).attr("y2",(v-8)*H*Math.cos(l)).attr("stroke","lightgray");const c=p(new Date(b.getFullYear(),G,15));R.append("text").text(Z(a)).attr("x",(v+16)*Math.sin(c)).attr("y",(v+16)*1.15*H*Math.cos(c)).attr("text-anchor","middle").attr("font-size",f).attr("dominant-baseline","middle").attr("font-size",10).attr("font-family","sans-serif").attr("fill","gray")});const E=R.append("g").attr("transform",`translate(${L}, ${ut})`);E.append("line").attr("y1",-1.5*F).attr("y2",1.5*F).attr("stroke","blue").attr("transform","rotate(-23.5)"),E.append("path").attr("d",$(N)).attr("fill",i.ocean),E.append("path").attr("d",$(this.land110)).attr("fill",i.land);const X=[[0,-90],[0,0],[0,90],[180,0],[0,-90]];E.append("path").attr("d",Q({type:"Polygon",coordinates:[X]})).attr("fill","rgba(0, 0, 0, 0.5)"),E.append("path").attr("d",$({type:"Point",coordinates:y})).attr("fill","red")},C=le("svg").attr("class","daylight-app").attr("width",t).attr("height",e).attr("viewBox",[0,0,t,e]);C.style("user-select","none").style("-webkit-user-select","none");const D={top:0,left:16,right:16,bottom:0,inner:32},nt=(t-D.left-D.right-D.inner)/2;let k={date:n,hour:new Date().getHours()};const gt=()=>{C.selectAll("#solar-system *").remove(),C.selectAll("#solar-system").call(W,nt,location,k.date,k.hour)},mt=()=>{C.selectAll("#globe *").remove(),C.selectAll("#globe").call(S,{width:nt/2,location,...k})},P=(m,g=!1)=>{const y={...k};k=m,C.node().value=k,(g||y.hour!==k.hour||y.date!==k.date)&&(gt(),mt())};C.append("g").attr("id","plot").attr("transform",`translate(${D.left})`),C.append("g").attr("id","solar-system").attr("transform",`translate(${D.left+D.inner+nt}, ${e/2})`),C.append("g").attr("id","globe").attr("transform",`translate(${D.left+D.inner+1.25*nt}, ${D.top+e/4})`);function O(m,g){let y=new Date(m);k.date=y,P(k,!0)}return O(n),C.node()},drawPoles(t,e){const n=ft(e);var r=_("body").append("div").attr("class","tooltip");r.style("width","50px").style("background-color","#fff").style("border","1px solid #ccc").style("border-radius","5px").style("padding","10px");const i=Tt().center([0,-90]).radius(1)();t.append("path").datum(i).attr("d",n).style("fill","#216bc6").style("stroke","none").on("mouseover",function(f){_(this).style("stroke","#216bc6").style("stroke-width","4px"),r.html("南极点").style("visibility","visible")}).on("mousemove",function(f){r.style("top",f.pageY-10+"px").style("left",f.pageX+10+"px")}).on("mouseout",function(){r.style("visibility","hidden"),_(this).style("stroke","none")});const s=Tt().center([0,90]).radius(1)();t.append("path").datum(s).attr("d",n).style("fill","#216bc6").style("stroke","none").on("mouseover",function(f){_(this).style("stroke","#216bc6").style("stroke-width","4px"),r.html("北极点").style("visibility","visible")}).on("mousemove",function(f){r.style("top",f.pageY-10+"px").style("left",f.pageX+10+"px")}).on("mouseout",function(){r.style("visibility","hidden"),_(this).style("stroke","none")}),t.append("g").attr("class","lines").selectAll("path").data([{type:"LineString",coordinates:[[-103.689,78.095],[-109.64,80.972],[-132.834,85.02],[162.867,86.494]]},{type:"LineString",coordinates:[[138.902,-64.91],[138.303,-64.661],[137.325,-64.432],[135.866,-64.081]]}]).enter().append("path").attr("d",n).style("fill","none").style("stroke","#fed73c").style("stroke-width",2);const u=Tt().center([106.78,-78.3046]).radius(1)();t.append("path").datum(u).attr("d",n).style("fill","#216bc6").style("stroke","none").on("mouseover",function(f){_(this).style("stroke","#216bc6").style("stroke-width","4px"),r.html("寒极点").style("visibility","visible")}).on("mousemove",function(f){r.style("top",f.pageY-10+"px").style("left",f.pageX+10+"px")}).on("mouseout",function(){r.style("visibility","hidden"),_(this).style("stroke","none")});const p=Tt().center([77.116,-80.417]).radius(1)();t.append("path").datum(p).attr("d",n).style("fill","#216bc6").style("stroke","none").on("mouseover",function(f){_(this).style("stroke","#216bc6").style("stroke-width","4px"),r.html("最高点").style("visibility","visible")}).on("mousemove",function(f){r.style("top",f.pageY-10+"px").style("left",f.pageX+10+"px")}).on("mouseout",function(){r.style("visibility","hidden"),_(this).style("stroke","none")})},addText(t,e,n){t.append("text").attr("x",e/2).attr("y",n-60).style("text-anchor","middle").style("fill","#cccccc").style("user-select","none").text("*拖拽可转动地球")},drawIceShelf(t,e,n){let r=[[-171.47,-81.86],[69.67,-70.92],[-44.56,-78.26]],i=[],s=["#9ce1ce","#f9dd9c","#d2e4aa"],u=["Ross Ice Shelf","Amery Ice Shelf","Filchner-ronne Ice Shelf"],p=["ross","amery","filchner-ronne"];var f=_("body").append("div").attr("class","tooltip");f.style("width","50px").style("background-color","#fff").style("border","1px solid #ccc").style("border-radius","5px").style("padding","10px");for(let T=0;T<3;T++)t.append("path").datum(this.iceshelf_list[T]).attr("d",n).attr("id",p[T]).attr("fill",s[T]).attr("stroke-width",.8).attr("stroke","white").on("mouseover",function(S){_(this).style("stroke","#fff").style("stroke-width","2px"),f.html(p[T]).style("visibility","visible")}).on("mousemove",function(S){f.style("top",S.pageY-10+"px").style("left",S.pageX+10+"px")}).on("mouseout",function(){f.style("visibility","hidden"),_(this).style("stroke","none")}),i=e(r[T]),t.append("text").attr("id","text-"+p[T]).attr("transform","translate("+i[0]+","+i[1]+")").attr("text-anchor","middle").text(u[T])}}},Sn={id:"scrolly3"},bn={class:"step","data-step":"1"},_n={class:"step","data-step":"2"},kn={class:"step","data-step":"3"},Yn={class:"step","data-step":"4"},Fn=ue('<figure id="figure3" data-v-7ad722f3><div id="daylight-step1" data-v-7ad722f3></div><div id="daylight-step2" data-v-7ad722f3></div><div id="daylight-step3" data-v-7ad722f3></div><div id="daylight-step3" data-v-7ad722f3></div></figure>',1);function Wn(t,e,n,r,i,s){return Vt(),Xt("div",null,[Y("section",Sn,[Y("article",null,[Y("div",bn,[Y("p",null,Mt(i.text1),1)]),Y("div",_n,[Y("p",null,Mt(i.text2),1)]),Y("div",kn,[Y("p",null,Mt(i.text3),1)]),Y("div",Yn,[Y("p",null,Mt(i.text4),1)])]),Fn])])}const Hn=zt(Un,[["render",Wn],["__scopeId","data-v-7ad722f3"]]);const Ln={name:"ChapterOne",components:{newDaylight:Hn},data(){return{}},mounted(){},created(){window.scrollTo(0,0)},methods:{}},An=t=>(ce("data-v-55f4c9c6"),t=t(),fe(),t),In={class:"container"},Pn=An(()=>Y("div",{class:"sibling"},[Y("iframe",{width:"100%",height:"800",frameborder:"0",src:"https://observablehq.com/embed/1bfc5f38e3817e89@1923?cells=viewof+location%2Capp"})],-1)),On=[Pn];function Nn(t,e,n,r,i,s){return Vt(),Xt("div",In,On)}const En=zt(Ln,[["render",Nn],["__scopeId","data-v-55f4c9c6"]]);export{En as default};
