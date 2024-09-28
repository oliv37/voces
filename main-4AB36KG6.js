var gv=Object.defineProperty,mv=Object.defineProperties;var vv=Object.getOwnPropertyDescriptors;var xo=Object.getOwnPropertySymbols;var Nl=Object.prototype.hasOwnProperty,Al=Object.prototype.propertyIsEnumerable;var _l=(e,t,n)=>t in e?gv(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||={})Nl.call(t,n)&&_l(e,n,t[n]);if(xo)for(var n of xo(t))Al.call(t,n)&&_l(e,n,t[n]);return e},B=(e,t)=>mv(e,vv(t));var Rl=(e,t)=>{var n={};for(var r in e)Nl.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&xo)for(var r of xo(e))t.indexOf(r)<0&&Al.call(e,r)&&(n[r]=e[r]);return n};function Ol(e,t){return Object.is(e,t)}var X=null,Cr=!1,To=1,ct=Symbol("SIGNAL");function F(e){let t=X;return X=e,t}function Pl(){return X}function yv(){return Cr}var yn={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function No(e){if(Cr)throw new Error("");if(X===null)return;X.consumerOnSignalRead(e);let t=X.nextProducerIndex++;if(Fo(X),t<X.producerNode.length&&X.producerNode[t]!==e&&Sr(X)){let n=X.producerNode[t];Po(n,X.producerIndexOfThis[t])}X.producerNode[t]!==e&&(X.producerNode[t]=e,X.producerIndexOfThis[t]=Sr(X)?Vl(e,X,t):0),X.producerLastReadVersion[t]=e.version}function Dv(){To++}function Fl(e){if(!(Sr(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===To)){if(!e.producerMustRecompute(e)&&!Ro(e)){e.dirty=!1,e.lastCleanEpoch=To;return}e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=To}}function kl(e){if(e.liveConsumerNode===void 0)return;let t=Cr;Cr=!0;try{for(let n of e.liveConsumerNode)n.dirty||jl(n)}finally{Cr=t}}function Ll(){return X?.consumerAllowSignalWrites!==!1}function jl(e){e.dirty=!0,kl(e),e.consumerMarkedDirty?.(e)}function Mr(e){return e&&(e.nextProducerIndex=0),F(e)}function Ao(e,t){if(F(t),!(!e||e.producerNode===void 0||e.producerIndexOfThis===void 0||e.producerLastReadVersion===void 0)){if(Sr(e))for(let n=e.nextProducerIndex;n<e.producerNode.length;n++)Po(e.producerNode[n],e.producerIndexOfThis[n]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}function Ro(e){Fo(e);for(let t=0;t<e.producerNode.length;t++){let n=e.producerNode[t],r=e.producerLastReadVersion[t];if(r!==n.version||(Fl(n),r!==n.version))return!0}return!1}function Oo(e){if(Fo(e),Sr(e))for(let t=0;t<e.producerNode.length;t++)Po(e.producerNode[t],e.producerIndexOfThis[t]);e.producerNode.length=e.producerLastReadVersion.length=e.producerIndexOfThis.length=0,e.liveConsumerNode&&(e.liveConsumerNode.length=e.liveConsumerIndexOfThis.length=0)}function Vl(e,t,n){if(Bl(e),e.liveConsumerNode.length===0&&$l(e))for(let r=0;r<e.producerNode.length;r++)e.producerIndexOfThis[r]=Vl(e.producerNode[r],e,r);return e.liveConsumerIndexOfThis.push(n),e.liveConsumerNode.push(t)-1}function Po(e,t){if(Bl(e),e.liveConsumerNode.length===1&&$l(e))for(let r=0;r<e.producerNode.length;r++)Po(e.producerNode[r],e.producerIndexOfThis[r]);let n=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[n],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[n],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let r=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];Fo(o),o.producerIndexOfThis[r]=t}}function Sr(e){return e.consumerIsAlwaysLive||(e?.liveConsumerNode?.length??0)>0}function Fo(e){e.producerNode??=[],e.producerIndexOfThis??=[],e.producerLastReadVersion??=[]}function Bl(e){e.liveConsumerNode??=[],e.liveConsumerIndexOfThis??=[]}function $l(e){return e.producerNode!==void 0}function Ul(e){let t=Object.create(bv);t.computation=e;let n=()=>{if(Fl(t),No(t),t.value===_o)throw t.error;return t.value};return n[ct]=t,n}var Ys=Symbol("UNSET"),Qs=Symbol("COMPUTING"),_o=Symbol("ERRORED"),bv=B(m({},yn),{value:Ys,dirty:!0,error:null,equal:Ol,producerMustRecompute(e){return e.value===Ys||e.value===Qs},producerRecomputeValue(e){if(e.value===Qs)throw new Error("Detected cycle in computations.");let t=e.value;e.value=Qs;let n=Mr(e),r;try{r=e.computation()}catch(o){r=_o,e.error=o}finally{Ao(e,n)}if(t!==Ys&&t!==_o&&r!==_o&&e.equal(t,r)){e.value=t;return}e.value=r,e.version++}});function wv(){throw new Error}var Hl=wv;function zl(){Hl()}function ql(e){Hl=e}var Ev=null;function Wl(e){let t=Object.create(Js);t.value=e;let n=()=>(No(t),t.value);return n[ct]=t,n}function ko(e,t){Ll()||zl(),e.equal(e.value,t)||(e.value=t,Iv(e))}function Gl(e,t){Ll()||zl(),ko(e,t(e.value))}var Js=B(m({},yn),{equal:Ol,value:void 0});function Iv(e){e.version++,Dv(),kl(e),Ev?.()}function Zl(e,t,n){let r=Object.create(Cv);n&&(r.consumerAllowSignalWrites=!0),r.fn=e,r.schedule=t;let o=c=>{r.cleanupFn=c};function i(c){return c.fn===null&&c.schedule===null}function s(c){i(c)||(Oo(c),c.cleanupFn(),c.fn=null,c.schedule=null,c.cleanupFn=Ks)}let a=()=>{if(r.fn===null)return;if(yv())throw new Error("Schedulers cannot synchronously execute watches while scheduling.");if(r.dirty=!1,r.hasRun&&!Ro(r))return;r.hasRun=!0;let c=Mr(r);try{r.cleanupFn(),r.cleanupFn=Ks,r.fn(o)}finally{Ao(r,c)}};return r.ref={notify:()=>jl(r),run:a,cleanup:()=>r.cleanupFn(),destroy:()=>s(r),[ct]:r},r.ref}var Ks=()=>{},Cv=B(m({},yn),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!1,consumerMarkedDirty:e=>{e.schedule!==null&&e.schedule(e.ref)},hasRun:!1,cleanupFn:Ks});function T(e){return typeof e=="function"}function Dn(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Lo=Dn(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function xr(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var K=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(T(r))try{r()}catch(i){t=i instanceof Lo?i.errors:[i]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{Yl(i)}catch(s){t=t??[],s instanceof Lo?t=[...t,...s.errors]:t.push(s)}}if(t)throw new Lo(t)}}add(t){var n;if(t&&t!==this)if(this.closed)Yl(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&xr(n,t)}remove(t){let{_finalizers:n}=this;n&&xr(n,t),t instanceof e&&t._removeParent(this)}};K.EMPTY=(()=>{let e=new K;return e.closed=!0,e})();var Xs=K.EMPTY;function jo(e){return e instanceof K||e&&"closed"in e&&T(e.remove)&&T(e.add)&&T(e.unsubscribe)}function Yl(e){T(e)?e():e.unsubscribe()}var Ye={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var bn={setTimeout(e,t,...n){let{delegate:r}=bn;return r?.setTimeout?r.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=bn;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Vo(e){bn.setTimeout(()=>{let{onUnhandledError:t}=Ye;if(t)t(e);else throw e})}function Tr(){}var Ql=ea("C",void 0,void 0);function Kl(e){return ea("E",void 0,e)}function Jl(e){return ea("N",e,void 0)}function ea(e,t,n){return{kind:e,value:t,error:n}}var Wt=null;function wn(e){if(Ye.useDeprecatedSynchronousErrorHandling){let t=!Wt;if(t&&(Wt={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:r}=Wt;if(Wt=null,n)throw r}}else e()}function Xl(e){Ye.useDeprecatedSynchronousErrorHandling&&Wt&&(Wt.errorThrown=!0,Wt.error=e)}var Gt=class extends K{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,jo(t)&&t.add(this)):this.destination=xv}static create(t,n,r){return new En(t,n,r)}next(t){this.isStopped?na(Jl(t),this):this._next(t)}error(t){this.isStopped?na(Kl(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?na(Ql,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Sv=Function.prototype.bind;function ta(e,t){return Sv.call(e,t)}var ra=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(r){Bo(r)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(r){Bo(r)}else Bo(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){Bo(n)}}},En=class extends Gt{constructor(t,n,r){super();let o;if(T(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else{let i;this&&Ye.useDeprecatedNextContext?(i=Object.create(t),i.unsubscribe=()=>this.unsubscribe(),o={next:t.next&&ta(t.next,i),error:t.error&&ta(t.error,i),complete:t.complete&&ta(t.complete,i)}):o=t}this.destination=new ra(o)}};function Bo(e){Ye.useDeprecatedSynchronousErrorHandling?Xl(e):Vo(e)}function Mv(e){throw e}function na(e,t){let{onStoppedNotification:n}=Ye;n&&bn.setTimeout(()=>n(e,t))}var xv={closed:!0,next:Tr,error:Mv,complete:Tr};var In=typeof Symbol=="function"&&Symbol.observable||"@@observable";function xe(e){return e}function oa(...e){return ia(e)}function ia(e){return e.length===0?xe:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var U=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=_v(n)?n:new En(n,r,o);return wn(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r)}}forEach(n,r){return r=ed(r),new r((o,i)=>{let s=new En({next:a=>{try{n(a)}catch(c){i(c),s.unsubscribe()}},error:i,complete:o});this.subscribe(s)})}_subscribe(n){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[In](){return this}pipe(...n){return ia(n)(this)}toPromise(n){return n=ed(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i))})}}return e.create=t=>new e(t),e})();function ed(e){var t;return(t=e??Ye.Promise)!==null&&t!==void 0?t:Promise}function Tv(e){return e&&T(e.next)&&T(e.error)&&T(e.complete)}function _v(e){return e&&e instanceof Gt||Tv(e)&&jo(e)}function sa(e){return T(e?.lift)}function j(e){return t=>{if(sa(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function V(e,t,n,r,o){return new aa(e,t,n,r,o)}var aa=class extends Gt{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(c){t.error(c)}}:super._next,this._error=o?function(a){try{o(a)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Cn(){return j((e,t)=>{let n=null;e._refCount++;let r=V(t,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){n=null;return}let o=e._connection,i=n;n=null,o&&(!i||o===i)&&o.unsubscribe(),t.unsubscribe()});e.subscribe(r),r.closed||(n=e.connect())})}var Sn=class extends U{constructor(t,n){super(),this.source=t,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,sa(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new K;let n=this.getSubject();t.add(this.source.subscribe(V(n,void 0,()=>{this._teardown(),n.complete()},r=>{this._teardown(),n.error(r)},()=>this._teardown()))),t.closed&&(this._connection=null,t=K.EMPTY)}return t}refCount(){return Cn()(this)}};var td=Dn(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var de=(()=>{class e extends U{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let r=new $o(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new td}next(n){wn(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n)}})}error(n){wn(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n)}})}complete(){wn(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?Xs:(this.currentObservers=null,i.push(n),new K(()=>{this.currentObservers=null,xr(i,n)}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete()}asObservable(){let n=new U;return n.source=this,n}}return e.create=(t,n)=>new $o(t,n),e})(),$o=class extends de{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t)}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:Xs}};var se=class extends de{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var Te=new U(e=>e.complete());function nd(e){return e&&T(e.schedule)}function rd(e){return e[e.length-1]}function od(e){return T(rd(e))?e.pop():void 0}function At(e){return nd(rd(e))?e.pop():void 0}function Uo(e,t,n,r,o,i){function s(M){if(M!==void 0&&typeof M!="function")throw new TypeError("Function expected");return M}for(var a=r.kind,c=a==="getter"?"get":a==="setter"?"set":"value",u=!t&&e?r.static?e:e.prototype:null,l=t||(u?Object.getOwnPropertyDescriptor(u,r.name):{}),d,h=!1,f=n.length-1;f>=0;f--){var g={};for(var v in r)g[v]=v==="access"?{}:r[v];for(var v in r.access)g.access[v]=r.access[v];g.addInitializer=function(M){if(h)throw new TypeError("Cannot add initializers after decoration has completed");i.push(s(M||null))};var S=(0,n[f])(a==="accessor"?{get:l.get,set:l.set}:l[c],g);if(a==="accessor"){if(S===void 0)continue;if(S===null||typeof S!="object")throw new TypeError("Object expected");(d=s(S.get))&&(l.get=d),(d=s(S.set))&&(l.set=d),(d=s(S.init))&&o.unshift(d)}else(d=s(S))&&(a==="field"?o.unshift(d):l[c]=d)}u&&Object.defineProperty(u,r.name,l),h=!0}function Ho(e,t,n){for(var r=arguments.length>2,o=0;o<t.length;o++)n=r?t[o].call(e,n):t[o].call(e);return r?n:void 0}function sd(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i)})}return new(n||(n=Promise))(function(i,s){function a(l){try{u(r.next(l))}catch(d){s(d)}}function c(l){try{u(r.throw(l))}catch(d){s(d)}}function u(l){l.done?i(l.value):o(l.value).then(a,c)}u((r=r.apply(e,t||[])).next())})}function id(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Zt(e){return this instanceof Zt?(this.v=e,this):new Zt(e)}function ad(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o={},a("next"),a("throw"),a("return",s),o[Symbol.asyncIterator]=function(){return this},o;function s(f){return function(g){return Promise.resolve(g).then(f,d)}}function a(f,g){r[f]&&(o[f]=function(v){return new Promise(function(S,M){i.push([f,v,S,M])>1||c(f,v)})},g&&(o[f]=g(o[f])))}function c(f,g){try{u(r[f](g))}catch(v){h(i[0][3],v)}}function u(f){f.value instanceof Zt?Promise.resolve(f.value.v).then(l,d):h(i[0][2],f)}function l(f){c("next",f)}function d(f){c("throw",f)}function h(f,g){f(g),i.shift(),i.length&&c(i[0][0],i[0][1])}}function cd(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof id=="function"?id(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value)})}}function o(i,s,a,c){Promise.resolve(c).then(function(u){i({value:u,done:a})},s)}}var zo=e=>e&&typeof e.length=="number"&&typeof e!="function";function qo(e){return T(e?.then)}function Wo(e){return T(e[In])}function Go(e){return Symbol.asyncIterator&&T(e?.[Symbol.asyncIterator])}function Zo(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Nv(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Yo=Nv();function Qo(e){return T(e?.[Yo])}function Ko(e){return ad(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield Zt(n.read());if(o)return yield Zt(void 0);yield yield Zt(r)}}finally{n.releaseLock()}})}function Jo(e){return T(e?.getReader)}function re(e){if(e instanceof U)return e;if(e!=null){if(Wo(e))return Av(e);if(zo(e))return Rv(e);if(qo(e))return Ov(e);if(Go(e))return ud(e);if(Qo(e))return Pv(e);if(Jo(e))return Fv(e)}throw Zo(e)}function Av(e){return new U(t=>{let n=e[In]();if(T(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Rv(e){return new U(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function Ov(e){return new U(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,Vo)})}function Pv(e){return new U(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function ud(e){return new U(t=>{kv(e,t).catch(n=>t.error(n))})}function Fv(e){return ud(Ko(e))}function kv(e,t){var n,r,o,i;return sd(this,void 0,void 0,function*(){try{for(n=cd(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s}}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n))}finally{if(o)throw o.error}}t.complete()})}function we(e,t,n,r=0,o=!1){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function Xo(e,t=0){return j((n,r)=>{n.subscribe(V(r,o=>we(r,e,()=>r.next(o),t),()=>we(r,e,()=>r.complete(),t),o=>we(r,e,()=>r.error(o),t)))})}function ei(e,t=0){return j((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t))})}function ld(e,t){return re(e).pipe(ei(t),Xo(t))}function dd(e,t){return re(e).pipe(ei(t),Xo(t))}function fd(e,t){return new U(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function hd(e,t){return new U(n=>{let r;return we(n,t,()=>{r=e[Yo](),we(n,t,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(s){n.error(s);return}i?n.complete():n.next(o)},0,!0)}),()=>T(r?.return)&&r.return()})}function ti(e,t){if(!e)throw new Error("Iterable cannot be null");return new U(n=>{we(n,t,()=>{let r=e[Symbol.asyncIterator]();we(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value)})},0,!0)})})}function pd(e,t){return ti(Ko(e),t)}function gd(e,t){if(e!=null){if(Wo(e))return ld(e,t);if(zo(e))return fd(e,t);if(qo(e))return dd(e,t);if(Go(e))return ti(e,t);if(Qo(e))return hd(e,t);if(Jo(e))return pd(e,t)}throw Zo(e)}function J(e,t){return t?gd(e,t):re(e)}function x(...e){let t=At(e);return J(e,t)}function Mn(e,t){let n=T(e)?e:()=>e,r=o=>o.error(n());return new U(t?o=>t.schedule(r,0,o):r)}function ca(e){return!!e&&(e instanceof U||T(e.lift)&&T(e.subscribe))}var Et=Dn(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function O(e,t){return j((n,r)=>{let o=0;n.subscribe(V(r,i=>{r.next(e.call(t,i,o++))}))})}var{isArray:Lv}=Array;function jv(e,t){return Lv(t)?e(...t):e(t)}function md(e){return O(t=>jv(e,t))}var{isArray:Vv}=Array,{getPrototypeOf:Bv,prototype:$v,keys:Uv}=Object;function vd(e){if(e.length===1){let t=e[0];if(Vv(t))return{args:t,keys:null};if(Hv(t)){let n=Uv(t);return{args:n.map(r=>t[r]),keys:n}}}return{args:e,keys:null}}function Hv(e){return e&&typeof e=="object"&&Bv(e)===$v}function yd(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function _r(...e){let t=At(e),n=od(e),{args:r,keys:o}=vd(e);if(r.length===0)return J([],t);let i=new U(zv(r,t,o?s=>yd(o,s):xe));return n?i.pipe(md(n)):i}function zv(e,t,n=xe){return r=>{Dd(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)Dd(t,()=>{let u=J(e[c],t),l=!1;u.subscribe(V(r,d=>{i[c]=d,l||(l=!0,a--),a||r.next(n(i.slice()))},()=>{--s||r.complete()}))},r)},r)}}function Dd(e,t,n){e?we(n,e,t):t()}function bd(e,t,n,r,o,i,s,a){let c=[],u=0,l=0,d=!1,h=()=>{d&&!c.length&&!u&&t.complete()},f=v=>u<r?g(v):c.push(v),g=v=>{i&&t.next(v),u++;let S=!1;re(n(v,l++)).subscribe(V(t,M=>{o?.(M),i?f(M):t.next(M)},()=>{S=!0},void 0,()=>{if(S)try{for(u--;c.length&&u<r;){let M=c.shift();s?we(t,s,()=>g(M)):g(M)}h()}catch(M){t.error(M)}}))};return e.subscribe(V(t,f,()=>{d=!0,h()})),()=>{a?.()}}function ee(e,t,n=1/0){return T(t)?ee((r,o)=>O((i,s)=>t(r,i,o,s))(re(e(r,o))),n):(typeof t=="number"&&(n=t),j((r,o)=>bd(r,o,e,n)))}function ua(e=1/0){return ee(xe,e)}function wd(){return ua(1)}function xn(...e){return wd()(J(e,At(e)))}function ni(e){return new U(t=>{re(e()).subscribe(t)})}function me(e,t){return j((n,r)=>{let o=0;n.subscribe(V(r,i=>e.call(t,i,o++)&&r.next(i)))})}function Rt(e){return j((t,n)=>{let r=null,o=!1,i;r=t.subscribe(V(n,void 0,void 0,s=>{i=re(e(s,Rt(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0})),o&&(r.unsubscribe(),r=null,i.subscribe(n))})}function Ed(e,t,n,r,o){return(i,s)=>{let a=n,c=t,u=0;i.subscribe(V(s,l=>{let d=u++;c=a?e(c,l,d):(a=!0,l),r&&s.next(c)},o&&(()=>{a&&s.next(c),s.complete()})))}}function Yt(e,t){return T(t)?ee(e,t,1):ee(e,1)}function Ot(e){return j((t,n)=>{let r=!1;t.subscribe(V(n,o=>{r=!0,n.next(o)},()=>{r||n.next(e),n.complete()}))})}function It(e){return e<=0?()=>Te:j((t,n)=>{let r=0;t.subscribe(V(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete())}))})}function la(e){return O(()=>e)}function ri(e=qv){return j((t,n)=>{let r=!1;t.subscribe(V(n,o=>{r=!0,n.next(o)},()=>r?n.complete():n.error(e())))})}function qv(){return new Et}function Tn(e){return j((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function Qe(e,t){let n=arguments.length>=2;return r=>r.pipe(e?me((o,i)=>e(o,i,r)):xe,It(1),n?Ot(t):ri(()=>new Et))}function _n(e){return e<=0?()=>Te:j((t,n)=>{let r=[];t.subscribe(V(n,o=>{r.push(o),e<r.length&&r.shift()},()=>{for(let o of r)n.next(o);n.complete()},void 0,()=>{r=null}))})}function da(e,t){let n=arguments.length>=2;return r=>r.pipe(e?me((o,i)=>e(o,i,r)):xe,_n(1),n?Ot(t):ri(()=>new Et))}function fa(e,t){return j(Ed(e,t,arguments.length>=2,!0))}function ha(...e){let t=At(e);return j((n,r)=>{(t?xn(e,n,t):xn(e,n)).subscribe(r)})}function _e(e,t){return j((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(V(r,c=>{o?.unsubscribe();let u=0,l=i++;re(e(c,l)).subscribe(o=V(r,d=>r.next(t?t(c,d,l,u++):d),()=>{o=null,a()}))},()=>{s=!0,a()}))})}function pa(e){return j((t,n)=>{re(e).subscribe(V(n,()=>n.complete(),Tr)),!n.closed&&t.subscribe(n)})}function te(e,t,n){let r=T(e)||t||n?{next:e,error:t,complete:n}:e;return r?j((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(V(i,c=>{var u;(u=r.next)===null||u===void 0||u.call(r,c),i.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete()},c=>{var u;a=!1,(u=r.error)===null||u===void 0||u.call(r,c),i.error(c)},()=>{var c,u;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(u=r.finalize)===null||u===void 0||u.call(r)}))}):xe}var af="https://g.co/ng/security#xss",w=class extends Error{constructor(t,n){super(Hi(t,n)),this.code=t}};function Hi(e,t){return`${`NG0${Math.abs(e)}`}${t?": "+t:""}`}var cf=Symbol("InputSignalNode#UNSET"),Wv=B(m({},Js),{transformFn:void 0,applyValueToInputSignal(e,t){ko(e,t)}});function uf(e,t){let n=Object.create(Wv);n.value=e,n.transformFn=t?.transform;function r(){if(No(n),n.value===cf)throw new w(-950,!1);return n.value}return r[ct]=n,r}function Rc(e){return{toString:e}.toString()}var Na=globalThis;function q(e){for(let t in e)if(e[t]===q)return t;throw Error("Could not find renamed property on target object.")}function Ee(e){if(typeof e=="string")return e;if(Array.isArray(e))return"["+e.map(Ee).join(", ")+"]";if(e==null)return""+e;if(e.overriddenName)return`${e.overriddenName}`;if(e.name)return`${e.name}`;let t=e.toString();if(t==null)return""+t;let n=t.indexOf(`
`);return n===-1?t:t.substring(0,n)}function Aa(e,t){return e==null||e===""?t===null?"":t:t==null||t===""?e:e+" "+t}var Gv=q({__forward_ref__:q});function lf(e){return e.__forward_ref__=lf,e.toString=function(){return Ee(this())},e}function ve(e){return df(e)?e():e}function df(e){return typeof e=="function"&&e.hasOwnProperty(Gv)&&e.__forward_ref__===lf}function D(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function zi(e){return Id(e,hf)||Id(e,pf)}function ff(e){return zi(e)!==null}function Id(e,t){return e.hasOwnProperty(t)?e[t]:null}function Zv(e){let t=e&&(e[hf]||e[pf]);return t||null}function Cd(e){return e&&(e.hasOwnProperty(Sd)||e.hasOwnProperty(Yv))?e[Sd]:null}var hf=q({\u0275prov:q}),Sd=q({\u0275inj:q}),pf=q({ngInjectableDef:q}),Yv=q({ngInjectorDef:q}),C=class{constructor(t,n){this._desc=t,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=D({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function gf(e){return e&&!!e.\u0275providers}var Qv=q({\u0275cmp:q}),Kv=q({\u0275dir:q}),Jv=q({\u0275pipe:q}),Xv=q({\u0275mod:q}),mi=q({\u0275fac:q}),Rr=q({__NG_ELEMENT_ID__:q}),Md=q({__NG_ENV_ID__:q});function kn(e){return typeof e=="string"?e:e==null?"":String(e)}function ey(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():kn(e)}function ty(e,t){let n=t?`. Dependency path: ${t.join(" > ")} > ${e}`:"";throw new w(-200,e)}function Oc(e,t){throw new w(-201,!1)}var P=function(e){return e[e.Default=0]="Default",e[e.Host=1]="Host",e[e.Self=2]="Self",e[e.SkipSelf=4]="SkipSelf",e[e.Optional=8]="Optional",e}(P||{}),Ra;function mf(){return Ra}function Ve(e){let t=Ra;return Ra=e,t}function vf(e,t,n){let r=zi(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&P.Optional)return null;if(t!==void 0)return t;Oc(e,"Injector")}var ny={},Or=ny,ry="__NG_DI_FLAG__",vi="ngTempTokenPath",oy="ngTokenPath",iy=/\n/gm,sy="\u0275",xd="__source",Pn;function ay(){return Pn}function Pt(e){let t=Pn;return Pn=e,t}function cy(e,t=P.Default){if(Pn===void 0)throw new w(-203,!1);return Pn===null?vf(e,void 0,t):Pn.get(e,t&P.Optional?null:void 0,t)}function k(e,t=P.Default){return(mf()||cy)(ve(e),t)}function p(e,t=P.Default){return k(e,qi(t))}function qi(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function Oa(e){let t=[];for(let n=0;n<e.length;n++){let r=ve(e[n]);if(Array.isArray(r)){if(r.length===0)throw new w(900,!1);let o,i=P.Default;for(let s=0;s<r.length;s++){let a=r[s],c=uy(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a}t.push(k(o,i))}else t.push(k(r))}return t}function uy(e){return e[ry]}function ly(e,t,n,r){let o=e[vi];throw t[xd]&&o.unshift(t[xd]),e.message=dy(`
`+e.message,o,n,r),e[oy]=o,e[vi]=null,e}function dy(e,t,n,r=null){e=e&&e.charAt(0)===`
`&&e.charAt(1)==sy?e.slice(2):e;let o=Ee(t);if(Array.isArray(t))o=t.map(Ee).join(" -> ");else if(typeof t=="object"){let i=[];for(let s in t)if(t.hasOwnProperty(s)){let a=t[s];i.push(s+":"+(typeof a=="string"?JSON.stringify(a):Ee(a)))}o=`{${i.join(", ")}}`}return`${n}${r?"("+r+")":""}[${o}]: ${e.replace(iy,`
  `)}`}function Ln(e,t){let n=e.hasOwnProperty(mi);return n?e[mi]:null}function fy(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return!1}return!0}function hy(e){return e.flat(Number.POSITIVE_INFINITY)}function Pc(e,t){e.forEach(n=>Array.isArray(n)?Pc(n,t):t(n))}function yf(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function yi(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function py(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function gy(e,t,n,r){let o=e.length;if(o==t)e.push(n,r);else if(o===1)e.push(r,e[0]),e[0]=n;else{for(o--,e.push(e[o-1],e[o]);o>t;){let i=o-2;e[o]=e[i],o--}e[t]=n,e[t+1]=r}}function Fc(e,t,n){let r=Ur(e,t);return r>=0?e[r|1]=n:(r=~r,gy(e,r,t,n)),r}function ga(e,t){let n=Ur(e,t);if(n>=0)return e[n|1]}function Ur(e,t){return my(e,t,1)}function my(e,t,n){let r=0,o=e.length>>n;for(;o!==r;){let i=r+(o-r>>1),s=e[i<<n];if(t===s)return i<<n;s>t?o=i:r=i+1}return~(o<<n)}var Pr={},dt=[],Xt=new C(""),Df=new C("",-1),bf=new C(""),Di=class{get(t,n=Or){if(n===Or){let r=new Error(`NullInjectorError: No provider for ${Ee(t)}!`);throw r.name="NullInjectorError",r}return n}},wf=function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e}(wf||{}),ft=function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e}(ft||{}),kt=function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e}(kt||{});function vy(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1}}function Pa(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i)}else{let i=o,s=n[++r];yy(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++}}return r}function Ef(e){return e===3||e===4||e===6}function yy(e){return e.charCodeAt(0)===64}function kc(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?Td(e,n,o,null,t[++r]):Td(e,n,o,null,null))}}return e}function Td(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){if(r===null){o!==null&&(e[i+1]=o);return}else if(r===e[i+1]){e[i+2]=o;return}}i++,r!==null&&i++,o!==null&&i++}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),r!==null&&e.splice(i++,0,r),o!==null&&e.splice(i++,0,o)}var If="ng-template";function Dy(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&vy(t[o+1].toLowerCase(),n,0)!==-1)return!0}else if(Lc(e))return!1;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return!0}return!1}function Lc(e){return e.type===4&&e.value!==If}function by(e,t,n){let r=e.type===4&&!n?If:e.value;return t===r}function wy(e,t,n){let r=4,o=e.attrs,i=o!==null?Cy(o):0,s=!1;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!Ke(r)&&!Ke(c))return!1;if(s&&Ke(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!by(e,c,n)||c===""&&t.length===1){if(Ke(r))return!1;s=!0}}else if(r&8){if(o===null||!Dy(e,o,c,n)){if(Ke(r))return!1;s=!0}}else{let u=t[++a],l=Ey(c,o,Lc(e),n);if(l===-1){if(Ke(r))return!1;s=!0;continue}if(u!==""){let d;if(l>i?d="":d=o[l+1].toLowerCase(),r&2&&u!==d){if(Ke(r))return!1;s=!0}}}}return Ke(r)||s}function Ke(e){return(e&1)===0}function Ey(e,t,n,r){if(t===null)return-1;let o=0;if(r||!n){let i=!1;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=!0;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else{if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2}return-1}else return Sy(t,e)}function Cf(e,t,n=!1){for(let r=0;r<t.length;r++)if(wy(e,t[r],n))return!0;return!1}function Iy(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if(!(n&1))return t[n+1]}return null}function Cy(e){for(let t=0;t<e.length;t++){let n=e[t];if(Ef(n))return t}return e.length}function Sy(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return-1;if(r===t)return n;n++}return-1}function My(e,t){e:for(let n=0;n<t.length;n++){let r=t[n];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return!0}}return!1}function _d(e,t){return e?":not("+t.trim()+")":t}function xy(e){let t=e[0],n=1,r=2,o="",i=!1;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!Ke(s)&&(t+=_d(i,o),o=""),r=s,i=i||!Ke(r);n++}return o!==""&&(t+=_d(i,o)),t}function Ty(e){return e.map(xy).join(",")}function _y(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else{if(!Ke(o))break;o=i}r++}return{attrs:t,classes:n}}function H(e){return Rc(()=>{let t=_f(e),n=B(m({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===wf.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||ft.Emulated,styles:e.styles||dt,_:null,schemas:e.schemas||null,tView:null,id:""});Nf(n);let r=e.dependencies;return n.directiveDefs=Ad(r,!1),n.pipeDefs=Ad(r,!0),n.id=Ry(n),n})}function Ny(e){return Lt(e)||Sf(e)}function Ay(e){return e!==null}function Nd(e,t){if(e==null)return Pr;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a=kt.None;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i):(i=o,s=o),t?(n[i]=a!==kt.None?[r,a]:r,t[i]=s):n[i]=r}return n}function Yn(e){return Rc(()=>{let t=_f(e);return Nf(t),t})}function Lt(e){return e[Qv]||null}function Sf(e){return e[Kv]||null}function Mf(e){return e[Jv]||null}function xf(e){let t=Lt(e)||Sf(e)||Mf(e);return t!==null?t.standalone:!1}function Tf(e,t){let n=e[Xv]||null;if(!n&&t===!0)throw new Error(`Type ${Ee(e)} does not have '\u0275mod' property.`);return n}function _f(e){let t={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputTransforms:null,inputConfig:e.inputs||Pr,exportAs:e.exportAs||null,standalone:e.standalone===!0,signals:e.signals===!0,selectors:e.selectors||dt,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:Nd(e.inputs,t),outputs:Nd(e.outputs),debugInfo:null}}function Nf(e){e.features?.forEach(t=>t(e))}function Ad(e,t){if(!e)return null;let n=t?Mf:Ny;return()=>(typeof e=="function"?e():e).map(r=>n(r)).filter(Ay)}function Ry(e){let t=0,n=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,e.consts,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery].join("|");for(let o of n)t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function Qn(e){return{\u0275providers:e}}function Oy(...e){return{\u0275providers:Af(!0,e),\u0275fromNgModule:!0}}function Af(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s)};return Pc(t,s=>{let a=s;Fa(a,i,[],r)&&(o||=[],o.push(a))}),o!==void 0&&Rf(o,i),n}function Rf(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];jc(o,i=>{t(i,r)})}}function Fa(e,t,n,r){if(e=ve(e),!e)return!1;let o=null,i=Cd(e),s=!i&&Lt(e);if(!i&&!s){let c=e.ngModule;if(i=Cd(c),i)o=c;else return!1}else{if(s&&!s.standalone)return!1;o=e}let a=r.has(o);if(s){if(a)return!1;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let u of c)Fa(u,t,n,r)}}else if(i){if(i.imports!=null&&!a){r.add(o);let u;try{Pc(i.imports,l=>{Fa(l,t,n,r)&&(u||=[],u.push(l))})}finally{}u!==void 0&&Rf(u,t)}if(!a){let u=Ln(o)||(()=>new o);t({provide:o,useFactory:u,deps:dt},o),t({provide:bf,useValue:o,multi:!0},o),t({provide:Xt,useValue:()=>k(o),multi:!0},o)}let c=i.providers;if(c!=null&&!a){let u=e;jc(c,l=>{t(l,u)})}}else return!1;return o!==e&&e.providers!==void 0}function jc(e,t){for(let n of e)gf(n)&&(n=n.\u0275providers),Array.isArray(n)?jc(n,t):t(n)}var Py=q({provide:String,useValue:q});function Of(e){return e!==null&&typeof e=="object"&&Py in e}function Fy(e){return!!(e&&e.useExisting)}function ky(e){return!!(e&&e.useFactory)}function jn(e){return typeof e=="function"}function Ly(e){return!!e.useClass}var Wi=new C(""),ui={},jy={},ma;function Vc(){return ma===void 0&&(ma=new Di),ma}var $e=class{},Fr=class extends $e{get destroyed(){return this._destroyed}constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,La(t,s=>this.processProvider(s)),this.records.set(Df,Nn(void 0,this)),o.has("environment")&&this.records.set($e,Nn(void 0,this));let i=this.records.get(Wi);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(bf,dt,P.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;let t=F(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),F(t)}}onDestroy(t){return this.assertNotDestroyed(),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){this.assertNotDestroyed();let n=Pt(this),r=Ve(void 0),o;try{return t()}finally{Pt(n),Ve(r)}}get(t,n=Or,r=P.Default){if(this.assertNotDestroyed(),t.hasOwnProperty(Md))return t[Md](this);r=qi(r);let o,i=Pt(this),s=Ve(void 0);try{if(!(r&P.SkipSelf)){let c=this.records.get(t);if(c===void 0){let u=Hy(t)&&zi(t);u&&this.injectableDefInScope(u)?c=Nn(ka(t),ui):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c)}let a=r&P.Self?Vc():this.parent;return n=r&P.Optional&&n===Or?null:n,a.get(t,n)}catch(a){if(a.name==="NullInjectorError"){if((a[vi]=a[vi]||[]).unshift(Ee(t)),i)throw a;return ly(a,t,"R3InjectorError",this.source)}else throw a}finally{Ve(s),Pt(i)}}resolveInjectorInitializers(){let t=F(null),n=Pt(this),r=Ve(void 0),o;try{let i=this.get(Xt,dt,P.Self);for(let s of i)s()}finally{Pt(n),Ve(r),F(t)}}toString(){let t=[],n=this.records;for(let r of n.keys())t.push(Ee(r));return`R3Injector[${t.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new w(205,!1)}processProvider(t){t=ve(t);let n=jn(t)?t:ve(t&&t.provide),r=By(t);if(!jn(t)&&t.multi===!0){let o=this.records.get(n);o||(o=Nn(void 0,ui,!0),o.factory=()=>Oa(o.multi),this.records.set(n,o)),n=t,o.multi.push(t)}this.records.set(n,r)}hydrate(t,n){let r=F(null);try{return n.value===ui&&(n.value=jy,n.value=n.factory()),typeof n.value=="object"&&n.value&&Uy(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{F(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=ve(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function ka(e){let t=zi(e),n=t!==null?t.factory:Ln(e);if(n!==null)return n;if(e instanceof C)throw new w(204,!1);if(e instanceof Function)return Vy(e);throw new w(204,!1)}function Vy(e){if(e.length>0)throw new w(204,!1);let n=Zv(e);return n!==null?()=>n.factory(e):()=>new e}function By(e){if(Of(e))return Nn(void 0,e.useValue);{let t=Pf(e);return Nn(t,ui)}}function Pf(e,t,n){let r;if(jn(e)){let o=ve(e);return Ln(o)||ka(o)}else if(Of(e))r=()=>ve(e.useValue);else if(ky(e))r=()=>e.useFactory(...Oa(e.deps||[]));else if(Fy(e))r=()=>k(ve(e.useExisting));else{let o=ve(e&&(e.useClass||e.provide));if($y(e))r=()=>new o(...Oa(e.deps));else return Ln(o)||ka(o)}return r}function Nn(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function $y(e){return!!e.deps}function Uy(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function Hy(e){return typeof e=="function"||typeof e=="object"&&e instanceof C}function La(e,t){for(let n of e)Array.isArray(n)?La(n,t):n&&gf(n)?La(n.\u0275providers,t):t(n)}function mt(e,t){e instanceof Fr&&e.assertNotDestroyed();let n,r=Pt(e),o=Ve(void 0);try{return t()}finally{Pt(r),Ve(o)}}function Ff(){return mf()!==void 0||ay()!=null}function Gi(e){if(!Ff())throw new w(-203,!1)}function zy(e){return typeof e=="function"}var Ne=0,I=1,E=2,ce=3,Xe=4,Ie=5,Ue=6,bi=7,he=8,Vn=9,ht=10,G=11,kr=12,Rd=13,Kn=14,ye=15,en=16,An=17,Ct=18,Zi=19,kf=20,Ft=21,li=22,Be=23,ne=25,Lf=1,Lr=6,St=7,wi=8,Bn=9,ae=10,Ei=function(e){return e[e.None=0]="None",e[e.HasTransplantedViews=2]="HasTransplantedViews",e}(Ei||{});function et(e){return Array.isArray(e)&&typeof e[Lf]=="object"}function vt(e){return Array.isArray(e)&&e[Lf]===!0}function jf(e){return(e.flags&4)!==0}function Hr(e){return e.componentOffset>-1}function Bc(e){return(e.flags&1)===1}function Jn(e){return!!e.template}function Ii(e){return(e[E]&512)!==0}var ja=class{constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r}isFirstChange(){return this.firstChange}};function Vf(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r}function zr(){return Bf}function Bf(e){return e.type.prototype.ngOnChanges&&(e.setInput=Wy),qy}zr.ngInherit=!0;function qy(){let e=Uf(this),t=e?.current;if(t){let n=e.previous;if(n===Pr)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t)}}function Wy(e,t,n,r,o){let i=this.declaredInputs[r],s=Uf(e)||Gy(e,{previous:Pr,current:null}),a=s.current||(s.current={}),c=s.previous,u=c[i];a[i]=new ja(u&&u.currentValue,n,c===Pr),Vf(e,t,o,n)}var $f="__ngSimpleChanges__";function Uf(e){return e[$f]||null}function Gy(e,t){return e[$f]=t}var Od=null;var ut=function(e,t,n){Od?.(e,t,n)},Zy="svg",Yy="math";function tt(e){for(;Array.isArray(e);)e=e[Ne];return e}function Hf(e,t){return tt(t[e])}function Ae(e,t){return tt(t[e.index])}function $c(e,t){return e.data[t]}function Vt(e,t){let n=t[e];return et(n)?n:n[Ne]}function Qy(e){return(e[E]&4)===4}function Uc(e){return(e[E]&128)===128}function Ky(e){return vt(e[ce])}function $n(e,t){return t==null?null:e[t]}function zf(e){e[An]=0}function qf(e){e[E]&1024||(e[E]|=1024,Uc(e)&&Qi(e))}function Jy(e,t){for(;e>0;)t=t[Kn],e--;return t}function Yi(e){return!!(e[E]&9216||e[Be]?.dirty)}function Va(e){e[ht].changeDetectionScheduler?.notify(8),e[E]&64&&(e[E]|=1024),Yi(e)&&Qi(e)}function Qi(e){e[ht].changeDetectionScheduler?.notify(0);let t=tn(e);for(;t!==null&&!(t[E]&8192||(t[E]|=8192,!Uc(t)));)t=tn(t)}function Wf(e,t){if((e[E]&256)===256)throw new w(911,!1);e[Ft]===null&&(e[Ft]=[]),e[Ft].push(t)}function Xy(e,t){if(e[Ft]===null)return;let n=e[Ft].indexOf(t);n!==-1&&e[Ft].splice(n,1)}function tn(e){let t=e[ce];return vt(t)?t[ce]:t}var A={lFrame:rh(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Gf=!1;function eD(){return A.lFrame.elementDepthCount}function tD(){A.lFrame.elementDepthCount++}function nD(){A.lFrame.elementDepthCount--}function Zf(){return A.bindingsEnabled}function Xn(){return A.skipHydrationRootTNode!==null}function rD(e){return A.skipHydrationRootTNode===e}function oD(e){A.skipHydrationRootTNode=e}function iD(){A.skipHydrationRootTNode=null}function L(){return A.lFrame.lView}function pe(){return A.lFrame.tView}function Hc(e){return A.lFrame.contextLView=e,e[he]}function zc(e){return A.lFrame.contextLView=null,e}function Ce(){let e=Yf();for(;e!==null&&e.type===64;)e=e.parent;return e}function Yf(){return A.lFrame.currentTNode}function sD(){let e=A.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function qr(e,t){let n=A.lFrame;n.currentTNode=e,n.isParent=t}function Qf(){return A.lFrame.isParent}function Kf(){A.lFrame.isParent=!1}function Jf(){return Gf}function Pd(e){Gf=e}function Xf(){let e=A.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function aD(){return A.lFrame.bindingIndex}function cD(e){return A.lFrame.bindingIndex=e}function Wr(){return A.lFrame.bindingIndex++}function qc(e){let t=A.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function uD(){return A.lFrame.inI18n}function lD(e,t){let n=A.lFrame;n.bindingIndex=n.bindingRootIndex=e,Ba(t)}function dD(){return A.lFrame.currentDirectiveIndex}function Ba(e){A.lFrame.currentDirectiveIndex=e}function fD(e){let t=A.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function eh(){return A.lFrame.currentQueryIndex}function Wc(e){A.lFrame.currentQueryIndex=e}function hD(e){let t=e[I];return t.type===2?t.declTNode:t.type===1?e[Ie]:null}function th(e,t,n){if(n&P.SkipSelf){let o=t,i=e;for(;o=o.parent,o===null&&!(n&P.Host);)if(o=hD(i),o===null||(i=i[Kn],o.type&10))break;if(o===null)return!1;t=o,e=i}let r=A.lFrame=nh();return r.currentTNode=t,r.lView=e,!0}function Gc(e){let t=nh(),n=e[I];A.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function nh(){let e=A.lFrame,t=e===null?null:e.child;return t===null?rh(e):t}function rh(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function oh(){let e=A.lFrame;return A.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var ih=oh;function Zc(){let e=oh();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function pD(e){return(A.lFrame.contextLView=Jy(e,A.lFrame.contextLView))[he]}function xt(){return A.lFrame.selectedIndex}function nn(e){A.lFrame.selectedIndex=e}function sh(){let e=A.lFrame;return $c(e.tView,e.selectedIndex)}function ah(){return A.lFrame.currentNamespace}var ch=!0;function Yc(){return ch}function Bt(e){ch=e}function gD(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=Bf(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s)}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i))}function Qc(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:u,ngOnDestroy:l}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),u&&((e.viewHooks??=[]).push(n,u),(e.viewCheckHooks??=[]).push(n,u)),l!=null&&(e.destroyHooks??=[]).push(n,l)}}function di(e,t,n){uh(e,t,3,n)}function fi(e,t,n,r){(e[E]&3)===n&&uh(e,t,n,r)}function va(e,t){let n=e[E];(n&3)===t&&(n&=16383,n+=1,e[E]=n)}function uh(e,t,n,r){let o=r!==void 0?e[An]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[An]+=65536),(a<i||i==-1)&&(mD(e,n,t,c),e[An]=(e[An]&4294901760)+c+2),c++}function Fd(e,t){ut(4,e,t);let n=F(null);try{t.call(e)}finally{F(n),ut(5,e,t)}}function mD(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[E]>>14<e[An]>>16&&(e[E]&3)===t&&(e[E]+=16384,Fd(a,i)):Fd(a,i)}var Fn=-1,rn=class{constructor(t,n,r){this.factory=t,this.resolving=!1,this.canSeeViewProviders=n,this.injectImpl=r}};function vD(e){return e instanceof rn}function yD(e){return(e.flags&8)!==0}function DD(e){return(e.flags&16)!==0}var ya={},$a=class{constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,r){r=qi(r);let o=this.injector.get(t,ya,r);return o!==ya||n===ya?o:this.parentInjector.get(t,n,r)}};function lh(e){return e!==Fn}function Ci(e){return e&32767}function bD(e){return e>>16}function Si(e,t){let n=bD(e),r=t;for(;n>0;)r=r[Kn],n--;return r}var Ua=!0;function kd(e){let t=Ua;return Ua=e,t}var wD=256,dh=wD-1,fh=5,ED=0,lt={};function ID(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty(Rr)&&(r=n[Rr]),r==null&&(r=n[Rr]=ED++);let o=r&dh,i=1<<o;t.data[e+(o>>fh)]|=i}function Mi(e,t){let n=hh(e,t);if(n!==-1)return n;let r=t[I];r.firstCreatePass&&(e.injectorIndex=t.length,Da(r.data,e),Da(t,null),Da(r.blueprint,null));let o=Kc(e,t),i=e.injectorIndex;if(lh(o)){let s=Ci(o),a=Si(o,t),c=a[I].data;for(let u=0;u<8;u++)t[i+u]=a[s+u]|c[s+u]}return t[i+8]=o,i}function Da(e,t){e.push(0,0,0,0,0,0,0,0,t)}function hh(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function Kc(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=yh(o),r===null)return Fn;if(n++,o=o[Kn],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return Fn}function Ha(e,t,n){ID(e,t,n)}function CD(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(Ef(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else{if(i===t)return n[o+1];o=o+2}}}return null}function ph(e,t,n){if(n&P.Optional||e!==void 0)return e;Oc(t,"NodeInjector")}function gh(e,t,n,r){if(n&P.Optional&&r===void 0&&(r=null),!(n&(P.Self|P.Host))){let o=e[Vn],i=Ve(void 0);try{return o?o.get(t,r,n&P.Optional):vf(t,r,n&P.Optional)}finally{Ve(i)}}return ph(r,t,n)}function mh(e,t,n,r=P.Default,o){if(e!==null){if(t[E]&2048&&!(r&P.Self)){let s=TD(e,t,n,r,lt);if(s!==lt)return s}let i=vh(e,t,n,r,lt);if(i!==lt)return i}return gh(t,n,r,o)}function vh(e,t,n,r,o){let i=MD(n);if(typeof i=="function"){if(!th(t,e,r))return r&P.Host?ph(o,n,r):gh(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&P.Optional))Oc(n);else return s}finally{ih()}}else if(typeof i=="number"){let s=null,a=hh(e,t),c=Fn,u=r&P.Host?t[ye][Ie]:null;for((a===-1||r&P.SkipSelf)&&(c=a===-1?Kc(e,t):t[a+8],c===Fn||!jd(r,!1)?a=-1:(s=t[I],a=Ci(c),t=Si(c,t)));a!==-1;){let l=t[I];if(Ld(i,a,l.data)){let d=SD(a,t,n,s,r,u);if(d!==lt)return d}c=t[a+8],c!==Fn&&jd(r,t[I].data[a+8]===u)&&Ld(i,a,t)?(s=l,a=Ci(c),t=Si(c,t)):a=-1}}return o}function SD(e,t,n,r,o,i){let s=t[I],a=s.data[e+8],c=r==null?Hr(a)&&Ua:r!=s&&(a.type&3)!==0,u=o&P.Host&&i===a,l=hi(a,s,n,c,u);return l!==null?on(t,s,l,a):lt}function hi(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,u=e.directiveEnd,l=i>>20,d=r?a:a+l,h=o?a+l:u;for(let f=d;f<h;f++){let g=s[f];if(f<c&&n===g||f>=c&&g.type===n)return f}if(o){let f=s[c];if(f&&Jn(f)&&f.type===n)return c}return null}function on(e,t,n,r){let o=e[n],i=t.data;if(vD(o)){let s=o;s.resolving&&ty(ey(i[n]));let a=kd(s.canSeeViewProviders);s.resolving=!0;let c,u=s.injectImpl?Ve(s.injectImpl):null,l=th(e,r,P.Default);try{o=e[n]=s.factory(void 0,i,e,r),t.firstCreatePass&&n>=r.directiveStart&&gD(n,i[n],t)}finally{u!==null&&Ve(u),kd(a),s.resolving=!1,ih()}}return o}function MD(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(Rr)?e[Rr]:void 0;return typeof t=="number"?t>=0?t&dh:xD:t}function Ld(e,t,n){let r=1<<e;return!!(n[t+(e>>fh)]&r)}function jd(e,t){return!(e&P.Self)&&!(e&P.Host&&t)}var Jt=class{constructor(t,n){this._tNode=t,this._lView=n}get(t,n,r){return mh(this._tNode,this._lView,t,qi(r),n)}};function xD(){return new Jt(Ce(),L())}function Jc(e){return Rc(()=>{let t=e.prototype.constructor,n=t[mi]||za(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[mi]||za(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function za(e){return df(e)?()=>{let t=za(ve(e));return t&&t()}:Ln(e)}function TD(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[E]&2048&&!(s[E]&512);){let a=vh(i,s,n,r|P.Self,lt);if(a!==lt)return a;let c=i.parent;if(!c){let u=s[kf];if(u){let l=u.get(n,lt,r);if(l!==lt)return l}c=yh(s),s=s[Kn]}i=c}return o}function yh(e){let t=e[I],n=t.type;return n===2?t.declTNode:n===1?e[Ie]:null}function Xc(e){return CD(Ce(),e)}function Vd(e,t=null,n=null,r){let o=Dh(e,t,n,r);return o.resolveInjectorInitializers(),o}function Dh(e,t=null,n=null,r,o=new Set){let i=[n||dt,Oy(e)];return r=r||(typeof e=="object"?void 0:Ee(e)),new Fr(i,t||Vc(),r||null,o)}var Qt=class Qt{static create(t,n){if(Array.isArray(t))return Vd({name:""},n,t,"");{let r=t.name??"";return Vd({name:r},t.parent,t.providers,r)}}};Qt.THROW_IF_NOT_FOUND=Or,Qt.NULL=new Di,Qt.\u0275prov=D({token:Qt,providedIn:"any",factory:()=>k(Df)}),Qt.__NG_ELEMENT_ID__=-1;var He=Qt;var _D=new C("");_D.__NG_ELEMENT_ID__=e=>{let t=Ce();if(t===null)throw new w(204,!1);if(t.type&2)return t.value;if(e&P.Optional)return null;throw new w(204,!1)};var ND="ngOriginalError";function ba(e){return e[ND]}var bh=!0,un=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=AD,t.__NG_ENV_ID__=r=>r;let e=t;return e})(),qa=class extends un{constructor(t){super(),this._lView=t}onDestroy(t){return Wf(this._lView,t),()=>Xy(this._lView,t)}};function AD(){return new qa(L())}var $t=(()=>{let t=class t{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new se(!1)}get _hasPendingTasks(){return this.hasPendingTasks.value}add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let r=this.taskId++;return this.pendingTasks.add(r),r}remove(r){this.pendingTasks.delete(r),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>new t});let e=t;return e})();var Wa=class extends de{constructor(t=!1){super(),this.destroyRef=void 0,this.pendingTasks=void 0,this.__isAsync=t,Ff()&&(this.destroyRef=p(un,{optional:!0})??void 0,this.pendingTasks=p($t,{optional:!0})??void 0)}emit(t){let n=F(null);try{super.next(t)}finally{F(n)}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof K&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{t(n),r!==void 0&&this.pendingTasks?.remove(r)})}}},fe=Wa;function xi(...e){}function wh(e){let t,n;function r(){e=xi;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Bd(e){return queueMicrotask(()=>e()),()=>{e=xi}}var eu="isAngularZone",Ti=eu+"_ID",RD=0,Y=class e{constructor(t){this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new fe(!1),this.onMicrotaskEmpty=new fe(!1),this.onStable=new fe(!1),this.onError=new fe(!1);let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:i=bh}=t;if(typeof Zone>"u")throw new w(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!o&&r,s.shouldCoalesceRunChangeDetection=o,s.callbackScheduled=!1,s.scheduleInRootZone=i,FD(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(eu)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new w(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new w(909,!1)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,OD,xi,xi);try{return i.runTask(s,n,r)}finally{i.cancelTask(s)}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},OD={};function tu(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function PD(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){wh(()=>{e.callbackScheduled=!1,Ga(e),e.isCheckStableRunning=!0,tu(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Ga(e)}function FD(e){let t=()=>{PD(e)},n=RD++;e._inner=e._inner.fork({name:"angular",properties:{[eu]:!0,[Ti]:n,[Ti+n]:!0},onInvokeTask:(r,o,i,s,a,c)=>{if(kD(c))return r.invokeTask(i,s,a,c);try{return $d(e),r.invokeTask(i,s,a,c)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),Ud(e)}},onInvoke:(r,o,i,s,a,c,u)=>{try{return $d(e),r.invoke(i,s,a,c,u)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!LD(c)&&t(),Ud(e)}},onHasTask:(r,o,i,s)=>{r.hasTask(i,s),o===i&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Ga(e),tu(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,o,i,s)=>(r.handleError(i,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function Ga(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function $d(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Ud(e){e._nesting--,tu(e)}var Za=class{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new fe,this.onMicrotaskEmpty=new fe,this.onStable=new fe,this.onError=new fe}run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function kD(e){return Eh(e,"__ignore_ng_zone__")}function LD(e){return Eh(e,"__scheduler_tick__")}function Eh(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var pt=class{constructor(){this._console=console}handleError(t){let n=this._findOriginalError(t);this._console.error("ERROR",t),n&&this._console.error("ORIGINAL ERROR",n)}_findOriginalError(t){let n=t&&ba(t);for(;n&&ba(n);)n=ba(n);return n||null}},jD=new C("",{providedIn:"root",factory:()=>{let e=p(Y),t=p(pt);return n=>e.runOutsideAngular(()=>t.handleError(n))}});function Hd(e,t){return uf(e,t)}function VD(e){return uf(cf,e)}var Re=(Hd.required=VD,Hd);function BD(){return er(Ce(),L())}function er(e,t){return new Se(Ae(e,t))}var Se=(()=>{let t=class t{constructor(r){this.nativeElement=r}};t.__NG_ELEMENT_ID__=BD;let e=t;return e})();function $D(e){return e instanceof Se?e.nativeElement:e}function UD(){return this._results[Symbol.iterator]()}var Ya=class e{get changes(){return this._changes??=new fe}constructor(t=!1){this._emitDistinctChangesOnly=t,this.dirty=!0,this._onDirty=void 0,this._results=[],this._changesDetected=!1,this._changes=void 0,this.length=0,this.first=void 0,this.last=void 0;let n=e.prototype;n[Symbol.iterator]||(n[Symbol.iterator]=UD)}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let r=hy(t);(this._changesDetected=!fy(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.emit(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}},HD="ngSkipHydration",zD="ngskiphydration";function Ih(e){let t=e.mergedAttrs;if(t===null)return!1;for(let n=0;n<t.length;n+=2){let r=t[n];if(typeof r=="number")return!1;if(typeof r=="string"&&r.toLowerCase()===zD)return!0}return!1}function Ch(e){return e.hasAttribute(HD)}function _i(e){return(e.flags&128)===128}function qD(e){if(_i(e))return!0;let t=e.parent;for(;t;){if(_i(e)||Ih(t))return!0;t=t.parent}return!1}var Sh=new Map,WD=0;function GD(){return WD++}function ZD(e){Sh.set(e[Zi],e)}function Qa(e){Sh.delete(e[Zi])}var zd="__ngContext__";function sn(e,t){et(t)?(e[zd]=t[Zi],ZD(t)):e[zd]=t}function Mh(e){return Th(e[kr])}function xh(e){return Th(e[Xe])}function Th(e){for(;e!==null&&!vt(e);)e=e[Xe];return e}var Ka;function _h(e){Ka=e}function Ki(){if(Ka!==void 0)return Ka;if(typeof document<"u")return document;throw new w(210,!1)}var Ji=new C("",{providedIn:"root",factory:()=>YD}),YD="ng",nu=new C(""),nt=new C("",{providedIn:"platform",factory:()=>"unknown"});var ru=new C("",{providedIn:"root",factory:()=>Ki().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});function QD(){let e=new tr;return p(nt)==="browser"&&(e.store=KD(Ki(),p(Ji))),e}var tr=(()=>{let t=class t{constructor(){this.store={},this.onSerializeCallbacks={}}get(r,o){return this.store[r]!==void 0?this.store[r]:o}set(r,o){this.store[r]=o}remove(r){delete this.store[r]}hasKey(r){return this.store.hasOwnProperty(r)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(r,o){this.onSerializeCallbacks[r]=o}toJson(){for(let r in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(r))try{this.store[r]=this.onSerializeCallbacks[r]()}catch(o){console.warn("Exception in onSerialize callback: ",o)}return JSON.stringify(this.store).replace(/</g,"\\u003C")}};t.\u0275prov=D({token:t,providedIn:"root",factory:QD});let e=t;return e})();function KD(e,t){let n=e.getElementById(t+"-state");if(n?.textContent)try{return JSON.parse(n.textContent)}catch(r){console.warn("Exception while restoring TransferState for app "+t,r)}return{}}var Nh="h",Ah="b",Ja=function(e){return e.FirstChild="f",e.NextSibling="n",e}(Ja||{}),JD="e",XD="t",ou="c",Rh="x",Ni="r",eb="i",tb="n",Oh="d";var nb="__nghData__",Ph=nb,wa="ngh",rb="nghm",Fh=()=>null;function ob(e,t,n=!1){let r=e.getAttribute(wa);if(r==null)return null;let[o,i]=r.split("|");if(r=n?i:o,!r)return null;let s=i?`|${i}`:"",a=n?o:s,c={};if(r!==""){let l=t.get(tr,null,{optional:!0});l!==null&&(c=l.get(Ph,[])[Number(r)])}let u={data:c,firstChild:e.firstChild??null};return n&&(u.firstChild=e,Xi(u,0,e.nextSibling)),a?e.setAttribute(wa,a):e.removeAttribute(wa),u}function ib(){Fh=ob}function iu(e,t,n=!1){return Fh(e,t,n)}function sb(e){let t=e._lView;return t[I].type===2?null:(Ii(t)&&(t=t[ne]),t)}function ab(e){return e.textContent?.replace(/\s/gm,"")}function cb(e){let t=Ki(),n=t.createNodeIterator(e,NodeFilter.SHOW_COMMENT,{acceptNode(i){let s=ab(i);return s==="ngetn"||s==="ngtns"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r,o=[];for(;r=n.nextNode();)o.push(r);for(let i of o)i.textContent==="ngetn"?i.replaceWith(t.createTextNode("")):i.remove()}function Xi(e,t,n){e.segmentHeads??={},e.segmentHeads[t]=n}function Xa(e,t){return e.segmentHeads?.[t]??null}function ub(e,t){let n=e.data,r=n[JD]?.[t]??null;return r===null&&n[ou]?.[t]&&(r=su(e,t)),r}function kh(e,t){return e.data[ou]?.[t]??null}function su(e,t){let n=kh(e,t)??[],r=0;for(let o of n)r+=o[Ni]*(o[Rh]??1);return r}function lb(e){if(typeof e.disconnectedNodes>"u"){let t=e.data[Oh];e.disconnectedNodes=t?new Set(t):null}return e.disconnectedNodes}function Gr(e,t){if(typeof e.disconnectedNodes>"u"){let n=e.data[Oh];e.disconnectedNodes=n?new Set(n):null}return!!lb(e)?.has(t)}var oi=new C(""),Lh=!1,jh=new C("",{providedIn:"root",factory:()=>Lh});var ii;function db(){if(ii===void 0&&(ii=null,Na.trustedTypes))try{ii=Na.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return ii}function qd(e){return db()?.createScriptURL(e)||e}var Ai=class{constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${af})`}};function nr(e){return e instanceof Ai?e.changingThisBreaksApplicationSecurity:e}function au(e,t){let n=fb(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${n} (see ${af})`)}return n===t}function fb(e){return e instanceof Ai&&e.getTypeName()||null}var hb=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Vh(e){return e=String(e),e.match(hb)?e:"unsafe:"+e}var es=function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e}(es||{});function pb(e){let t=$h();return t?t.sanitize(es.URL,e)||"":au(e,"URL")?nr(e):Vh(kn(e))}function gb(e){let t=$h();if(t)return qd(t.sanitize(es.RESOURCE_URL,e)||"");if(au(e,"ResourceURL"))return qd(nr(e));throw new w(904,!1)}function mb(e,t){return t==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||t==="href"&&(e==="base"||e==="link")?gb:pb}function Bh(e,t,n){return mb(t,n)(e)}function $h(){let e=L();return e&&e[ht].sanitizer}var vb=/^>|^->|<!--|-->|--!>|<!-$/g,yb=/(<|>)/g,Db="\u200B$1\u200B";function bb(e){return e.replace(vb,t=>t.replace(yb,Db))}function wb(e){return e.ownerDocument.body}function Uh(e){return e instanceof Function?e():e}function Nr(e){return(e??p(He)).get(nt)==="browser"}var Mt=function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e}(Mt||{}),Eb;function cu(e,t){return Eb(e,t)}function Rn(e,t,n,r,o){if(r!=null){let i,s=!1;vt(r)?i=r:et(r)&&(s=!0,r=r[Ne]);let a=tt(r);e===0&&n!==null?o==null?Zh(t,n,a):Ri(t,n,a,o||null,!0):e===1&&n!==null?Ri(t,n,a,o||null,!0):e===2?fu(t,a,s):e===3&&t.destroyNode(a),i!=null&&Fb(t,e,i,n,o)}}function Hh(e,t){return e.createText(t)}function Ib(e,t,n){e.setValue(t,n)}function zh(e,t){return e.createComment(bb(t))}function uu(e,t,n){return e.createElement(t,n)}function Cb(e,t){qh(e,t),t[Ne]=null,t[Ie]=null}function Sb(e,t,n,r,o,i){r[Ne]=o,r[Ie]=t,ns(e,r,n,1,o,i)}function qh(e,t){t[ht].changeDetectionScheduler?.notify(9),ns(e,t,t[G],2,null,null)}function Mb(e){let t=e[kr];if(!t)return Ea(e[I],e);for(;t;){let n=null;if(et(t))n=t[kr];else{let r=t[ae];r&&(n=r)}if(!n){for(;t&&!t[Xe]&&t!==e;)et(t)&&Ea(t[I],t),t=t[ce];t===null&&(t=e),et(t)&&Ea(t[I],t),n=t&&t[Xe]}t=n}}function xb(e,t,n,r){let o=ae+r,i=n.length;r>0&&(n[o-1][Xe]=t),r<i-ae?(t[Xe]=n[o],yf(n,ae+r,t)):(n.push(t),t[Xe]=null),t[ce]=n;let s=t[en];s!==null&&n!==s&&Wh(s,t);let a=t[Ct];a!==null&&a.insertView(e),Va(t),t[E]|=128}function Wh(e,t){let n=e[Bn],r=t[ce];if(et(r))e[E]|=Ei.HasTransplantedViews;else{let o=r[ce][ye];t[ye]!==o&&(e[E]|=Ei.HasTransplantedViews)}n===null?e[Bn]=[t]:n.push(t)}function lu(e,t){let n=e[Bn],r=n.indexOf(t);n.splice(r,1)}function jr(e,t){if(e.length<=ae)return;let n=ae+t,r=e[n];if(r){let o=r[en];o!==null&&o!==e&&lu(o,r),t>0&&(e[n-1][Xe]=r[Xe]);let i=yi(e,ae+t);Cb(r[I],r);let s=i[Ct];s!==null&&s.detachView(i[I]),r[ce]=null,r[Xe]=null,r[E]&=-129}return r}function ts(e,t){if(!(t[E]&256)){let n=t[G];n.destroyNode&&ns(e,t,n,3,null,null),Mb(t)}}function Ea(e,t){if(t[E]&256)return;let n=F(null);try{t[E]&=-129,t[E]|=256,t[Be]&&Oo(t[Be]),_b(e,t),Tb(e,t),t[I].type===1&&t[G].destroy();let r=t[en];if(r!==null&&vt(t[ce])){r!==t[ce]&&lu(r,t);let o=t[Ct];o!==null&&o.detachView(e)}Qa(t)}finally{F(n)}}function Tb(e,t){let n=e.cleanup,r=t[bi];if(n!==null)for(let i=0;i<n.length-1;i+=2)if(typeof n[i]=="string"){let s=n[i+3];s>=0?r[s]():r[-s].unsubscribe(),i+=2}else{let s=r[n[i+1]];n[i].call(s)}r!==null&&(t[bi]=null);let o=t[Ft];if(o!==null){t[Ft]=null;for(let i=0;i<o.length;i++){let s=o[i];s()}}}function _b(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof rn)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];ut(4,a,c);try{c.call(a)}finally{ut(5,a,c)}}else{ut(4,o,i);try{i.call(o)}finally{ut(5,o,i)}}}}}function Gh(e,t,n){return Nb(e,t.parent,n)}function Nb(e,t,n){let r=t;for(;r!==null&&r.type&168;)t=r,r=t.parent;if(r===null)return n[Ne];{let{componentOffset:o}=r;if(o>-1){let{encapsulation:i}=e.data[r.directiveStart+o];if(i===ft.None||i===ft.Emulated)return null}return Ae(r,n)}}function Ri(e,t,n,r,o){e.insertBefore(t,n,r,o)}function Zh(e,t,n){e.appendChild(t,n)}function Wd(e,t,n,r,o){r!==null?Ri(e,t,n,r,o):Zh(e,t,n)}function Yh(e,t){return e.parentNode(t)}function Ab(e,t){return e.nextSibling(t)}function Qh(e,t,n){return Ob(e,t,n)}function Rb(e,t,n){return e.type&40?Ae(e,n):null}var Ob=Rb,Gd;function du(e,t,n,r){let o=Gh(e,r,t),i=t[G],s=r.parent||t[Ie],a=Qh(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)Wd(i,o,n[c],a,!1);else Wd(i,o,n,a,!1);Gd!==void 0&&Gd(i,r,t,n,o)}function Ar(e,t){if(t!==null){let n=t.type;if(n&3)return Ae(t,e);if(n&4)return ec(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return Ar(e,r);{let o=e[t.index];return vt(o)?ec(-1,o):tt(o)}}else{if(n&128)return Ar(e,t.next);if(n&32)return cu(t,e)()||tt(e[t.index]);{let r=Kh(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=tn(e[ye]);return Ar(o,r)}else return Ar(e,t.next)}}}return null}function Kh(e,t){if(t!==null){let r=e[ye][Ie],o=t.projection;return r.projection[o]}return null}function ec(e,t){let n=ae+e+1;if(n<t.length){let r=t[n],o=r[I].firstChild;if(o!==null)return Ar(r,o)}return t[St]}function fu(e,t,n){e.removeChild(null,t,n)}function Jh(e){e.textContent=""}function hu(e,t,n,r,o,i,s){for(;n!=null;){if(n.type===128){n=n.next;continue}let a=r[n.index],c=n.type;if(s&&t===0&&(a&&sn(tt(a),r),n.flags|=2),(n.flags&32)!==32)if(c&8)hu(e,t,n.child,r,o,i,!1),Rn(t,e,o,a,i);else if(c&32){let u=cu(n,r),l;for(;l=u();)Rn(t,e,o,l,i);Rn(t,e,o,a,i)}else c&16?Xh(e,t,r,n,o,i):Rn(t,e,o,a,i);n=s?n.projectionNext:n.next}}function ns(e,t,n,r,o,i){hu(n,r,e.firstChild,t,o,i,!1)}function Pb(e,t,n){let r=t[G],o=Gh(e,n,t),i=n.parent||t[Ie],s=Qh(i,n,t);Xh(r,0,t,n,o,s)}function Xh(e,t,n,r,o,i){let s=n[ye],c=s[Ie].projection[r.projection];if(Array.isArray(c))for(let u=0;u<c.length;u++){let l=c[u];Rn(t,e,o,l,i)}else{let u=c,l=s[ce];_i(r)&&(u.flags|=128),hu(e,t,u,l,o,i,!0)}}function Fb(e,t,n,r,o){let i=n[St],s=tt(n);i!==s&&Rn(t,e,r,i,o);for(let a=ae;a<n.length;a++){let c=n[a];ns(c[I],c,e,t,r,i)}}function kb(e,t,n,r,o){if(t)o?e.addClass(n,r):e.removeClass(n,r);else{let i=r.indexOf("-")===-1?void 0:Mt.DashCase;o==null?e.removeStyle(n,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=Mt.Important),e.setStyle(n,r,o,i))}}function Lb(e,t,n){e.setAttribute(t,"style",n)}function ep(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function tp(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&Pa(e,t,r),o!==null&&ep(e,t,o),i!==null&&Lb(e,t,i)}var Oe={};function _(e=1){np(pe(),L(),xt()+e,!1)}function np(e,t,n,r){if(!r)if((t[E]&3)===3){let i=e.preOrderCheckHooks;i!==null&&di(t,i,n)}else{let i=e.preOrderHooks;i!==null&&fi(t,i,0,n)}nn(n)}function yt(e,t=P.Default){let n=L();if(n===null)return k(e,t);let r=Ce();return mh(r,n,ve(e),t)}function rp(){let e="invalid";throw new Error(e)}function op(e,t,n,r,o,i){let s=F(null);try{let a=null;o&kt.SignalBased&&(a=t[r][ct]),a!==null&&a.transformFn!==void 0&&(i=a.transformFn(i)),o&kt.HasDecoratorInputTransform&&(i=e.inputTransforms[r].call(t,i)),e.setInput!==null?e.setInput(t,a,i,n,r):Vf(t,a,r,i)}finally{F(s)}}function jb(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)nn(~o);else{let i=o,s=n[++r],a=n[++r];lD(s,i);let c=t[i];a(2,c)}}}finally{nn(-1)}}function rs(e,t,n,r,o,i,s,a,c,u,l){let d=t.blueprint.slice();return d[Ne]=o,d[E]=r|4|128|8|64,(u!==null||e&&e[E]&2048)&&(d[E]|=2048),zf(d),d[ce]=d[Kn]=e,d[he]=n,d[ht]=s||e&&e[ht],d[G]=a||e&&e[G],d[Vn]=c||e&&e[Vn]||null,d[Ie]=i,d[Zi]=GD(),d[Ue]=l,d[kf]=u,d[ye]=t.type==2?e[ye]:d,d}function Zr(e,t,n,r,o){let i=e.data[t];if(i===null)i=Vb(e,t,n,r,o),uD()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=sD();i.injectorIndex=s===null?-1:s.injectorIndex}return qr(i,!0),i}function Vb(e,t,n,r,o){let i=Yf(),s=Qf(),a=s?i:i&&i.parent,c=e.data[t]=Wb(e,a,n,t,r,o);return e.firstChild===null&&(e.firstChild=c),i!==null&&(s?i.child==null&&c.parent!==null&&(i.child=c):i.next===null&&(i.next=c,c.prev=i)),c}function ip(e,t,n,r){if(n===0)return-1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function sp(e,t,n,r,o){let i=xt(),s=r&2;try{nn(-1),s&&t.length>ne&&np(e,t,ne,!1),ut(s?2:0,o),n(r,o)}finally{nn(i),ut(s?3:1,o)}}function ap(e,t,n){if(jf(t)){let r=F(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s)}}}finally{F(r)}}}function cp(e,t,n){Zf()&&(Xb(e,t,n,Ae(n,t)),(n.flags&64)===64&&pp(e,t,n))}function up(e,t,n=Ae){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a}}}function lp(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=pu(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function pu(e,t,n,r,o,i,s,a,c,u,l){let d=ne+r,h=d+o,f=Bb(d,h),g=typeof u=="function"?u():u;return f[I]={type:e,blueprint:f,template:n,queries:null,viewQuery:a,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:l}}function Bb(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:Oe);return n}function $b(e,t,n,r){let i=r.get(jh,Lh)||n===ft.ShadowDom,s=e.selectRootElement(t,i);return Ub(s),s}function Ub(e){dp(e)}var dp=()=>null;function Hb(e){Ch(e)?Jh(e):cb(e)}function zb(){dp=Hb}function qb(e,t,n,r){let o=vp(t);o.push(n),e.firstCreatePass&&yp(e).push(r,o.length-1)}function Wb(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return Xn()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function Zd(e,t,n,r,o){for(let i in t){if(!t.hasOwnProperty(i))continue;let s=t[i];if(s===void 0)continue;r??={};let a,c=kt.None;Array.isArray(s)?(a=s[0],c=s[1]):a=s;let u=i;if(o!==null){if(!o.hasOwnProperty(i))continue;u=o[i]}e===0?Yd(r,n,u,a,c):Yd(r,n,u,a)}return r}function Yd(e,t,n,r,o){let i;e.hasOwnProperty(n)?(i=e[n]).push(t,r):i=e[n]=[t,r],o!==void 0&&i.push(o)}function Gb(e,t,n){let r=t.directiveStart,o=t.directiveEnd,i=e.data,s=t.attrs,a=[],c=null,u=null;for(let l=r;l<o;l++){let d=i[l],h=n?n.get(d):null,f=h?h.inputs:null,g=h?h.outputs:null;c=Zd(0,d.inputs,l,c,f),u=Zd(1,d.outputs,l,u,g);let v=c!==null&&s!==null&&!Lc(t)?lw(c,l,s):null;a.push(v)}c!==null&&(c.hasOwnProperty("class")&&(t.flags|=8),c.hasOwnProperty("style")&&(t.flags|=16)),t.initialInputs=a,t.inputs=c,t.outputs=u}function Zb(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function Yb(e,t,n,r,o,i,s,a){let c=Ae(t,n),u=t.inputs,l;!a&&u!=null&&(l=u[r])?(gu(e,n,l,r,o),Hr(t)&&Qb(n,t.index)):t.type&3?(r=Zb(r),o=s!=null?s(o,t.value||"",r):o,i.setProperty(c,r,o)):t.type&12}function Qb(e,t){let n=Vt(t,e);n[E]&16||(n[E]|=64)}function fp(e,t,n,r){if(Zf()){let o=r===null?null:{"":-1},i=tw(e,n),s,a;i===null?s=a=null:[s,a]=i,s!==null&&hp(e,t,n,s,o,a),o&&nw(n,r,o)}n.mergedAttrs=kc(n.mergedAttrs,n.attrs)}function hp(e,t,n,r,o,i){for(let u=0;u<r.length;u++)Ha(Mi(n,t),e,r[u].type);ow(n,e.data.length,r.length);for(let u=0;u<r.length;u++){let l=r[u];l.providersResolver&&l.providersResolver(l)}let s=!1,a=!1,c=ip(e,t,r.length,null);for(let u=0;u<r.length;u++){let l=r[u];n.mergedAttrs=kc(n.mergedAttrs,l.hostAttrs),iw(e,n,t,c,l),rw(c,l,o),l.contentQueries!==null&&(n.flags|=4),(l.hostBindings!==null||l.hostAttrs!==null||l.hostVars!==0)&&(n.flags|=64);let d=l.type.prototype;!s&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),s=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),a=!0),c++}Gb(e,n,i)}function Kb(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;Jb(s)!=a&&s.push(a),s.push(n,r,i)}}function Jb(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function Xb(e,t,n,r){let o=n.directiveStart,i=n.directiveEnd;Hr(n)&&sw(t,n,e.data[o+n.componentOffset]),e.firstCreatePass||Mi(n,t),sn(r,t);let s=n.initialInputs;for(let a=o;a<i;a++){let c=e.data[a],u=on(t,e,a,n);if(sn(u,t),s!==null&&uw(t,a-o,u,c,n,s),Jn(c)){let l=Vt(n.index,t);l[he]=on(t,e,a,n)}}}function pp(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=dD();try{nn(i);for(let a=r;a<o;a++){let c=e.data[a],u=t[a];Ba(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&ew(c,u)}}finally{nn(-1),Ba(s)}}function ew(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function tw(e,t){let n=e.directiveRegistry,r=null,o=null;if(n)for(let i=0;i<n.length;i++){let s=n[i];if(Cf(t,s.selectors,!1))if(r||(r=[]),Jn(s))if(s.findHostDirectiveDefs!==null){let a=[];o=o||new Map,s.findHostDirectiveDefs(s,a,o),r.unshift(...a,s);let c=a.length;tc(e,t,c)}else r.unshift(s),tc(e,t,0);else o=o||new Map,s.findHostDirectiveDefs?.(s,r,o),r.push(s)}return r===null?null:[r,o]}function tc(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function nw(e,t,n){if(t){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new w(-301,!1);r.push(t[o],i)}}}function rw(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;Jn(t)&&(n[""]=e)}}function ow(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function iw(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=Ln(o.type,!0)),s=new rn(i,Jn(o),yt);e.blueprint[r]=s,n[r]=s,Kb(e,t,r,ip(e,n,o.hostVars,Oe),o)}function sw(e,t,n){let r=Ae(t,e),o=lp(n),i=e[ht].rendererFactory,s=16;n.signals?s=4096:n.onPush&&(s=64);let a=os(e,rs(e,o,null,s,r,t,null,i.createRenderer(r,n),null,null,null));e[t.index]=a}function aw(e,t,n,r,o,i){let s=Ae(e,t);cw(t[G],s,i,e.value,n,r,o)}function cw(e,t,n,r,o,i,s){if(i==null)e.removeAttribute(t,o,n);else{let a=s==null?kn(i):s(i,r||"",o);e.setAttribute(t,o,a,n)}}function uw(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;){let c=s[a++],u=s[a++],l=s[a++],d=s[a++];op(r,n,c,u,l,d)}}function lw(e,t,n){let r=null,o=0;for(;o<n.length;){let i=n[o];if(i===0){o+=4;continue}else if(i===5){o+=2;continue}if(typeof i=="number")break;if(e.hasOwnProperty(i)){r===null&&(r=[]);let s=e[i];for(let a=0;a<s.length;a+=3)if(s[a]===t){r.push(i,s[a+1],s[a+2],n[o+1]);break}}o+=2}return r}function gp(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function mp(e,t){let n=e.contentQueries;if(n!==null){let r=F(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];Wc(i),a.contentQueries(2,t[s],s)}}}finally{F(r)}}}function os(e,t){return e[kr]?e[Rd][Xe]=t:e[kr]=t,e[Rd]=t,t}function nc(e,t,n){Wc(0);let r=F(null);try{t(e,n)}finally{F(r)}}function vp(e){return e[bi]??=[]}function yp(e){return e.cleanup??=[]}function Dp(e,t){let n=e[Vn],r=n?n.get(pt,null):null;r&&r.handleError(t)}function gu(e,t,n,r,o){for(let i=0;i<n.length;){let s=n[i++],a=n[i++],c=n[i++],u=t[s],l=e.data[s];op(l,u,r,a,c,o)}}function bp(e,t,n){let r=Hf(t,e);Ib(e[G],r,n)}function dw(e,t){let n=Vt(t,e),r=n[I];fw(r,n);let o=n[Ne];o!==null&&n[Ue]===null&&(n[Ue]=iu(o,n[Vn])),mu(r,n,n[he])}function fw(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function mu(e,t,n){Gc(t);try{let r=e.viewQuery;r!==null&&nc(1,r,n);let o=e.template;o!==null&&sp(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Ct]?.finishViewCreation(e),e.staticContentQueries&&mp(e,t),e.staticViewQueries&&nc(2,e.viewQuery,n);let i=e.components;i!==null&&hw(t,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{t[E]&=-5,Zc()}}function hw(e,t){for(let n=0;n<t.length;n++)dw(e,t[n])}function Yr(e,t,n,r){let o=F(null);try{let i=t.tView,a=e[E]&4096?4096:16,c=rs(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),u=e[t.index];c[en]=u;let l=e[Ct];return l!==null&&(c[Ct]=l.createEmbeddedView(i)),mu(i,c,n),c}finally{F(o)}}function wp(e,t){let n=ae+t;if(n<e.length)return e[n]}function Un(e,t){return!t||t.firstChild===null||_i(e)}function Qr(e,t,n,r=!0){let o=t[I];if(xb(o,t,e,n),r){let s=ec(n,e),a=t[G],c=Yh(a,e[St]);c!==null&&Sb(o,e[Ie],a,t,c,s)}let i=t[Ue];i!==null&&i.firstChild!==null&&(i.firstChild=null)}function Ep(e,t){let n=jr(e,t);return n!==void 0&&ts(n[I],n),n}function Oi(e,t,n,r,o=!1){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let i=t[n.index];i!==null&&r.push(tt(i)),vt(i)&&pw(i,r);let s=n.type;if(s&8)Oi(e,t,n.child,r);else if(s&32){let a=cu(n,t),c;for(;c=a();)r.push(c)}else if(s&16){let a=Kh(t,n);if(Array.isArray(a))r.push(...a);else{let c=tn(t[ye]);Oi(c[I],c,a,r,!0)}}n=o?n.projectionNext:n.next}return r}function pw(e,t){for(let n=ae;n<e.length;n++){let r=e[n],o=r[I].firstChild;o!==null&&Oi(r[I],r,o,t)}e[St]!==e[Ne]&&t.push(e[St])}var Ip=[];function gw(e){return e[Be]??mw(e)}function mw(e){let t=Ip.pop()??Object.create(yw);return t.lView=e,t}function vw(e){e.lView[Be]!==e&&(e.lView=null,Ip.push(e))}var yw=B(m({},yn),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{Qi(e.lView)},consumerOnSignalRead(){this.lView[Be]=this}});function Dw(e){let t=e[Be]??Object.create(bw);return t.lView=e,t}var bw=B(m({},yn),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{let t=tn(e.lView);for(;t&&!Cp(t[I]);)t=tn(t);t&&qf(t)},consumerOnSignalRead(){this.lView[Be]=this}});function Cp(e){return e.type!==2}var ww=100;function Sp(e,t=!0,n=0){let r=e[ht],o=r.rendererFactory,i=!1;i||o.begin?.();try{Ew(e,n)}catch(s){throw t&&Dp(e,s),s}finally{i||(o.end?.(),r.inlineEffectRunner?.flush())}}function Ew(e,t){let n=Jf();try{Pd(!0),rc(e,t);let r=0;for(;Yi(e);){if(r===ww)throw new w(103,!1);r++,rc(e,1)}}finally{Pd(n)}}function Iw(e,t,n,r){let o=t[E];if((o&256)===256)return;let i=!1,s=!1;!i&&t[ht].inlineEffectRunner?.flush(),Gc(t);let a=!0,c=null,u=null;i||(Cp(e)?(u=gw(t),c=Mr(u)):Pl()===null?(a=!1,u=Dw(t),c=Mr(u)):t[Be]&&(Oo(t[Be]),t[Be]=null));try{zf(t),cD(e.bindingStartIndex),n!==null&&sp(e,t,n,2,r);let l=(o&3)===3;if(!i)if(l){let f=e.preOrderCheckHooks;f!==null&&di(t,f,null)}else{let f=e.preOrderHooks;f!==null&&fi(t,f,0,null),va(t,0)}if(s||Cw(t),Mp(t,0),e.contentQueries!==null&&mp(e,t),!i)if(l){let f=e.contentCheckHooks;f!==null&&di(t,f)}else{let f=e.contentHooks;f!==null&&fi(t,f,1),va(t,1)}jb(e,t);let d=e.components;d!==null&&Tp(t,d,0);let h=e.viewQuery;if(h!==null&&nc(2,h,r),!i)if(l){let f=e.viewCheckHooks;f!==null&&di(t,f)}else{let f=e.viewHooks;f!==null&&fi(t,f,2),va(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[li]){for(let f of t[li])f();t[li]=null}i||(t[E]&=-73)}catch(l){throw i||Qi(t),l}finally{u!==null&&(Ao(u,c),a&&vw(u)),Zc()}}function Mp(e,t){for(let n=Mh(e);n!==null;n=xh(n))for(let r=ae;r<n.length;r++){let o=n[r];xp(o,t)}}function Cw(e){for(let t=Mh(e);t!==null;t=xh(t)){if(!(t[E]&Ei.HasTransplantedViews))continue;let n=t[Bn];for(let r=0;r<n.length;r++){let o=n[r];qf(o)}}}function Sw(e,t,n){let r=Vt(t,e);xp(r,n)}function xp(e,t){Uc(e)&&rc(e,t)}function rc(e,t){let r=e[I],o=e[E],i=e[Be],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&Ro(i)),s||=!1,i&&(i.dirty=!1),e[E]&=-9217,s)Iw(r,e,r.template,e[he]);else if(o&8192){Mp(e,1);let a=r.components;a!==null&&Tp(e,a,1)}}function Tp(e,t,n){for(let r=0;r<t.length;r++)Sw(e,t[r],n)}function vu(e,t){let n=Jf()?64:1088;for(e[ht].changeDetectionScheduler?.notify(t);e;){e[E]|=n;let r=tn(e);if(Ii(e)&&!r)return e;e=r}return null}var an=class{get rootNodes(){let t=this._lView,n=t[I];return Oi(n,t,n.firstChild,[])}constructor(t,n,r=!0){this._lView=t,this._cdRefInjectingView=n,this.notifyErrorHandler=r,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[he]}set context(t){this._lView[he]=t}get destroyed(){return(this._lView[E]&256)===256}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[ce];if(vt(t)){let n=t[wi],r=n?n.indexOf(this):-1;r>-1&&(jr(t,r),yi(n,r))}this._attachedToViewContainer=!1}ts(this._lView[I],this._lView)}onDestroy(t){Wf(this._lView,t)}markForCheck(){vu(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[E]&=-129}reattach(){Va(this._lView),this._lView[E]|=128}detectChanges(){this._lView[E]|=1024,Sp(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new w(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=Ii(this._lView),n=this._lView[en];n!==null&&!t&&lu(n,this._lView),qh(this._lView[I],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new w(902,!1);this._appRef=t;let n=Ii(this._lView),r=this._lView[en];r!==null&&!n&&Wh(r,this._lView),Va(this._lView)}},Vr=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=Tw;let e=t;return e})(),Mw=Vr,xw=class extends Mw{constructor(t,n,r){super(),this._declarationLView=t,this._declarationTContainer=n,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,n){return this.createEmbeddedViewImpl(t,n)}createEmbeddedViewImpl(t,n,r){let o=Yr(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:n,dehydratedView:r});return new an(o)}};function Tw(){return yu(Ce(),L())}function yu(e,t){return e.type&4?new xw(t,e,er(e,t)):null}var _w=new RegExp(`^(\\d+)*(${Ah}|${Nh})*(.*)`);function Nw(e){let t=e.match(_w),[n,r,o,i]=t,s=r?parseInt(r,10):o,a=[];for(let[c,u,l]of i.matchAll(/(f|n)(\d*)/g)){let d=parseInt(l,10)||1;a.push(u,d)}return[s,...a]}function Aw(e){return!e.prev&&e.parent?.type===8}function Ia(e){return e.index-ne}function Rw(e,t){let n=e.i18nNodes;if(n)return n.get(t)}function is(e,t,n,r){let o=Ia(r),i=Rw(e,o);if(i===void 0){let s=e.data[tb];if(s?.[o])i=Pw(s[o],n);else if(t.firstChild===r)i=e.firstChild;else{let a=r.prev===null,c=r.prev??r.parent;if(Aw(r)){let u=Ia(r.parent);i=Xa(e,u)}else{let u=Ae(c,n);if(a)i=u.firstChild;else{let l=Ia(c),d=Xa(e,l);if(c.type===2&&d){let f=su(e,l)+1;i=ss(f,d)}else i=u.nextSibling}}}}return i}function ss(e,t){let n=t;for(let r=0;r<e;r++)n=n.nextSibling;return n}function Ow(e,t){let n=e;for(let r=0;r<t.length;r+=2){let o=t[r],i=t[r+1];for(let s=0;s<i;s++)switch(o){case Ja.FirstChild:n=n.firstChild;break;case Ja.NextSibling:n=n.nextSibling;break}}return n}function Pw(e,t){let[n,...r]=Nw(e),o;if(n===Nh)o=t[ye][Ne];else if(n===Ah)o=wb(t[ye][Ne]);else{let i=Number(n);o=tt(t[i+ne])}return Ow(o,r)}var Fw=!1;function kw(e){Fw=e}function Lw(e){let t=e[Ue];if(t){let{i18nNodes:n,dehydratedIcuData:r}=t;if(n&&r){let o=e[G];for(let i of r.values())jw(o,n,i)}t.i18nNodes=void 0,t.dehydratedIcuData=void 0}}function jw(e,t,n){for(let r of n.node.cases[n.case]){let o=t.get(r.index-ne);o&&fu(e,o,!1)}}function _p(e){let t=e[Lr]??[],r=e[ce][G];for(let o of t)Vw(o,r);e[Lr]=dt}function Vw(e,t){let n=0,r=e.firstChild;if(r){let o=e.data[Ni];for(;n<o;){let i=r.nextSibling;fu(t,r,!1),r=i,n++}}}function Np(e){_p(e);let t=e[Ne];et(t)&&Pi(t);for(let n=ae;n<e.length;n++)Pi(e[n])}function Pi(e){Lw(e);let t=e[I];for(let n=ne;n<t.bindingStartIndex;n++)if(vt(e[n])){let r=e[n];Np(r)}else et(e[n])&&Pi(e[n])}function Bw(e){let t=e._views;for(let n of t){let r=sb(n);r!==null&&r[Ne]!==null&&(et(r)?Pi(r):Np(r))}}function $w(e,t){let n=[];for(let r of t)for(let o=0;o<(r[Rh]??1);o++){let i={data:r,firstChild:null};r[Ni]>0&&(i.firstChild=e,e=ss(r[Ni],e)),n.push(i)}return[e,n]}var Ap=()=>null;function Uw(e,t){let n=e[Lr];return!t||n===null||n.length===0?null:n[0].data[eb]===t?n.shift():(_p(e),null)}function Hw(){Ap=Uw}function Hn(e,t){return Ap(e,t)}var zn=class{},Rp=new C("",{providedIn:"root",factory:()=>!1});var Op=new C(""),Pp=new C(""),oc=class{},Fi=class{};function zw(e){let t=Error(`No component factory found for ${Ee(e)}.`);return t[qw]=e,t}var qw="ngComponent";var ic=class{resolveComponentFactory(t){throw zw(t)}},Tu=class Tu{};Tu.NULL=new ic;var qn=Tu,Wn=class{},as=(()=>{let t=class t{constructor(){this.destroyNode=null}};t.__NG_ELEMENT_ID__=()=>Ww();let e=t;return e})();function Ww(){let e=L(),t=Ce(),n=Vt(t.index,e);return(et(n)?n:e)[G]}var Gw=(()=>{let t=class t{};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>null});let e=t;return e})();function sc(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=Aa(o,a);else if(i==2){let c=a,u=t[++s];r=Aa(r,c+": "+u+";")}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o}var ki=class extends qn{constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=Lt(t);return new Gn(n,this.ngModule)}};function Qd(e,t){let n=[];for(let r in e){if(!e.hasOwnProperty(r))continue;let o=e[r];if(o===void 0)continue;let i=Array.isArray(o),s=i?o[0]:o,a=i?o[1]:kt.None;t?n.push({propName:s,templateName:r,isSignal:(a&kt.SignalBased)!==0}):n.push({propName:s,templateName:r})}return n}function Zw(e){let t=e.toLowerCase();return t==="svg"?Zy:t==="math"?Yy:null}var Gn=class extends Fi{get inputs(){let t=this.componentDef,n=t.inputTransforms,r=Qd(t.inputs,!0);if(n!==null)for(let o of r)n.hasOwnProperty(o.propName)&&(o.transform=n[o.propName]);return r}get outputs(){return Qd(this.componentDef.outputs,!1)}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=Ty(t.selectors),this.ngContentSelectors=t.ngContentSelectors?t.ngContentSelectors:[],this.isBoundToModule=!!n}create(t,n,r,o){let i=F(null);try{o=o||this.ngModule;let s=o instanceof $e?o:o?.injector;s&&this.componentDef.getStandaloneInjector!==null&&(s=this.componentDef.getStandaloneInjector(s)||s);let a=s?new $a(t,s):t,c=a.get(Wn,null);if(c===null)throw new w(407,!1);let u=a.get(Gw,null),l=a.get(zn,null),d={rendererFactory:c,sanitizer:u,inlineEffectRunner:null,changeDetectionScheduler:l},h=c.createRenderer(null,this.componentDef),f=this.componentDef.selectors[0][0]||"div",g=r?$b(h,r,this.componentDef.encapsulation,a):uu(h,f,Zw(f)),v=512;this.componentDef.signals?v|=4096:this.componentDef.onPush||(v|=16);let S=null;g!==null&&(S=iu(g,a,!0));let M=pu(0,null,null,1,0,null,null,null,null,null,null),W=rs(null,M,null,v,null,null,d,h,a,null,S);Gc(W);let le,ge,Nt=null;try{let Me=this.componentDef,vn,Zs=null;Me.findHostDirectiveDefs?(vn=[],Zs=new Map,Me.findHostDirectiveDefs(Me,vn,Zs),vn.push(Me)):vn=[Me];let pv=Yw(W,g);Nt=Qw(pv,g,Me,vn,W,d,h),ge=$c(M,ne),g&&Xw(h,Me,g,r),n!==void 0&&eE(ge,this.ngContentSelectors,n),le=Jw(Nt,Me,vn,Zs,W,[tE]),mu(M,W,null)}catch(Me){throw Nt!==null&&Qa(Nt),Qa(W),Me}finally{Zc()}return new ac(this.componentType,le,er(ge,W),W,ge)}finally{F(i)}}},ac=class extends oc{constructor(t,n,r,o,i){super(),this.location=r,this._rootLView=o,this._tNode=i,this.previousInputValues=null,this.instance=n,this.hostView=this.changeDetectorRef=new an(o,void 0,!1),this.componentType=t}setInput(t,n){let r=this._tNode.inputs,o;if(r!==null&&(o=r[t])){if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let i=this._rootLView;gu(i[I],i,o,t,n),this.previousInputValues.set(t,n);let s=Vt(this._tNode.index,i);vu(s,1)}}get injector(){return new Jt(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function Yw(e,t){let n=e[I],r=ne;return e[r]=t,Zr(n,r,2,"#host",null)}function Qw(e,t,n,r,o,i,s){let a=o[I];Kw(r,e,t,s);let c=null;t!==null&&(c=iu(t,o[Vn]));let u=i.rendererFactory.createRenderer(t,n),l=16;n.signals?l=4096:n.onPush&&(l=64);let d=rs(o,lp(n),null,l,o[e.index],e,i,u,null,null,c);return a.firstCreatePass&&tc(a,e,r.length-1),os(o,d),o[e.index]=d}function Kw(e,t,n,r){for(let o of e)t.mergedAttrs=kc(t.mergedAttrs,o.hostAttrs);t.mergedAttrs!==null&&(sc(t,t.mergedAttrs,!0),n!==null&&tp(r,n,t))}function Jw(e,t,n,r,o,i){let s=Ce(),a=o[I],c=Ae(s,o);hp(a,o,s,n,null,r);for(let l=0;l<n.length;l++){let d=s.directiveStart+l,h=on(o,a,d,s);sn(h,o)}pp(a,o,s),c&&sn(c,o);let u=on(o,a,s.directiveStart+s.componentOffset,s);if(e[he]=o[he]=u,i!==null)for(let l of i)l(u,t);return ap(a,s,o),u}function Xw(e,t,n,r){if(r)Pa(e,n,["ng-version","18.2.4"]);else{let{attrs:o,classes:i}=_y(t.selectors[0]);o&&Pa(e,n,o),i&&i.length>0&&ep(e,n,i.join(" "))}}function eE(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null?Array.from(i):null)}}function tE(){let e=Ce();Qc(L()[I],e)}var rr=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=nE;let e=t;return e})();function nE(){let e=Ce();return kp(e,L())}var rE=rr,Fp=class extends rE{constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r}get element(){return er(this._hostTNode,this._hostLView)}get injector(){return new Jt(this._hostTNode,this._hostLView)}get parentInjector(){let t=Kc(this._hostTNode,this._hostLView);if(lh(t)){let n=Si(t,this._hostLView),r=Ci(t),o=n[I].data[r+8];return new Jt(o,n)}else return new Jt(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=Kd(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-ae}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=Hn(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,Un(this._hostTNode,s)),a}createComponent(t,n,r,o,i){let s=t&&!zy(t),a;if(s)a=n;else{let g=n||{};a=g.index,r=g.injector,o=g.projectableNodes,i=g.environmentInjector||g.ngModuleRef}let c=s?t:new Gn(Lt(t)),u=r||this.parentInjector;if(!i&&c.ngModule==null){let v=(s?u:this.parentInjector).get($e,null);v&&(i=v)}let l=Lt(c.componentType??{}),d=Hn(this._lContainer,l?.id??null),h=d?.firstChild??null,f=c.create(u,o,h,i);return this.insertImpl(f.hostView,a,Un(this._hostTNode,d)),f}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,r){let o=t._lView;if(Ky(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let c=o[ce],u=new Fp(c,c[Ie],c[ce]);u.detach(u.indexOf(t))}}let i=this._adjustIndex(n),s=this._lContainer;return Qr(s,o,i,r),t.attachToViewContainerRef(),yf(Ca(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=Kd(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=jr(this._lContainer,n);r&&(yi(Ca(this._lContainer),n),ts(r[I],r))}detach(t){let n=this._adjustIndex(t,-1),r=jr(this._lContainer,n);return r&&yi(Ca(this._lContainer),n)!=null?new an(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function Kd(e){return e[wi]}function Ca(e){return e[wi]||(e[wi]=[])}function kp(e,t){let n,r=t[e.index];return vt(r)?n=r:(n=gp(r,t,null,e),t[e.index]=n,os(t,n)),Lp(n,t,e,r),new Fp(n,e,t)}function oE(e,t){let n=e[G],r=n.createComment(""),o=Ae(t,e),i=Yh(n,o);return Ri(n,i,r,Ab(n,o),!1),r}var Lp=jp,Du=()=>!1;function iE(e,t,n){return Du(e,t,n)}function jp(e,t,n,r){if(e[St])return;let o;n.type&8?o=tt(r):o=oE(t,n),e[St]=o}function sE(e,t,n){if(e[St]&&e[Lr])return!0;let r=n[Ue],o=t.index-ne;if(!r||qD(t)||Gr(r,o))return!1;let s=Xa(r,o),a=r.data[ou]?.[o],[c,u]=$w(s,a);return e[St]=c,e[Lr]=u,!0}function aE(e,t,n,r){Du(e,n,t)||jp(e,t,n,r)}function cE(){Lp=aE,Du=sE}var cc=class e{constructor(t){this.queryList=t,this.matches=null}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},uc=class e{constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone())}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)bu(t,n).matches!==null&&this.queries[n].setDirty()}},lc=class{constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=mE(t):this.predicate=t}},dc=class e{constructor(t=[]){this.queries=t}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i])}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},fc=class e{constructor(t,n=-1){this.metadata=t,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,uE(n,i)),this.matchTNodeWithReadOption(t,n,hi(n,t,i,!1,!1))}else r===Vr?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,hi(n,t,r,!1,!1))}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===Se||o===rr||o===Vr&&n.type&4)this.addMatch(n.index,-2);else{let i=hi(n,t,o,!1,!1);i!==null&&this.addMatch(n.index,i)}else this.addMatch(n.index,r)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function uE(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function lE(e,t){return e.type&11?er(e,t):e.type&4?yu(e,t):null}function dE(e,t,n,r){return n===-1?lE(t,e):n===-2?fE(e,t,r):on(e,e[I],n,t)}function fE(e,t,n){if(n===Se)return er(t,e);if(n===Vr)return yu(t,e);if(n===rr)return kp(t,e)}function Vp(e,t,n,r){let o=t[Ct].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let u=s[c];if(u<0)a.push(null);else{let l=i[u];a.push(dE(t,l,s[c+1],n.metadata.read))}}o.matches=a}return o.matches}function hc(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=Vp(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else{let u=i[a+1],l=t[-c];for(let d=ae;d<l.length;d++){let h=l[d];h[en]===h[ce]&&hc(h[I],h,u,r)}if(l[Bn]!==null){let d=l[Bn];for(let h=0;h<d.length;h++){let f=d[h];hc(f[I],f,u,r)}}}}}return r}function hE(e,t){return e[Ct].queries[t].queryList}function pE(e,t,n){let r=new Ya((n&4)===4);return qb(e,t,r,r.destroy),(t[Ct]??=new uc).queries.push(new cc(r))-1}function gE(e,t,n){let r=pe();return r.firstCreatePass&&(vE(r,new lc(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=!0)),pE(r,L(),t)}function mE(e){return e.split(",").map(t=>t.trim())}function vE(e,t,n){e.queries===null&&(e.queries=new dc),e.queries.track(new fc(t,n))}function bu(e,t){return e.queries.getByIndex(t)}function yE(e,t){let n=e[I],r=bu(n,t);return r.crossesNgTemplate?hc(n,e,t,[]):Vp(n,e,r,t)}var Jd=new Set;function rt(e){Jd.has(e)||(Jd.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}function Pe(e,t){rt("NgSignals");let n=Wl(e),r=n[ct];return t?.equal&&(r.equal=t.equal),n.set=o=>ko(r,o),n.update=o=>Gl(r,o),n.asReadonly=DE.bind(n),n}function DE(){let e=this[ct];if(e.readonlyFn===void 0){let t=()=>this();t[ct]=e,e.readonlyFn=t}return e.readonlyFn}function Kr(e){let t=e.inputConfig,n={};for(let r in t)if(t.hasOwnProperty(r)){let o=t[r];Array.isArray(o)&&o[3]&&(n[r]=o[3])}e.inputTransforms=n}var jt=class{},Br=class{};var pc=class extends jt{constructor(t,n,r,o=!0){super(),this.ngModuleType=t,this._parent=n,this._bootstrapComponents=[],this.destroyCbs=[],this.componentFactoryResolver=new ki(this);let i=Tf(t);this._bootstrapComponents=Uh(i.bootstrap),this._r3Injector=Dh(t,n,[{provide:jt,useValue:this},{provide:qn,useValue:this.componentFactoryResolver},...r],Ee(t),new Set(["environment"])),o&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},gc=class extends Br{constructor(t){super(),this.moduleType=t}create(t){return new pc(this.moduleType,t,[])}};var Li=class extends jt{constructor(t){super(),this.componentFactoryResolver=new ki(this),this.instance=null;let n=new Fr([...t.providers,{provide:jt,useValue:this},{provide:qn,useValue:this.componentFactoryResolver}],t.parent||Vc(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function wu(e,t,n=null){return new Li({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}function Bp(e,t,n){return e[t]=n}function bE(e,t){return e[t]}function gt(e,t,n){let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function wE(e,t,n,r){let o=gt(e,t,n);return gt(e,t+1,r)||o}function Jr(e){return(e.flags&32)===32}function EE(e,t,n,r,o,i,s,a,c){let u=t.consts,l=Zr(t,e,4,s||null,a||null);fp(t,n,l,$n(u,c)),Qc(t,l);let d=l.tView=pu(2,l,r,o,i,t.directiveRegistry,t.pipeRegistry,null,t.schemas,u,null);return t.queries!==null&&(t.queries.template(t,l),d.queries=t.queries.embeddedTView(l)),l}function ji(e,t,n,r,o,i,s,a,c,u){let l=n+ne,d=t.firstCreatePass?EE(l,t,e,r,o,i,s,a,c):t.data[l];qr(d,!1);let h=$p(t,e,d,n);Yc()&&du(t,e,h,d),sn(h,e);let f=gp(h,e,h,d);return e[l]=f,os(e,f),iE(f,d,e),Bc(d)&&cp(t,e,d),c!=null&&up(e,d,u),d}function ze(e,t,n,r,o,i,s,a){let c=L(),u=pe(),l=$n(u.consts,i);return ji(c,u,e,t,n,r,o,l,s,a),ze}var $p=Up;function Up(e,t,n,r){return Bt(!0),t[G].createComment("")}function IE(e,t,n,r){let o=t[Ue],i=!o||Xn()||Jr(n)||Gr(o,r);if(Bt(i),i)return Up(e,t,n,r);let s=o.data[XD]?.[r]??null;s!==null&&n.tView!==null&&n.tView.ssrId===null&&(n.tView.ssrId=s);let a=is(o,e,t,n);Xi(o,r,a);let c=su(o,r);return ss(c,a)}function CE(){$p=IE}var On=function(e){return e[e.EarlyRead=0]="EarlyRead",e[e.Write=1]="Write",e[e.MixedReadWrite=2]="MixedReadWrite",e[e.Read=3]="Read",e}(On||{}),Hp=(()=>{let t=class t{constructor(){this.impl=null}execute(){this.impl?.execute()}};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>new t});let e=t;return e})(),Kt=class Kt{constructor(){this.ngZone=p(Y),this.scheduler=p(zn),this.errorHandler=p(pt,{optional:!0}),this.sequences=new Set,this.deferredRegistrations=new Set,this.executing=!1}execute(){this.executing=!0;for(let t of Kt.PHASES)for(let n of this.sequences)if(!(n.erroredOrDestroyed||!n.hooks[t]))try{n.pipelinedValue=this.ngZone.runOutsideAngular(()=>n.hooks[t](n.pipelinedValue))}catch(r){n.erroredOrDestroyed=!0,this.errorHandler?.handleError(r)}this.executing=!1;for(let t of this.sequences)t.afterRun(),t.once&&this.sequences.delete(t);for(let t of this.deferredRegistrations)this.sequences.add(t);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear()}register(t){this.executing?this.deferredRegistrations.add(t):(this.sequences.add(t),this.scheduler.notify(6))}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}};Kt.PHASES=[On.EarlyRead,On.Write,On.MixedReadWrite,On.Read],Kt.\u0275prov=D({token:Kt,providedIn:"root",factory:()=>new Kt});var mc=Kt,vc=class{constructor(t,n,r,o){this.impl=t,this.hooks=n,this.once=r,this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.unregisterOnDestroy=o.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0}destroy(){this.impl.unregister(this),this.unregisterOnDestroy()}};function or(e,t){!t?.injector&&Gi(or);let n=t?.injector??p(He);return Nr(n)?(rt("NgAfterNextRender"),ME(e,n,t,!0)):xE}function SE(e,t){if(e instanceof Function){let n=[void 0,void 0,void 0,void 0];return n[t]=e,n}else return[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function ME(e,t,n,r){let o=t.get(Hp);o.impl??=t.get(mc);let i=n?.phase??On.MixedReadWrite,s=new vc(o.impl,SE(e,i),r,t.get(un));return o.impl.register(s),s}var xE={destroy(){}};function Eu(e,t,n,r){let o=L(),i=Wr();if(gt(o,i,t)){let s=pe(),a=sh();aw(a,o,e,t,n,r)}return Eu}function TE(e,t,n,r){return gt(e,Wr(),n)?t+kn(n)+r:Oe}function _E(e,t,n,r,o,i){let s=aD(),a=wE(e,s,n,o);return qc(2),a?t+kn(n)+r+kn(o)+i:Oe}function si(e,t){return e<<17|t<<2}function cn(e){return e>>17&32767}function NE(e){return(e&2)==2}function AE(e,t){return e&131071|t<<17}function yc(e){return e|2}function Zn(e){return(e&131068)>>2}function Sa(e,t){return e&-131069|t<<2}function RE(e){return(e&1)===1}function Dc(e){return e|1}function OE(e,t,n,r,o,i){let s=i?t.classBindings:t.styleBindings,a=cn(s),c=Zn(s);e[r]=n;let u=!1,l;if(Array.isArray(n)){let d=n;l=d[1],(l===null||Ur(d,l)>0)&&(u=!0)}else l=n;if(o)if(c!==0){let h=cn(e[a+1]);e[r+1]=si(h,a),h!==0&&(e[h+1]=Sa(e[h+1],r)),e[a+1]=AE(e[a+1],r)}else e[r+1]=si(a,0),a!==0&&(e[a+1]=Sa(e[a+1],r)),a=r;else e[r+1]=si(c,0),a===0?a=r:e[c+1]=Sa(e[c+1],r),c=r;u&&(e[r+1]=yc(e[r+1])),Xd(e,l,r,!0),Xd(e,l,r,!1),PE(t,l,e,r,i),s=si(a,c),i?t.classBindings=s:t.styleBindings=s}function PE(e,t,n,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof t=="string"&&Ur(i,t)>=0&&(n[r+1]=Dc(n[r+1]))}function Xd(e,t,n,r){let o=e[n+1],i=t===null,s=r?cn(o):Zn(o),a=!1;for(;s!==0&&(a===!1||i);){let c=e[s],u=e[s+1];FE(c,t)&&(a=!0,e[s+1]=r?Dc(u):yc(u)),s=r?cn(u):Zn(u)}a&&(e[n+1]=r?yc(o):Dc(o))}function FE(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t=="string"?Ur(e,t)>=0:!1}var Je={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function kE(e){return e.substring(Je.key,Je.keyEnd)}function LE(e){return jE(e),zp(e,qp(e,0,Je.textEnd))}function zp(e,t){let n=Je.textEnd;return n===t?-1:(t=Je.keyEnd=VE(e,Je.key=t,n),qp(e,t,n))}function jE(e){Je.key=0,Je.keyEnd=0,Je.value=0,Je.valueEnd=0,Je.textEnd=e.length}function qp(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function VE(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function ue(e,t,n){let r=L(),o=Wr();if(gt(r,o,t)){let i=pe(),s=sh();Yb(i,s,r,e,t,r[G],n,!1)}return ue}function bc(e,t,n,r,o){let i=t.inputs,s=o?"class":"style";gu(e,n,i[s],s,r)}function Xr(e,t){return $E(e,t,null,!0),Xr}function cs(e){UE(ZE,BE,e,!0)}function BE(e,t){for(let n=LE(t);n>=0;n=zp(t,n))Fc(e,kE(t),!0)}function $E(e,t,n,r){let o=L(),i=pe(),s=qc(2);if(i.firstUpdatePass&&Gp(i,e,s,r),t!==Oe&&gt(o,s,t)){let a=i.data[xt()];Zp(i,a,o,o[G],e,o[s+1]=QE(t,n),r,s)}}function UE(e,t,n,r){let o=pe(),i=qc(2);o.firstUpdatePass&&Gp(o,null,i,r);let s=L();if(n!==Oe&&gt(s,i,n)){let a=o.data[xt()];if(Yp(a,r)&&!Wp(o,i)){let c=r?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(n=Aa(c,n||"")),bc(o,a,s,n,r)}else YE(o,a,s,s[G],s[i+1],s[i+1]=GE(e,t,n),r,i)}}function Wp(e,t){return t>=e.expandoStartIndex}function Gp(e,t,n,r){let o=e.data;if(o[n+1]===null){let i=o[xt()],s=Wp(e,n);Yp(i,r)&&t===null&&!s&&(t=!1),t=HE(o,i,t,r),OE(o,i,t,n,s,r)}}function HE(e,t,n,r){let o=fD(e),i=r?t.residualClasses:t.residualStyles;if(o===null)(r?t.classBindings:t.styleBindings)===0&&(n=Ma(null,e,t,n,r),n=$r(n,t.attrs,r),i=null);else{let s=t.directiveStylingLast;if(s===-1||e[s]!==o)if(n=Ma(o,e,t,n,r),i===null){let c=zE(e,t,r);c!==void 0&&Array.isArray(c)&&(c=Ma(null,e,t,c[1],r),c=$r(c,t.attrs,r),qE(e,t,r,c))}else i=WE(e,t,r)}return i!==void 0&&(r?t.residualClasses=i:t.residualStyles=i),n}function zE(e,t,n){let r=n?t.classBindings:t.styleBindings;if(Zn(r)!==0)return e[cn(r)]}function qE(e,t,n,r){let o=n?t.classBindings:t.styleBindings;e[cn(o)]=r}function WE(e,t,n){let r,o=t.directiveEnd;for(let i=1+t.directiveStylingLast;i<o;i++){let s=e[i].hostAttrs;r=$r(r,s,n)}return $r(r,t.attrs,n)}function Ma(e,t,n,r,o){let i=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(i=t[a],r=$r(r,i.hostAttrs,o),i!==e);)a++;return e!==null&&(n.directiveStylingLast=a),r}function $r(e,t,n){let r=n?1:2,o=-1;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];typeof s=="number"?o=s:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Fc(e,s,n?!0:t[++i]))}return e===void 0?null:e}function GE(e,t,n){if(n==null||n==="")return dt;let r=[],o=nr(n);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],!0);else if(typeof o=="object")for(let i in o)o.hasOwnProperty(i)&&e(r,i,o[i]);else typeof o=="string"&&t(r,o);return r}function ZE(e,t,n){let r=String(t);r!==""&&!r.includes(" ")&&Fc(e,r,n)}function YE(e,t,n,r,o,i,s,a){o===Oe&&(o=dt);let c=0,u=0,l=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;l!==null||d!==null;){let h=c<o.length?o[c+1]:void 0,f=u<i.length?i[u+1]:void 0,g=null,v;l===d?(c+=2,u+=2,h!==f&&(g=d,v=f)):d===null||l!==null&&l<d?(c+=2,g=l):(u+=2,g=d,v=f),g!==null&&Zp(e,t,n,r,g,v,s,a),l=c<o.length?o[c]:null,d=u<i.length?i[u]:null}}function Zp(e,t,n,r,o,i,s,a){if(!(t.type&3))return;let c=e.data,u=c[a+1],l=RE(u)?ef(c,t,n,o,Zn(u),s):void 0;if(!Vi(l)){Vi(i)||NE(u)&&(i=ef(c,null,n,o,a,s));let d=Hf(xt(),n);kb(r,s,d,o,i)}}function ef(e,t,n,r,o,i){let s=t===null,a;for(;o>0;){let c=e[o],u=Array.isArray(c),l=u?c[1]:c,d=l===null,h=n[o+1];h===Oe&&(h=d?dt:void 0);let f=d?ga(h,r):l===r?h:void 0;if(u&&!Vi(f)&&(f=ga(c,r)),Vi(f)&&(a=f,s))return a;let g=e[o+1];o=s?cn(g):Zn(g)}if(t!==null){let c=i?t.residualClasses:t.residualStyles;c!=null&&(a=ga(c,r))}return a}function Vi(e){return e!==void 0}function QE(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=Ee(nr(e)))),e}function Yp(e,t){return(e.flags&(t?8:16))!==0}var wc=class{destroy(t){}updateValue(t,n){}swap(t,n){let r=Math.min(t,n),o=Math.max(t,n),i=this.detach(o);if(o-r>1){let s=this.detach(r);this.attach(r,i),this.attach(o,s)}else this.attach(r,i)}move(t,n){this.attach(n,this.detach(t))}};function xa(e,t,n,r,o){return e===n&&Object.is(t,r)?1:Object.is(o(e,t),o(n,r))?-1:0}function KE(e,t,n){let r,o,i=0,s=e.length-1,a=void 0;if(Array.isArray(t)){let c=t.length-1;for(;i<=s&&i<=c;){let u=e.at(i),l=t[i],d=xa(i,u,i,l,n);if(d!==0){d<0&&e.updateValue(i,l),i++;continue}let h=e.at(s),f=t[c],g=xa(s,h,c,f,n);if(g!==0){g<0&&e.updateValue(s,f),s--,c--;continue}let v=n(i,u),S=n(s,h),M=n(i,l);if(Object.is(M,S)){let W=n(c,f);Object.is(W,v)?(e.swap(i,s),e.updateValue(s,f),c--,s--):e.move(s,i),e.updateValue(i,l),i++;continue}if(r??=new Bi,o??=nf(e,i,s,n),Ec(e,r,i,M))e.updateValue(i,l),i++,s++;else if(o.has(M))r.set(v,e.detach(i)),s--;else{let W=e.create(i,t[i]);e.attach(i,W),i++,s++}}for(;i<=c;)tf(e,r,n,i,t[i]),i++}else if(t!=null){let c=t[Symbol.iterator](),u=c.next();for(;!u.done&&i<=s;){let l=e.at(i),d=u.value,h=xa(i,l,i,d,n);if(h!==0)h<0&&e.updateValue(i,d),i++,u=c.next();else{r??=new Bi,o??=nf(e,i,s,n);let f=n(i,d);if(Ec(e,r,i,f))e.updateValue(i,d),i++,s++,u=c.next();else if(!o.has(f))e.attach(i,e.create(i,d)),i++,s++,u=c.next();else{let g=n(i,l);r.set(g,e.detach(i)),s--}}}for(;!u.done;)tf(e,r,n,e.length,u.value),u=c.next()}for(;i<=s;)e.destroy(e.detach(s--));r?.forEach(c=>{e.destroy(c)})}function Ec(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),!0):!1}function tf(e,t,n,r,o){if(Ec(e,t,r,n(r,o)))e.updateValue(r,o);else{let i=e.create(r,o);e.attach(r,i)}}function nf(e,t,n,r){let o=new Set;for(let i=t;i<=n;i++)o.add(r(i,e.at(i)));return o}var Bi=class{constructor(){this.kvMap=new Map,this._vMap=void 0}has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let n=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(t,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,n){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(r);)r=o.get(r);o.set(r,n)}else this.kvMap.set(t,n)}forEach(t){for(let[n,r]of this.kvMap)if(t(r,n),this._vMap!==void 0){let o=this._vMap;for(;o.has(r);)r=o.get(r),t(r,n)}}};function qe(e,t){rt("NgControlFlow");let n=L(),r=Wr(),o=n[r]!==Oe?n[r]:-1,i=o!==-1?$i(n,ne+o):void 0,s=0;if(gt(n,r,e)){let a=F(null);try{if(i!==void 0&&Ep(i,s),e!==-1){let c=ne+e,u=$i(n,c),l=Mc(n[I],c),d=Hn(u,l.tView.ssrId),h=Yr(n,l,t,{dehydratedView:d});Qr(u,h,s,Un(l,d))}}finally{F(a)}}else if(i!==void 0){let a=wp(i,s);a!==void 0&&(a[he]=t)}}var Ic=class{constructor(t,n,r){this.lContainer=t,this.$implicit=n,this.$index=r}get $count(){return this.lContainer.length-ae}};function ln(e){return e}var Cc=class{constructor(t,n,r){this.hasEmptyBlock=t,this.trackByFn=n,this.liveCollection=r}};function Fe(e,t,n,r,o,i,s,a,c,u,l,d,h){rt("NgControlFlow");let f=L(),g=pe(),v=c!==void 0,S=L(),M=a?s.bind(S[ye][he]):s,W=new Cc(v,M);S[ne+e]=W,ji(f,g,e+1,t,n,r,o,$n(g.consts,i)),v&&ji(f,g,e+2,c,u,l,d,$n(g.consts,h))}var Sc=class extends wc{constructor(t,n,r){super(),this.lContainer=t,this.hostLView=n,this.templateTNode=r,this.operationsCounter=void 0,this.needsIndexUpdate=!1}get length(){return this.lContainer.length-ae}at(t){return this.getLView(t)[he].$implicit}attach(t,n){let r=n[Ue];this.needsIndexUpdate||=t!==this.length,Qr(this.lContainer,n,t,Un(this.templateTNode,r))}detach(t){return this.needsIndexUpdate||=t!==this.length-1,JE(this.lContainer,t)}create(t,n){let r=Hn(this.lContainer,this.templateTNode.tView.ssrId),o=Yr(this.hostLView,this.templateTNode,new Ic(this.lContainer,n,t),{dehydratedView:r});return this.operationsCounter?.recordCreate(),o}destroy(t){ts(t[I],t),this.operationsCounter?.recordDestroy()}updateValue(t,n){this.getLView(t)[he].$implicit=n}reset(){this.needsIndexUpdate=!1,this.operationsCounter?.reset()}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[he].$index=t}getLView(t){return XE(this.lContainer,t)}};function ke(e){let t=F(null),n=xt();try{let r=L(),o=r[I],i=r[n],s=n+1,a=$i(r,s);if(i.liveCollection===void 0){let u=Mc(o,s);i.liveCollection=new Sc(a,r,u)}else i.liveCollection.reset();let c=i.liveCollection;if(KE(c,e,i.trackByFn),c.updateIndexes(),i.hasEmptyBlock){let u=Wr(),l=c.length===0;if(gt(r,u,l)){let d=n+2,h=$i(r,d);if(l){let f=Mc(o,d),g=Hn(h,f.tView.ssrId),v=Yr(r,f,void 0,{dehydratedView:g});Qr(h,v,0,Un(f,g))}else Ep(h,0)}}}finally{F(t)}}function $i(e,t){return e[t]}function JE(e,t){return jr(e,t)}function XE(e,t){return wp(e,t)}function Mc(e,t){return $c(e,t)}function eI(e,t,n,r,o,i){let s=t.consts,a=$n(s,o),c=Zr(t,e,2,r,a);return fp(t,n,c,$n(s,i)),c.attrs!==null&&sc(c,c.attrs,!1),c.mergedAttrs!==null&&sc(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function b(e,t,n,r){let o=L(),i=pe(),s=ne+e,a=o[G],c=i.firstCreatePass?eI(s,i,o,t,n,r):i.data[s],u=Qp(i,o,c,a,t,e);o[s]=u;let l=Bc(c);return qr(c,!0),tp(a,u,c),!Jr(c)&&Yc()&&du(i,o,u,c),eD()===0&&sn(u,o),tD(),l&&(cp(i,o,c),ap(i,c,o)),r!==null&&up(o,c),b}function y(){let e=Ce();Qf()?Kf():(e=e.parent,qr(e,!1));let t=e;rD(t)&&iD(),nD();let n=pe();return n.firstCreatePass&&(Qc(n,e),jf(e)&&n.queries.elementEnd(e)),t.classesWithoutHost!=null&&yD(t)&&bc(n,t,L(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&DD(t)&&bc(n,t,L(),t.stylesWithoutHost,!1),y}function We(e,t,n,r){return b(e,t,n,r),y(),We}var Qp=(e,t,n,r,o,i)=>(Bt(!0),uu(r,o,ah()));function tI(e,t,n,r,o,i){let s=t[Ue],a=!s||Xn()||Jr(n)||Gr(s,i);if(Bt(a),a)return uu(r,o,ah());let c=is(s,e,t,n);return kh(s,i)&&Xi(s,i,c.nextSibling),s&&(Ih(n)||Ch(c))&&Hr(n)&&(oD(n),Jh(c)),c}function nI(){Qp=tI}var rI=(e,t,n,r)=>(Bt(!0),zh(t[G],""));function oI(e,t,n,r){let o,i=t[Ue],s=!i||Xn()||Gr(i,r)||Jr(n);if(Bt(s),s)return zh(t[G],"");let a=is(i,e,t,n),c=ub(i,r);return Xi(i,r,a),o=ss(c,a),o}function iI(){rI=oI}function Kp(){return L()}var Ui="en-US";var sI=Ui;function aI(e){typeof e=="string"&&(sI=e.toLowerCase().replace(/_/g,"-"))}var cI=(e,t,n)=>{};function De(e,t,n,r){let o=L(),i=pe(),s=Ce();return lI(i,o,o[G],s,e,t,r),De}function uI(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[bi],c=o[i+2];return a.length>c?a[c]:null}typeof s=="string"&&(i+=2)}return null}function lI(e,t,n,r,o,i,s){let a=Bc(r),u=e.firstCreatePass&&yp(e),l=t[he],d=vp(t),h=!0;if(r.type&3||s){let v=Ae(r,t),S=s?s(v):v,M=d.length,W=s?ge=>s(tt(ge[r.index])):r.index,le=null;if(!s&&a&&(le=uI(e,t,o,r.index)),le!==null){let ge=le.__ngLastListenerFn__||le;ge.__ngNextListenerFn__=i,le.__ngLastListenerFn__=i,h=!1}else{i=of(r,t,l,i),cI(v,o,i);let ge=n.listen(S,o,i);d.push(i,ge),u&&u.push(o,W,M,M+1)}}else i=of(r,t,l,i);let f=r.outputs,g;if(h&&f!==null&&(g=f[o])){let v=g.length;if(v)for(let S=0;S<v;S+=2){let M=g[S],W=g[S+1],Nt=t[M][W].subscribe(i),Me=d.length;d.push(i,Nt),u&&u.push(o,r.index,Me,-(Me+1))}}}function rf(e,t,n,r){let o=F(null);try{return ut(6,t,n),n(r)!==!1}catch(i){return Dp(e,i),!1}finally{ut(7,t,n),F(o)}}function of(e,t,n,r){return function o(i){if(i===Function)return r;let s=e.componentOffset>-1?Vt(e.index,t):t;vu(s,5);let a=rf(t,n,r,i),c=o.__ngNextListenerFn__;for(;c;)a=rf(t,n,c,i)&&a,c=c.__ngNextListenerFn__;return a}}function Ut(e=1){return pD(e)}function dI(e,t){let n=null,r=Iy(e);for(let o=0;o<t.length;o++){let i=t[o];if(i==="*"){n=o;continue}if(r===null?Cf(e,i,!0):My(r,i))return o}return n}function us(e){let t=L()[ye][Ie];if(!t.projection){let n=e?e.length:1,r=t.projection=py(n,null),o=r.slice(),i=t.child;for(;i!==null;){if(i.type!==128){let s=e?dI(i,e):0;s!==null&&(o[s]?o[s].projectionNext=i:r[s]=i,o[s]=i)}i=i.next}}}function eo(e,t=0,n,r,o,i){let s=L(),a=pe(),c=r?e+1:null;c!==null&&ji(s,a,c,r,o,i,null,n);let u=Zr(a,ne+e,16,null,n||null);u.projection===null&&(u.projection=t),Kf();let d=!s[Ue]||Xn();s[ye][Ie].projection[u.projection]===null&&c!==null?fI(s,a,c):d&&(u.flags&32)!==32&&Pb(a,s,u)}function fI(e,t,n){let r=ne+n,o=t.data[r],i=e[r],s=Hn(i,o.tView.ssrId),a=Yr(e,o,void 0,{dehydratedView:s});Qr(i,a,0,Un(o,s))}function Jp(e,t,n){gE(e,t,n)}function Iu(e){let t=L(),n=pe(),r=eh();Wc(r+1);let o=bu(n,r);if(e.dirty&&Qy(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let i=yE(t,r);e.reset(i,$D),e.notifyOnChanges()}return!0}return!1}function Cu(){return hE(L(),eh())}function R(e,t=""){let n=L(),r=pe(),o=e+ne,i=r.firstCreatePass?Zr(r,o,1,t,null):r.data[o],s=Xp(r,n,i,t,e);n[o]=s,Yc()&&du(r,n,s,i),qr(i,!1)}var Xp=(e,t,n,r,o)=>(Bt(!0),Hh(t[G],r));function hI(e,t,n,r,o){let i=t[Ue],s=!i||Xn()||Jr(n)||Gr(i,o);return Bt(s),s?Hh(t[G],r):is(i,e,t,n)}function pI(){Xp=hI}function oe(e){return ir("",e,""),oe}function ir(e,t,n){let r=L(),o=TE(r,e,t,n);return o!==Oe&&bp(r,xt(),o),ir}function Su(e,t,n,r,o){let i=L(),s=_E(i,e,t,n,r,o);return s!==Oe&&bp(i,xt(),s),Su}function gI(e,t,n){let r=pe();if(r.firstCreatePass){let o=Jn(e);xc(n,r.data,r.blueprint,o,!0),xc(t,r.data,r.blueprint,o,!1)}}function xc(e,t,n,r,o){if(e=ve(e),Array.isArray(e))for(let i=0;i<e.length;i++)xc(e[i],t,n,r,o);else{let i=pe(),s=L(),a=Ce(),c=jn(e)?e:ve(e.provide),u=Pf(e),l=a.providerIndexes&1048575,d=a.directiveStart,h=a.providerIndexes>>20;if(jn(e)||!e.multi){let f=new rn(u,o,yt),g=_a(c,t,o?l:l+h,d);g===-1?(Ha(Mi(a,s),i,c),Ta(i,e,t.length),t.push(c),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),n.push(f),s.push(f)):(n[g]=f,s[g]=f)}else{let f=_a(c,t,l+h,d),g=_a(c,t,l,l+h),v=f>=0&&n[f],S=g>=0&&n[g];if(o&&!S||!o&&!v){Ha(Mi(a,s),i,c);let M=yI(o?vI:mI,n.length,o,r,u);!o&&S&&(n[g].providerFactory=M),Ta(i,e,t.length,0),t.push(c),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),n.push(M),s.push(M)}else{let M=eg(n[o?g:f],u,!o&&r);Ta(i,e,f>-1?f:g,M)}!o&&r&&S&&n[g].componentProviders++}}}function Ta(e,t,n,r){let o=jn(t),i=Ly(t);if(o||i){let c=(i?ve(t.useClass):t).prototype.ngOnDestroy;if(c){let u=e.destroyHooks||(e.destroyHooks=[]);if(!o&&t.multi){let l=u.indexOf(n);l===-1?u.push(n,[r,c]):u[l+1].push(r,c)}else u.push(n,c)}}}function eg(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function _a(e,t,n,r){for(let o=n;o<r;o++)if(t[o]===e)return o;return-1}function mI(e,t,n,r){return Tc(this.multi,[])}function vI(e,t,n,r){let o=this.multi,i;if(this.providerFactory){let s=this.providerFactory.componentProviders,a=on(n,n[I],this.providerFactory.index,r);i=a.slice(0,s),Tc(o,i);for(let c=s;c<a.length;c++)i.push(a[c])}else i=[],Tc(o,i);return i}function Tc(e,t){for(let n=0;n<e.length;n++){let r=e[n];t.push(r())}return t}function yI(e,t,n,r,o){let i=new rn(e,n,yt);return i.multi=[],i.index=t,i.componentProviders=0,eg(i,o,r&&!n),i}function tg(e,t=[]){return n=>{n.providersResolver=(r,o)=>gI(r,o?o(e):e,t)}}var DI=(()=>{let t=class t{constructor(r){this._injector=r,this.cachedInjectors=new Map}getOrCreateStandaloneInjector(r){if(!r.standalone)return null;if(!this.cachedInjectors.has(r)){let o=Af(!1,r.type),i=o.length>0?wu([o],this._injector,`Standalone[${r.type.name}]`):null;this.cachedInjectors.set(r,i)}return this.cachedInjectors.get(r)}ngOnDestroy(){try{for(let r of this.cachedInjectors.values())r!==null&&r.destroy()}finally{this.cachedInjectors.clear()}}};t.\u0275prov=D({token:t,providedIn:"environment",factory:()=>new t(k($e))});let e=t;return e})();function z(e){rt("NgStandalone"),e.getStandaloneInjector=t=>t.get(DI).getOrCreateStandaloneInjector(e)}function ng(e,t,n){let r=Xf()+e,o=L();return o[r]===Oe?Bp(o,r,n?t.call(n):t()):bE(o,r)}function ls(e,t,n,r){return wI(L(),Xf(),e,t,n,r)}function bI(e,t){let n=e[t];return n===Oe?void 0:n}function wI(e,t,n,r,o,i){let s=t+n;return gt(e,s,o)?Bp(e,s+1,i?r.call(i,o):r(o)):bI(e,s+1)}var ds=(()=>{let t=class t{log(r){console.log(r)}warn(r){console.warn(r)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"platform"});let e=t;return e})();var rg=new C("");function to(e){return!!e&&typeof e.then=="function"}function og(e){return!!e&&typeof e.subscribe=="function"}var ig=new C(""),sg=(()=>{let t=class t{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((r,o)=>{this.resolve=r,this.reject=o}),this.appInits=p(ig,{optional:!0})??[]}runInitializers(){if(this.initialized)return;let r=[];for(let i of this.appInits){let s=i();if(to(s))r.push(s);else if(og(s)){let a=new Promise((c,u)=>{s.subscribe({complete:c,error:u})});r.push(a)}}let o=()=>{this.done=!0,this.resolve()};Promise.all(r).then(()=>{o()}).catch(i=>{this.reject(i)}),r.length===0&&o(),this.initialized=!0}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),sr=new C("");function EI(){ql(()=>{throw new w(600,!1)})}function II(e){return e.isBoundToModule}var CI=10;function SI(e,t,n){try{let r=n();return to(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e.handleError(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e.handleError(r)),r}}var Dt=(()=>{let t=class t{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=p(jD),this.afterRenderManager=p(Hp),this.zonelessEnabled=p(Rp),this.dirtyFlags=0,this.deferredDirtyFlags=0,this.externalTestViews=new Set,this.beforeRender=new de,this.afterTick=new de,this.componentTypes=[],this.components=[],this.isStable=p($t).hasPendingTasks.pipe(O(r=>!r)),this._injector=p($e)}get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}whenStable(){let r;return new Promise(o=>{r=this.isStable.subscribe({next:i=>{i&&o()}})}).finally(()=>{r.unsubscribe()})}get injector(){return this._injector}bootstrap(r,o){let i=r instanceof Fi;if(!this._injector.get(sg).done){let f=!i&&xf(r),g=!1;throw new w(405,g)}let a;i?a=r:a=this._injector.get(qn).resolveComponentFactory(r),this.componentTypes.push(a.componentType);let c=II(a)?void 0:this._injector.get(jt),u=o||a.selector,l=a.create(He.NULL,[],u,c),d=l.location.nativeElement,h=l.injector.get(rg,null);return h?.registerApplication(d),l.onDestroy(()=>{this.detachView(l.hostView),pi(this.components,l),h?.unregisterApplication(d)}),this._loadComponent(l),l}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){if(this._runningTick)throw new w(101,!1);let r=F(null);try{this._runningTick=!0,this.synchronize()}catch(o){this.internalErrorHandler(o)}finally{this._runningTick=!1,F(r),this.afterTick.next()}}synchronize(){let r=null;this._injector.destroyed||(r=this._injector.get(Wn,null,{optional:!0})),this.dirtyFlags|=this.deferredDirtyFlags,this.deferredDirtyFlags=0;let o=0;for(;this.dirtyFlags!==0&&o++<CI;)this.synchronizeOnce(r)}synchronizeOnce(r){if(this.dirtyFlags|=this.deferredDirtyFlags,this.deferredDirtyFlags=0,this.dirtyFlags&7){let o=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8,this.beforeRender.next(o);for(let{_lView:i,notifyErrorHandler:s}of this._views)MI(i,s,o,this.zonelessEnabled);if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&7)return}else r?.begin?.(),r?.end?.();this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:r})=>Yi(r))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(r){let o=r;this._views.push(o),o.attachToAppRef(this)}detachView(r){let o=r;pi(this._views,o),o.detachFromAppRef()}_loadComponent(r){this.attachView(r.hostView),this.tick(),this.components.push(r);let o=this._injector.get(sr,[]);[...this._bootstrapListeners,...o].forEach(i=>i(r))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(r=>r()),this._views.slice().forEach(r=>r.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(r){return this._destroyListeners.push(r),()=>pi(this._destroyListeners,r)}destroy(){if(this._destroyed)throw new w(406,!1);let r=this._injector;r.destroy&&!r.destroyed&&r.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function pi(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}var ai;function fs(e){ai??=new WeakMap;let t=ai.get(e);if(t)return t;let n=e.isStable.pipe(Qe(r=>r)).toPromise().then(()=>{});return ai.set(e,n),e.onDestroy(()=>ai?.delete(e)),n}function MI(e,t,n,r){if(!n&&!Yi(e))return;Sp(e,t,n&&!r?0:1)}var _c=class{constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Mu=(()=>{let t=class t{compileModuleSync(r){return new gc(r)}compileModuleAsync(r){return Promise.resolve(this.compileModuleSync(r))}compileModuleAndAllComponentsSync(r){let o=this.compileModuleSync(r),i=Tf(r),s=Uh(i.declarations).reduce((a,c)=>{let u=Lt(c);return u&&a.push(new Gn(u)),a},[]);return new _c(o,s)}compileModuleAndAllComponentsAsync(r){return Promise.resolve(this.compileModuleAndAllComponentsSync(r))}clearCache(){}clearCacheFor(r){}getModuleId(r){}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var xI=(()=>{let t=class t{constructor(){this.zone=p(Y),this.changeDetectionScheduler=p(zn),this.applicationRef=p(Dt)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function TI({ngZoneFactory:e,ignoreChangesOutsideZone:t,scheduleInRootZone:n}){return e??=()=>new Y(B(m({},_I()),{scheduleInRootZone:n})),[{provide:Y,useFactory:e},{provide:Xt,multi:!0,useFactory:()=>{let r=p(xI,{optional:!0});return()=>r.initialize()}},{provide:Xt,multi:!0,useFactory:()=>{let r=p(NI);return()=>{r.initialize()}}},t===!0?{provide:Op,useValue:!0}:[],{provide:Pp,useValue:n??bh}]}function _I(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var NI=(()=>{let t=class t{constructor(){this.subscription=new K,this.initialized=!1,this.zone=p(Y),this.pendingTasks=p($t)}initialize(){if(this.initialized)return;this.initialized=!0;let r=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(r=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Y.assertNotInAngularZone(),queueMicrotask(()=>{r!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(r),r=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Y.assertInAngularZone(),r??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var AI=(()=>{let t=class t{constructor(){this.appRef=p(Dt),this.taskService=p($t),this.ngZone=p(Y),this.zonelessEnabled=p(Rp),this.disableScheduling=p(Op,{optional:!0})??!1,this.zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run,this.schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}],this.subscriptions=new K,this.angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ti):null,this.scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(p(Pp,{optional:!0})??!1),this.cancelScheduledCallback=null,this.useMicrotaskScheduler=!1,this.runningTick=!1,this.pendingRenderTaskId=null,this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Za||!this.zoneIsDefined)}notify(r){if(!this.zonelessEnabled&&r===5)return;switch(r){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 7:{this.appRef.deferredDirtyFlags|=8;break}case 9:case 8:case 6:case 10:default:this.appRef.dirtyFlags|=8}if(!this.shouldScheduleTick())return;let o=this.useMicrotaskScheduler?Bd:wh;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>o(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>o(()=>this.tick()))}shouldScheduleTick(){return!(this.disableScheduling||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ti+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let r=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(o){throw this.taskService.remove(r),o}finally{this.cleanup()}this.useMicrotaskScheduler=!0,Bd(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(r)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let r=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(r)}}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function RI(){return typeof $localize<"u"&&$localize.locale||Ui}var xu=new C("",{providedIn:"root",factory:()=>p(xu,P.Optional|P.SkipSelf)||RI()});var ag=new C("");function ci(e){return!!e.platformInjector}function OI(e){let t=ci(e)?e.r3Injector:e.moduleRef.injector,n=t.get(Y);return n.run(()=>{ci(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=t.get(pt,null),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:i=>{r.handleError(i)}})}),ci(e)){let i=()=>t.destroy(),s=e.platformInjector.get(ag);s.add(i),t.onDestroy(()=>{o.unsubscribe(),s.delete(i)})}else e.moduleRef.onDestroy(()=>{pi(e.allPlatformModules,e.moduleRef),o.unsubscribe()});return SI(r,n,()=>{let i=t.get(sg);return i.runInitializers(),i.donePromise.then(()=>{let s=t.get(xu,Ui);if(aI(s||Ui),ci(e)){let a=t.get(Dt);return e.rootComponent!==void 0&&a.bootstrap(e.rootComponent),a}else return PI(e.moduleRef,e.allPlatformModules),e.moduleRef})})})}function PI(e,t){let n=e.injector.get(Dt);if(e._bootstrapComponents.length>0)e._bootstrapComponents.forEach(r=>n.bootstrap(r));else if(e.instance.ngDoBootstrap)e.instance.ngDoBootstrap(n);else throw new w(-403,!1);t.push(e)}var gi=null;function FI(e=[],t){return He.create({name:t,providers:[{provide:Wi,useValue:"platform"},{provide:ag,useValue:new Set([()=>gi=null])},...e]})}function kI(e=[]){if(gi)return gi;let t=FI(e);return gi=t,EI(),LI(t),t}function LI(e){e.get(nu,null)?.forEach(n=>n())}var ar=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=jI;let e=t;return e})();function jI(e){return VI(Ce(),L(),(e&16)===16)}function VI(e,t,n){if(Hr(e)&&!n){let r=Vt(e.index,t);return new an(r,r)}else if(e.type&175){let r=t[ye];return new an(r,t)}return null}function cg(e){try{let{rootComponent:t,appProviders:n,platformProviders:r}=e,o=kI(r),i=[TI({}),{provide:zn,useExisting:AI},...n||[]],s=new Li({providers:i,parent:o,debugName:"",runEnvironmentInitializers:!1});return OI({r3Injector:s.injector,platformInjector:o,rootComponent:t})}catch(t){return Promise.reject(t)}}var ug=new C("");var sf=!1;function BI(){sf||(sf=!0,ib(),nI(),pI(),iI(),CE(),cE(),Hw(),zb())}function $I(e,t){return fs(e)}function lg(){return Qn([{provide:oi,useFactory:()=>{let e=!0;return Nr()&&(e=!!p(tr,{optional:!0})?.get(Ph,null)),e&&rt("NgHydration"),e}},{provide:Xt,useValue:()=>{kw(!1),Nr()&&p(oi)&&(UI(),BI())},multi:!0},{provide:jh,useFactory:()=>Nr()&&p(oi)},{provide:sr,useFactory:()=>{if(Nr()&&p(oi)){let e=p(Dt),t=p(He);return()=>{$I(e,t).then(()=>{Bw(e)})}}return()=>{}},multi:!0}])}function UI(){let e=Ki(),t;for(let n of e.body.childNodes)if(n.nodeType===Node.COMMENT_NODE&&n.textContent?.trim()===rb){t=n;break}if(!t)throw new w(-507,!1)}function bt(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Z(e,t){rt("NgSignals");let n=Ul(e);return t?.equal&&(n[ct].equal=t.equal),n}function Ht(e){let t=F(null);try{return e()}finally{F(t)}}var HI=new C("",{providedIn:"root",factory:()=>p(zI)}),zI=(()=>{let t=class t{};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>new Nc});let e=t;return e})(),Nc=class{constructor(){this.queuedEffectCount=0,this.queues=new Map,this.pendingTasks=p($t),this.taskId=null}scheduleEffect(t){if(this.enqueue(t),this.taskId===null){let n=this.taskId=this.pendingTasks.add();queueMicrotask(()=>{this.flush(),this.pendingTasks.remove(n),this.taskId=null})}}enqueue(t){let n=t.creationZone;this.queues.has(n)||this.queues.set(n,new Set);let r=this.queues.get(n);r.has(t)||(this.queuedEffectCount++,r.add(t))}flush(){for(;this.queuedEffectCount>0;)for(let[t,n]of this.queues)t===null?this.flushQueue(n):t.run(()=>this.flushQueue(n))}flushQueue(t){for(let n of t)t.delete(n),this.queuedEffectCount--,n.run()}},Ac=class{constructor(t,n,r,o,i,s){this.scheduler=t,this.effectFn=n,this.creationZone=r,this.injector=i,this.watcher=Zl(a=>this.runEffect(a),()=>this.schedule(),s),this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}runEffect(t){try{this.effectFn(t)}catch(n){this.injector.get(pt,null,{optional:!0})?.handleError(n)}}run(){this.watcher.run()}schedule(){this.scheduler.scheduleEffect(this)}destroy(){this.watcher.destroy(),this.unregisterOnDestroy?.()}};function ot(e,t){rt("NgSignals"),!t?.injector&&Gi(ot);let n=t?.injector??p(He),r=t?.manualCleanup!==!0?n.get(un):null,o=new Ac(n.get(HI),e,typeof Zone>"u"?null:Zone.current,r,n,t?.allowSignalWrites??!1),i=n.get(ar,null,{optional:!0});return!i||!(i._lView[E]&8)?o.watcher.notify():(i._lView[li]??=[]).push(o.watcher.notify),o}function dg(e){let t=Lt(e);if(!t)return null;let n=new Gn(t);return{get selector(){return n.selector},get type(){return n.componentType},get inputs(){return n.inputs},get outputs(){return n.outputs},get ngContentSelectors(){return n.ngContentSelectors},get isStandalone(){return t.standalone},get isSignal(){return t.signals}}}var vg=null;function cr(){return vg}function yg(e){vg??=e}var hs=class{};var be=new C(""),Dg=(()=>{let t=class t{historyGo(r){throw new Error("")}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(WI),providedIn:"platform"});let e=t;return e})();var WI=(()=>{let t=class t extends Dg{constructor(){super(),this._doc=p(be),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return cr().getBaseHref(this._doc)}onPopState(r){let o=cr().getGlobalEventTarget(this._doc,"window");return o.addEventListener("popstate",r,!1),()=>o.removeEventListener("popstate",r)}onHashChange(r){let o=cr().getGlobalEventTarget(this._doc,"window");return o.addEventListener("hashchange",r,!1),()=>o.removeEventListener("hashchange",r)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(r){this._location.pathname=r}pushState(r,o,i){this._history.pushState(r,o,i)}replaceState(r,o,i){this._history.replaceState(r,o,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(r=0){this._history.go(r)}getState(){return this._history.state}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>new t,providedIn:"platform"});let e=t;return e})();function bg(e,t){if(e.length==0)return t;if(t.length==0)return e;let n=0;return e.endsWith("/")&&n++,t.startsWith("/")&&n++,n==2?e+t.substring(1):n==1?e+t:e+"/"+t}function fg(e){let t=e.match(/#|\?|$/),n=t&&t.index||e.length,r=n-(e[n-1]==="/"?1:0);return e.slice(0,r)+e.slice(n)}function dn(e){return e&&e[0]!=="?"?"?"+e:e}var ur=(()=>{let t=class t{historyGo(r){throw new Error("")}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(wg),providedIn:"root"});let e=t;return e})(),GI=new C(""),wg=(()=>{let t=class t extends ur{constructor(r,o){super(),this._platformLocation=r,this._removeListenerFns=[],this._baseHref=o??this._platformLocation.getBaseHrefFromDOM()??p(be).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(r){this._removeListenerFns.push(this._platformLocation.onPopState(r),this._platformLocation.onHashChange(r))}getBaseHref(){return this._baseHref}prepareExternalUrl(r){return bg(this._baseHref,r)}path(r=!1){let o=this._platformLocation.pathname+dn(this._platformLocation.search),i=this._platformLocation.hash;return i&&r?`${o}${i}`:o}pushState(r,o,i,s){let a=this.prepareExternalUrl(i+dn(s));this._platformLocation.pushState(r,o,a)}replaceState(r,o,i,s){let a=this.prepareExternalUrl(i+dn(s));this._platformLocation.replaceState(r,o,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(r=0){this._platformLocation.historyGo?.(r)}};t.\u0275fac=function(o){return new(o||t)(k(Dg),k(GI,8))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var no=(()=>{let t=class t{constructor(r){this._subject=new fe,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=r;let o=this._locationStrategy.getBaseHref();this._basePath=QI(fg(hg(o))),this._locationStrategy.onPopState(i=>{this._subject.emit({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(r=!1){return this.normalize(this._locationStrategy.path(r))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(r,o=""){return this.path()==this.normalize(r+dn(o))}normalize(r){return t.stripTrailingSlash(YI(this._basePath,hg(r)))}prepareExternalUrl(r){return r&&r[0]!=="/"&&(r="/"+r),this._locationStrategy.prepareExternalUrl(r)}go(r,o="",i=null){this._locationStrategy.pushState(i,"",r,o),this._notifyUrlChangeListeners(this.prepareExternalUrl(r+dn(o)),i)}replaceState(r,o="",i=null){this._locationStrategy.replaceState(i,"",r,o),this._notifyUrlChangeListeners(this.prepareExternalUrl(r+dn(o)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(r=0){this._locationStrategy.historyGo?.(r)}onUrlChange(r){return this._urlChangeListeners.push(r),this._urlChangeSubscription??=this.subscribe(o=>{this._notifyUrlChangeListeners(o.url,o.state)}),()=>{let o=this._urlChangeListeners.indexOf(r);this._urlChangeListeners.splice(o,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(r="",o){this._urlChangeListeners.forEach(i=>i(r,o))}subscribe(r,o,i){return this._subject.subscribe({next:r,error:o,complete:i})}};t.normalizeQueryParams=dn,t.joinWithSlash=bg,t.stripTrailingSlash=fg,t.\u0275fac=function(o){return new(o||t)(k(ur))},t.\u0275prov=D({token:t,factory:()=>ZI(),providedIn:"root"});let e=t;return e})();function ZI(){return new no(k(ur))}function YI(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function hg(e){return e.replace(/\/index.html$/,"")}function QI(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}function Au(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let r=n.indexOf("="),[o,i]=r==-1?[n,""]:[n.slice(0,r),n.slice(r+1)];if(o.trim()===t)return decodeURIComponent(i)}return null}var Ru="browser",KI="server";function JI(e){return e===Ru}function ro(e){return e===KI}var Eg=(()=>{let t=class t{};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>JI(p(nt))?new _u(p(be),window):new Nu});let e=t;return e})(),_u=class{constructor(t,n){this.document=t,this.window=n,this.offset=()=>[0,0]}setOffset(t){Array.isArray(t)?this.offset=()=>t:this.offset=t}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(t){this.window.scrollTo(t[0],t[1])}scrollToAnchor(t){let n=XI(this.document,t);n&&(this.scrollToElement(n),n.focus())}setHistoryScrollRestoration(t){this.window.history.scrollRestoration=t}scrollToElement(t){let n=t.getBoundingClientRect(),r=n.left+this.window.pageXOffset,o=n.top+this.window.pageYOffset,i=this.offset();this.window.scrollTo(r-i[0],o-i[1])}};function XI(e,t){let n=e.getElementById(t)||e.getElementsByName(t)[0];if(n)return n;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let r=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),o=r.currentNode;for(;o;){let i=o.shadowRoot;if(i){let s=i.getElementById(t)||i.querySelector(`[name="${t}"]`);if(s)return s}o=r.nextNode()}}return null}var Nu=class{setOffset(t){}getScrollPosition(){return[0,0]}scrollToPosition(t){}scrollToAnchor(t){}setHistoryScrollRestoration(t){}},ps=class{};var ms=class e{constructor(t){this.normalizedNames=new Map,this.lazyUpdate=null,t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(n=>{let r=n.indexOf(":");if(r>0){let o=n.slice(0,r),i=o.toLowerCase(),s=n.slice(r+1).trim();this.maybeSetNormalizedName(o,i),this.headers.has(i)?this.headers.get(i).push(s):this.headers.set(i,[s])}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((n,r)=>{this.setHeaderEntries(r,n)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([n,r])=>{this.setHeaderEntries(n,r)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let n=this.headers.get(t.toLowerCase());return n&&n.length>0?n[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,n){return this.clone({name:t,value:n,op:"a"})}set(t,n){return this.clone({name:t,value:n,op:"s"})}delete(t,n){return this.clone({name:t,value:n,op:"d"})}maybeSetNormalizedName(t,n){this.normalizedNames.has(n)||this.normalizedNames.set(n,t)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(n=>{this.headers.set(n,t.headers.get(n)),this.normalizedNames.set(n,t.normalizedNames.get(n))})}clone(t){let n=new e;return n.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,n.lazyUpdate=(this.lazyUpdate||[]).concat([t]),n}applyUpdate(t){let n=t.name.toLowerCase();switch(t.op){case"a":case"s":let r=t.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(t.name,n);let o=(t.op==="a"?this.headers.get(n):void 0)||[];o.push(...r),this.headers.set(n,o);break;case"d":let i=t.value;if(!i)this.headers.delete(n),this.normalizedNames.delete(n);else{let s=this.headers.get(n);if(!s)return;s=s.filter(a=>i.indexOf(a)===-1),s.length===0?(this.headers.delete(n),this.normalizedNames.delete(n)):this.headers.set(n,s)}break}}setHeaderEntries(t,n){let r=(Array.isArray(n)?n:[n]).map(i=>i.toString()),o=t.toLowerCase();this.headers.set(o,r),this.maybeSetNormalizedName(t,o)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(n=>t(this.normalizedNames.get(n),this.headers.get(n)))}};var Ng=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(Ng||{}),Ou=class{constructor(t,n=200,r="OK"){this.headers=t.headers||new ms,this.status=t.status!==void 0?t.status:n,this.statusText=t.statusText||r,this.url=t.url||null,this.ok=this.status>=200&&this.status<300}};var vs=class e extends Ou{constructor(t={}){super(t),this.type=Ng.Response,this.body=t.body!==void 0?t.body:null}clone(t={}){return new e({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}};var tC=new C("");var nC=new C(""),Ig="b",Cg="h",Sg="s",Mg="st",xg="u",Tg="rt",gs=new C(""),rC=["GET","HEAD"];function oC(e,t){let f=p(gs),{isCacheActive:n}=f,r=Rl(f,["isCacheActive"]),{transferCache:o,method:i}=e;if(!n||o===!1||i==="POST"&&!r.includePostRequests&&!o||i!=="POST"&&!rC.includes(i)||!r.includeRequestsWithAuthHeaders&&iC(e)||r.filter?.(e)===!1)return t(e);let s=p(tr),a=p(nC,{optional:!0}),c=ro(p(nt));if(a&&!c)throw new w(2803,!1);let u=c&&a?uC(e.url,a):e.url,l=aC(e,u),d=s.get(l,null),h=r.includeHeaders;if(typeof o=="object"&&o.includeHeaders&&(h=o.includeHeaders),d){let{[Ig]:g,[Tg]:v,[Cg]:S,[Sg]:M,[Mg]:W,[xg]:le}=d,ge=g;switch(v){case"arraybuffer":ge=new TextEncoder().encode(g).buffer;break;case"blob":ge=new Blob([g]);break}let Nt=new ms(S);return x(new vs({body:ge,headers:Nt,status:M,statusText:W,url:le}))}return t(e).pipe(te(g=>{g instanceof vs&&c&&s.set(l,{[Ig]:g.body,[Cg]:sC(g.headers,h),[Sg]:g.status,[Mg]:g.statusText,[xg]:u,[Tg]:e.responseType})}))}function iC(e){return e.headers.has("authorization")||e.headers.has("proxy-authorization")}function sC(e,t){if(!t)return{};let n={};for(let r of t){let o=e.getAll(r);o!==null&&(n[r]=o)}return n}function _g(e){return[...e.keys()].sort().map(t=>`${t}=${e.getAll(t)}`).join("&")}function aC(e,t){let{params:n,method:r,responseType:o}=e,i=_g(n),s=e.serializeBody();s instanceof URLSearchParams?s=_g(s):typeof s!="string"&&(s="");let a=[r,o,t,s,i].join("|"),c=cC(a);return c}function cC(e){let t=0;for(let n of e)t=Math.imul(31,t)+n.charCodeAt(0)<<0;return t+=2147483648,t.toString()}function Ag(e){return[{provide:gs,useFactory:()=>(rt("NgHttpTransferCache"),m({isCacheActive:!0},e))},{provide:tC,useValue:oC,multi:!0,deps:[tr,gs]},{provide:sr,multi:!0,useFactory:()=>{let t=p(Dt),n=p(gs);return()=>{fs(t).then(()=>{n.isCacheActive=!1})}}}]}function uC(e,t){let n=new URL(e,"resolve://").origin,r=t[n];return r?e.replace(n,r):e}var ku=class extends hs{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Lu=class e extends ku{static makeCurrent(){yg(new e)}onAndCancel(t,n,r){return t.addEventListener(n,r),()=>{t.removeEventListener(n,r)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.remove()}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=dC();return n==null?null:fC(n)}resetBaseElement(){oo=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Au(document.cookie,t)}},oo=null;function dC(){return oo=oo||document.querySelector("base"),oo?oo.getAttribute("href"):null}function fC(e){return new URL(e,document.baseURI).pathname}var hC=(()=>{let t=class t{build(){return new XMLHttpRequest}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),ys=new C(""),Fg=(()=>{let t=class t{constructor(r,o){this._zone=o,this._eventNameToPlugin=new Map,r.forEach(i=>{i.manager=this}),this._plugins=r.slice().reverse()}addEventListener(r,o,i){return this._findPluginFor(o).addEventListener(r,o,i)}getZone(){return this._zone}_findPluginFor(r){let o=this._eventNameToPlugin.get(r);if(o)return o;if(o=this._plugins.find(s=>s.supports(r)),!o)throw new w(5101,!1);return this._eventNameToPlugin.set(r,o),o}};t.\u0275fac=function(o){return new(o||t)(k(ys),k(Y))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),io=class{constructor(t){this._doc=t}},Pu="ng-app-id",kg=(()=>{let t=class t{constructor(r,o,i,s={}){this.doc=r,this.appId=o,this.nonce=i,this.platformId=s,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=ro(s),this.resetHostNodes()}addStyles(r){for(let o of r)this.changeUsageCount(o,1)===1&&this.onStyleAdded(o)}removeStyles(r){for(let o of r)this.changeUsageCount(o,-1)<=0&&this.onStyleRemoved(o)}ngOnDestroy(){let r=this.styleNodesInDOM;r&&(r.forEach(o=>o.remove()),r.clear());for(let o of this.getAllStyles())this.onStyleRemoved(o);this.resetHostNodes()}addHost(r){this.hostNodes.add(r);for(let o of this.getAllStyles())this.addStyleToHost(r,o)}removeHost(r){this.hostNodes.delete(r)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(r){for(let o of this.hostNodes)this.addStyleToHost(o,r)}onStyleRemoved(r){let o=this.styleRef;o.get(r)?.elements?.forEach(i=>i.remove()),o.delete(r)}collectServerRenderedStyles(){let r=this.doc.head?.querySelectorAll(`style[${Pu}="${this.appId}"]`);if(r?.length){let o=new Map;return r.forEach(i=>{i.textContent!=null&&o.set(i.textContent,i)}),o}return null}changeUsageCount(r,o){let i=this.styleRef;if(i.has(r)){let s=i.get(r);return s.usage+=o,s.usage}return i.set(r,{usage:o,elements:[]}),o}getStyleElement(r,o){let i=this.styleNodesInDOM,s=i?.get(o);if(s?.parentNode===r)return i.delete(o),s.removeAttribute(Pu),s;{let a=this.doc.createElement("style");return this.nonce&&a.setAttribute("nonce",this.nonce),a.textContent=o,this.platformIsServer&&a.setAttribute(Pu,this.appId),r.appendChild(a),a}}addStyleToHost(r,o){let i=this.getStyleElement(r,o),s=this.styleRef,a=s.get(o)?.elements;a?a.push(i):s.set(o,{elements:[i],usage:1})}resetHostNodes(){let r=this.hostNodes;r.clear(),r.add(this.doc.head)}};t.\u0275fac=function(o){return new(o||t)(k(be),k(Ji),k(ru,8),k(nt))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),Fu={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Bu=/%COMP%/g,Lg="%COMP%",pC=`_nghost-${Lg}`,gC=`_ngcontent-${Lg}`,mC=!0,vC=new C("",{providedIn:"root",factory:()=>mC});function yC(e){return gC.replace(Bu,e)}function DC(e){return pC.replace(Bu,e)}function jg(e,t){return t.map(n=>n.replace(Bu,e))}var Rg=(()=>{let t=class t{constructor(r,o,i,s,a,c,u,l=null){this.eventManager=r,this.sharedStylesHost=o,this.appId=i,this.removeStylesOnCompDestroy=s,this.doc=a,this.platformId=c,this.ngZone=u,this.nonce=l,this.rendererByCompId=new Map,this.platformIsServer=ro(c),this.defaultRenderer=new so(r,a,u,this.platformIsServer)}createRenderer(r,o){if(!r||!o)return this.defaultRenderer;this.platformIsServer&&o.encapsulation===ft.ShadowDom&&(o=B(m({},o),{encapsulation:ft.Emulated}));let i=this.getOrCreateRenderer(r,o);return i instanceof Ds?i.applyToHost(r):i instanceof ao&&i.applyStyles(),i}getOrCreateRenderer(r,o){let i=this.rendererByCompId,s=i.get(o.id);if(!s){let a=this.doc,c=this.ngZone,u=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,h=this.platformIsServer;switch(o.encapsulation){case ft.Emulated:s=new Ds(u,l,o,this.appId,d,a,c,h);break;case ft.ShadowDom:return new ju(u,l,r,o,a,c,this.nonce,h);default:s=new ao(u,l,o,d,a,c,h);break}i.set(o.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}};t.\u0275fac=function(o){return new(o||t)(k(Fg),k(kg),k(Ji),k(vC),k(be),k(nt),k(Y),k(ru))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),so=class{constructor(t,n,r,o){this.eventManager=t,this.doc=n,this.ngZone=r,this.platformIsServer=o,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(t,n){return n?this.doc.createElementNS(Fu[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(Og(t)?t.content:t).appendChild(n)}insertBefore(t,n,r){t&&(Og(t)?t.content:t).insertBefore(n,r)}removeChild(t,n){n.remove()}selectRootElement(t,n){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new w(-5104,!1);return n||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,r,o){if(o){n=o+":"+n;let i=Fu[o];i?t.setAttributeNS(i,n,r):t.setAttribute(n,r)}else t.setAttribute(n,r)}removeAttribute(t,n,r){if(r){let o=Fu[r];o?t.removeAttributeNS(o,n):t.removeAttribute(`${r}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,r,o){o&(Mt.DashCase|Mt.Important)?t.style.setProperty(n,r,o&Mt.Important?"important":""):t.style[n]=r}removeStyle(t,n,r){r&Mt.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,r){t!=null&&(t[n]=r)}setValue(t,n){t.nodeValue=n}listen(t,n,r){if(typeof t=="string"&&(t=cr().getGlobalEventTarget(this.doc,t),!t))throw new Error(`Unsupported event target ${t} for event ${n}`);return this.eventManager.addEventListener(t,n,this.decoratePreventDefault(r))}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;(this.platformIsServer?this.ngZone.runGuarded(()=>t(n)):t(n))===!1&&n.preventDefault()}}};function Og(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var ju=class extends so{constructor(t,n,r,o,i,s,a,c){super(t,i,s,c),this.sharedStylesHost=n,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=jg(o.id,o.styles);for(let l of u){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=l,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,r){return super.insertBefore(this.nodeOrShadowRoot(t),n,r)}removeChild(t,n){return super.removeChild(null,n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},ao=class extends so{constructor(t,n,r,o,i,s,a,c){super(t,i,s,a),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=o,this.styles=c?jg(c,r.styles):r.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},Ds=class extends ao{constructor(t,n,r,o,i,s,a,c){let u=o+"-"+r.id;super(t,n,r,i,s,a,c,u),this.contentAttr=yC(u),this.hostAttr=DC(u)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let r=super.createElement(t,n);return super.setAttribute(r,this.contentAttr,""),r}},bC=(()=>{let t=class t extends io{constructor(r){super(r)}supports(r){return!0}addEventListener(r,o,i){return r.addEventListener(o,i,!1),()=>this.removeEventListener(r,o,i)}removeEventListener(r,o,i){return r.removeEventListener(o,i)}};t.\u0275fac=function(o){return new(o||t)(k(be))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),wC=(()=>{let t=class t extends io{constructor(r){super(r),this.delegate=p(ug,{optional:!0})}supports(r){return this.delegate?this.delegate.supports(r):!1}addEventListener(r,o,i){return this.delegate.addEventListener(r,o,i)}removeEventListener(r,o,i){return this.delegate.removeEventListener(r,o,i)}};t.\u0275fac=function(o){return new(o||t)(k(be))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),Pg=["alt","control","meta","shift"],EC={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},IC={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},CC=(()=>{let t=class t extends io{constructor(r){super(r)}supports(r){return t.parseEventName(r)!=null}addEventListener(r,o,i){let s=t.parseEventName(o),a=t.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>cr().onAndCancel(r,s.domEventName,a))}static parseEventName(r){let o=r.toLowerCase().split("."),i=o.shift();if(o.length===0||!(i==="keydown"||i==="keyup"))return null;let s=t._normalizeKey(o.pop()),a="",c=o.indexOf("code");if(c>-1&&(o.splice(c,1),a="code."),Pg.forEach(l=>{let d=o.indexOf(l);d>-1&&(o.splice(d,1),a+=l+".")}),a+=s,o.length!=0||s.length===0)return null;let u={};return u.domEventName=i,u.fullKey=a,u}static matchEventFullKeyCode(r,o){let i=EC[r.key]||r.key,s="";return o.indexOf("code.")>-1&&(i=r.code,s="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),Pg.forEach(a=>{if(a!==i){let c=IC[a];c(r)&&(s+=a+".")}}),s+=i,s===o)}static eventCallback(r,o,i){return s=>{t.matchEventFullKeyCode(s,r)&&i.runGuarded(()=>o(s))}}static _normalizeKey(r){return r==="esc"?"escape":r}};t.\u0275fac=function(o){return new(o||t)(k(be))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function Vg(e,t){return cg(m({rootComponent:e},SC(t)))}function SC(e){return{appProviders:[...NC,...e?.providers??[]],platformProviders:_C}}function MC(){Lu.makeCurrent()}function xC(){return new pt}function TC(){return _h(document),document}var _C=[{provide:nt,useValue:Ru},{provide:nu,useValue:MC,multi:!0},{provide:be,useFactory:TC,deps:[]}];var NC=[{provide:Wi,useValue:"root"},{provide:pt,useFactory:xC,deps:[]},{provide:ys,useClass:bC,multi:!0,deps:[be,Y,nt]},{provide:ys,useClass:CC,multi:!0,deps:[be]},{provide:ys,useClass:wC,multi:!0},Rg,kg,Fg,{provide:Wn,useExisting:Rg},{provide:ps,useClass:hC,deps:[]},[]];var Bg=(()=>{let t=class t{constructor(r){this._doc=r}getTitle(){return this._doc.title}setTitle(r){this._doc.title=r||""}};t.\u0275fac=function(o){return new(o||t)(k(be))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var Vu=function(e){return e[e.NoHttpTransferCache=0]="NoHttpTransferCache",e[e.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",e[e.I18nSupport=2]="I18nSupport",e[e.EventReplay=3]="EventReplay",e}(Vu||{});function $g(...e){let t=[],n=new Set,r=n.has(Vu.HttpTransferCacheOptions);for(let{\u0275providers:o,\u0275kind:i}of e)n.add(i),o.length&&t.push(o);return Qn([[],lg(),n.has(Vu.NoHttpTransferCache)||r?[]:Ag({}),t])}var N="primary",Io=Symbol("RouteTitle"),qu=class{constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function gr(e){return new qu(e)}function RC(e,t,n){let r=n.path.split("/");if(r.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||r.length<e.length))return null;let o={};for(let i=0;i<r.length;i++){let s=r[i],a=e[i];if(s[0]===":")o[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:e.slice(0,r.length),posParams:o}}function OC(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!wt(e[n],t[n]))return!1;return!0}function wt(e,t){let n=e?Wu(e):void 0,r=t?Wu(t):void 0;if(!n||!r||n.length!=r.length)return!1;let o;for(let i=0;i<n.length;i++)if(o=n[i],!Qg(e[o],t[o]))return!1;return!0}function Wu(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Qg(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),r=[...t].sort();return n.every((o,i)=>r[i]===o)}else return e===t}function Kg(e){return e.length>0?e[e.length-1]:null}function qt(e){return ca(e)?e:to(e)?J(Promise.resolve(e)):x(e)}var PC={exact:Xg,subset:em},Jg={exact:FC,subset:kC,ignored:()=>!0};function Ug(e,t,n){return PC[n.paths](e.root,t.root,n.matrixParams)&&Jg[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function FC(e,t){return wt(e,t)}function Xg(e,t,n){if(!hn(e.segments,t.segments)||!Es(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!e.children[r]||!Xg(e.children[r],t.children[r],n))return!1;return!0}function kC(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>Qg(e[n],t[n]))}function em(e,t,n){return tm(e,t,t.segments,n)}function tm(e,t,n,r){if(e.segments.length>n.length){let o=e.segments.slice(0,n.length);return!(!hn(o,n)||t.hasChildren()||!Es(o,n,r))}else if(e.segments.length===n.length){if(!hn(e.segments,n)||!Es(e.segments,n,r))return!1;for(let o in t.children)if(!e.children[o]||!em(e.children[o],t.children[o],r))return!1;return!0}else{let o=n.slice(0,e.segments.length),i=n.slice(e.segments.length);return!hn(e.segments,o)||!Es(e.segments,o,r)||!e.children[N]?!1:tm(e.children[N],t,i,r)}}function Es(e,t,n){return t.every((r,o)=>Jg[n](e[o].parameters,r.parameters))}var _t=class{constructor(t=new $([],{}),n={},r=null){this.root=t,this.queryParams=n,this.fragment=r}get queryParamMap(){return this._queryParamMap??=gr(this.queryParams),this._queryParamMap}toString(){return VC.serialize(this)}},$=class{constructor(t,n){this.segments=t,this.children=n,this.parent=null,Object.values(n).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Is(this)}},fn=class{constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=gr(this.parameters),this._parameterMap}toString(){return rm(this)}};function LC(e,t){return hn(e,t)&&e.every((n,r)=>wt(n.parameters,t[r].parameters))}function hn(e,t){return e.length!==t.length?!1:e.every((n,r)=>n.path===t[r].path)}function jC(e,t){let n=[];return Object.entries(e.children).forEach(([r,o])=>{r===N&&(n=n.concat(t(o,r)))}),Object.entries(e.children).forEach(([r,o])=>{r!==N&&(n=n.concat(t(o,r)))}),n}var ks=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>new go,providedIn:"root"});let e=t;return e})(),go=class{parse(t){let n=new Zu(t);return new _t(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${co(t.root,!0)}`,r=UC(t.queryParams),o=typeof t.fragment=="string"?`#${BC(t.fragment)}`:"";return`${n}${r}${o}`}},VC=new go;function Is(e){return e.segments.map(t=>rm(t)).join("/")}function co(e,t){if(!e.hasChildren())return Is(e);if(t){let n=e.children[N]?co(e.children[N],!1):"",r=[];return Object.entries(e.children).forEach(([o,i])=>{o!==N&&r.push(`${o}:${co(i,!1)}`)}),r.length>0?`${n}(${r.join("//")})`:n}else{let n=jC(e,(r,o)=>o===N?[co(e.children[N],!1)]:[`${o}:${co(r,!1)}`]);return Object.keys(e.children).length===1&&e.children[N]!=null?`${Is(e)}/${n[0]}`:`${Is(e)}/(${n.join("//")})`}}function nm(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function bs(e){return nm(e).replace(/%3B/gi,";")}function BC(e){return encodeURI(e)}function Gu(e){return nm(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Cs(e){return decodeURIComponent(e)}function Hg(e){return Cs(e.replace(/\+/g,"%20"))}function rm(e){return`${Gu(e.path)}${$C(e.parameters)}`}function $C(e){return Object.entries(e).map(([t,n])=>`;${Gu(t)}=${Gu(n)}`).join("")}function UC(e){let t=Object.entries(e).map(([n,r])=>Array.isArray(r)?r.map(o=>`${bs(n)}=${bs(o)}`).join("&"):`${bs(n)}=${bs(r)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var HC=/^[^\/()?;#]+/;function $u(e){let t=e.match(HC);return t?t[0]:""}var zC=/^[^\/()?;=#]+/;function qC(e){let t=e.match(zC);return t?t[0]:""}var WC=/^[^=?&#]+/;function GC(e){let t=e.match(WC);return t?t[0]:""}var ZC=/^[^&#]+/;function YC(e){let t=e.match(ZC);return t?t[0]:""}var Zu=class{constructor(t){this.url=t,this.remaining=t}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new $([],{}):new $([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1)),(t.length>0||Object.keys(n).length>0)&&(r[N]=new $(t,n)),r}parseSegment(){let t=$u(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new w(4009,!1);return this.capture(t),new fn(Cs(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=qC(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let o=$u(this.remaining);o&&(r=o,this.capture(r))}t[Cs(n)]=Cs(r)}parseQueryParam(t){let n=GC(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let s=YC(this.remaining);s&&(r=s,this.capture(r))}let o=Hg(n),i=Hg(r);if(t.hasOwnProperty(o)){let s=t[o];Array.isArray(s)||(s=[s],t[o]=s),s.push(i)}else t[o]=i}parseParens(t){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=$u(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new w(4010,!1);let i;r.indexOf(":")>-1?(i=r.slice(0,r.indexOf(":")),this.capture(i),this.capture(":")):t&&(i=N);let s=this.parseChildren();n[i]=Object.keys(s).length===1?s[N]:new $([],s),this.consumeOptional("//")}return n}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new w(4011,!1)}};function om(e){return e.segments.length>0?new $([],{[N]:e}):e}function im(e){let t={};for(let[r,o]of Object.entries(e.children)){let i=im(o);if(r===N&&i.segments.length===0&&i.hasChildren())for(let[s,a]of Object.entries(i.children))t[s]=a;else(i.segments.length>0||i.hasChildren())&&(t[r]=i)}let n=new $(e.segments,t);return QC(n)}function QC(e){if(e.numberOfChildren===1&&e.children[N]){let t=e.children[N];return new $(e.segments.concat(t.segments),t.children)}return e}function pn(e){return e instanceof _t}function KC(e,t,n=null,r=null){let o=sm(e);return am(o,t,n,r)}function sm(e){let t;function n(i){let s={};for(let c of i.children){let u=n(c);s[c.outlet]=u}let a=new $(i.url,s);return i===e&&(t=a),a}let r=n(e.root),o=om(r);return t??o}function am(e,t,n,r){let o=e;for(;o.parent;)o=o.parent;if(t.length===0)return Uu(o,o,o,n,r);let i=JC(t);if(i.toRoot())return Uu(o,o,new $([],{}),n,r);let s=XC(i,o,e),a=s.processChildren?fo(s.segmentGroup,s.index,i.commands):um(s.segmentGroup,s.index,i.commands);return Uu(o,s.segmentGroup,a,n,r)}function Ss(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function mo(e){return typeof e=="object"&&e!=null&&e.outlets}function Uu(e,t,n,r,o){let i={};r&&Object.entries(r).forEach(([c,u])=>{i[c]=Array.isArray(u)?u.map(l=>`${l}`):`${u}`});let s;e===t?s=n:s=cm(e,t,n);let a=om(im(s));return new _t(a,i,o)}function cm(e,t,n){let r={};return Object.entries(e.children).forEach(([o,i])=>{i===t?r[o]=n:r[o]=cm(i,t,n)}),new $(e.segments,r)}var Ms=class{constructor(t,n,r){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=r,t&&r.length>0&&Ss(r[0]))throw new w(4003,!1);let o=r.find(mo);if(o&&o!==Kg(r))throw new w(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function JC(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new Ms(!0,0,e);let t=0,n=!1,r=e.reduce((o,i,s)=>{if(typeof i=="object"&&i!=null){if(i.outlets){let a={};return Object.entries(i.outlets).forEach(([c,u])=>{a[c]=typeof u=="string"?u.split("/"):u}),[...o,{outlets:a}]}if(i.segmentPath)return[...o,i.segmentPath]}return typeof i!="string"?[...o,i]:s===0?(i.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?n=!0:a===".."?t++:a!=""&&o.push(a))}),o):[...o,i]},[]);return new Ms(n,t,r)}var fr=class{constructor(t,n,r){this.segmentGroup=t,this.processChildren=n,this.index=r}};function XC(e,t,n){if(e.isAbsolute)return new fr(t,!0,0);if(!n)return new fr(t,!1,NaN);if(n.parent===null)return new fr(n,!0,0);let r=Ss(e.commands[0])?0:1,o=n.segments.length-1+r;return e0(n,o,e.numberOfDoubleDots)}function e0(e,t,n){let r=e,o=t,i=n;for(;i>o;){if(i-=o,r=r.parent,!r)throw new w(4005,!1);o=r.segments.length}return new fr(r,!1,o-i)}function t0(e){return mo(e[0])?e[0].outlets:{[N]:e}}function um(e,t,n){if(e??=new $([],{}),e.segments.length===0&&e.hasChildren())return fo(e,t,n);let r=n0(e,t,n),o=n.slice(r.commandIndex);if(r.match&&r.pathIndex<e.segments.length){let i=new $(e.segments.slice(0,r.pathIndex),{});return i.children[N]=new $(e.segments.slice(r.pathIndex),e.children),fo(i,0,o)}else return r.match&&o.length===0?new $(e.segments,{}):r.match&&!e.hasChildren()?Yu(e,t,n):r.match?fo(e,0,o):Yu(e,t,n)}function fo(e,t,n){if(n.length===0)return new $(e.segments,{});{let r=t0(n),o={};if(Object.keys(r).some(i=>i!==N)&&e.children[N]&&e.numberOfChildren===1&&e.children[N].segments.length===0){let i=fo(e.children[N],t,n);return new $(e.segments,i.children)}return Object.entries(r).forEach(([i,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(o[i]=um(e.children[i],t,s))}),Object.entries(e.children).forEach(([i,s])=>{r[i]===void 0&&(o[i]=s)}),new $(e.segments,o)}}function n0(e,t,n){let r=0,o=t,i={match:!1,pathIndex:0,commandIndex:0};for(;o<e.segments.length;){if(r>=n.length)return i;let s=e.segments[o],a=n[r];if(mo(a))break;let c=`${a}`,u=r<n.length-1?n[r+1]:null;if(o>0&&c===void 0)break;if(c&&u&&typeof u=="object"&&u.outlets===void 0){if(!qg(c,u,s))return i;r+=2}else{if(!qg(c,{},s))return i;r++}o++}return{match:!0,pathIndex:o,commandIndex:r}}function Yu(e,t,n){let r=e.segments.slice(0,t),o=0;for(;o<n.length;){let i=n[o];if(mo(i)){let c=r0(i.outlets);return new $(r,c)}if(o===0&&Ss(n[0])){let c=e.segments[t];r.push(new fn(c.path,zg(n[0]))),o++;continue}let s=mo(i)?i.outlets[N]:`${i}`,a=o<n.length-1?n[o+1]:null;s&&a&&Ss(a)?(r.push(new fn(s,zg(a))),o+=2):(r.push(new fn(s,{})),o++)}return new $(r,{})}function r0(e){let t={};return Object.entries(e).forEach(([n,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[n]=Yu(new $([],{}),0,r))}),t}function zg(e){let t={};return Object.entries(e).forEach(([n,r])=>t[n]=`${r}`),t}function qg(e,t,n){return e==n.path&&wt(t,n.parameters)}var ho="imperative",ie=function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e}(ie||{}),Ge=class{constructor(t,n){this.id=t,this.url=n}},mr=class extends Ge{constructor(t,n,r="imperative",o=null){super(t,n),this.type=ie.NavigationStart,this.navigationTrigger=r,this.restoredState=o}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},st=class extends Ge{constructor(t,n,r){super(t,n),this.urlAfterRedirects=r,this.type=ie.NavigationEnd}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},je=function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e}(je||{}),xs=function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e}(xs||{}),Tt=class extends Ge{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ie.NavigationCancel}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},zt=class extends Ge{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ie.NavigationSkipped}},vo=class extends Ge{constructor(t,n,r,o){super(t,n),this.error=r,this.target=o,this.type=ie.NavigationError}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ts=class extends Ge{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ie.RoutesRecognized}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Qu=class extends Ge{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ie.GuardsCheckStart}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ku=class extends Ge{constructor(t,n,r,o,i){super(t,n),this.urlAfterRedirects=r,this.state=o,this.shouldActivate=i,this.type=ie.GuardsCheckEnd}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Ju=class extends Ge{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ie.ResolveStart}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Xu=class extends Ge{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ie.ResolveEnd}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},el=class{constructor(t){this.route=t,this.type=ie.RouteConfigLoadStart}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},tl=class{constructor(t){this.route=t,this.type=ie.RouteConfigLoadEnd}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},nl=class{constructor(t){this.snapshot=t,this.type=ie.ChildActivationStart}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},rl=class{constructor(t){this.snapshot=t,this.type=ie.ChildActivationEnd}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},ol=class{constructor(t){this.snapshot=t,this.type=ie.ActivationStart}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},il=class{constructor(t){this.snapshot=t,this.type=ie.ActivationEnd}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},_s=class{constructor(t,n,r){this.routerEvent=t,this.position=n,this.anchor=r,this.type=ie.Scroll}toString(){let t=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${t}')`}},yo=class{},vr=class{constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};function o0(e,t){return e.providers&&!e._injector&&(e._injector=wu(e.providers,t,`Route: ${e.path}`)),e._injector??t}function it(e){return e.outlet||N}function i0(e,t){let n=e.filter(r=>it(r)===t);return n.push(...e.filter(r=>it(r)!==t)),n}function Co(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let t=e.parent;t;t=t.parent){let n=t.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var sl=class{get injector(){return Co(this.route?.snapshot)??this.rootInjector}set injector(t){}constructor(t){this.rootInjector=t,this.outlet=null,this.route=null,this.children=new Ls(this.rootInjector),this.attachRef=null}},Ls=(()=>{let t=class t{constructor(r){this.rootInjector=r,this.contexts=new Map}onChildOutletCreated(r,o){let i=this.getOrCreateContext(r);i.outlet=o,this.contexts.set(r,i)}onChildOutletDestroyed(r){let o=this.getContext(r);o&&(o.outlet=null,o.attachRef=null)}onOutletDeactivated(){let r=this.contexts;return this.contexts=new Map,r}onOutletReAttached(r){this.contexts=r}getOrCreateContext(r){let o=this.getContext(r);return o||(o=new sl(this.rootInjector),this.contexts.set(r,o)),o}getContext(r){return this.contexts.get(r)||null}};t.\u0275fac=function(o){return new(o||t)(k($e))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),Ns=class{constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=al(t,this._root);return n?n.children.map(r=>r.value):[]}firstChild(t){let n=al(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=cl(t,this._root);return n.length<2?[]:n[n.length-2].children.map(o=>o.value).filter(o=>o!==t)}pathFromRoot(t){return cl(t,this._root).map(n=>n.value)}};function al(e,t){if(e===t.value)return t;for(let n of t.children){let r=al(e,n);if(r)return r}return null}function cl(e,t){if(e===t.value)return[t];for(let n of t.children){let r=cl(e,n);if(r.length)return r.unshift(t),r}return[]}var Le=class{constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function dr(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var As=class extends Ns{constructor(t,n){super(t),this.snapshot=n,vl(this,t)}toString(){return this.snapshot.toString()}};function lm(e){let t=s0(e),n=new se([new fn("",{})]),r=new se({}),o=new se({}),i=new se({}),s=new se(""),a=new at(n,r,i,s,o,N,e,t.root);return a.snapshot=t.root,new As(new Le(a,[]),t)}function s0(e){let t={},n={},r={},o="",i=new hr([],t,r,o,n,N,e,null,{});return new Os("",new Le(i,[]))}var at=class{constructor(t,n,r,o,i,s,a,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=r,this.fragmentSubject=o,this.dataSubject=i,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(O(u=>u[Io]))??x(void 0),this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(O(t=>gr(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(O(t=>gr(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Rs(e,t,n="emptyOnly"){let r,{routeConfig:o}=e;return t!==null&&(n==="always"||o?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:m(m({},t.params),e.params),data:m(m({},t.data),e.data),resolve:m(m(m(m({},e.data),t.data),o?.data),e._resolvedData)}:r={params:m({},e.params),data:m({},e.data),resolve:m(m({},e.data),e._resolvedData??{})},o&&fm(o)&&(r.resolve[Io]=o.title),r}var hr=class{get title(){return this.data?.[Io]}constructor(t,n,r,o,i,s,a,c,u){this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=gr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=gr(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},Os=class extends Ns{constructor(t,n){super(n),this.url=t,vl(this,n)}toString(){return dm(this._root)}};function vl(e,t){t.value._routerState=e,t.children.forEach(n=>vl(e,n))}function dm(e){let t=e.children.length>0?` { ${e.children.map(dm).join(", ")} } `:"";return`${e.value}${t}`}function Hu(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,wt(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),wt(t.params,n.params)||e.paramsSubject.next(n.params),OC(t.url,n.url)||e.urlSubject.next(n.url),wt(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function ul(e,t){let n=wt(e.params,t.params)&&LC(e.url,t.url),r=!e.parent!=!t.parent;return n&&!r&&(!e.parent||ul(e.parent,t.parent))}function fm(e){return typeof e.title=="string"||e.title===null}var yl=(()=>{let t=class t{constructor(){this.activated=null,this._activatedRoute=null,this.name=N,this.activateEvents=new fe,this.deactivateEvents=new fe,this.attachEvents=new fe,this.detachEvents=new fe,this.parentContexts=p(Ls),this.location=p(rr),this.changeDetector=p(ar),this.inputBinder=p(js,{optional:!0}),this.supportsBindingToComponentInputs=!0}get activatedComponentRef(){return this.activated}ngOnChanges(r){if(r.name){let{firstChange:o,previousValue:i}=r.name;if(o)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(r){return this.parentContexts.getContext(r)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let r=this.parentContexts.getContext(this.name);r?.route&&(r.attachRef?this.attach(r.attachRef,r.route):this.activateWith(r.route,r.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new w(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new w(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new w(4012,!1);this.location.detach();let r=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(r.instance),r}attach(r,o){this.activated=r,this._activatedRoute=o,this.location.insert(r.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(r.instance)}deactivate(){if(this.activated){let r=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(r)}}activateWith(r,o){if(this.isActivated)throw new w(4013,!1);this._activatedRoute=r;let i=this.location,a=r.snapshot.component,c=this.parentContexts.getOrCreateContext(this.name).children,u=new ll(r,c,i.injector);this.activated=i.createComponent(a,{index:i.length,injector:u,environmentInjector:o}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275dir=Yn({type:t,selectors:[["router-outlet"]],inputs:{name:"name"},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],standalone:!0,features:[zr]});let e=t;return e})(),ll=class e{__ngOutletInjector(t){return new e(this.route,this.childContexts,t)}constructor(t,n,r){this.route=t,this.childContexts=n,this.parent=r}get(t,n){return t===at?this.route:t===Ls?this.childContexts:this.parent.get(t,n)}},js=new C(""),Wg=(()=>{let t=class t{constructor(){this.outletDataSubscriptions=new Map}bindActivatedRouteToOutletComponent(r){this.unsubscribeFromRouteData(r),this.subscribeToRouteData(r)}unsubscribeFromRouteData(r){this.outletDataSubscriptions.get(r)?.unsubscribe(),this.outletDataSubscriptions.delete(r)}subscribeToRouteData(r){let{activatedRoute:o}=r,i=_r([o.queryParams,o.params,o.data]).pipe(_e(([s,a,c],u)=>(c=m(m(m({},s),a),c),u===0?x(c):Promise.resolve(c)))).subscribe(s=>{if(!r.isActivated||!r.activatedComponentRef||r.activatedRoute!==o||o.component===null){this.unsubscribeFromRouteData(r);return}let a=dg(o.component);if(!a){this.unsubscribeFromRouteData(r);return}for(let{templateName:c}of a.inputs)r.activatedComponentRef.setInput(c,s[c])});this.outletDataSubscriptions.set(r,i)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function a0(e,t,n){let r=Do(e,t._root,n?n._root:void 0);return new As(r,t)}function Do(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let r=n.value;r._futureSnapshot=t.value;let o=c0(e,t,n);return new Le(r,o)}else{if(e.shouldAttach(t.value)){let i=e.retrieve(t.value);if(i!==null){let s=i.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>Do(e,a)),s}}let r=u0(t.value),o=t.children.map(i=>Do(e,i));return new Le(r,o)}}function c0(e,t,n){return t.children.map(r=>{for(let o of n.children)if(e.shouldReuseRoute(r.value,o.value.snapshot))return Do(e,r,o);return Do(e,r)})}function u0(e){return new at(new se(e.url),new se(e.params),new se(e.queryParams),new se(e.fragment),new se(e.data),e.outlet,e.component,e)}var bo=class{constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},hm="ngNavigationCancelingError";function Ps(e,t){let{redirectTo:n,navigationBehaviorOptions:r}=pn(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,o=pm(!1,je.Redirect);return o.url=n,o.navigationBehaviorOptions=r,o}function pm(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[hm]=!0,n.cancellationCode=t,n}function l0(e){return gm(e)&&pn(e.url)}function gm(e){return!!e&&e[hm]}var d0=(e,t,n,r)=>O(o=>(new dl(t,o.targetRouterState,o.currentRouterState,n,r).activate(e),o)),dl=class{constructor(t,n,r,o,i){this.routeReuseStrategy=t,this.futureState=n,this.currState=r,this.forwardEvent=o,this.inputBindingEnabled=i}activate(t){let n=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,r,t),Hu(this.futureState.root),this.activateChildRoutes(n,r,t)}deactivateChildRoutes(t,n,r){let o=dr(n);t.children.forEach(i=>{let s=i.value.outlet;this.deactivateRoutes(i,o[s],r),delete o[s]}),Object.values(o).forEach(i=>{this.deactivateRouteAndItsChildren(i,r)})}deactivateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(o===i)if(o.component){let s=r.getContext(o.outlet);s&&this.deactivateChildRoutes(t,n,s.children)}else this.deactivateChildRoutes(t,n,r);else i&&this.deactivateRouteAndItsChildren(n,r)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=dr(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=dr(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,n,r){let o=dr(n);t.children.forEach(i=>{this.activateRoutes(i,o[i.value.outlet],r),this.forwardEvent(new il(i.value.snapshot))}),t.children.length&&this.forwardEvent(new rl(t.value.snapshot))}activateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(Hu(o),o===i)if(o.component){let s=r.getOrCreateContext(o.outlet);this.activateChildRoutes(t,n,s.children)}else this.activateChildRoutes(t,n,r);else if(o.component){let s=r.getOrCreateContext(o.outlet);if(this.routeReuseStrategy.shouldAttach(o.snapshot)){let a=this.routeReuseStrategy.retrieve(o.snapshot);this.routeReuseStrategy.store(o.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Hu(a.route.value),this.activateChildRoutes(t,null,s.children)}else s.attachRef=null,s.route=o,s.outlet&&s.outlet.activateWith(o,s.injector),this.activateChildRoutes(t,null,s.children)}else this.activateChildRoutes(t,null,r)}},Fs=class{constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},pr=class{constructor(t,n){this.component=t,this.route=n}};function f0(e,t,n){let r=e._root,o=t?t._root:null;return uo(r,o,n,[r.value])}function h0(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function Dr(e,t){let n=Symbol(),r=t.get(e,n);return r===n?typeof e=="function"&&!ff(e)?e:t.get(e):r}function uo(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=dr(t);return e.children.forEach(s=>{p0(s,i[s.value.outlet],n,r.concat([s.value]),o),delete i[s.value.outlet]}),Object.entries(i).forEach(([s,a])=>po(a,n.getContext(s),o)),o}function p0(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=e.value,s=t?t.value:null,a=n?n.getContext(e.value.outlet):null;if(s&&i.routeConfig===s.routeConfig){let c=g0(s,i,i.routeConfig.runGuardsAndResolvers);c?o.canActivateChecks.push(new Fs(r)):(i.data=s.data,i._resolvedData=s._resolvedData),i.component?uo(e,t,a?a.children:null,r,o):uo(e,t,n,r,o),c&&a&&a.outlet&&a.outlet.isActivated&&o.canDeactivateChecks.push(new pr(a.outlet.component,s))}else s&&po(t,a,o),o.canActivateChecks.push(new Fs(r)),i.component?uo(e,null,a?a.children:null,r,o):uo(e,null,n,r,o);return o}function g0(e,t,n){if(typeof n=="function")return n(e,t);switch(n){case"pathParamsChange":return!hn(e.url,t.url);case"pathParamsOrQueryParamsChange":return!hn(e.url,t.url)||!wt(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!ul(e,t)||!wt(e.queryParams,t.queryParams);case"paramsChange":default:return!ul(e,t)}}function po(e,t,n){let r=dr(e),o=e.value;Object.entries(r).forEach(([i,s])=>{o.component?t?po(s,t.children.getContext(i),n):po(s,null,n):po(s,t,n)}),o.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new pr(t.outlet.component,o)):n.canDeactivateChecks.push(new pr(null,o)):n.canDeactivateChecks.push(new pr(null,o))}function So(e){return typeof e=="function"}function m0(e){return typeof e=="boolean"}function v0(e){return e&&So(e.canLoad)}function y0(e){return e&&So(e.canActivate)}function D0(e){return e&&So(e.canActivateChild)}function b0(e){return e&&So(e.canDeactivate)}function w0(e){return e&&So(e.canMatch)}function mm(e){return e instanceof Et||e?.name==="EmptyError"}var ws=Symbol("INITIAL_VALUE");function yr(){return _e(e=>_r(e.map(t=>t.pipe(It(1),ha(ws)))).pipe(O(t=>{for(let n of t)if(n!==!0){if(n===ws)return ws;if(n===!1||E0(n))return n}return!0}),me(t=>t!==ws),It(1)))}function E0(e){return pn(e)||e instanceof bo}function I0(e,t){return ee(n=>{let{targetSnapshot:r,currentSnapshot:o,guards:{canActivateChecks:i,canDeactivateChecks:s}}=n;return s.length===0&&i.length===0?x(B(m({},n),{guardsResult:!0})):C0(s,r,o,e).pipe(ee(a=>a&&m0(a)?S0(r,i,e,t):x(a)),O(a=>B(m({},n),{guardsResult:a})))})}function C0(e,t,n,r){return J(e).pipe(ee(o=>N0(o.component,o.route,n,t,r)),Qe(o=>o!==!0,!0))}function S0(e,t,n,r){return J(t).pipe(Yt(o=>xn(x0(o.route.parent,r),M0(o.route,r),_0(e,o.path,n),T0(e,o.route,n))),Qe(o=>o!==!0,!0))}function M0(e,t){return e!==null&&t&&t(new ol(e)),x(!0)}function x0(e,t){return e!==null&&t&&t(new nl(e)),x(!0)}function T0(e,t,n){let r=t.routeConfig?t.routeConfig.canActivate:null;if(!r||r.length===0)return x(!0);let o=r.map(i=>ni(()=>{let s=Co(t)??n,a=Dr(i,s),c=y0(a)?a.canActivate(t,e):mt(s,()=>a(t,e));return qt(c).pipe(Qe())}));return x(o).pipe(yr())}function _0(e,t,n){let r=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(s=>h0(s)).filter(s=>s!==null).map(s=>ni(()=>{let a=s.guards.map(c=>{let u=Co(s.node)??n,l=Dr(c,u),d=D0(l)?l.canActivateChild(r,e):mt(u,()=>l(r,e));return qt(d).pipe(Qe())});return x(a).pipe(yr())}));return x(i).pipe(yr())}function N0(e,t,n,r,o){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return x(!0);let s=i.map(a=>{let c=Co(t)??o,u=Dr(a,c),l=b0(u)?u.canDeactivate(e,t,n,r):mt(c,()=>u(e,t,n,r));return qt(l).pipe(Qe())});return x(s).pipe(yr())}function A0(e,t,n,r){let o=t.canLoad;if(o===void 0||o.length===0)return x(!0);let i=o.map(s=>{let a=Dr(s,e),c=v0(a)?a.canLoad(t,n):mt(e,()=>a(t,n));return qt(c)});return x(i).pipe(yr(),vm(r))}function vm(e){return oa(te(t=>{if(typeof t!="boolean")throw Ps(e,t)}),O(t=>t===!0))}function R0(e,t,n,r){let o=t.canMatch;if(!o||o.length===0)return x(!0);let i=o.map(s=>{let a=Dr(s,e),c=w0(a)?a.canMatch(t,n):mt(e,()=>a(t,n));return qt(c)});return x(i).pipe(yr(),vm(r))}var wo=class{constructor(t){this.segmentGroup=t||null}},Eo=class extends Error{constructor(t){super(),this.urlTree=t}};function lr(e){return Mn(new wo(e))}function O0(e){return Mn(new w(4e3,!1))}function P0(e){return Mn(pm(!1,je.GuardRejected))}var fl=class{constructor(t,n){this.urlSerializer=t,this.urlTree=n}lineralizeSegments(t,n){let r=[],o=n.root;for(;;){if(r=r.concat(o.segments),o.numberOfChildren===0)return x(r);if(o.numberOfChildren>1||!o.children[N])return O0(`${t.redirectTo}`);o=o.children[N]}}applyRedirectCommands(t,n,r,o,i){if(typeof n!="string"){let a=n,{queryParams:c,fragment:u,routeConfig:l,url:d,outlet:h,params:f,data:g,title:v}=o,S=mt(i,()=>a({params:f,data:g,queryParams:c,fragment:u,routeConfig:l,url:d,outlet:h,title:v}));if(S instanceof _t)throw new Eo(S);n=S}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),t,r);if(n[0]==="/")throw new Eo(s);return s}applyRedirectCreateUrlTree(t,n,r,o){let i=this.createSegmentGroup(t,n.root,r,o);return new _t(i,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let r={};return Object.entries(t).forEach(([o,i])=>{if(typeof i=="string"&&i[0]===":"){let a=i.substring(1);r[o]=n[a]}else r[o]=i}),r}createSegmentGroup(t,n,r,o){let i=this.createSegments(t,n.segments,r,o),s={};return Object.entries(n.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(t,c,r,o)}),new $(i,s)}createSegments(t,n,r,o){return n.map(i=>i.path[0]===":"?this.findPosParam(t,i,o):this.findOrReturn(i,r))}findPosParam(t,n,r){let o=r[n.path.substring(1)];if(!o)throw new w(4001,!1);return o}findOrReturn(t,n){let r=0;for(let o of n){if(o.path===t.path)return n.splice(r),o;r++}return t}},hl={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function F0(e,t,n,r,o){let i=ym(e,t,n);return i.matched?(r=o0(t,r),R0(r,t,n,o).pipe(O(s=>s===!0?i:m({},hl)))):x(i)}function ym(e,t,n){if(t.path==="**")return k0(n);if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?m({},hl):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let o=(t.matcher||RC)(n,e,t);if(!o)return m({},hl);let i={};Object.entries(o.posParams??{}).forEach(([a,c])=>{i[a]=c.path});let s=o.consumed.length>0?m(m({},i),o.consumed[o.consumed.length-1].parameters):i;return{matched:!0,consumedSegments:o.consumed,remainingSegments:n.slice(o.consumed.length),parameters:s,positionalParamSegments:o.posParams??{}}}function k0(e){return{matched:!0,parameters:e.length>0?Kg(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function Gg(e,t,n,r){return n.length>0&&V0(e,n,r)?{segmentGroup:new $(t,j0(r,new $(n,e.children))),slicedSegments:[]}:n.length===0&&B0(e,n,r)?{segmentGroup:new $(e.segments,L0(e,n,r,e.children)),slicedSegments:n}:{segmentGroup:new $(e.segments,e.children),slicedSegments:n}}function L0(e,t,n,r){let o={};for(let i of n)if(Vs(e,t,i)&&!r[it(i)]){let s=new $([],{});o[it(i)]=s}return m(m({},r),o)}function j0(e,t){let n={};n[N]=t;for(let r of e)if(r.path===""&&it(r)!==N){let o=new $([],{});n[it(r)]=o}return n}function V0(e,t,n){return n.some(r=>Vs(e,t,r)&&it(r)!==N)}function B0(e,t,n){return n.some(r=>Vs(e,t,r))}function Vs(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function $0(e,t,n){return t.length===0&&!e.children[n]}var pl=class{};function U0(e,t,n,r,o,i,s="emptyOnly"){return new gl(e,t,n,r,o,s,i).recognize()}var H0=31,gl=class{constructor(t,n,r,o,i,s,a){this.injector=t,this.configLoader=n,this.rootComponentType=r,this.config=o,this.urlTree=i,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new fl(this.urlSerializer,this.urlTree),this.absoluteRedirectCount=0,this.allowRedirects=!0}noMatchError(t){return new w(4002,`'${t.segmentGroup}'`)}recognize(){let t=Gg(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(t).pipe(O(({children:n,rootSnapshot:r})=>{let o=new Le(r,n),i=new Os("",o),s=KC(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,i.url=this.urlSerializer.serialize(s),{state:i,tree:s}}))}match(t){let n=new hr([],Object.freeze({}),Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),N,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,t,N,n).pipe(O(r=>({children:r,rootSnapshot:n})),Rt(r=>{if(r instanceof Eo)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof wo?this.noMatchError(r):r}))}processSegmentGroup(t,n,r,o,i){return r.segments.length===0&&r.hasChildren()?this.processChildren(t,n,r,i):this.processSegment(t,n,r,r.segments,o,!0,i).pipe(O(s=>s instanceof Le?[s]:[]))}processChildren(t,n,r,o){let i=[];for(let s of Object.keys(r.children))s==="primary"?i.unshift(s):i.push(s);return J(i).pipe(Yt(s=>{let a=r.children[s],c=i0(n,s);return this.processSegmentGroup(t,c,a,s,o)}),fa((s,a)=>(s.push(...a),s)),Ot(null),da(),ee(s=>{if(s===null)return lr(r);let a=Dm(s);return z0(a),x(a)}))}processSegment(t,n,r,o,i,s,a){return J(n).pipe(Yt(c=>this.processSegmentAgainstRoute(c._injector??t,n,c,r,o,i,s,a).pipe(Rt(u=>{if(u instanceof wo)return x(null);throw u}))),Qe(c=>!!c),Rt(c=>{if(mm(c))return $0(r,o,i)?x(new pl):lr(r);throw c}))}processSegmentAgainstRoute(t,n,r,o,i,s,a,c){return it(r)!==s&&(s===N||!Vs(o,i,r))?lr(o):r.redirectTo===void 0?this.matchSegmentAgainstRoute(t,o,r,i,s,c):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(t,o,n,r,i,s,c):lr(o)}expandSegmentAgainstRouteUsingRedirect(t,n,r,o,i,s,a){let{matched:c,parameters:u,consumedSegments:l,positionalParamSegments:d,remainingSegments:h}=ym(n,o,i);if(!c)return lr(n);typeof o.redirectTo=="string"&&o.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>H0&&(this.allowRedirects=!1));let f=new hr(i,u,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Zg(o),it(o),o.component??o._loadedComponent??null,o,Yg(o)),g=Rs(f,a,this.paramsInheritanceStrategy);f.params=Object.freeze(g.params),f.data=Object.freeze(g.data);let v=this.applyRedirects.applyRedirectCommands(l,o.redirectTo,d,f,t);return this.applyRedirects.lineralizeSegments(o,v).pipe(ee(S=>this.processSegment(t,r,n,S.concat(h),s,!1,a)))}matchSegmentAgainstRoute(t,n,r,o,i,s){let a=F0(n,r,o,t,this.urlSerializer);return r.path==="**"&&(n.children={}),a.pipe(_e(c=>c.matched?(t=r._injector??t,this.getChildConfig(t,r,o).pipe(_e(({routes:u})=>{let l=r._loadedInjector??t,{parameters:d,consumedSegments:h,remainingSegments:f}=c,g=new hr(h,d,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Zg(r),it(r),r.component??r._loadedComponent??null,r,Yg(r)),v=Rs(g,s,this.paramsInheritanceStrategy);g.params=Object.freeze(v.params),g.data=Object.freeze(v.data);let{segmentGroup:S,slicedSegments:M}=Gg(n,h,f,u);if(M.length===0&&S.hasChildren())return this.processChildren(l,u,S,g).pipe(O(le=>new Le(g,le)));if(u.length===0&&M.length===0)return x(new Le(g,[]));let W=it(r)===i;return this.processSegment(l,u,S,M,W?N:i,!0,g).pipe(O(le=>new Le(g,le instanceof Le?[le]:[])))}))):lr(n)))}getChildConfig(t,n,r){return n.children?x({routes:n.children,injector:t}):n.loadChildren?n._loadedRoutes!==void 0?x({routes:n._loadedRoutes,injector:n._loadedInjector}):A0(t,n,r,this.urlSerializer).pipe(ee(o=>o?this.configLoader.loadChildren(t,n).pipe(te(i=>{n._loadedRoutes=i.routes,n._loadedInjector=i.injector})):P0(n))):x({routes:[],injector:t})}};function z0(e){e.sort((t,n)=>t.value.outlet===N?-1:n.value.outlet===N?1:t.value.outlet.localeCompare(n.value.outlet))}function q0(e){let t=e.value.routeConfig;return t&&t.path===""}function Dm(e){let t=[],n=new Set;for(let r of e){if(!q0(r)){t.push(r);continue}let o=t.find(i=>r.value.routeConfig===i.value.routeConfig);o!==void 0?(o.children.push(...r.children),n.add(o)):t.push(r)}for(let r of n){let o=Dm(r.children);t.push(new Le(r.value,o))}return t.filter(r=>!n.has(r))}function Zg(e){return e.data||{}}function Yg(e){return e.resolve||{}}function W0(e,t,n,r,o,i){return ee(s=>U0(e,t,n,r,s.extractedUrl,o,i).pipe(O(({state:a,tree:c})=>B(m({},s),{targetSnapshot:a,urlAfterRedirects:c}))))}function G0(e,t){return ee(n=>{let{targetSnapshot:r,guards:{canActivateChecks:o}}=n;if(!o.length)return x(n);let i=new Set(o.map(c=>c.route)),s=new Set;for(let c of i)if(!s.has(c))for(let u of bm(c))s.add(u);let a=0;return J(s).pipe(Yt(c=>i.has(c)?Z0(c,r,e,t):(c.data=Rs(c,c.parent,e).resolve,x(void 0))),te(()=>a++),_n(1),ee(c=>a===s.size?x(n):Te))})}function bm(e){let t=e.children.map(n=>bm(n)).flat();return[e,...t]}function Z0(e,t,n,r){let o=e.routeConfig,i=e._resolve;return o?.title!==void 0&&!fm(o)&&(i[Io]=o.title),Y0(i,e,t,r).pipe(O(s=>(e._resolvedData=s,e.data=Rs(e,e.parent,n).resolve,null)))}function Y0(e,t,n,r){let o=Wu(e);if(o.length===0)return x({});let i={};return J(o).pipe(ee(s=>Q0(e[s],t,n,r).pipe(Qe(),te(a=>{if(a instanceof bo)throw Ps(new go,a);i[s]=a}))),_n(1),la(i),Rt(s=>mm(s)?Te:Mn(s)))}function Q0(e,t,n,r){let o=Co(t)??r,i=Dr(e,o),s=i.resolve?i.resolve(t,n):mt(o,()=>i(t,n));return qt(s)}function zu(e){return _e(t=>{let n=e(t);return n?J(n).pipe(O(()=>t)):x(t)})}var wm=(()=>{let t=class t{buildTitle(r){let o,i=r.root;for(;i!==void 0;)o=this.getResolvedTitleForRoute(i)??o,i=i.children.find(s=>s.outlet===N);return o}getResolvedTitleForRoute(r){return r.data[Io]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(K0),providedIn:"root"});let e=t;return e})(),K0=(()=>{let t=class t extends wm{constructor(r){super(),this.title=r}updateTitle(r){let o=this.buildTitle(r);o!==void 0&&this.title.setTitle(o)}};t.\u0275fac=function(o){return new(o||t)(k(Bg))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),Dl=new C("",{providedIn:"root",factory:()=>({})}),J0=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["ng-component"]],standalone:!0,features:[z],decls:1,vars:0,template:function(o,i){o&1&&We(0,"router-outlet")},dependencies:[yl],encapsulation:2});let e=t;return e})();function bl(e){let t=e.children&&e.children.map(bl),n=t?B(m({},e),{children:t}):m({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==N&&(n.component=J0),n}var wl=new C(""),X0=(()=>{let t=class t{constructor(){this.componentLoaders=new WeakMap,this.childrenLoaders=new WeakMap,this.compiler=p(Mu)}loadComponent(r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return x(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let o=qt(r.loadComponent()).pipe(O(Em),te(s=>{this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s}),Tn(()=>{this.componentLoaders.delete(r)})),i=new Sn(o,()=>new de).pipe(Cn());return this.componentLoaders.set(r,i),i}loadChildren(r,o){if(this.childrenLoaders.get(o))return this.childrenLoaders.get(o);if(o._loadedRoutes)return x({routes:o._loadedRoutes,injector:o._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(o);let s=eS(o,this.compiler,r,this.onLoadEndListener).pipe(Tn(()=>{this.childrenLoaders.delete(o)})),a=new Sn(s,()=>new de).pipe(Cn());return this.childrenLoaders.set(o,a),a}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function eS(e,t,n,r){return qt(e.loadChildren()).pipe(O(Em),ee(o=>o instanceof Br||Array.isArray(o)?x(o):J(t.compileModuleAsync(o))),O(o=>{r&&r(e);let i,s,a=!1;return Array.isArray(o)?(s=o,a=!0):(i=o.create(n).injector,s=i.get(wl,[],{optional:!0,self:!0}).flat()),{routes:s.map(bl),injector:i}}))}function tS(e){return e&&typeof e=="object"&&"default"in e}function Em(e){return tS(e)?e.default:e}var El=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(nS),providedIn:"root"});let e=t;return e})(),nS=(()=>{let t=class t{shouldProcessUrl(r){return!0}extract(r){return r}merge(r,o){return r}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),rS=new C("");var oS=new C(""),Im=(()=>{let t=class t{get hasRequestedNavigation(){return this.navigationId!==0}constructor(){this.currentNavigation=null,this.currentTransition=null,this.lastSuccessfulNavigation=null,this.events=new de,this.transitionAbortSubject=new de,this.configLoader=p(X0),this.environmentInjector=p($e),this.urlSerializer=p(ks),this.rootContexts=p(Ls),this.location=p(no),this.inputBindingEnabled=p(js,{optional:!0})!==null,this.titleStrategy=p(wm),this.options=p(Dl,{optional:!0})||{},this.paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly",this.urlHandlingStrategy=p(El),this.createViewTransition=p(rS,{optional:!0}),this.navigationErrorHandler=p(oS,{optional:!0}),this.navigationId=0,this.afterPreactivation=()=>x(void 0),this.rootComponentType=null;let r=i=>this.events.next(new el(i)),o=i=>this.events.next(new tl(i));this.configLoader.onLoadEndListener=o,this.configLoader.onLoadStartListener=r}complete(){this.transitions?.complete()}handleNavigationRequest(r){let o=++this.navigationId;this.transitions?.next(B(m(m({},this.transitions.value),r),{id:o}))}setupNavigations(r,o,i){return this.transitions=new se({id:0,currentUrlTree:o,currentRawUrl:o,extractedUrl:this.urlHandlingStrategy.extract(o),urlAfterRedirects:this.urlHandlingStrategy.extract(o),rawUrl:o,extras:{},resolve:()=>{},reject:()=>{},promise:Promise.resolve(!0),source:ho,restoredState:null,currentSnapshot:i.snapshot,targetSnapshot:null,currentRouterState:i,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null}),this.transitions.pipe(me(s=>s.id!==0),O(s=>B(m({},s),{extractedUrl:this.urlHandlingStrategy.extract(s.rawUrl)})),_e(s=>{let a=!1,c=!1;return x(s).pipe(_e(u=>{if(this.navigationId>s.id)return this.cancelNavigationTransition(s,"",je.SupersededByNewNavigation),Te;this.currentTransition=s,this.currentNavigation={id:u.id,initialUrl:u.rawUrl,extractedUrl:u.extractedUrl,targetBrowserUrl:typeof u.extras.browserUrl=="string"?this.urlSerializer.parse(u.extras.browserUrl):u.extras.browserUrl,trigger:u.source,extras:u.extras,previousNavigation:this.lastSuccessfulNavigation?B(m({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let l=!r.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=u.extras.onSameUrlNavigation??r.onSameUrlNavigation;if(!l&&d!=="reload"){let h="";return this.events.next(new zt(u.id,this.urlSerializer.serialize(u.rawUrl),h,xs.IgnoredSameUrlNavigation)),u.resolve(!1),Te}if(this.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))return x(u).pipe(_e(h=>{let f=this.transitions?.getValue();return this.events.next(new mr(h.id,this.urlSerializer.serialize(h.extractedUrl),h.source,h.restoredState)),f!==this.transitions?.getValue()?Te:Promise.resolve(h)}),W0(this.environmentInjector,this.configLoader,this.rootComponentType,r.config,this.urlSerializer,this.paramsInheritanceStrategy),te(h=>{s.targetSnapshot=h.targetSnapshot,s.urlAfterRedirects=h.urlAfterRedirects,this.currentNavigation=B(m({},this.currentNavigation),{finalUrl:h.urlAfterRedirects});let f=new Ts(h.id,this.urlSerializer.serialize(h.extractedUrl),this.urlSerializer.serialize(h.urlAfterRedirects),h.targetSnapshot);this.events.next(f)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)){let{id:h,extractedUrl:f,source:g,restoredState:v,extras:S}=u,M=new mr(h,this.urlSerializer.serialize(f),g,v);this.events.next(M);let W=lm(this.rootComponentType).snapshot;return this.currentTransition=s=B(m({},u),{targetSnapshot:W,urlAfterRedirects:f,extras:B(m({},S),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=f,x(s)}else{let h="";return this.events.next(new zt(u.id,this.urlSerializer.serialize(u.extractedUrl),h,xs.IgnoredByUrlHandlingStrategy)),u.resolve(!1),Te}}),te(u=>{let l=new Qu(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);this.events.next(l)}),O(u=>(this.currentTransition=s=B(m({},u),{guards:f0(u.targetSnapshot,u.currentSnapshot,this.rootContexts)}),s)),I0(this.environmentInjector,u=>this.events.next(u)),te(u=>{if(s.guardsResult=u.guardsResult,u.guardsResult&&typeof u.guardsResult!="boolean")throw Ps(this.urlSerializer,u.guardsResult);let l=new Ku(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot,!!u.guardsResult);this.events.next(l)}),me(u=>u.guardsResult?!0:(this.cancelNavigationTransition(u,"",je.GuardRejected),!1)),zu(u=>{if(u.guards.canActivateChecks.length)return x(u).pipe(te(l=>{let d=new Ju(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(d)}),_e(l=>{let d=!1;return x(l).pipe(G0(this.paramsInheritanceStrategy,this.environmentInjector),te({next:()=>d=!0,complete:()=>{d||this.cancelNavigationTransition(l,"",je.NoDataFromResolver)}}))}),te(l=>{let d=new Xu(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(d)}))}),zu(u=>{let l=d=>{let h=[];d.routeConfig?.loadComponent&&!d.routeConfig._loadedComponent&&h.push(this.configLoader.loadComponent(d.routeConfig).pipe(te(f=>{d.component=f}),O(()=>{})));for(let f of d.children)h.push(...l(f));return h};return _r(l(u.targetSnapshot.root)).pipe(Ot(null),It(1))}),zu(()=>this.afterPreactivation()),_e(()=>{let{currentSnapshot:u,targetSnapshot:l}=s,d=this.createViewTransition?.(this.environmentInjector,u.root,l.root);return d?J(d).pipe(O(()=>s)):x(s)}),O(u=>{let l=a0(r.routeReuseStrategy,u.targetSnapshot,u.currentRouterState);return this.currentTransition=s=B(m({},u),{targetRouterState:l}),this.currentNavigation.targetRouterState=l,s}),te(()=>{this.events.next(new yo)}),d0(this.rootContexts,r.routeReuseStrategy,u=>this.events.next(u),this.inputBindingEnabled),It(1),te({next:u=>{a=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new st(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects))),this.titleStrategy?.updateTitle(u.targetRouterState.snapshot),u.resolve(!0)},complete:()=>{a=!0}}),pa(this.transitionAbortSubject.pipe(te(u=>{throw u}))),Tn(()=>{!a&&!c&&this.cancelNavigationTransition(s,"",je.SupersededByNewNavigation),this.currentTransition?.id===s.id&&(this.currentNavigation=null,this.currentTransition=null)}),Rt(u=>{if(c=!0,gm(u))this.events.next(new Tt(s.id,this.urlSerializer.serialize(s.extractedUrl),u.message,u.cancellationCode)),l0(u)?this.events.next(new vr(u.url,u.navigationBehaviorOptions)):s.resolve(!1);else{let l=new vo(s.id,this.urlSerializer.serialize(s.extractedUrl),u,s.targetSnapshot??void 0);try{let d=mt(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(d instanceof bo){let{message:h,cancellationCode:f}=Ps(this.urlSerializer,d);this.events.next(new Tt(s.id,this.urlSerializer.serialize(s.extractedUrl),h,f)),this.events.next(new vr(d.redirectTo,d.navigationBehaviorOptions))}else{this.events.next(l);let h=r.errorHandler(u);s.resolve(!!h)}}catch(d){this.options.resolveNavigationPromiseOnError?s.resolve(!1):s.reject(d)}}return Te}))}))}cancelNavigationTransition(r,o,i){let s=new Tt(r.id,this.urlSerializer.serialize(r.extractedUrl),o,i);this.events.next(s),r.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let r=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),o=this.currentNavigation?.targetBrowserUrl??this.currentNavigation?.extractedUrl;return r.toString()!==o?.toString()&&!this.currentNavigation?.extras.skipLocationChange}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function iS(e){return e!==ho}var sS=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(aS),providedIn:"root"});let e=t;return e})(),ml=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}},aS=(()=>{let t=class t extends ml{};t.\u0275fac=(()=>{let r;return function(i){return(r||(r=Jc(t)))(i||t)}})(),t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),Cm=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(cS),providedIn:"root"});let e=t;return e})(),cS=(()=>{let t=class t extends Cm{constructor(){super(...arguments),this.location=p(no),this.urlSerializer=p(ks),this.options=p(Dl,{optional:!0})||{},this.canceledNavigationResolution=this.options.canceledNavigationResolution||"replace",this.urlHandlingStrategy=p(El),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.currentUrlTree=new _t,this.rawUrlTree=this.currentUrlTree,this.currentPageId=0,this.lastSuccessfulId=-1,this.routerState=lm(null),this.stateMemento=this.createStateMemento()}getCurrentUrlTree(){return this.currentUrlTree}getRawUrlTree(){return this.rawUrlTree}restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}getRouterState(){return this.routerState}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}registerNonRouterCurrentEntryChangeListener(r){return this.location.subscribe(o=>{o.type==="popstate"&&r(o.url,o.state)})}handleRouterEvent(r,o){if(r instanceof mr)this.stateMemento=this.createStateMemento();else if(r instanceof zt)this.rawUrlTree=o.initialUrl;else if(r instanceof Ts){if(this.urlUpdateStrategy==="eager"&&!o.extras.skipLocationChange){let i=this.urlHandlingStrategy.merge(o.finalUrl,o.initialUrl);this.setBrowserUrl(o.targetBrowserUrl??i,o)}}else r instanceof yo?(this.currentUrlTree=o.finalUrl,this.rawUrlTree=this.urlHandlingStrategy.merge(o.finalUrl,o.initialUrl),this.routerState=o.targetRouterState,this.urlUpdateStrategy==="deferred"&&!o.extras.skipLocationChange&&this.setBrowserUrl(o.targetBrowserUrl??this.rawUrlTree,o)):r instanceof Tt&&(r.code===je.GuardRejected||r.code===je.NoDataFromResolver)?this.restoreHistory(o):r instanceof vo?this.restoreHistory(o,!0):r instanceof st&&(this.lastSuccessfulId=r.id,this.currentPageId=this.browserPageId)}setBrowserUrl(r,o){let i=r instanceof _t?this.urlSerializer.serialize(r):r;if(this.location.isCurrentPathEqualTo(i)||o.extras.replaceUrl){let s=this.browserPageId,a=m(m({},o.extras.state),this.generateNgRouterState(o.id,s));this.location.replaceState(i,"",a)}else{let s=m(m({},o.extras.state),this.generateNgRouterState(o.id,this.browserPageId+1));this.location.go(i,"",s)}}restoreHistory(r,o=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,s=this.currentPageId-i;s!==0?this.location.historyGo(s):this.currentUrlTree===r.finalUrl&&s===0&&(this.resetState(r),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(o&&this.resetState(r),this.resetUrlToCurrentUrlTree())}resetState(r){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,r.finalUrl??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(r,o){return this.canceledNavigationResolution==="computed"?{navigationId:r,\u0275routerPageId:o}:{navigationId:r}}};t.\u0275fac=(()=>{let r;return function(i){return(r||(r=Jc(t)))(i||t)}})(),t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),lo=function(e){return e[e.COMPLETE=0]="COMPLETE",e[e.FAILED=1]="FAILED",e[e.REDIRECTING=2]="REDIRECTING",e}(lo||{});function uS(e,t){e.events.pipe(me(n=>n instanceof st||n instanceof Tt||n instanceof vo||n instanceof zt),O(n=>n instanceof st||n instanceof zt?lo.COMPLETE:(n instanceof Tt?n.code===je.Redirect||n.code===je.SupersededByNewNavigation:!1)?lo.REDIRECTING:lo.FAILED),me(n=>n!==lo.REDIRECTING),It(1)).subscribe(()=>{t()})}function lS(e){throw e}var dS={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},fS={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},gn=(()=>{let t=class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}constructor(){this.disposed=!1,this.console=p(ds),this.stateManager=p(Cm),this.options=p(Dl,{optional:!0})||{},this.pendingTasks=p($t),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.navigationTransitions=p(Im),this.urlSerializer=p(ks),this.location=p(no),this.urlHandlingStrategy=p(El),this._events=new de,this.errorHandler=this.options.errorHandler||lS,this.navigated=!1,this.routeReuseStrategy=p(sS),this.onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore",this.config=p(wl,{optional:!0})?.flat()??[],this.componentInputBindingEnabled=!!p(js,{optional:!0}),this.eventsSubscription=new K,this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this,this.currentUrlTree,this.routerState).subscribe({error:r=>{this.console.warn(r)}}),this.subscribeToNavigationEvents()}subscribeToNavigationEvents(){let r=this.navigationTransitions.events.subscribe(o=>{try{let i=this.navigationTransitions.currentTransition,s=this.navigationTransitions.currentNavigation;if(i!==null&&s!==null){if(this.stateManager.handleRouterEvent(o,s),o instanceof Tt&&o.code!==je.Redirect&&o.code!==je.SupersededByNewNavigation)this.navigated=!0;else if(o instanceof st)this.navigated=!0;else if(o instanceof vr){let a=o.navigationBehaviorOptions,c=this.urlHandlingStrategy.merge(o.url,i.currentRawUrl),u=m({browserUrl:i.extras.browserUrl,info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||iS(i.source)},a);this.scheduleNavigation(c,ho,null,u,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}pS(o)&&this._events.next(o)}catch(i){this.navigationTransitions.transitionAbortSubject.next(i)}});this.eventsSubscription.add(r)}resetRootComponentType(r){this.routerState.root.component=r,this.navigationTransitions.rootComponentType=r}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),ho,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((r,o)=>{setTimeout(()=>{this.navigateToSyncWithBrowser(r,"popstate",o)},0)})}navigateToSyncWithBrowser(r,o,i){let s={replaceUrl:!0},a=i?.navigationId?i:null;if(i){let u=m({},i);delete u.navigationId,delete u.\u0275routerPageId,Object.keys(u).length!==0&&(s.state=u)}let c=this.parseUrl(r);this.scheduleNavigation(c,o,a,s)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(r){this.config=r.map(bl),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(r,o={}){let{relativeTo:i,queryParams:s,fragment:a,queryParamsHandling:c,preserveFragment:u}=o,l=u?this.currentUrlTree.fragment:a,d=null;switch(c??this.options.defaultQueryParamsHandling){case"merge":d=m(m({},this.currentUrlTree.queryParams),s);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=s||null}d!==null&&(d=this.removeEmptyProps(d));let h;try{let f=i?i.snapshot:this.routerState.snapshot.root;h=sm(f)}catch{(typeof r[0]!="string"||r[0][0]!=="/")&&(r=[]),h=this.currentUrlTree.root}return am(h,r,d,l??null)}navigateByUrl(r,o={skipLocationChange:!1}){let i=pn(r)?r:this.parseUrl(r),s=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(s,ho,null,o)}navigate(r,o={skipLocationChange:!1}){return hS(r),this.navigateByUrl(this.createUrlTree(r,o),o)}serializeUrl(r){return this.urlSerializer.serialize(r)}parseUrl(r){try{return this.urlSerializer.parse(r)}catch{return this.urlSerializer.parse("/")}}isActive(r,o){let i;if(o===!0?i=m({},dS):o===!1?i=m({},fS):i=o,pn(r))return Ug(this.currentUrlTree,r,i);let s=this.parseUrl(r);return Ug(this.currentUrlTree,s,i)}removeEmptyProps(r){return Object.entries(r).reduce((o,[i,s])=>(s!=null&&(o[i]=s),o),{})}scheduleNavigation(r,o,i,s,a){if(this.disposed)return Promise.resolve(!1);let c,u,l;a?(c=a.resolve,u=a.reject,l=a.promise):l=new Promise((h,f)=>{c=h,u=f});let d=this.pendingTasks.add();return uS(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:o,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:r,extras:s,resolve:c,reject:u,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(h=>Promise.reject(h))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function hS(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new w(4008,!1)}function pS(e){return!(e instanceof yo)&&!(e instanceof vr)}var Ze=(()=>{let t=class t{constructor(r,o,i,s,a,c){this.router=r,this.route=o,this.tabIndexAttribute=i,this.renderer=s,this.el=a,this.locationStrategy=c,this.href=null,this.onChanges=new de,this.preserveFragment=!1,this.skipLocationChange=!1,this.replaceUrl=!1,this.routerLinkInput=null;let u=a.nativeElement.tagName?.toLowerCase();this.isAnchorElement=u==="a"||u==="area",this.isAnchorElement?this.subscription=r.events.subscribe(l=>{l instanceof st&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}setTabIndexIfNotOnNativeEl(r){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",r)}ngOnChanges(r){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}set routerLink(r){r==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(pn(r)?this.routerLinkInput=r:this.routerLinkInput=Array.isArray(r)?r:[r],this.setTabIndexIfNotOnNativeEl("0"))}onClick(r,o,i,s,a){let c=this.urlTree;if(c===null||this.isAnchorElement&&(r!==0||o||i||s||a||typeof this.target=="string"&&this.target!="_self"))return!0;let u={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(c,u),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let r=this.urlTree;this.href=r!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(r)):null;let o=this.href===null?null:Bh(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",o)}applyAttributeValue(r,o){let i=this.renderer,s=this.el.nativeElement;o!==null?i.setAttribute(s,r,o):i.removeAttribute(s,r)}get urlTree(){return this.routerLinkInput===null?null:pn(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}};t.\u0275fac=function(o){return new(o||t)(yt(gn),yt(at),Xc("tabindex"),yt(as),yt(Se),yt(ur))},t.\u0275dir=Yn({type:t,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(o,i){o&1&&De("click",function(a){return i.onClick(a.button,a.ctrlKey,a.shiftKey,a.altKey,a.metaKey)}),o&2&&Eu("target",i.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",bt],skipLocationChange:[2,"skipLocationChange","skipLocationChange",bt],replaceUrl:[2,"replaceUrl","replaceUrl",bt],routerLink:"routerLink"},standalone:!0,features:[Kr,zr]});let e=t;return e})();var Sm=new C(""),gS=(()=>{let t=class t{constructor(r,o,i,s,a={}){this.urlSerializer=r,this.transitions=o,this.viewportScroller=i,this.zone=s,this.options=a,this.lastId=0,this.lastSource="imperative",this.restoredId=0,this.store={},a.scrollPositionRestoration||="disabled",a.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(r=>{r instanceof mr?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=r.navigationTrigger,this.restoredId=r.restoredState?r.restoredState.navigationId:0):r instanceof st?(this.lastId=r.id,this.scheduleScrollEvent(r,this.urlSerializer.parse(r.urlAfterRedirects).fragment)):r instanceof zt&&r.code===xs.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(r,this.urlSerializer.parse(r.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(r=>{r instanceof _s&&(r.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0]):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(r.position):r.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(r.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]))})}scheduleScrollEvent(r,o){this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.zone.run(()=>{this.transitions.events.next(new _s(r,this.lastSource==="popstate"?this.store[this.restoredId]:null,o))})},0)})}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}};t.\u0275fac=function(o){rp()},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function Mm(e,...t){return Qn([{provide:wl,multi:!0,useValue:e},[],{provide:at,useFactory:mS,deps:[gn]},{provide:sr,multi:!0,useFactory:vS},t.map(n=>n.\u0275providers)])}function mS(e){return e.routerState.root}function xm(e,t){return{\u0275kind:e,\u0275providers:t}}function Tm(e={}){return xm(4,[{provide:Sm,useFactory:()=>{let n=p(Eg),r=p(Y),o=p(Im),i=p(ks);return new gS(i,o,n,r,e)}}])}function vS(){let e=p(He);return t=>{let n=e.get(Dt);if(t!==n.components[0])return;let r=e.get(gn),o=e.get(yS);e.get(DS)===1&&r.initialNavigation(),e.get(bS,null,P.Optional)?.setUpPreloading(),e.get(Sm,null,P.Optional)?.init(),r.resetRootComponentType(n.componentTypes[0]),o.closed||(o.next(),o.complete(),o.unsubscribe())}}var yS=new C("",{factory:()=>new de}),DS=new C("",{providedIn:"root",factory:()=>1});var bS=new C("");function _m(){return xm(8,[Wg,{provide:js,useExisting:Wg}])}var Bs=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["ng-component"]],standalone:!0,features:[z],decls:8,vars:0,consts:[[1,"flex","flex-col","items-center","gap-16","pt-16"],[1,"flex","flex-col","gap-2"],[1,"text-4xl"],[1,"text-lg"],["routerLink","/",1,"p-3","font-bold","bg-black","text-white","rounded-lg","shadow-lg","hover:opacity-80"]],template:function(o,i){o&1&&(b(0,"div",0)(1,"div",1)(2,"p",2),R(3,"Page introuvable"),y(),b(4,"p",3),R(5," Ce contenu n\u2019existe pas ou n\u2019existe plus. Une erreur s\u2019est peut-\xEAtre gliss\xE9e dans l\u2019adresse que vous avez tap\xE9e. "),y()(),b(6,"a",4),R(7,"Page d'acceuil"),y()())},dependencies:[Ze],encapsulation:2});let e=t;return e})();var wS=(e,t)=>t.id,ES=()=>["exercice"];function IS(e,t){if(e&1&&(b(0,"div")(1,"span",3),R(2),y(),R(3," \xA0 "),b(4,"span"),R(5),y()()),e&2){let n=t.$implicit;_(2),oe(n.es),_(3),oe(n.fr)}}var Nm=(()=>{let t=class t{constructor(){this.router=p(gn),this.route=p(at),this.elementRef=p(Se),this.wordsGroup=Re.required(),or(()=>this.elementRef.nativeElement.focus())}handleKeyboardEvent(){this.router.navigate(["exercice"],{relativeTo:this.route})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["ng-component"]],hostAttrs:["tabIndex","-1",1,"outline-none"],hostBindings:function(o,i){o&1&&De("keydown.Enter",function(){return i.handleKeyboardEvent()})},inputs:{wordsGroup:[1,"wordsGroup"]},standalone:!0,features:[z],decls:6,vars:2,consts:[[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3","gap-3"],[1,"flex","justify-center","pt-10"],[1,"block","px-3","py-2","bg-black","text-white","rounded-md","shadow-lg","hover:opacity-80",3,"routerLink"],[1,"font-bold"]],template:function(o,i){o&1&&(b(0,"div",0),Fe(1,IS,6,2,"div",null,wS),y(),b(3,"div",1)(4,"a",2),R(5,"Exercice"),y()()),o&2&&(_(),ke(i.wordsGroup().words),_(3),ue("routerLink",ng(1,ES)))},dependencies:[Ze],encapsulation:2});let e=t;return e})();var CS=["*"];function SS(e,t){e&1&&eo(0)}var Am=(()=>{let t=class t{constructor(){this.render=typeof window<"u"}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["app-client-side"]],standalone:!0,features:[z],ngContentSelectors:CS,decls:1,vars:1,template:function(o,i){o&1&&(us(),ze(0,SS,1,0)),o&2&&qe(i.render?0:-1)},encapsulation:2});let e=t;return e})();var Rm=`hablar : parler
caminar : marcher
cantar : chanter
salir : sortir
beber : boire
ver : voir
cuidar : s'occuper de, prendre soin de
escribir : \xE9crire
hacer : faire
querer : vouloir
cambiar : changer
banca : banque
sacar : sortir, extraire
conducir : conduire
saltar : sauter
volver : revenir, rentrer
rescatar : sauver
arrancar : d\xE9marrer
dejar : arr\xEAter
golpear : frapper, battre
herida : blessure
palabra : mot
frase : phrase
cuaderno : cahier
ordenador : ordinateur
ventana : fen\xEAtre
pelo : cheveux
bigote : moustache
oreja : oreille
cama : lit
mueble : meuble
decir : dire
facil : facile
dificil : difficile
castillo : ch\xE2teau
duda : doute
rabia : col\xE8re
puente : pont
recoger : rammasser, aller chercher
autopista : autoroute
desmayar : faiblir
retrato : portrait
semanal : hebdomadaire
aparcar : garer
dato : donn\xE9e, information
sostener : tenir, soutenir
delito : d\xE9lit, crime
prensa : presse
cementerio : cimeti\xE8re
bajo : bas
desgracia : malheur
turbio : trouble
boda : mariage
mano : main
alma : \xE2me
vina : vigne
platano : banane
piedra : pierre
campana : campagne
tardar : \xEAtre en retard, mettre du temps
recordar : rappeler
cesped : gazon, pelouse
vulgar : vulgaire
maldicion : mal\xE9diction
concebir : concevoir
salud : sant\xE9
mando : t\xE9l\xE9commande
hueso : os
asunto : sujet, affaire
notificar : notifier
fallecer : d\xE9c\xE9der, mourir
dedo : doigt
llevar a cabo : mener \xE0 bien
rechazar : refuser
casualidad : hasard
mediodia : midi
patio : cour, cour int\xE9rieure
preceder : pr\xE9c\xE9der
presagio : pr\xE9sage
ropa : v\xEAtements
devolver : rendre, redonner
contradecir : contredire, d\xE9mentir
tardar : \xEAtre en retard, mettre du temps
pajaro : oiseau
hogar : foyer, int\xE9rieur
vivienda : logement
bruja : sorci\xE8re
suplicar : supplier
delito : d\xE9lit, crime
verano : \xE9t\xE9
entrevista : entretien
agotar : \xE9puiser, ext\xE9nuer
odio : haine
tomar medidas : prendre des mesures
regresar : rentrer, revenir
advertir : pr\xE9venir, avertir
cortina : rideau
agua : eau
nieve : neige
repasar : v\xE9rifier, relire
enganar : mentir, tromper
demas : autre
invierno : hiver
sello : timbre
muneca : poup\xE9e
bastar : suffir, \xEAtre suffisant 
otono : automne
sobre : enveloppe
arbol : arbre
primavera : printemps
discoteca : bo\xEEte de nuit, discoth\xE8que
rato : moment, instant
amar : aimer
reir : rire
panadero : boulanger
soltar : l\xE2cher, jeter, d\xE9tacher
hacienda : exploitation, propri\xE9t\xE9
comentar : raconter, expliquer, commenter
cacerola : casserole
desmayarse : s'\xE9vanouir
eterno : \xE9ternel
joya : bijou, joyau
hallar : trouver, retrouver, d\xE9couvrir
zurdo : gaucher
recorrer : parcourir, traverser
florecer : fleurir
pie : pied
reflejar : refl\xE9ter
fantasma : fant\xF4me
higado : foie
palido : p\xE2le
suspirar : soupirer
oloroso : odorant
huella : empreinte, trace
concluir : terminer, finir, conclure
traicionar : trahir
flaco : maigre
el humo : la fum\xE9e
rodilla : genou
caballo : cheval
gallina : poule
lagrimas : larmes
alegre : joyeux
nivel : niveau
factura : facture
septiembre : septembre
atraer : attirer
sombrio : sombre, obscur
vuelo : vol (oiseau, avion)
cucharita : petite cuill\xE8re
entregar : remettre, livrer, confier
terreno : terrain
falda : jupe
enero : janvier
alla : l\xE0-bas
vaciar : vider
pareza : paresse
piel : peau
pierna : jambe
conceder : accorder, conc\xE9der, octroyer
risa : rire
yerba : herbe
virtud : vertu
gritar : crier
complaciente : serviable, aimable
amanecer : lever du soleil
cuerda : corde
lapiz : crayon
febrero : f\xE9vrier
cubrir : couvrir, recouvrir
ausencia : absence
detener : arr\xEAter, stopper
milagro : miracle
gastar tiempo en : perder son temps \xE0
vistazo : coup d'oeil
mochila : sac \xE0 dos
quieto : tranquille
dicho : ce
huida : fuite
abril : avril
empezar : commencer
condicion : condition
siquiera : m\xEAme pas
cierto : vrai, v\xE9ridique
noticia : nouvelle, information
informe : rapport
condena : peine, condamnation
notar : remarquer, se rendre compte
llevar : porter, emporter
angustia : angoisse
echar : jeter
presuroso : rapide
alegremente : joyeusement
casco : casque
marzo : mars
prisa : h\xE2te, empressement
diferencia : diff\xE9rence
socio : associ\xE9
caro : cher, co\xFBteux
discurso : discours
ministra : ministre
por lo tanto : donc, par cons\xE9quent
reproche : reproche
apoyar : soutenir
carcel : prison
abogado : avocat
compartir : partager
buscar : chercher
barato : pas cher, bon march\xE9
soler : avoir l'habitude de
parecer : sembler, para\xEEtre
futuro : futur
opcion : option, choix
cabeza : t\xEAte
ayudar : aider
menor : plus petit
subir : monter
desde : depuis
contestar : r\xE9pondre
ley : loi
mayo : mai
silla : chaise
mesa : table
cuidar : garder, surveiller
pesar : peser
encima : dessus
siquiera : au moins
cuchillo : couteau
carnicero : boucher
cuchara : cuill\xE8re
charcutero : charcutier
panaderia : boulangerie
encender : allumer
madurar : m\xFBrir
tal vez : peut-\xEAtre
disparar : tirer (avec une arme)
acostumbrar : habituer \xE0
cerdo : porc, cochon
teta : sein, nichon
entrega : livraison
camello : chameau
obviamente : \xE9videmment
huevo : oeuf
pecho : poitrine
danar : ab\xEEmer, endommager
nube : nuage
sondeo : sondage
quiebra : effondrement, faillite
fastidiar : ennuyer, \xE9nerver, emb\xEAter
satisfacer : satisfaire
sustituto : rempla\xE7ant
taller : garage
pescar : p\xEAcher
alejar : \xE9loigner
oficina : bureau
exito : succ\xE8s
fracaso : \xE9chec
alegre : gai, joyeux
rechazar : rejeter, refuser
oler : sentir
pertenecer : appartenir
defectuoso : d\xE9fectueux
tirar : lancer, jeter
pesadilla : cauchemar
mosca : mouche
tamano : taille
antiguo : vieux, ancien
audiencia : audience
permanecer : rester, demeurer
planta baja : rez de chauss\xE9e
mejilla : joue
cruzar : croiser
improvisar : improviser
frontera : fronti\xE8re
odiar : d\xE9tester, ha\xEFr
agotado : \xE9puis\xE9
acostumbrarse : s'habituer
cielo : ch\xE9ri
traer : apporter, amener
retrasar : retarder, reporter
presuponer : pr\xE9supposer
gasolina : essence
complacer : faire plaisir, satisfaire
animar : encourager
cuyo : dont
fraude : fraude
ayuntamiento : mairie
ciudadano : citoyen
alcalde : maire
ubicacion : localisation, lieu
planta : plante
homicidio : homicide
menor : mineur
medio ambiente : environnement
contaminacion : pollution
ambiente : air
afortunadamente : heureusement
pera : poire
ciudad : ville
manzana : pomme
pastel : g\xE2teau
ingresar : entrer dans, int\xE9grer
grabar : enregistrer, filmer
merienda : go\xFBter
aconsejar : conseiller
parar : arr\xEAter
carretera : route
componer : composer
espejo : miroir
denuncia : plainte
enterar : aviser, notifier, informer
apostar : parier
coger : prendre
cuaderno : cahier de brouillon
vaciar : vider
contratar : embaucher
cortar : couper
alegrarse : se r\xE9jouir
lealtad : loyaut\xE9
muneca : poignet
ambicion : ambition
un tenedor : une fouchette
almorzar : d\xE9jeuner
pinchar : crever
suegra : belle-m\xE8re (m\xE8re du conjoint)
pesca : p\xEAche
humilde : humble
naufragio : naufrage
ambiente : ambiance
desarrollar : d\xE9velopper, r\xE9aliser, mener \xE0 bien
comprometerse : s'engager
borrar : effacer
relatar : raconter
ambos : les deux
maletero : coffre (voiture)
madastra : belle-m\xE8re (nouvelle femme du p\xE8re)
encajar : aller \xE0 quelqu'un, coincider avec
cruzar : traverser
sorprender : surprendre
sueldo : salaire
emocioner : \xE9mouvoir
enhorabuena : f\xE9licitation
norma : r\xE8gle
planta : \xE9tage
majo : mignon, joli
barbacoa : barbecue, grillade
cantante : chanteur
revolver : m\xE9langer
bandera : drapeau
saltar : sauter
rendir : vaincre
trampa : pi\xE8ge
imponer : imposer
abajo : dessous, en bas
alguna vez : quelque fois
trauma : traumatisme
burbuja : bulle
valiente : courageux
obviar : omettre, oublier
acuerdo : compromis
consentimiento : consentement, accord
teclado : clavier
estudiar : \xE9tudier
cargar : charger
cruzar : croiser
lograr : r\xE9ussir \xE0, parvenir \xE0
cuidado : soin, attention
bolsillo : poche
injusto : injuste
fijo : fixe
cangrejo : crabe
centenar : centaine
secuela : s\xE9quelle
envidia : envie, jalousie
pitar : siffler
esperar : attendre
pelirrojo : roux
averiguar : d\xE9couvrir, chercher \xE0 savoir
estancia : s\xE9jour, pi\xE8ce
desvelar : d\xE9voiler, r\xE9v\xE9ler
barrer : balayer
esbelto : svelte
honradez : honn\xEAtet\xE9
sentido comun : bon sens
reprimenda : r\xE9primante
obedecer : ob\xE9ir
potente : puissant
servilleta : serviette de table
ambiente : environnement, entourage
postrero : dernier
pradera : prairie
dominio : pouvoir, domination
apuntar : noter
atar : attacher
esquina : coin
huir : fuir
gallo : coq
aldea : village, hameau
lentitud : lenteur
medroso : peureux, effrayant`;var Om=`diestro : droiter, adroit, habile
incierto : faux, incertain
tutear : tutoyer
cazar : chasser, attraper, capturer
rosal : rosier
lago : lac
huella : empreinte
apuntar : indiquer, pointer, montrer
fallo : erreur
estante : \xE9tag\xE8re
vomitar : vomir
probar : tester
improviso : impr\xE9vu
atreverse : oser
cabron : enfoir\xE9, salaud
molestar : d\xE9ranger
intentar : tenter
melena : chevelure
tragar : avaler
relajar : d\xE9tendre, calmer
perjudicial : nuisible, n\xE9faste
lamentar : regretter, d\xE9plorer
ave : oiseau
producir : produire
colocar : placer, poser
basura : poubelle
dibujar : dessiner
levemente : l\xE9g\xE8rement
muslo : cuisse
calcetin : chaussette
sangre : sang
plato : assiette
compadecer : plaindre
alfombra : tapis
escalera : escalier
nietos : petits-enfants
liberar : lib\xE9rer
semejante : tel, telle
nariz : nez
diente : dent
vecino : voisin
cima : sommet
agobio : stress, angoisse
plantearse : envisager, consid\xE9rer
paliza : correction, racl\xE9e, branl\xE9e
desconsolar : bouleverser, attrister
impotencia : impuissance
nevera : r\xE9frigirateur
mantequilla : beurre
repetir : refaire, recommencer
relevo : rel\xE8ve
abstenerse : s'abstenir
comedor : salle \xE0 manger
corriente : courant
audacia : audace
librar : pr\xE9server de, prot\xE9ger de
prado : pr\xE9
camisa : chemise
dentista : dentiste
doctor : m\xE9decin
moreno : bronz\xE9
terraza : terrasse
traje : costume
ojo : \u0153il
libro : livre
labio : l\xE8vre
nariz : nez
una : ongle
golpe : coup
prorrogar : prolonger
cartera : portefeuille
seguidamente : aussit\xF4t
leccion : le\xE7on
tarea : t\xE2che
declarar : d\xE9clarer
promesa : promesse
responsabilidad : responsabilit\xE9
acompanar : accompagner
cambio : changement
ambito : domaine, secteur, milieu
nombramiento : nomination
asegurar : assurer, garantir
desacuerdo : d\xE9saccord
prueba : preuve
destruir : d\xE9truire
administrar : administrer, diriger
arriesgar : risquer
tratamiento : traitement
procentaje : pourcentage
aproximadamente : environ, approximativement
asimismo : de m\xEAme, aussi
recaida : rechute
cuerpo : corp
vida : vie
lluvia : pluie
unidad : unit\xE9
desaparecer : dispara\xEEtre
torrente : torrent
robar : voler (d\xE9rober)
isla : \xEEle
volar : voler (en l'air)
viento : vent
mismo : m\xEAme
nadar : nager
belleza : beaut\xE9
pese a : malgr\xE9
inmenso : immense
merced : merci
empujar : pousser
pesimo : pi\xE8tre, tr\xE8s mauvais
dondequiera : o\xF9 que ce soit
soplar : souffler
atmosfera : atmosph\xE8re
grueso : gros, \xE9pais
ajo : ail
demonio : diable, d\xE9mon
maloliente : malodorant
sencillez : simplicit\xE9
potencia : puissance
competencia : concurrence
arbitro : arbitre
excluir : exclure
competencia : comp\xE9tence
arrodillar : s'agenouiller
juguete : jouet
habilitar : am\xE9nager, habiliter`;var Pm=`estancar : retenir, faire stagner
mente : esprit, cerveau
herramienta : outil
inversion : investissement
medida : mesure
derogar : abroger, abolir
senador : s\xE9nateur
acudir a : aller \xE0, se rendre \xE0
sede : si\xE8ge, quartier g\xE9n\xE9ral
seguidor : supporteur, sympathisant
ejercito : arm\xE9e
aislado : isol\xE9
corredor : couloir
hogar : int\xE9rieur, foyer
oveja : mouton
senalar : indiquer, signaler
sacudir : agiter, secouer, remuer
terremoto : tremblement de terre
revisar : inspecter, contr\xF4ler
temblor : tremblement
competir : concourir, rivaliser
aspirar : aspirer \xE0, convoiter
superar : surmonter, se remettre de
ingreso : d\xE9p\xF4t, versement, revenus
sobrecoste : surco\xFBt
desarrollar : d\xE9velopper
fuente : source
protesta : manifestation
trasladar : d\xE9placer, d\xE9m\xE9nager
atrapar : attraper, coincer
replicar : r\xE9pondre, r\xE9pliquer
deslizamiento de tierra : glissement de terrain
decena : dizaine
aguantar : supporter, tenir bon
oleada : vague
sequia : s\xE9cheresse
hectarea : hectare
foco : projecteur, spot
acoger : accueillir, h\xE9berger, donner l'hospitalit\xE9 \xE0
acontecimiento : \xE9v\xE8nement, fait
atracar : braquer, d\xE9valiser
paliar : att\xE9nuer, soulager
gira : tourn\xE9e
fiscalia : minist\xE8re public, bureau du procureur
sombra : obscurit\xE9, ombre
crucero : croisi\xE8re
estresar : stresser
sospecha : suspicion, soup\xE7on
incomodo : malaise, incofort
raza : race
ciudadano : urbain
asesor : conseiller
bufete : cabinet, bureau
salvaguardar : sauvegarder, prot\xE9ger
particular : particulier, priv\xE9, personnel
sanidad : services de sant\xE9
foro : forum
subida : mont\xE9e, augmentation
espesor : \xE9paisseur
inquisicion : enqu\xEAte, instruction
tormenta : temp\xEAte, orage
estafa : arnaque, escroquerie
tapar : couvrir, cacher
escotar : ajuster
meramente : simplement, seulement
entorpecer : engourdir
protagonizar : provoquer, causer
hazana : exploit, prouesse
punto de mira : ligne de mire
destacar : ressortir, se d\xE9marquer
ahondar : creuser, approfondir
desgastar : user, se fatiguer
sendero : sentier
campana : cloche
lecho : lit
declamar : d\xE9clamer
alterarse : s'\xE9nerver
divisar : apercevoir, discerner
huesped : h\xF4te, invit\xE9, client
seno : sein
trasero : derri\xE8re, post\xE9rieur, fesses
espantar : effrayer
emisora : station de radio, \xE9metteur
nave : navire, vaisseau
sargento : sergent
ascender : monter en grade, \xEAtre promu
subteniente : sous-lieutenant
amparo : protection, soutien
corredor : courtier
auto : jugement, d\xE9cision
perseguir : poursuivre
solicitud : demande
encargado : responsable, g\xE9rant
velar : veiller
diligencia : papiers, formalit\xE9 administrative
agregar : ajouter
referir : faire r\xE9f\xE9rence
solicitante : demandeur, candidat
indistintamente : indiff\xE9remment
quirurgico : chirurgical
recurso : recours, appel, pourvoi
por consiguiente : par cons\xE9quent
enfatizar : mettre l'accent sur, souligner
fraudulento : frauduleux
ordenamiento : ordre, r\xE9glementation
sometimiento : soumission
sospechar : soup\xE7onner
dar a luz : accoucher de, donner naissance \xE0
descartar : \xE9carter, \xE9liminer
incumplimiento : non-respect, non-ex\xE9cution
libra : livre setrling
portavoz : porte-parole
congeniar : s'entendre avec, sympathiser
no obstante : n\xE9anmoins, cependant
arrancar : arracher, enlever
sede : si\xE8ge
acudir : se rendre \xE0
presenciar : assister \xE0
inmediaciones : abords, environs, alentours
lazo afectivo : lien affectif
hincha : supporter, fan
aficionado : supporter, supportrice, amateur
hombro : \xE9paule
increpar : interpeller
detalle : d\xE9tail
colchon : matelas
locutorio : parloir
mojar : mouiller
peculiar : \xE9trange, bizarre
atravesar : traverser
llovizna : bruine
tierno : tendre
cagada : merde, chiure
salpicar : \xE9clabousser
pormenor : d\xE9tail
ingrato : ingrat
papel de estano : papier alluminium
tropezar : tr\xE9bucher
certero : pr\xE9cis
ajeno : autrui
sueno : r\xEAve, sommeil
ayunar : je\xFBner
agurio : augure, pr\xE9sage
aciago : funeste
paladar : palais (bouche)
resaca : gueule de bois
recurso : recours, moyen de
aliento : haleine
sedimento : d\xE9p\xF4t, r\xE9sidu
parranda : f\xEAte, bringue
estragos : ravages, blessures
destazar : d\xE9couper, d\xE9pecer
sonoliento : somnolent
platanal : bananier
menudo : mineur, peu important
reponerse : se remettre
regazo : giron
lazo : noeud, lien
tocar a rebato : sonner, r\xE9sonner
lino : lin
atuendo : tenue, robe
ganado : b\xE9tail, troupeau
cinto : ceinture
partir : d\xE9couper, diviser, partager
rezar : prier
niebla : brouillard
santidad : sainet\xE9
la sombra : l'ombre
la cumbre : le sommet
cosechar : r\xE9colter
losa : dalle, pierre, plaque
arcon : coffre
piadoso : pieux, compatissant
extraviar : \xE9garer
afan : ardeur, d\xE9sir, volont\xE9
pliego : feuille, document, pli
foco : foyer, centre
fe : foi, confiance
quimera : chim\xE8re
fantasia : immagination, fantaisie
dominio : domaine, territoires
deshojarse : effeuiller, perdre ses feuilles
sepultura : s\xE9pulture, tombre, enterrement
monja : religieuse, soeur, nonne
locutorio : cabine t\xE9l\xE9phonique
pilar : pilier, poteau, colonne
pisada : pas, empreinte de pas
enlutado : endeuill\xE9, en deuil
altar : autel
enmudecer : rester muet
en voz queda : \xE0 voix basse
implorar : implorer
desconsolado : inconsolable
moribunda : moribond
arrojar : jeter, lancer
livido : livide, p\xE2le
envolver : emballer, envelopper, empaqueter
pecado : p\xE9ch\xE9, erreur
figurar : figurer, repr\xE9senter
tocador : cabinet de toilette, toilettes
cuenta : perle
tremulo : tremblotant
desasir : l\xE2cher prise sur
joyero : bo\xEEte \xE0 bijoux
pena : peine, chagrin
velada : soir\xE9e
aldeano : villageois
presuroso : rapidement
pudrir : pourrir
resguardar : prot\xE9ger, pr\xE9server
anochecer : tomb\xE9e de la nuit
monte : mont, colline
trasponer : transf\xE9rer, d\xE9placer
paloma : colombe, pigeon
yantar : d\xE9jeuner
piedra : pierre
aldaba : loquet, verrou
sobresaliente : tr\xE8s bien
jinete : cavalier
rayar : rayer
acosar : traquer, poursuivre, harceler
ladrido : aboiement
alba : aube, lev\xE9e du jour
lontananza : lointain
lunar : grain de beaut\xE9
velada : voil\xE9e
loma : colline
yermo : terre en friche, d\xE9sert
rebano : troupeau
mujeriego : coureur de jupons, homme \xE0 femmes, don juan
rocin : canasson, cheval de travail
feudo : fief
hilar : relier, \xE9tablir un lien
cenicienta : bonne \xE0 tout faire
rafaga : rafale
yantar : d\xE9jeuner
maldad : m\xE9chancet\xE9
ladrar : aboyer
racano : radin
el cutis : la peau du visage
la tez : le teint
grano : bouton (peau)
renir : r\xE9primander, gronder
renguear : boiter
peca : t\xE2che de rousseur
mestizo : m\xE9tis
chal\xE9 : pavillon, villa
hundir : faire couler
reganar : gronder, disputer
sena : indice, signe
fundir : aplatir, d\xE9former
inquilino : locataire
afuera : banlieue, p\xE9riph\xE9rie
las senas : adresse (domicile)
roer : ronger
bendicion : b\xE9n\xE9diction
musitar : chuchoter
rezo : pri\xE8re
en torno a : autour de
alforja : saccoche
desatar : d\xE9tacher
tropezar con : tr\xE9bucher sur, se cogner contre
asomar : appara\xEEtre, pointer le bout de son nez
dichoso : heureux, chanceux
falda : flanc
dichoso : foutu, satan\xE9, maudit
resguardarse : se prot\xE9ger, s'abriter
manojo : bouquet (de fleurs), trousseau (de cl\xE9s)
arrebujarse : s'emmitoufler
almohada : oreiller
sanar : gu\xE9rir
apartar : pousser, d\xE9placer, \xE9carter, mettre de c\xF4t\xE9
santidad : sainet\xE9
saudade : nostalgie, m\xE9lancolie
cenicienta : cendr\xE9 (couleur)
al cabo de : au bout de
poniente : couchant
alla : autrefois, jadis
labrar : fa\xE7onner
cornisa : corniche
escudo : embl\xEAme
linaje : lign\xE9e
umbral : seuil
estribo : \xE9trier
castano : ch\xE2taigner
vidriera : vitrail, vitrine
vidrio : vitre
desasirse : se lib\xE9rer de
alzar : lever
nuevamente : de nouveau
ancho : large
losa : dalle, pierre, plaque
lapida : pierre tombale
escano : si\xE8ge, banc
roble : ch\xEAne
lustroso : brillant, lustr\xE9
usanza : usage, mode
arcon : coffre
trigo : bl\xE9
tapa : couvercle, capuchon
criada : domestique, servant
toscamente : grossi\xE8rement
senorial : seigneurial, majestueux
peldano : marche, barreau (\xE9chelle)
labrado : travaill\xE9, taill\xE9
vuecencia : votre excellence
echado : allong\xE9, couch\xE9
echarse : se coucher, s'allonger
estancia : s\xE9jour, pi\xE8ce
criar : nourir, alimenter
agredir : agresser
almacen : entrep\xF4t, magasin
escupir : cracher
conllevar : impliquer, comporter
sede : si\xE8ge
rayado : fou, cingl\xE9
necio : b\xEAte, idiot, imb\xE9cile
sello : cachet
arrepentirse : regretter
encontronazo : collision, altercation
emprender : entreprendre
hundirse : se laisser aller, d\xE9primer
punteria : pr\xE9cision, adresse
rodeo : d\xE9tour
fichar : surveiller, ficher
doblete : doublure
chuleta : insolent
espejismo : mirage, illusion
grua : grue
alargarse : se prolonger
desplomar : s'effondrer, s'\xE9crouler
puja : ench\xE8re
foco : projecteur, spot
chispa : \xE9tincelle
pujar : se battre, lutter
subastar : mettre aux ench\xE8res
alargar : allonger, \xE9tendre
novato : novice, n\xE9ophyte
fallo : jugement, verdict
rehen : otage
alto al fuego : cessez-le-feu
coleta : aileron
burlar : semer, esquiver
prever : pr\xE9voir
orilla : bord
difundir : diffuser, r\xE9pandre
aludir : faire allusion \xE0
enfocar : faire la mise au point de
atracar : braquer, d\xE9valiser
mula : mule
abaratar : solder, baisser les prix
entidad : \xE9tablissement
enriquecer : enrichir
pedazo : bout, morceau, tranche
trozo : bout, morceau
rodear : contourner, faire un d\xE9tour
machacar : \xE9craser
currar : bosser, taffer
rollo : liaison, flirt
arrimar : approcher, rapprocher
juntar : joindre, r\xE9unir
invertir : investir
tocadiscos : tourne-disque
entorno : environnement, entourage
deshacer : liquider, fermer boutique
confundir : d\xE9concerter, d\xE9router, confondre
prospeccion : prospection, sondage
hurgar : fouiller
asesor : conseiller
palabreria : baratin
curro : boulot
talonario : carnet de ch\xE8que, ch\xE9quier
folleto : brochure
hacerse pupa : se faire bobo
arremangar : se retrousser les manches
huevo : couille
sierra : scie
competer : relever de la comp\xE9tence de
bastar : suffire
sobredosis : overdose
marear : faire tourner la t\xEAte, donner la naus\xE9e
mercancia : marchandise
camello : dealer
avena : avoine
disidente : dissident
testificar : t\xE9moigner
marron : tuile, gal\xE8re
asesoria : cabinet de conseil
independizarse : prendre son ind\xE9pendance
madero : flic, keuf, cond\xE9
guarro : cochon
rueda de prensa : conf\xE9rence de presse
encrucijada : croisement, carrefour
alcance : port\xE9e
franqueza : franchise
mear : pisser
difunto : d\xE9c\xE9d\xE9, d\xE9funt
empate : match nul, \xE9galit\xE9
fuera de juego : hors-jeu
exito : succ\xE8s, gloire`;var Fm=`prisa : h\xE2te, empressement
crio : gamin, enfant
batallita : anecdote
fritar : frire
hundir : provoquer l'effondrement
alejar : \xE9loigner
desfogar : d\xE9charger, rel\xE2cher, d\xE9fouler
pijo : bourgeois
pesado : lourd, p\xE9nible
redondo : rond
parada : arr\xEAt, pause
desperdigar : \xE9parpiller
ratonera : pi\xE8ge
mala hostia : mauvaise humeur
efectivo : esp\xE8ces, argent liquide
alcanzar : atteindre
plazo : d\xE9lai
desplegar : d\xE9ployer
pedazo : morceau, tranche
escobilla : brosse (pour WC)
jabon : savon
rendir : donner des r\xE9sultats
polvo : poussi\xE8re
alentar : encourager
vacunacion : vaccination
ratonera : tapette \xE0 souris
aterrar : terrifier, effrayer
entornar : laisser entrouvert
ambientar : d\xE9corer
patinete : trotinnette
rapero : rappeur
tesis : th\xE8se
talego : sac
blanqueo : blanchiment
despedirse : dire au revoir
despedir : licencier, renvoyer
ascenso : ascension
prometido : fianc\xE9
talego : taule, gnouf, placard
esencia : essence
rehabilitacion : r\xE9\xE9ducation
investigar : enqu\xEAter
pijo : bourgeois
investigar : rechercher, \xE9tudier
saldo : solde
portazo : claquement de porte
presupuesto : devis, budget
capullo : con
singular : singulier, unique, sp\xE9cial
rehabilitacion : d\xE9sintoxication, r\xE9habilitation
pillar : attraper, rattraper
castigo : punition, ch\xE2timent
debilitar : affaiblir
tramitar : faire les d\xE9marches
izar : hisser
receso : pause
punada : coup de poing
alegar : pr\xE9texter, all\xE9guer
tremendo : horrible, terrible
redondo : impeccable
duplicar : doubler, dupliquer
especular : sp\xE9culer
pastizal : pr\xE9, p\xE2turage
trazar : tracer
hostia : putain, merde
darle a alguien una hostia : casser la gueule \xE0 quelqu'un
labor : t\xE2che, travail
tiroteo : fusillade
comodin : excuse, pr\xE9texte
destacar : souligner, mettre l'accent sur
polvo : baiser, tirer un coup
proceder : venir de, provenir de
franja : bande
cohete : fus\xE9e, roquette
cobrar : toucher, encaisser
sobrante : restant, en plus, trop
hundir : an\xE9antir
cello : cercle
discografica : maison de disque
solear : mettre au soleil
vela : bougie
pinchar : piquer
rodear : contourner
ratero : voleur
majo : sympa, gentil
atreverse : oser
pija : bite, queue
orinar : uriner
joder : faire chier
escarpe : pente, d\xE9nivel\xE9
fracasar : \xE9chouer
tirarse : se jeter, plonger
rendirse : se rendre, s'avouer vaincu
boya : bou\xE9e
bandeja : plateau
pirarse : se casser
mechero : briquet
curre : boulot, taf
a tomar por culo : aller se faire foutre
gilipollas : con, abruti
calar a alguien : percer \xE0 jour, d\xE9masquer
pincha : travail, m\xE9tier
aguja : aiguille
rodado : routier
proveedor : fournisseur
apretar : serrer, presser, compresser
chupatintas : gratte-papier
ambito : domaine, secteur, milieu
jodido : foutu
encajar en : \xEAtre \xE0 sa place, se sentir \xE0 sa place
soso : fade, insipide, terne
callejon : ruelle
cinta : ruban
aparentar : pr\xE9tendre, feindre
fracasado : rat\xE9
carpintero : menuisier
dispuesto : pr\xEAt, pr\xEAt \xE0 faire qch
comodin : homme \xE0 tout faire
quitar : enlever
arrebatar : arracher
echao : allong\xE9, couch\xE9
fiscal : procureur
asociado : associ\xE9
bote : bo\xEEte, pot
mote : surnom
enfrentamiento : affrontement
incidir : affecter, influencer, avoir une incidence sur
trazar : \xE9laborer, planifier
senal : signe, geste
joder : baiser
desprecio : m\xE9pris
borrador : gomme
atemorizar : terroriser, effrayer
desestimar : rejeter
alegar : contester
inquina : aversion, d\xE9go\xFBt, haine
cabrear : \xE9nerver, p\xE9ter les plombs
enano : nain
verborrea : logorrh\xE9e, verbosit\xE9
caza : chasse
suscripcion : abonnement, souscription
abono : abonnement
buchaca : poche
palacete : manoir, h\xF4tel particulier
recalada : escale
conazo : chiant, emmerdant
proceder : agir, proc\xE9der
desplomarse : s'effondrer
demonio : diable, d\xE9mon
desatar : d\xE9clencher
cartel : cartel
cesto : panier
enfoque : point de vue, approche
curar : soigner
cerilla : allumette
caja : caisse, bo\xEEte
afortunado : chanceux, heureux, privil\xE9gi\xE9
recopilar : compiler, assembler
borrador : brouillon
becada : b\xE9casse
guarro : d\xE9gueulasse, crade
recetar : prescrire
extraoficial : officieux
ensayar : tester
coger : attraper, arr\xEAter
gatillo : g\xE2chette
enterarse : se rendre compte
descojonarse : se foutre de, se bidonner
sorteo : tirage au sort
espejismo : mirage, illusion
salvavidas : bou\xE9e de sauvetage
punetero : emmerdeur
encuadernar : relier
folleto : prospectus
adquirir : acqu\xE9rir
sujeto : individu
carnicero : carnivore
aliado : associ\xE9
cursar : \xE9tudier
desprenderse de : se d\xE9barrasser, se d\xE9faire
bucear : plonger, nager sous l'eau
charca : mare
escurrirse : glisser
aseado : propre, soign\xE9
grifo : robinet
parroquiano : habitu\xE9
impactante : impressionnant
alegar : all\xE9guer, pr\xE9texter
agrado : go\xFBt
metalico : esp\xE8ces, liquide, cash
ansiar : avoir tr\xE8s envie de
umbral : seuil
cruzar : traverser
constarle a alguien : \xEAtre s\xFBr de 
porton : portail, grande porte
contribuyente : contribuable
preludio : pr\xE9lude, d\xE9but
despreciar : m\xE9priser, d\xE9daigner
alargar : allonger, rallonger
libidinoso : libidineux
miron : curieux, voyeur
aflorar : \xE9merger
matizar : nuancer, att\xE9nuer
pupila : \xE9l\xE8ve
aligerar : all\xE9ger
procedencia : origin, provenance
fingir : faire semblant de
aguardar : attendre
eldredon : couette
peldano : marche, barreau (\xE9chelle)
tramite : proc\xE9dure, d\xE9marche
desvelar : emp\xEAcher de dormir, maintenir \xE9veill\xE9
reventar : \xE9clater
susurro : chuchotement, murmure
macarra : voyou
acertado : judicieux, ad\xE9quat
nutrido : nombreux
rebotar : rebondir
fisgonear : fouiller, fouiner
entrometerse : se m\xEAler des affaires des autres
lamer : l\xE9cher
migajar : miette de pain
enfundarse : enfiler
albornoz : peignoir
malva : mauve
apatico : apathique, amorphe
malgastar : gaspiller
semilla : semence
antemano : \xE0 l'avance, d'avance
fecundar : f\xE9conder
abocar : transvaser
azotar : fouetter
abundar : abonder, foisonner
semen : sperme
aro : anneau
derrochar : gaspiller, dilapider
ensayar : r\xE9p\xE9ter
atarear : occuper
alabanza : \xE9loge
manejar : diriger, g\xE9rer
machacon : p\xE9nible, insistant, lourd
agradar : plaire
centavo : centime
clavar : planter, enfoncer
antojarse : imaginer, avoir l'impression
heredar : h\xE9riter de
solvencia : solvabilit\xE9
rozar : fr\xF4ler
comprometido : risqu\xE9
adentrase en : entrer dans, p\xE9n\xE9trer dans
reparo : objection
leve : l\xE9ger
ademan : geste
comprometedor : compromettant
pandilla : bande
inepto : inapte
muela : molaire
hediondo : puant, naus\xE9abond, r\xE9pugnant
presa : proie
carecer : manquer de
hurgar : fouiller
obsequio : cadeau
chapucero : b\xE2cl\xE9, n\xE9glig\xE9
perplejo : perplexe
herejia : h\xE9r\xE9sie
tela : tissu
costura : couture
machaconamente : avec insistance
vislumbrar : entrevoir, apercevoir
anfitrion : h\xF4te
insensatez : manque de bon sens
barro : boue, gadoue
poseer : poss\xE9der
disenar : concevoir
asentar : stabiliser, renforcer
enfocar : faire la mise au point de
rojizo : rouge\xE2tre
deslumbrar : \xE9blouir
ensangrentado : ensanglant\xE9
aperreado : minable, mis\xE9rable
sujetar : tenir
pulso : pouls
vejacion : vexation, humiliation
jovenzuelo : gamin
acarrear : entra\xEEner, amener, provoquer
aseveracion : affirmation
reja : grille, barreaux
apretar : serrer
grueso : \xE9paisseur
desmadrarse : sortir de ses gonds
ventanal : baie vitr\xE9e
razonamiento : raisonnement
escaso : rare
oficio : m\xE9tier
sumamente : extr\xEAmement
arrasar : ravager, d\xE9truire
rotura : rupture, cassure, fracture
tuberia : tuyauterie
averia : panne, d\xE9faillance
advertir : remarquer, constater
desencajado : d\xE9compos\xE9, boulevers\xE9
aprieto : embarras, p\xE9trin
engendrar : mettre au monde
atarear : occuper
tosco : grossier
abrumar : accabler, troubler
horrendo : horrible, moche
renacuajo : petit, bout de chou
cabezota : grosse t\xEAte
hortera : ringard, kitsch
memez : niaiserie
clasista : \xE9litiste
sorber : aspirer
antepasado : anc\xEAtre
embobado : abasourdi
fullero : trompeur
tropelia : abus
asentir : consentir, acquiescer
canalla : voyou
golfa : pute, salope
mendigo : mendiant
maleante : d\xE9linquant
hierro : fer
rebatir : r\xE9futer, rejeter
estirpe : descendance, lign\xE9e
chachara : bavardage
payaso : clown, charlot, guignol
adefesio : mochet\xE9
domador : dresseur
braguetazo : mariage int\xE9ress\xE9
doquier : partout
aborrecer : d\xE9tester, ha\xEFr
lelo : niais, b\xEAte, idiot
sandez : b\xEAtise, sottise
nitidez : nettet\xE9
enfilar : mettre en file indienne
rotonda : rond-point
adentrarse en : entrer dans, p\xE9n\xE9trer dans
vecinal : de voisinage
punado : poign\xE9e
pezon : t\xE9ton
lenceria : lingerie
ejecutivo : de direction, cadre sup\xE9rieur
lucirse : briller, se distinguer
apestar : empester, sentir mauvais
griego : grec
anteponer : faire passer avant
desorejado : d\xE9vergond\xE9, d\xE9prav\xE9
ufanarse de : se vanter de
arrear : d\xE9cocher, mettre, flanquer
sopapo : claque
morboso : pervers, tordu
cotilla : comm\xE8re
al raso : \xE0 la belle \xE9toile
coro : choeur
desechar : dissiper, chasser
maletin : mallette, porte-documents
calzoncillos : cale\xE7on, slip
transcurrir : s'\xE9couler, passer
presupuesto : budget
verja : grille
tan solo : seulement, \xE0 peine
borroso : flou
desconsoladamente : inconsolablement
regentar : diriger, tenir
vertedero : d\xE9charge
cartero : facteur
gaznapiro : nigaud
zampar : engloutir
butaca : fauteuil
empecinado : obstin\xE9, t\xEAtu
mentecato : idiot
mero : simple
recobrar : r\xE9cup\xE9rer, retrouver
alabar : vanter, faire l'\xE9loge de
lerdo : b\xEAte
cloaca : \xE9gout
airear : a\xE9rer
hedor : mauvaise odeur
sobornar : soudoyer, acheter
intachable : irr\xE9prochable
limosna : aum\xF4ne
traspasar : transpercer, traverser
alivio : apaisement, soulagement
liebre : li\xE8vre
aspero : rugueux
ombligo : nombril
anfitrion : h\xF4te
respaldo : dossier (si\xE8ge)
ladear : pencher, incliner
inquirir : demander, s'enqu\xE9rir de
retador : avec d\xE9fi
sentenciar : condamner
presupuesto : supposition, pr\xE9somption
encogerse : r\xE9tr\xE9cir, replier
cromo : image, vignette
cajaro : border, merde
aplomo : aplomb, assurance, confiance
hojear : feuilleter
agradar : plaire, appr\xE9cier`;var km=`manazas : empot\xE9, avoir deux mains gauches
arrastrar : entra\xEEner, emporter
inservible : inutilisable
bufido : rugissement, soufflement
dadiva : don, pr\xE9sent
derroche : profusion, explosion
aplacar : calmer, apaiser
bocanada : bouff\xE9e, bol d'air
otorgar : octroyer
obsequiar : offrir, faire un cadeau
puro : cigare
disfraz : d\xE9guisement
ceja : sourcil
nuera : belle-fille
tumbar : renverser, mettre par terre
techo : plafond
procedente : originaire, en provenance
cierre : fermeture, cl\xF4ture
presupuestario : budg\xE9taire
interponer : d\xE9poser
vaticinar : pr\xE9dire
pantomima : farce
plasmar : reproduire
vulneracion : violation
ponente : conf\xE9rencier, intervenant
cauto : prudent
saque de banda : touche (football)
traspasar : d\xE9placer, transf\xE9rer
desempenar : ex\xE9cuter, r\xE9aliser, effectuer
solemne : solennel
cese : renvoi, arr\xEAt, interruption
comprometer : impliquer
recalcar : insister sur, souligner
suponer : signifier
poza : mare
descenso : descente
ruta : randonn\xE9e, parcours
racha : rafale
atrasar : retarder, ralentir
ocioso : oisif
arrullar : bercer
indomable : indomptable
aguzarse : s'aiguiser, se renforcer
antano : autrefois
achacar : attribuer \xE0, imputer \xE0
desenfrenado : effr\xE9n\xE9, insatiable
asombrar : \xE9merveiller, impr\xE9ssionner
nimio : insignifiant
ramera : prostitu\xE9e, pute
arrumacos : caresses, mamours
coaccion : contrainte
empitonar : encorner
cornudo : cocu
malhadado : malchanceux
asador : barbecue, grill
chapotear : patauger
contravenir : enfreindre
crudo : cru
antojar : avoir envie de
tambalear : vaciller, chanceler
balbucear : bafouiller
procurar : veiller \xE0, t\xE2cher de
acertar : mettre dans le mille, viser juste
cerradura : serrure
fontanero : plombier
a destajo : d'arrache-pied
averia : panne, d\xE9faillance
caneria : canalisation, tuyauterie
paron : arr\xEAt
besuquear : b\xE9coter, couvrir de baisers
no importar un bledo : s'en ficher, s'en moquer
gaje : bonus
apalear : ruer de coups
lupanar : bordel
propasarse : manquer de respect
cabecilla : leader
apodar : surnommer
comadrona : sage-femme
quisquilloso : susceptible
grato : agr\xE9able, plaisant
pleitesia : rendre hommage \xE0
indulto : gr\xE2ce (pardon)
saque de esquina : corner
colegiado : arbitre
desaire : affront
espantada : fuite
rebotar : rebondir
albergar : abriter, h\xE9berger
atender : recevoir, accueillir
contundente : ferme, cat\xE9gorique`;var Lm=`contra las cuerdas : dos au mur
cantera : carri\xE8re (marbre)
marmol : marbre
los pormenores de : les tenants et aboutissants
higuera : figuier
obispo : \xE9v\xEAque
cedro : c\xE8dre
nave : hangar
esquilon : cloche
legua : lieue (mesure, distance)
testero : paroi
ruisenor : rossignol
cipr\xE9s : cypr\xE8s
batir los dientes : claquer des dents
velon : lampe \xE0 huile
cinta : film
ojota : sandale
erizo : h\xE9risson
pincho : amuse-gueule
ostra : hu\xEEtre
opiaceo : opiac\xE9
seto : haie
boqueron : anchois
adobo : marinade
relamerse : se l\xE9cher les babines
comensal : convive
prostibulo : maison close, bordel
almendro : amandier
rescoldo : derni\xE8res braises
trebedes : tr\xE9pied
pazo : maison de campagne
madrena : sabot
valla : cl\xF4ture
enrejado : grille
agazaparse : se tapir
patilla : branche (lunnettes)
decimo : ticket de loterie
engorro : p\xE9nible, emb\xEAtant, casse-pieds
aguilucho : aiglon
acecho : guet
pelagatos : pauvre diable
sastreria : atelier de tailleur
chatarra : ferraille
ferreteria : quincaillerie
resobaso : vu et revu
jiron : lambeau
reniego : blasph\xE8me
chatarrero : ferrailleur
pasto : p\xE2turage
empolvar : poudrer
carantonas : mamours
campanario : clocher
michelin : bourrelet, poign\xE9es d'amour
bosquecillo : bosquet, petit bois
sepelios : obs\xE8ques, fun\xE9railles
tanatorio : fun\xE9rarium, chambre fun\xE9raire
pulcritud : soin, ordre
los chorros del oro : pimpant, nettoy\xE9 \xE0 fond
zaguan : entr\xE9e, vestibule
rienda : r\xEAne
chiringuito : bar de plage
manjar : mets exquis
alcornoque : ch\xEAne-li\xE8ge
larguirucho : grand dadais
enmienda : amendement
pleno : s\xE9ance pl\xE9ni\xE8re
seda : soie
`;function jm(e){let t=[...e];for(let n=t.length-1;n>0;n--){let r=Math.floor(Math.random()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}function Vm(e,t){return e.reduce((n,r)=>{let o=t(r);return n[o]=[...n[o]??[],r],n},{})}function Bm(e,t){if(!e||!t)return[];let n=e.length,r=e.indexOf(t),o=r!==-1?r:0,i=[];for(let s=0;s<n;s++){let a=e[(o+s)%n];a&&a!=t&&i.push(a)}return i}var Il=40,Cl=[br("LEVEL1A","Niveau 1a","niveau-1a",wr(Rm)),br("LEVEL1B","Niveau 1b","niveau-1b",wr(Om)),br("LEVEL2A","Niveau 2a","niveau-2a",wr(Pm)),br("LEVEL2B","Niveau 2b","niveau-2b",wr(Fm)),br("LEVEL2C","Niveau 2c","niveau-2c",wr(km)),br("LEVEL3A","Niveau 3a","niveau-3a",wr(Lm))];function $m(e,t,n=[]){let r=new Set,o=e.filter(a=>!n.includes(a.id)),i=Math.min(o.length,Math.round(t/2));for(;r.size<i;)r.add(o[Math.floor(Math.random()*o.length)].id);let s=Math.min(e.length,t);for(;r.size<s;)r.add(e[Math.floor(Math.random()*e.length)].id);return jm(e.filter(a=>r.has(a.id)))}function Mo(e){return Cl.find(({pathParam:t})=>t===e)}function $s(e,t){return Mo(e)?.wordsGroups.find(({pathParam:n})=>n===t)}function br(e,t,n,r){return{id:e,label:t,pathParam:n,nbWords:r.length,wordsGroups:RS(e,r)}}function RS(e,t){let n=t.length,r=Math.ceil(n/Il);return[...Array(r).keys()].map(o=>{let i=o*Il,s=Math.min(i+Il,n),a=o+1;return{id:`${e}_${a}`,pathParam:`${a}`,words:t.slice(i,s)}})}function wr(e){return OS(e).split(`
`).filter(t=>!!t).map((t,n)=>{let[r,o]=t.split(" : ");return{id:n,es:r,fr:o}})}function OS(e){let t="data:text/plain;base64,";return e.startsWith(t)?atob(e.substring(t.length)):e}var Um="--";var Us=(()=>{let t=class t{constructor(){this._storage=typeof localStorage<"u"?localStorage:null}read(r,o){return this._storage?.getItem(Hm(r,o))??null}write(r,o,i){let s=i!=null?Hm(r,o):r,a=i??o;this._storage?.setItem(s,a)}remove(r){this._storage?.removeItem(r)}readAllByKeyPrefix(r){return Object.entries(this._storage||{}).filter(([o])=>o?.startsWith(r))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function Hm(e,t){return t?`${e}${Um}${t}`:e}var PS=[["LESS_THAN_TWO_DAYS",1728e5],["LESS_THAN_FOUR_DAYS",3456e5]];function Sl(e){if(e==null||isNaN(+e))return"LONG_TIME_AGO_OR_NEVER";let n=new Date().getTime()-+e;return PS.find(([,r])=>n<r)?.[0]??"LONG_TIME_AGO_OR_NEVER"}var Er=(()=>{let t=class t{constructor(){this._storageService=p(Us),this.removeOldWordsGroupCompletion()}markAsCompleted(r){this._storageService.write("WORDS_GROUP_COMPLETION",r.id,new Date().getTime().toString())}getCompletionAge(r){let o=this._storageService.read("WORDS_GROUP_COMPLETION",r.id);return Sl(o)}removeOldWordsGroupCompletion(){this._storageService.readAllByKeyPrefix("WORDS_GROUP_COMPLETION").filter(([,r])=>Sl(r)==="LONG_TIME_AGO_OR_NEVER").forEach(([r])=>this._storageService.remove(r))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();var Ir=["preview","form"],Hs=Ir[0],zm=10;var Ml={isExerciceReversed:!1};var zs=(()=>{let t=class t{constructor(){this._storageService=p(Us),this._setting=Pe(this.readSetting()),this.setting=this._setting.asReadonly(),ot(()=>this._storageService.write("WORDS_SETTING",JSON.stringify(this._setting())))}setIsExerciceReversed(r){this._setting.update(o=>B(m({},o),{isExerciceReversed:r}))}readSetting(){let r=this._storageService.read("WORDS_SETTING"),o=kS(r);return{isExerciceReversed:FS(o,"isExerciceReversed")}}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function FS(e,t){return e&&Object.hasOwn(e,t)&&typeof e[t]==typeof Ml[t]?e[t]:Ml[t]}function kS(e){if(!e)return null;try{return JSON.parse(e)}catch(t){return console.error(t),null}}var mn=(()=>{let t=class t{constructor(){this._wordsCompletionService=p(Er),this._wordsSettingService=p(zs),this._wordsCategory=Pe(void 0),this._wordsGroup=Pe(void 0),this._words=Pe([]),this._wordIdsAnswered=Pe([]),this._formValues=Pe([]),this._lastInputFocusIndex=Pe(0),this._step=Pe(Hs),this._wordsAvailable=Z(()=>this._wordsGroup()?.words??[]),this._formValuesValidations=Z(()=>{let r=this.words(),o=this._wordValueFn();return this.formValues().map((i,s)=>i?.toLowerCase()===o(r[s])?.toLowerCase())}),this._stepIndex=Z(()=>Ir.indexOf(this.step())),this._areAllWordsAvailableAnswered=Z(()=>this.nbWordsAnswered()>=this.nbWordsAvailable()),this._wordValueFn=Z(()=>this.isReversed()?r=>r.fr:r=>r.es),this._wordTranslationFn=Z(()=>this.isReversed()?r=>r.es:r=>r.fr),this.lastInputFocusIndex=this._lastInputFocusIndex.asReadonly(),this.step=this._step.asReadonly(),this.words=this._words.asReadonly(),this.formValues=this._formValues.asReadonly(),this.nbWordsAvailable=Z(()=>this._wordsAvailable().length),this.nbWordsAnswered=Z(()=>this._wordIdsAnswered().length),this.nbWords=Z(()=>this._words().length),this.nbFormValues=Z(()=>this._formValues().length),this.nbFormValuesValid=Z(()=>this._formValuesValidations().filter(r=>r).length),this.areAllFormValuesValid=Z(()=>this._formValuesValidations().every(r=>r)),this.areAllWordsAnswered=Z(()=>this.nbWordsAnswered()>=this.nbWordsAvailable()),this.isReversed=Z(()=>this._wordsSettingService.setting().isExerciceReversed),this.nextWordsGroup=Z(()=>{let r=this._wordsCategory()?.wordsGroups,o=this._wordsGroup(),i=Bm(r,o),s=Vm(i,a=>this._wordsCompletionService.getCompletionAge(a));return s.LONG_TIME_AGO_OR_NEVER?.[0]??s.LESS_THAN_FOUR_DAYS?.[0]}),ot(()=>{let r=this._wordsGroup();r&&this._areAllWordsAvailableAnswered()&&this._wordsCompletionService.markAsCompleted(r)}),ot(()=>{this.nbFormValuesValid()>0&&this._wordIdsAnswered.set(Ht(()=>this.computeWordsIdAnswered()))},{allowSignalWrites:!0})}getWordValue(r){return this._wordValueFn()(r)}getWordTranslation(r){return this._wordTranslationFn()(r)}getFormValue(r){return this._formValues()[r]}setFormValue(r,o){this._formValues.set(this._formValues().map((i,s)=>r===s?o:i))}isFormValueValid(r){return this._formValuesValidations()[r]}setLastInputFocusIndex(r){this._lastInputFocusIndex.set(r)}reinit(r,o){this._wordsCategory.set(r??this._wordsCategory()),this._wordsGroup.set(o??this._wordsGroup()),this._wordIdsAnswered.set([]),this.nextExercice()}reverse(){this._wordsSettingService.setIsExerciceReversed(!this.isReversed()),this._wordIdsAnswered.set([]),this._formValues.set(this._words().map(()=>"")),this._lastInputFocusIndex.set(0),this._step.set(Hs)}nextExercice(){this._words.set($m(this._wordsAvailable(),zm,this._wordIdsAnswered())),this._formValues.set(this._words().map(()=>"")),this._lastInputFocusIndex.set(0),this._step.set(Hs)}goToPreviousStep(){let r=this._stepIndex()-1;r>=0&&this._step.set(Ir[r])}goToNextStep(){let r=this._stepIndex()+1;r<Ir.length?this._step.set(Ir[r]):this.nextExercice()}computeWordsIdAnswered(){let r=this._words().filter((o,i)=>this.isFormValueValid(i)).map(o=>o.id);return[...new Set([...this._wordIdsAnswered(),...r])]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();var qs=(()=>{let t=class t{constructor(){this.btnTextXl=!0,this.btnFontBold=!0,this.btnPadding=!0,this.btnInverse=!1}};t.\u0275fac=function(o){return new(o||t)},t.\u0275dir=Yn({type:t,selectors:[["","appBtn",""]],hostAttrs:[1,"border","border-black","rounded-md","shadow-lg","hover:opacity-80","disabled:opacity-40"],hostVars:10,hostBindings:function(o,i){o&2&&Xr("text-xl",i.btnTextXl)("font-bold",i.btnFontBold)("px-2",i.btnPadding)("bg-black",i.btnInverse)("text-white",i.btnInverse)},inputs:{btnTextXl:[2,"btnTextXl","btnTextXl",bt],btnFontBold:[2,"btnFontBold","btnFontBold",bt],btnPadding:[2,"btnPadding","btnPadding",bt],btnInverse:[2,"btnInverse","btnInverse",bt]},standalone:!0,features:[Kr]});let e=t;return e})();var LS=[[["","left",""]],[["","right",""]]],jS=["[left]","[right]"],Ws=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["app-words-exercice-button-bar"]],standalone:!0,features:[z],ngContentSelectors:jS,decls:5,vars:0,consts:[[1,"flex","gap-6","pt-8"],[1,"flex-1","flex","items-stretch","justify-end","gap-4"],[1,"flex-1","flex","items-stretch","gap-4"]],template:function(o,i){o&1&&(us(LS),b(0,"div",0)(1,"div",1),eo(2),y(),b(3,"div",2),eo(4,1),y()())},encapsulation:2});let e=t;return e})();function Gs(...e){let t=e.map(n=>n?.toLowerCase());return function(n,r){return function(...o){let s=o[0]?.target?.tagName?.toLowerCase();if(!t.includes(s))return n.call(this,...o)}}}var VS=(e,t)=>t.id,BS=e=>["../..",e];function $S(e,t){if(e&1&&(b(0,"span",5),R(1),y(),b(2,"span",6),R(3),y()),e&2){let n=t.$implicit,r=Ut();_(),oe(r.wordsExerciceService.getWordValue(n)),_(2),oe(r.wordsExerciceService.getWordTranslation(n))}}function US(e,t){e&1&&(b(0,"span",7),R(1,"ES"),y(),R(2," - "),b(3,"span"),R(4,"FR"),y())}function HS(e,t){e&1&&(b(0,"span",7),R(1,"FR"),y(),R(2," - "),b(3,"span"),R(4,"ES"),y())}function zS(e,t){if(e&1&&(b(0,"a",4),R(1),y()),e&2){let n=t;ue("routerLink",ls(2,BS,n.pathParam)),_(),ir(" ",n.pathParam," ")}}var qm=(()=>{var n;let e=[],t;return n=class{constructor(){this._elementRef=(Ho(this,e),p(Se)),this.wordsExerciceService=p(mn),or(()=>this._elementRef.nativeElement.focus())}onEnter(){this.wordsExerciceService.goToNextStep()}},(()=>{let o=typeof Symbol=="function"&&Symbol.metadata?Object.create(null):void 0;t=[Gs("button","a")],Uo(n,null,t,{kind:"method",name:"onEnter",static:!1,private:!1,access:{has:i=>"onEnter"in i,get:i=>i.onEnter},metadata:o},null,e),o&&Object.defineProperty(n,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})})(),n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=H({type:n,selectors:[["app-words-exercice-step-preview"]],hostAttrs:["tabIndex","-1",1,"outline-none"],hostBindings:function(i,s){i&1&&De("keydown.Enter",function(c){return s.onEnter(c)})},standalone:!0,features:[z],decls:12,vars:2,consts:[[1,"grid","grid-cols-2","gap-4"],["type","button","ngProjectAs","[left]","appBtn","","btnTextXl","false","btnFontBold","false",5,["","left",""],3,"click"],["type","button","ngProjectAs","[left]","appBtn","",5,["","left",""],3,"click"],["type","button","ngProjectAs","[right]","appBtn","","btnInverse","true",5,["","right",""],3,"click"],["ngProjectAs","[right]","appBtn","","btnInverse","true","btnPadding","false",5,["","right",""],1,"px-3",3,"routerLink"],[1,"justify-self-end","font-bold"],[1,"border-b","border-transparent"],[1,"font-bold"]],template:function(i,s){if(i&1&&(b(0,"div",0),Fe(1,$S,4,2,null,null,VS),y(),b(3,"app-words-exercice-button-bar")(4,"button",1),De("click",function(){return s.wordsExerciceService.reverse()}),ze(5,US,5,0)(6,HS,5,0),y(),b(7,"button",2),De("click",function(){return s.wordsExerciceService.reinit()}),R(8," \u21BB "),y(),b(9,"button",3),De("click",function(){return s.wordsExerciceService.goToNextStep()}),R(10," \u2192 "),y(),ze(11,zS,2,4,"a",4),y()),i&2){let a;_(),ke(s.wordsExerciceService.words()),_(4),qe(s.wordsExerciceService.isReversed()?6:5),_(6),qe((a=s.wordsExerciceService.areAllWordsAnswered()&&s.wordsExerciceService.nextWordsGroup())?11:-1,a)}},dependencies:[Ws,Ze,qs],encapsulation:2}),n})();var qS=["formInput"],WS=(e,t)=>t.id;function GS(e,t){e&1&&(b(0,"span",7),R(1,"\u2714"),y())}function ZS(e,t){if(e&1){let n=Kp();b(0,"label",4),R(1),y(),b(2,"div",5)(3,"input",6,0),De("input",function(o){let i=Hc(n).$index,s=Ut();return zc(s.onInput(i,o))})("focus",function(){let o=Hc(n).$index,i=Ut();return zc(i.wordsExerciceService.setLastInputFocusIndex(o))}),y(),ze(5,GS,2,0,"span",7),y()}if(e&2){let n=t.$implicit,r=t.$index,o=Ut();ue("for","answer"+r),_(),oe(o.wordsExerciceService.getWordTranslation(n)),_(2),cs("flex-1 min-w-0 max-w-48 border-b border-black font-bold disabled:border-gray-400"),ue("id","answer"+r)("name","answer"+r)("value",o.wordsExerciceService.getFormValue(r))("disabled",o.wordsExerciceService.isFormValueValid(r)),_(2),qe(o.wordsExerciceService.isFormValueValid(r)?5:-1)}}var Wm=(()=>{var n;let e=[],t;return n=class{constructor(){this._elementRef=(Ho(this,e),p(Se)),this.wordsExerciceService=p(mn),ot(()=>{let o=this.wordsExerciceService.nbFormValues();if(this.wordsExerciceService.nbFormValuesValid()>=o){this._elementRef?.nativeElement?.focus();return}Ht(()=>{let a=this.wordsExerciceService.lastInputFocusIndex();for(let c=0;c<o;c++){let u=(a+c)%o;if(!this.wordsExerciceService.isFormValueValid(u)){this.inputs.get(u)?.nativeElement?.focus();return}}})})}onInput(o,i){let s=i.target.value;this.wordsExerciceService.setFormValue(o,s)}onEnter(){this.wordsExerciceService.areAllFormValuesValid()?this.wordsExerciceService.goToNextStep():this.wordsExerciceService.goToPreviousStep()}},(()=>{let o=typeof Symbol=="function"&&Symbol.metadata?Object.create(null):void 0;t=[Gs("button")],Uo(n,null,t,{kind:"method",name:"onEnter",static:!1,private:!1,access:{has:i=>"onEnter"in i,get:i=>i.onEnter},metadata:o},null,e),o&&Object.defineProperty(n,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})})(),n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=H({type:n,selectors:[["app-words-exercice-step-form"]],viewQuery:function(i,s){if(i&1&&Jp(qS,5),i&2){let a;Iu(a=Cu())&&(s.inputs=a)}},hostAttrs:["tabIndex","-1",1,"outline-none"],hostBindings:function(i,s){i&1&&De("keydown.Enter",function(c){return s.onEnter(c)})},standalone:!0,features:[z],decls:8,vars:1,consts:[["formInput",""],[1,"grid","grid-cols-2","gap-4"],["type","button","ngProjectAs","[left]","appBtn","",5,["","left",""],3,"click"],["type","button","ngProjectAs","[right]","appBtn","","btnInverse","true",5,["","right",""],3,"click","disabled"],[1,"justify-self-end",3,"for"],[1,"flex","items-start"],["type","text","autocomplete","off","autocapitalize","off",3,"input","focus","id","name","value","disabled"],[1,"px-2","font-bold"]],template:function(i,s){i&1&&(b(0,"div",1),Fe(1,ZS,6,9,null,null,WS),y(),b(3,"app-words-exercice-button-bar")(4,"button",2),De("click",function(){return s.wordsExerciceService.goToPreviousStep()}),R(5," \u2190 "),y(),b(6,"button",3),De("click",function(){return s.wordsExerciceService.goToNextStep()}),R(7," \u2714 "),y()()),i&2&&(_(),ke(s.wordsExerciceService.words()),_(5),ue("disabled",!s.wordsExerciceService.areAllFormValuesValid()))},dependencies:[Ws,qs],encapsulation:2}),n})();var Gm=(()=>{let t=class t{constructor(){this.nbWordsAnswered=Re.required(),this.nbWordsAvailable=Re.required(),this.areAllWordsAnswered=Re.required()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["app-words-exercice-header"]],inputs:{nbWordsAnswered:[1,"nbWordsAnswered"],nbWordsAvailable:[1,"nbWordsAvailable"],areAllWordsAnswered:[1,"areAllWordsAnswered"]},standalone:!0,features:[z],decls:3,vars:4,consts:[[1,"flex","justify-center","pb-4","gap-5"],[1,"py-1","px-2","text-gray-800"]],template:function(o,i){o&1&&(b(0,"div",0)(1,"span",1),R(2),y()()),o&2&&(_(),Xr("font-bold",i.areAllWordsAnswered()),_(),Su(" ",i.nbWordsAnswered()," / ",i.nbWordsAvailable()," "))},encapsulation:2});let e=t;return e})();function YS(e,t){e&1&&We(0,"app-words-exercice-step-preview")}function QS(e,t){e&1&&We(0,"app-words-exercice-step-form")}var Zm=(()=>{let t=class t{constructor(){this.wordsExerciceService=p(mn),this.wordsCategory=Re.required(),this.wordsGroup=Re.required(),ot(()=>{let r=this.wordsCategory(),o=this.wordsGroup();Ht(()=>this.wordsExerciceService.reinit(r,o))})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["ng-component"]],hostAttrs:["tabIndex","-1"],inputs:{wordsCategory:[1,"wordsCategory"],wordsGroup:[1,"wordsGroup"]},standalone:!0,features:[tg([mn]),z],decls:4,vars:5,consts:[[3,"nbWordsAnswered","nbWordsAvailable","areAllWordsAnswered"]],template:function(o,i){o&1&&(b(0,"app-client-side"),We(1,"app-words-exercice-header",0),ze(2,YS,1,0,"app-words-exercice-step-preview")(3,QS,1,0,"app-words-exercice-step-form"),y()),o&2&&(_(),ue("nbWordsAnswered",i.wordsExerciceService.nbWordsAnswered())("nbWordsAvailable",i.wordsExerciceService.nbWordsAvailable())("areAllWordsAnswered",i.wordsExerciceService.areAllWordsAnswered()),_(),qe(i.wordsExerciceService.step()==="preview"?2:-1),_(),qe(i.wordsExerciceService.step()==="form"?3:-1))},dependencies:[Am,Gm,qm,Wm],encapsulation:2});let e=t;return e})();function KS(e,t){if(e&1&&(b(0,"a",3)(1,"b"),R(2),y(),R(3),y()),e&2){let n=t.$implicit;ue("routerLink",n.pathParam),_(2),oe(n.label),_(),ir(" (",n.nbWords,")")}}var Ym=(()=>{let t=class t{constructor(){this.wordsCategories=Re.required(),this.nbWords=Z(()=>this.wordsCategories().map(r=>r.nbWords).reduce((r,o)=>r+o,0))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["ng-component"]],inputs:{wordsCategories:[1,"wordsCategories"]},standalone:!0,features:[z],decls:7,vars:1,consts:[[1,"text-center","text-2xl"],[1,"font-bold","text-white","bg-black","px-1","rounded-md"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-10","items-center","pt-8"],[1,"py-12","text-lg","text-center","border","border-gray-400","rounded-t-md","shadow-md",3,"routerLink"]],template:function(o,i){o&1&&(b(0,"div",0)(1,"span",1),R(2),y(),R(3,` mots
`),y(),b(4,"div",2),Fe(5,KS,4,3,"a",3,ln),y()),o&2&&(_(2),oe(i.nbWords()),_(3),ke(i.wordsCategories()))},dependencies:[Ze],encapsulation:2});let e=t;return e})();var JS=e=>[e];function XS(e,t){if(e&1&&(b(0,"span"),R(1),y()),e&2){let n=t.$implicit;_(),oe(n.es)}}function eM(e,t){if(e&1&&(b(0,"a",1)(1,"div",2)(2,"span",3),R(3),y(),b(4,"span",4),R(5),y()(),b(6,"div",5)(7,"div",6),Fe(8,XS,2,1,"span",null,ln),y()()()),e&2){let n=t.$implicit,r=t.$index,o=Ut();ue("routerLink",ls(5,JS,n.pathParam)),_(),cs(o.getHeaderClass(n.completionAge)),_(2),oe(r+1),_(2),oe(n.words.length),_(3),ke(n.words)}}var Qm=(()=>{let t=class t{constructor(){this._wordsCompletionService=p(Er),this.wordsCategory=Re.required(),this.wordsGroups=Z(()=>this.wordsCategory().wordsGroups.map(r=>B(m({},r),{completionAge:this._wordsCompletionService.getCompletionAge(r)})))}getHeaderClass(r){return tM[r]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["ng-component"]],inputs:{wordsCategory:[1,"wordsCategory"]},standalone:!0,features:[z],decls:3,vars:0,consts:[[1,"flex","flex-col","gap-12"],[1,"border","border-gray-400","rounded-t-md","shadow-md",3,"routerLink"],[1,"flex","justify-between","items-center","px-5","py-1"],[1,"text-lg","font-bold"],[1,"text-sm"],[1,"p-3","pb-5","text-gray-950"],[1,"flex","flex-wrap","gap-x-4","gap-y-2"]],template:function(o,i){o&1&&(b(0,"div",0),Fe(1,eM,10,7,"a",1,ln),y()),o&2&&(_(),ke(i.wordsGroups()))},dependencies:[Ze],encapsulation:2});let e=t;return e})(),tM={LESS_THAN_TWO_DAYS:"bg-black text-white bg-opacity-100",LESS_THAN_FOUR_DAYS:"bg-black text-white bg-opacity-60",LONG_TIME_AGO_OR_NEVER:""};var Km=(e,t)=>{if(t.length===0)return!0;if(t.length===1){let n=t[0].path;return!!Mo(n)}if(t.length>=2){let n=t[0].path,r=t[1].path;return!!$s(n,r)}return!1};var Jm=e=>{let t=ev(e);return Mo(t)},Xm=e=>{let t=ev(e),n=nM(e);return $s(t,n)};function ev(e){return e.paramMap.get("wordsCategory")}function nM(e){return e.paramMap.get("wordsGroup")}function tv(e){return`Vocabulaire Espagnol | ${xl(e)} - Voces`}function nv(e){let t=xl(e),n=ov(e);return`Vocabulaire Espagnol | ${t} | ${n} - Voces`}function rv(e){let t=xl(e),n=ov(e);return`Vocabulaire Espagnol | ${t} | ${n} | Exercice - Voces`}function xl(e){return iv(e,"wordsCategory")?.label||""}function ov(e){return iv(e,"wordsGroup")?.pathParam||""}function iv(e,t){for(;e!=null;){if(e.data[t])return e.data[t];e=e.parent}return null}var sv=[{path:"",canMatch:[Km],providers:[Er,zs],children:[{path:"",title:"Vocabulaire Espagnol - Voces",component:Ym,resolve:{wordsCategories:()=>Cl}},{path:":wordsCategory",resolve:{wordsCategory:Jm},children:[{path:"",title:tv,component:Qm},{path:":wordsGroup",resolve:{wordsGroup:Xm},children:[{path:"",title:nv,component:Nm},{path:"exercice",title:rv,component:Zm}]}]}]}];var av=[...sv,{path:"**",component:Bs,title:"Page non trouv\xE9e | Voces"}];var cv={providers:[Mm(av,_m(),Tm({scrollPositionRestoration:"enabled"})),$g()]};function Tl(e,t){let n=!t?.manualCleanup;n&&!t?.injector&&Gi(Tl);let r=n?t?.injector?.get(un)??p(un):null,o=rM(t?.equal),i;t?.requireSync?i=Pe({kind:0},{equal:o}):i=Pe({kind:1,value:t?.initialValue},{equal:o});let s=e.subscribe({next:a=>i.set({kind:1,value:a}),error:a=>{if(t?.rejectErrors)throw a;i.set({kind:2,error:a})}});if(t?.requireSync&&i().kind===0)throw new w(601,!1);return r?.onDestroy(s.unsubscribe.bind(s)),Z(()=>{let a=i();switch(a.kind){case 1:return a.value;case 2:throw a.error;case 0:throw new w(601,!1)}},{equal:t?.equal})}function rM(e=Object.is){return(t,n)=>t.kind===1&&n.kind===1&&e(t.value,n.value)}var uv={url:"/",label:"voces"};function lv(e){let t=[uv],n=null;for(;e!=null;)e.url.length>0&&oM(t,e),n=e.component,e=e.firstChild;return n!=null&&n!=Bs?t:[uv]}function oM(e,t){let n=e.length>0?e[e.length-1].url:"";e.push({label:t.url.join(" ").replaceAll("-"," "),url:[n,...t.url].join("/")})}function iM(e,t){e&1&&(b(0,"span",2),R(1,"/"),y())}function sM(e,t){if(e&1&&(b(0,"a",1),R(1),y(),ze(2,iM,2,0,"span",2)),e&2){let n=t.$implicit,r=t.$index,o=t.$count;ue("routerLink",n.url),_(),oe(n.label),_(),qe(r!==o-1?2:-1)}}var dv=(()=>{let t=class t{constructor(){this.router=p(gn),this.route=p(at),this.breadcrumb=Tl(this.router.events.pipe(me(r=>r instanceof st),O(()=>lv(this.route.root.snapshot))))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["app-breadcrumb"]],standalone:!0,features:[z],decls:3,vars:0,consts:[[1,"flex","flex-wrap","items-center","gap-2","text-sm"],[1,"capitalize","text-gray-700","hover:text-black",3,"routerLink"],[1,"px-1"]],template:function(o,i){o&1&&(b(0,"div",0),Fe(1,sM,3,3,null,null,ln),y()),o&2&&(_(),ke(i.breadcrumb()))},dependencies:[Ze],encapsulation:2});let e=t;return e})();var fv=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["app-header"]],standalone:!0,features:[z],decls:2,vars:0,consts:[[1,"pt-3","pb-5","flex","justify-between","items-center"]],template:function(o,i){o&1&&(b(0,"header",0),We(1,"app-breadcrumb"),y())},dependencies:[dv],encapsulation:2});let e=t;return e})();var hv=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=H({type:t,selectors:[["app-root"]],standalone:!0,features:[z],decls:4,vars:0,consts:[[1,"max-w-7xl","mx-auto","pb-10","px-4"]],template:function(o,i){o&1&&(b(0,"div",0),We(1,"app-header"),b(2,"main"),We(3,"router-outlet"),y()())},dependencies:[yl,fv],encapsulation:2});let e=t;return e})();Vg(hv,cv).catch(e=>console.error(e));
