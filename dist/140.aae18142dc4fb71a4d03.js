/*! For license information please see 140.aae18142dc4fb71a4d03.js.LICENSE.txt */
(self.webpackChunk=self.webpackChunk||[]).push([[140],{4104:(e,t,n)=>{"use strict";n.a(e,(async(e,t)=>{try{var r=n(5645),i=n(6690),o=n(5402),a=n(3835),s=n(1915),c=n(8172),u=n(7453),h=e([a]);a=(h.then?(await h)():h)[0],await(0,o.K)();document.getElementById("breadcrumbs")&&(document.getElementById("breadcrumbs").innerHTML=function(){var e=(0,r.Bv)(),t=[];if(t=e===i.gN?[{text:"Back",href:"/"}]:[{text:"Home",href:"/"}],e===i.zM){var n=(0,r.n3)();t.push({text:n})}else if(e===i.xW){var o=(0,r.em)();if(o){var h=(0,s.dY)()[o];if(h){var l=h.Categories;t.push({text:l,href:"/catalog-by-categories?category=".concat(l)},{text:o})}}}else if(e===i.A4)t.push({text:"Blog"});else if(e===i.s){t.push({text:"Blog",href:"/blog-post-list"});var p=(0,r.m0)(),d=(0,a.x)(p);d&&d.article&&t.push({text:d.article.title})}return c.Z.replace("${items}",function(e){return e.map((function(e){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return t?'<a class="item body-semibold" href="'.concat(t,'">').concat(e,"</a>"):'<a class="item body-semibold"">'.concat(e,"</a>")}(e.text,e.href)})).join(u.Z)}(t))}()),t()}catch(e){t(e)}}),1)},3321:(e,t,n)=>{"use strict";var r=n(8860),i=n(3405),o=n(4161),a=function(){var e=document.querySelector(".sign-in-wrapper"),t=document.querySelector(".sign-out-wrapper");(0,i.jE)("userName")?(t.style.display="flex",e.style.display="none"):(e.style.display="flex",t.style.display="none")},s=document.getElementById("mainHeader");if(s){s.innerHTML=r.Z;var c=document.querySelector(".sign-in-wrapper"),u=document.querySelector(".sign-out-wrapper");a(),c.addEventListener("click",(function(){(0,o.n)(a)})),u.addEventListener("click",(function(){(0,o.w)(a)}))}},3835:(e,t,n)=>{"use strict";n.a(e,(async(e,r)=>{try{function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function u(){u=function(){return t};var e,t={},n=Object.prototype,r=n.hasOwnProperty,i=Object.defineProperty||function(e,t,n){e[t]=n.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",h=o.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,n){return e[t]=n}}function p(e,t,n,r){var o=t&&t.prototype instanceof g?t:g,a=Object.create(o.prototype),s=new M(r||[]);return i(a,"_invoke",{value:S(e,n,s)}),a}function d(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}t.wrap=p;var f="suspendedStart",y="suspendedYield",v="executing",m="completed",w={};function g(){}function b(){}function k(){}var W={};l(W,a,(function(){return this}));var A=Object.getPrototypeOf,D=A&&A(A(L([])));D&&D!==n&&r.call(D,a)&&(W=D);var C=k.prototype=g.prototype=Object.create(W);function x(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function T(e,t){function n(i,o,a,s){var u=d(e[i],e,o);if("throw"!==u.type){var h=u.arg,l=h.value;return l&&"object"==c(l)&&r.call(l,"__await")?t.resolve(l.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(l).then((function(e){h.value=e,a(h)}),(function(e){return n("throw",e,a,s)}))}s(u.arg)}var o;i(this,"_invoke",{value:function(e,r){function i(){return new t((function(t,i){n(e,r,t,i)}))}return o=o?o.then(i,i):i()}})}function S(t,n,r){var i=f;return function(o,a){if(i===v)throw new Error("Generator is already running");if(i===m){if("throw"===o)throw a;return{value:e,done:!0}}for(r.method=o,r.arg=a;;){var s=r.delegate;if(s){var c=P(s,r);if(c){if(c===w)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(i===f)throw i=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);i=v;var u=d(t,n,r);if("normal"===u.type){if(i=r.done?m:y,u.arg===w)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(i=m,r.method="throw",r.arg=u.arg)}}}function P(t,n){var r=n.method,i=t.iterator[r];if(i===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,P(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),w;var o=d(i,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,w;var a=o.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,w):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,w)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function M(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function L(t){if(t||""===t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){for(;++i<t.length;)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}throw new TypeError(c(t)+" is not iterable")}return b.prototype=k,i(C,"constructor",{value:k,configurable:!0}),i(k,"constructor",{value:b,configurable:!0}),b.displayName=l(k,h,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===b||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,k):(e.__proto__=k,l(e,h,"GeneratorFunction")),e.prototype=Object.create(C),e},t.awrap=function(e){return{__await:e}},x(T.prototype),l(T.prototype,s,(function(){return this})),t.AsyncIterator=T,t.async=function(e,n,r,i,o){void 0===o&&(o=Promise);var a=new T(p(e,n,r,i),o);return t.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},x(C),l(C,h,"Generator"),l(C,a,(function(){return this})),l(C,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=L,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,w):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),w},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),O(n),w}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;O(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:L(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),w}},t}function h(e,t,n,r,i,o,a){try{var s=e[o](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function a(e){h(o,r,i,a,s,"next",e)}function s(e){h(o,r,i,a,s,"throw",e)}a(void 0)}))}}n.d(t,{x:()=>s});var i=n(9049),o={},a=function(){var e=l(u().mark((function e(){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(i.keys().map(function(){var e=l(u().mark((function e(t){var r,a,s,c,h;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.slice(2,t.lastIndexOf("/")),a=i(t),s=a.contentPath||"content.md",e.next=5,n(5008)("./".concat(r,"/").concat(s));case 5:c=e.sent,h={key:r,article:JSON.parse(a.default),markdownContent:c.default},o[h.key]=h;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();await a();var s=function(e){return o[e]?o[e]:null};Object.values(o);r()}catch(p){r(p)}}),1)},6690:(e,t,n)=>{"use strict";n.d(t,{A4:()=>a,gN:()=>i,s:()=>s,xW:()=>o,zM:()=>r});var r="catalog-by-categories",i="catalog-by-search-results",o="product-card",a="blog-post-list",s="blog-post"},5494:(e,t,n)=>{"use strict";n.d(t,{bd:()=>i,qv:()=>o,vM:()=>r});var r=function(e,t){return e.reduce((function(e,n){var r=n[t];return e[r]||(e[r]=[]),e[r].push(n),e}),{})},i=function(e,t,n){return e.reduce((function(e,r){var i=r[t];return e[i]||(e[i]=new Set),e[i].add(r[n]),e}),{})},o=function(e,t){return e.reduce((function(e,n){return e[n[t]]=n,e}),{})}},8172:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r='<div class="breadcrumbs" data-no-select>${items}</div> '},7453:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(1370),i=n.n(r),o=new URL(n(2770),n.b);const a='<div class="chevron"><img src="'+i()(o)+'"/></div> '},6537:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r='{\n  "title": "Crafting Cheers: Whiskey Tales for a Merry Christmas and to Kickstart Your New Year",\n  "tags": ["Merry Christmas", "Happy New Year"],\n  "publicationDate": "2023-12-24",\n  "readingTimeInMinutes": 4,\n  "mainImagePath": "CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/main.webp",\n  "previewImagePath": "CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/preview.webp",\n  "contentPath": "content.md",\n  "previewText": "As winter\'s embrace tightens, find solace in the golden hues of a whiskey glass. Journey with us into a ..."\n}\n'},6778:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r='{\n  "title": "Sippin\' Stories: A Dive into Canadian and Japanese Whiskey Vibes",\n  "tags": ["Japanese", "Canadian"],\n  "publicationDate": "2023-12-15",\n  "readingTimeInMinutes": 3,\n  "mainImagePath": "SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/main.webp",\n  "previewImagePath": "SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/preview.webp",\n  "contentPath": "content.md",\n  "previewText": "Alright, whiskey explorers, buckle up! We\'re venturing beyond the Scotch and Bourbon lanes to unravel the ..."\n}\n'},7994:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r='{\n  "title": "Unveiling the World of Flavored and Moonshine Whiskey",\n  "tags": ["Flavored", "Moonshine"],\n  "publicationDate": "2024-01-25",\n  "readingTimeInMinutes": 4,\n  "mainImagePath": "UnveilingtheWorldofFlavoredandMoonshineWhiskey/main.webp",\n  "previewImagePath": "UnveilingtheWorldofFlavoredandMoonshineWhiskey/preview.webp",\n  "contentPath": "content.md",\n  "previewText": "Embarking on a journey into the realm of whiskey is like stepping into a universe filled with diverse flavors and unique concoctions."\n}\n'},5284:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r='{\n  "title": "What else do people drink beside scotch and bourbon?",\n  "tags": ["Irish", "Rye"],\n  "publicationDate": "2023-12-04",\n  "readingTimeInMinutes": 2,\n  "mainImagePath": "WhatElseDoPeopleDrinkBesideBourbonAndScotch/main.webp",\n  "previewImagePath": "WhatElseDoPeopleDrinkBesideBourbonAndScotch/preview.webp",\n  "contentPath": "content.md",\n  "previewText": "Hey buddy, welcome back to our epic whiskey adventure! We\'re diving into the vast universe of whiskey once more, but this time ..."\n}\n'},7220:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});const r='{\n  "title": "Which type of whiskey do people drink often?",\n  "tags": ["Bourbon", "Scotch"],\n  "publicationDate": "2023-11-22",\n  "readingTimeInMinutes": 2,\n  "mainImagePath": "WhichTypeOfWhiskeyDoPeopleDrinkOften/main.webp",\n  "previewImagePath": "WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp",\n  "contentPath": "content.md",\n  "previewText": "Alright, fellow whiskey aficionados, grab your favorite glass because we\'re about to embark on a ..."\n}\n'},5008:(e,t,n)=>{var r={"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/article":[6537],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/article.json":[6537],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/celebration.webp":[5321,321],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/christmas.webp":[444,444],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/content.md":[4229,229],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/main.webp":[3130,130],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/preview.webp":[9182,182],"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/winter.webp":[2689,689],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/Canadian.webp":[7814,814],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/Japaneese.webp":[4493,609],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/article":[6778],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/article.json":[6778],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/content.md":[7803,803],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/main.webp":[7960,960],"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/preview.webp":[2716,716],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/Flavored.webp":[1359,359],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/Moonshine.webp":[1347,347],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/article":[7994],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/article.json":[7994],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/content.md":[7841,841],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/main.webp":[7909,909],"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/preview.webp":[1969,969],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/AnotherTypeOfWhiskey.webp":[7206,206],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/Jameson.webp":[3307,307],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/article":[5284],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/article.json":[5284],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/content.md":[6753,753],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/main.webp":[8480,480],"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/preview.webp":[2173,173],"./WhichTypeOfWhiskeyDoPeopleDrinkOften/WhiskeyDegustation.webp":[3411,411],"./WhichTypeOfWhiskeyDoPeopleDrinkOften/article":[7220],"./WhichTypeOfWhiskeyDoPeopleDrinkOften/article.json":[7220],"./WhichTypeOfWhiskeyDoPeopleDrinkOften/content.md":[7910,910],"./WhichTypeOfWhiskeyDoPeopleDrinkOften/main.webp":[1781,781],"./WhichTypeOfWhiskeyDoPeopleDrinkOften/preview.webp":[4047,215]};function i(e){if(!n.o(r,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],i=t[0];return Promise.all(t.slice(1).map(n.e)).then((()=>n(i)))}i.keys=()=>Object.keys(r),i.id=5008,e.exports=i},9049:(e,t,n)=>{var r={"./CraftingCheersWhiskeyTalesForAMerryChristmasAndToKickstartYourNewYear/article.json":6537,"./SippinStoriesADiveintoCanadianAndJapaneseWhiskeyVibes/article.json":6778,"./UnveilingtheWorldofFlavoredandMoonshineWhiskey/article.json":7994,"./WhatElseDoPeopleDrinkBesideBourbonAndScotch/article.json":5284,"./WhichTypeOfWhiskeyDoPeopleDrinkOften/article.json":7220};function i(e){var t=o(e);return n(t)}function o(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=o,e.exports=i,i.id=9049},2770:(e,t,n)=>{"use strict";e.exports=n.p+"0143e74d4e316832790a.svg"}}]);