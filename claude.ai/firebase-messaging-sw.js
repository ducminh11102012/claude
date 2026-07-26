"use strict";(()=>{var Ht=Object.defineProperty,Vt=Object.defineProperties;var Wt=Object.getOwnPropertyDescriptors;var Ue=Object.getOwnPropertySymbols;var Gt=Object.prototype.hasOwnProperty,zt=Object.prototype.propertyIsEnumerable;var Fe=(e,t,n)=>t in e?Ht(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,R=(e,t)=>{for(var n in t||(t={}))Gt.call(t,n)&&Fe(e,n,t[n]);if(Ue)for(var n of Ue(t))zt.call(t,n)&&Fe(e,n,t[n]);return e},$e=(e,t)=>Vt(e,Wt(t));var je=()=>{};var Ve=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},qt=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[n++],s=e[n++],a=e[n++],u=((i&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(u>>10)),t[r++]=String.fromCharCode(56320+(u&1023))}else{let o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},We={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let o=e[i],s=i+1<e.length,a=s?e[i+1]:0,u=i+2<e.length,c=u?e[i+2]:0,l=o>>2,f=(o&3)<<4|a>>4,p=(a&15)<<2|c>>6,S=c&63;u||(S=64,s||(p=64)),r.push(n[l],n[f],n[p],n[S])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Ve(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):qt(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;let c=i<e.length?n[e.charAt(i)]:64;++i;let f=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||a==null||c==null||f==null)throw new te;let p=o<<2|a>>4;if(r.push(p),c!==64){let S=a<<4&240|c>>2;if(r.push(S),f!==64){let ee=c<<6&192|f;r.push(ee)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},te=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Kt=function(e){let t=Ve(e);return We.encodeByteArray(t,!0)},ne=function(e){return Kt(e).replace(/\./g,"")},Ge=function(e){try{return We.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Jt(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Yt=()=>Jt().__FIREBASE_DEFAULTS__,Xt=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Qt=()=>{if(typeof document=="undefined")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}let t=e&&Ge(e[1]);return t&&JSON.parse(t)},Zt=()=>{try{return je()||Yt()||Xt()||Qt()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}};var re=()=>{var e;return(e=Zt())===null||e===void 0?void 0:e.config};var x=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}};function B(){try{return typeof indexedDB=="object"}catch(e){return!1}}function U(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){t(n)}})}var en="FirebaseError",m=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=en,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,b.prototype.create)}},b=class{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){let r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?tn(o,r):"Error",a=`${this.serviceName}: ${s} (${i}).`;return new m(i,a,r)}};function tn(e,t){return e.replace(nn,(n,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var nn=/\{\$([^}]+)}/g;function F(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let o=e[i],s=t[i];if(He(o)&&He(s)){if(!F(o,s))return!1}else if(o!==s)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function He(e){return e!==null&&typeof e=="object"}var Gi=4*60*60*1e3;function $(e){return e&&e._delegate?e._delegate:e}var h=class{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var v="[DEFAULT]";var ie=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let r=new x;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch(i){}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;let r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(on(t))try{this.getOrInitializeService({instanceIdentifier:v})}catch(n){}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch(o){}}}}clearInstance(t=v){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=v){return this.instances.has(t)}getOptions(t=v){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[o,s]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(o);r===a&&s.resolve(i)}return i}onInit(t,n){var r;let i=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);let s=this.instances.get(i);return s&&t(s,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(t,n)}catch(o){}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:rn(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch(i){}return r||null}normalizeInstanceIdentifier(t=v){return this.component?this.component.multipleInstances?t:v:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function rn(e){return e===v?void 0:e}function on(e){return e.instantiationMode==="EAGER"}var j=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new ie(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var sn=[],d;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(d||(d={}));var an={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},cn=d.INFO,un={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},ln=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=un[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},H=class{constructor(t){this.name=t,this._logLevel=cn,this._logHandler=ln,this._userLogHandler=null,sn.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in d))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?an[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...t),this._logHandler(this,d.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...t),this._logHandler(this,d.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,d.INFO,...t),this._logHandler(this,d.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,d.WARN,...t),this._logHandler(this,d.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...t),this._logHandler(this,d.ERROR,...t)}};var dn=(e,t)=>t.some(n=>e instanceof n),ze,qe;function fn(){return ze||(ze=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pn(){return qe||(qe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ke=new WeakMap,se=new WeakMap,Je=new WeakMap,oe=new WeakMap,ce=new WeakMap;function hn(e){let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(_(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Ke.set(n,e)}).catch(()=>{}),ce.set(t,e),t}function gn(e){if(se.has(e))return;let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});se.set(e,t)}var ae={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return se.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Je.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return _(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Ye(e){ae=e(ae)}function _n(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let r=e.call(V(this),t,...n);return Je.set(r,t.sort?t.sort():[t]),_(r)}:pn().includes(e)?function(...t){return e.apply(V(this),t),_(Ke.get(this))}:function(...t){return _(e.apply(V(this),t))}}function mn(e){return typeof e=="function"?_n(e):(e instanceof IDBTransaction&&gn(e),dn(e,fn())?new Proxy(e,ae):e)}function _(e){if(e instanceof IDBRequest)return hn(e);if(oe.has(e))return oe.get(e);let t=mn(e);return t!==e&&(oe.set(e,t),ce.set(t,e)),t}var V=e=>ce.get(e);function T(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){let s=indexedDB.open(e,t),a=_(s);return r&&s.addEventListener("upgradeneeded",u=>{r(_(s.result),u.oldVersion,u.newVersion,_(s.transaction),u)}),n&&s.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),a.then(u=>{o&&u.addEventListener("close",()=>o()),i&&u.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}function W(e,{blocked:t}={}){let n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),_(n).then(()=>{})}var bn=["get","getKey","getAll","getAllKeys","count"],En=["put","add","delete","clear"],ue=new Map;function Xe(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ue.get(t))return ue.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=En.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||bn.includes(n)))return;let o=async function(s,...a){let u=this.transaction(s,i?"readwrite":"readonly"),c=u.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),i&&u.done]))[0]};return ue.set(t,o),o}Ye(e=>$e(R({},e),{get:(t,n,r)=>Xe(t,n)||e.get(t,n,r),has:(t,n)=>!!Xe(t,n)||e.has(t,n)}));var de=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(wn(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function wn(e){let t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}var fe="@firebase/app",Qe="0.11.2";var E=new H("@firebase/app"),Sn="@firebase/app-compat",In="@firebase/analytics-compat",yn="@firebase/analytics",An="@firebase/app-check-compat",vn="@firebase/app-check",Tn="@firebase/auth",On="@firebase/auth-compat",Dn="@firebase/database",Cn="@firebase/data-connect",Nn="@firebase/database-compat",Rn="@firebase/functions",Pn="@firebase/functions-compat",Ln="@firebase/installations",Mn="@firebase/installations-compat",kn="@firebase/messaging",xn="@firebase/messaging-compat",Bn="@firebase/performance",Un="@firebase/performance-compat",Fn="@firebase/remote-config",$n="@firebase/remote-config-compat",jn="@firebase/storage",Hn="@firebase/storage-compat",Vn="@firebase/firestore",Wn="@firebase/vertexai",Gn="@firebase/firestore-compat",zn="firebase";var pe="[DEFAULT]",qn={[fe]:"fire-core",[Sn]:"fire-core-compat",[yn]:"fire-analytics",[In]:"fire-analytics-compat",[vn]:"fire-app-check",[An]:"fire-app-check-compat",[Tn]:"fire-auth",[On]:"fire-auth-compat",[Dn]:"fire-rtdb",[Cn]:"fire-data-connect",[Nn]:"fire-rtdb-compat",[Rn]:"fire-fn",[Pn]:"fire-fn-compat",[Ln]:"fire-iid",[Mn]:"fire-iid-compat",[kn]:"fire-fcm",[xn]:"fire-fcm-compat",[Bn]:"fire-perf",[Un]:"fire-perf-compat",[Fn]:"fire-rc",[$n]:"fire-rc-compat",[jn]:"fire-gcs",[Hn]:"fire-gcs-compat",[Vn]:"fire-fst",[Gn]:"fire-fst-compat",[Wn]:"fire-vertex","fire-js":"fire-js",[zn]:"fire-js-all"};var G=new Map,Kn=new Map,he=new Map;function Ze(e,t){try{e.container.addComponent(t)}catch(n){E.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function A(e){let t=e.name;if(he.has(t))return E.debug(`There were multiple attempts to register component ${t}.`),!1;he.set(t,e);for(let n of G.values())Ze(n,e);for(let n of Kn.values())Ze(n,e);return!0}function L(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var Jn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},I=new b("app","Firebase",Jn);var ge=class{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new h("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw I.create("app-deleted",{appName:this._name})}};function be(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let r=Object.assign({name:pe,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw I.create("bad-app-name",{appName:String(i)});if(n||(n=re()),!n)throw I.create("no-options");let o=G.get(i);if(o){if(F(n,o.options)&&F(r,o.config))return o;throw I.create("duplicate-app",{appName:i})}let s=new j(i);for(let u of he.values())s.addComponent(u);let a=new ge(n,r,s);return G.set(i,a),a}function Ee(e=pe){let t=G.get(e);if(!t&&e===pe&&re())return be();if(!t)throw I.create("no-app",{appName:e});return t}function y(e,t,n){var r;let i=(r=qn[e])!==null&&r!==void 0?r:e;n&&(i+=`-${n}`);let o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){let a=[`Unable to register library "${i}" with version "${t}":`];o&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),E.warn(a.join(" "));return}A(new h(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}var Yn="firebase-heartbeat-database",Xn=1,P="firebase-heartbeat-store",le=null;function rt(){return le||(le=T(Yn,Xn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(P)}catch(n){console.warn(n)}}}}).catch(e=>{throw I.create("idb-open",{originalErrorMessage:e.message})})),le}async function Qn(e){try{let n=(await rt()).transaction(P),r=await n.objectStore(P).get(it(e));return await n.done,r}catch(t){if(t instanceof m)E.warn(t.message);else{let n=I.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});E.warn(n.message)}}}async function et(e,t){try{let r=(await rt()).transaction(P,"readwrite");await r.objectStore(P).put(t,it(e)),await r.done}catch(n){if(n instanceof m)E.warn(n.message);else{let r=I.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});E.warn(r.message)}}}function it(e){return`${e.name}!${e.options.appId}`}var Zn=1024,er=30,_e=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new me(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=tt();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>er){let s=nr(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){E.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=tt(),{heartbeatsToSend:r,unsentEntries:i}=tr(this._heartbeatsCache.heartbeats),o=ne(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return E.warn(n),""}}};function tt(){return new Date().toISOString().substring(0,10)}function tr(e,t=Zn){let n=[],r=e.slice();for(let i of e){let o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),nt(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),nt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var me=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return B()?U().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await Qn(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return et(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return et(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}};function nt(e){return ne(JSON.stringify({version:2,heartbeats:e})).length}function nr(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}function rr(e){A(new h("platform-logger",t=>new de(t),"PRIVATE")),A(new h("heartbeat",t=>new _e(t),"PRIVATE")),y(fe,Qe,e),y(fe,Qe,"esm2017"),y("fire-js","")}rr("");var ir="firebase",or="11.4.0";y(ir,or,"app");var at="@firebase/installations",ye="0.6.13";var ct=1e4,ut=`w:${ye}`,lt="FIS_v2",sr="https://firebaseinstallations.googleapis.com/v1",ar=60*60*1e3,cr="installations",ur="Installations";var lr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},D=new b(cr,ur,lr);function dt(e){return e instanceof m&&e.code.includes("request-failed")}function ft({projectId:e}){return`${sr}/projects/${e}/installations`}function pt(e){return{token:e.token,requestStatus:2,expiresIn:fr(e.expiresIn),creationTime:Date.now()}}async function ht(e,t){let r=(await t.json()).error;return D.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function gt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function dr(e,{refreshToken:t}){let n=gt(e);return n.append("Authorization",pr(t)),n}async function _t(e){let t=await e();return t.status>=500&&t.status<600?e():t}function fr(e){return Number(e.replace("s","000"))}function pr(e){return`${lt} ${e}`}async function hr({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=ft(e),i=gt(e),o=t.getImmediate({optional:!0});if(o){let c=await o.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}let s={fid:n,authVersion:lt,appId:e.appId,sdkVersion:ut},a={method:"POST",headers:i,body:JSON.stringify(s)},u=await _t(()=>fetch(r,a));if(u.ok){let c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:pt(c.authToken)}}else throw await ht("Create Installation",u)}function mt(e){return new Promise(t=>{setTimeout(t,e)})}function gr(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var _r=/^[cdef][\w-]{21}$/,Ie="";function mr(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let n=br(e);return _r.test(n)?n:Ie}catch(e){return Ie}}function br(e){return gr(e).substr(0,22)}function q(e){return`${e.appName}!${e.appId}`}var bt=new Map;function Et(e,t){let n=q(e);wt(n,t),Er(n,t)}function wt(e,t){let n=bt.get(e);if(n)for(let r of n)r(t)}function Er(e,t){let n=wr();n&&n.postMessage({key:e,fid:t}),Sr()}var O=null;function wr(){return!O&&"BroadcastChannel"in self&&(O=new BroadcastChannel("[Firebase] FID Change"),O.onmessage=e=>{wt(e.data.key,e.data.fid)}),O}function Sr(){bt.size===0&&O&&(O.close(),O=null)}var Ir="firebase-installations-database",yr=1,C="firebase-installations-store",we=null;function Ae(){return we||(we=T(Ir,yr,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(C)}}})),we}async function z(e,t){let n=q(e),i=(await Ae()).transaction(C,"readwrite"),o=i.objectStore(C),s=await o.get(n);return await o.put(t,n),await i.done,(!s||s.fid!==t.fid)&&Et(e,t.fid),t}async function St(e){let t=q(e),r=(await Ae()).transaction(C,"readwrite");await r.objectStore(C).delete(t),await r.done}async function K(e,t){let n=q(e),i=(await Ae()).transaction(C,"readwrite"),o=i.objectStore(C),s=await o.get(n),a=t(s);return a===void 0?await o.delete(n):await o.put(a,n),await i.done,a&&(!s||s.fid!==a.fid)&&Et(e,a.fid),a}async function ve(e){let t,n=await K(e.appConfig,r=>{let i=Ar(r),o=vr(e,i);return t=o.registrationPromise,o.installationEntry});return n.fid===Ie?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Ar(e){let t=e||{fid:mr(),registrationStatus:0};return It(t)}function vr(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(D.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Tr(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Or(e)}:{installationEntry:t}}async function Tr(e,t){try{let n=await hr(e,t);return z(e.appConfig,n)}catch(n){throw dt(n)&&n.customData.serverCode===409?await St(e.appConfig):await z(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Or(e){let t=await ot(e.appConfig);for(;t.registrationStatus===1;)await mt(100),t=await ot(e.appConfig);if(t.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await ve(e);return r||n}return t}function ot(e){return K(e,t=>{if(!t)throw D.create("installation-not-found");return It(t)})}function It(e){return Dr(e)?{fid:e.fid,registrationStatus:0}:e}function Dr(e){return e.registrationStatus===1&&e.registrationTime+ct<Date.now()}async function Cr({appConfig:e,heartbeatServiceProvider:t},n){let r=Nr(e,n),i=dr(e,n),o=t.getImmediate({optional:!0});if(o){let c=await o.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}let s={installation:{sdkVersion:ut,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(s)},u=await _t(()=>fetch(r,a));if(u.ok){let c=await u.json();return pt(c)}else throw await ht("Generate Auth Token",u)}function Nr(e,{fid:t}){return`${ft(e)}/${t}/authTokens:generate`}async function Te(e,t=!1){let n,r=await K(e.appConfig,o=>{if(!yt(o))throw D.create("not-registered");let s=o.authToken;if(!t&&Lr(s))return o;if(s.requestStatus===1)return n=Rr(e,t),o;{if(!navigator.onLine)throw D.create("app-offline");let a=kr(o);return n=Pr(e,a),a}});return n?await n:r.authToken}async function Rr(e,t){let n=await st(e.appConfig);for(;n.authToken.requestStatus===1;)await mt(100),n=await st(e.appConfig);let r=n.authToken;return r.requestStatus===0?Te(e,t):r}function st(e){return K(e,t=>{if(!yt(t))throw D.create("not-registered");let n=t.authToken;return xr(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function Pr(e,t){try{let n=await Cr(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await z(e.appConfig,r),n}catch(n){if(dt(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await St(e.appConfig);else{let r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await z(e.appConfig,r)}throw n}}function yt(e){return e!==void 0&&e.registrationStatus===2}function Lr(e){return e.requestStatus===2&&!Mr(e)}function Mr(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+ar}function kr(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function xr(e){return e.requestStatus===1&&e.requestTime+ct<Date.now()}async function Br(e){let t=e,{installationEntry:n,registrationPromise:r}=await ve(t);return r?r.catch(console.error):Te(t).catch(console.error),n.fid}async function Ur(e,t=!1){let n=e;return await Fr(n),(await Te(n,t)).token}async function Fr(e){let{registrationPromise:t}=await ve(e);t&&await t}function $r(e){if(!e||!e.options)throw Se("App Configuration");if(!e.name)throw Se("App Name");let t=["projectId","apiKey","appId"];for(let n of t)if(!e.options[n])throw Se(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Se(e){return D.create("missing-app-config-values",{valueName:e})}var At="installations",jr="installations-internal",Hr=e=>{let t=e.getProvider("app").getImmediate(),n=$r(t),r=L(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Vr=e=>{let t=e.getProvider("app").getImmediate(),n=L(t,At).getImmediate();return{getId:()=>Br(n),getToken:i=>Ur(n,i)}};function Wr(){A(new h(At,Hr,"PUBLIC")),A(new h(jr,Vr,"PRIVATE"))}Wr();y(at,ye);y(at,ye,"esm2017");var Dt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Gr="https://fcmregistrations.googleapis.com/v1",Ct="FCM_MSG",zr="google.c.a.c_id",qr=3,Kr=1,J;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(J||(J={}));var Y;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(Y||(Y={}));function w(e){let t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Jr(e){let t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}var Oe="fcm_token_details_db",Yr=5,vt="fcm_token_object_Store";async function Xr(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(Oe))return null;let t=null;return(await T(Oe,Yr,{upgrade:async(r,i,o,s)=>{var a;if(i<2||!r.objectStoreNames.contains(vt))return;let u=s.objectStore(vt),c=await u.index("fcmSenderId").get(e);if(await u.clear(),!!c){if(i===2){let l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;t={token:l.fcmToken,createTime:(a=l.createTime)!==null&&a!==void 0?a:Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:w(l.vapidKey)}}}else if(i===3){let l=c;t={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:w(l.auth),p256dh:w(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:w(l.vapidKey)}}}else if(i===4){let l=c;t={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:w(l.auth),p256dh:w(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:w(l.vapidKey)}}}}}})).close(),await W(Oe),await W("fcm_vapid_details_db"),await W("undefined"),Qr(t)?t:null}function Qr(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}var Zr="firebase-messaging-database",ei=1,N="firebase-messaging-store",De=null;function Re(){return De||(De=T(Zr,ei,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(N)}}})),De}async function Pe(e){let t=Me(e),r=await(await Re()).transaction(N).objectStore(N).get(t);if(r)return r;{let i=await Xr(e.appConfig.senderId);if(i)return await Le(e,i),i}}async function Le(e,t){let n=Me(e),i=(await Re()).transaction(N,"readwrite");return await i.objectStore(N).put(t,n),await i.done,t}async function ti(e){let t=Me(e),r=(await Re()).transaction(N,"readwrite");await r.objectStore(N).delete(t),await r.done}function Me({appConfig:e}){return e.appId}var ni={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},g=new b("messaging","Messaging",ni);async function ri(e,t){let n=await xe(e),r=Rt(t),i={method:"POST",headers:n,body:JSON.stringify(r)},o;try{o=await(await fetch(ke(e.appConfig),i)).json()}catch(s){throw g.create("token-subscribe-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.error){let s=o.error.message;throw g.create("token-subscribe-failed",{errorInfo:s})}if(!o.token)throw g.create("token-subscribe-no-token");return o.token}async function ii(e,t){let n=await xe(e),r=Rt(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},o;try{o=await(await fetch(`${ke(e.appConfig)}/${t.token}`,i)).json()}catch(s){throw g.create("token-update-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.error){let s=o.error.message;throw g.create("token-update-failed",{errorInfo:s})}if(!o.token)throw g.create("token-update-no-token");return o.token}async function Nt(e,t){let r={method:"DELETE",headers:await xe(e)};try{let o=await(await fetch(`${ke(e.appConfig)}/${t}`,r)).json();if(o.error){let s=o.error.message;throw g.create("token-unsubscribe-failed",{errorInfo:s})}}catch(i){throw g.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function ke({projectId:e}){return`${Gr}/projects/${e}/registrations`}async function xe({appConfig:e,installations:t}){let n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Rt({p256dh:e,auth:t,endpoint:n,vapidKey:r}){let i={web:{endpoint:n,auth:t,p256dh:e}};return r!==Dt&&(i.web.applicationPubKey=r),i}var oi=7*24*60*60*1e3;async function si(e){let t=await ci(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:w(t.getKey("auth")),p256dh:w(t.getKey("p256dh"))},r=await Pe(e.firebaseDependencies);if(r){if(ui(r.subscriptionOptions,n))return Date.now()>=r.createTime+oi?ai(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await Nt(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Ot(e.firebaseDependencies,n)}else return Ot(e.firebaseDependencies,n)}async function Tt(e){let t=await Pe(e.firebaseDependencies);t&&(await Nt(e.firebaseDependencies,t.token),await ti(e.firebaseDependencies));let n=await e.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function ai(e,t){try{let n=await ii(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await Le(e.firebaseDependencies,r),n}catch(n){throw n}}async function Ot(e,t){let r={token:await ri(e,t),createTime:Date.now(),subscriptionOptions:t};return await Le(e,r),r.token}async function ci(e,t){let n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Jr(t)})}function ui(e,t){let n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}function li(e){let t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return di(t,e),fi(t,e),pi(t,e),t}function di(e,t){if(!t.notification)return;e.notification={};let n=t.notification.title;n&&(e.notification.title=n);let r=t.notification.body;r&&(e.notification.body=r);let i=t.notification.image;i&&(e.notification.image=i);let o=t.notification.icon;o&&(e.notification.icon=o)}function fi(e,t){t.data&&(e.data=t.data)}function pi(e,t){var n,r,i,o,s;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};let a=(i=(r=t.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&i!==void 0?i:(o=t.notification)===null||o===void 0?void 0:o.click_action;a&&(e.fcmOptions.link=a);let u=(s=t.fcmOptions)===null||s===void 0?void 0:s.analytics_label;u&&(e.fcmOptions.analyticsLabel=u)}function hi(e){return typeof e=="object"&&!!e&&zr in e}function gi(e){return new Promise(t=>{setTimeout(t,e)})}wi("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");async function _i(e,t){let n=mi(t,await e.firebaseDependencies.installations.getId());bi(e,n,t.productId)}function mi(e,t){var n,r;let i={};return e.from&&(i.project_number=e.from),e.fcmMessageId&&(i.message_id=e.fcmMessageId),i.instance_id=t,e.notification?i.message_type=J.DISPLAY_NOTIFICATION.toString():i.message_type=J.DATA_MESSAGE.toString(),i.sdk_platform=qr.toString(),i.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(i.collapse_key=e.collapse_key),i.event=Kr.toString(),!((n=e.fcmOptions)===null||n===void 0)&&n.analytics_label&&(i.analytics_label=(r=e.fcmOptions)===null||r===void 0?void 0:r.analytics_label),i}function bi(e,t,n){let r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify({messaging_client_event:t}),n&&(r.compliance_data=Ei(n)),e.logEvents.push(r)}function Ei(e){return{privacy_context:{prequest:{origin_associated_product_id:e}}}}function wi(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}async function Si(e,t){var n,r;let{newSubscription:i}=e;if(!i){await Tt(t);return}let o=await Pe(t.firebaseDependencies);await Tt(t),t.vapidKey=(r=(n=o==null?void 0:o.subscriptionOptions)===null||n===void 0?void 0:n.vapidKey)!==null&&r!==void 0?r:Dt,await si(t)}async function Ii(e,t){let n=vi(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&await _i(t,n);let r=await Pt();if(Oi(r))return Di(r,n);if(n.notification&&await Ci(Ai(n)),!!t&&t.onBackgroundMessageHandler){let i=li(n);typeof t.onBackgroundMessageHandler=="function"?await t.onBackgroundMessageHandler(i):t.onBackgroundMessageHandler.next(i)}}async function yi(e){var t,n;let r=(n=(t=e.notification)===null||t===void 0?void 0:t.data)===null||n===void 0?void 0:n[Ct];if(r){if(e.action)return}else return;e.stopImmediatePropagation(),e.notification.close();let i=Ni(r);if(!i)return;let o=new URL(i,self.location.href),s=new URL(self.location.origin);if(o.host!==s.host)return;let a=await Ti(o);if(a?a=await a.focus():(a=await self.clients.openWindow(i),await gi(3e3)),!!a)return r.messageType=Y.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,a.postMessage(r)}function Ai(e){let t=Object.assign({},e.notification);return t.data={[Ct]:e},t}function vi({data:e}){if(!e)return null;try{return e.json()}catch(t){return null}}async function Ti(e){let t=await Pt();for(let n of t){let r=new URL(n.url,self.location.href);if(e.host===r.host)return n}return null}function Oi(e){return e.some(t=>t.visibilityState==="visible"&&!t.url.startsWith("chrome-extension://"))}function Di(e,t){t.isFirebaseMessaging=!0,t.messageType=Y.PUSH_RECEIVED;for(let n of e)n.postMessage(t)}function Pt(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function Ci(e){var t;let{actions:n}=e,{maxActions:r}=Notification;return n&&r&&n.length>r&&console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`),self.registration.showNotification((t=e.title)!==null&&t!==void 0?t:"",e)}function Ni(e){var t,n,r;let i=(n=(t=e.fcmOptions)===null||t===void 0?void 0:t.link)!==null&&n!==void 0?n:(r=e.notification)===null||r===void 0?void 0:r.click_action;return i||(hi(e.data)?self.location.origin:null)}function Ri(e){if(!e||!e.options)throw Ce("App Configuration Object");if(!e.name)throw Ce("App Name");let t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(let r of t)if(!n[r])throw Ce(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Ce(e){return g.create("missing-app-config-values",{valueName:e})}var Ne=class{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=Ri(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}};var Pi=e=>{let t=new Ne(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(Ii(n,t))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(Si(n,t))}),self.addEventListener("notificationclick",n=>{n.waitUntil(yi(n))}),t};function Li(){A(new h("messaging-sw",Pi,"PUBLIC"))}async function Mi(){return B()&&await U()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function ki(e,t){if(self.document!==void 0)throw g.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}function xi(e,t){e.deliveryMetricsExportedToBigQueryEnabled=t}function Lt(e=Ee()){return Mi().then(t=>{if(!t)throw g.create("unsupported-browser")},t=>{throw g.create("indexed-db-unsupported")}),L($(e),"messaging-sw").getImmediate()}function Mt(e,t){return e=$(e),ki(e,t)}function kt(e,t){return e=$(e),xi(e,t)}Li();var xt="incognito";var Do=30*1024*1024;var X="type.googleapis.com/anthropic.claude.push.";function M(e,t,n){var r;return(r=e[t])!=null?r:e[n]}function Q(e){return typeof e=="string"?e:void 0}function k(e){if(!e)return null;try{let t=JSON.parse(e),{method:n,request:r}=t,i=r==null?void 0:r["@type"];if(!n||!r||typeof i!="string"||!i.startsWith(X))return null;switch(n){case"OpenChat":{if(i!==`${X}OpenChatRequest`)return null;let o=Q(M(r,"conversation_uuid","conversationUuid"));return o?{method:"OpenChat",targetUrl:M(r,"is_temporary","isTemporary")===!0?`/chat/${o}?${xt}`:`/chat/${o}`,messageUuid:Q(M(r,"message_uuid","messageUuid"))}:null}case"OpenCodeSession":{if(i!==`${X}OpenCodeSessionRequest`)return null;let o=Q(M(r,"session_id","sessionId"));return o?{method:"OpenCodeSession",targetUrl:`/code/${o}`,sessionId:o}:null}case"OpenCoworkSession":{if(i!==`${X}OpenCoworkSessionRequest`)return null;let o=Q(M(r,"session_id","sessionId"));return o?{method:"OpenCoworkSession",targetUrl:`/cowork/${o}`,sessionId:o}:null}default:return null}}catch(t){return null}}function Be(e,t=k(e==null?void 0:e.payload)){return{session_id:t==null?void 0:t.sessionId,ccr_session_grouping_id:e==null?void 0:e.ccr_session_grouping_id,ccr_notif_trace_id:e==null?void 0:e.ccr_notif_trace_id}}var Bi="claude-notifications";var Z="seenMessages";function Ui(){return new Promise((e,t)=>{if(typeof indexedDB=="undefined"){t(new Error("indexedDB unavailable"));return}let n=indexedDB.open(Bi,1);n.onupgradeneeded=()=>{let r=n.result;r.objectStoreNames.contains(Z)||r.createObjectStore(Z,{keyPath:"id"})},n.onerror=()=>{var r;return t((r=n.error)!=null?r:new Error("indexedDB open failed"))},n.onsuccess=()=>e(n.result)})}function Fi(e){return new Promise((t,n)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>{var r;return n((r=e.error)!=null?r:new Error("indexedDB request failed"))}})}async function Bt(e){if(!e)return!1;let t;try{t=await Ui();let r=t.transaction(Z,"readonly").objectStore(Z);return await Fi(r.get(e))!==void 0}catch(n){return!1}finally{t==null||t.close()}}var $i={apiKey:"AIzaSyDu88493oN_Xq4PNVr_x8GUZPZhe-byS4U",authDomain:"proj-scandium-production-5zhm.firebaseapp.com",projectId:"proj-scandium-production-5zhm",storageBucket:"",messagingSenderId:"365066964946",appId:"1:365066964946:web:920eb01ec340c52cb8420b",measurementId:""},ji=be($i),Ut=Lt(ji);kt(Ut,!0);Mt(Ut,e=>{var o,s,a,u;let t=k((o=e.data)==null?void 0:o.payload),n=Be(e.data,t);if(self.clients.matchAll({type:"window",includeUncontrolled:!0}).then(c=>{var f;let l=self.location.origin;for(let p of c)try{if(new URL(p.url).origin===l){p.postMessage(R({type:"TRACK_NOTIFICATION_RECEIVED",category:(f=e.data)==null?void 0:f.notification_feature_category,location:"background"},n));break}}catch(S){}}),((s=e.data)==null?void 0:s.notification_feature_category)==="completion"){let c=(t==null?void 0:t.targetUrl)||"",l=t==null?void 0:t.messageUuid;(async()=>{var p,S;if(await $t(c,l)){let ee=((p=e.data)==null?void 0:p.title)||"Claude",jt={body:(S=e.data)==null?void 0:S.body,icon:"/favicon.svg",badge:"/favicon.svg",data:e.data};await self.registration.showNotification(ee,jt)}})();return}let r=((a=e.data)==null?void 0:a.title)||"Claude",i={body:(u=e.data)==null?void 0:u.body,icon:"/favicon.svg",badge:"/favicon.svg",data:e.data};self.registration.showNotification(r,i)});async function Ft(e){return new Promise(t=>{let n=`url-query-${Date.now()}-${Math.random()}`,r=500,i=s=>{var a,u;((a=s.data)==null?void 0:a.type)==="CURRENT_URL_RESPONSE"&&((u=s.data)==null?void 0:u.requestId)===n&&(self.removeEventListener("message",i),clearTimeout(o),t(s.data.url))},o=setTimeout(()=>{self.removeEventListener("message",i),t(e.url)},r);self.addEventListener("message",i),e.postMessage({type:"GET_CURRENT_URL",requestId:n})})}async function $t(e,t){if(t&&await Bt(t))return!1;if(!e)return!0;let n=await self.clients.matchAll({type:"window",includeUncontrolled:!0}),r=self.location.origin;for(let i of n)try{if(new URL(i.url).origin!==r)continue;let s=await Ft(i);if(s&&s.includes(e)&&(i.focused||i.visibilityState==="visible"))return!1}catch(o){}return!0}self.addEventListener("message",e=>{var t;if(((t=e.data)==null?void 0:t.type)==="SHOW_COMPLETION_NOTIFICATION"){let n=e.data.payload,r="",i="",o;try{let s=k(n.payload);if(s!=null&&s.targetUrl){i=s.targetUrl;let a=s.targetUrl.match(/\/chat\/([^/?#]+)/);r=(a==null?void 0:a[1])||""}o=s==null?void 0:s.messageUuid}catch(s){}e.waitUntil((async()=>{if(await $t(i,o)){let a=n.title||"Claude",u={body:n.body,icon:"/favicon.svg",badge:"/favicon.svg",data:n,tag:r?`completion-${r}`:void 0};await self.registration.showNotification(a,u)}})())}});self.addEventListener("notificationclick",e=>{e.notification.close();let t=e.notification.data,n=k(t==null?void 0:t.payload),r=(n==null?void 0:n.targetUrl)||"/",i=Be(t,n);e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:!0}).then(async o=>{let s=self.location.origin;for(let c of o)try{if(new URL(c.url).origin===s){c.postMessage(R({type:"TRACK_NOTIFICATION_CLICK",category:t==null?void 0:t.notification_feature_category,targetUrl:r,location:"background"},i));break}}catch(l){}let a=t==null?void 0:t.notification_feature_category;if(r!=="/"&&r!==""&&(a==="completion"||a==="tool_notification"))for(let c of o)try{if(new URL(c.url).origin!==s)continue;let f=await Ft(c);if(f&&f.includes(r))return c.focus().then(p=>p)}catch(l){}for(let c of o)try{if(new URL(c.url).origin===s)return c.focus().then(f=>{let p={type:"NOTIFICATION_CLICK_NAVIGATE",targetUrl:r};return f.postMessage(p),f})}catch(l){}return self.clients.openWindow(r).then(c=>(c&&setTimeout(()=>{c.postMessage(R({type:"TRACK_NOTIFICATION_CLICK",category:t==null?void 0:t.notification_feature_category,targetUrl:r,location:"background"},i))},500),c))}))});})();
/*! Bundled license information:

@firebase/util/dist/postinstall.mjs:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.sw.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
