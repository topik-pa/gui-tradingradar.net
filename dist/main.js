(()=>{"use strict";const e=()=>{const e=document.querySelector("header"),t=e.querySelector(".icon-menu"),s=e.querySelector("nav");t.addEventListener("click",(()=>{s.classList.toggle("show")}))},t=()=>{const e=document.querySelector("#cookie_layer_accept"),t=document.querySelector("#cookie_layer");""===function(e){const t="tradingradar-net-privacy=",s=document.cookie.split(";");for(let e=0;e<s.length;e++){let a=s[e];for(;" "===a.charAt(0);)a=a.substring(1);if(0===a.indexOf(t))return a.substring(t.length,a.length)}return""}()&&setTimeout((()=>{t.classList.add("active")}),3e3),e.addEventListener("click",(e=>{e.preventDefault(),function(e,t,s){const a=new Date;a.setTime(a.getTime()+10368e6);const o="expires="+a.toUTCString();document.cookie="tradingradar-net-privacy=true;"+o+";path=/"}(),t.classList.remove("active")}))},s=()=>{const e=document.getElementById("goto_top"),t="visible";window.addEventListener("scroll",function(e,t=300){let s;return(...a)=>{clearTimeout(s),s=setTimeout((()=>{e.apply(this,a)}),t)}}((function(){window.scrollY>=200?e.classList.add(t):e.classList.remove(t)}))),e.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})}))};let a,o,n,r;function i(e="A"){const t=n.getElementsByClassName("stock");Array.from(t).forEach((t=>{if(r.add(t.dataset.letter),t.dataset.letter.toUpperCase()===e){const e=t.querySelector("img");e.dataset.status||(e.dataset.status="loaded",e.src=`/assets/images/stocks/${t.dataset.code}-min.png`),t.classList.remove("hide")}else t.classList.add("hide")}))}const l=()=>{a=document.getElementById("stocks_list"),o=a.getElementsByClassName("alphabet")[0],n=a.getElementsByClassName("stocks")[0],r=new Set,i(),function(){const e=o.querySelectorAll("span");Array.from(e).forEach((e=>{r.has(e.innerText)?e.addEventListener("click",(()=>{i(e.innerText)})):e.classList.add("disabled")}))}()},c={get:async(e="/api/")=>{const t={};return await fetch(window.location.origin+"/"+e,{method:"GET"}).then((e=>(t.status=e.status,e.json()))).then((e=>{t.body=e})).catch((e=>{console.error(e)})),t},post:async(e={},t="/api/")=>{const s={},a={method:"POST",body:JSON.stringify(e)};return await fetch(window.location.origin+"/"+t,a).then((e=>(s.status=e.status,e.json()))).then((e=>{s.body=e})).catch((e=>{console.error(e)})),s}},d=c;let u,y;function m(e){const t=u.getElementsByClassName(e.name)[0];t.classList.remove(...y),t.classList.add(e.status)}function p(e){if(e.stocks){const t=u.getElementsByClassName(e.name)[0],s=t.getElementsByTagName("ul")[0];for(const t of e.stocks){const a=document.createElement("li"),o=document.createElement("a");o.innerText=t.name,o.title=t.name,o.href=`/analisi/${encodeURI(t.name.toLowerCase())}?isin=${t.isin}`;const n=document.createElement("span");n.innerText=t[e.key].value,a.appendChild(o),a.appendChild(n),s.appendChild(a)}t.appendChild(s)}}const v=async e=>{u=document.getElementById("api_list"),y=["idle","loading","success","error"],await async function(e){for(const t of e)if("api"===t.category)if("idle"===t.status){t.status="loading",m(t);try{const e=await d.get(`api/stocks/${t.name}/?${t.qp}`);t.stocks=e.body,t.status="success"}catch(e){t.status="error",console.error(e)}m(t),p(t)}else p(t)}(e)};let f,b,g;function h(e){let t=0,s=0;if("tendency"===e.name){let t=0;for(const s of e.stocks)"Rialzo"===s.sol24_shortTendency.value&&t++;e.value=(e.stocks.length/t).toFixed(2)}else{for(const a of e.stocks){let o=a[e.name].value;o&&("string"==typeof o&&(o=parseInt(o.replace(",",".").replace("%",""))),s++,t+=o)}e.value=(t/s).toFixed(2)}}function q(e){const t=f.querySelector(`.${e.class}`),s=t.querySelector("img"),a=t.querySelector("span");s.src=e.iconValue,a.innerText=e.value,t.classList.remove(...b),t.classList.add("success")}const S={init:e=>{f=document.getElementById("aggregator"),b=["idle","loading","success","error"],g={performance:{id:0,name:"perf1M",class:"performance",stocks:void 0,value:void 0,get iconValue(){let e;switch(!0){case this.value>14:e=5;break;case this.value>7&&this.value<=14:e=4;break;case this.value>=0&&this.value<=7:e=3;break;case this.value<0&&this.value>=-7:e=2;break;case this.value<-7&&this.value>=-14:e=1;break;case this.value<-14:e=0;break;default:e=""}return`/assets/images/gauge/gauge_${e}-min.png`}},volatility:{id:1,name:"volatility",class:"volatility",stocks:void 0,value:void 0,get iconValue(){let e;switch(!0){case this.value>70:e=0;break;case this.value>56:e=1;break;case this.value>44:e=2;break;case this.value>32:e=3;break;case this.value>20:e=4;break;default:e=5}return`/assets/images/gauge/gauge_${e}-min.png`}},tendency:{id:2,name:"tendency",class:"tendency",stocks:void 0,value:void 0,get iconValue(){let e;switch(!0){case this.value<1.2:e=5;break;case this.value<1.7:e=4;break;case this.value<2.5:e=3;break;case this.value<3.8:e=2;break;case this.value<5.9:e=1;break;default:e=0}return`/assets/images/gauge/gauge_${e}-min.png`}}};for(const t of e)"perf1M"===t.name&&(g.performance.stocks=t.stocks),"volatility"===t.name&&(g.volatility.stocks=t.stocks),"shortTendency"===t.name&&(g.tendency.stocks=t.stocks);h(g.performance),h(g.volatility),h(g.tendency),q(g.performance),q(g.volatility),q(g.tendency)}},k=S,T=JSON.parse(sessionStorage.getItem("localapi"))||[{category:"api",name:"perf1M",key:"perf1M",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"perf6M",key:"perf6M",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"perf1Y",key:"perf1Y",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"volatility",key:"volatility",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"shortTendency",key:"sol24_shortTendency",qp:"order=asc",stocks:void 0,status:"idle"},{category:"api",name:"divYield",key:"divYield",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"lastJudgment",key:"lastJudgment",qp:"",stocks:void 0,status:"idle"},{category:"filters",name:"rating",key:"borsaIt_rating",qp:"order=desc",stocks:void 0,status:"idle"},{category:"filters",name:"mfRanking",key:"milFin_mfRanking",qp:"order=asc",stocks:void 0,status:"idle"},{category:"filters",name:"mediumTendency",key:"sol24_mediumTendency",qp:"order=asc",stocks:void 0,status:"idle"},{category:"filters",name:"rsi",key:"borsaIt_rsi",qp:"order=desc",stocks:void 0,status:"idle"}],w=async()=>{l(),await v(T),k.init(T),sessionStorage.setItem("localapi",JSON.stringify(T))},_={info:{status:"idle",body:void 0},analysis:{status:"idle",body:void 0},news:{status:"idle",body:void 0}},x=["idle","loading","success","error"];let L,E;async function I(e){_[e].status="loading",M(e);try{const t=await d.get(`api/${e}/${E}`);_[e].body=t.body,_[e].status="success"}catch(t){_[e].status="error",console.error(t)}M(e)}function M(e){const t=L.getElementsByClassName(e)[0];t.classList.remove(...x),t.classList.add(_[e].status)}const B=async()=>{if(E=new URLSearchParams(window.location.search).get("isin")||window.location.pathname.replace("/stock/",""),L=document.getElementById("stock_info"),E&&(await I("info"),"success"===_.info.status&&function(){L.querySelector(".last-price span").innerText=_.info.body.lastPrice.value||"nd",L.querySelector(".volatility span").innerText=_.info.body.volatility?.value;const e=L.querySelector(".profile div");e.prepend(_.info.body.profile?.value),e.querySelector("a").href=_.info.body.profile?.source;const t=L.querySelector(".comment div");t.prepend(_.info.body.comment?.value),t.querySelector("a").href=_.info.body.comment?.source;const s=L.querySelector(".dividends");s.querySelector(".divYield span").prepend(_.info.body.divYield?.value),s.querySelector(".divValue span").prepend(_.info.body.lastDiv?.value),s.querySelector(".lastDiv span").prepend(_.info.body.lastDivDate?.value),s.querySelector("a").href=_.info.body.lastDivDate?.source;const a=L.querySelector(".average");a.querySelector(".mm20 span").prepend(_.info.body.mm20days?.value),a.querySelector(".mm40 span").prepend(_.info.body.mm40days?.value),a.querySelector(".mm100 span").prepend(_.info.body.mm100days?.value),a.querySelector("a").href=_.info.body.mm20days?.source;const o=L.querySelector(".minmax");o.querySelector(".absMax span").prepend(_.info.body.absMax?.value),o.querySelector(".absMin span").prepend(_.info.body.absMin?.value),o.querySelector(".max span").prepend(_.info.body.currentYearMax?.value),o.querySelector(".min span").prepend(_.info.body.currentYearMin?.value),o.querySelector("a").href=_.info.body.absMax?.source;const n=L.querySelector(".performance");n.querySelector(".perf1M span").prepend(_.info.body.perf1M?.value),n.querySelector(".perf6M span").prepend(_.info.body.perf6M?.value),n.querySelector(".perf1Y span").prepend(_.info.body.perf1Y?.value),n.querySelector("a").href=_.info.body.perf1M?.source}(),await I("analysis"),"success"===_.analysis.status&&function(){const e=L.querySelector(".analysis"),t=e.querySelector(".borsa-italiana-logo");t.querySelector("a").href=_.analysis.body.borsaIt_resistance?.source,t.querySelector(".resistance span").innerText=_.analysis.body.borsaIt_resistance?.value,t.querySelector(".support span").innerText=_.analysis.body.borsaIt_support?.value,t.querySelector(".rsi span").innerText=_.analysis.body.borsaIt_rsi?.value,t.querySelector(".evaluation span").innerText=_.analysis.body.borsaIt_evaluation?.value,t.querySelector(".rating span").innerText=_.analysis.body.borsaIt_rating?.value;const s=e.querySelector(".il-sole-24-ore-logo");s.querySelector("a").href=_.analysis.body.sol24_shortTendency?.source,s.querySelector(".short-tend span").innerText=_.analysis.body.sol24_shortTendency?.value,s.querySelector(".med-tend span").innerText=_.analysis.body.sol24_mediumTendency?.value;const a=e.querySelector(".milano-finanza-logo");a.querySelector("a").href=_.analysis.body.milFin_mfRanking?.source,a.querySelector(".rating span").innerText=_.analysis.body.milFin_mfRanking?.value,a.querySelector(".risk span").innerText=_.analysis.body.milFin_mfRisk?.value;const o=e.querySelector(".soldi-on-line-logo");o.querySelector("a").href=_.analysis.body.sol_lastTargetPrice?.source,o.querySelector(".target span").innerText=_.analysis.body.sol_lastTargetPrice?.value,o.querySelector(".evaluation span").innerText=_.analysis.body.sol_lastJudgment?.value;const n=e.querySelector(".teleborsa-logo");n.querySelector("a").href=_.analysis.body.teleb_tbResistance?.source,n.querySelector(".resistance span").innerText=_.analysis.body.teleb_tbResistance?.value,n.querySelector(".support span").innerText=_.analysis.body.teleb_tbSupport?.value,n.querySelector(".trend span").innerText=_.analysis.body.teleb_trend?.value}(),await I("news"),"success"===_.news.status&&function(){const e=L.querySelector(".news").getElementsByTagName("ul")[0];for(const t of _.news.body){const s=document.createElement("li"),a=document.createElement("a");a.innerText=t.title,a.title=t.title,a.href=t.url,a.target="_blank",a.rel="noopener noreferrer",s.appendChild(a),e.appendChild(s)}}(),"success"===_.info.status&&"success"===_.analysis.status))return _};let C;const N={init:async e=>{C=document.getElementById("stock_alerts"),function(e){const t=C.querySelector("#a1"),s=C.querySelector("#a2"),a=C.querySelector("#a3"),o=C.querySelector("#a4"),n=C.querySelector("#a5"),r=C.querySelector("#a6"),i=C.querySelector("#a7"),l=C.querySelector("#a8"),c=e.info.body.lastPrice.value;c&&(c>=e.info.body.mm20days.value?t.classList.remove("hide"):s.classList.remove("hide"),c>=e.info.body.mm40days.value?a.classList.remove("hide"):o.classList.remove("hide"),c>=e.analysis.body.borsaIt_resistance.value&&n.classList.remove("hide"),c<e.analysis.body.borsaIt_support.value&&r.classList.remove("hide"),c>=e.analysis.body.teleb_tbResistance.value&&i.classList.remove("hide"),c<e.analysis.body.teleb_tbSupport.value&&l.classList.remove("hide"),C.classList.add("show"))}(e),C.querySelector("i.icon-close").addEventListener("click",(()=>{C.classList.remove("show")}))}},R=N,Y=async()=>{const e=await B();await R.init(e)},$=async()=>{l()};if(e(),t(),s(),location.hash){const e=document.getElementById(location.hash.replace("#",""));e&&setTimeout((()=>{e.scrollIntoView({behavior:"smooth"})}),500)}document.querySelector("body#home")&&w(),document.querySelector("body#analysis")&&Y(),document.querySelector("body#err404")&&$()})();