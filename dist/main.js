(()=>{"use strict";const e=()=>{const e=document.querySelector("header"),s=e.querySelector(".icon-menu"),t=e.querySelector("nav");s.addEventListener("click",(()=>{t.classList.toggle("show")}))},s=()=>{const e=document.querySelector("#cookie_layer_accept"),s=document.querySelector("#cookie_layer");""===function(e){const s="tradingradar-net-privacy=",t=document.cookie.split(";");for(let e=0;e<t.length;e++){let a=t[e];for(;" "===a.charAt(0);)a=a.substring(1);if(0===a.indexOf(s))return a.substring(s.length,a.length)}return""}()&&setTimeout((()=>{s.classList.add("active")}),3e3),e.addEventListener("click",(e=>{e.preventDefault(),function(e,s,t){const a=new Date;a.setTime(a.getTime()+10368e6);const o="expires="+a.toUTCString();document.cookie="tradingradar-net-privacy=true;"+o+";path=/"}(),s.classList.remove("active")}))},t=()=>{const e=document.getElementById("goto_top"),s="visible";window.addEventListener("scroll",function(e,s=300){let t;return(...a)=>{clearTimeout(t),t=setTimeout((()=>{e.apply(this,a)}),s)}}((function(){window.scrollY>=200?e.classList.add(s):e.classList.remove(s)}))),e.addEventListener("click",(()=>{window.scrollTo({top:0,behavior:"smooth"})}))};let a,o,n,r;function i(e="A"){const s=n.getElementsByClassName("stock");Array.from(s).forEach((s=>{if(r.add(s.dataset.letter),s.dataset.letter.toUpperCase()===e){const e=s.querySelector("img");e.dataset.status||(e.dataset.status="loaded",e.src=`/assets/images/stocks/${s.dataset.code}-min.png`),s.classList.remove("hide")}else s.classList.add("hide")}))}const l=()=>{a=document.getElementById("stocks_list"),o=a.getElementsByClassName("alphabet")[0],n=a.getElementsByClassName("stocks")[0],r=new Set,i(),function(){const e=o.querySelectorAll("span");Array.from(e).forEach((e=>{r.has(e.innerText)?e.addEventListener("click",(()=>{i(e.innerText)})):e.classList.add("disabled")}))}()},c={get:async(e="/api/")=>{const s={};return await fetch(window.location.origin+"/"+e,{method:"GET"}).then((e=>(s.status=e.status,e.json()))).then((e=>{s.body=e})).catch((e=>{console.error(e)})),s},post:async(e={},s="/api/")=>{const t={},a={method:"POST",body:JSON.stringify(e)};return await fetch(window.location.origin+"/"+s,a).then((e=>(t.status=e.status,e.json()))).then((e=>{t.body=e})).catch((e=>{console.error(e)})),t}},u=c;let d,y;function m(e){const s=d.getElementsByClassName(e.name)[0];s.classList.remove(...y),s.classList.add(e.status)}function p(e){if(e.stocks){const s=d.getElementsByClassName(e.name)[0],t=s.getElementsByTagName("ul")[0];for(const s of e.stocks){const a=document.createElement("li"),o=document.createElement("a");o.innerText=s.name,o.title=s.name,o.href=`/analisi/${encodeURI(s.name.toLowerCase())}?isin=${s.isin}`;const n=document.createElement("span");n.innerText=s[e.key].value,a.appendChild(o),a.appendChild(n),t.appendChild(a)}s.appendChild(t)}}const f=async e=>{d=document.getElementById("api_list"),y=["idle","loading","success","error"],await async function(e){for(const s of e)if("api"===s.category)if("idle"===s.status){s.status="loading",m(s);try{const e=await u.get(`api/stocks/${s.name}/?${s.qp}`);s.stocks=e.body,s.status="success"}catch(e){s.status="error",console.error(e)}m(s),p(s)}else p(s)}(e)};let v,g,k;function b(e){let s=0;const t=e.stocks.length;if("tendency"===e.name){let s=0;for(const t of e.stocks)"Rialzo"===t.sol24_shortTendency.value&&s++;e.value=(t/s).toFixed(2)}else{for(const t of e.stocks){let a=t[e.name].value;"string"==typeof a&&(a=parseInt(a.replace(",",".").replace("%",""))),s+=a}e.value=s/t}}function h(e){const s=v.querySelector(`.${e.class}`),t=s.querySelector("img"),a=s.querySelector("span");t.src=e.iconValue,a.innerText=e.value,s.classList.remove(...g),s.classList.add("success")}const q={init:e=>{v=document.getElementById("aggregator"),g=["idle","loading","success","error"],k={performance:{id:0,name:"perf1M",class:"performance",stocks:void 0,value:void 0,get iconValue(){let e;switch(!0){case this.value>10:e=5;break;case this.value>5&&this.value<=10:e=4;break;case this.value>=0&&this.value<=5:e=3;break;case this.value<0&&this.value>=-5:e=2;break;case this.value<-5&&this.value>=-10:e=1;break;case this.value<-10:e=0;break;default:e=""}return`/assets/images/gauge/gauge_${e}-min.png`}},volatility:{id:1,name:"volatility",class:"volatility",stocks:void 0,value:void 0,get iconValue(){let e;switch(!0){case this.value>70:e=0;break;case this.value>56:e=1;break;case this.value>44:e=2;break;case this.value>32:e=3;break;case this.value>20:e=4;break;default:e=5}return`/assets/images/gauge/gauge_${e}-min.png`}},tendency:{id:2,name:"tendency",class:"tendency",stocks:void 0,value:void 0,get iconValue(){let e;switch(!0){case this.value<1.2:e=5;break;case this.value<1.7:e=4;break;case this.value<2.5:e=3;break;case this.value<3.8:e=2;break;case this.value<5.9:e=1;break;default:e=0}return`/assets/images/gauge/gauge_${e}-min.png`}}};for(const s of e)"perf1M"===s.name&&(k.performance.stocks=s.stocks),"volatility"===s.name&&(k.volatility.stocks=s.stocks),"shortTendency"===s.name&&(k.tendency.stocks=s.stocks);b(k.performance),b(k.volatility),b(k.tendency),h(k.performance),h(k.volatility),h(k.tendency)}},S=q;let T,_,w;function x(e){const s=T.getElementsByClassName(e.class)[0];if(s.classList.remove(..._),s.classList.add(e.status),e.stocks.length){const t=s.getElementsByTagName("ul")[0];for(const s of e.stocks){const a=document.createElement("li"),o=document.createElement("a");o.innerText=s.name,o.title=s.name,o.href=`/analisi/${encodeURI(s.name.toLowerCase())}?isin=${s.isin}`;const n=document.createElement("span");n.innerText=s[e.key1].value;const r=document.createElement("span");r.innerText=s[e.key2].value,a.appendChild(o),a.appendChild(n),a.appendChild(r),t.appendChild(a)}s.appendChild(t)}}const E={init:async e=>{T=document.getElementById("filters"),_=["idle","loading","success","error"],w={ratings:{key1:"borsaIt_rating",key2:"milFin_mfRanking",class:"ranking",status:"idle",stocks:[]},judgments:{key1:"lastJudgment",key2:"sol24_mediumTendency",class:"judgment",status:"idle",stocks:[]},overbought:{key1:"borsaIt_rsi",key2:"milFin_rsi",class:"overbought",status:"idle",stocks:[]},oversold:{key1:"borsaIt_rsi",key2:"milFin_rsi",class:"oversold",status:"idle",stocks:[]}},w.ratings.status="loading",w.judgments.status="loading",w.overbought.status="loading",w.oversold.status="loading",x(w.ratings),x(w.judgments),x(w.overbought),x(w.oversold),await async function(e){for(const s of e)if("filters"===s.category&&"idle"===s.status){s.status="loading";try{const e=await u.get(`api/stocks/${s.name}/?${s.qp}`);s.stocks=e.body,s.status="success"}catch(e){s.status="error",console.error(e)}}}(e),w.ratings.status="success",w.judgments.status="success",w.overbought.status="success",w.oversold.status="success";const s=e.filter((e=>"rating"===e.name)),t=e.filter((e=>"mfRanking"===e.name)),a=e.filter((e=>"lastJudgment"===e.name)),o=e.filter((e=>"mediumTendency"===e.name)),n=e.filter((e=>"rsi"===e.name)),r=e.filter((e=>"mfRsi"===e.name));for(const e of s[0].stocks)if(3===e[s[0].key].value||4===e[s[0].key].value)for(const s of t[0].stocks)s.isin===e.isin&&(s[t[0].key].value.includes("A")||s[t[0].key].value.includes("B"))&&(e[t[0].key]=s[t[0].key],w.ratings.stocks.push(e));for(const e of a[0].stocks)if(e[a[0].key].value.includes("Buy"))for(const s of o[0].stocks)s.isin===e.isin&&s[o[0].key].value.includes("Rialzo")&&(e[o[0].key]=s[o[0].key],w.judgments.stocks.push(e));for(const e of n[0].stocks)if(e[n[0].key].value>20)for(const s of r[0].stocks)s.isin===e.isin&&s[r[0].key].value>45&&(e[r[0].key]=s[r[0].key],w.overbought.stocks.push(e));for(const e of n[0].stocks)if(e[n[0].key].value<-20)for(const s of r[0].stocks)s.isin===e.isin&&s[r[0].key].value<45&&(e[r[0].key]=s[r[0].key],w.oversold.stocks.push(e));x(w.ratings),x(w.judgments),x(w.overbought),x(w.oversold)}},L=E,I=JSON.parse(sessionStorage.getItem("localapi"))||[{category:"api",name:"perf1M",key:"perf1M",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"perf6M",key:"perf6M",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"perf1Y",key:"perf1Y",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"volatility",key:"volatility",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"mfRsi",key:"milFin_rsi",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"shortTendency",key:"sol24_shortTendency",qp:"order=asc",stocks:void 0,status:"idle"},{category:"api",name:"divYield",key:"divYield",qp:"order=desc",stocks:void 0,status:"idle"},{category:"api",name:"lastJudgment",key:"lastJudgment",qp:"",stocks:void 0,status:"idle"},{category:"filters",name:"rating",key:"borsaIt_rating",qp:"order=desc",stocks:void 0,status:"idle"},{category:"filters",name:"mfRanking",key:"milFin_mfRanking",qp:"order=asc",stocks:void 0,status:"idle"},{category:"filters",name:"mediumTendency",key:"sol24_mediumTendency",qp:"order=asc",stocks:void 0,status:"idle"},{category:"filters",name:"rsi",key:"borsaIt_rsi",qp:"order=desc",stocks:void 0,status:"idle"}],C=async()=>{l(),await f(I),S.init(I),await L.init(I),sessionStorage.setItem("localapi",JSON.stringify(I))},B={info:{status:"idle",body:void 0},analysis:{status:"idle",body:void 0},news:{status:"idle",body:void 0}},M=["idle","loading","success","error"];let R,$;async function N(e){B[e].status="loading",Y(e);try{const s=await u.get(`api/${e}/${$}`);B[e].body=s.body,B[e].status="success"}catch(s){B[e].status="error",console.error(s)}Y(e)}function Y(e){const s=R.getElementsByClassName(e)[0];s.classList.remove(...M),s.classList.add(B[e].status)}const F=async()=>{if($=new URLSearchParams(window.location.search).get("isin")||window.location.pathname.replace("/stock/",""),R=document.getElementById("stock_info"),$&&(await N("info"),"success"===B.info.status&&function(){R.querySelector(".last-price span").innerText=B.info.body.lastPrice.value||"nd",R.querySelector(".volatility span").innerText=B.info.body.volatility.value;const e=R.querySelector(".profile div");e.prepend(B.info.body.profile.value),e.querySelector("a").href=B.info.body.profile.source;const s=R.querySelector(".comment div");s.prepend(B.info.body.comment.value),s.querySelector("a").href=B.info.body.comment.source;const t=R.querySelector(".dividends");t.querySelector(".divYield span").prepend(B.info.body.divYield.value),t.querySelector(".divValue span").prepend(B.info.body.lastDiv.value),t.querySelector(".lastDiv span").prepend(B.info.body.lastDivDate.value),t.querySelector("a").href=B.info.body.lastDivDate.source;const a=R.querySelector(".average");a.querySelector(".mm20 span").prepend(B.info.body.mm20days.value),a.querySelector(".mm40 span").prepend(B.info.body.mm40days.value),a.querySelector(".mm100 span").prepend(B.info.body.mm100days.value),a.querySelector("a").href=B.info.body.mm20days.source;const o=R.querySelector(".minmax");o.querySelector(".absMax span").prepend(B.info.body.absMax.value),o.querySelector(".absMin span").prepend(B.info.body.absMin.value),o.querySelector(".max span").prepend(B.info.body.currentYearMax.value),o.querySelector(".min span").prepend(B.info.body.currentYearMin.value),o.querySelector("a").href=B.info.body.absMax.source;const n=R.querySelector(".performance");n.querySelector(".perf1M span").prepend(B.info.body.perf1M.value),n.querySelector(".perf6M span").prepend(B.info.body.perf6M.value),n.querySelector(".perf1Y span").prepend(B.info.body.perf1Y.value),n.querySelector("a").href=B.info.body.perf1M.source}(),await N("analysis"),"success"===B.analysis.status&&function(){const e=R.querySelector(".analysis"),s=e.querySelector(".borsa-italiana-logo");s.querySelector("a").href=B.analysis.body.borsaIt_resistance.source,s.querySelector(".resistance span").innerText=B.analysis.body.borsaIt_resistance.value,s.querySelector(".support span").innerText=B.analysis.body.borsaIt_support.value,s.querySelector(".rsi span").innerText=B.analysis.body.borsaIt_rsi.value,s.querySelector(".evaluation span").innerText=B.analysis.body.borsaIt_evaluation.value,s.querySelector(".rating span").innerText=B.analysis.body.borsaIt_rating.value;const t=e.querySelector(".il-sole-24-ore-logo");t.querySelector("a").href=B.analysis.body.sol24_shortTendency.source,t.querySelector(".short-tend span").innerText=B.analysis.body.sol24_shortTendency.value,t.querySelector(".med-tend span").innerText=B.analysis.body.sol24_mediumTendency.value;const a=e.querySelector(".milano-finanza-logo");a.querySelector("a").href=B.analysis.body.milFin_mfRanking.source,a.querySelector(".rating span").innerText=B.analysis.body.milFin_mfRanking.value,a.querySelector(".risk span").innerText=B.analysis.body.milFin_mfRisk.value,a.querySelector(".rsi span").innerText=B.analysis.body.milFin_mfRsi.value;const o=e.querySelector(".soldi-on-line-logo");o.querySelector("a").href=B.analysis.body.sol_lastTargetPrice.source,o.querySelector(".target span").innerText=B.analysis.body.sol_lastTargetPrice.value,o.querySelector(".evaluation span").innerText=B.analysis.body.sol_lastJudgment.value;const n=e.querySelector(".teleborsa-logo");n.querySelector("a").href=B.analysis.body.teleb_tbResistance.source,n.querySelector(".resistance span").innerText=B.analysis.body.teleb_tbResistance.value,n.querySelector(".support span").innerText=B.analysis.body.teleb_tbSupport.value,n.querySelector(".trend span").innerText=B.analysis.body.teleb_trend.value}(),await N("news"),"success"===B.news.status&&function(){const e=R.querySelector(".news").getElementsByTagName("ul")[0];for(const s of B.news.body){const t=document.createElement("li"),a=document.createElement("a");a.innerText=s.title,a.title=s.title,a.href=s.url,a.target="_blank",a.rel="noopener noreferrer",t.appendChild(a),e.appendChild(t)}}(),"success"===B.info.status&&"success"===B.analysis.status))return B};let j;const D={init:async e=>{j=document.getElementById("stock_alerts"),function(e){const s=j.querySelector("#a1"),t=j.querySelector("#a2"),a=j.querySelector("#a3"),o=j.querySelector("#a4"),n=j.querySelector("#a5"),r=j.querySelector("#a6"),i=j.querySelector("#a7"),l=j.querySelector("#a8"),c=e.info.body.lastPrice.value;c&&(c>=e.info.body.mm20days.value?s.classList.remove("hide"):t.classList.remove("hide"),c>=e.info.body.mm40days.value?a.classList.remove("hide"):o.classList.remove("hide"),c>=e.analysis.body.borsaIt_resistance.value&&n.classList.remove("hide"),c<e.analysis.body.borsaIt_support.value&&r.classList.remove("hide"),c>=e.analysis.body.teleb_tbResistance.value&&i.classList.remove("hide"),c<e.analysis.body.teleb_tbSupport.value&&l.classList.remove("hide"),j.classList.add("show"))}(e)}},J=D,A=async()=>{const e=await F();await J.init(e)},P=async()=>{l()};if(e(),s(),t(),location.hash){const e=document.getElementById(location.hash.replace("#",""));e&&setTimeout((()=>{e.scrollIntoView({behavior:"smooth"})}),500)}document.querySelector("body#home")&&C(),document.querySelector("body#analysis")&&A(),document.querySelector("body#err404")&&P()})();