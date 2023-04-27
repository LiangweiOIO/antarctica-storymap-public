import{s as pt,o as J}from"./entry-6b28401e.js";import{s as p,d as ht,_ as nt,a as k,i as E,g as R,f as V,t as tt,b as ft,c as N,o as it,e as rt,h as m,j as B,p as yt,k as gt,r as _t,l as mt}from"./index-c452a21b.js";import{g as bt,s as H}from"./geoScaleBar-a4ef8a73.js";function xt(t){let e;for(;e=t.sourceEvent;)t=e;return t}function et(t,e){if(t=xt(t),e===void 0&&(e=t.currentTarget),e){var a=e.ownerSVGElement||e;if(a.createSVGPoint){var s=a.createSVGPoint();return s.x=t.clientX,s.y=t.clientY,s=s.matrixTransform(e.getScreenCTM().inverse()),[s.x,s.y]}if(e.getBoundingClientRect){var n=e.getBoundingClientRect();return[t.clientX-n.left-e.clientLeft,t.clientY-n.top-e.clientTop]}}return[t.pageX,t.pageY]}const vt={passive:!1},P={capture:!0,passive:!1};function q(t){t.stopImmediatePropagation()}function j(t){t.preventDefault(),t.stopImmediatePropagation()}function kt(t){var e=t.document.documentElement,a=p(t).on("dragstart.drag",j,P);"onselectstart"in e?a.on("selectstart.drag",j,P):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function wt(t,e){var a=t.document.documentElement,s=p(t).on("dragstart.drag",null);e&&(s.on("click.drag",j,P),setTimeout(function(){s.on("click.drag",null)},0)),"onselectstart"in a?s.on("selectstart.drag",null):(a.style.MozUserSelect=a.__noselect,delete a.__noselect)}const X=t=>()=>t;function G(t,{sourceEvent:e,subject:a,target:s,identifier:n,active:r,x:o,y:u,dx:l,dy:d,dispatch:h}){Object.defineProperties(this,{type:{value:t,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},subject:{value:a,enumerable:!0,configurable:!0},target:{value:s,enumerable:!0,configurable:!0},identifier:{value:n,enumerable:!0,configurable:!0},active:{value:r,enumerable:!0,configurable:!0},x:{value:o,enumerable:!0,configurable:!0},y:{value:u,enumerable:!0,configurable:!0},dx:{value:l,enumerable:!0,configurable:!0},dy:{value:d,enumerable:!0,configurable:!0},_:{value:h}})}G.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t};function Et(t){return!t.ctrlKey&&!t.button}function $t(){return this.parentNode}function St(t,e){return e??{x:t.x,y:t.y}}function Tt(){return navigator.maxTouchPoints||"ontouchstart"in this}function st(){var t=Et,e=$t,a=St,s=Tt,n={},r=ht("start","drag","end"),o=0,u,l,d,h,f=0;function c(i){i.on("mousedown.drag",b).filter(s).on("touchstart.drag",D).on("touchmove.drag",I,vt).on("touchend.drag touchcancel.drag",L).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function b(i,y){if(!(h||!t.call(this,i,y))){var g=C(this,e.call(this,i,y),i,y,"mouse");g&&(p(i.view).on("mousemove.drag",$,P).on("mouseup.drag",A,P),kt(i.view),q(i),d=!1,u=i.clientX,l=i.clientY,g("start",i))}}function $(i){if(j(i),!d){var y=i.clientX-u,g=i.clientY-l;d=y*y+g*g>f}n.mouse("drag",i)}function A(i){p(i.view).on("mousemove.drag mouseup.drag",null),wt(i.view,d),j(i),n.mouse("end",i)}function D(i,y){if(t.call(this,i,y)){var g=i.changedTouches,_=e.call(this,i,y),x=g.length,w,T;for(w=0;w<x;++w)(T=C(this,_,i,y,g[w].identifier,g[w]))&&(q(i),T("start",i,g[w]))}}function I(i){var y=i.changedTouches,g=y.length,_,x;for(_=0;_<g;++_)(x=n[y[_].identifier])&&(j(i),x("drag",i,y[_]))}function L(i){var y=i.changedTouches,g=y.length,_,x;for(h&&clearTimeout(h),h=setTimeout(function(){h=null},500),_=0;_<g;++_)(x=n[y[_].identifier])&&(q(i),x("end",i,y[_]))}function C(i,y,g,_,x,w){var T=r.copy(),v=et(w||g,y),F,Z,z;if((z=a.call(i,new G("beforestart",{sourceEvent:g,target:c,identifier:x,active:o,x:v[0],y:v[1],dx:0,dy:0,dispatch:T}),_))!=null)return F=z.x-v[0]||0,Z=z.y-v[1]||0,function dt(Y,K,ut){var Q=v,O;switch(Y){case"start":n[x]=dt,O=o++;break;case"end":delete n[x],--o;case"drag":v=et(ut||K,y),O=o;break}T.call(Y,i,new G(Y,{sourceEvent:K,subject:z,target:c,identifier:x,active:O,x:v[0]+F,y:v[1]+Z,dx:v[0]-Q[0],dy:v[1]-Q[1],dispatch:T}),_)}}return c.filter=function(i){return arguments.length?(t=typeof i=="function"?i:X(!!i),c):t},c.container=function(i){return arguments.length?(e=typeof i=="function"?i:X(i),c):e},c.subject=function(i){return arguments.length?(a=typeof i=="function"?i:X(i),c):a},c.touchable=function(i){return arguments.length?(s=typeof i=="function"?i:X(!!i),c):s},c.on=function(){var i=r.on.apply(r,arguments);return i===r?c:i},c.clickDistance=function(i){return arguments.length?(f=(i=+i)*i,c):Math.sqrt(f)},c}const U=Math.PI,W=2*U,S=1e-6,Mt=W-S;function lt(t){this._+=t[0];for(let e=1,a=t.length;e<a;++e)this._+=arguments[e]+t[e]}function jt(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return lt;const a=10**e;return function(s){this._+=s[0];for(let n=1,r=s.length;n<r;++n)this._+=Math.round(arguments[n]*a)/a+s[n]}}class Ct{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?lt:jt(e)}moveTo(e,a){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+a}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,a){this._append`L${this._x1=+e},${this._y1=+a}`}quadraticCurveTo(e,a,s,n){this._append`Q${+e},${+a},${this._x1=+s},${this._y1=+n}`}bezierCurveTo(e,a,s,n,r,o){this._append`C${+e},${+a},${+s},${+n},${this._x1=+r},${this._y1=+o}`}arcTo(e,a,s,n,r){if(e=+e,a=+a,s=+s,n=+n,r=+r,r<0)throw new Error(`negative radius: ${r}`);let o=this._x1,u=this._y1,l=s-e,d=n-a,h=o-e,f=u-a,c=h*h+f*f;if(this._x1===null)this._append`M${this._x1=e},${this._y1=a}`;else if(c>S)if(!(Math.abs(f*l-d*h)>S)||!r)this._append`L${this._x1=e},${this._y1=a}`;else{let b=s-o,$=n-u,A=l*l+d*d,D=b*b+$*$,I=Math.sqrt(A),L=Math.sqrt(c),C=r*Math.tan((U-Math.acos((A+c-D)/(2*I*L)))/2),i=C/L,y=C/I;Math.abs(i-1)>S&&this._append`L${e+i*h},${a+i*f}`,this._append`A${r},${r},0,0,${+(f*b>h*$)},${this._x1=e+y*l},${this._y1=a+y*d}`}}arc(e,a,s,n,r,o){if(e=+e,a=+a,s=+s,o=!!o,s<0)throw new Error(`negative radius: ${s}`);let u=s*Math.cos(n),l=s*Math.sin(n),d=e+u,h=a+l,f=1^o,c=o?n-r:r-n;this._x1===null?this._append`M${d},${h}`:(Math.abs(this._x1-d)>S||Math.abs(this._y1-h)>S)&&this._append`L${d},${h}`,s&&(c<0&&(c=c%W+W),c>Mt?this._append`A${s},${s},0,1,${f},${e-u},${a-l}A${s},${s},0,1,${f},${this._x1=d},${this._y1=h}`:c>S&&this._append`A${s},${s},0,${+(c>=U)},${f},${this._x1=e+s*Math.cos(r)},${this._y1=a+s*Math.sin(r)}`)}rect(e,a,s,n){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+a}h${s=+s}v${+n}h${-s}Z`}toString(){return this._}}function M(t){return function(){return t}}function Pt(t){let e=3;return t.digits=function(a){if(!arguments.length)return e;if(a==null)e=null;else{const s=Math.floor(a);if(!(s>=0))throw new RangeError(`invalid digits: ${a}`);e=s}return t},()=>new Ct(e)}function At(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function ot(t){this._context=t}ot.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;default:this._context.lineTo(t,e);break}}};function It(t){return new ot(t)}function Lt(t){return t[0]}function zt(t){return t[1]}function Nt(t,e){var a=M(!0),s=null,n=It,r=null,o=Pt(u);t=typeof t=="function"?t:t===void 0?Lt:M(t),e=typeof e=="function"?e:e===void 0?zt:M(e);function u(l){var d,h=(l=At(l)).length,f,c=!1,b;for(s==null&&(r=n(b=o())),d=0;d<=h;++d)!(d<h&&a(f=l[d],d,l))===c&&((c=!c)?r.lineStart():r.lineEnd()),c&&r.point(+t(f,d,l),+e(f,d,l));if(b)return r=null,b+""||null}return u.x=function(l){return arguments.length?(t=typeof l=="function"?l:M(+l),u):t},u.y=function(l){return arguments.length?(e=typeof l=="function"?l:M(+l),u):e},u.defined=function(l){return arguments.length?(a=typeof l=="function"?l:M(!!l),u):a},u.curve=function(l){return arguments.length?(n=l,s!=null&&(r=n(s)),u):n},u.context=function(l){return arguments.length?(l==null?s=r=null:r=n(s=l),u):s},u}function at(){}function Bt(t,e,a){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+a)/6)}function ct(t){this._context=t}ct.prototype={areaStart:at,areaEnd:at,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x2,this._y2),this._context.closePath();break}case 2:{this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break}case 3:{this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4);break}}},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._x2=t,this._y2=e;break;case 1:this._point=2,this._x3=t,this._y3=e;break;case 2:this._point=3,this._x4=t,this._y4=e,this._context.moveTo((this._x0+4*this._x1+t)/6,(this._y0+4*this._y1+e)/6);break;default:Bt(this,t,e);break}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}};function Ht(t){return new ct(t)}const Xt={data(){return{land50:{},land110:{},pf:{},mp:{},iceshelf_list:[],iceshelf:{},ice:{},text1:"南极有四个极点，即地理极点、地磁极点、寒极点和冰盖最高点。",text2:"南极（south pole）是根据地球的旋转方式决定的最南点。它通常表示地理上的南极区域，有一个固定的位置。按照国际上通行的概念，南纬60度以南的地区称为南极，它是南大洋及其岛屿和南极大陆的总称，总面积6500万平方公里。南极圈即南纬66°33′纬线圈，极圈内有极昼极夜现象，同时也是划分温带与寒带的界限。",text3:"南极辐合带是一条自然地理边界，地理位置在南纬48°~62°之间，是一个不规则的圆圈。这里是向北流动的南大洋表层水(0~300米深)与向南流动的温暖的海水相遇的地方，也是海水温度和盐度的跃变带，因此两边的海洋有特别明显的差异。我们通常自然地理上所说的南极，指的就是南极辐合带之内的区域。",text4:"南极大陆的98%都被厚厚的永久冰盖——南极冰盖所覆盖，其余则为裸地和海岸线。南极洲的沿海地区主要由海冰和冰架组成。南极海冰是南大洋上由海水冻结形成的冰，多属一年内冻结和消融的季节性海冰，面积随季节波动较大。冰架是指与大陆冰相连的海上大面积的固定浮冰。"}},async mounted(){const t=this;try{let e=await k.get("./data/land-50m.json");t.land50=e.data,e=await k.get("./data/land-110m.json"),t.land110=e.data,e=await k.get("./data/polar-front.json"),t.pf=e.data,e=await k.get("./data/megPoles.json"),t.mp=e.data,e=await k.get("./data/USNIC_ANTARC_shelf_2022_merge-sim-nonproj.json"),t.iceshelf=e.data,e=await k.get("./data/ross_wgs84.json"),t.iceshelf_list.push(e.data),e=await k.get("./data/amery_wgs84.json"),t.iceshelf_list.push(e.data),e=await k.get("./data/filchner-ronne_wgs84.json"),t.iceshelf_list.push(e.data),e=await k.get("./data/iceedge23105.json"),t.ice=e.data,this.initScrollama(this)}catch(e){console.log(e)}},methods:{initScrollama(t){var e=p("div"),a=e.select("#scrolly2"),s=a.select("#figure2"),n=a.select("article"),r=n.selectAll(".step"),o=pt();function u(){var f=Math.floor(window.innerHeight*1);r.style("height",f+"px");var c=Math.floor(window.innerHeight*1),b=(window.innerHeight-c)/2;s.style("height",c+"px").style("top",b+"px"),o.resize()}function l(f){let c=f.index;r.classed("is-active",function(b,$){return $===c}),d(c)}function d(f){switch(f){case 0:p("#dragableEarth-srcoll-step1").style("display",null),p("#dragableEarth-srcoll-step2").style("display","none");break;case 1:p("#dragableEarth-srcoll-step1").style("display","none"),p("#dragableEarth-srcoll-step2").style("display",null),H(".de-step2").style("display",null),H(".de-step3").style("display","none");break;case 2:p("#dragableEarth-srcoll-step1").style("display","none"),H(".de-step2").style("display","none"),H(".de-step3").style("display",null),p("#dragableEarth-srcoll-step3").style("display","none"),p("#dragableEarth-srcoll-step2").style("display",null);break;case 3:p("#dragableEarth-srcoll-step1").style("display","none"),p("#dragableEarth-srcoll-step2").style("display","none"),p("#dragableEarth-srcoll-step3").style("display",null);break}}function h(){u();const f=document.querySelector("#figure2");let c=document.getElementById("dragableEarth-srcoll-step1");c.innerHTML="",t.drawmap1(f.offsetWidth*1,f.offsetHeight),c=document.getElementById("dragableEarth-srcoll-step2"),c.innerHTML="",t.drawmap2(f.offsetWidth*1,f.offsetHeight),c=document.getElementById("dragableEarth-srcoll-step3"),c.innerHTML="",t.drawmap3(f.offsetWidth*1,f.offsetHeight),o.setup({step:"#scrolly2 article .step",offset:.33,debug:!1}).onStepEnter(l)}h()},drawmap1(t,e){let s=J().scale(t*.4).center([0,0]).rotate([0,-30]).translate([t/2,e/2]);const n=s.scale();let r=E().projection(s),o=p("#dragableEarth-srcoll-step1").append("svg").attr("width",t).attr("height",e);this.addText(o,t,e),o.append("circle").attr("fill","lightblue").attr("cx",t/2).attr("cy",e/2).attr("r",n),o.append("path").datum(R()).attr("d",r).style("fill","none").style("stroke","#f2f2f2").style("stroke-width",.4).style("stroke-opacity",.6),o.append("path").datum(V(this.land110,this.land110.objects.land)).attr("d",r).style("fill","#fff"),this.drawPoles(o,s),o.append("circle").attr("fill","none").attr("stroke","#000").attr("stroke-width","1").attr("cx",t/2).attr("cy",e/2).attr("r",n),tt(function(u){const l=s.rotate(),d=50/s.scale();s.rotate([l[0]-1*d,l[1]]),r=E().projection(s),o.selectAll("path").attr("d",r)},200),o.call(st().on("drag",u=>{const l=s.rotate(),d=50/s.scale();s.rotate([l[0]+u.dx*d,l[1]-u.dy*d]),r=E().projection(s),o.selectAll("path").attr("d",r)}))},drawmap2(t,e){let s=J().scale(t*.4).center([0,0]).rotate([0,90]).translate([t/2,e/2]);const n=s.scale();let r=E().projection(s),o=p("#dragableEarth-srcoll-step2").append("svg").attr("width",t).attr("height",e);this.addText(o,t,e),o.append("circle").attr("fill","lightblue").attr("cx",t/2).attr("cy",e/2).attr("r",n),o.append("path").datum(u(-60)).attr("class","de-step2").attr("id","S60").attr("d",r).style("fill","#216bc6").style("opacity",.2).style("stroke","none"),o.append("path").datum(u(-66.55)).attr("class","de-step2").attr("id","S66").attr("d",r).style("fill","#216bc6").style("opacity",.3).style("stroke","none"),o.append("path").datum(u(-47)).attr("class","de-step3").attr("d",r).style("fill","#3ccfb7").style("opacity",.3).style("stroke","none"),o.append("path").datum(u(-64)).attr("id","tpath").attr("class","de-step3").attr("d",r).style("fill","lightblue").style("opacity",1).style("stroke","none"),o.append("path").datum(R()).attr("d",r).style("fill","none").style("stroke","#f2f2f2").style("stroke-width",.4).style("stroke-opacity",.6),o.append("text").append("textPath").attr("href","#S60").attr("class","de-step2").attr("fill","#91c2e0").style("font-weight","bold").style("font-family","sans-serif").style("font-size",16).attr("startOffset","45%").attr("text-anchor","middle").style("letter-spacing",5).text("60°S"),o.append("text").append("textPath").attr("href","#S66").attr("class","de-step2").attr("fill","#70a8d8").style("font-weight","bold").style("font-family","sans-serif").style("font-size",16).attr("startOffset","45%").attr("text-anchor","middle").style("letter-spacing",5).text("66°33'S"),o.append("path").datum(V(this.land110,this.land110.objects.land)).attr("d",r).style("fill","#fff"),o.append("path").datum(this.pf).attr("class","de-step3").attr("d",Nt().curve(Ht)).attr("fill","none").attr("stroke-width",2).attr("stroke-dasharray",[7,3]).attr("stroke","white").on("mouseover",function(l){p(this).style("stroke-width","4px")}).on("mouseout",function(){p(this).style("stroke-width",2)}),o.append("text").append("textPath").attr("href","#tpath").attr("id","tapth-text").attr("class","de-step3").attr("fill","white").style("font-weight","bold").style("font-family","sans-serif").style("font-size",16).attr("startOffset","60%").attr("text-anchor","middle").style("letter-spacing",5).text("ANTARCTIC CONVERGENCE 南极辐合带");function u(l){const d=[];for(let h=0;h<360;h++){const c=[h-180,l];d.push(c)}return d.push(d[0]),{type:"Feature",geometry:{type:"LineString",coordinates:d}}}o.append("circle").attr("fill","none").attr("stroke","#000").attr("stroke-width","1").attr("cx",t/2).attr("cy",e/2).attr("r",n),o.call(st().on("drag",l=>{const d=s.rotate(),h=50/s.scale();s.rotate([d[0]+l.dx*h,d[1]-l.dy*h]),r=E().projection(s),o.selectAll("path").attr("d",r)})),tt(function(l){const d=s.rotate(),h=50/s.scale();s.rotate([d[0]-1*h,d[1]]),r=E().projection(s),o.selectAll("path").attr("d",r)},200),p("#dragableEarth-srcoll-step2").style("display","none")},drawmap3(t,e){t=t*.9;let a=p("#dragableEarth-srcoll-step3").append("svg").attr("width",t).attr("height",t).style("background","lightblue").style("user-select","none").style("-webkit-user-select","none");const s=ft().rotate([0,90,0]).scale(t).translate([t*.5,t*.5]),n=E().projection(s);a.append("path").datum(this.ice).attr("d",n).attr("id","ice-edge").attr("fill","#fff").style("opacity",.6),a.append("path").datum(V(this.land50,this.land50.objects.land)).attr("d",n).style("fill","#fff"),a.append("path").datum(R()).attr("d",n).attr("fill","none").attr("stroke-width",.2).attr("stroke","white"),a.append("path").datum(this.iceshelf).attr("d",n).attr("class","iceshelf").attr("fill","none").attr("stroke-width",1.4).attr("stroke","#70a8d8");const r=bt().projection(s).size([t,t]).left(.75).top(.9).distance(1e3).label("1000 km").labelAnchor("middle").tickSize(null).tickValues(null);a.append("g").attr("class","scalebar").call(r),this.drawIceShelf(a,s,n),this.addLegendsToMap(a,t),p("#dragableEarth-srcoll-step3").style("display","none")},drawPoles(t,e){const a=E(e);var s=p("#dragableEarth-srcoll-step1").append("div").attr("class","tooltip1");s.style("width","50px").style("height","20px");const n=N().center([0,-90]).radius(1)();t.append("path").datum(n).attr("d",a).style("fill","#216bc6").style("stroke","none").on("mouseover",function(l){p(this).style("stroke","#216bc6").style("stroke-width","4px")}).on("mousemove",function(l){}).on("mouseout",function(){p(this).style("stroke","none")});const r=N().center([0,90]).radius(1)();t.append("path").datum(r).attr("d",a).style("fill","#216bc6").style("stroke","none").on("mouseover",function(l){p(this).style("stroke","#216bc6").style("stroke-width","4px"),s.html("北极点").style("visibility","visible")}).on("mousemove",function(l){s.style("top",l.pageY-10+"px").style("left",l.pageX+10+"px")}).on("mouseout",function(){s.style("visibility","hidden"),p(this).style("stroke","none")}),t.append("g").attr("class","lines").selectAll("path").data([{type:"LineString",coordinates:[[-103.689,78.095],[-109.64,80.972],[-132.834,85.02],[162.867,86.494]]},{type:"LineString",coordinates:[[138.902,-64.91],[138.303,-64.661],[137.325,-64.432],[135.866,-64.081]]}]).enter().append("path").attr("d",a).style("fill","none").style("stroke","#fed73c").style("stroke-width",2);const o=N().center([106.78,-78.3046]).radius(1)();t.append("path").datum(o).attr("d",a).style("fill","#216bc6").style("stroke","none").on("mouseover",function(l){p(this).style("stroke","#216bc6").style("stroke-width","4px"),s.html("寒极点").style("visibility","visible")}).on("mousemove",function(l){s.style("top",l.pageY-10+"px").style("left",l.pageX+10+"px")}).on("mouseout",function(){s.style("visibility","hidden"),p(this).style("stroke","none")});const u=N().center([77.116,-80.417]).radius(1)();t.append("path").datum(u).attr("d",a).style("fill","#216bc6").style("stroke","none").on("mouseover",function(l){p(this).style("stroke","#216bc6").style("stroke-width","4px"),s.html("最高点").style("visibility","visible")}).on("mousemove",function(l){s.style("top",l.pageY-10+"px").style("left",l.pageX+10+"px")}).on("mouseout",function(){s.style("visibility","hidden"),p(this).style("stroke","none")})},addText(t,e,a){t.append("text").attr("x",e/2).attr("y",a-60).style("text-anchor","middle").style("fill","#cccccc").style("user-select","none").text("*拖拽可转动地球")},drawIceShelf(t,e,a){let s=["#9ce1ce","#f9dd9c","#d2e4aa"],n=["ross","amery","filchner-ronne"];var r=p("#dragableEarth-srcoll-step3").append("div").attr("class","tooltip2");r.style("width","50px").style("height","20px").style("background-color","#fff").style("border","1px solid #ccc").style("border-radius","5px").style("padding","10px");for(let o=0;o<3;o++)t.append("path").datum(this.iceshelf_list[o]).attr("d",a).attr("id",n[o]).attr("fill",s[o]).attr("stroke-width",.8).attr("stroke","white").on("mouseover",function(u){p(this).style("stroke","blue").style("stroke-width","1px"),r.html(n[o]).style("visibility","visible")}).on("mousemove",function(u){r.style("top",u.pageY-10+"px").style("left",u.pageX+10+"px")}).on("mouseout",function(){r.style("visibility","hidden"),p(this).style("stroke","none")})},addLegendsToMap(t,e){let a=e-25,s=t.append("g").attr("transform",`translate(${a}, 10)`).attr("text-anchor","end"),n=0;s.append("circle").attr("r",5).attr("fill","#fff").style("opacity",.6).attr("transform",`translate(${n}, 20)`).attr("class","legend-text"),s.append("circle").attr("r",5).attr("fill","none").attr("stroke","#70a8d8").attr("stroke-width","1.4px").attr("transform",`translate(${n}, 45)`).attr("class","legend-text"),s.append("text").text("海冰").attr("transform",`translate(${n-10}, 25)`).attr("class","legend-text"),s.append("text").text("冰架边缘").attr("transform",`translate(${n-10}, 50)`).attr("class","legend-text")}}},Dt=t=>(yt("data-v-387a8a19"),t=t(),gt(),t),Yt={id:"scrolly2"},Ot={class:"step","data-step":"1"},Rt={class:"step","data-step":"2"},Vt={class:"step","data-step":"3"},qt={class:"step","data-step":"4"},Gt=Dt(()=>m("figure",{id:"figure2"},[m("div",{id:"dragableEarth-srcoll-step1"}),m("div",{id:"dragableEarth-srcoll-step2"}),m("div",{id:"dragableEarth-srcoll-step3"})],-1));function Ut(t,e,a,s,n,r){return it(),rt("div",null,[m("section",Yt,[m("article",null,[m("div",Ot,[m("p",null,B(n.text1),1)]),m("div",Rt,[m("p",null,B(n.text2),1)]),m("div",Vt,[m("p",null,B(n.text3),1)]),m("div",qt,[m("p",null,B(n.text4),1)])]),Gt])])}const Wt=nt(Xt,[["render",Ut],["__scopeId","data-v-387a8a19"]]);const Ft={name:"ChapterOne",components:{DragableEarth:Wt},data(){return{}},mounted(){},created(){window.scrollTo(0,0)},methods:{}},Zt={class:"container"},Kt={class:"sibling"};function Qt(t,e,a,s,n,r){const o=_t("DragableEarth");return it(),rt("div",Zt,[m("div",Kt,[mt(o)])])}const se=nt(Ft,[["render",Qt],["__scopeId","data-v-75ab1823"]]);export{se as default};
