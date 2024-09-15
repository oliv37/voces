var Xm=Object.defineProperty,ev=Object.defineProperties;var tv=Object.getOwnPropertyDescriptors;var Co=Object.getOwnPropertySymbols;var Sl=Object.prototype.hasOwnProperty,Ml=Object.prototype.propertyIsEnumerable;var Il=(e,t,n)=>t in e?Xm(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t)=>{for(var n in t||={})Sl.call(t,n)&&Il(e,n,t[n]);if(Co)for(var n of Co(t))Ml.call(t,n)&&Il(e,n,t[n]);return e},z=(e,t)=>ev(e,tv(t));var xl=(e,t)=>{var n={};for(var r in e)Sl.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&Co)for(var r of Co(e))t.indexOf(r)<0&&Ml.call(e,r)&&(n[r]=e[r]);return n};var js=(e,t,n)=>new Promise((r,o)=>{var i=c=>{try{a(n.next(c))}catch(u){o(u)}},s=c=>{try{a(n.throw(c))}catch(u){o(u)}},a=c=>c.done?r(c.value):Promise.resolve(c.value).then(i,s);a((n=n.apply(e,t)).next())});function Tl(e,t){return Object.is(e,t)}var te=null,br=!1,Io=1,at=Symbol("SIGNAL");function P(e){let t=te;return te=e,t}function _l(){return te}function nv(){return br}var vn={version:0,lastCleanEpoch:0,dirty:!1,producerNode:void 0,producerLastReadVersion:void 0,producerIndexOfThis:void 0,nextProducerIndex:0,liveConsumerNode:void 0,liveConsumerIndexOfThis:void 0,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Mo(e){if(br)throw new Error("");if(te===null)return;te.consumerOnSignalRead(e);let t=te.nextProducerIndex++;if(No(te),t<te.producerNode.length&&te.producerNode[t]!==e&&wr(te)){let n=te.producerNode[t];Ao(n,te.producerIndexOfThis[t])}te.producerNode[t]!==e&&(te.producerNode[t]=e,te.producerIndexOfThis[t]=wr(te)?Pl(e,te,t):0),te.producerLastReadVersion[t]=e.version}function rv(){Io++}function Al(e){if(!(wr(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Io)){if(!e.producerMustRecompute(e)&&!To(e)){e.dirty=!1,e.lastCleanEpoch=Io;return}e.producerRecomputeValue(e),e.dirty=!1,e.lastCleanEpoch=Io}}function Nl(e){if(e.liveConsumerNode===void 0)return;let t=br;br=!0;try{for(let n of e.liveConsumerNode)n.dirty||Ol(n)}finally{br=t}}function Rl(){return te?.consumerAllowSignalWrites!==!1}function Ol(e){e.dirty=!0,Nl(e),e.consumerMarkedDirty?.(e)}function Er(e){return e&&(e.nextProducerIndex=0),P(e)}function xo(e,t){if(P(t),!(!e||e.producerNode===void 0||e.producerIndexOfThis===void 0||e.producerLastReadVersion===void 0)){if(wr(e))for(let n=e.nextProducerIndex;n<e.producerNode.length;n++)Ao(e.producerNode[n],e.producerIndexOfThis[n]);for(;e.producerNode.length>e.nextProducerIndex;)e.producerNode.pop(),e.producerLastReadVersion.pop(),e.producerIndexOfThis.pop()}}function To(e){No(e);for(let t=0;t<e.producerNode.length;t++){let n=e.producerNode[t],r=e.producerLastReadVersion[t];if(r!==n.version||(Al(n),r!==n.version))return!0}return!1}function _o(e){if(No(e),wr(e))for(let t=0;t<e.producerNode.length;t++)Ao(e.producerNode[t],e.producerIndexOfThis[t]);e.producerNode.length=e.producerLastReadVersion.length=e.producerIndexOfThis.length=0,e.liveConsumerNode&&(e.liveConsumerNode.length=e.liveConsumerIndexOfThis.length=0)}function Pl(e,t,n){if(kl(e),e.liveConsumerNode.length===0&&Fl(e))for(let r=0;r<e.producerNode.length;r++)e.producerIndexOfThis[r]=Pl(e.producerNode[r],e,r);return e.liveConsumerIndexOfThis.push(n),e.liveConsumerNode.push(t)-1}function Ao(e,t){if(kl(e),e.liveConsumerNode.length===1&&Fl(e))for(let r=0;r<e.producerNode.length;r++)Ao(e.producerNode[r],e.producerIndexOfThis[r]);let n=e.liveConsumerNode.length-1;if(e.liveConsumerNode[t]=e.liveConsumerNode[n],e.liveConsumerIndexOfThis[t]=e.liveConsumerIndexOfThis[n],e.liveConsumerNode.length--,e.liveConsumerIndexOfThis.length--,t<e.liveConsumerNode.length){let r=e.liveConsumerIndexOfThis[t],o=e.liveConsumerNode[t];No(o),o.producerIndexOfThis[r]=t}}function wr(e){return e.consumerIsAlwaysLive||(e?.liveConsumerNode?.length??0)>0}function No(e){e.producerNode??=[],e.producerIndexOfThis??=[],e.producerLastReadVersion??=[]}function kl(e){e.liveConsumerNode??=[],e.liveConsumerIndexOfThis??=[]}function Fl(e){return e.producerNode!==void 0}function Ll(e){let t=Object.create(ov);t.computation=e;let n=()=>{if(Al(t),Mo(t),t.value===So)throw t.error;return t.value};return n[at]=t,n}var Vs=Symbol("UNSET"),Bs=Symbol("COMPUTING"),So=Symbol("ERRORED"),ov=z(m({},vn),{value:Vs,dirty:!0,error:null,equal:Tl,producerMustRecompute(e){return e.value===Vs||e.value===Bs},producerRecomputeValue(e){if(e.value===Bs)throw new Error("Detected cycle in computations.");let t=e.value;e.value=Bs;let n=Er(e),r;try{r=e.computation()}catch(o){r=So,e.error=o}finally{xo(e,n)}if(t!==Vs&&t!==So&&r!==So&&e.equal(t,r)){e.value=t;return}e.value=r,e.version++}});function iv(){throw new Error}var jl=iv;function Vl(){jl()}function Bl(e){jl=e}var sv=null;function $l(e){let t=Object.create(Us);t.value=e;let n=()=>(Mo(t),t.value);return n[at]=t,n}function Ro(e,t){Rl()||Vl(),e.equal(e.value,t)||(e.value=t,av(e))}function Ul(e,t){Rl()||Vl(),Ro(e,t(e.value))}var Us=z(m({},vn),{equal:Tl,value:void 0});function av(e){e.version++,rv(),Nl(e),sv?.()}function Hl(e,t,n){let r=Object.create(cv);n&&(r.consumerAllowSignalWrites=!0),r.fn=e,r.schedule=t;let o=c=>{r.cleanupFn=c};function i(c){return c.fn===null&&c.schedule===null}function s(c){i(c)||(_o(c),c.cleanupFn(),c.fn=null,c.schedule=null,c.cleanupFn=$s)}let a=()=>{if(r.fn===null)return;if(nv())throw new Error("Schedulers cannot synchronously execute watches while scheduling.");if(r.dirty=!1,r.hasRun&&!To(r))return;r.hasRun=!0;let c=Er(r);try{r.cleanupFn(),r.cleanupFn=$s,r.fn(o)}finally{xo(r,c)}};return r.ref={notify:()=>Ol(r),run:a,cleanup:()=>r.cleanupFn(),destroy:()=>s(r),[at]:r},r.ref}var $s=()=>{},cv=z(m({},vn),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!1,consumerMarkedDirty:e=>{e.schedule!==null&&e.schedule(e.ref)},hasRun:!1,cleanupFn:$s});function T(e){return typeof e=="function"}function yn(e){let n=e(r=>{Error.call(r),r.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var Oo=yn(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Cr(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var Y=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let i of n)i.remove(this);else n.remove(this);let{initialTeardown:r}=this;if(T(r))try{r()}catch(i){t=i instanceof Oo?i.errors:[i]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{zl(i)}catch(s){t=t??[],s instanceof Oo?t=[...t,...s.errors]:t.push(s)}}if(t)throw new Oo(t)}}add(t){var n;if(t&&t!==this)if(this.closed)zl(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&Cr(n,t)}remove(t){let{_finalizers:n}=this;n&&Cr(n,t),t instanceof e&&t._removeParent(this)}};Y.EMPTY=(()=>{let e=new Y;return e.closed=!0,e})();var Hs=Y.EMPTY;function Po(e){return e instanceof Y||e&&"closed"in e&&T(e.remove)&&T(e.add)&&T(e.unsubscribe)}function zl(e){T(e)?e():e.unsubscribe()}var We={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Dn={setTimeout(e,t,...n){let{delegate:r}=Dn;return r?.setTimeout?r.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=Dn;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function ko(e){Dn.setTimeout(()=>{let{onUnhandledError:t}=We;if(t)t(e);else throw e})}function Ir(){}var ql=zs("C",void 0,void 0);function Wl(e){return zs("E",void 0,e)}function Gl(e){return zs("N",e,void 0)}function zs(e,t,n){return{kind:e,value:t,error:n}}var Wt=null;function bn(e){if(We.useDeprecatedSynchronousErrorHandling){let t=!Wt;if(t&&(Wt={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:r}=Wt;if(Wt=null,n)throw r}}else e()}function Zl(e){We.useDeprecatedSynchronousErrorHandling&&Wt&&(Wt.errorThrown=!0,Wt.error=e)}var Gt=class extends Y{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,Po(t)&&t.add(this)):this.destination=dv}static create(t,n,r){return new wn(t,n,r)}next(t){this.isStopped?Ws(Gl(t),this):this._next(t)}error(t){this.isStopped?Ws(Wl(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?Ws(ql,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},uv=Function.prototype.bind;function qs(e,t){return uv.call(e,t)}var Gs=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(r){Fo(r)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(r){Fo(r)}else Fo(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){Fo(n)}}},wn=class extends Gt{constructor(t,n,r){super();let o;if(T(t)||!t)o={next:t??void 0,error:n??void 0,complete:r??void 0};else{let i;this&&We.useDeprecatedNextContext?(i=Object.create(t),i.unsubscribe=()=>this.unsubscribe(),o={next:t.next&&qs(t.next,i),error:t.error&&qs(t.error,i),complete:t.complete&&qs(t.complete,i)}):o=t}this.destination=new Gs(o)}};function Fo(e){We.useDeprecatedSynchronousErrorHandling?Zl(e):ko(e)}function lv(e){throw e}function Ws(e,t){let{onStoppedNotification:n}=We;n&&Dn.setTimeout(()=>n(e,t))}var dv={closed:!0,next:Ir,error:lv,complete:Ir};var En=typeof Symbol=="function"&&Symbol.observable||"@@observable";function xe(e){return e}function Zs(...e){return Ys(e)}function Ys(e){return e.length===0?xe:e.length===1?e[0]:function(n){return e.reduce((r,o)=>o(r),n)}}var $=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let r=new e;return r.source=this,r.operator=n,r}subscribe(n,r,o){let i=hv(n)?n:new wn(n,r,o);return bn(()=>{let{operator:s,source:a}=this;i.add(s?s.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(r){n.error(r)}}forEach(n,r){return r=Yl(r),new r((o,i)=>{let s=new wn({next:a=>{try{n(a)}catch(c){i(c),s.unsubscribe()}},error:i,complete:o});this.subscribe(s)})}_subscribe(n){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(n)}[En](){return this}pipe(...n){return Ys(n)(this)}toPromise(n){return n=Yl(n),new n((r,o)=>{let i;this.subscribe(s=>i=s,s=>o(s),()=>r(i))})}}return e.create=t=>new e(t),e})();function Yl(e){var t;return(t=e??We.Promise)!==null&&t!==void 0?t:Promise}function fv(e){return e&&T(e.next)&&T(e.error)&&T(e.complete)}function hv(e){return e&&e instanceof Gt||fv(e)&&Po(e)}function Qs(e){return T(e?.lift)}function L(e){return t=>{if(Qs(t))return t.lift(function(n){try{return e(n,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function j(e,t,n,r,o){return new Ks(e,t,n,r,o)}var Ks=class extends Gt{constructor(t,n,r,o,i,s){super(t),this.onFinalize=i,this.shouldUnsubscribe=s,this._next=n?function(a){try{n(a)}catch(c){t.error(c)}}:super._next,this._error=o?function(a){try{o(a)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){t.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Cn(){return L((e,t)=>{let n=null;e._refCount++;let r=j(t,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){n=null;return}let o=e._connection,i=n;n=null,o&&(!i||o===i)&&o.unsubscribe(),t.unsubscribe()});e.subscribe(r),r.closed||(n=e.connect())})}var In=class extends ${constructor(t,n){super(),this.source=t,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,Qs(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new Y;let n=this.getSubject();t.add(this.source.subscribe(j(n,void 0,()=>{this._teardown(),n.complete()},r=>{this._teardown(),n.error(r)},()=>this._teardown()))),t.closed&&(this._connection=null,t=Y.EMPTY)}return t}refCount(){return Cn()(this)}};var Ql=yn(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var he=(()=>{class e extends ${constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let r=new Lo(this,this);return r.operator=n,r}_throwIfClosed(){if(this.closed)throw new Ql}next(n){bn(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(n)}})}error(n){bn(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:r}=this;for(;r.length;)r.shift().error(n)}})}complete(){bn(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:r,isStopped:o,observers:i}=this;return r||o?Hs:(this.currentObservers=null,i.push(n),new Y(()=>{this.currentObservers=null,Cr(i,n)}))}_checkFinalizedStatuses(n){let{hasError:r,thrownError:o,isStopped:i}=this;r?n.error(o):i&&n.complete()}asObservable(){let n=new $;return n.source=this,n}}return e.create=(t,n)=>new Lo(t,n),e})(),Lo=class extends he{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,t)}error(t){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&r!==void 0?r:Hs}};var le=class extends he{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:r}=this;if(t)throw n;return this._throwIfClosed(),r}next(t){super.next(this._value=t)}};var Te=new $(e=>e.complete());function Kl(e){return e&&T(e.schedule)}function Jl(e){return e[e.length-1]}function Xl(e){return T(Jl(e))?e.pop():void 0}function Nt(e){return Kl(Jl(e))?e.pop():void 0}function jo(e,t,n,r,o,i){function s(_){if(_!==void 0&&typeof _!="function")throw new TypeError("Function expected");return _}for(var a=r.kind,c=a==="getter"?"get":a==="setter"?"set":"value",u=!t&&e?r.static?e:e.prototype:null,l=t||(u?Object.getOwnPropertyDescriptor(u,r.name):{}),d,f=!1,h=n.length-1;h>=0;h--){var g={};for(var v in r)g[v]=v==="access"?{}:r[v];for(var v in r.access)g.access[v]=r.access[v];g.addInitializer=function(_){if(f)throw new TypeError("Cannot add initializers after decoration has completed");i.push(s(_||null))};var I=(0,n[h])(a==="accessor"?{get:l.get,set:l.set}:l[c],g);if(a==="accessor"){if(I===void 0)continue;if(I===null||typeof I!="object")throw new TypeError("Object expected");(d=s(I.get))&&(l.get=d),(d=s(I.set))&&(l.set=d),(d=s(I.init))&&o.unshift(d)}else(d=s(I))&&(a==="field"?o.unshift(d):l[c]=d)}u&&Object.defineProperty(u,r.name,l),f=!0}function Vo(e,t,n){for(var r=arguments.length>2,o=0;o<t.length;o++)n=r?t[o].call(e,n):t[o].call(e);return r?n:void 0}function td(e,t,n,r){function o(i){return i instanceof n?i:new n(function(s){s(i)})}return new(n||(n=Promise))(function(i,s){function a(l){try{u(r.next(l))}catch(d){s(d)}}function c(l){try{u(r.throw(l))}catch(d){s(d)}}function u(l){l.done?i(l.value):o(l.value).then(a,c)}u((r=r.apply(e,t||[])).next())})}function ed(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Zt(e){return this instanceof Zt?(this.v=e,this):new Zt(e)}function nd(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=n.apply(e,t||[]),o,i=[];return o={},s("next"),s("throw"),s("return"),o[Symbol.asyncIterator]=function(){return this},o;function s(f){r[f]&&(o[f]=function(h){return new Promise(function(g,v){i.push([f,h,g,v])>1||a(f,h)})})}function a(f,h){try{c(r[f](h))}catch(g){d(i[0][3],g)}}function c(f){f.value instanceof Zt?Promise.resolve(f.value.v).then(u,l):d(i[0][2],f)}function u(f){a("next",f)}function l(f){a("throw",f)}function d(f,h){f(h),i.shift(),i.length&&a(i[0][0],i[0][1])}}function rd(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof ed=="function"?ed(e):e[Symbol.iterator](),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(i){n[i]=e[i]&&function(s){return new Promise(function(a,c){s=e[i](s),o(a,c,s.done,s.value)})}}function o(i,s,a,c){Promise.resolve(c).then(function(u){i({value:u,done:a})},s)}}var Bo=e=>e&&typeof e.length=="number"&&typeof e!="function";function $o(e){return T(e?.then)}function Uo(e){return T(e[En])}function Ho(e){return Symbol.asyncIterator&&T(e?.[Symbol.asyncIterator])}function zo(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function pv(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var qo=pv();function Wo(e){return T(e?.[qo])}function Go(e){return nd(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:r,done:o}=yield Zt(n.read());if(o)return yield Zt(void 0);yield yield Zt(r)}}finally{n.releaseLock()}})}function Zo(e){return T(e?.getReader)}function ae(e){if(e instanceof $)return e;if(e!=null){if(Uo(e))return gv(e);if(Bo(e))return mv(e);if($o(e))return vv(e);if(Ho(e))return od(e);if(Wo(e))return yv(e);if(Zo(e))return Dv(e)}throw zo(e)}function gv(e){return new $(t=>{let n=e[En]();if(T(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function mv(e){return new $(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function vv(e){return new $(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,ko)})}function yv(e){return new $(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function od(e){return new $(t=>{bv(e,t).catch(n=>t.error(n))})}function Dv(e){return od(Go(e))}function bv(e,t){var n,r,o,i;return td(this,void 0,void 0,function*(){try{for(n=rd(e);r=yield n.next(),!r.done;){let s=r.value;if(t.next(s),t.closed)return}}catch(s){o={error:s}}finally{try{r&&!r.done&&(i=n.return)&&(yield i.call(n))}finally{if(o)throw o.error}}t.complete()})}function be(e,t,n,r=0,o=!1){let i=t.schedule(function(){n(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function Yo(e,t=0){return L((n,r)=>{n.subscribe(j(r,o=>be(r,e,()=>r.next(o),t),()=>be(r,e,()=>r.complete(),t),o=>be(r,e,()=>r.error(o),t)))})}function Qo(e,t=0){return L((n,r)=>{r.add(e.schedule(()=>n.subscribe(r),t))})}function id(e,t){return ae(e).pipe(Qo(t),Yo(t))}function sd(e,t){return ae(e).pipe(Qo(t),Yo(t))}function ad(e,t){return new $(n=>{let r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function cd(e,t){return new $(n=>{let r;return be(n,t,()=>{r=e[qo](),be(n,t,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(s){n.error(s);return}i?n.complete():n.next(o)},0,!0)}),()=>T(r?.return)&&r.return()})}function Ko(e,t){if(!e)throw new Error("Iterable cannot be null");return new $(n=>{be(n,t,()=>{let r=e[Symbol.asyncIterator]();be(n,t,()=>{r.next().then(o=>{o.done?n.complete():n.next(o.value)})},0,!0)})})}function ud(e,t){return Ko(Go(e),t)}function ld(e,t){if(e!=null){if(Uo(e))return id(e,t);if(Bo(e))return ad(e,t);if($o(e))return sd(e,t);if(Ho(e))return Ko(e,t);if(Wo(e))return cd(e,t);if(Zo(e))return ud(e,t)}throw zo(e)}function Q(e,t){return t?ld(e,t):ae(e)}function S(...e){let t=Nt(e);return Q(e,t)}function Sn(e,t){let n=T(e)?e:()=>e,r=o=>o.error(n());return new $(t?o=>t.schedule(r,0,o):r)}function Js(e){return!!e&&(e instanceof $||T(e.lift)&&T(e.subscribe))}var bt=yn(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function R(e,t){return L((n,r)=>{let o=0;n.subscribe(j(r,i=>{r.next(e.call(t,i,o++))}))})}var{isArray:wv}=Array;function Ev(e,t){return wv(t)?e(...t):e(t)}function dd(e){return R(t=>Ev(e,t))}var{isArray:Cv}=Array,{getPrototypeOf:Iv,prototype:Sv,keys:Mv}=Object;function fd(e){if(e.length===1){let t=e[0];if(Cv(t))return{args:t,keys:null};if(xv(t)){let n=Mv(t);return{args:n.map(r=>t[r]),keys:n}}}return{args:e,keys:null}}function xv(e){return e&&typeof e=="object"&&Iv(e)===Sv}function hd(e,t){return e.reduce((n,r,o)=>(n[r]=t[o],n),{})}function Sr(...e){let t=Nt(e),n=Xl(e),{args:r,keys:o}=fd(e);if(r.length===0)return Q([],t);let i=new $(Tv(r,t,o?s=>hd(o,s):xe));return n?i.pipe(dd(n)):i}function Tv(e,t,n=xe){return r=>{pd(t,()=>{let{length:o}=e,i=new Array(o),s=o,a=o;for(let c=0;c<o;c++)pd(t,()=>{let u=Q(e[c],t),l=!1;u.subscribe(j(r,d=>{i[c]=d,l||(l=!0,a--),a||r.next(n(i.slice()))},()=>{--s||r.complete()}))},r)},r)}}function pd(e,t,n){e?be(n,e,t):t()}function gd(e,t,n,r,o,i,s,a){let c=[],u=0,l=0,d=!1,f=()=>{d&&!c.length&&!u&&t.complete()},h=v=>u<r?g(v):c.push(v),g=v=>{i&&t.next(v),u++;let I=!1;ae(n(v,l++)).subscribe(j(t,_=>{o?.(_),i?h(_):t.next(_)},()=>{I=!0},void 0,()=>{if(I)try{for(u--;c.length&&u<r;){let _=c.shift();s?be(t,s,()=>g(_)):g(_)}f()}catch(_){t.error(_)}}))};return e.subscribe(j(t,h,()=>{d=!0,f()})),()=>{a?.()}}function ne(e,t,n=1/0){return T(t)?ne((r,o)=>R((i,s)=>t(r,i,o,s))(ae(e(r,o))),n):(typeof t=="number"&&(n=t),L((r,o)=>gd(r,o,e,n)))}function Xs(e=1/0){return ne(xe,e)}function md(){return Xs(1)}function Mn(...e){return md()(Q(e,Nt(e)))}function Jo(e){return new $(t=>{ae(e()).subscribe(t)})}function me(e,t){return L((n,r)=>{let o=0;n.subscribe(j(r,i=>e.call(t,i,o++)&&r.next(i)))})}function Rt(e){return L((t,n)=>{let r=null,o=!1,i;r=t.subscribe(j(n,void 0,void 0,s=>{i=ae(e(s,Rt(e)(t))),r?(r.unsubscribe(),r=null,i.subscribe(n)):o=!0})),o&&(r.unsubscribe(),r=null,i.subscribe(n))})}function vd(e,t,n,r,o){return(i,s)=>{let a=n,c=t,u=0;i.subscribe(j(s,l=>{let d=u++;c=a?e(c,l,d):(a=!0,l),r&&s.next(c)},o&&(()=>{a&&s.next(c),s.complete()})))}}function Yt(e,t){return T(t)?ne(e,t,1):ne(e,1)}function Ot(e){return L((t,n)=>{let r=!1;t.subscribe(j(n,o=>{r=!0,n.next(o)},()=>{r||n.next(e),n.complete()}))})}function wt(e){return e<=0?()=>Te:L((t,n)=>{let r=0;t.subscribe(j(n,o=>{++r<=e&&(n.next(o),e<=r&&n.complete())}))})}function ea(e){return R(()=>e)}function Xo(e=_v){return L((t,n)=>{let r=!1;t.subscribe(j(n,o=>{r=!0,n.next(o)},()=>r?n.complete():n.error(e())))})}function _v(){return new bt}function xn(e){return L((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function Ge(e,t){let n=arguments.length>=2;return r=>r.pipe(e?me((o,i)=>e(o,i,r)):xe,wt(1),n?Ot(t):Xo(()=>new bt))}function Tn(e){return e<=0?()=>Te:L((t,n)=>{let r=[];t.subscribe(j(n,o=>{r.push(o),e<r.length&&r.shift()},()=>{for(let o of r)n.next(o);n.complete()},void 0,()=>{r=null}))})}function ta(e,t){let n=arguments.length>=2;return r=>r.pipe(e?me((o,i)=>e(o,i,r)):xe,Tn(1),n?Ot(t):Xo(()=>new bt))}function na(e,t){return L(vd(e,t,arguments.length>=2,!0))}function ra(...e){let t=Nt(e);return L((n,r)=>{(t?Mn(e,n,t):Mn(e,n)).subscribe(r)})}function _e(e,t){return L((n,r)=>{let o=null,i=0,s=!1,a=()=>s&&!o&&r.complete();n.subscribe(j(r,c=>{o?.unsubscribe();let u=0,l=i++;ae(e(c,l)).subscribe(o=j(r,d=>r.next(t?t(c,d,l,u++):d),()=>{o=null,a()}))},()=>{s=!0,a()}))})}function oa(e){return L((t,n)=>{ae(e).subscribe(j(n,()=>n.complete(),Ir)),!n.closed&&t.subscribe(n)})}function re(e,t,n){let r=T(e)||t||n?{next:e,error:t,complete:n}:e;return r?L((o,i)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;o.subscribe(j(i,c=>{var u;(u=r.next)===null||u===void 0||u.call(r,c),i.next(c)},()=>{var c;a=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete()},c=>{var u;a=!1,(u=r.error)===null||u===void 0||u.call(r,c),i.error(c)},()=>{var c,u;a&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(u=r.finalize)===null||u===void 0||u.call(r)}))}):xe}var nf="https://g.co/ng/security#xss",y=class extends Error{constructor(t,n){super(Fi(t,n)),this.code=t}};function Fi(e,t){return`${`NG0${Math.abs(e)}`}${t?": "+t:""}`}var rf=Symbol("InputSignalNode#UNSET"),Av=z(m({},Us),{transformFn:void 0,applyValueToInputSignal(e,t){Ro(e,t)}});function of(e,t){let n=Object.create(Av);n.value=e,n.transformFn=t?.transform;function r(){if(Mo(n),n.value===rf)throw new y(-950,!1);return n.value}return r[at]=n,r}function wc(e){return{toString:e}.toString()}var Tr=globalThis;function q(e){for(let t in e)if(e[t]===q)return t;throw Error("Could not find renamed property on target object.")}function we(e){if(typeof e=="string")return e;if(Array.isArray(e))return"["+e.map(we).join(", ")+"]";if(e==null)return""+e;if(e.overriddenName)return`${e.overriddenName}`;if(e.name)return`${e.name}`;let t=e.toString();if(t==null)return""+t;let n=t.indexOf(`
`);return n===-1?t:t.substring(0,n)}function wa(e,t){return e==null||e===""?t===null?"":t:t==null||t===""?e:e+" "+t}var Nv=q({__forward_ref__:q});function sf(e){return e.__forward_ref__=sf,e.toString=function(){return we(this())},e}function ve(e){return af(e)?e():e}function af(e){return typeof e=="function"&&e.hasOwnProperty(Nv)&&e.__forward_ref__===sf}function D(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function Li(e){return yd(e,uf)||yd(e,lf)}function cf(e){return Li(e)!==null}function yd(e,t){return e.hasOwnProperty(t)?e[t]:null}function Rv(e){let t=e&&(e[uf]||e[lf]);return t||null}function Dd(e){return e&&(e.hasOwnProperty(bd)||e.hasOwnProperty(Ov))?e[bd]:null}var uf=q({\u0275prov:q}),bd=q({\u0275inj:q}),lf=q({ngInjectableDef:q}),Ov=q({ngInjectorDef:q}),x=class{constructor(t,n){this._desc=t,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=D({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function df(e){return e&&!!e.\u0275providers}var Pv=q({\u0275cmp:q}),kv=q({\u0275dir:q}),Fv=q({\u0275pipe:q}),Lv=q({\u0275mod:q}),di=q({\u0275fac:q}),xr=q({__NG_ELEMENT_ID__:q}),wd=q({__NG_ENV_ID__:q});function kn(e){return typeof e=="string"?e:e==null?"":String(e)}function jv(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():kn(e)}function Vv(e,t){let n=t?`. Dependency path: ${t.join(" > ")} > ${e}`:"";throw new y(-200,e)}function Ec(e,t){throw new y(-201,!1)}var O=function(e){return e[e.Default=0]="Default",e[e.Host=1]="Host",e[e.Self=2]="Self",e[e.SkipSelf=4]="SkipSelf",e[e.Optional=8]="Optional",e}(O||{}),Ea;function ff(){return Ea}function je(e){let t=Ea;return Ea=e,t}function hf(e,t,n){let r=Li(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(n&O.Optional)return null;if(t!==void 0)return t;Ec(e,"Injector")}var Bv={},_r=Bv,$v="__NG_DI_FLAG__",fi="ngTempTokenPath",Uv="ngTokenPath",Hv=/\n/gm,zv="\u0275",Ed="__source",On;function qv(){return On}function Pt(e){let t=On;return On=e,t}function Wv(e,t=O.Default){if(On===void 0)throw new y(-203,!1);return On===null?hf(e,void 0,t):On.get(e,t&O.Optional?null:void 0,t)}function F(e,t=O.Default){return(ff()||Wv)(ve(e),t)}function p(e,t=O.Default){return F(e,ji(t))}function ji(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function Ca(e){let t=[];for(let n=0;n<e.length;n++){let r=ve(e[n]);if(Array.isArray(r)){if(r.length===0)throw new y(900,!1);let o,i=O.Default;for(let s=0;s<r.length;s++){let a=r[s],c=Gv(a);typeof c=="number"?c===-1?o=a.token:i|=c:o=a}t.push(F(o,i))}else t.push(F(r))}return t}function Gv(e){return e[$v]}function Zv(e,t,n,r){let o=e[fi];throw t[Ed]&&o.unshift(t[Ed]),e.message=Yv(`
`+e.message,o,n,r),e[Uv]=o,e[fi]=null,e}function Yv(e,t,n,r=null){e=e&&e.charAt(0)===`
`&&e.charAt(1)==zv?e.slice(2):e;let o=we(t);if(Array.isArray(t))o=t.map(we).join(" -> ");else if(typeof t=="object"){let i=[];for(let s in t)if(t.hasOwnProperty(s)){let a=t[s];i.push(s+":"+(typeof a=="string"?JSON.stringify(a):we(a)))}o=`{${i.join(", ")}}`}return`${n}${r?"("+r+")":""}[${o}]: ${e.replace(Hv,`
  `)}`}function Fn(e,t){let n=e.hasOwnProperty(di);return n?e[di]:null}function Qv(e,t,n){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){let o=e[r],i=t[r];if(n&&(o=n(o),i=n(i)),i!==o)return!1}return!0}function Kv(e){return e.flat(Number.POSITIVE_INFINITY)}function Cc(e,t){e.forEach(n=>Array.isArray(n)?Cc(n,t):t(n))}function pf(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function hi(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function Jv(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function Xv(e,t,n,r){let o=e.length;if(o==t)e.push(n,r);else if(o===1)e.push(r,e[0]),e[0]=n;else{for(o--,e.push(e[o-1],e[o]);o>t;){let i=o-2;e[o]=e[i],o--}e[t]=n,e[t+1]=r}}function Ic(e,t,n){let r=Vr(e,t);return r>=0?e[r|1]=n:(r=~r,Xv(e,r,t,n)),r}function ia(e,t){let n=Vr(e,t);if(n>=0)return e[n|1]}function Vr(e,t){return ey(e,t,1)}function ey(e,t,n){let r=0,o=e.length>>n;for(;o!==r;){let i=r+(o-r>>1),s=e[i<<n];if(t===s)return i<<n;s>t?o=i:r=i+1}return~(o<<n)}var Ar={},dt=[],Jt=new x(""),gf=new x("",-1),mf=new x(""),pi=class{get(t,n=_r){if(n===_r){let r=new Error(`NullInjectorError: No provider for ${we(t)}!`);throw r.name="NullInjectorError",r}return n}},vf=function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e}(vf||{}),ft=function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e}(ft||{}),Ln=function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e}(Ln||{});function ty(e,t,n){let r=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=t.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}n=o+1}}function Ia(e,t,n){let r=0;for(;r<n.length;){let o=n[r];if(typeof o=="number"){if(o!==0)break;r++;let i=n[r++],s=n[r++],a=n[r++];e.setAttribute(t,s,a,i)}else{let i=o,s=n[++r];ny(i)?e.setProperty(t,i,s):e.setAttribute(t,i,s),r++}}return r}function yf(e){return e===3||e===4||e===6}function ny(e){return e.charCodeAt(0)===64}function Sc(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let r=0;r<t.length;r++){let o=t[r];typeof o=="number"?n=o:n===0||(n===-1||n===2?Cd(e,n,o,null,t[++r]):Cd(e,n,o,null,null))}}return e}function Cd(e,t,n,r,o){let i=0,s=e.length;if(t===-1)s=-1;else for(;i<e.length;){let a=e[i++];if(typeof a=="number"){if(a===t){s=-1;break}else if(a>t){s=i-1;break}}}for(;i<e.length;){let a=e[i];if(typeof a=="number")break;if(a===n){if(r===null){o!==null&&(e[i+1]=o);return}else if(r===e[i+1]){e[i+2]=o;return}}i++,r!==null&&i++,o!==null&&i++}s!==-1&&(e.splice(s,0,t),i=s+1),e.splice(i++,0,n),r!==null&&e.splice(i++,0,r),o!==null&&e.splice(i++,0,o)}var Df="ng-template";function ry(e,t,n,r){let o=0;if(r){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&ty(t[o+1].toLowerCase(),n,0)!==-1)return!0}else if(Mc(e))return!1;if(o=t.indexOf(1,o),o>-1){let i;for(;++o<t.length&&typeof(i=t[o])=="string";)if(i.toLowerCase()===n)return!0}return!1}function Mc(e){return e.type===4&&e.value!==Df}function oy(e,t,n){let r=e.type===4&&!n?Df:e.value;return t===r}function iy(e,t,n){let r=4,o=e.attrs,i=o!==null?cy(o):0,s=!1;for(let a=0;a<t.length;a++){let c=t[a];if(typeof c=="number"){if(!s&&!Ze(r)&&!Ze(c))return!1;if(s&&Ze(c))continue;s=!1,r=c|r&1;continue}if(!s)if(r&4){if(r=2|r&1,c!==""&&!oy(e,c,n)||c===""&&t.length===1){if(Ze(r))return!1;s=!0}}else if(r&8){if(o===null||!ry(e,o,c,n)){if(Ze(r))return!1;s=!0}}else{let u=t[++a],l=sy(c,o,Mc(e),n);if(l===-1){if(Ze(r))return!1;s=!0;continue}if(u!==""){let d;if(l>i?d="":d=o[l+1].toLowerCase(),r&2&&u!==d){if(Ze(r))return!1;s=!0}}}}return Ze(r)||s}function Ze(e){return(e&1)===0}function sy(e,t,n,r){if(t===null)return-1;let o=0;if(r||!n){let i=!1;for(;o<t.length;){let s=t[o];if(s===e)return o;if(s===3||s===6)i=!0;else if(s===1||s===2){let a=t[++o];for(;typeof a=="string";)a=t[++o];continue}else{if(s===4)break;if(s===0){o+=4;continue}}o+=i?1:2}return-1}else return uy(t,e)}function bf(e,t,n=!1){for(let r=0;r<t.length;r++)if(iy(e,t[r],n))return!0;return!1}function ay(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if(!(n&1))return t[n+1]}return null}function cy(e){for(let t=0;t<e.length;t++){let n=e[t];if(yf(n))return t}return e.length}function uy(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let r=e[n];if(typeof r=="number")return-1;if(r===t)return n;n++}return-1}function ly(e,t){e:for(let n=0;n<t.length;n++){let r=t[n];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return!0}}return!1}function Id(e,t){return e?":not("+t.trim()+")":t}function dy(e){let t=e[0],n=1,r=2,o="",i=!1;for(;n<e.length;){let s=e[n];if(typeof s=="string")if(r&2){let a=e[++n];o+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?o+="."+s:r&4&&(o+=" "+s);else o!==""&&!Ze(s)&&(t+=Id(i,o),o=""),r=s,i=i||!Ze(r);n++}return o!==""&&(t+=Id(i,o)),t}function fy(e){return e.map(dy).join(",")}function hy(e){let t=[],n=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&t.push(i,e[++r]):o===8&&n.push(i);else{if(!Ze(o))break;o=i}r++}return{attrs:t,classes:n}}function U(e){return wc(()=>{let t=Sf(e),n=z(m({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===vf.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||ft.Emulated,styles:e.styles||dt,_:null,schemas:e.schemas||null,tView:null,id:""});Mf(n);let r=e.dependencies;return n.directiveDefs=Md(r,!1),n.pipeDefs=Md(r,!0),n.id=my(n),n})}function py(e){return Ft(e)||wf(e)}function gy(e){return e!==null}function Sd(e,t){if(e==null)return Ar;let n={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,s,a=Ln.None;Array.isArray(o)?(a=o[0],i=o[1],s=o[2]??i):(i=o,s=o),t?(n[i]=a!==Ln.None?[r,a]:r,t[i]=s):n[i]=r}return n}function Vi(e){return wc(()=>{let t=Sf(e);return Mf(t),t})}function Ft(e){return e[Pv]||null}function wf(e){return e[kv]||null}function Ef(e){return e[Fv]||null}function Cf(e){let t=Ft(e)||wf(e)||Ef(e);return t!==null?t.standalone:!1}function If(e,t){let n=e[Lv]||null;if(!n&&t===!0)throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`);return n}function Sf(e){let t={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputTransforms:null,inputConfig:e.inputs||Ar,exportAs:e.exportAs||null,standalone:e.standalone===!0,signals:e.signals===!0,selectors:e.selectors||dt,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,findHostDirectiveDefs:null,hostDirectives:null,inputs:Sd(e.inputs,t),outputs:Sd(e.outputs),debugInfo:null}}function Mf(e){e.features?.forEach(t=>t(e))}function Md(e,t){if(!e)return null;let n=t?Ef:py;return()=>(typeof e=="function"?e():e).map(r=>n(r)).filter(gy)}function my(e){let t=0,n=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,e.consts,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery].join("|");for(let o of n)t=Math.imul(31,t)+o.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function Yn(e){return{\u0275providers:e}}function vy(...e){return{\u0275providers:xf(!0,e),\u0275fromNgModule:!0}}function xf(e,...t){let n=[],r=new Set,o,i=s=>{n.push(s)};return Cc(t,s=>{let a=s;Sa(a,i,[],r)&&(o||=[],o.push(a))}),o!==void 0&&Tf(o,i),n}function Tf(e,t){for(let n=0;n<e.length;n++){let{ngModule:r,providers:o}=e[n];xc(o,i=>{t(i,r)})}}function Sa(e,t,n,r){if(e=ve(e),!e)return!1;let o=null,i=Dd(e),s=!i&&Ft(e);if(!i&&!s){let c=e.ngModule;if(i=Dd(c),i)o=c;else return!1}else{if(s&&!s.standalone)return!1;o=e}let a=r.has(o);if(s){if(a)return!1;if(r.add(o),s.dependencies){let c=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let u of c)Sa(u,t,n,r)}}else if(i){if(i.imports!=null&&!a){r.add(o);let u;try{Cc(i.imports,l=>{Sa(l,t,n,r)&&(u||=[],u.push(l))})}finally{}u!==void 0&&Tf(u,t)}if(!a){let u=Fn(o)||(()=>new o);t({provide:o,useFactory:u,deps:dt},o),t({provide:mf,useValue:o,multi:!0},o),t({provide:Jt,useValue:()=>F(o),multi:!0},o)}let c=i.providers;if(c!=null&&!a){let u=e;xc(c,l=>{t(l,u)})}}else return!1;return o!==e&&e.providers!==void 0}function xc(e,t){for(let n of e)df(n)&&(n=n.\u0275providers),Array.isArray(n)?xc(n,t):t(n)}var yy=q({provide:String,useValue:q});function _f(e){return e!==null&&typeof e=="object"&&yy in e}function Dy(e){return!!(e&&e.useExisting)}function by(e){return!!(e&&e.useFactory)}function jn(e){return typeof e=="function"}function wy(e){return!!e.useClass}var Bi=new x(""),oi={},Ey={},sa;function Tc(){return sa===void 0&&(sa=new pi),sa}var Ae=class{},Nr=class extends Ae{get destroyed(){return this._destroyed}constructor(t,n,r,o){super(),this.parent=n,this.source=r,this.scopes=o,this.records=new Map,this._ngOnDestroyHooks=new Set,this._onDestroyHooks=[],this._destroyed=!1,xa(t,s=>this.processProvider(s)),this.records.set(gf,_n(void 0,this)),o.has("environment")&&this.records.set(Ae,_n(void 0,this));let i=this.records.get(Bi);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(mf,dt,O.Self))}destroy(){this.assertNotDestroyed(),this._destroyed=!0;let t=P(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of n)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),P(t)}}onDestroy(t){return this.assertNotDestroyed(),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){this.assertNotDestroyed();let n=Pt(this),r=je(void 0),o;try{return t()}finally{Pt(n),je(r)}}get(t,n=_r,r=O.Default){if(this.assertNotDestroyed(),t.hasOwnProperty(wd))return t[wd](this);r=ji(r);let o,i=Pt(this),s=je(void 0);try{if(!(r&O.SkipSelf)){let c=this.records.get(t);if(c===void 0){let u=xy(t)&&Li(t);u&&this.injectableDefInScope(u)?c=_n(Ma(t),oi):c=null,this.records.set(t,c)}if(c!=null)return this.hydrate(t,c)}let a=r&O.Self?Tc():this.parent;return n=r&O.Optional&&n===_r?null:n,a.get(t,n)}catch(a){if(a.name==="NullInjectorError"){if((a[fi]=a[fi]||[]).unshift(we(t)),i)throw a;return Zv(a,t,"R3InjectorError",this.source)}else throw a}finally{je(s),Pt(i)}}resolveInjectorInitializers(){let t=P(null),n=Pt(this),r=je(void 0),o;try{let i=this.get(Jt,dt,O.Self);for(let s of i)s()}finally{Pt(n),je(r),P(t)}}toString(){let t=[],n=this.records;for(let r of n.keys())t.push(we(r));return`R3Injector[${t.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new y(205,!1)}processProvider(t){t=ve(t);let n=jn(t)?t:ve(t&&t.provide),r=Iy(t);if(!jn(t)&&t.multi===!0){let o=this.records.get(n);o||(o=_n(void 0,oi,!0),o.factory=()=>Ca(o.multi),this.records.set(n,o)),n=t,o.multi.push(t)}this.records.set(n,r)}hydrate(t,n){let r=P(null);try{return n.value===oi&&(n.value=Ey,n.value=n.factory()),typeof n.value=="object"&&n.value&&My(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{P(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=ve(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function Ma(e){let t=Li(e),n=t!==null?t.factory:Fn(e);if(n!==null)return n;if(e instanceof x)throw new y(204,!1);if(e instanceof Function)return Cy(e);throw new y(204,!1)}function Cy(e){if(e.length>0)throw new y(204,!1);let n=Rv(e);return n!==null?()=>n.factory(e):()=>new e}function Iy(e){if(_f(e))return _n(void 0,e.useValue);{let t=Af(e);return _n(t,oi)}}function Af(e,t,n){let r;if(jn(e)){let o=ve(e);return Fn(o)||Ma(o)}else if(_f(e))r=()=>ve(e.useValue);else if(by(e))r=()=>e.useFactory(...Ca(e.deps||[]));else if(Dy(e))r=()=>F(ve(e.useExisting));else{let o=ve(e&&(e.useClass||e.provide));if(Sy(e))r=()=>new o(...Ca(e.deps));else return Fn(o)||Ma(o)}return r}function _n(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function Sy(e){return!!e.deps}function My(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function xy(e){return typeof e=="function"||typeof e=="object"&&e instanceof x}function xa(e,t){for(let n of e)Array.isArray(n)?xa(n,t):n&&df(n)?xa(n.\u0275providers,t):t(n)}function Xe(e,t){e instanceof Nr&&e.assertNotDestroyed();let n,r=Pt(e),o=je(void 0);try{return t()}finally{Pt(r),je(o)}}function Nf(){return ff()!==void 0||qv()!=null}function $i(e){if(!Nf())throw new y(-203,!1)}function Ty(e){return typeof e=="function"}var Ne=0,C=1,E=2,fe=3,Qe=4,Ee=5,Be=6,gi=7,pe=8,Vn=9,ht=10,W=11,Rr=12,xd=13,Qn=14,ye=15,Xt=16,An=17,Et=18,Ui=19,Rf=20,kt=21,ii=22,Ve=23,ie=25,Of=1,Or=6,Ct=7,mi=8,Bn=9,de=10,vi=function(e){return e[e.None=0]="None",e[e.HasTransplantedViews=2]="HasTransplantedViews",e}(vi||{});function lt(e){return Array.isArray(e)&&typeof e[Of]=="object"}function gt(e){return Array.isArray(e)&&e[Of]===!0}function Pf(e){return(e.flags&4)!==0}function Br(e){return e.componentOffset>-1}function _c(e){return(e.flags&1)===1}function Kn(e){return!!e.template}function yi(e){return(e[E]&512)!==0}var Ta=class{constructor(t,n,r){this.previousValue=t,this.currentValue=n,this.firstChange=r}isFirstChange(){return this.firstChange}};function kf(e,t,n,r){t!==null?t.applyValueToInputSignal(t,r):e[n]=r}function $r(){return Ff}function Ff(e){return e.type.prototype.ngOnChanges&&(e.setInput=Ay),_y}$r.ngInherit=!0;function _y(){let e=jf(this),t=e?.current;if(t){let n=e.previous;if(n===Ar)e.previous=t;else for(let r in t)n[r]=t[r];e.current=null,this.ngOnChanges(t)}}function Ay(e,t,n,r,o){let i=this.declaredInputs[r],s=jf(e)||Ny(e,{previous:Ar,current:null}),a=s.current||(s.current={}),c=s.previous,u=c[i];a[i]=new Ta(u&&u.currentValue,n,c===Ar),kf(e,t,o,n)}var Lf="__ngSimpleChanges__";function jf(e){return e[Lf]||null}function Ny(e,t){return e[Lf]=t}var Td=null;var ct=function(e,t,n){Td?.(e,t,n)},Ry="svg",Oy="math";function Ke(e){for(;Array.isArray(e);)e=e[Ne];return e}function Vf(e,t){return Ke(t[e])}function Re(e,t){return Ke(t[e.index])}function Ac(e,t){return e.data[t]}function jt(e,t){let n=t[e];return lt(n)?n:n[Ne]}function Py(e){return(e[E]&4)===4}function Nc(e){return(e[E]&128)===128}function ky(e){return gt(e[fe])}function $n(e,t){return t==null?null:e[t]}function Bf(e){e[An]=0}function $f(e){e[E]&1024||(e[E]|=1024,Nc(e)&&Hi(e))}function Fy(e,t){for(;e>0;)t=t[Qn],e--;return t}function Pr(e){return!!(e[E]&9216||e[Ve]?.dirty)}function _a(e){e[ht].changeDetectionScheduler?.notify(7),e[E]&64&&(e[E]|=1024),Pr(e)&&Hi(e)}function Hi(e){e[ht].changeDetectionScheduler?.notify(0);let t=en(e);for(;t!==null&&!(t[E]&8192||(t[E]|=8192,!Nc(t)));)t=en(t)}function Uf(e,t){if((e[E]&256)===256)throw new y(911,!1);e[kt]===null&&(e[kt]=[]),e[kt].push(t)}function Ly(e,t){if(e[kt]===null)return;let n=e[kt].indexOf(t);n!==-1&&e[kt].splice(n,1)}function en(e){let t=e[fe];return gt(t)?t[fe]:t}var N={lFrame:Xf(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Hf=!1;function jy(){return N.lFrame.elementDepthCount}function Vy(){N.lFrame.elementDepthCount++}function By(){N.lFrame.elementDepthCount--}function zf(){return N.bindingsEnabled}function Jn(){return N.skipHydrationRootTNode!==null}function $y(e){return N.skipHydrationRootTNode===e}function Uy(e){N.skipHydrationRootTNode=e}function Hy(){N.skipHydrationRootTNode=null}function k(){return N.lFrame.lView}function ge(){return N.lFrame.tView}function Rc(e){return N.lFrame.contextLView=e,e[pe]}function Oc(e){return N.lFrame.contextLView=null,e}function Ce(){let e=qf();for(;e!==null&&e.type===64;)e=e.parent;return e}function qf(){return N.lFrame.currentTNode}function zy(){let e=N.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function Ur(e,t){let n=N.lFrame;n.currentTNode=e,n.isParent=t}function Wf(){return N.lFrame.isParent}function Gf(){N.lFrame.isParent=!1}function Zf(){return Hf}function _d(e){Hf=e}function Yf(){let e=N.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function qy(){return N.lFrame.bindingIndex}function Wy(e){return N.lFrame.bindingIndex=e}function Hr(){return N.lFrame.bindingIndex++}function Pc(e){let t=N.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function Gy(){return N.lFrame.inI18n}function Zy(e,t){let n=N.lFrame;n.bindingIndex=n.bindingRootIndex=e,Aa(t)}function Yy(){return N.lFrame.currentDirectiveIndex}function Aa(e){N.lFrame.currentDirectiveIndex=e}function Qy(e){let t=N.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function Qf(){return N.lFrame.currentQueryIndex}function kc(e){N.lFrame.currentQueryIndex=e}function Ky(e){let t=e[C];return t.type===2?t.declTNode:t.type===1?e[Ee]:null}function Kf(e,t,n){if(n&O.SkipSelf){let o=t,i=e;for(;o=o.parent,o===null&&!(n&O.Host);)if(o=Ky(i),o===null||(i=i[Qn],o.type&10))break;if(o===null)return!1;t=o,e=i}let r=N.lFrame=Jf();return r.currentTNode=t,r.lView=e,!0}function Fc(e){let t=Jf(),n=e[C];N.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function Jf(){let e=N.lFrame,t=e===null?null:e.child;return t===null?Xf(e):t}function Xf(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function eh(){let e=N.lFrame;return N.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var th=eh;function Lc(){let e=eh();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Jy(e){return(N.lFrame.contextLView=Fy(e,N.lFrame.contextLView))[pe]}function St(){return N.lFrame.selectedIndex}function tn(e){N.lFrame.selectedIndex=e}function nh(){let e=N.lFrame;return Ac(e.tView,e.selectedIndex)}function rh(){return N.lFrame.currentNamespace}var oh=!0;function jc(){return oh}function Vt(e){oh=e}function Xy(e,t,n){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=t.type.prototype;if(r){let s=Ff(t);(n.preOrderHooks??=[]).push(e,s),(n.preOrderCheckHooks??=[]).push(e,s)}o&&(n.preOrderHooks??=[]).push(0-e,o),i&&((n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i))}function Vc(e,t){for(let n=t.directiveStart,r=t.directiveEnd;n<r;n++){let i=e.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:u,ngOnDestroy:l}=i;s&&(e.contentHooks??=[]).push(-n,s),a&&((e.contentHooks??=[]).push(n,a),(e.contentCheckHooks??=[]).push(n,a)),c&&(e.viewHooks??=[]).push(-n,c),u&&((e.viewHooks??=[]).push(n,u),(e.viewCheckHooks??=[]).push(n,u)),l!=null&&(e.destroyHooks??=[]).push(n,l)}}function si(e,t,n){ih(e,t,3,n)}function ai(e,t,n,r){(e[E]&3)===n&&ih(e,t,n,r)}function aa(e,t){let n=e[E];(n&3)===t&&(n&=16383,n+=1,e[E]=n)}function ih(e,t,n,r){let o=r!==void 0?e[An]&65535:0,i=r??-1,s=t.length-1,a=0;for(let c=o;c<s;c++)if(typeof t[c+1]=="number"){if(a=t[c],r!=null&&a>=r)break}else t[c]<0&&(e[An]+=65536),(a<i||i==-1)&&(eD(e,n,t,c),e[An]=(e[An]&4294901760)+c+2),c++}function Ad(e,t){ct(4,e,t);let n=P(null);try{t.call(e)}finally{P(n),ct(5,e,t)}}function eD(e,t,n,r){let o=n[r]<0,i=n[r+1],s=o?-n[r]:n[r],a=e[s];o?e[E]>>14<e[An]>>16&&(e[E]&3)===t&&(e[E]+=16384,Ad(a,i)):Ad(a,i)}var Pn=-1,nn=class{constructor(t,n,r){this.factory=t,this.resolving=!1,this.canSeeViewProviders=n,this.injectImpl=r}};function tD(e){return e instanceof nn}function nD(e){return(e.flags&8)!==0}function rD(e){return(e.flags&16)!==0}function sh(e){return e!==Pn}function Di(e){return e&32767}function oD(e){return e>>16}function bi(e,t){let n=oD(e),r=t;for(;n>0;)r=r[Qn],n--;return r}var Na=!0;function Nd(e){let t=Na;return Na=e,t}var iD=256,ah=iD-1,ch=5,sD=0,ut={};function aD(e,t,n){let r;typeof n=="string"?r=n.charCodeAt(0)||0:n.hasOwnProperty(xr)&&(r=n[xr]),r==null&&(r=n[xr]=sD++);let o=r&ah,i=1<<o;t.data[e+(o>>ch)]|=i}function wi(e,t){let n=uh(e,t);if(n!==-1)return n;let r=t[C];r.firstCreatePass&&(e.injectorIndex=t.length,ca(r.data,e),ca(t,null),ca(r.blueprint,null));let o=Bc(e,t),i=e.injectorIndex;if(sh(o)){let s=Di(o),a=bi(o,t),c=a[C].data;for(let u=0;u<8;u++)t[i+u]=a[s+u]|c[s+u]}return t[i+8]=o,i}function ca(e,t){e.push(0,0,0,0,0,0,0,0,t)}function uh(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function Bc(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,r=null,o=t;for(;o!==null;){if(r=ph(o),r===null)return Pn;if(n++,o=o[Qn],r.injectorIndex!==-1)return r.injectorIndex|n<<16}return Pn}function Ra(e,t,n){aD(e,t,n)}function cD(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let r=n.length,o=0;for(;o<r;){let i=n[o];if(yf(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof n[o]=="string";)o++;else{if(i===t)return n[o+1];o=o+2}}}return null}function lh(e,t,n){if(n&O.Optional||e!==void 0)return e;Ec(t,"NodeInjector")}function dh(e,t,n,r){if(n&O.Optional&&r===void 0&&(r=null),!(n&(O.Self|O.Host))){let o=e[Vn],i=je(void 0);try{return o?o.get(t,r,n&O.Optional):hf(t,r,n&O.Optional)}finally{je(i)}}return lh(r,t,n)}function fh(e,t,n,r=O.Default,o){if(e!==null){if(t[E]&2048&&!(r&O.Self)){let s=fD(e,t,n,r,ut);if(s!==ut)return s}let i=hh(e,t,n,r,ut);if(i!==ut)return i}return dh(t,n,r,o)}function hh(e,t,n,r,o){let i=lD(n);if(typeof i=="function"){if(!Kf(t,e,r))return r&O.Host?lh(o,n,r):dh(t,n,r,o);try{let s;if(s=i(r),s==null&&!(r&O.Optional))Ec(n);else return s}finally{th()}}else if(typeof i=="number"){let s=null,a=uh(e,t),c=Pn,u=r&O.Host?t[ye][Ee]:null;for((a===-1||r&O.SkipSelf)&&(c=a===-1?Bc(e,t):t[a+8],c===Pn||!Od(r,!1)?a=-1:(s=t[C],a=Di(c),t=bi(c,t)));a!==-1;){let l=t[C];if(Rd(i,a,l.data)){let d=uD(a,t,n,s,r,u);if(d!==ut)return d}c=t[a+8],c!==Pn&&Od(r,t[C].data[a+8]===u)&&Rd(i,a,t)?(s=l,a=Di(c),t=bi(c,t)):a=-1}}return o}function uD(e,t,n,r,o,i){let s=t[C],a=s.data[e+8],c=r==null?Br(a)&&Na:r!=s&&(a.type&3)!==0,u=o&O.Host&&i===a,l=ci(a,s,n,c,u);return l!==null?rn(t,s,l,a):ut}function ci(e,t,n,r,o){let i=e.providerIndexes,s=t.data,a=i&1048575,c=e.directiveStart,u=e.directiveEnd,l=i>>20,d=r?a:a+l,f=o?a+l:u;for(let h=d;h<f;h++){let g=s[h];if(h<c&&n===g||h>=c&&g.type===n)return h}if(o){let h=s[c];if(h&&Kn(h)&&h.type===n)return c}return null}function rn(e,t,n,r){let o=e[n],i=t.data;if(tD(o)){let s=o;s.resolving&&Vv(jv(i[n]));let a=Nd(s.canSeeViewProviders);s.resolving=!0;let c,u=s.injectImpl?je(s.injectImpl):null,l=Kf(e,r,O.Default);try{o=e[n]=s.factory(void 0,i,e,r),t.firstCreatePass&&n>=r.directiveStart&&Xy(n,i[n],t)}finally{u!==null&&je(u),Nd(a),s.resolving=!1,th()}}return o}function lD(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(xr)?e[xr]:void 0;return typeof t=="number"?t>=0?t&ah:dD:t}function Rd(e,t,n){let r=1<<e;return!!(n[t+(e>>ch)]&r)}function Od(e,t){return!(e&O.Self)&&!(e&O.Host&&t)}var Kt=class{constructor(t,n){this._tNode=t,this._lView=n}get(t,n,r){return fh(this._tNode,this._lView,t,ji(r),n)}};function dD(){return new Kt(Ce(),k())}function $c(e){return wc(()=>{let t=e.prototype.constructor,n=t[di]||Oa(t),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[di]||Oa(o);if(i&&i!==n)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function Oa(e){return af(e)?()=>{let t=Oa(ve(e));return t&&t()}:Fn(e)}function fD(e,t,n,r,o){let i=e,s=t;for(;i!==null&&s!==null&&s[E]&2048&&!(s[E]&512);){let a=hh(i,s,n,r|O.Self,ut);if(a!==ut)return a;let c=i.parent;if(!c){let u=s[Rf];if(u){let l=u.get(n,ut,r);if(l!==ut)return l}c=ph(s),s=s[Qn]}i=c}return o}function ph(e){let t=e[C],n=t.type;return n===2?t.declTNode:n===1?e[Ee]:null}function Uc(e){return cD(Ce(),e)}function Pd(e,t=null,n=null,r){let o=gh(e,t,n,r);return o.resolveInjectorInitializers(),o}function gh(e,t=null,n=null,r,o=new Set){let i=[n||dt,vy(e)];return r=r||(typeof e=="object"?void 0:we(e)),new Nr(i,t||Tc(),r||null,o)}var Qt=class Qt{static create(t,n){if(Array.isArray(t))return Pd({name:""},n,t,"");{let r=t.name??"";return Pd({name:r},t.parent,t.providers,r)}}};Qt.THROW_IF_NOT_FOUND=_r,Qt.NULL=new pi,Qt.\u0275prov=D({token:Qt,providedIn:"any",factory:()=>F(gf)}),Qt.__NG_ELEMENT_ID__=-1;var $e=Qt;var hD=new x("");hD.__NG_ELEMENT_ID__=e=>{let t=Ce();if(t===null)throw new y(204,!1);if(t.type&2)return t.value;if(e&O.Optional)return null;throw new y(204,!1)};var pD="ngOriginalError";function ua(e){return e[pD]}var Je=class{constructor(){this._console=console}handleError(t){let n=this._findOriginalError(t);this._console.error("ERROR",t),n&&this._console.error("ORIGINAL ERROR",n)}_findOriginalError(t){let n=t&&ua(t);for(;n&&ua(n);)n=ua(n);return n||null}},mh=new x("",{providedIn:"root",factory:()=>p(Je).handleError.bind(void 0)}),cn=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=gD,t.__NG_ENV_ID__=r=>r;let e=t;return e})(),Pa=class extends cn{constructor(t){super(),this._lView=t}onDestroy(t){return Uf(this._lView,t),()=>Ly(this._lView,t)}};function gD(){return new Pa(k())}function kd(e,t){return of(e,t)}function mD(e){return of(rf,e)}var K=(kd.required=mD,kd);function vD(){return Xn(Ce(),k())}function Xn(e,t){return new Ie(Re(e,t))}var Ie=(()=>{let t=class t{constructor(r){this.nativeElement=r}};t.__NG_ELEMENT_ID__=vD;let e=t;return e})();function yD(e){return e instanceof Ie?e.nativeElement:e}var Bt=(()=>{let t=class t{constructor(){this.taskId=0,this.pendingTasks=new Set,this.hasPendingTasks=new le(!1)}get _hasPendingTasks(){return this.hasPendingTasks.value}add(){this._hasPendingTasks||this.hasPendingTasks.next(!0);let r=this.taskId++;return this.pendingTasks.add(r),r}remove(r){this.pendingTasks.delete(r),this.pendingTasks.size===0&&this._hasPendingTasks&&this.hasPendingTasks.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this._hasPendingTasks&&this.hasPendingTasks.next(!1)}};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>new t});let e=t;return e})();var ka=class extends he{constructor(t=!1){super(),this.destroyRef=void 0,this.pendingTasks=void 0,this.__isAsync=t,Nf()&&(this.destroyRef=p(cn,{optional:!0})??void 0,this.pendingTasks=p(Bt,{optional:!0})??void 0)}emit(t){let n=P(null);try{super.next(t)}finally{P(n)}}subscribe(t,n,r){let o=t,i=n||(()=>null),s=r;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),i=c.error?.bind(c),s=c.complete?.bind(c)}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:o,error:i,complete:s});return t instanceof Y&&t.add(a),a}wrapInTimeout(t){return n=>{let r=this.pendingTasks?.add();setTimeout(()=>{t(n),r!==void 0&&this.pendingTasks?.remove(r)})}}},oe=ka;function DD(){return this._results[Symbol.iterator]()}var Fa=class e{get changes(){return this._changes??=new oe}constructor(t=!1){this._emitDistinctChangesOnly=t,this.dirty=!0,this._onDirty=void 0,this._results=[],this._changesDetected=!1,this._changes=void 0,this.length=0,this.first=void 0,this.last=void 0;let n=e.prototype;n[Symbol.iterator]||(n[Symbol.iterator]=DD)}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let r=Kv(t);(this._changesDetected=!Qv(this._results,r,n))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.emit(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}},bD="ngSkipHydration",wD="ngskiphydration";function vh(e){let t=e.mergedAttrs;if(t===null)return!1;for(let n=0;n<t.length;n+=2){let r=t[n];if(typeof r=="number")return!1;if(typeof r=="string"&&r.toLowerCase()===wD)return!0}return!1}function yh(e){return e.hasAttribute(bD)}function Ei(e){return(e.flags&128)===128}function ED(e){if(Ei(e))return!0;let t=e.parent;for(;t;){if(Ei(e)||vh(t))return!0;t=t.parent}return!1}var Dh=new Map,CD=0;function ID(){return CD++}function SD(e){Dh.set(e[Ui],e)}function MD(e){Dh.delete(e[Ui])}var Fd="__ngContext__";function on(e,t){lt(t)?(e[Fd]=t[Ui],SD(t)):e[Fd]=t}function bh(e){return Eh(e[Rr])}function wh(e){return Eh(e[Qe])}function Eh(e){for(;e!==null&&!gt(e);)e=e[Qe];return e}var La;function Ch(e){La=e}function zi(){if(La!==void 0)return La;if(typeof document<"u")return document;throw new y(210,!1)}var qi=new x("",{providedIn:"root",factory:()=>xD}),xD="ng",Hc=new x(""),et=new x("",{providedIn:"platform",factory:()=>"unknown"});var zc=new x("",{providedIn:"root",factory:()=>zi().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});function TD(){let e=new er;return p(et)==="browser"&&(e.store=_D(zi(),p(qi))),e}var er=(()=>{let t=class t{constructor(){this.store={},this.onSerializeCallbacks={}}get(r,o){return this.store[r]!==void 0?this.store[r]:o}set(r,o){this.store[r]=o}remove(r){delete this.store[r]}hasKey(r){return this.store.hasOwnProperty(r)}get isEmpty(){return Object.keys(this.store).length===0}onSerialize(r,o){this.onSerializeCallbacks[r]=o}toJson(){for(let r in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(r))try{this.store[r]=this.onSerializeCallbacks[r]()}catch(o){console.warn("Exception in onSerialize callback: ",o)}return JSON.stringify(this.store).replace(/</g,"\\u003C")}};t.\u0275prov=D({token:t,providedIn:"root",factory:TD});let e=t;return e})();function _D(e,t){let n=e.getElementById(t+"-state");if(n?.textContent)try{return JSON.parse(n.textContent)}catch(r){console.warn("Exception while restoring TransferState for app "+t,r)}return{}}var Ih="h",Sh="b",ja=function(e){return e.FirstChild="f",e.NextSibling="n",e}(ja||{}),AD="e",ND="t",qc="c",Mh="x",Ci="r",RD="i",OD="n",xh="d";var PD="__nghData__",Th=PD,la="ngh",kD="nghm",_h=()=>null;function FD(e,t,n=!1){let r=e.getAttribute(la);if(r==null)return null;let[o,i]=r.split("|");if(r=n?i:o,!r)return null;let s=i?`|${i}`:"",a=n?o:s,c={};if(r!==""){let l=t.get(er,null,{optional:!0});l!==null&&(c=l.get(Th,[])[Number(r)])}let u={data:c,firstChild:e.firstChild??null};return n&&(u.firstChild=e,Wi(u,0,e.nextSibling)),a?e.setAttribute(la,a):e.removeAttribute(la),u}function LD(){_h=FD}function Wc(e,t,n=!1){return _h(e,t,n)}function jD(e){let t=e._lView;return t[C].type===2?null:(yi(t)&&(t=t[ie]),t)}function VD(e){return e.textContent?.replace(/\s/gm,"")}function BD(e){let t=zi(),n=t.createNodeIterator(e,NodeFilter.SHOW_COMMENT,{acceptNode(i){let s=VD(i);return s==="ngetn"||s==="ngtns"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),r,o=[];for(;r=n.nextNode();)o.push(r);for(let i of o)i.textContent==="ngetn"?i.replaceWith(t.createTextNode("")):i.remove()}function Wi(e,t,n){e.segmentHeads??={},e.segmentHeads[t]=n}function Va(e,t){return e.segmentHeads?.[t]??null}function $D(e,t){let n=e.data,r=n[AD]?.[t]??null;return r===null&&n[qc]?.[t]&&(r=Gc(e,t)),r}function Ah(e,t){return e.data[qc]?.[t]??null}function Gc(e,t){let n=Ah(e,t)??[],r=0;for(let o of n)r+=o[Ci]*(o[Mh]??1);return r}function UD(e){if(typeof e.disconnectedNodes>"u"){let t=e.data[xh];e.disconnectedNodes=t?new Set(t):null}return e.disconnectedNodes}function Gi(e,t){if(typeof e.disconnectedNodes>"u"){let n=e.data[xh];e.disconnectedNodes=n?new Set(n):null}return!!UD(e)?.has(t)}var ei=new x(""),Nh=!1,Rh=new x("",{providedIn:"root",factory:()=>Nh});var ti;function HD(){if(ti===void 0&&(ti=null,Tr.trustedTypes))try{ti=Tr.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return ti}function Ld(e){return HD()?.createScriptURL(e)||e}var Ii=class{constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${nf})`}};function tr(e){return e instanceof Ii?e.changingThisBreaksApplicationSecurity:e}function Zc(e,t){let n=zD(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${n} (see ${nf})`)}return n===t}function zD(e){return e instanceof Ii&&e.getTypeName()||null}var qD=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Oh(e){return e=String(e),e.match(qD)?e:"unsafe:"+e}var Zi=function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e}(Zi||{});function WD(e){let t=kh();return t?t.sanitize(Zi.URL,e)||"":Zc(e,"URL")?tr(e):Oh(kn(e))}function GD(e){let t=kh();if(t)return Ld(t.sanitize(Zi.RESOURCE_URL,e)||"");if(Zc(e,"ResourceURL"))return Ld(tr(e));throw new y(904,!1)}function ZD(e,t){return t==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||t==="href"&&(e==="base"||e==="link")?GD:WD}function Ph(e,t,n){return ZD(t,n)(e)}function kh(){let e=k();return e&&e[ht].sanitizer}var YD=/^>|^->|<!--|-->|--!>|<!-$/g,QD=/(<|>)/g,KD="\u200B$1\u200B";function JD(e){return e.replace(YD,t=>t.replace(QD,KD))}function XD(e){return e.ownerDocument.body}function Fh(e){return e instanceof Function?e():e}function Mr(e){return(e??p($e)).get(et)==="browser"}var It=function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e}(It||{}),eb;function Yc(e,t){return eb(e,t)}function Nn(e,t,n,r,o){if(r!=null){let i,s=!1;gt(r)?i=r:lt(r)&&(s=!0,r=r[Ne]);let a=Ke(r);e===0&&n!==null?o==null?Uh(t,n,a):Si(t,n,a,o||null,!0):e===1&&n!==null?Si(t,n,a,o||null,!0):e===2?eu(t,a,s):e===3&&t.destroyNode(a),i!=null&&pb(t,e,i,n,o)}}function Lh(e,t){return e.createText(t)}function tb(e,t,n){e.setValue(t,n)}function jh(e,t){return e.createComment(JD(t))}function Qc(e,t,n){return e.createElement(t,n)}function nb(e,t){Vh(e,t),t[Ne]=null,t[Ee]=null}function rb(e,t,n,r,o,i){r[Ne]=o,r[Ee]=t,Qi(e,r,n,1,o,i)}function Vh(e,t){t[ht].changeDetectionScheduler?.notify(8),Qi(e,t,t[W],2,null,null)}function ob(e){let t=e[Rr];if(!t)return da(e[C],e);for(;t;){let n=null;if(lt(t))n=t[Rr];else{let r=t[de];r&&(n=r)}if(!n){for(;t&&!t[Qe]&&t!==e;)lt(t)&&da(t[C],t),t=t[fe];t===null&&(t=e),lt(t)&&da(t[C],t),n=t&&t[Qe]}t=n}}function ib(e,t,n,r){let o=de+r,i=n.length;r>0&&(n[o-1][Qe]=t),r<i-de?(t[Qe]=n[o],pf(n,de+r,t)):(n.push(t),t[Qe]=null),t[fe]=n;let s=t[Xt];s!==null&&n!==s&&Bh(s,t);let a=t[Et];a!==null&&a.insertView(e),_a(t),t[E]|=128}function Bh(e,t){let n=e[Bn],r=t[fe];if(lt(r))e[E]|=vi.HasTransplantedViews;else{let o=r[fe][ye];t[ye]!==o&&(e[E]|=vi.HasTransplantedViews)}n===null?e[Bn]=[t]:n.push(t)}function Kc(e,t){let n=e[Bn],r=n.indexOf(t);n.splice(r,1)}function kr(e,t){if(e.length<=de)return;let n=de+t,r=e[n];if(r){let o=r[Xt];o!==null&&o!==e&&Kc(o,r),t>0&&(e[n-1][Qe]=r[Qe]);let i=hi(e,de+t);nb(r[C],r);let s=i[Et];s!==null&&s.detachView(i[C]),r[fe]=null,r[Qe]=null,r[E]&=-129}return r}function Yi(e,t){if(!(t[E]&256)){let n=t[W];n.destroyNode&&Qi(e,t,n,3,null,null),ob(t)}}function da(e,t){if(t[E]&256)return;let n=P(null);try{t[E]&=-129,t[E]|=256,t[Ve]&&_o(t[Ve]),ab(e,t),sb(e,t),t[C].type===1&&t[W].destroy();let r=t[Xt];if(r!==null&&gt(t[fe])){r!==t[fe]&&Kc(r,t);let o=t[Et];o!==null&&o.detachView(e)}MD(t)}finally{P(n)}}function sb(e,t){let n=e.cleanup,r=t[gi];if(n!==null)for(let i=0;i<n.length-1;i+=2)if(typeof n[i]=="string"){let s=n[i+3];s>=0?r[s]():r[-s].unsubscribe(),i+=2}else{let s=r[n[i+1]];n[i].call(s)}r!==null&&(t[gi]=null);let o=t[kt];if(o!==null){t[kt]=null;for(let i=0;i<o.length;i++){let s=o[i];s()}}}function ab(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let r=0;r<n.length;r+=2){let o=t[n[r]];if(!(o instanceof nn)){let i=n[r+1];if(Array.isArray(i))for(let s=0;s<i.length;s+=2){let a=o[i[s]],c=i[s+1];ct(4,a,c);try{c.call(a)}finally{ct(5,a,c)}}else{ct(4,o,i);try{i.call(o)}finally{ct(5,o,i)}}}}}function $h(e,t,n){return cb(e,t.parent,n)}function cb(e,t,n){let r=t;for(;r!==null&&r.type&40;)t=r,r=t.parent;if(r===null)return n[Ne];{let{componentOffset:o}=r;if(o>-1){let{encapsulation:i}=e.data[r.directiveStart+o];if(i===ft.None||i===ft.Emulated)return null}return Re(r,n)}}function Si(e,t,n,r,o){e.insertBefore(t,n,r,o)}function Uh(e,t,n){e.appendChild(t,n)}function jd(e,t,n,r,o){r!==null?Si(e,t,n,r,o):Uh(e,t,n)}function ub(e,t,n,r){e.removeChild(t,n,r)}function Jc(e,t){return e.parentNode(t)}function lb(e,t){return e.nextSibling(t)}function Hh(e,t,n){return fb(e,t,n)}function db(e,t,n){return e.type&40?Re(e,n):null}var fb=db,Vd;function Xc(e,t,n,r){let o=$h(e,r,t),i=t[W],s=r.parent||t[Ee],a=Hh(s,r,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)jd(i,o,n[c],a,!1);else jd(i,o,n,a,!1);Vd!==void 0&&Vd(i,r,t,n,o)}function ui(e,t){if(t!==null){let n=t.type;if(n&3)return Re(t,e);if(n&4)return Ba(-1,e[t.index]);if(n&8){let r=t.child;if(r!==null)return ui(e,r);{let o=e[t.index];return gt(o)?Ba(-1,o):Ke(o)}}else{if(n&32)return Yc(t,e)()||Ke(e[t.index]);{let r=zh(e,t);if(r!==null){if(Array.isArray(r))return r[0];let o=en(e[ye]);return ui(o,r)}else return ui(e,t.next)}}}return null}function zh(e,t){if(t!==null){let r=e[ye][Ee],o=t.projection;return r.projection[o]}return null}function Ba(e,t){let n=de+e+1;if(n<t.length){let r=t[n],o=r[C].firstChild;if(o!==null)return ui(r,o)}return t[Ct]}function eu(e,t,n){let r=Jc(e,t);r&&ub(e,r,t,n)}function qh(e){e.textContent=""}function tu(e,t,n,r,o,i,s){for(;n!=null;){let a=r[n.index],c=n.type;if(s&&t===0&&(a&&on(Ke(a),r),n.flags|=2),(n.flags&32)!==32)if(c&8)tu(e,t,n.child,r,o,i,!1),Nn(t,e,o,a,i);else if(c&32){let u=Yc(n,r),l;for(;l=u();)Nn(t,e,o,l,i);Nn(t,e,o,a,i)}else c&16?Wh(e,t,r,n,o,i):Nn(t,e,o,a,i);n=s?n.projectionNext:n.next}}function Qi(e,t,n,r,o,i){tu(n,r,e.firstChild,t,o,i,!1)}function hb(e,t,n){let r=t[W],o=$h(e,n,t),i=n.parent||t[Ee],s=Hh(i,n,t);Wh(r,0,t,n,o,s)}function Wh(e,t,n,r,o,i){let s=n[ye],c=s[Ee].projection[r.projection];if(Array.isArray(c))for(let u=0;u<c.length;u++){let l=c[u];Nn(t,e,o,l,i)}else{let u=c,l=s[fe];Ei(r)&&(u.flags|=128),tu(e,t,u,l,o,i,!0)}}function pb(e,t,n,r,o){let i=n[Ct],s=Ke(n);i!==s&&Nn(t,e,r,i,o);for(let a=de;a<n.length;a++){let c=n[a];Qi(c[C],c,e,t,r,i)}}function gb(e,t,n,r,o){if(t)o?e.addClass(n,r):e.removeClass(n,r);else{let i=r.indexOf("-")===-1?void 0:It.DashCase;o==null?e.removeStyle(n,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=It.Important),e.setStyle(n,r,o,i))}}function mb(e,t,n){e.setAttribute(t,"style",n)}function Gh(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function Zh(e,t,n){let{mergedAttrs:r,classes:o,styles:i}=n;r!==null&&Ia(e,t,r),o!==null&&Gh(e,t,o),i!==null&&mb(e,t,i)}var Oe={};function M(e=1){Yh(ge(),k(),St()+e,!1)}function Yh(e,t,n,r){if(!r)if((t[E]&3)===3){let i=e.preOrderCheckHooks;i!==null&&si(t,i,n)}else{let i=e.preOrderHooks;i!==null&&ai(t,i,0,n)}tn(n)}function mt(e,t=O.Default){let n=k();if(n===null)return F(e,t);let r=Ce();return fh(r,n,ve(e),t)}function Qh(){let e="invalid";throw new Error(e)}function Kh(e,t,n,r,o,i){let s=P(null);try{let a=null;o&Ln.SignalBased&&(a=t[r][at]),a!==null&&a.transformFn!==void 0&&(i=a.transformFn(i)),o&Ln.HasDecoratorInputTransform&&(i=e.inputTransforms[r].call(t,i)),e.setInput!==null?e.setInput(t,a,i,n,r):kf(t,a,r,i)}finally{P(s)}}function vb(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let r=0;r<n.length;r++){let o=n[r];if(o<0)tn(~o);else{let i=o,s=n[++r],a=n[++r];Zy(s,i);let c=t[i];a(2,c)}}}finally{tn(-1)}}function Ki(e,t,n,r,o,i,s,a,c,u,l){let d=t.blueprint.slice();return d[Ne]=o,d[E]=r|4|128|8|64,(u!==null||e&&e[E]&2048)&&(d[E]|=2048),Bf(d),d[fe]=d[Qn]=e,d[pe]=n,d[ht]=s||e&&e[ht],d[W]=a||e&&e[W],d[Vn]=c||e&&e[Vn]||null,d[Ee]=i,d[Ui]=ID(),d[Be]=l,d[Rf]=u,d[ye]=t.type==2?e[ye]:d,d}function zr(e,t,n,r,o){let i=e.data[t];if(i===null)i=yb(e,t,n,r,o),Gy()&&(i.flags|=32);else if(i.type&64){i.type=n,i.value=r,i.attrs=o;let s=zy();i.injectorIndex=s===null?-1:s.injectorIndex}return Ur(i,!0),i}function yb(e,t,n,r,o){let i=qf(),s=Wf(),a=s?i:i&&i.parent,c=e.data[t]=Sb(e,a,n,t,r,o);return e.firstChild===null&&(e.firstChild=c),i!==null&&(s?i.child==null&&c.parent!==null&&(i.child=c):i.next===null&&(i.next=c,c.prev=i)),c}function Jh(e,t,n,r){if(n===0)return-1;let o=t.length;for(let i=0;i<n;i++)t.push(r),e.blueprint.push(r),e.data.push(null);return o}function Xh(e,t,n,r,o){let i=St(),s=r&2;try{tn(-1),s&&t.length>ie&&Yh(e,t,ie,!1),ct(s?2:0,o),n(r,o)}finally{tn(i),ct(s?3:1,o)}}function ep(e,t,n){if(Pf(t)){let r=P(null);try{let o=t.directiveStart,i=t.directiveEnd;for(let s=o;s<i;s++){let a=e.data[s];if(a.contentQueries){let c=n[s];a.contentQueries(1,c,s)}}}finally{P(r)}}}function tp(e,t,n){zf()&&(Rb(e,t,n,Re(n,t)),(n.flags&64)===64&&ap(e,t,n))}function np(e,t,n=Re){let r=t.localNames;if(r!==null){let o=t.index+1;for(let i=0;i<r.length;i+=2){let s=r[i+1],a=s===-1?n(t,e):e[s];e[o++]=a}}}function rp(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=nu(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function nu(e,t,n,r,o,i,s,a,c,u,l){let d=ie+r,f=d+o,h=Db(d,f),g=typeof u=="function"?u():u;return h[C]={type:e,blueprint:h,template:n,queries:null,viewQuery:a,declTNode:t,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:l}}function Db(e,t){let n=[];for(let r=0;r<t;r++)n.push(r<e?null:Oe);return n}function bb(e,t,n,r){let i=r.get(Rh,Nh)||n===ft.ShadowDom,s=e.selectRootElement(t,i);return wb(s),s}function wb(e){op(e)}var op=()=>null;function Eb(e){yh(e)?qh(e):BD(e)}function Cb(){op=Eb}function Ib(e,t,n,r){let o=lp(t);o.push(n),e.firstCreatePass&&dp(e).push(r,o.length-1)}function Sb(e,t,n,r,o,i){let s=t?t.injectorIndex:-1,a=0;return Jn()&&(a|=128),{type:n,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:a,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function Bd(e,t,n,r,o){for(let i in t){if(!t.hasOwnProperty(i))continue;let s=t[i];if(s===void 0)continue;r??={};let a,c=Ln.None;Array.isArray(s)?(a=s[0],c=s[1]):a=s;let u=i;if(o!==null){if(!o.hasOwnProperty(i))continue;u=o[i]}e===0?$d(r,n,u,a,c):$d(r,n,u,a)}return r}function $d(e,t,n,r,o){let i;e.hasOwnProperty(n)?(i=e[n]).push(t,r):i=e[n]=[t,r],o!==void 0&&i.push(o)}function Mb(e,t,n){let r=t.directiveStart,o=t.directiveEnd,i=e.data,s=t.attrs,a=[],c=null,u=null;for(let l=r;l<o;l++){let d=i[l],f=n?n.get(d):null,h=f?f.inputs:null,g=f?f.outputs:null;c=Bd(0,d.inputs,l,c,h),u=Bd(1,d.outputs,l,u,g);let v=c!==null&&s!==null&&!Mc(t)?Hb(c,l,s):null;a.push(v)}c!==null&&(c.hasOwnProperty("class")&&(t.flags|=8),c.hasOwnProperty("style")&&(t.flags|=16)),t.initialInputs=a,t.inputs=c,t.outputs=u}function xb(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function Tb(e,t,n,r,o,i,s,a){let c=Re(t,n),u=t.inputs,l;!a&&u!=null&&(l=u[r])?(ru(e,n,l,r,o),Br(t)&&_b(n,t.index)):t.type&3?(r=xb(r),o=s!=null?s(o,t.value||"",r):o,i.setProperty(c,r,o)):t.type&12}function _b(e,t){let n=jt(t,e);n[E]&16||(n[E]|=64)}function ip(e,t,n,r){if(zf()){let o=r===null?null:{"":-1},i=Pb(e,n),s,a;i===null?s=a=null:[s,a]=i,s!==null&&sp(e,t,n,s,o,a),o&&kb(n,r,o)}n.mergedAttrs=Sc(n.mergedAttrs,n.attrs)}function sp(e,t,n,r,o,i){for(let u=0;u<r.length;u++)Ra(wi(n,t),e,r[u].type);Lb(n,e.data.length,r.length);for(let u=0;u<r.length;u++){let l=r[u];l.providersResolver&&l.providersResolver(l)}let s=!1,a=!1,c=Jh(e,t,r.length,null);for(let u=0;u<r.length;u++){let l=r[u];n.mergedAttrs=Sc(n.mergedAttrs,l.hostAttrs),jb(e,n,t,c,l),Fb(c,l,o),l.contentQueries!==null&&(n.flags|=4),(l.hostBindings!==null||l.hostAttrs!==null||l.hostVars!==0)&&(n.flags|=64);let d=l.type.prototype;!s&&(d.ngOnChanges||d.ngOnInit||d.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),s=!0),!a&&(d.ngOnChanges||d.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),a=!0),c++}Mb(e,n,i)}function Ab(e,t,n,r,o){let i=o.hostBindings;if(i){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~t.index;Nb(s)!=a&&s.push(a),s.push(n,r,i)}}function Nb(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function Rb(e,t,n,r){let o=n.directiveStart,i=n.directiveEnd;Br(n)&&Vb(t,n,e.data[o+n.componentOffset]),e.firstCreatePass||wi(n,t),on(r,t);let s=n.initialInputs;for(let a=o;a<i;a++){let c=e.data[a],u=rn(t,e,a,n);if(on(u,t),s!==null&&Ub(t,a-o,u,c,n,s),Kn(c)){let l=jt(n.index,t);l[pe]=rn(t,e,a,n)}}}function ap(e,t,n){let r=n.directiveStart,o=n.directiveEnd,i=n.index,s=Yy();try{tn(i);for(let a=r;a<o;a++){let c=e.data[a],u=t[a];Aa(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&Ob(c,u)}}finally{tn(-1),Aa(s)}}function Ob(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function Pb(e,t){let n=e.directiveRegistry,r=null,o=null;if(n)for(let i=0;i<n.length;i++){let s=n[i];if(bf(t,s.selectors,!1))if(r||(r=[]),Kn(s))if(s.findHostDirectiveDefs!==null){let a=[];o=o||new Map,s.findHostDirectiveDefs(s,a,o),r.unshift(...a,s);let c=a.length;$a(e,t,c)}else r.unshift(s),$a(e,t,0);else o=o||new Map,s.findHostDirectiveDefs?.(s,r,o),r.push(s)}return r===null?null:[r,o]}function $a(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function kb(e,t,n){if(t){let r=e.localNames=[];for(let o=0;o<t.length;o+=2){let i=n[t[o+1]];if(i==null)throw new y(-301,!1);r.push(t[o],i)}}}function Fb(e,t,n){if(n){if(t.exportAs)for(let r=0;r<t.exportAs.length;r++)n[t.exportAs[r]]=e;Kn(t)&&(n[""]=e)}}function Lb(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function jb(e,t,n,r,o){e.data[r]=o;let i=o.factory||(o.factory=Fn(o.type,!0)),s=new nn(i,Kn(o),mt);e.blueprint[r]=s,n[r]=s,Ab(e,t,r,Jh(e,n,o.hostVars,Oe),o)}function Vb(e,t,n){let r=Re(t,e),o=rp(n),i=e[ht].rendererFactory,s=16;n.signals?s=4096:n.onPush&&(s=64);let a=Ji(e,Ki(e,o,null,s,r,t,null,i.createRenderer(r,n),null,null,null));e[t.index]=a}function Bb(e,t,n,r,o,i){let s=Re(e,t);$b(t[W],s,i,e.value,n,r,o)}function $b(e,t,n,r,o,i,s){if(i==null)e.removeAttribute(t,o,n);else{let a=s==null?kn(i):s(i,r||"",o);e.setAttribute(t,o,a,n)}}function Ub(e,t,n,r,o,i){let s=i[t];if(s!==null)for(let a=0;a<s.length;){let c=s[a++],u=s[a++],l=s[a++],d=s[a++];Kh(r,n,c,u,l,d)}}function Hb(e,t,n){let r=null,o=0;for(;o<n.length;){let i=n[o];if(i===0){o+=4;continue}else if(i===5){o+=2;continue}if(typeof i=="number")break;if(e.hasOwnProperty(i)){r===null&&(r=[]);let s=e[i];for(let a=0;a<s.length;a+=3)if(s[a]===t){r.push(i,s[a+1],s[a+2],n[o+1]);break}}o+=2}return r}function cp(e,t,n,r){return[e,!0,0,t,null,r,null,n,null,null]}function up(e,t){let n=e.contentQueries;if(n!==null){let r=P(null);try{for(let o=0;o<n.length;o+=2){let i=n[o],s=n[o+1];if(s!==-1){let a=e.data[s];kc(i),a.contentQueries(2,t[s],s)}}}finally{P(r)}}}function Ji(e,t){return e[Rr]?e[xd][Qe]=t:e[Rr]=t,e[xd]=t,t}function Ua(e,t,n){kc(0);let r=P(null);try{t(e,n)}finally{P(r)}}function lp(e){return e[gi]??=[]}function dp(e){return e.cleanup??=[]}function fp(e,t){let n=e[Vn],r=n?n.get(Je,null):null;r&&r.handleError(t)}function ru(e,t,n,r,o){for(let i=0;i<n.length;){let s=n[i++],a=n[i++],c=n[i++],u=t[s],l=e.data[s];Kh(l,u,r,a,c,o)}}function hp(e,t,n){let r=Vf(t,e);tb(e[W],r,n)}function zb(e,t){let n=jt(t,e),r=n[C];qb(r,n);let o=n[Ne];o!==null&&n[Be]===null&&(n[Be]=Wc(o,n[Vn])),ou(r,n,n[pe])}function qb(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function ou(e,t,n){Fc(t);try{let r=e.viewQuery;r!==null&&Ua(1,r,n);let o=e.template;o!==null&&Xh(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Et]?.finishViewCreation(e),e.staticContentQueries&&up(e,t),e.staticViewQueries&&Ua(2,e.viewQuery,n);let i=e.components;i!==null&&Wb(t,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{t[E]&=-5,Lc()}}function Wb(e,t){for(let n=0;n<t.length;n++)zb(e,t[n])}function qr(e,t,n,r){let o=P(null);try{let i=t.tView,a=e[E]&4096?4096:16,c=Ki(e,i,n,a,null,t,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),u=e[t.index];c[Xt]=u;let l=e[Et];return l!==null&&(c[Et]=l.createEmbeddedView(i)),ou(i,c,n),c}finally{P(o)}}function pp(e,t){let n=de+t;if(n<e.length)return e[n]}function Un(e,t){return!t||t.firstChild===null||Ei(e)}function Wr(e,t,n,r=!0){let o=t[C];if(ib(o,t,e,n),r){let s=Ba(n,e),a=t[W],c=Jc(a,e[Ct]);c!==null&&rb(o,e[Ee],a,t,c,s)}let i=t[Be];i!==null&&i.firstChild!==null&&(i.firstChild=null)}function gp(e,t){let n=kr(e,t);return n!==void 0&&Yi(n[C],n),n}function Mi(e,t,n,r,o=!1){for(;n!==null;){let i=t[n.index];i!==null&&r.push(Ke(i)),gt(i)&&Gb(i,r);let s=n.type;if(s&8)Mi(e,t,n.child,r);else if(s&32){let a=Yc(n,t),c;for(;c=a();)r.push(c)}else if(s&16){let a=zh(t,n);if(Array.isArray(a))r.push(...a);else{let c=en(t[ye]);Mi(c[C],c,a,r,!0)}}n=o?n.projectionNext:n.next}return r}function Gb(e,t){for(let n=de;n<e.length;n++){let r=e[n],o=r[C].firstChild;o!==null&&Mi(r[C],r,o,t)}e[Ct]!==e[Ne]&&t.push(e[Ct])}var mp=[];function Zb(e){return e[Ve]??Yb(e)}function Yb(e){let t=mp.pop()??Object.create(Kb);return t.lView=e,t}function Qb(e){e.lView[Ve]!==e&&(e.lView=null,mp.push(e))}var Kb=z(m({},vn),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{Hi(e.lView)},consumerOnSignalRead(){this.lView[Ve]=this}});function Jb(e){let t=e[Ve]??Object.create(Xb);return t.lView=e,t}var Xb=z(m({},vn),{consumerIsAlwaysLive:!0,consumerMarkedDirty:e=>{let t=en(e.lView);for(;t&&!vp(t[C]);)t=en(t);t&&$f(t)},consumerOnSignalRead(){this.lView[Ve]=this}});function vp(e){return e.type!==2}var ew=100;function yp(e,t=!0,n=0){let r=e[ht],o=r.rendererFactory,i=!1;i||o.begin?.();try{tw(e,n)}catch(s){throw t&&fp(e,s),s}finally{i||(o.end?.(),r.inlineEffectRunner?.flush())}}function tw(e,t){let n=Zf();try{_d(!0),Ha(e,t);let r=0;for(;Pr(e);){if(r===ew)throw new y(103,!1);r++,Ha(e,1)}}finally{_d(n)}}function nw(e,t,n,r){let o=t[E];if((o&256)===256)return;let i=!1,s=!1;!i&&t[ht].inlineEffectRunner?.flush(),Fc(t);let a=!0,c=null,u=null;i||(vp(e)?(u=Zb(t),c=Er(u)):_l()===null?(a=!1,u=Jb(t),c=Er(u)):t[Ve]&&(_o(t[Ve]),t[Ve]=null));try{Bf(t),Wy(e.bindingStartIndex),n!==null&&Xh(e,t,n,2,r);let l=(o&3)===3;if(!i)if(l){let h=e.preOrderCheckHooks;h!==null&&si(t,h,null)}else{let h=e.preOrderHooks;h!==null&&ai(t,h,0,null),aa(t,0)}if(s||rw(t),Dp(t,0),e.contentQueries!==null&&up(e,t),!i)if(l){let h=e.contentCheckHooks;h!==null&&si(t,h)}else{let h=e.contentHooks;h!==null&&ai(t,h,1),aa(t,1)}vb(e,t);let d=e.components;d!==null&&wp(t,d,0);let f=e.viewQuery;if(f!==null&&Ua(2,f,r),!i)if(l){let h=e.viewCheckHooks;h!==null&&si(t,h)}else{let h=e.viewHooks;h!==null&&ai(t,h,2),aa(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[ii]){for(let h of t[ii])h();t[ii]=null}i||(t[E]&=-73)}catch(l){throw i||Hi(t),l}finally{u!==null&&(xo(u,c),a&&Qb(u)),Lc()}}function Dp(e,t){for(let n=bh(e);n!==null;n=wh(n))for(let r=de;r<n.length;r++){let o=n[r];bp(o,t)}}function rw(e){for(let t=bh(e);t!==null;t=wh(t)){if(!(t[E]&vi.HasTransplantedViews))continue;let n=t[Bn];for(let r=0;r<n.length;r++){let o=n[r];$f(o)}}}function ow(e,t,n){let r=jt(t,e);bp(r,n)}function bp(e,t){Nc(e)&&Ha(e,t)}function Ha(e,t){let r=e[C],o=e[E],i=e[Ve],s=!!(t===0&&o&16);if(s||=!!(o&64&&t===0),s||=!!(o&1024),s||=!!(i?.dirty&&To(i)),s||=!1,i&&(i.dirty=!1),e[E]&=-9217,s)nw(r,e,r.template,e[pe]);else if(o&8192){Dp(e,1);let a=r.components;a!==null&&wp(e,a,1)}}function wp(e,t,n){for(let r=0;r<t.length;r++)ow(e,t[r],n)}function iu(e,t){let n=Zf()?64:1088;for(e[ht].changeDetectionScheduler?.notify(t);e;){e[E]|=n;let r=en(e);if(yi(e)&&!r)return e;e=r}return null}var sn=class{get rootNodes(){let t=this._lView,n=t[C];return Mi(n,t,n.firstChild,[])}constructor(t,n,r=!0){this._lView=t,this._cdRefInjectingView=n,this.notifyErrorHandler=r,this._appRef=null,this._attachedToViewContainer=!1}get context(){return this._lView[pe]}set context(t){this._lView[pe]=t}get destroyed(){return(this._lView[E]&256)===256}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[fe];if(gt(t)){let n=t[mi],r=n?n.indexOf(this):-1;r>-1&&(kr(t,r),hi(n,r))}this._attachedToViewContainer=!1}Yi(this._lView[C],this._lView)}onDestroy(t){Uf(this._lView,t)}markForCheck(){iu(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[E]&=-129}reattach(){_a(this._lView),this._lView[E]|=128}detectChanges(){this._lView[E]|=1024,yp(this._lView,this.notifyErrorHandler)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new y(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=yi(this._lView),n=this._lView[Xt];n!==null&&!t&&Kc(n,this._lView),Vh(this._lView[C],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new y(902,!1);this._appRef=t;let n=yi(this._lView),r=this._lView[Xt];r!==null&&!n&&Bh(r,this._lView),_a(this._lView)}},Fr=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=aw;let e=t;return e})(),iw=Fr,sw=class extends iw{constructor(t,n,r){super(),this._declarationLView=t,this._declarationTContainer=n,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,n){return this.createEmbeddedViewImpl(t,n)}createEmbeddedViewImpl(t,n,r){let o=qr(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:n,dehydratedView:r});return new sn(o)}};function aw(){return su(Ce(),k())}function su(e,t){return e.type&4?new sw(t,e,Xn(e,t)):null}var cw=new RegExp(`^(\\d+)*(${Sh}|${Ih})*(.*)`);function uw(e){let t=e.match(cw),[n,r,o,i]=t,s=r?parseInt(r,10):o,a=[];for(let[c,u,l]of i.matchAll(/(f|n)(\d*)/g)){let d=parseInt(l,10)||1;a.push(u,d)}return[s,...a]}function lw(e){return!e.prev&&e.parent?.type===8}function fa(e){return e.index-ie}function dw(e,t){let n=e.i18nNodes;if(n)return n.get(t)}function Xi(e,t,n,r){let o=fa(r),i=dw(e,o);if(i===void 0){let s=e.data[OD];if(s?.[o])i=hw(s[o],n);else if(t.firstChild===r)i=e.firstChild;else{let a=r.prev===null,c=r.prev??r.parent;if(lw(r)){let u=fa(r.parent);i=Va(e,u)}else{let u=Re(c,n);if(a)i=u.firstChild;else{let l=fa(c),d=Va(e,l);if(c.type===2&&d){let h=Gc(e,l)+1;i=es(h,d)}else i=u.nextSibling}}}}return i}function es(e,t){let n=t;for(let r=0;r<e;r++)n=n.nextSibling;return n}function fw(e,t){let n=e;for(let r=0;r<t.length;r+=2){let o=t[r],i=t[r+1];for(let s=0;s<i;s++)switch(o){case ja.FirstChild:n=n.firstChild;break;case ja.NextSibling:n=n.nextSibling;break}}return n}function hw(e,t){let[n,...r]=uw(e),o;if(n===Ih)o=t[ye][Ne];else if(n===Sh)o=XD(t[ye][Ne]);else{let i=Number(n);o=Ke(t[i+ie])}return fw(o,r)}var pw=!1;function gw(e){pw=e}function mw(e){let t=e[Be];if(t){let{i18nNodes:n,dehydratedIcuData:r}=t;if(n&&r){let o=e[W];for(let i of r.values())vw(o,n,i)}t.i18nNodes=void 0,t.dehydratedIcuData=void 0}}function vw(e,t,n){for(let r of n.node.cases[n.case]){let o=t.get(r.index-ie);o&&eu(e,o,!1)}}function Ep(e){let t=e[Or]??[],r=e[fe][W];for(let o of t)yw(o,r);e[Or]=dt}function yw(e,t){let n=0,r=e.firstChild;if(r){let o=e.data[Ci];for(;n<o;){let i=r.nextSibling;eu(t,r,!1),r=i,n++}}}function Cp(e){Ep(e);for(let t=de;t<e.length;t++)xi(e[t])}function xi(e){mw(e);let t=e[C];for(let n=ie;n<t.bindingStartIndex;n++)if(gt(e[n])){let r=e[n];Cp(r)}else lt(e[n])&&xi(e[n])}function Dw(e){let t=e._views;for(let n of t){let r=jD(n);if(r!==null&&r[Ne]!==null)if(lt(r))xi(r);else{let o=r[Ne];xi(o),Cp(r)}}}function bw(e,t){let n=[];for(let r of t)for(let o=0;o<(r[Mh]??1);o++){let i={data:r,firstChild:null};r[Ci]>0&&(i.firstChild=e,e=es(r[Ci],e)),n.push(i)}return[e,n]}var Ip=()=>null;function ww(e,t){let n=e[Or];return!t||n===null||n.length===0?null:n[0].data[RD]===t?n.shift():(Ep(e),null)}function Ew(){Ip=ww}function Hn(e,t){return Ip(e,t)}var zn=class{},Sp=new x("",{providedIn:"root",factory:()=>!1});var Mp=new x(""),za=class{},Ti=class{};function Cw(e){let t=Error(`No component factory found for ${we(e)}.`);return t[Iw]=e,t}var Iw="ngComponent";var qa=class{resolveComponentFactory(t){throw Cw(t)}},wu=class wu{};wu.NULL=new qa;var qn=wu,Wn=class{},ts=(()=>{let t=class t{constructor(){this.destroyNode=null}};t.__NG_ELEMENT_ID__=()=>Sw();let e=t;return e})();function Sw(){let e=k(),t=Ce(),n=jt(t.index,e);return(lt(n)?n:e)[W]}var Mw=(()=>{let t=class t{};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>null});let e=t;return e})(),ha={};var Ud=new Set;function tt(e){Ud.has(e)||(Ud.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}function xp(e){let t=!0;return setTimeout(()=>{t&&(t=!1,e())}),typeof Tr.requestAnimationFrame=="function"&&Tr.requestAnimationFrame(()=>{t&&(t=!1,e())}),()=>{t=!1}}function Hd(e){let t=!0;return queueMicrotask(()=>{t&&e()}),()=>{t=!1}}function zd(...e){}var G=class e{constructor({enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:n=!1,shouldCoalesceRunChangeDetection:r=!1}){if(this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new oe(!1),this.onMicrotaskEmpty=new oe(!1),this.onStable=new oe(!1),this.onError=new oe(!1),typeof Zone>"u")throw new y(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&n,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,_w(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get("isAngularZone")===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new y(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new y(909,!1)}run(t,n,r){return this._inner.run(t,n,r)}runTask(t,n,r,o){let i=this._inner,s=i.scheduleEventTask("NgZoneEvent: "+o,t,xw,zd,zd);try{return i.runTask(s,n,r)}finally{i.cancelTask(s)}}runGuarded(t,n,r){return this._inner.runGuarded(t,n,r)}runOutsideAngular(t){return this._outer.run(t)}},xw={};function au(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function Tw(e){e.isCheckStableRunning||e.callbackScheduled||(e.callbackScheduled=!0,Zone.root.run(()=>{xp(()=>{e.callbackScheduled=!1,Wa(e),e.isCheckStableRunning=!0,au(e),e.isCheckStableRunning=!1})}),Wa(e))}function _w(e){let t=()=>{Tw(e)};e._inner=e._inner.fork({name:"angular",properties:{isAngularZone:!0},onInvokeTask:(n,r,o,i,s,a)=>{if(Aw(a))return n.invokeTask(o,i,s,a);try{return qd(e),n.invokeTask(o,i,s,a)}finally{(e.shouldCoalesceEventChangeDetection&&i.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),Wd(e)}},onInvoke:(n,r,o,i,s,a,c)=>{try{return qd(e),n.invoke(o,i,s,a,c)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Nw(a)&&t(),Wd(e)}},onHasTask:(n,r,o,i)=>{n.hasTask(o,i),r===o&&(i.change=="microTask"?(e._hasPendingMicrotasks=i.microTask,Wa(e),au(e)):i.change=="macroTask"&&(e.hasPendingMacrotasks=i.macroTask))},onHandleError:(n,r,o,i)=>(n.handleError(o,i),e.runOutsideAngular(()=>e.onError.emit(i)),!1)})}function Wa(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function qd(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Wd(e){e._nesting--,au(e)}var Ga=class{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new oe,this.onMicrotaskEmpty=new oe,this.onStable=new oe,this.onError=new oe}run(t,n,r){return t.apply(n,r)}runGuarded(t,n,r){return t.apply(n,r)}runOutsideAngular(t){return t()}runTask(t,n,r,o){return t.apply(n,r)}};function Aw(e){return Tp(e,"__ignore_ng_zone__")}function Nw(e){return Tp(e,"__scheduler_tick__")}function Tp(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Rn=function(e){return e[e.EarlyRead=0]="EarlyRead",e[e.Write=1]="Write",e[e.MixedReadWrite=2]="MixedReadWrite",e[e.Read=3]="Read",e}(Rn||{}),Rw={destroy(){}};function un(e,t){!t&&$i(un);let n=t?.injector??p($e);if(!Mr(n))return Rw;tt("NgAfterNextRender");let r=n.get(cu),o=r.handler??=new Ya,i=t?.phase??Rn.MixedReadWrite,s=()=>{o.unregister(c),a()},a=n.get(cn).onDestroy(s),c=Xe(n,()=>new Za(i,()=>{s(),e()}));return o.register(c),{destroy:s}}var Za=class{constructor(t,n){this.phase=t,this.callbackFn=n,this.zone=p(G),this.errorHandler=p(Je,{optional:!0}),p(zn,{optional:!0})?.notify(6)}invoke(){try{this.zone.runOutsideAngular(this.callbackFn)}catch(t){this.errorHandler?.handleError(t)}}},Ya=class{constructor(){this.executingCallbacks=!1,this.buckets={[Rn.EarlyRead]:new Set,[Rn.Write]:new Set,[Rn.MixedReadWrite]:new Set,[Rn.Read]:new Set},this.deferredCallbacks=new Set}register(t){(this.executingCallbacks?this.deferredCallbacks:this.buckets[t.phase]).add(t)}unregister(t){this.buckets[t.phase].delete(t),this.deferredCallbacks.delete(t)}execute(){this.executingCallbacks=!0;for(let t of Object.values(this.buckets))for(let n of t)n.invoke();this.executingCallbacks=!1;for(let t of this.deferredCallbacks)this.buckets[t.phase].add(t);this.deferredCallbacks.clear()}destroy(){for(let t of Object.values(this.buckets))t.clear();this.deferredCallbacks.clear()}},cu=(()=>{let t=class t{constructor(){this.handler=null,this.internalCallbacks=[]}execute(){this.executeInternalCallbacks(),this.handler?.execute()}executeInternalCallbacks(){let r=[...this.internalCallbacks];this.internalCallbacks.length=0;for(let o of r)o()}ngOnDestroy(){this.handler?.destroy(),this.handler=null,this.internalCallbacks.length=0}};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>new t});let e=t;return e})();function Qa(e,t,n){let r=n?e.styles:null,o=n?e.classes:null,i=0;if(t!==null)for(let s=0;s<t.length;s++){let a=t[s];if(typeof a=="number")i=a;else if(i==1)o=wa(o,a);else if(i==2){let c=a,u=t[++s];r=wa(r,c+": "+u+";")}}n?e.styles=r:e.stylesWithoutHost=r,n?e.classes=o:e.classesWithoutHost=o}var _i=class extends qn{constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=Ft(t);return new Gn(n,this.ngModule)}};function Gd(e){let t=[];for(let n in e){if(!e.hasOwnProperty(n))continue;let r=e[n];r!==void 0&&t.push({propName:Array.isArray(r)?r[0]:r,templateName:n})}return t}function Ow(e){let t=e.toLowerCase();return t==="svg"?Ry:t==="math"?Oy:null}var Ka=class{constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,r){r=ji(r);let o=this.injector.get(t,ha,r);return o!==ha||n===ha?o:this.parentInjector.get(t,n,r)}},Gn=class extends Ti{get inputs(){let t=this.componentDef,n=t.inputTransforms,r=Gd(t.inputs);if(n!==null)for(let o of r)n.hasOwnProperty(o.propName)&&(o.transform=n[o.propName]);return r}get outputs(){return Gd(this.componentDef.outputs)}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=fy(t.selectors),this.ngContentSelectors=t.ngContentSelectors?t.ngContentSelectors:[],this.isBoundToModule=!!n}create(t,n,r,o){let i=P(null);try{o=o||this.ngModule;let s=o instanceof Ae?o:o?.injector;s&&this.componentDef.getStandaloneInjector!==null&&(s=this.componentDef.getStandaloneInjector(s)||s);let a=s?new Ka(t,s):t,c=a.get(Wn,null);if(c===null)throw new y(407,!1);let u=a.get(Mw,null),l=a.get(cu,null),d=a.get(zn,null),f={rendererFactory:c,sanitizer:u,inlineEffectRunner:null,afterRenderEventManager:l,changeDetectionScheduler:d},h=c.createRenderer(null,this.componentDef),g=this.componentDef.selectors[0][0]||"div",v=r?bb(h,r,this.componentDef.encapsulation,a):Qc(h,g,Ow(g)),I=512;this.componentDef.signals?I|=4096:this.componentDef.onPush||(I|=16);let _=null;v!==null&&(_=Wc(v,a,!0));let ee=nu(0,null,null,1,0,null,null,null,null,null,null),Z=Ki(null,ee,null,I,null,null,f,h,a,null,_);Fc(Z);let Me,At;try{let qe=this.componentDef,mn,Ls=null;qe.findHostDirectiveDefs?(mn=[],Ls=new Map,qe.findHostDirectiveDefs(qe,mn,Ls),mn.push(qe)):mn=[qe];let Km=Pw(Z,v),Jm=kw(Km,v,qe,mn,Z,f,h);At=Ac(ee,ie),v&&jw(h,qe,v,r),n!==void 0&&Vw(At,this.ngContentSelectors,n),Me=Lw(Jm,qe,mn,Ls,Z,[Bw]),ou(ee,Z,null)}finally{Lc()}return new Ja(this.componentType,Me,Xn(At,Z),Z,At)}finally{P(i)}}},Ja=class extends za{constructor(t,n,r,o,i){super(),this.location=r,this._rootLView=o,this._tNode=i,this.previousInputValues=null,this.instance=n,this.hostView=this.changeDetectorRef=new sn(o,void 0,!1),this.componentType=t}setInput(t,n){let r=this._tNode.inputs,o;if(r!==null&&(o=r[t])){if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let i=this._rootLView;ru(i[C],i,o,t,n),this.previousInputValues.set(t,n);let s=jt(this._tNode.index,i);iu(s,1)}}get injector(){return new Kt(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function Pw(e,t){let n=e[C],r=ie;return e[r]=t,zr(n,r,2,"#host",null)}function kw(e,t,n,r,o,i,s){let a=o[C];Fw(r,e,t,s);let c=null;t!==null&&(c=Wc(t,o[Vn]));let u=i.rendererFactory.createRenderer(t,n),l=16;n.signals?l=4096:n.onPush&&(l=64);let d=Ki(o,rp(n),null,l,o[e.index],e,i,u,null,null,c);return a.firstCreatePass&&$a(a,e,r.length-1),Ji(o,d),o[e.index]=d}function Fw(e,t,n,r){for(let o of e)t.mergedAttrs=Sc(t.mergedAttrs,o.hostAttrs);t.mergedAttrs!==null&&(Qa(t,t.mergedAttrs,!0),n!==null&&Zh(r,n,t))}function Lw(e,t,n,r,o,i){let s=Ce(),a=o[C],c=Re(s,o);sp(a,o,s,n,null,r);for(let l=0;l<n.length;l++){let d=s.directiveStart+l,f=rn(o,a,d,s);on(f,o)}ap(a,o,s),c&&on(c,o);let u=rn(o,a,s.directiveStart+s.componentOffset,s);if(e[pe]=o[pe]=u,i!==null)for(let l of i)l(u,t);return ep(a,s,o),u}function jw(e,t,n,r){if(r)Ia(e,n,["ng-version","18.0.3"]);else{let{attrs:o,classes:i}=hy(t.selectors[0]);o&&Ia(e,n,o),i&&i.length>0&&Gh(e,n,i.join(" "))}}function Vw(e,t,n){let r=e.projection=[];for(let o=0;o<t.length;o++){let i=n[o];r.push(i!=null?Array.from(i):null)}}function Bw(){let e=Ce();Vc(k()[C],e)}var nr=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=$w;let e=t;return e})();function $w(){let e=Ce();return Ap(e,k())}var Uw=nr,_p=class extends Uw{constructor(t,n,r){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=r}get element(){return Xn(this._hostTNode,this._hostLView)}get injector(){return new Kt(this._hostTNode,this._hostLView)}get parentInjector(){let t=Bc(this._hostTNode,this._hostLView);if(sh(t)){let n=bi(t,this._hostLView),r=Di(t),o=n[C].data[r+8];return new Kt(o,n)}else return new Kt(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=Zd(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-de}createEmbeddedView(t,n,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let s=Hn(this._lContainer,t.ssrId),a=t.createEmbeddedViewImpl(n||{},i,s);return this.insertImpl(a,o,Un(this._hostTNode,s)),a}createComponent(t,n,r,o,i){let s=t&&!Ty(t),a;if(s)a=n;else{let g=n||{};a=g.index,r=g.injector,o=g.projectableNodes,i=g.environmentInjector||g.ngModuleRef}let c=s?t:new Gn(Ft(t)),u=r||this.parentInjector;if(!i&&c.ngModule==null){let v=(s?u:this.parentInjector).get(Ae,null);v&&(i=v)}let l=Ft(c.componentType??{}),d=Hn(this._lContainer,l?.id??null),f=d?.firstChild??null,h=c.create(u,o,f,i);return this.insertImpl(h.hostView,a,Un(this._hostTNode,d)),h}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,r){let o=t._lView;if(ky(o)){let a=this.indexOf(t);if(a!==-1)this.detach(a);else{let c=o[fe],u=new _p(c,c[Ee],c[fe]);u.detach(u.indexOf(t))}}let i=this._adjustIndex(n),s=this._lContainer;return Wr(s,o,i,r),t.attachToViewContainerRef(),pf(pa(s),i,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=Zd(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),r=kr(this._lContainer,n);r&&(hi(pa(this._lContainer),n),Yi(r[C],r))}detach(t){let n=this._adjustIndex(t,-1),r=kr(this._lContainer,n);return r&&hi(pa(this._lContainer),n)!=null?new sn(r):null}_adjustIndex(t,n=0){return t??this.length+n}};function Zd(e){return e[mi]}function pa(e){return e[mi]||(e[mi]=[])}function Ap(e,t){let n,r=t[e.index];return gt(r)?n=r:(n=cp(r,t,null,e),t[e.index]=n,Ji(t,n)),Np(n,t,e,r),new _p(n,e,t)}function Hw(e,t){let n=e[W],r=n.createComment(""),o=Re(t,e),i=Jc(n,o);return Si(n,i,r,lb(n,o),!1),r}var Np=Rp,uu=()=>!1;function zw(e,t,n){return uu(e,t,n)}function Rp(e,t,n,r){if(e[Ct])return;let o;n.type&8?o=Ke(r):o=Hw(t,n),e[Ct]=o}function qw(e,t,n){if(e[Ct]&&e[Or])return!0;let r=n[Be],o=t.index-ie;if(!r||ED(t)||Gi(r,o))return!1;let s=Va(r,o),a=r.data[qc]?.[o],[c,u]=bw(s,a);return e[Ct]=c,e[Or]=u,!0}function Ww(e,t,n,r){uu(e,n,t)||Rp(e,t,n,r)}function Gw(){Np=Ww,uu=qw}var Xa=class e{constructor(t){this.queryList=t,this.matches=null}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},ec=class e{constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let r=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let i=0;i<r;i++){let s=n.getByIndex(i),a=this.queries[s.indexInDeclarationView];o.push(a.clone())}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)lu(t,n).matches!==null&&this.queries[n].setDirty()}},tc=class{constructor(t,n,r=null){this.flags=n,this.read=r,typeof t=="string"?this.predicate=tE(t):this.predicate=t}},nc=class e{constructor(t=[]){this.queries=t}elementStart(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let r=0;r<this.length;r++){let o=n!==null?n.length:0,i=this.getByIndex(r).embeddedTView(t,o);i&&(i.indexInDeclarationView=r,n!==null?n.push(i):n=[i])}return n!==null?new e(n):null}template(t,n){for(let r=0;r<this.queries.length;r++)this.queries[r].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},rc=class e{constructor(t,n=-1){this.metadata=t,this.matches=null,this.indexInDeclarationView=-1,this.crossesNgTemplate=!1,this._appliesToNextNode=!0,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,r=t.parent;for(;r!==null&&r.type&8&&r.index!==n;)r=r.parent;return n===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(t,n,Zw(n,i)),this.matchTNodeWithReadOption(t,n,ci(n,t,i,!1,!1))}else r===Fr?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,ci(n,t,r,!1,!1))}matchTNodeWithReadOption(t,n,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===Ie||o===nr||o===Fr&&n.type&4)this.addMatch(n.index,-2);else{let i=ci(n,t,o,!1,!1);i!==null&&this.addMatch(n.index,i)}else this.addMatch(n.index,r)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function Zw(e,t){let n=e.localNames;if(n!==null){for(let r=0;r<n.length;r+=2)if(n[r]===t)return n[r+1]}return null}function Yw(e,t){return e.type&11?Xn(e,t):e.type&4?su(e,t):null}function Qw(e,t,n,r){return n===-1?Yw(t,e):n===-2?Kw(e,t,r):rn(e,e[C],n,t)}function Kw(e,t,n){if(n===Ie)return Xn(t,e);if(n===Fr)return su(t,e);if(n===nr)return Ap(t,e)}function Op(e,t,n,r){let o=t[Et].queries[r];if(o.matches===null){let i=e.data,s=n.matches,a=[];for(let c=0;s!==null&&c<s.length;c+=2){let u=s[c];if(u<0)a.push(null);else{let l=i[u];a.push(Qw(t,l,s[c+1],n.metadata.read))}}o.matches=a}return o.matches}function oc(e,t,n,r){let o=e.queries.getByIndex(n),i=o.matches;if(i!==null){let s=Op(e,t,o,n);for(let a=0;a<i.length;a+=2){let c=i[a];if(c>0)r.push(s[a/2]);else{let u=i[a+1],l=t[-c];for(let d=de;d<l.length;d++){let f=l[d];f[Xt]===f[fe]&&oc(f[C],f,u,r)}if(l[Bn]!==null){let d=l[Bn];for(let f=0;f<d.length;f++){let h=d[f];oc(h[C],h,u,r)}}}}}return r}function Jw(e,t){return e[Et].queries[t].queryList}function Xw(e,t,n){let r=new Fa((n&4)===4);return Ib(e,t,r,r.destroy),(t[Et]??=new ec).queries.push(new Xa(r))-1}function eE(e,t,n){let r=ge();return r.firstCreatePass&&(nE(r,new tc(e,t,n),-1),(t&2)===2&&(r.staticViewQueries=!0)),Xw(r,k(),t)}function tE(e){return e.split(",").map(t=>t.trim())}function nE(e,t,n){e.queries===null&&(e.queries=new nc),e.queries.track(new rc(t,n))}function lu(e,t){return e.queries.getByIndex(t)}function rE(e,t){let n=e[C],r=lu(n,t);return r.crossesNgTemplate?oc(n,e,t,[]):Op(n,e,r,t)}function vt(e,t){tt("NgSignals");let n=$l(e),r=n[at];return t?.equal&&(r.equal=t.equal),n.set=o=>Ro(r,o),n.update=o=>Ul(r,o),n.asReadonly=oE.bind(n),n}function oE(){let e=this[at];if(e.readonlyFn===void 0){let t=()=>this();t[at]=e,e.readonlyFn=t}return e.readonlyFn}function du(e){let t=e.inputConfig,n={};for(let r in t)if(t.hasOwnProperty(r)){let o=t[r];Array.isArray(o)&&o[3]&&(n[r]=o[3])}e.inputTransforms=n}var Lt=class{},Lr=class{};var ic=class extends Lt{constructor(t,n,r){super(),this._parent=n,this._bootstrapComponents=[],this.destroyCbs=[],this.componentFactoryResolver=new _i(this);let o=If(t);this._bootstrapComponents=Fh(o.bootstrap),this._r3Injector=gh(t,n,[{provide:Lt,useValue:this},{provide:qn,useValue:this.componentFactoryResolver},...r],we(t),new Set(["environment"])),this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(t)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},sc=class extends Lr{constructor(t){super(),this.moduleType=t}create(t){return new ic(this.moduleType,t,[])}};var Ai=class extends Lt{constructor(t){super(),this.componentFactoryResolver=new _i(this),this.instance=null;let n=new Nr([...t.providers,{provide:Lt,useValue:this},{provide:qn,useValue:this.componentFactoryResolver}],t.parent||Tc(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function fu(e,t,n=null){return new Ai({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}function Pp(e,t,n){return e[t]=n}function iE(e,t){return e[t]}function pt(e,t,n){let r=e[t];return Object.is(r,n)?!1:(e[t]=n,!0)}function sE(e,t,n,r){let o=pt(e,t,n);return pt(e,t+1,r)||o}function Gr(e){return(e.flags&32)===32}function aE(e,t,n,r,o,i,s,a,c){let u=t.consts,l=zr(t,e,4,s||null,a||null);ip(t,n,l,$n(u,c)),Vc(t,l);let d=l.tView=nu(2,l,r,o,i,t.directiveRegistry,t.pipeRegistry,null,t.schemas,u,null);return t.queries!==null&&(t.queries.template(t,l),d.queries=t.queries.embeddedTView(l)),l}function Ni(e,t,n,r,o,i,s,a,c,u){let l=n+ie,d=t.firstCreatePass?aE(l,t,e,r,o,i,s,a,c):t.data[l];Ur(d,!1);let f=kp(t,e,d,n);jc()&&Xc(t,e,f,d),on(f,e);let h=cp(f,e,f,d);return e[l]=h,Ji(e,h),zw(h,d,e),_c(d)&&tp(t,e,d),c!=null&&np(e,d,u),d}function nt(e,t,n,r,o,i,s,a){let c=k(),u=ge(),l=$n(u.consts,i);return Ni(c,u,e,t,n,r,o,l,s,a),nt}var kp=Fp;function Fp(e,t,n,r){return Vt(!0),t[W].createComment("")}function cE(e,t,n,r){let o=t[Be],i=!o||Jn()||Gr(n)||Gi(o,r);if(Vt(i),i)return Fp(e,t,n,r);let s=o.data[ND]?.[r]??null;s!==null&&n.tView!==null&&n.tView.ssrId===null&&(n.tView.ssrId=s);let a=Xi(o,e,t,n);Wi(o,r,a);let c=Gc(o,r);return es(c,a)}function uE(){kp=cE}function hu(e,t,n,r){let o=k(),i=Hr();if(pt(o,i,t)){let s=ge(),a=nh();Bb(a,o,e,t,n,r)}return hu}function lE(e,t,n,r){return pt(e,Hr(),n)?t+kn(n)+r:Oe}function dE(e,t,n,r,o,i){let s=qy(),a=sE(e,s,n,o);return Pc(2),a?t+kn(n)+r+kn(o)+i:Oe}function ni(e,t){return e<<17|t<<2}function an(e){return e>>17&32767}function fE(e){return(e&2)==2}function hE(e,t){return e&131071|t<<17}function ac(e){return e|2}function Zn(e){return(e&131068)>>2}function ga(e,t){return e&-131069|t<<2}function pE(e){return(e&1)===1}function cc(e){return e|1}function gE(e,t,n,r,o,i){let s=i?t.classBindings:t.styleBindings,a=an(s),c=Zn(s);e[r]=n;let u=!1,l;if(Array.isArray(n)){let d=n;l=d[1],(l===null||Vr(d,l)>0)&&(u=!0)}else l=n;if(o)if(c!==0){let f=an(e[a+1]);e[r+1]=ni(f,a),f!==0&&(e[f+1]=ga(e[f+1],r)),e[a+1]=hE(e[a+1],r)}else e[r+1]=ni(a,0),a!==0&&(e[a+1]=ga(e[a+1],r)),a=r;else e[r+1]=ni(c,0),a===0?a=r:e[c+1]=ga(e[c+1],r),c=r;u&&(e[r+1]=ac(e[r+1])),Yd(e,l,r,!0),Yd(e,l,r,!1),mE(t,l,e,r,i),s=ni(a,c),i?t.classBindings=s:t.styleBindings=s}function mE(e,t,n,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof t=="string"&&Vr(i,t)>=0&&(n[r+1]=cc(n[r+1]))}function Yd(e,t,n,r){let o=e[n+1],i=t===null,s=r?an(o):Zn(o),a=!1;for(;s!==0&&(a===!1||i);){let c=e[s],u=e[s+1];vE(c,t)&&(a=!0,e[s+1]=r?cc(u):ac(u)),s=r?an(u):Zn(u)}a&&(e[n+1]=r?ac(o):cc(o))}function vE(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t=="string"?Vr(e,t)>=0:!1}var Ye={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function yE(e){return e.substring(Ye.key,Ye.keyEnd)}function DE(e){return bE(e),Lp(e,jp(e,0,Ye.textEnd))}function Lp(e,t){let n=Ye.textEnd;return n===t?-1:(t=Ye.keyEnd=wE(e,Ye.key=t,n),jp(e,t,n))}function bE(e){Ye.key=0,Ye.keyEnd=0,Ye.value=0,Ye.valueEnd=0,Ye.textEnd=e.length}function jp(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function wE(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function J(e,t,n){let r=k(),o=Hr();if(pt(r,o,t)){let i=ge(),s=nh();Tb(i,s,r,e,t,r[W],n,!1)}return J}function uc(e,t,n,r,o){let i=t.inputs,s=o?"class":"style";ru(e,n,i[s],s,r)}function pu(e,t){return CE(e,t,null,!0),pu}function Mt(e){IE(AE,EE,e,!0)}function EE(e,t){for(let n=DE(t);n>=0;n=Lp(t,n))Ic(e,yE(t),!0)}function CE(e,t,n,r){let o=k(),i=ge(),s=Pc(2);if(i.firstUpdatePass&&Bp(i,e,s,r),t!==Oe&&pt(o,s,t)){let a=i.data[St()];$p(i,a,o,o[W],e,o[s+1]=RE(t,n),r,s)}}function IE(e,t,n,r){let o=ge(),i=Pc(2);o.firstUpdatePass&&Bp(o,null,i,r);let s=k();if(n!==Oe&&pt(s,i,n)){let a=o.data[St()];if(Up(a,r)&&!Vp(o,i)){let c=r?a.classesWithoutHost:a.stylesWithoutHost;c!==null&&(n=wa(c,n||"")),uc(o,a,s,n,r)}else NE(o,a,s,s[W],s[i+1],s[i+1]=_E(e,t,n),r,i)}}function Vp(e,t){return t>=e.expandoStartIndex}function Bp(e,t,n,r){let o=e.data;if(o[n+1]===null){let i=o[St()],s=Vp(e,n);Up(i,r)&&t===null&&!s&&(t=!1),t=SE(o,i,t,r),gE(o,i,t,n,s,r)}}function SE(e,t,n,r){let o=Qy(e),i=r?t.residualClasses:t.residualStyles;if(o===null)(r?t.classBindings:t.styleBindings)===0&&(n=ma(null,e,t,n,r),n=jr(n,t.attrs,r),i=null);else{let s=t.directiveStylingLast;if(s===-1||e[s]!==o)if(n=ma(o,e,t,n,r),i===null){let c=ME(e,t,r);c!==void 0&&Array.isArray(c)&&(c=ma(null,e,t,c[1],r),c=jr(c,t.attrs,r),xE(e,t,r,c))}else i=TE(e,t,r)}return i!==void 0&&(r?t.residualClasses=i:t.residualStyles=i),n}function ME(e,t,n){let r=n?t.classBindings:t.styleBindings;if(Zn(r)!==0)return e[an(r)]}function xE(e,t,n,r){let o=n?t.classBindings:t.styleBindings;e[an(o)]=r}function TE(e,t,n){let r,o=t.directiveEnd;for(let i=1+t.directiveStylingLast;i<o;i++){let s=e[i].hostAttrs;r=jr(r,s,n)}return jr(r,t.attrs,n)}function ma(e,t,n,r,o){let i=null,s=n.directiveEnd,a=n.directiveStylingLast;for(a===-1?a=n.directiveStart:a++;a<s&&(i=t[a],r=jr(r,i.hostAttrs,o),i!==e);)a++;return e!==null&&(n.directiveStylingLast=a),r}function jr(e,t,n){let r=n?1:2,o=-1;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];typeof s=="number"?o=s:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Ic(e,s,n?!0:t[++i]))}return e===void 0?null:e}function _E(e,t,n){if(n==null||n==="")return dt;let r=[],o=tr(n);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],!0);else if(typeof o=="object")for(let i in o)o.hasOwnProperty(i)&&e(r,i,o[i]);else typeof o=="string"&&t(r,o);return r}function AE(e,t,n){let r=String(t);r!==""&&!r.includes(" ")&&Ic(e,r,n)}function NE(e,t,n,r,o,i,s,a){o===Oe&&(o=dt);let c=0,u=0,l=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;l!==null||d!==null;){let f=c<o.length?o[c+1]:void 0,h=u<i.length?i[u+1]:void 0,g=null,v;l===d?(c+=2,u+=2,f!==h&&(g=d,v=h)):d===null||l!==null&&l<d?(c+=2,g=l):(u+=2,g=d,v=h),g!==null&&$p(e,t,n,r,g,v,s,a),l=c<o.length?o[c]:null,d=u<i.length?i[u]:null}}function $p(e,t,n,r,o,i,s,a){if(!(t.type&3))return;let c=e.data,u=c[a+1],l=pE(u)?Qd(c,t,n,o,Zn(u),s):void 0;if(!Ri(l)){Ri(i)||fE(u)&&(i=Qd(c,null,n,o,a,s));let d=Vf(St(),n);gb(r,s,d,o,i)}}function Qd(e,t,n,r,o,i){let s=t===null,a;for(;o>0;){let c=e[o],u=Array.isArray(c),l=u?c[1]:c,d=l===null,f=n[o+1];f===Oe&&(f=d?dt:void 0);let h=d?ia(f,r):l===r?f:void 0;if(u&&!Ri(h)&&(h=ia(c,r)),Ri(h)&&(a=h,s))return a;let g=e[o+1];o=s?an(g):Zn(g)}if(t!==null){let c=i?t.residualClasses:t.residualStyles;c!=null&&(a=ia(c,r))}return a}function Ri(e){return e!==void 0}function RE(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=we(tr(e)))),e}function Up(e,t){return(e.flags&(t?8:16))!==0}var lc=class{destroy(t){}updateValue(t,n){}swap(t,n){let r=Math.min(t,n),o=Math.max(t,n),i=this.detach(o);if(o-r>1){let s=this.detach(r);this.attach(r,i),this.attach(o,s)}else this.attach(r,i)}move(t,n){this.attach(n,this.detach(t))}};function va(e,t,n,r,o){return e===n&&Object.is(t,r)?1:Object.is(o(e,t),o(n,r))?-1:0}function OE(e,t,n){let r,o,i=0,s=e.length-1,a=void 0;if(Array.isArray(t)){let c=t.length-1;for(;i<=s&&i<=c;){let u=e.at(i),l=t[i],d=va(i,u,i,l,n);if(d!==0){d<0&&e.updateValue(i,l),i++;continue}let f=e.at(s),h=t[c],g=va(s,f,c,h,n);if(g!==0){g<0&&e.updateValue(s,h),s--,c--;continue}let v=n(i,u),I=n(s,f),_=n(i,l);if(Object.is(_,I)){let ee=n(c,h);Object.is(ee,v)?(e.swap(i,s),e.updateValue(s,h),c--,s--):e.move(s,i),e.updateValue(i,l),i++;continue}if(r??=new Oi,o??=Jd(e,i,s,n),dc(e,r,i,_))e.updateValue(i,l),i++,s++;else if(o.has(_))r.set(v,e.detach(i)),s--;else{let ee=e.create(i,t[i]);e.attach(i,ee),i++,s++}}for(;i<=c;)Kd(e,r,n,i,t[i]),i++}else if(t!=null){let c=t[Symbol.iterator](),u=c.next();for(;!u.done&&i<=s;){let l=e.at(i),d=u.value,f=va(i,l,i,d,n);if(f!==0)f<0&&e.updateValue(i,d),i++,u=c.next();else{r??=new Oi,o??=Jd(e,i,s,n);let h=n(i,d);if(dc(e,r,i,h))e.updateValue(i,d),i++,s++,u=c.next();else if(!o.has(h))e.attach(i,e.create(i,d)),i++,s++,u=c.next();else{let g=n(i,l);r.set(g,e.detach(i)),s--}}}for(;!u.done;)Kd(e,r,n,e.length,u.value),u=c.next()}for(;i<=s;)e.destroy(e.detach(s--));r?.forEach(c=>{e.destroy(c)})}function dc(e,t,n,r){return t!==void 0&&t.has(r)?(e.attach(n,t.get(r)),t.delete(r),!0):!1}function Kd(e,t,n,r,o){if(dc(e,t,r,n(r,o)))e.updateValue(r,o);else{let i=e.create(r,o);e.attach(r,i)}}function Jd(e,t,n,r){let o=new Set;for(let i=t;i<=n;i++)o.add(r(i,e.at(i)));return o}var Oi=class{constructor(){this.kvMap=new Map,this._vMap=void 0}has(t){return this.kvMap.has(t)}delete(t){if(!this.has(t))return!1;let n=this.kvMap.get(t);return this._vMap!==void 0&&this._vMap.has(n)?(this.kvMap.set(t,this._vMap.get(n)),this._vMap.delete(n)):this.kvMap.delete(t),!0}get(t){return this.kvMap.get(t)}set(t,n){if(this.kvMap.has(t)){let r=this.kvMap.get(t);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(r);)r=o.get(r);o.set(r,n)}else this.kvMap.set(t,n)}forEach(t){for(let[n,r]of this.kvMap)if(t(r,n),this._vMap!==void 0){let o=this._vMap;for(;o.has(r);)r=o.get(r),t(r,n)}}};function rt(e,t){tt("NgControlFlow");let n=k(),r=Hr(),o=n[r]!==Oe?n[r]:-1,i=o!==-1?Pi(n,ie+o):void 0,s=0;if(pt(n,r,e)){let a=P(null);try{if(i!==void 0&&gp(i,s),e!==-1){let c=ie+e,u=Pi(n,c),l=gc(n[C],c),d=Hn(u,l.tView.ssrId),f=qr(n,l,t,{dehydratedView:d});Wr(u,f,s,Un(l,d))}}finally{P(a)}}else if(i!==void 0){let a=pp(i,s);a!==void 0&&(a[pe]=t)}}var fc=class{constructor(t,n,r){this.lContainer=t,this.$implicit=n,this.$index=r}get $count(){return this.lContainer.length-de}};function ln(e){return e}var hc=class{constructor(t,n,r){this.hasEmptyBlock=t,this.trackByFn=n,this.liveCollection=r}};function Pe(e,t,n,r,o,i,s,a,c,u,l,d,f){tt("NgControlFlow");let h=k(),g=ge(),v=c!==void 0,I=k(),_=a?s.bind(I[ye][pe]):s,ee=new hc(v,_);I[ie+e]=ee,Ni(h,g,e+1,t,n,r,o,$n(g.consts,i)),v&&Ni(h,g,e+2,c,u,l,d,$n(g.consts,f))}var pc=class extends lc{constructor(t,n,r){super(),this.lContainer=t,this.hostLView=n,this.templateTNode=r,this.operationsCounter=void 0,this.needsIndexUpdate=!1}get length(){return this.lContainer.length-de}at(t){return this.getLView(t)[pe].$implicit}attach(t,n){let r=n[Be];this.needsIndexUpdate||=t!==this.length,Wr(this.lContainer,n,t,Un(this.templateTNode,r))}detach(t){return this.needsIndexUpdate||=t!==this.length-1,PE(this.lContainer,t)}create(t,n){let r=Hn(this.lContainer,this.templateTNode.tView.ssrId),o=qr(this.hostLView,this.templateTNode,new fc(this.lContainer,n,t),{dehydratedView:r});return this.operationsCounter?.recordCreate(),o}destroy(t){Yi(t[C],t),this.operationsCounter?.recordDestroy()}updateValue(t,n){this.getLView(t)[pe].$implicit=n}reset(){this.needsIndexUpdate=!1,this.operationsCounter?.reset()}updateIndexes(){if(this.needsIndexUpdate)for(let t=0;t<this.length;t++)this.getLView(t)[pe].$index=t}getLView(t){return kE(this.lContainer,t)}};function ke(e){let t=P(null),n=St();try{let r=k(),o=r[C],i=r[n],s=n+1,a=Pi(r,s);if(i.liveCollection===void 0){let u=gc(o,s);i.liveCollection=new pc(a,r,u)}else i.liveCollection.reset();let c=i.liveCollection;if(OE(c,e,i.trackByFn),c.updateIndexes(),i.hasEmptyBlock){let u=Hr(),l=c.length===0;if(pt(r,u,l)){let d=n+2,f=Pi(r,d);if(l){let h=gc(o,d),g=Hn(f,h.tView.ssrId),v=qr(r,h,void 0,{dehydratedView:g});Wr(f,v,0,Un(h,g))}else gp(f,0)}}}finally{P(t)}}function Pi(e,t){return e[t]}function PE(e,t){return kr(e,t)}function kE(e,t){return pp(e,t)}function gc(e,t){return Ac(e,t)}function FE(e,t,n,r,o,i){let s=t.consts,a=$n(s,o),c=zr(t,e,2,r,a);return ip(t,n,c,$n(s,i)),c.attrs!==null&&Qa(c,c.attrs,!1),c.mergedAttrs!==null&&Qa(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function w(e,t,n,r){let o=k(),i=ge(),s=ie+e,a=o[W],c=i.firstCreatePass?FE(s,i,o,t,n,r):i.data[s],u=Hp(i,o,c,a,t,e);o[s]=u;let l=_c(c);return Ur(c,!0),Zh(a,u,c),!Gr(c)&&jc()&&Xc(i,o,u,c),jy()===0&&on(u,o),Vy(),l&&(tp(i,o,c),ep(i,c,o)),r!==null&&np(o,c),w}function b(){let e=Ce();Wf()?Gf():(e=e.parent,Ur(e,!1));let t=e;$y(t)&&Hy(),By();let n=ge();return n.firstCreatePass&&(Vc(n,e),Pf(e)&&n.queries.elementEnd(e)),t.classesWithoutHost!=null&&nD(t)&&uc(n,t,k(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&rD(t)&&uc(n,t,k(),t.stylesWithoutHost,!1),b}function Ue(e,t,n,r){return w(e,t,n,r),b(),Ue}var Hp=(e,t,n,r,o,i)=>(Vt(!0),Qc(r,o,rh()));function LE(e,t,n,r,o,i){let s=t[Be],a=!s||Jn()||Gr(n)||Gi(s,i);if(Vt(a),a)return Qc(r,o,rh());let c=Xi(s,e,t,n);return Ah(s,i)&&Wi(s,i,c.nextSibling),s&&(vh(n)||yh(c))&&Br(n)&&(Uy(n),qh(c)),c}function jE(){Hp=LE}var VE=(e,t,n,r)=>(Vt(!0),jh(t[W],""));function BE(e,t,n,r){let o,i=t[Be],s=!i||Jn()||Gr(n);if(Vt(s),s)return jh(t[W],"");let a=Xi(i,e,t,n),c=$D(i,r);return Wi(i,r,a),o=es(c,a),o}function $E(){VE=BE}function zp(){return k()}var ki="en-US";var UE=ki;function HE(e){typeof e=="string"&&(UE=e.toLowerCase().replace(/_/g,"-"))}var zE=(e,t,n)=>{};function De(e,t,n,r){let o=k(),i=ge(),s=Ce();return WE(i,o,o[W],s,e,t,r),De}function qE(e,t,n,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let s=o[i];if(s===n&&o[i+1]===r){let a=t[gi],c=o[i+2];return a.length>c?a[c]:null}typeof s=="string"&&(i+=2)}return null}function WE(e,t,n,r,o,i,s){let a=_c(r),u=e.firstCreatePass&&dp(e),l=t[pe],d=lp(t),f=!0;if(r.type&3||s){let v=Re(r,t),I=s?s(v):v,_=d.length,ee=s?Me=>s(Ke(Me[r.index])):r.index,Z=null;if(!s&&a&&(Z=qE(e,t,o,r.index)),Z!==null){let Me=Z.__ngLastListenerFn__||Z;Me.__ngNextListenerFn__=i,Z.__ngLastListenerFn__=i,f=!1}else{i=ef(r,t,l,i),zE(v,o,i);let Me=n.listen(I,o,i);d.push(i,Me),u&&u.push(o,ee,_,_+1)}}else i=ef(r,t,l,i);let h=r.outputs,g;if(f&&h!==null&&(g=h[o])){let v=g.length;if(v)for(let I=0;I<v;I+=2){let _=g[I],ee=g[I+1],At=t[_][ee].subscribe(i),qe=d.length;d.push(i,At),u&&u.push(o,r.index,qe,-(qe+1))}}}function Xd(e,t,n,r){let o=P(null);try{return ct(6,t,n),n(r)!==!1}catch(i){return fp(e,i),!1}finally{ct(7,t,n),P(o)}}function ef(e,t,n,r){return function o(i){if(i===Function)return r;let s=e.componentOffset>-1?jt(e.index,t):t;iu(s,5);let a=Xd(t,n,r,i),c=o.__ngNextListenerFn__;for(;c;)a=Xd(t,n,c,i)&&a,c=c.__ngNextListenerFn__;return a}}function yt(e=1){return Jy(e)}function GE(e,t){let n=null,r=ay(e);for(let o=0;o<t.length;o++){let i=t[o];if(i==="*"){n=o;continue}if(r===null?bf(e,i,!0):ly(r,i))return o}return n}function ns(e){let t=k()[ye][Ee];if(!t.projection){let n=e?e.length:1,r=t.projection=Jv(n,null),o=r.slice(),i=t.child;for(;i!==null;){let s=e?GE(i,e):0;s!==null&&(o[s]?o[s].projectionNext=i:r[s]=i,o[s]=i),i=i.next}}}function rs(e,t=0,n,r,o,i){let s=k(),a=ge(),c=r?e+1:null;c!==null&&Ni(s,a,c,r,o,i,null,n);let u=zr(a,ie+e,16,null,n||null);u.projection===null&&(u.projection=t),Gf();let d=!s[Be]||Jn();s[ye][Ee].projection[u.projection]===null&&c!==null?ZE(s,a,c):d&&(u.flags&32)!==32&&hb(a,s,u)}function ZE(e,t,n){let r=ie+n,o=t.data[r],i=e[r],s=Hn(i,o.tView.ssrId),a=qr(e,o,void 0,{dehydratedView:s});Wr(i,a,0,Un(o,s))}function qp(e,t,n){eE(e,t,n)}function gu(e){let t=k(),n=ge(),r=Qf();kc(r+1);let o=lu(n,r);if(e.dirty&&Py(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let i=rE(t,r);e.reset(i,yD),e.notifyOnChanges()}return!0}return!1}function mu(){return Jw(k(),Qf())}function V(e,t=""){let n=k(),r=ge(),o=e+ie,i=r.firstCreatePass?zr(r,o,1,t,null):r.data[o],s=Wp(r,n,i,t,e);n[o]=s,jc()&&Xc(r,n,s,i),Ur(i,!1)}var Wp=(e,t,n,r,o)=>(Vt(!0),Lh(t[W],r));function YE(e,t,n,r,o){let i=t[Be],s=!i||Jn()||Gr(n)||Gi(i,o);return Vt(s),s?Lh(t[W],r):Xi(i,e,t,n)}function QE(){Wp=YE}function ce(e){return xt("",e,""),ce}function xt(e,t,n){let r=k(),o=lE(r,e,t,n);return o!==Oe&&hp(r,St(),o),xt}function vu(e,t,n,r,o){let i=k(),s=dE(i,e,t,n,r,o);return s!==Oe&&hp(i,St(),s),vu}function KE(e,t,n){let r=ge();if(r.firstCreatePass){let o=Kn(e);mc(n,r.data,r.blueprint,o,!0),mc(t,r.data,r.blueprint,o,!1)}}function mc(e,t,n,r,o){if(e=ve(e),Array.isArray(e))for(let i=0;i<e.length;i++)mc(e[i],t,n,r,o);else{let i=ge(),s=k(),a=Ce(),c=jn(e)?e:ve(e.provide),u=Af(e),l=a.providerIndexes&1048575,d=a.directiveStart,f=a.providerIndexes>>20;if(jn(e)||!e.multi){let h=new nn(u,o,mt),g=Da(c,t,o?l:l+f,d);g===-1?(Ra(wi(a,s),i,c),ya(i,e,t.length),t.push(c),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),n.push(h),s.push(h)):(n[g]=h,s[g]=h)}else{let h=Da(c,t,l+f,d),g=Da(c,t,l,l+f),v=h>=0&&n[h],I=g>=0&&n[g];if(o&&!I||!o&&!v){Ra(wi(a,s),i,c);let _=eC(o?XE:JE,n.length,o,r,u);!o&&I&&(n[g].providerFactory=_),ya(i,e,t.length,0),t.push(c),a.directiveStart++,a.directiveEnd++,o&&(a.providerIndexes+=1048576),n.push(_),s.push(_)}else{let _=Gp(n[o?g:h],u,!o&&r);ya(i,e,h>-1?h:g,_)}!o&&r&&I&&n[g].componentProviders++}}}function ya(e,t,n,r){let o=jn(t),i=wy(t);if(o||i){let c=(i?ve(t.useClass):t).prototype.ngOnDestroy;if(c){let u=e.destroyHooks||(e.destroyHooks=[]);if(!o&&t.multi){let l=u.indexOf(n);l===-1?u.push(n,[r,c]):u[l+1].push(r,c)}else u.push(n,c)}}}function Gp(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function Da(e,t,n,r){for(let o=n;o<r;o++)if(t[o]===e)return o;return-1}function JE(e,t,n,r){return vc(this.multi,[])}function XE(e,t,n,r){let o=this.multi,i;if(this.providerFactory){let s=this.providerFactory.componentProviders,a=rn(n,n[C],this.providerFactory.index,r);i=a.slice(0,s),vc(o,i);for(let c=s;c<a.length;c++)i.push(a[c])}else i=[],vc(o,i);return i}function vc(e,t){for(let n=0;n<e.length;n++){let r=e[n];t.push(r())}return t}function eC(e,t,n,r,o){let i=new nn(e,n,mt);return i.multi=[],i.index=t,i.componentProviders=0,Gp(i,o,r&&!n),i}function Zp(e,t=[]){return n=>{n.providersResolver=(r,o)=>KE(r,o?o(e):e,t)}}var tC=(()=>{let t=class t{constructor(r){this._injector=r,this.cachedInjectors=new Map}getOrCreateStandaloneInjector(r){if(!r.standalone)return null;if(!this.cachedInjectors.has(r)){let o=xf(!1,r.type),i=o.length>0?fu([o],this._injector,`Standalone[${r.type.name}]`):null;this.cachedInjectors.set(r,i)}return this.cachedInjectors.get(r)}ngOnDestroy(){try{for(let r of this.cachedInjectors.values())r!==null&&r.destroy()}finally{this.cachedInjectors.clear()}}};t.\u0275prov=D({token:t,providedIn:"environment",factory:()=>new t(F(Ae))});let e=t;return e})();function H(e){tt("NgStandalone"),e.getStandaloneInjector=t=>t.get(tC).getOrCreateStandaloneInjector(e)}function Yp(e,t,n){let r=Yf()+e,o=k();return o[r]===Oe?Pp(o,r,n?t.call(n):t()):iE(o,r)}function os(e,t,n,r){return rC(k(),Yf(),e,t,n,r)}function nC(e,t){let n=e[t];return n===Oe?void 0:n}function rC(e,t,n,r,o,i){let s=t+n;return pt(e,s,o)?Pp(e,s+1,i?r.call(i,o):r(o)):nC(e,s+1)}var is=(()=>{let t=class t{log(r){console.log(r)}warn(r){console.warn(r)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"platform"});let e=t;return e})();var Qp=new x("");function Zr(e){return!!e&&typeof e.then=="function"}function Kp(e){return!!e&&typeof e.subscribe=="function"}var Jp=new x(""),Xp=(()=>{let t=class t{constructor(){this.initialized=!1,this.done=!1,this.donePromise=new Promise((r,o)=>{this.resolve=r,this.reject=o}),this.appInits=p(Jp,{optional:!0})??[]}runInitializers(){if(this.initialized)return;let r=[];for(let i of this.appInits){let s=i();if(Zr(s))r.push(s);else if(Kp(s)){let a=new Promise((c,u)=>{s.subscribe({complete:c,error:u})});r.push(a)}}let o=()=>{this.done=!0,this.resolve()};Promise.all(r).then(()=>{o()}).catch(i=>{this.reject(i)}),r.length===0&&o(),this.initialized=!0}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),rr=new x("");function oC(){Bl(()=>{throw new y(600,!1)})}function iC(e){return e.isBoundToModule}var sC=10;function aC(e,t,n){try{let r=n();return Zr(r)?r.catch(o=>{throw t.runOutsideAngular(()=>e.handleError(o)),o}):r}catch(r){throw t.runOutsideAngular(()=>e.handleError(r)),r}}var Tt=(()=>{let t=class t{constructor(){this._bootstrapListeners=[],this._runningTick=!1,this._destroyed=!1,this._destroyListeners=[],this._views=[],this.internalErrorHandler=p(mh),this.afterRenderEffectManager=p(cu),this.zonelessEnabled=p(Sp),this.externalTestViews=new Set,this.beforeRender=new he,this.afterTick=new he,this.componentTypes=[],this.components=[],this.isStable=p(Bt).hasPendingTasks.pipe(R(r=>!r)),this._injector=p(Ae)}get allViews(){return[...this.externalTestViews.keys(),...this._views]}get destroyed(){return this._destroyed}get injector(){return this._injector}bootstrap(r,o){let i=r instanceof Ti;if(!this._injector.get(Xp).done){let h=!i&&Cf(r),g=!1;throw new y(405,g)}let a;i?a=r:a=this._injector.get(qn).resolveComponentFactory(r),this.componentTypes.push(a.componentType);let c=iC(a)?void 0:this._injector.get(Lt),u=o||a.selector,l=a.create($e.NULL,[],u,c),d=l.location.nativeElement,f=l.injector.get(Qp,null);return f?.registerApplication(d),l.onDestroy(()=>{this.detachView(l.hostView),ba(this.components,l),f?.unregisterApplication(d)}),this._loadComponent(l),l}tick(){this._tick(!0)}_tick(r){if(this._runningTick)throw new y(101,!1);let o=P(null);try{this._runningTick=!0,this.detectChangesInAttachedViews(r)}catch(i){this.internalErrorHandler(i)}finally{this._runningTick=!1,P(o),this.afterTick.next()}}detectChangesInAttachedViews(r){let o=null;this._injector.destroyed||(o=this._injector.get(Wn,null,{optional:!0}));let i=0,s=this.afterRenderEffectManager;for(;i<sC;){let a=i===0;if(r||!a){this.beforeRender.next(a);for(let{_lView:c,notifyErrorHandler:u}of this._views)cC(c,u,a,this.zonelessEnabled)}else o?.begin?.(),o?.end?.();if(i++,s.executeInternalCallbacks(),!this.allViews.some(({_lView:c})=>Pr(c))&&(s.execute(),!this.allViews.some(({_lView:c})=>Pr(c))))break}}attachView(r){let o=r;this._views.push(o),o.attachToAppRef(this)}detachView(r){let o=r;ba(this._views,o),o.detachFromAppRef()}_loadComponent(r){this.attachView(r.hostView),this.tick(),this.components.push(r);let o=this._injector.get(rr,[]);[...this._bootstrapListeners,...o].forEach(i=>i(r))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(r=>r()),this._views.slice().forEach(r=>r.destroy())}finally{this._destroyed=!0,this._views=[],this._bootstrapListeners=[],this._destroyListeners=[]}}onDestroy(r){return this._destroyListeners.push(r),()=>ba(this._destroyListeners,r)}destroy(){if(this._destroyed)throw new y(406,!1);let r=this._injector;r.destroy&&!r.destroyed&&r.destroy()}get viewCount(){return this._views.length}warnIfDestroyed(){}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function ba(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}var ri;function yu(e){ri??=new WeakMap;let t=ri.get(e);if(t)return t;let n=e.isStable.pipe(Ge(r=>r)).toPromise().then(()=>{});return ri.set(e,n),e.onDestroy(()=>ri?.delete(e)),n}function cC(e,t,n,r){if(!n&&!Pr(e))return;yp(e,t,n&&!r?0:1)}var yc=class{constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Du=(()=>{let t=class t{compileModuleSync(r){return new sc(r)}compileModuleAsync(r){return Promise.resolve(this.compileModuleSync(r))}compileModuleAndAllComponentsSync(r){let o=this.compileModuleSync(r),i=If(r),s=Fh(i.declarations).reduce((a,c)=>{let u=Ft(c);return u&&a.push(new Gn(u)),a},[]);return new yc(o,s)}compileModuleAndAllComponentsAsync(r){return Promise.resolve(this.compileModuleAndAllComponentsSync(r))}clearCache(){}clearCacheFor(r){}getModuleId(r){}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var uC=(()=>{let t=class t{constructor(){this.zone=p(G),this.changeDetectionScheduler=p(zn),this.applicationRef=p(Tt)}initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{this.applicationRef.tick()})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function lC({ngZoneFactory:e,ignoreChangesOutsideZone:t}){return e??=()=>new G(fC()),[{provide:G,useFactory:e},{provide:Jt,multi:!0,useFactory:()=>{let n=p(uC,{optional:!0});return()=>n.initialize()}},{provide:Jt,multi:!0,useFactory:()=>{let n=p(hC);return()=>{n.initialize()}}},{provide:mh,useFactory:dC},t===!0?{provide:Mp,useValue:!0}:[]]}function dC(){let e=p(G),t=p(Je);return n=>e.runOutsideAngular(()=>t.handleError(n))}function fC(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var hC=(()=>{let t=class t{constructor(){this.subscription=new Y,this.initialized=!1,this.zone=p(G),this.pendingTasks=p(Bt)}initialize(){if(this.initialized)return;this.initialized=!0;let r=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(r=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{G.assertNotInAngularZone(),queueMicrotask(()=>{r!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(r),r=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{G.assertInAngularZone(),r??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var pC=(()=>{let t=class t{constructor(){this.appRef=p(Tt),this.taskService=p(Bt),this.ngZone=p(G),this.zonelessEnabled=p(Sp),this.disableScheduling=p(Mp,{optional:!0})??!1,this.zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run,this.schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}],this.subscriptions=new Y,this.cancelScheduledCallback=null,this.shouldRefreshViews=!1,this.useMicrotaskScheduler=!1,this.runningTick=!1,this.pendingRenderTaskId=null,this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Ga||!this.zoneIsDefined)}notify(r){if(!this.zonelessEnabled&&r===5)return;switch(r){case 3:case 2:case 0:case 4:case 5:case 1:{this.shouldRefreshViews=!0;break}case 8:case 7:case 6:case 9:default:}if(!this.shouldScheduleTick())return;let o=this.useMicrotaskScheduler?Hd:xp;this.pendingRenderTaskId=this.taskService.add(),this.zoneIsDefined?Zone.root.run(()=>{this.cancelScheduledCallback=o(()=>{this.tick(this.shouldRefreshViews)})}):this.cancelScheduledCallback=o(()=>{this.tick(this.shouldRefreshViews)})}shouldScheduleTick(){return!(this.disableScheduling||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&G.isInAngularZone())}tick(r){if(this.runningTick||this.appRef.destroyed)return;let o=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick(r)},void 0,this.schedulerTickApplyArgs)}catch(i){throw this.taskService.remove(o),i}finally{this.cleanup()}this.useMicrotaskScheduler=!0,Hd(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(o)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.shouldRefreshViews=!1,this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let r=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(r)}}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function gC(){return typeof $localize<"u"&&$localize.locale||ki}var bu=new x("",{providedIn:"root",factory:()=>p(bu,O.Optional|O.SkipSelf)||gC()});var eg=new x("");var li=null;function mC(e=[],t){return $e.create({name:t,providers:[{provide:Bi,useValue:"platform"},{provide:eg,useValue:new Set([()=>li=null])},...e]})}function vC(e=[]){if(li)return li;let t=mC(e);return li=t,oC(),yC(t),t}function yC(e){e.get(Hc,null)?.forEach(n=>n())}var or=(()=>{let t=class t{};t.__NG_ELEMENT_ID__=DC;let e=t;return e})();function DC(e){return bC(Ce(),k(),(e&16)===16)}function bC(e,t,n){if(Br(e)&&!n){let r=jt(e.index,t);return new sn(r,r)}else if(e.type&47){let r=t[ye];return new sn(r,t)}return null}function tg(e){try{let{rootComponent:t,appProviders:n,platformProviders:r}=e,o=vC(r),i=[lC({}),{provide:zn,useExisting:pC},...n||[]],a=new Ai({providers:i,parent:o,debugName:"",runEnvironmentInitializers:!1}).injector,c=a.get(G);return c.run(()=>{a.resolveInjectorInitializers();let u=a.get(Je,null),l;c.runOutsideAngular(()=>{l=c.onError.subscribe({next:h=>{u.handleError(h)}})});let d=()=>a.destroy(),f=o.get(eg);return f.add(d),a.onDestroy(()=>{l.unsubscribe(),f.delete(d)}),aC(u,c,()=>{let h=a.get(Xp);return h.runInitializers(),h.donePromise.then(()=>{let g=a.get(bu,ki);HE(g||ki);let v=a.get(Tt);return t!==void 0&&v.bootstrap(t),v})})})}catch(t){return Promise.reject(t)}}var tf=!1;function wC(){tf||(tf=!0,LD(),jE(),QE(),$E(),uE(),Gw(),Ew(),Cb())}function EC(e,t){return yu(e)}function ng(){return Yn([{provide:ei,useFactory:()=>{let e=!0;return Mr()&&(e=!!p(er,{optional:!0})?.get(Th,null)),e&&tt("NgHydration"),e}},{provide:Jt,useValue:()=>{gw(!1),Mr()&&p(ei)&&(CC(),wC())},multi:!0},{provide:Rh,useFactory:()=>Mr()&&p(ei)},{provide:rr,useFactory:()=>{if(Mr()&&p(ei)){let e=p(Tt),t=p($e);return()=>{EC(e,t).then(()=>{Dw(e)})}}return()=>{}},multi:!0}])}function CC(){let e=zi(),t;for(let n of e.body.childNodes)if(n.nodeType===Node.COMMENT_NODE&&n.textContent?.trim()===kD){t=n;break}if(!t)throw new y(-507,!1)}function Yr(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function X(e,t){tt("NgSignals");let n=Ll(e);return t?.equal&&(n[at].equal=t.equal),n}function ir(e){let t=P(null);try{return e()}finally{P(t)}}var IC=new x("",{providedIn:"root",factory:()=>p(SC)}),SC=(()=>{let t=class t{};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>new Dc});let e=t;return e})(),Dc=class{constructor(){this.queuedEffectCount=0,this.queues=new Map,this.pendingTasks=p(Bt),this.taskId=null}scheduleEffect(t){if(this.enqueue(t),this.taskId===null){let n=this.taskId=this.pendingTasks.add();queueMicrotask(()=>{this.flush(),this.pendingTasks.remove(n),this.taskId=null})}}enqueue(t){let n=t.creationZone;this.queues.has(n)||this.queues.set(n,new Set);let r=this.queues.get(n);r.has(t)||(this.queuedEffectCount++,r.add(t))}flush(){for(;this.queuedEffectCount>0;)for(let[t,n]of this.queues)t===null?this.flushQueue(n):t.run(()=>this.flushQueue(n))}flushQueue(t){for(let n of t)t.delete(n),this.queuedEffectCount--,n.run()}},bc=class{constructor(t,n,r,o,i,s){this.scheduler=t,this.effectFn=n,this.creationZone=r,this.injector=i,this.watcher=Hl(a=>this.runEffect(a),()=>this.schedule(),s),this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}runEffect(t){try{this.effectFn(t)}catch(n){this.injector.get(Je,null,{optional:!0})?.handleError(n)}}run(){this.watcher.run()}schedule(){this.scheduler.scheduleEffect(this)}destroy(){this.watcher.destroy(),this.unregisterOnDestroy?.()}};function $t(e,t){tt("NgSignals"),!t?.injector&&$i($t);let n=t?.injector??p($e),r=t?.manualCleanup!==!0?n.get(cn):null,o=new bc(n.get(IC),e,typeof Zone>"u"?null:Zone.current,r,n,t?.allowSignalWrites??!1),i=n.get(or,null,{optional:!0});return!i||!(i._lView[E]&8)?o.watcher.notify():(i._lView[ii]??=[]).push(o.watcher.notify),o}function rg(e){let t=Ft(e);if(!t)return null;let n=new Gn(t);return{get selector(){return n.selector},get type(){return n.componentType},get inputs(){return n.inputs},get outputs(){return n.outputs},get ngContentSelectors(){return n.ngContentSelectors},get isStandalone(){return t.standalone},get isSignal(){return t.signals}}}var ug=null;function sr(){return ug}function lg(e){ug??=e}var ss=class{};var Se=new x(""),dg=(()=>{let t=class t{historyGo(r){throw new Error("")}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(MC),providedIn:"platform"});let e=t;return e})();var MC=(()=>{let t=class t extends dg{constructor(){super(),this._doc=p(Se),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return sr().getBaseHref(this._doc)}onPopState(r){let o=sr().getGlobalEventTarget(this._doc,"window");return o.addEventListener("popstate",r,!1),()=>o.removeEventListener("popstate",r)}onHashChange(r){let o=sr().getGlobalEventTarget(this._doc,"window");return o.addEventListener("hashchange",r,!1),()=>o.removeEventListener("hashchange",r)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(r){this._location.pathname=r}pushState(r,o,i){this._history.pushState(r,o,i)}replaceState(r,o,i){this._history.replaceState(r,o,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(r=0){this._history.go(r)}getState(){return this._history.state}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>new t,providedIn:"platform"});let e=t;return e})();function fg(e,t){if(e.length==0)return t;if(t.length==0)return e;let n=0;return e.endsWith("/")&&n++,t.startsWith("/")&&n++,n==2?e+t.substring(1):n==1?e+t:e+"/"+t}function og(e){let t=e.match(/#|\?|$/),n=t&&t.index||e.length,r=n-(e[n-1]==="/"?1:0);return e.slice(0,r)+e.slice(n)}function dn(e){return e&&e[0]!=="?"?"?"+e:e}var ar=(()=>{let t=class t{historyGo(r){throw new Error("")}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(hg),providedIn:"root"});let e=t;return e})(),xC=new x(""),hg=(()=>{let t=class t extends ar{constructor(r,o){super(),this._platformLocation=r,this._removeListenerFns=[],this._baseHref=o??this._platformLocation.getBaseHrefFromDOM()??p(Se).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(r){this._removeListenerFns.push(this._platformLocation.onPopState(r),this._platformLocation.onHashChange(r))}getBaseHref(){return this._baseHref}prepareExternalUrl(r){return fg(this._baseHref,r)}path(r=!1){let o=this._platformLocation.pathname+dn(this._platformLocation.search),i=this._platformLocation.hash;return i&&r?`${o}${i}`:o}pushState(r,o,i,s){let a=this.prepareExternalUrl(i+dn(s));this._platformLocation.pushState(r,o,a)}replaceState(r,o,i,s){let a=this.prepareExternalUrl(i+dn(s));this._platformLocation.replaceState(r,o,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(r=0){this._platformLocation.historyGo?.(r)}};t.\u0275fac=function(o){return new(o||t)(F(dg),F(xC,8))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var Qr=(()=>{let t=class t{constructor(r){this._subject=new oe,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=r;let o=this._locationStrategy.getBaseHref();this._basePath=AC(og(ig(o))),this._locationStrategy.onPopState(i=>{this._subject.emit({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(r=!1){return this.normalize(this._locationStrategy.path(r))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(r,o=""){return this.path()==this.normalize(r+dn(o))}normalize(r){return t.stripTrailingSlash(_C(this._basePath,ig(r)))}prepareExternalUrl(r){return r&&r[0]!=="/"&&(r="/"+r),this._locationStrategy.prepareExternalUrl(r)}go(r,o="",i=null){this._locationStrategy.pushState(i,"",r,o),this._notifyUrlChangeListeners(this.prepareExternalUrl(r+dn(o)),i)}replaceState(r,o="",i=null){this._locationStrategy.replaceState(i,"",r,o),this._notifyUrlChangeListeners(this.prepareExternalUrl(r+dn(o)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(r=0){this._locationStrategy.historyGo?.(r)}onUrlChange(r){return this._urlChangeListeners.push(r),this._urlChangeSubscription??=this.subscribe(o=>{this._notifyUrlChangeListeners(o.url,o.state)}),()=>{let o=this._urlChangeListeners.indexOf(r);this._urlChangeListeners.splice(o,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(r="",o){this._urlChangeListeners.forEach(i=>i(r,o))}subscribe(r,o,i){return this._subject.subscribe({next:r,error:o,complete:i})}};t.normalizeQueryParams=dn,t.joinWithSlash=fg,t.stripTrailingSlash=og,t.\u0275fac=function(o){return new(o||t)(F(ar))},t.\u0275prov=D({token:t,factory:()=>TC(),providedIn:"root"});let e=t;return e})();function TC(){return new Qr(F(ar))}function _C(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function ig(e){return e.replace(/\/index.html$/,"")}function AC(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}function Iu(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let r=n.indexOf("="),[o,i]=r==-1?[n,""]:[n.slice(0,r),n.slice(r+1)];if(o.trim()===t)return decodeURIComponent(i)}return null}var Su="browser",NC="server";function RC(e){return e===Su}function Kr(e){return e===NC}var pg=(()=>{let t=class t{};t.\u0275prov=D({token:t,providedIn:"root",factory:()=>RC(p(et))?new Eu(p(Se),window):new Cu});let e=t;return e})(),Eu=class{constructor(t,n){this.document=t,this.window=n,this.offset=()=>[0,0]}setOffset(t){Array.isArray(t)?this.offset=()=>t:this.offset=t}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(t){this.window.scrollTo(t[0],t[1])}scrollToAnchor(t){let n=OC(this.document,t);n&&(this.scrollToElement(n),n.focus())}setHistoryScrollRestoration(t){this.window.history.scrollRestoration=t}scrollToElement(t){let n=t.getBoundingClientRect(),r=n.left+this.window.pageXOffset,o=n.top+this.window.pageYOffset,i=this.offset();this.window.scrollTo(r-i[0],o-i[1])}};function OC(e,t){let n=e.getElementById(t)||e.getElementsByName(t)[0];if(n)return n;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let r=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),o=r.currentNode;for(;o;){let i=o.shadowRoot;if(i){let s=i.getElementById(t)||i.querySelector(`[name="${t}"]`);if(s)return s}o=r.nextNode()}}return null}var Cu=class{setOffset(t){}getScrollPosition(){return[0,0]}scrollToPosition(t){}scrollToAnchor(t){}setHistoryScrollRestoration(t){}},as=class{};var us=class e{constructor(t){this.normalizedNames=new Map,this.lazyUpdate=null,t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(n=>{let r=n.indexOf(":");if(r>0){let o=n.slice(0,r),i=o.toLowerCase(),s=n.slice(r+1).trim();this.maybeSetNormalizedName(o,i),this.headers.has(i)?this.headers.get(i).push(s):this.headers.set(i,[s])}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((n,r)=>{this.setHeaderEntries(r,n)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([n,r])=>{this.setHeaderEntries(n,r)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let n=this.headers.get(t.toLowerCase());return n&&n.length>0?n[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,n){return this.clone({name:t,value:n,op:"a"})}set(t,n){return this.clone({name:t,value:n,op:"s"})}delete(t,n){return this.clone({name:t,value:n,op:"d"})}maybeSetNormalizedName(t,n){this.normalizedNames.has(n)||this.normalizedNames.set(n,t)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(n=>{this.headers.set(n,t.headers.get(n)),this.normalizedNames.set(n,t.normalizedNames.get(n))})}clone(t){let n=new e;return n.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,n.lazyUpdate=(this.lazyUpdate||[]).concat([t]),n}applyUpdate(t){let n=t.name.toLowerCase();switch(t.op){case"a":case"s":let r=t.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(t.name,n);let o=(t.op==="a"?this.headers.get(n):void 0)||[];o.push(...r),this.headers.set(n,o);break;case"d":let i=t.value;if(!i)this.headers.delete(n),this.normalizedNames.delete(n);else{let s=this.headers.get(n);if(!s)return;s=s.filter(a=>i.indexOf(a)===-1),s.length===0?(this.headers.delete(n),this.normalizedNames.delete(n)):this.headers.set(n,s)}break}}setHeaderEntries(t,n){let r=(Array.isArray(n)?n:[n]).map(i=>i.toString()),o=t.toLowerCase();this.headers.set(o,r),this.maybeSetNormalizedName(t,o)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(n=>t(this.normalizedNames.get(n),this.headers.get(n)))}};var Eg=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(Eg||{}),Mu=class{constructor(t,n=200,r="OK"){this.headers=t.headers||new us,this.status=t.status!==void 0?t.status:n,this.statusText=t.statusText||r,this.url=t.url||null,this.ok=this.status>=200&&this.status<300}};var ls=class e extends Mu{constructor(t={}){super(t),this.type=Eg.Response,this.body=t.body!==void 0?t.body:null}clone(t={}){return new e({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0})}};var kC=new x("");var FC=new x(""),gg="b",mg="h",vg="s",yg="st",Dg="u",bg="rt",cs=new x(""),LC=["GET","HEAD"];function jC(e,t){let h=p(cs),{isCacheActive:n}=h,r=xl(h,["isCacheActive"]),{transferCache:o,method:i}=e;if(!n||o===!1||i==="POST"&&!r.includePostRequests&&!o||i!=="POST"&&!LC.includes(i)||!r.includeRequestsWithAuthHeaders&&VC(e)||r.filter?.(e)===!1)return t(e);let s=p(er),a=p(FC,{optional:!0}),c=Kr(p(et));if(a&&!c)throw new y(2803,!1);let u=c&&a?HC(e.url,a):e.url,l=$C(e,u),d=s.get(l,null),f=r.includeHeaders;if(typeof o=="object"&&o.includeHeaders&&(f=o.includeHeaders),d){let{[gg]:g,[bg]:v,[mg]:I,[vg]:_,[yg]:ee,[Dg]:Z}=d,Me=g;switch(v){case"arraybuffer":Me=new TextEncoder().encode(g).buffer;break;case"blob":Me=new Blob([g]);break}let At=new us(I);return S(new ls({body:Me,headers:At,status:_,statusText:ee,url:Z}))}return t(e).pipe(re(g=>{g instanceof ls&&c&&s.set(l,{[gg]:g.body,[mg]:BC(g.headers,f),[vg]:g.status,[yg]:g.statusText,[Dg]:u,[bg]:e.responseType})}))}function VC(e){return e.headers.has("authorization")||e.headers.has("proxy-authorization")}function BC(e,t){if(!t)return{};let n={};for(let r of t){let o=e.getAll(r);o!==null&&(n[r]=o)}return n}function wg(e){return[...e.keys()].sort().map(t=>`${t}=${e.getAll(t)}`).join("&")}function $C(e,t){let{params:n,method:r,responseType:o}=e,i=wg(n),s=e.serializeBody();s instanceof URLSearchParams?s=wg(s):typeof s!="string"&&(s="");let a=[r,o,t,s,i].join("|"),c=UC(a);return c}function UC(e){let t=0;for(let n of e)t=Math.imul(31,t)+n.charCodeAt(0)<<0;return t+=2147483648,t.toString()}function Cg(e){return[{provide:cs,useFactory:()=>(tt("NgHttpTransferCache"),m({isCacheActive:!0},e))},{provide:kC,useValue:jC,multi:!0,deps:[er,cs]},{provide:rr,multi:!0,useFactory:()=>{let t=p(Tt),n=p(cs);return()=>{yu(t).then(()=>{n.isCacheActive=!1})}}}]}function HC(e,t){let n=new URL(e,"resolve://").origin,r=t[n];return r?e.replace(n,r):e}var _u=class extends ss{constructor(){super(...arguments),this.supportsDOMEvents=!0}},Au=class e extends _u{static makeCurrent(){lg(new e)}onAndCancel(t,n,r){return t.addEventListener(n,r),()=>{t.removeEventListener(n,r)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.parentNode&&t.parentNode.removeChild(t)}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=qC();return n==null?null:WC(n)}resetBaseElement(){Jr=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Iu(document.cookie,t)}},Jr=null;function qC(){return Jr=Jr||document.querySelector("base"),Jr?Jr.getAttribute("href"):null}function WC(e){return new URL(e,document.baseURI).pathname}var GC=(()=>{let t=class t{build(){return new XMLHttpRequest}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),Nu=new x(""),xg=(()=>{let t=class t{constructor(r,o){this._zone=o,this._eventNameToPlugin=new Map,r.forEach(i=>{i.manager=this}),this._plugins=r.slice().reverse()}addEventListener(r,o,i){return this._findPluginFor(o).addEventListener(r,o,i)}getZone(){return this._zone}_findPluginFor(r){let o=this._eventNameToPlugin.get(r);if(o)return o;if(o=this._plugins.find(s=>s.supports(r)),!o)throw new y(5101,!1);return this._eventNameToPlugin.set(r,o),o}};t.\u0275fac=function(o){return new(o||t)(F(Nu),F(G))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),ds=class{constructor(t){this._doc=t}},xu="ng-app-id",Tg=(()=>{let t=class t{constructor(r,o,i,s={}){this.doc=r,this.appId=o,this.nonce=i,this.platformId=s,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=Kr(s),this.resetHostNodes()}addStyles(r){for(let o of r)this.changeUsageCount(o,1)===1&&this.onStyleAdded(o)}removeStyles(r){for(let o of r)this.changeUsageCount(o,-1)<=0&&this.onStyleRemoved(o)}ngOnDestroy(){let r=this.styleNodesInDOM;r&&(r.forEach(o=>o.remove()),r.clear());for(let o of this.getAllStyles())this.onStyleRemoved(o);this.resetHostNodes()}addHost(r){this.hostNodes.add(r);for(let o of this.getAllStyles())this.addStyleToHost(r,o)}removeHost(r){this.hostNodes.delete(r)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(r){for(let o of this.hostNodes)this.addStyleToHost(o,r)}onStyleRemoved(r){let o=this.styleRef;o.get(r)?.elements?.forEach(i=>i.remove()),o.delete(r)}collectServerRenderedStyles(){let r=this.doc.head?.querySelectorAll(`style[${xu}="${this.appId}"]`);if(r?.length){let o=new Map;return r.forEach(i=>{i.textContent!=null&&o.set(i.textContent,i)}),o}return null}changeUsageCount(r,o){let i=this.styleRef;if(i.has(r)){let s=i.get(r);return s.usage+=o,s.usage}return i.set(r,{usage:o,elements:[]}),o}getStyleElement(r,o){let i=this.styleNodesInDOM,s=i?.get(o);if(s?.parentNode===r)return i.delete(o),s.removeAttribute(xu),s;{let a=this.doc.createElement("style");return this.nonce&&a.setAttribute("nonce",this.nonce),a.textContent=o,this.platformIsServer&&a.setAttribute(xu,this.appId),r.appendChild(a),a}}addStyleToHost(r,o){let i=this.getStyleElement(r,o),s=this.styleRef,a=s.get(o)?.elements;a?a.push(i):s.set(o,{elements:[i],usage:1})}resetHostNodes(){let r=this.hostNodes;r.clear(),r.add(this.doc.head)}};t.\u0275fac=function(o){return new(o||t)(F(Se),F(qi),F(zc,8),F(et))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),Tu={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Pu=/%COMP%/g,_g="%COMP%",ZC=`_nghost-${_g}`,YC=`_ngcontent-${_g}`,QC=!0,KC=new x("",{providedIn:"root",factory:()=>QC});function JC(e){return YC.replace(Pu,e)}function XC(e){return ZC.replace(Pu,e)}function Ag(e,t){return t.map(n=>n.replace(Pu,e))}var Ig=(()=>{let t=class t{constructor(r,o,i,s,a,c,u,l=null){this.eventManager=r,this.sharedStylesHost=o,this.appId=i,this.removeStylesOnCompDestroy=s,this.doc=a,this.platformId=c,this.ngZone=u,this.nonce=l,this.rendererByCompId=new Map,this.platformIsServer=Kr(c),this.defaultRenderer=new Xr(r,a,u,this.platformIsServer)}createRenderer(r,o){if(!r||!o)return this.defaultRenderer;this.platformIsServer&&o.encapsulation===ft.ShadowDom&&(o=z(m({},o),{encapsulation:ft.Emulated}));let i=this.getOrCreateRenderer(r,o);return i instanceof fs?i.applyToHost(r):i instanceof eo&&i.applyStyles(),i}getOrCreateRenderer(r,o){let i=this.rendererByCompId,s=i.get(o.id);if(!s){let a=this.doc,c=this.ngZone,u=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.platformIsServer;switch(o.encapsulation){case ft.Emulated:s=new fs(u,l,o,this.appId,d,a,c,f);break;case ft.ShadowDom:return new Ru(u,l,r,o,a,c,this.nonce,f);default:s=new eo(u,l,o,d,a,c,f);break}i.set(o.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}};t.\u0275fac=function(o){return new(o||t)(F(xg),F(Tg),F(qi),F(KC),F(Se),F(et),F(G),F(zc))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),Xr=class{constructor(t,n,r,o){this.eventManager=t,this.doc=n,this.ngZone=r,this.platformIsServer=o,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(t,n){return n?this.doc.createElementNS(Tu[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(Sg(t)?t.content:t).appendChild(n)}insertBefore(t,n,r){t&&(Sg(t)?t.content:t).insertBefore(n,r)}removeChild(t,n){t&&t.removeChild(n)}selectRootElement(t,n){let r=typeof t=="string"?this.doc.querySelector(t):t;if(!r)throw new y(-5104,!1);return n||(r.textContent=""),r}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,r,o){if(o){n=o+":"+n;let i=Tu[o];i?t.setAttributeNS(i,n,r):t.setAttribute(n,r)}else t.setAttribute(n,r)}removeAttribute(t,n,r){if(r){let o=Tu[r];o?t.removeAttributeNS(o,n):t.removeAttribute(`${r}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,r,o){o&(It.DashCase|It.Important)?t.style.setProperty(n,r,o&It.Important?"important":""):t.style[n]=r}removeStyle(t,n,r){r&It.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,r){t!=null&&(t[n]=r)}setValue(t,n){t.nodeValue=n}listen(t,n,r){if(typeof t=="string"&&(t=sr().getGlobalEventTarget(this.doc,t),!t))throw new Error(`Unsupported event target ${t} for event ${n}`);return this.eventManager.addEventListener(t,n,this.decoratePreventDefault(r))}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;(this.platformIsServer?this.ngZone.runGuarded(()=>t(n)):t(n))===!1&&n.preventDefault()}}};function Sg(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var Ru=class extends Xr{constructor(t,n,r,o,i,s,a,c){super(t,i,s,c),this.sharedStylesHost=n,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let u=Ag(o.id,o.styles);for(let l of u){let d=document.createElement("style");a&&d.setAttribute("nonce",a),d.textContent=l,this.shadowRoot.appendChild(d)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,r){return super.insertBefore(this.nodeOrShadowRoot(t),n,r)}removeChild(t,n){return super.removeChild(this.nodeOrShadowRoot(t),n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},eo=class extends Xr{constructor(t,n,r,o,i,s,a,c){super(t,i,s,a),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=o,this.styles=c?Ag(c,r.styles):r.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},fs=class extends eo{constructor(t,n,r,o,i,s,a,c){let u=o+"-"+r.id;super(t,n,r,i,s,a,c,u),this.contentAttr=JC(u),this.hostAttr=XC(u)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let r=super.createElement(t,n);return super.setAttribute(r,this.contentAttr,""),r}},eI=(()=>{let t=class t extends ds{constructor(r){super(r)}supports(r){return!0}addEventListener(r,o,i){return r.addEventListener(o,i,!1),()=>this.removeEventListener(r,o,i)}removeEventListener(r,o,i){return r.removeEventListener(o,i)}};t.\u0275fac=function(o){return new(o||t)(F(Se))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})(),Mg=["alt","control","meta","shift"],tI={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},nI={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},rI=(()=>{let t=class t extends ds{constructor(r){super(r)}supports(r){return t.parseEventName(r)!=null}addEventListener(r,o,i){let s=t.parseEventName(o),a=t.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>sr().onAndCancel(r,s.domEventName,a))}static parseEventName(r){let o=r.toLowerCase().split("."),i=o.shift();if(o.length===0||!(i==="keydown"||i==="keyup"))return null;let s=t._normalizeKey(o.pop()),a="",c=o.indexOf("code");if(c>-1&&(o.splice(c,1),a="code."),Mg.forEach(l=>{let d=o.indexOf(l);d>-1&&(o.splice(d,1),a+=l+".")}),a+=s,o.length!=0||s.length===0)return null;let u={};return u.domEventName=i,u.fullKey=a,u}static matchEventFullKeyCode(r,o){let i=tI[r.key]||r.key,s="";return o.indexOf("code.")>-1&&(i=r.code,s="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),Mg.forEach(a=>{if(a!==i){let c=nI[a];c(r)&&(s+=a+".")}}),s+=i,s===o)}static eventCallback(r,o,i){return s=>{t.matchEventFullKeyCode(s,r)&&i.runGuarded(()=>o(s))}}static _normalizeKey(r){return r==="esc"?"escape":r}};t.\u0275fac=function(o){return new(o||t)(F(Se))},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function Ng(e,t){return tg(m({rootComponent:e},oI(t)))}function oI(e){return{appProviders:[...uI,...e?.providers??[]],platformProviders:cI}}function iI(){Au.makeCurrent()}function sI(){return new Je}function aI(){return Ch(document),document}var cI=[{provide:et,useValue:Su},{provide:Hc,useValue:iI,multi:!0},{provide:Se,useFactory:aI,deps:[]}];var uI=[{provide:Bi,useValue:"root"},{provide:Je,useFactory:sI,deps:[]},{provide:Nu,useClass:eI,multi:!0,deps:[Se,G,et]},{provide:Nu,useClass:rI,multi:!0,deps:[Se]},Ig,Tg,xg,{provide:Wn,useExisting:Ig},{provide:as,useClass:GC,deps:[]},[]];var Rg=(()=>{let t=class t{constructor(r){this._doc=r}getTitle(){return this._doc.title}setTitle(r){this._doc.title=r||""}};t.\u0275fac=function(o){return new(o||t)(F(Se))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var Ou=function(e){return e[e.NoHttpTransferCache=0]="NoHttpTransferCache",e[e.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",e[e.I18nSupport=2]="I18nSupport",e[e.EventReplay=3]="EventReplay",e}(Ou||{});function Og(...e){let t=[],n=new Set,r=n.has(Ou.HttpTransferCacheOptions);for(let{\u0275providers:o,\u0275kind:i}of e)n.add(i),o.length&&t.push(o);return Yn([[],ng(),n.has(Ou.NoHttpTransferCache)||r?[]:Cg({}),t])}var A="primary",vo=Symbol("RouteTitle"),Vu=class{constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function hr(e){return new Vu(e)}function dI(e,t,n){let r=n.path.split("/");if(r.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||r.length<e.length))return null;let o={};for(let i=0;i<r.length;i++){let s=r[i],a=e[i];if(s[0]===":")o[s.substring(1)]=a;else if(s!==a.path)return null}return{consumed:e.slice(0,r.length),posParams:o}}function fI(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!Dt(e[n],t[n]))return!1;return!0}function Dt(e,t){let n=e?Bu(e):void 0,r=t?Bu(t):void 0;if(!n||!r||n.length!=r.length)return!1;let o;for(let i=0;i<n.length;i++)if(o=n[i],!Ug(e[o],t[o]))return!1;return!0}function Bu(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Ug(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),r=[...t].sort();return n.every((o,i)=>r[i]===o)}else return e===t}function Hg(e){return e.length>0?e[e.length-1]:null}function zt(e){return Js(e)?e:Zr(e)?Q(Promise.resolve(e)):S(e)}var hI={exact:qg,subset:Wg},zg={exact:pI,subset:gI,ignored:()=>!0};function Pg(e,t,n){return hI[n.paths](e.root,t.root,n.matrixParams)&&zg[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function pI(e,t){return Dt(e,t)}function qg(e,t,n){if(!hn(e.segments,t.segments)||!gs(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let r in t.children)if(!e.children[r]||!qg(e.children[r],t.children[r],n))return!1;return!0}function gI(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>Ug(e[n],t[n]))}function Wg(e,t,n){return Gg(e,t,t.segments,n)}function Gg(e,t,n,r){if(e.segments.length>n.length){let o=e.segments.slice(0,n.length);return!(!hn(o,n)||t.hasChildren()||!gs(o,n,r))}else if(e.segments.length===n.length){if(!hn(e.segments,n)||!gs(e.segments,n,r))return!1;for(let o in t.children)if(!e.children[o]||!Wg(e.children[o],t.children[o],r))return!1;return!0}else{let o=n.slice(0,e.segments.length),i=n.slice(e.segments.length);return!hn(e.segments,o)||!gs(e.segments,o,r)||!e.children[A]?!1:Gg(e.children[A],t,i,r)}}function gs(e,t,n){return t.every((r,o)=>zg[n](e[o].parameters,r.parameters))}var Ut=class{constructor(t=new B([],{}),n={},r=null){this.root=t,this.queryParams=n,this.fragment=r}get queryParamMap(){return this._queryParamMap??=hr(this.queryParams),this._queryParamMap}toString(){return yI.serialize(this)}},B=class{constructor(t,n){this.segments=t,this.children=n,this.parent=null,Object.values(n).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return ms(this)}},fn=class{constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=hr(this.parameters),this._parameterMap}toString(){return Yg(this)}};function mI(e,t){return hn(e,t)&&e.every((n,r)=>Dt(n.parameters,t[r].parameters))}function hn(e,t){return e.length!==t.length?!1:e.every((n,r)=>n.path===t[r].path)}function vI(e,t){let n=[];return Object.entries(e.children).forEach(([r,o])=>{r===A&&(n=n.concat(t(o,r)))}),Object.entries(e.children).forEach(([r,o])=>{r!==A&&(n=n.concat(t(o,r)))}),n}var _s=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>new ao,providedIn:"root"});let e=t;return e})(),ao=class{parse(t){let n=new Uu(t);return new Ut(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${to(t.root,!0)}`,r=wI(t.queryParams),o=typeof t.fragment=="string"?`#${DI(t.fragment)}`:"";return`${n}${r}${o}`}},yI=new ao;function ms(e){return e.segments.map(t=>Yg(t)).join("/")}function to(e,t){if(!e.hasChildren())return ms(e);if(t){let n=e.children[A]?to(e.children[A],!1):"",r=[];return Object.entries(e.children).forEach(([o,i])=>{o!==A&&r.push(`${o}:${to(i,!1)}`)}),r.length>0?`${n}(${r.join("//")})`:n}else{let n=vI(e,(r,o)=>o===A?[to(e.children[A],!1)]:[`${o}:${to(r,!1)}`]);return Object.keys(e.children).length===1&&e.children[A]!=null?`${ms(e)}/${n[0]}`:`${ms(e)}/(${n.join("//")})`}}function Zg(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function hs(e){return Zg(e).replace(/%3B/gi,";")}function DI(e){return encodeURI(e)}function $u(e){return Zg(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function vs(e){return decodeURIComponent(e)}function kg(e){return vs(e.replace(/\+/g,"%20"))}function Yg(e){return`${$u(e.path)}${bI(e.parameters)}`}function bI(e){return Object.entries(e).map(([t,n])=>`;${$u(t)}=${$u(n)}`).join("")}function wI(e){let t=Object.entries(e).map(([n,r])=>Array.isArray(r)?r.map(o=>`${hs(n)}=${hs(o)}`).join("&"):`${hs(n)}=${hs(r)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var EI=/^[^\/()?;#]+/;function ku(e){let t=e.match(EI);return t?t[0]:""}var CI=/^[^\/()?;=#]+/;function II(e){let t=e.match(CI);return t?t[0]:""}var SI=/^[^=?&#]+/;function MI(e){let t=e.match(SI);return t?t[0]:""}var xI=/^[^&#]+/;function TI(e){let t=e.match(xI);return t?t[0]:""}var Uu=class{constructor(t){this.url=t,this.remaining=t}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new B([],{}):new B([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1)),(t.length>0||Object.keys(n).length>0)&&(r[A]=new B(t,n)),r}parseSegment(){let t=ku(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new y(4009,!1);return this.capture(t),new fn(vs(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=II(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let o=ku(this.remaining);o&&(r=o,this.capture(r))}t[vs(n)]=vs(r)}parseQueryParam(t){let n=MI(this.remaining);if(!n)return;this.capture(n);let r="";if(this.consumeOptional("=")){let s=TI(this.remaining);s&&(r=s,this.capture(r))}let o=kg(n),i=kg(r);if(t.hasOwnProperty(o)){let s=t[o];Array.isArray(s)||(s=[s],t[o]=s),s.push(i)}else t[o]=i}parseParens(t){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=ku(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new y(4010,!1);let i;r.indexOf(":")>-1?(i=r.slice(0,r.indexOf(":")),this.capture(i),this.capture(":")):t&&(i=A);let s=this.parseChildren();n[i]=Object.keys(s).length===1?s[A]:new B([],s),this.consumeOptional("//")}return n}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new y(4011,!1)}};function Qg(e){return e.segments.length>0?new B([],{[A]:e}):e}function Kg(e){let t={};for(let[r,o]of Object.entries(e.children)){let i=Kg(o);if(r===A&&i.segments.length===0&&i.hasChildren())for(let[s,a]of Object.entries(i.children))t[s]=a;else(i.segments.length>0||i.hasChildren())&&(t[r]=i)}let n=new B(e.segments,t);return _I(n)}function _I(e){if(e.numberOfChildren===1&&e.children[A]){let t=e.children[A];return new B(e.segments.concat(t.segments),t.children)}return e}function co(e){return e instanceof Ut}function AI(e,t,n=null,r=null){let o=Jg(e);return Xg(o,t,n,r)}function Jg(e){let t;function n(i){let s={};for(let c of i.children){let u=n(c);s[c.outlet]=u}let a=new B(i.url,s);return i===e&&(t=a),a}let r=n(e.root),o=Qg(r);return t??o}function Xg(e,t,n,r){let o=e;for(;o.parent;)o=o.parent;if(t.length===0)return Fu(o,o,o,n,r);let i=NI(t);if(i.toRoot())return Fu(o,o,new B([],{}),n,r);let s=RI(i,o,e),a=s.processChildren?oo(s.segmentGroup,s.index,i.commands):tm(s.segmentGroup,s.index,i.commands);return Fu(o,s.segmentGroup,a,n,r)}function ys(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function uo(e){return typeof e=="object"&&e!=null&&e.outlets}function Fu(e,t,n,r,o){let i={};r&&Object.entries(r).forEach(([c,u])=>{i[c]=Array.isArray(u)?u.map(l=>`${l}`):`${u}`});let s;e===t?s=n:s=em(e,t,n);let a=Qg(Kg(s));return new Ut(a,i,o)}function em(e,t,n){let r={};return Object.entries(e.children).forEach(([o,i])=>{i===t?r[o]=n:r[o]=em(i,t,n)}),new B(e.segments,r)}var Ds=class{constructor(t,n,r){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=r,t&&r.length>0&&ys(r[0]))throw new y(4003,!1);let o=r.find(uo);if(o&&o!==Hg(r))throw new y(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function NI(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new Ds(!0,0,e);let t=0,n=!1,r=e.reduce((o,i,s)=>{if(typeof i=="object"&&i!=null){if(i.outlets){let a={};return Object.entries(i.outlets).forEach(([c,u])=>{a[c]=typeof u=="string"?u.split("/"):u}),[...o,{outlets:a}]}if(i.segmentPath)return[...o,i.segmentPath]}return typeof i!="string"?[...o,i]:s===0?(i.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?n=!0:a===".."?t++:a!=""&&o.push(a))}),o):[...o,i]},[]);return new Ds(n,t,r)}var lr=class{constructor(t,n,r){this.segmentGroup=t,this.processChildren=n,this.index=r}};function RI(e,t,n){if(e.isAbsolute)return new lr(t,!0,0);if(!n)return new lr(t,!1,NaN);if(n.parent===null)return new lr(n,!0,0);let r=ys(e.commands[0])?0:1,o=n.segments.length-1+r;return OI(n,o,e.numberOfDoubleDots)}function OI(e,t,n){let r=e,o=t,i=n;for(;i>o;){if(i-=o,r=r.parent,!r)throw new y(4005,!1);o=r.segments.length}return new lr(r,!1,o-i)}function PI(e){return uo(e[0])?e[0].outlets:{[A]:e}}function tm(e,t,n){if(e??=new B([],{}),e.segments.length===0&&e.hasChildren())return oo(e,t,n);let r=kI(e,t,n),o=n.slice(r.commandIndex);if(r.match&&r.pathIndex<e.segments.length){let i=new B(e.segments.slice(0,r.pathIndex),{});return i.children[A]=new B(e.segments.slice(r.pathIndex),e.children),oo(i,0,o)}else return r.match&&o.length===0?new B(e.segments,{}):r.match&&!e.hasChildren()?Hu(e,t,n):r.match?oo(e,0,o):Hu(e,t,n)}function oo(e,t,n){if(n.length===0)return new B(e.segments,{});{let r=PI(n),o={};if(Object.keys(r).some(i=>i!==A)&&e.children[A]&&e.numberOfChildren===1&&e.children[A].segments.length===0){let i=oo(e.children[A],t,n);return new B(e.segments,i.children)}return Object.entries(r).forEach(([i,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(o[i]=tm(e.children[i],t,s))}),Object.entries(e.children).forEach(([i,s])=>{r[i]===void 0&&(o[i]=s)}),new B(e.segments,o)}}function kI(e,t,n){let r=0,o=t,i={match:!1,pathIndex:0,commandIndex:0};for(;o<e.segments.length;){if(r>=n.length)return i;let s=e.segments[o],a=n[r];if(uo(a))break;let c=`${a}`,u=r<n.length-1?n[r+1]:null;if(o>0&&c===void 0)break;if(c&&u&&typeof u=="object"&&u.outlets===void 0){if(!Lg(c,u,s))return i;r+=2}else{if(!Lg(c,{},s))return i;r++}o++}return{match:!0,pathIndex:o,commandIndex:r}}function Hu(e,t,n){let r=e.segments.slice(0,t),o=0;for(;o<n.length;){let i=n[o];if(uo(i)){let c=FI(i.outlets);return new B(r,c)}if(o===0&&ys(n[0])){let c=e.segments[t];r.push(new fn(c.path,Fg(n[0]))),o++;continue}let s=uo(i)?i.outlets[A]:`${i}`,a=o<n.length-1?n[o+1]:null;s&&a&&ys(a)?(r.push(new fn(s,Fg(a))),o+=2):(r.push(new fn(s,{})),o++)}return new B(r,{})}function FI(e){let t={};return Object.entries(e).forEach(([n,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(t[n]=Hu(new B([],{}),0,r))}),t}function Fg(e){let t={};return Object.entries(e).forEach(([n,r])=>t[n]=`${r}`),t}function Lg(e,t,n){return e==n.path&&Dt(t,n.parameters)}var io="imperative",ue=function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e}(ue||{}),He=class{constructor(t,n){this.id=t,this.url=n}},pr=class extends He{constructor(t,n,r="imperative",o=null){super(t,n),this.type=ue.NavigationStart,this.navigationTrigger=r,this.restoredState=o}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},it=class extends He{constructor(t,n,r){super(t,n),this.urlAfterRedirects=r,this.type=ue.NavigationEnd}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Le=function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e}(Le||{}),bs=function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e}(bs||{}),_t=class extends He{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ue.NavigationCancel}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},Ht=class extends He{constructor(t,n,r,o){super(t,n),this.reason=r,this.code=o,this.type=ue.NavigationSkipped}},lo=class extends He{constructor(t,n,r,o){super(t,n),this.error=r,this.target=o,this.type=ue.NavigationError}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},ws=class extends He{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ue.RoutesRecognized}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},zu=class extends He{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ue.GuardsCheckStart}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},qu=class extends He{constructor(t,n,r,o,i){super(t,n),this.urlAfterRedirects=r,this.state=o,this.shouldActivate=i,this.type=ue.GuardsCheckEnd}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Wu=class extends He{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ue.ResolveStart}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Gu=class extends He{constructor(t,n,r,o){super(t,n),this.urlAfterRedirects=r,this.state=o,this.type=ue.ResolveEnd}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Zu=class{constructor(t){this.route=t,this.type=ue.RouteConfigLoadStart}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Yu=class{constructor(t){this.route=t,this.type=ue.RouteConfigLoadEnd}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},Qu=class{constructor(t){this.snapshot=t,this.type=ue.ChildActivationStart}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ku=class{constructor(t){this.snapshot=t,this.type=ue.ChildActivationEnd}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ju=class{constructor(t){this.snapshot=t,this.type=ue.ActivationStart}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Xu=class{constructor(t){this.snapshot=t,this.type=ue.ActivationEnd}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Es=class{constructor(t,n,r){this.routerEvent=t,this.position=n,this.anchor=r,this.type=ue.Scroll}toString(){let t=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${t}')`}},fo=class{},gr=class{constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};var el=class{constructor(t){this.injector=t,this.outlet=null,this.route=null,this.children=new As(this.injector),this.attachRef=null}},As=(()=>{let t=class t{constructor(r){this.parentInjector=r,this.contexts=new Map}onChildOutletCreated(r,o){let i=this.getOrCreateContext(r);i.outlet=o,this.contexts.set(r,i)}onChildOutletDestroyed(r){let o=this.getContext(r);o&&(o.outlet=null,o.attachRef=null)}onOutletDeactivated(){let r=this.contexts;return this.contexts=new Map,r}onOutletReAttached(r){this.contexts=r}getOrCreateContext(r){let o=this.getContext(r);return o||(o=new el(this.parentInjector),this.contexts.set(r,o)),o}getContext(r){return this.contexts.get(r)||null}};t.\u0275fac=function(o){return new(o||t)(F(Ae))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),Cs=class{constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=tl(t,this._root);return n?n.children.map(r=>r.value):[]}firstChild(t){let n=tl(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=nl(t,this._root);return n.length<2?[]:n[n.length-2].children.map(o=>o.value).filter(o=>o!==t)}pathFromRoot(t){return nl(t,this._root).map(n=>n.value)}};function tl(e,t){if(e===t.value)return t;for(let n of t.children){let r=tl(e,n);if(r)return r}return null}function nl(e,t){if(e===t.value)return[t];for(let n of t.children){let r=nl(e,n);if(r.length)return r.unshift(t),r}return[]}var Fe=class{constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function ur(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var Is=class extends Cs{constructor(t,n){super(t),this.snapshot=n,dl(this,t)}toString(){return this.snapshot.toString()}};function nm(e){let t=LI(e),n=new le([new fn("",{})]),r=new le({}),o=new le({}),i=new le({}),s=new le(""),a=new st(n,r,i,s,o,A,e,t.root);return a.snapshot=t.root,new Is(new Fe(a,[]),t)}function LI(e){let t={},n={},r={},o="",i=new dr([],t,r,o,n,A,e,null,{});return new Ms("",new Fe(i,[]))}var st=class{constructor(t,n,r,o,i,s,a,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=r,this.fragmentSubject=o,this.dataSubject=i,this.outlet=s,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(R(u=>u[vo]))??S(void 0),this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(R(t=>hr(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(R(t=>hr(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Ss(e,t,n="emptyOnly"){let r,{routeConfig:o}=e;return t!==null&&(n==="always"||o?.path===""||!t.component&&!t.routeConfig?.loadComponent)?r={params:m(m({},t.params),e.params),data:m(m({},t.data),e.data),resolve:m(m(m(m({},e.data),t.data),o?.data),e._resolvedData)}:r={params:m({},e.params),data:m({},e.data),resolve:m(m({},e.data),e._resolvedData??{})},o&&om(o)&&(r.resolve[vo]=o.title),r}var dr=class{get title(){return this.data?.[vo]}constructor(t,n,r,o,i,s,a,c,u){this.url=t,this.params=n,this.queryParams=r,this.fragment=o,this.data=i,this.outlet=s,this.component=a,this.routeConfig=c,this._resolve=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=hr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=hr(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(r=>r.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},Ms=class extends Cs{constructor(t,n){super(n),this.url=t,dl(this,n)}toString(){return rm(this._root)}};function dl(e,t){t.value._routerState=e,t.children.forEach(n=>dl(e,n))}function rm(e){let t=e.children.length>0?` { ${e.children.map(rm).join(", ")} } `:"";return`${e.value}${t}`}function Lu(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,Dt(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),Dt(t.params,n.params)||e.paramsSubject.next(n.params),fI(t.url,n.url)||e.urlSubject.next(n.url),Dt(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function rl(e,t){let n=Dt(e.params,t.params)&&mI(e.url,t.url),r=!e.parent!=!t.parent;return n&&!r&&(!e.parent||rl(e.parent,t.parent))}function om(e){return typeof e.title=="string"||e.title===null}var fl=(()=>{let t=class t{constructor(){this.activated=null,this._activatedRoute=null,this.name=A,this.activateEvents=new oe,this.deactivateEvents=new oe,this.attachEvents=new oe,this.detachEvents=new oe,this.parentContexts=p(As),this.location=p(nr),this.changeDetector=p(or),this.inputBinder=p(Ns,{optional:!0}),this.supportsBindingToComponentInputs=!0}get activatedComponentRef(){return this.activated}ngOnChanges(r){if(r.name){let{firstChange:o,previousValue:i}=r.name;if(o)return;this.isTrackedInParentContexts(i)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(i)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(r){return this.parentContexts.getContext(r)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let r=this.parentContexts.getContext(this.name);r?.route&&(r.attachRef?this.attach(r.attachRef,r.route):this.activateWith(r.route,r.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new y(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new y(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new y(4012,!1);this.location.detach();let r=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(r.instance),r}attach(r,o){this.activated=r,this._activatedRoute=o,this.location.insert(r.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(r.instance)}deactivate(){if(this.activated){let r=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(r)}}activateWith(r,o){if(this.isActivated)throw new y(4013,!1);this._activatedRoute=r;let i=this.location,a=r.snapshot.component,c=this.parentContexts.getOrCreateContext(this.name).children,u=new ol(r,c,i.injector);this.activated=i.createComponent(a,{index:i.length,injector:u,environmentInjector:o}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275dir=Vi({type:t,selectors:[["router-outlet"]],inputs:{name:"name"},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],standalone:!0,features:[$r]});let e=t;return e})(),ol=class e{__ngOutletInjector(t){return new e(this.route,this.childContexts,t)}constructor(t,n,r){this.route=t,this.childContexts=n,this.parent=r}get(t,n){return t===st?this.route:t===As?this.childContexts:this.parent.get(t,n)}},Ns=new x(""),jg=(()=>{let t=class t{constructor(){this.outletDataSubscriptions=new Map}bindActivatedRouteToOutletComponent(r){this.unsubscribeFromRouteData(r),this.subscribeToRouteData(r)}unsubscribeFromRouteData(r){this.outletDataSubscriptions.get(r)?.unsubscribe(),this.outletDataSubscriptions.delete(r)}subscribeToRouteData(r){let{activatedRoute:o}=r,i=Sr([o.queryParams,o.params,o.data]).pipe(_e(([s,a,c],u)=>(c=m(m(m({},s),a),c),u===0?S(c):Promise.resolve(c)))).subscribe(s=>{if(!r.isActivated||!r.activatedComponentRef||r.activatedRoute!==o||o.component===null){this.unsubscribeFromRouteData(r);return}let a=rg(o.component);if(!a){this.unsubscribeFromRouteData(r);return}for(let{templateName:c}of a.inputs)r.activatedComponentRef.setInput(c,s[c])});this.outletDataSubscriptions.set(r,i)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function jI(e,t,n){let r=ho(e,t._root,n?n._root:void 0);return new Is(r,t)}function ho(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let r=n.value;r._futureSnapshot=t.value;let o=VI(e,t,n);return new Fe(r,o)}else{if(e.shouldAttach(t.value)){let i=e.retrieve(t.value);if(i!==null){let s=i.route;return s.value._futureSnapshot=t.value,s.children=t.children.map(a=>ho(e,a)),s}}let r=BI(t.value),o=t.children.map(i=>ho(e,i));return new Fe(r,o)}}function VI(e,t,n){return t.children.map(r=>{for(let o of n.children)if(e.shouldReuseRoute(r.value,o.value.snapshot))return ho(e,r,o);return ho(e,r)})}function BI(e){return new st(new le(e.url),new le(e.params),new le(e.queryParams),new le(e.fragment),new le(e.data),e.outlet,e.component,e)}var po=class{constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},im="ngNavigationCancelingError";function xs(e,t){let{redirectTo:n,navigationBehaviorOptions:r}=co(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,o=sm(!1,Le.Redirect);return o.url=n,o.navigationBehaviorOptions=r,o}function sm(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[im]=!0,n.cancellationCode=t,n}function $I(e){return am(e)&&co(e.url)}function am(e){return!!e&&e[im]}var UI=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["ng-component"]],standalone:!0,features:[H],decls:1,vars:0,template:function(o,i){o&1&&Ue(0,"router-outlet")},dependencies:[fl],encapsulation:2});let e=t;return e})();function HI(e,t){return e.providers&&!e._injector&&(e._injector=fu(e.providers,t,`Route: ${e.path}`)),e._injector??t}function hl(e){let t=e.children&&e.children.map(hl),n=t?z(m({},e),{children:t}):m({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==A&&(n.component=UI),n}function ot(e){return e.outlet||A}function zI(e,t){let n=e.filter(r=>ot(r)===t);return n.push(...e.filter(r=>ot(r)!==t)),n}function yo(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let t=e.parent;t;t=t.parent){let n=t.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var qI=(e,t,n,r)=>R(o=>(new il(t,o.targetRouterState,o.currentRouterState,n,r).activate(e),o)),il=class{constructor(t,n,r,o,i){this.routeReuseStrategy=t,this.futureState=n,this.currState=r,this.forwardEvent=o,this.inputBindingEnabled=i}activate(t){let n=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,r,t),Lu(this.futureState.root),this.activateChildRoutes(n,r,t)}deactivateChildRoutes(t,n,r){let o=ur(n);t.children.forEach(i=>{let s=i.value.outlet;this.deactivateRoutes(i,o[s],r),delete o[s]}),Object.values(o).forEach(i=>{this.deactivateRouteAndItsChildren(i,r)})}deactivateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(o===i)if(o.component){let s=r.getContext(o.outlet);s&&this.deactivateChildRoutes(t,n,s.children)}else this.deactivateChildRoutes(t,n,r);else i&&this.deactivateRouteAndItsChildren(n,r)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=ur(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);if(r&&r.outlet){let s=r.outlet.detach(),a=r.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:s,route:t,contexts:a})}}deactivateRouteAndOutlet(t,n){let r=n.getContext(t.value.outlet),o=r&&t.value.component?r.children:n,i=ur(t);for(let s of Object.values(i))this.deactivateRouteAndItsChildren(s,o);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(t,n,r){let o=ur(n);t.children.forEach(i=>{this.activateRoutes(i,o[i.value.outlet],r),this.forwardEvent(new Xu(i.value.snapshot))}),t.children.length&&this.forwardEvent(new Ku(t.value.snapshot))}activateRoutes(t,n,r){let o=t.value,i=n?n.value:null;if(Lu(o),o===i)if(o.component){let s=r.getOrCreateContext(o.outlet);this.activateChildRoutes(t,n,s.children)}else this.activateChildRoutes(t,n,r);else if(o.component){let s=r.getOrCreateContext(o.outlet);if(this.routeReuseStrategy.shouldAttach(o.snapshot)){let a=this.routeReuseStrategy.retrieve(o.snapshot);this.routeReuseStrategy.store(o.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),Lu(a.route.value),this.activateChildRoutes(t,null,s.children)}else{let a=yo(o.snapshot);s.attachRef=null,s.route=o,s.injector=a??s.injector,s.outlet&&s.outlet.activateWith(o,s.injector),this.activateChildRoutes(t,null,s.children)}}else this.activateChildRoutes(t,null,r)}},Ts=class{constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},fr=class{constructor(t,n){this.component=t,this.route=n}};function WI(e,t,n){let r=e._root,o=t?t._root:null;return no(r,o,n,[r.value])}function GI(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function vr(e,t){let n=Symbol(),r=t.get(e,n);return r===n?typeof e=="function"&&!cf(e)?e:t.get(e):r}function no(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=ur(t);return e.children.forEach(s=>{ZI(s,i[s.value.outlet],n,r.concat([s.value]),o),delete i[s.value.outlet]}),Object.entries(i).forEach(([s,a])=>so(a,n.getContext(s),o)),o}function ZI(e,t,n,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=e.value,s=t?t.value:null,a=n?n.getContext(e.value.outlet):null;if(s&&i.routeConfig===s.routeConfig){let c=YI(s,i,i.routeConfig.runGuardsAndResolvers);c?o.canActivateChecks.push(new Ts(r)):(i.data=s.data,i._resolvedData=s._resolvedData),i.component?no(e,t,a?a.children:null,r,o):no(e,t,n,r,o),c&&a&&a.outlet&&a.outlet.isActivated&&o.canDeactivateChecks.push(new fr(a.outlet.component,s))}else s&&so(t,a,o),o.canActivateChecks.push(new Ts(r)),i.component?no(e,null,a?a.children:null,r,o):no(e,null,n,r,o);return o}function YI(e,t,n){if(typeof n=="function")return n(e,t);switch(n){case"pathParamsChange":return!hn(e.url,t.url);case"pathParamsOrQueryParamsChange":return!hn(e.url,t.url)||!Dt(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!rl(e,t)||!Dt(e.queryParams,t.queryParams);case"paramsChange":default:return!rl(e,t)}}function so(e,t,n){let r=ur(e),o=e.value;Object.entries(r).forEach(([i,s])=>{o.component?t?so(s,t.children.getContext(i),n):so(s,null,n):so(s,t,n)}),o.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new fr(t.outlet.component,o)):n.canDeactivateChecks.push(new fr(null,o)):n.canDeactivateChecks.push(new fr(null,o))}function Do(e){return typeof e=="function"}function QI(e){return typeof e=="boolean"}function KI(e){return e&&Do(e.canLoad)}function JI(e){return e&&Do(e.canActivate)}function XI(e){return e&&Do(e.canActivateChild)}function e0(e){return e&&Do(e.canDeactivate)}function t0(e){return e&&Do(e.canMatch)}function cm(e){return e instanceof bt||e?.name==="EmptyError"}var ps=Symbol("INITIAL_VALUE");function mr(){return _e(e=>Sr(e.map(t=>t.pipe(wt(1),ra(ps)))).pipe(R(t=>{for(let n of t)if(n!==!0){if(n===ps)return ps;if(n===!1||n0(n))return n}return!0}),me(t=>t!==ps),wt(1)))}function n0(e){return co(e)||e instanceof po}function r0(e,t){return ne(n=>{let{targetSnapshot:r,currentSnapshot:o,guards:{canActivateChecks:i,canDeactivateChecks:s}}=n;return s.length===0&&i.length===0?S(z(m({},n),{guardsResult:!0})):o0(s,r,o,e).pipe(ne(a=>a&&QI(a)?i0(r,i,e,t):S(a)),R(a=>z(m({},n),{guardsResult:a})))})}function o0(e,t,n,r){return Q(e).pipe(ne(o=>l0(o.component,o.route,n,t,r)),Ge(o=>o!==!0,!0))}function i0(e,t,n,r){return Q(t).pipe(Yt(o=>Mn(a0(o.route.parent,r),s0(o.route,r),u0(e,o.path,n),c0(e,o.route,n))),Ge(o=>o!==!0,!0))}function s0(e,t){return e!==null&&t&&t(new Ju(e)),S(!0)}function a0(e,t){return e!==null&&t&&t(new Qu(e)),S(!0)}function c0(e,t,n){let r=t.routeConfig?t.routeConfig.canActivate:null;if(!r||r.length===0)return S(!0);let o=r.map(i=>Jo(()=>{let s=yo(t)??n,a=vr(i,s),c=JI(a)?a.canActivate(t,e):Xe(s,()=>a(t,e));return zt(c).pipe(Ge())}));return S(o).pipe(mr())}function u0(e,t,n){let r=t[t.length-1],i=t.slice(0,t.length-1).reverse().map(s=>GI(s)).filter(s=>s!==null).map(s=>Jo(()=>{let a=s.guards.map(c=>{let u=yo(s.node)??n,l=vr(c,u),d=XI(l)?l.canActivateChild(r,e):Xe(u,()=>l(r,e));return zt(d).pipe(Ge())});return S(a).pipe(mr())}));return S(i).pipe(mr())}function l0(e,t,n,r,o){let i=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!i||i.length===0)return S(!0);let s=i.map(a=>{let c=yo(t)??o,u=vr(a,c),l=e0(u)?u.canDeactivate(e,t,n,r):Xe(c,()=>u(e,t,n,r));return zt(l).pipe(Ge())});return S(s).pipe(mr())}function d0(e,t,n,r){let o=t.canLoad;if(o===void 0||o.length===0)return S(!0);let i=o.map(s=>{let a=vr(s,e),c=KI(a)?a.canLoad(t,n):Xe(e,()=>a(t,n));return zt(c)});return S(i).pipe(mr(),um(r))}function um(e){return Zs(re(t=>{if(typeof t!="boolean")throw xs(e,t)}),R(t=>t===!0))}function f0(e,t,n,r){let o=t.canMatch;if(!o||o.length===0)return S(!0);let i=o.map(s=>{let a=vr(s,e),c=t0(a)?a.canMatch(t,n):Xe(e,()=>a(t,n));return zt(c)});return S(i).pipe(mr(),um(r))}var go=class{constructor(t){this.segmentGroup=t||null}},mo=class extends Error{constructor(t){super(),this.urlTree=t}};function cr(e){return Sn(new go(e))}function h0(e){return Sn(new y(4e3,!1))}function p0(e){return Sn(sm(!1,Le.GuardRejected))}var sl=class{constructor(t,n){this.urlSerializer=t,this.urlTree=n}lineralizeSegments(t,n){let r=[],o=n.root;for(;;){if(r=r.concat(o.segments),o.numberOfChildren===0)return S(r);if(o.numberOfChildren>1||!o.children[A])return h0(`${t.redirectTo}`);o=o.children[A]}}applyRedirectCommands(t,n,r,o,i){if(typeof n!="string"){let a=n,{queryParams:c,fragment:u,routeConfig:l,url:d,outlet:f,params:h,data:g,title:v}=o,I=Xe(i,()=>a({params:h,data:g,queryParams:c,fragment:u,routeConfig:l,url:d,outlet:f,title:v}));if(I instanceof Ut)throw new mo(I);n=I}let s=this.applyRedirectCreateUrlTree(n,this.urlSerializer.parse(n),t,r);if(n[0]==="/")throw new mo(s);return s}applyRedirectCreateUrlTree(t,n,r,o){let i=this.createSegmentGroup(t,n.root,r,o);return new Ut(i,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let r={};return Object.entries(t).forEach(([o,i])=>{if(typeof i=="string"&&i[0]===":"){let a=i.substring(1);r[o]=n[a]}else r[o]=i}),r}createSegmentGroup(t,n,r,o){let i=this.createSegments(t,n.segments,r,o),s={};return Object.entries(n.children).forEach(([a,c])=>{s[a]=this.createSegmentGroup(t,c,r,o)}),new B(i,s)}createSegments(t,n,r,o){return n.map(i=>i.path[0]===":"?this.findPosParam(t,i,o):this.findOrReturn(i,r))}findPosParam(t,n,r){let o=r[n.path.substring(1)];if(!o)throw new y(4001,!1);return o}findOrReturn(t,n){let r=0;for(let o of n){if(o.path===t.path)return n.splice(r),o;r++}return t}},al={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function g0(e,t,n,r,o){let i=pl(e,t,n);return i.matched?(r=HI(t,r),f0(r,t,n,o).pipe(R(s=>s===!0?i:m({},al)))):S(i)}function pl(e,t,n){if(t.path==="**")return m0(n);if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?m({},al):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let o=(t.matcher||dI)(n,e,t);if(!o)return m({},al);let i={};Object.entries(o.posParams??{}).forEach(([a,c])=>{i[a]=c.path});let s=o.consumed.length>0?m(m({},i),o.consumed[o.consumed.length-1].parameters):i;return{matched:!0,consumedSegments:o.consumed,remainingSegments:n.slice(o.consumed.length),parameters:s,positionalParamSegments:o.posParams??{}}}function m0(e){return{matched:!0,parameters:e.length>0?Hg(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function Vg(e,t,n,r){return n.length>0&&D0(e,n,r)?{segmentGroup:new B(t,y0(r,new B(n,e.children))),slicedSegments:[]}:n.length===0&&b0(e,n,r)?{segmentGroup:new B(e.segments,v0(e,n,r,e.children)),slicedSegments:n}:{segmentGroup:new B(e.segments,e.children),slicedSegments:n}}function v0(e,t,n,r){let o={};for(let i of n)if(Rs(e,t,i)&&!r[ot(i)]){let s=new B([],{});o[ot(i)]=s}return m(m({},r),o)}function y0(e,t){let n={};n[A]=t;for(let r of e)if(r.path===""&&ot(r)!==A){let o=new B([],{});n[ot(r)]=o}return n}function D0(e,t,n){return n.some(r=>Rs(e,t,r)&&ot(r)!==A)}function b0(e,t,n){return n.some(r=>Rs(e,t,r))}function Rs(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function w0(e,t,n,r){return ot(e)!==r&&(r===A||!Rs(t,n,e))?!1:pl(t,e,n).matched}function E0(e,t,n){return t.length===0&&!e.children[n]}var cl=class{};function C0(e,t,n,r,o,i,s="emptyOnly"){return new ul(e,t,n,r,o,s,i).recognize()}var I0=31,ul=class{constructor(t,n,r,o,i,s,a){this.injector=t,this.configLoader=n,this.rootComponentType=r,this.config=o,this.urlTree=i,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.applyRedirects=new sl(this.urlSerializer,this.urlTree),this.absoluteRedirectCount=0,this.allowRedirects=!0}noMatchError(t){return new y(4002,`'${t.segmentGroup}'`)}recognize(){let t=Vg(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(t).pipe(R(({children:n,rootSnapshot:r})=>{let o=new Fe(r,n),i=new Ms("",o),s=AI(r,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,i.url=this.urlSerializer.serialize(s),{state:i,tree:s}}))}match(t){let n=new dr([],Object.freeze({}),Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),A,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,t,A,n).pipe(R(r=>({children:r,rootSnapshot:n})),Rt(r=>{if(r instanceof mo)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof go?this.noMatchError(r):r}))}processSegmentGroup(t,n,r,o,i){return r.segments.length===0&&r.hasChildren()?this.processChildren(t,n,r,i):this.processSegment(t,n,r,r.segments,o,!0,i).pipe(R(s=>s instanceof Fe?[s]:[]))}processChildren(t,n,r,o){let i=[];for(let s of Object.keys(r.children))s==="primary"?i.unshift(s):i.push(s);return Q(i).pipe(Yt(s=>{let a=r.children[s],c=zI(n,s);return this.processSegmentGroup(t,c,a,s,o)}),na((s,a)=>(s.push(...a),s)),Ot(null),ta(),ne(s=>{if(s===null)return cr(r);let a=lm(s);return S0(a),S(a)}))}processSegment(t,n,r,o,i,s,a){return Q(n).pipe(Yt(c=>this.processSegmentAgainstRoute(c._injector??t,n,c,r,o,i,s,a).pipe(Rt(u=>{if(u instanceof go)return S(null);throw u}))),Ge(c=>!!c),Rt(c=>{if(cm(c))return E0(r,o,i)?S(new cl):cr(r);throw c}))}processSegmentAgainstRoute(t,n,r,o,i,s,a,c){return w0(r,o,i,s)?r.redirectTo===void 0?this.matchSegmentAgainstRoute(t,o,r,i,s,c):this.allowRedirects&&a?this.expandSegmentAgainstRouteUsingRedirect(t,o,n,r,i,s,c):cr(o):cr(o)}expandSegmentAgainstRouteUsingRedirect(t,n,r,o,i,s,a){let{matched:c,parameters:u,consumedSegments:l,positionalParamSegments:d,remainingSegments:f}=pl(n,o,i);if(!c)return cr(n);typeof o.redirectTo=="string"&&o.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>I0&&(this.allowRedirects=!1));let h=new dr(i,u,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Bg(o),ot(o),o.component??o._loadedComponent??null,o,$g(o)),g=Ss(h,a,this.paramsInheritanceStrategy);h.params=Object.freeze(g.params),h.data=Object.freeze(g.data);let v=this.applyRedirects.applyRedirectCommands(l,o.redirectTo,d,h,t);return this.applyRedirects.lineralizeSegments(o,v).pipe(ne(I=>this.processSegment(t,r,n,I.concat(f),s,!1,a)))}matchSegmentAgainstRoute(t,n,r,o,i,s){let a=g0(n,r,o,t,this.urlSerializer);return r.path==="**"&&(n.children={}),a.pipe(_e(c=>c.matched?(t=r._injector??t,this.getChildConfig(t,r,o).pipe(_e(({routes:u})=>{let l=r._loadedInjector??t,{parameters:d,consumedSegments:f,remainingSegments:h}=c,g=new dr(f,d,Object.freeze(m({},this.urlTree.queryParams)),this.urlTree.fragment,Bg(r),ot(r),r.component??r._loadedComponent??null,r,$g(r)),v=Ss(g,s,this.paramsInheritanceStrategy);g.params=Object.freeze(v.params),g.data=Object.freeze(v.data);let{segmentGroup:I,slicedSegments:_}=Vg(n,f,h,u);if(_.length===0&&I.hasChildren())return this.processChildren(l,u,I,g).pipe(R(Z=>new Fe(g,Z)));if(u.length===0&&_.length===0)return S(new Fe(g,[]));let ee=ot(r)===i;return this.processSegment(l,u,I,_,ee?A:i,!0,g).pipe(R(Z=>new Fe(g,Z instanceof Fe?[Z]:[])))}))):cr(n)))}getChildConfig(t,n,r){return n.children?S({routes:n.children,injector:t}):n.loadChildren?n._loadedRoutes!==void 0?S({routes:n._loadedRoutes,injector:n._loadedInjector}):d0(t,n,r,this.urlSerializer).pipe(ne(o=>o?this.configLoader.loadChildren(t,n).pipe(re(i=>{n._loadedRoutes=i.routes,n._loadedInjector=i.injector})):p0(n))):S({routes:[],injector:t})}};function S0(e){e.sort((t,n)=>t.value.outlet===A?-1:n.value.outlet===A?1:t.value.outlet.localeCompare(n.value.outlet))}function M0(e){let t=e.value.routeConfig;return t&&t.path===""}function lm(e){let t=[],n=new Set;for(let r of e){if(!M0(r)){t.push(r);continue}let o=t.find(i=>r.value.routeConfig===i.value.routeConfig);o!==void 0?(o.children.push(...r.children),n.add(o)):t.push(r)}for(let r of n){let o=lm(r.children);t.push(new Fe(r.value,o))}return t.filter(r=>!n.has(r))}function Bg(e){return e.data||{}}function $g(e){return e.resolve||{}}function x0(e,t,n,r,o,i){return ne(s=>C0(e,t,n,r,s.extractedUrl,o,i).pipe(R(({state:a,tree:c})=>z(m({},s),{targetSnapshot:a,urlAfterRedirects:c}))))}function T0(e,t){return ne(n=>{let{targetSnapshot:r,guards:{canActivateChecks:o}}=n;if(!o.length)return S(n);let i=new Set(o.map(c=>c.route)),s=new Set;for(let c of i)if(!s.has(c))for(let u of dm(c))s.add(u);let a=0;return Q(s).pipe(Yt(c=>i.has(c)?_0(c,r,e,t):(c.data=Ss(c,c.parent,e).resolve,S(void 0))),re(()=>a++),Tn(1),ne(c=>a===s.size?S(n):Te))})}function dm(e){let t=e.children.map(n=>dm(n)).flat();return[e,...t]}function _0(e,t,n,r){let o=e.routeConfig,i=e._resolve;return o?.title!==void 0&&!om(o)&&(i[vo]=o.title),A0(i,e,t,r).pipe(R(s=>(e._resolvedData=s,e.data=Ss(e,e.parent,n).resolve,null)))}function A0(e,t,n,r){let o=Bu(e);if(o.length===0)return S({});let i={};return Q(o).pipe(ne(s=>N0(e[s],t,n,r).pipe(Ge(),re(a=>{if(a instanceof po)throw xs(new ao,a);i[s]=a}))),Tn(1),ea(i),Rt(s=>cm(s)?Te:Sn(s)))}function N0(e,t,n,r){let o=yo(t)??r,i=vr(e,o),s=i.resolve?i.resolve(t,n):Xe(o,()=>i(t,n));return zt(s)}function ju(e){return _e(t=>{let n=e(t);return n?Q(n).pipe(R(()=>t)):S(t)})}var fm=(()=>{let t=class t{buildTitle(r){let o,i=r.root;for(;i!==void 0;)o=this.getResolvedTitleForRoute(i)??o,i=i.children.find(s=>s.outlet===A);return o}getResolvedTitleForRoute(r){return r.data[vo]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(R0),providedIn:"root"});let e=t;return e})(),R0=(()=>{let t=class t extends fm{constructor(r){super(),this.title=r}updateTitle(r){let o=this.buildTitle(r);o!==void 0&&this.title.setTitle(o)}};t.\u0275fac=function(o){return new(o||t)(F(Rg))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),gl=new x("",{providedIn:"root",factory:()=>({})}),ml=new x(""),O0=(()=>{let t=class t{constructor(){this.componentLoaders=new WeakMap,this.childrenLoaders=new WeakMap,this.compiler=p(Du)}loadComponent(r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return S(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let o=zt(r.loadComponent()).pipe(R(hm),re(s=>{this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=s}),xn(()=>{this.componentLoaders.delete(r)})),i=new In(o,()=>new he).pipe(Cn());return this.componentLoaders.set(r,i),i}loadChildren(r,o){if(this.childrenLoaders.get(o))return this.childrenLoaders.get(o);if(o._loadedRoutes)return S({routes:o._loadedRoutes,injector:o._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(o);let s=P0(o,this.compiler,r,this.onLoadEndListener).pipe(xn(()=>{this.childrenLoaders.delete(o)})),a=new In(s,()=>new he).pipe(Cn());return this.childrenLoaders.set(o,a),a}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function P0(e,t,n,r){return zt(e.loadChildren()).pipe(R(hm),ne(o=>o instanceof Lr||Array.isArray(o)?S(o):Q(t.compileModuleAsync(o))),R(o=>{r&&r(e);let i,s,a=!1;return Array.isArray(o)?(s=o,a=!0):(i=o.create(n).injector,s=i.get(ml,[],{optional:!0,self:!0}).flat()),{routes:s.map(hl),injector:i}}))}function k0(e){return e&&typeof e=="object"&&"default"in e}function hm(e){return k0(e)?e.default:e}var vl=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(F0),providedIn:"root"});let e=t;return e})(),F0=(()=>{let t=class t{shouldProcessUrl(r){return!0}extract(r){return r}merge(r,o){return r}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),L0=new x("");var j0=new x(""),pm=(()=>{let t=class t{get hasRequestedNavigation(){return this.navigationId!==0}constructor(){this.currentNavigation=null,this.currentTransition=null,this.lastSuccessfulNavigation=null,this.events=new he,this.transitionAbortSubject=new he,this.configLoader=p(O0),this.environmentInjector=p(Ae),this.urlSerializer=p(_s),this.rootContexts=p(As),this.location=p(Qr),this.inputBindingEnabled=p(Ns,{optional:!0})!==null,this.titleStrategy=p(fm),this.options=p(gl,{optional:!0})||{},this.paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly",this.urlHandlingStrategy=p(vl),this.createViewTransition=p(L0,{optional:!0}),this.navigationErrorHandler=p(j0,{optional:!0}),this.navigationId=0,this.afterPreactivation=()=>S(void 0),this.rootComponentType=null;let r=i=>this.events.next(new Zu(i)),o=i=>this.events.next(new Yu(i));this.configLoader.onLoadEndListener=o,this.configLoader.onLoadStartListener=r}complete(){this.transitions?.complete()}handleNavigationRequest(r){let o=++this.navigationId;this.transitions?.next(z(m(m({},this.transitions.value),r),{id:o}))}setupNavigations(r,o,i){return this.transitions=new le({id:0,currentUrlTree:o,currentRawUrl:o,extractedUrl:this.urlHandlingStrategy.extract(o),urlAfterRedirects:this.urlHandlingStrategy.extract(o),rawUrl:o,extras:{},resolve:()=>{},reject:()=>{},promise:Promise.resolve(!0),source:io,restoredState:null,currentSnapshot:i.snapshot,targetSnapshot:null,currentRouterState:i,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null}),this.transitions.pipe(me(s=>s.id!==0),R(s=>z(m({},s),{extractedUrl:this.urlHandlingStrategy.extract(s.rawUrl)})),_e(s=>{let a=!1,c=!1;return S(s).pipe(_e(u=>{if(this.navigationId>s.id)return this.cancelNavigationTransition(s,"",Le.SupersededByNewNavigation),Te;this.currentTransition=s,this.currentNavigation={id:u.id,initialUrl:u.rawUrl,extractedUrl:u.extractedUrl,trigger:u.source,extras:u.extras,previousNavigation:this.lastSuccessfulNavigation?z(m({},this.lastSuccessfulNavigation),{previousNavigation:null}):null};let l=!r.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),d=u.extras.onSameUrlNavigation??r.onSameUrlNavigation;if(!l&&d!=="reload"){let f="";return this.events.next(new Ht(u.id,this.urlSerializer.serialize(u.rawUrl),f,bs.IgnoredSameUrlNavigation)),u.resolve(!1),Te}if(this.urlHandlingStrategy.shouldProcessUrl(u.rawUrl))return S(u).pipe(_e(f=>{let h=this.transitions?.getValue();return this.events.next(new pr(f.id,this.urlSerializer.serialize(f.extractedUrl),f.source,f.restoredState)),h!==this.transitions?.getValue()?Te:Promise.resolve(f)}),x0(this.environmentInjector,this.configLoader,this.rootComponentType,r.config,this.urlSerializer,this.paramsInheritanceStrategy),re(f=>{s.targetSnapshot=f.targetSnapshot,s.urlAfterRedirects=f.urlAfterRedirects,this.currentNavigation=z(m({},this.currentNavigation),{finalUrl:f.urlAfterRedirects});let h=new ws(f.id,this.urlSerializer.serialize(f.extractedUrl),this.urlSerializer.serialize(f.urlAfterRedirects),f.targetSnapshot);this.events.next(h)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)){let{id:f,extractedUrl:h,source:g,restoredState:v,extras:I}=u,_=new pr(f,this.urlSerializer.serialize(h),g,v);this.events.next(_);let ee=nm(this.rootComponentType).snapshot;return this.currentTransition=s=z(m({},u),{targetSnapshot:ee,urlAfterRedirects:h,extras:z(m({},I),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.finalUrl=h,S(s)}else{let f="";return this.events.next(new Ht(u.id,this.urlSerializer.serialize(u.extractedUrl),f,bs.IgnoredByUrlHandlingStrategy)),u.resolve(!1),Te}}),re(u=>{let l=new zu(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot);this.events.next(l)}),R(u=>(this.currentTransition=s=z(m({},u),{guards:WI(u.targetSnapshot,u.currentSnapshot,this.rootContexts)}),s)),r0(this.environmentInjector,u=>this.events.next(u)),re(u=>{if(s.guardsResult=u.guardsResult,u.guardsResult&&typeof u.guardsResult!="boolean")throw xs(this.urlSerializer,u.guardsResult);let l=new qu(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects),u.targetSnapshot,!!u.guardsResult);this.events.next(l)}),me(u=>u.guardsResult?!0:(this.cancelNavigationTransition(u,"",Le.GuardRejected),!1)),ju(u=>{if(u.guards.canActivateChecks.length)return S(u).pipe(re(l=>{let d=new Wu(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(d)}),_e(l=>{let d=!1;return S(l).pipe(T0(this.paramsInheritanceStrategy,this.environmentInjector),re({next:()=>d=!0,complete:()=>{d||this.cancelNavigationTransition(l,"",Le.NoDataFromResolver)}}))}),re(l=>{let d=new Gu(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(d)}))}),ju(u=>{let l=d=>{let f=[];d.routeConfig?.loadComponent&&!d.routeConfig._loadedComponent&&f.push(this.configLoader.loadComponent(d.routeConfig).pipe(re(h=>{d.component=h}),R(()=>{})));for(let h of d.children)f.push(...l(h));return f};return Sr(l(u.targetSnapshot.root)).pipe(Ot(null),wt(1))}),ju(()=>this.afterPreactivation()),_e(()=>{let{currentSnapshot:u,targetSnapshot:l}=s,d=this.createViewTransition?.(this.environmentInjector,u.root,l.root);return d?Q(d).pipe(R(()=>s)):S(s)}),R(u=>{let l=jI(r.routeReuseStrategy,u.targetSnapshot,u.currentRouterState);return this.currentTransition=s=z(m({},u),{targetRouterState:l}),this.currentNavigation.targetRouterState=l,s}),re(()=>{this.events.next(new fo)}),qI(this.rootContexts,r.routeReuseStrategy,u=>this.events.next(u),this.inputBindingEnabled),wt(1),re({next:u=>{a=!0,this.lastSuccessfulNavigation=this.currentNavigation,this.events.next(new it(u.id,this.urlSerializer.serialize(u.extractedUrl),this.urlSerializer.serialize(u.urlAfterRedirects))),this.titleStrategy?.updateTitle(u.targetRouterState.snapshot),u.resolve(!0)},complete:()=>{a=!0}}),oa(this.transitionAbortSubject.pipe(re(u=>{throw u}))),xn(()=>{!a&&!c&&this.cancelNavigationTransition(s,"",Le.SupersededByNewNavigation),this.currentTransition?.id===s.id&&(this.currentNavigation=null,this.currentTransition=null)}),Rt(u=>{if(c=!0,am(u))this.events.next(new _t(s.id,this.urlSerializer.serialize(s.extractedUrl),u.message,u.cancellationCode)),$I(u)?this.events.next(new gr(u.url,u.navigationBehaviorOptions)):s.resolve(!1);else{let l=new lo(s.id,this.urlSerializer.serialize(s.extractedUrl),u,s.targetSnapshot??void 0);try{let d=Xe(this.environmentInjector,()=>this.navigationErrorHandler?.(l));if(d instanceof po){let{message:f,cancellationCode:h}=xs(this.urlSerializer,d);this.events.next(new _t(s.id,this.urlSerializer.serialize(s.extractedUrl),f,h)),this.events.next(new gr(d.redirectTo,d.navigationBehaviorOptions))}else{this.events.next(l);let f=r.errorHandler(u);s.resolve(!!f)}}catch(d){this.options.resolveNavigationPromiseOnError?s.resolve(!1):s.reject(d)}}return Te}))}))}cancelNavigationTransition(r,o,i){let s=new _t(r.id,this.urlSerializer.serialize(r.extractedUrl),o,i);this.events.next(s),r.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){return this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString()!==this.currentTransition?.extractedUrl.toString()&&!this.currentTransition?.extras.skipLocationChange}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function V0(e){return e!==io}var B0=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p($0),providedIn:"root"});let e=t;return e})(),ll=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}},$0=(()=>{let t=class t extends ll{};t.\u0275fac=(()=>{let r;return function(i){return(r||(r=$c(t)))(i||t)}})(),t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),gm=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:()=>p(U0),providedIn:"root"});let e=t;return e})(),U0=(()=>{let t=class t extends gm{constructor(){super(...arguments),this.location=p(Qr),this.urlSerializer=p(_s),this.options=p(gl,{optional:!0})||{},this.canceledNavigationResolution=this.options.canceledNavigationResolution||"replace",this.urlHandlingStrategy=p(vl),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.currentUrlTree=new Ut,this.rawUrlTree=this.currentUrlTree,this.currentPageId=0,this.lastSuccessfulId=-1,this.routerState=nm(null),this.stateMemento=this.createStateMemento()}getCurrentUrlTree(){return this.currentUrlTree}getRawUrlTree(){return this.rawUrlTree}restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}getRouterState(){return this.routerState}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}registerNonRouterCurrentEntryChangeListener(r){return this.location.subscribe(o=>{o.type==="popstate"&&r(o.url,o.state)})}handleRouterEvent(r,o){if(r instanceof pr)this.stateMemento=this.createStateMemento();else if(r instanceof Ht)this.rawUrlTree=o.initialUrl;else if(r instanceof ws){if(this.urlUpdateStrategy==="eager"&&!o.extras.skipLocationChange){let i=this.urlHandlingStrategy.merge(o.finalUrl,o.initialUrl);this.setBrowserUrl(i,o)}}else r instanceof fo?(this.currentUrlTree=o.finalUrl,this.rawUrlTree=this.urlHandlingStrategy.merge(o.finalUrl,o.initialUrl),this.routerState=o.targetRouterState,this.urlUpdateStrategy==="deferred"&&(o.extras.skipLocationChange||this.setBrowserUrl(this.rawUrlTree,o))):r instanceof _t&&(r.code===Le.GuardRejected||r.code===Le.NoDataFromResolver)?this.restoreHistory(o):r instanceof lo?this.restoreHistory(o,!0):r instanceof it&&(this.lastSuccessfulId=r.id,this.currentPageId=this.browserPageId)}setBrowserUrl(r,o){let i=this.urlSerializer.serialize(r);if(this.location.isCurrentPathEqualTo(i)||o.extras.replaceUrl){let s=this.browserPageId,a=m(m({},o.extras.state),this.generateNgRouterState(o.id,s));this.location.replaceState(i,"",a)}else{let s=m(m({},o.extras.state),this.generateNgRouterState(o.id,this.browserPageId+1));this.location.go(i,"",s)}}restoreHistory(r,o=!1){if(this.canceledNavigationResolution==="computed"){let i=this.browserPageId,s=this.currentPageId-i;s!==0?this.location.historyGo(s):this.currentUrlTree===r.finalUrl&&s===0&&(this.resetState(r),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(o&&this.resetState(r),this.resetUrlToCurrentUrlTree())}resetState(r){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,r.finalUrl??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(r,o){return this.canceledNavigationResolution==="computed"?{navigationId:r,\u0275routerPageId:o}:{navigationId:r}}};t.\u0275fac=(()=>{let r;return function(i){return(r||(r=$c(t)))(i||t)}})(),t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})(),ro=function(e){return e[e.COMPLETE=0]="COMPLETE",e[e.FAILED=1]="FAILED",e[e.REDIRECTING=2]="REDIRECTING",e}(ro||{});function H0(e,t){e.events.pipe(me(n=>n instanceof it||n instanceof _t||n instanceof lo||n instanceof Ht),R(n=>n instanceof it||n instanceof Ht?ro.COMPLETE:(n instanceof _t?n.code===Le.Redirect||n.code===Le.SupersededByNewNavigation:!1)?ro.REDIRECTING:ro.FAILED),me(n=>n!==ro.REDIRECTING),wt(1)).subscribe(()=>{t()})}function z0(e){throw e}var q0={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},W0={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},pn=(()=>{let t=class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}constructor(){this.disposed=!1,this.console=p(is),this.stateManager=p(gm),this.options=p(gl,{optional:!0})||{},this.pendingTasks=p(Bt),this.urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred",this.navigationTransitions=p(pm),this.urlSerializer=p(_s),this.location=p(Qr),this.urlHandlingStrategy=p(vl),this._events=new he,this.errorHandler=this.options.errorHandler||z0,this.navigated=!1,this.routeReuseStrategy=p(B0),this.onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore",this.config=p(ml,{optional:!0})?.flat()??[],this.componentInputBindingEnabled=!!p(Ns,{optional:!0}),this.eventsSubscription=new Y,this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this,this.currentUrlTree,this.routerState).subscribe({error:r=>{this.console.warn(r)}}),this.subscribeToNavigationEvents()}subscribeToNavigationEvents(){let r=this.navigationTransitions.events.subscribe(o=>{try{let i=this.navigationTransitions.currentTransition,s=this.navigationTransitions.currentNavigation;if(i!==null&&s!==null){if(this.stateManager.handleRouterEvent(o,s),o instanceof _t&&o.code!==Le.Redirect&&o.code!==Le.SupersededByNewNavigation)this.navigated=!0;else if(o instanceof it)this.navigated=!0;else if(o instanceof gr){let a=o.navigationBehaviorOptions,c=this.urlHandlingStrategy.merge(o.url,i.currentRawUrl),u=m({info:i.extras.info,skipLocationChange:i.extras.skipLocationChange,replaceUrl:i.extras.replaceUrl||this.urlUpdateStrategy==="eager"||V0(i.source)},a);this.scheduleNavigation(c,io,null,u,{resolve:i.resolve,reject:i.reject,promise:i.promise})}}Z0(o)&&this._events.next(o)}catch(i){this.navigationTransitions.transitionAbortSubject.next(i)}});this.eventsSubscription.add(r)}resetRootComponentType(r){this.routerState.root.component=r,this.navigationTransitions.rootComponentType=r}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),io,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((r,o)=>{setTimeout(()=>{this.navigateToSyncWithBrowser(r,"popstate",o)},0)})}navigateToSyncWithBrowser(r,o,i){let s={replaceUrl:!0},a=i?.navigationId?i:null;if(i){let u=m({},i);delete u.navigationId,delete u.\u0275routerPageId,Object.keys(u).length!==0&&(s.state=u)}let c=this.parseUrl(r);this.scheduleNavigation(c,o,a,s)}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return this.navigationTransitions.currentNavigation}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(r){this.config=r.map(hl),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(r,o={}){let{relativeTo:i,queryParams:s,fragment:a,queryParamsHandling:c,preserveFragment:u}=o,l=u?this.currentUrlTree.fragment:a,d=null;switch(c){case"merge":d=m(m({},this.currentUrlTree.queryParams),s);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=s||null}d!==null&&(d=this.removeEmptyProps(d));let f;try{let h=i?i.snapshot:this.routerState.snapshot.root;f=Jg(h)}catch{(typeof r[0]!="string"||r[0][0]!=="/")&&(r=[]),f=this.currentUrlTree.root}return Xg(f,r,d,l??null)}navigateByUrl(r,o={skipLocationChange:!1}){let i=co(r)?r:this.parseUrl(r),s=this.urlHandlingStrategy.merge(i,this.rawUrlTree);return this.scheduleNavigation(s,io,null,o)}navigate(r,o={skipLocationChange:!1}){return G0(r),this.navigateByUrl(this.createUrlTree(r,o),o)}serializeUrl(r){return this.urlSerializer.serialize(r)}parseUrl(r){try{return this.urlSerializer.parse(r)}catch{return this.urlSerializer.parse("/")}}isActive(r,o){let i;if(o===!0?i=m({},q0):o===!1?i=m({},W0):i=o,co(r))return Pg(this.currentUrlTree,r,i);let s=this.parseUrl(r);return Pg(this.currentUrlTree,s,i)}removeEmptyProps(r){return Object.entries(r).reduce((o,[i,s])=>(s!=null&&(o[i]=s),o),{})}scheduleNavigation(r,o,i,s,a){if(this.disposed)return Promise.resolve(!1);let c,u,l;a?(c=a.resolve,u=a.reject,l=a.promise):l=new Promise((f,h)=>{c=f,u=h});let d=this.pendingTasks.add();return H0(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:o,restoredState:i,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:r,extras:s,resolve:c,reject:u,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(f=>Promise.reject(f))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();function G0(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new y(4008,!1)}function Z0(e){return!(e instanceof fo)&&!(e instanceof gr)}var ze=(()=>{let t=class t{constructor(r,o,i,s,a,c){this.router=r,this.route=o,this.tabIndexAttribute=i,this.renderer=s,this.el=a,this.locationStrategy=c,this.href=null,this.commands=null,this.onChanges=new he,this.preserveFragment=!1,this.skipLocationChange=!1,this.replaceUrl=!1;let u=a.nativeElement.tagName?.toLowerCase();this.isAnchorElement=u==="a"||u==="area",this.isAnchorElement?this.subscription=r.events.subscribe(l=>{l instanceof it&&this.updateHref()}):this.setTabIndexIfNotOnNativeEl("0")}setTabIndexIfNotOnNativeEl(r){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",r)}ngOnChanges(r){this.isAnchorElement&&this.updateHref(),this.onChanges.next(this)}set routerLink(r){r!=null?(this.commands=Array.isArray(r)?r:[r],this.setTabIndexIfNotOnNativeEl("0")):(this.commands=null,this.setTabIndexIfNotOnNativeEl(null))}onClick(r,o,i,s,a){let c=this.urlTree;if(c===null||this.isAnchorElement&&(r!==0||o||i||s||a||typeof this.target=="string"&&this.target!="_self"))return!0;let u={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(c,u),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let r=this.urlTree;this.href=r!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(r)):null;let o=this.href===null?null:Ph(this.href,this.el.nativeElement.tagName.toLowerCase(),"href");this.applyAttributeValue("href",o)}applyAttributeValue(r,o){let i=this.renderer,s=this.el.nativeElement;o!==null?i.setAttribute(s,r,o):i.removeAttribute(s,r)}get urlTree(){return this.commands===null?null:this.router.createUrlTree(this.commands,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}};t.\u0275fac=function(o){return new(o||t)(mt(pn),mt(st),Uc("tabindex"),mt(ts),mt(Ie),mt(ar))},t.\u0275dir=Vi({type:t,selectors:[["","routerLink",""]],hostVars:1,hostBindings:function(o,i){o&1&&De("click",function(a){return i.onClick(a.button,a.ctrlKey,a.shiftKey,a.altKey,a.metaKey)}),o&2&&hu("target",i.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",Yr],skipLocationChange:[2,"skipLocationChange","skipLocationChange",Yr],replaceUrl:[2,"replaceUrl","replaceUrl",Yr],routerLink:"routerLink"},standalone:!0,features:[du,$r]});let e=t;return e})();var mm=new x(""),Y0=(()=>{let t=class t{constructor(r,o,i,s,a={}){this.urlSerializer=r,this.transitions=o,this.viewportScroller=i,this.zone=s,this.options=a,this.lastId=0,this.lastSource="imperative",this.restoredId=0,this.store={},this.environmentInjector=p(Ae),a.scrollPositionRestoration||="disabled",a.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(r=>{r instanceof pr?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=r.navigationTrigger,this.restoredId=r.restoredState?r.restoredState.navigationId:0):r instanceof it?(this.lastId=r.id,this.scheduleScrollEvent(r,this.urlSerializer.parse(r.urlAfterRedirects).fragment)):r instanceof Ht&&r.code===bs.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(r,this.urlSerializer.parse(r.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(r=>{r instanceof Es&&(r.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0]):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(r.position):r.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(r.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]))})}scheduleScrollEvent(r,o){this.zone.runOutsideAngular(()=>js(this,null,function*(){yield new Promise(i=>{setTimeout(()=>{i()}),un(()=>{i()},{injector:this.environmentInjector})}),this.zone.run(()=>{this.transitions.events.next(new Es(r,this.lastSource==="popstate"?this.store[this.restoredId]:null,o))})}))}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}};t.\u0275fac=function(o){Qh()},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();function vm(e,...t){return Yn([{provide:ml,multi:!0,useValue:e},[],{provide:st,useFactory:Q0,deps:[pn]},{provide:rr,multi:!0,useFactory:K0},t.map(n=>n.\u0275providers)])}function Q0(e){return e.routerState.root}function ym(e,t){return{\u0275kind:e,\u0275providers:t}}function Dm(e={}){return ym(4,[{provide:mm,useFactory:()=>{let n=p(pg),r=p(G),o=p(pm),i=p(_s);return new Y0(i,o,n,r,e)}}])}function K0(){let e=p($e);return t=>{let n=e.get(Tt);if(t!==n.components[0])return;let r=e.get(pn),o=e.get(J0);e.get(X0)===1&&r.initialNavigation(),e.get(eS,null,O.Optional)?.setUpPreloading(),e.get(mm,null,O.Optional)?.init(),r.resetRootComponentType(n.componentTypes[0]),o.closed||(o.next(),o.complete(),o.unsubscribe())}}var J0=new x("",{factory:()=>new he}),X0=new x("",{providedIn:"root",factory:()=>1});var eS=new x("");function bm(){return ym(8,[jg,{provide:Ns,useExisting:jg}])}var Os=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["ng-component"]],standalone:!0,features:[H],decls:8,vars:0,consts:[[1,"flex","flex-col","items-center","gap-16","pt-16"],[1,"flex","flex-col","gap-2"],[1,"text-4xl"],[1,"text-lg"],["routerLink","/",1,"p-3","font-bold","bg-black","text-white","rounded-lg","shadow-lg","hover:opacity-80"]],template:function(o,i){o&1&&(w(0,"div",0)(1,"div",1)(2,"p",2),V(3,"Page introuvable"),b(),w(4,"p",3),V(5," Ce contenu n\u2019existe pas ou n\u2019existe plus. Une erreur s\u2019est peut-\xEAtre gliss\xE9e dans l\u2019adresse que vous avez tap\xE9e. "),b()(),w(6,"a",4),V(7,"Page d'acceuil"),b()())},dependencies:[ze],encapsulation:2});let e=t;return e})();var tS=(e,t)=>t.id,nS=()=>["exercice"];function rS(e,t){if(e&1&&(w(0,"div")(1,"span",3),V(2),b(),V(3," \xA0 "),w(4,"span"),V(5),b()()),e&2){let n=t.$implicit;M(2),ce(n.value),M(3),ce(n.translationFr)}}var wm=(()=>{let t=class t{constructor(){this.router=p(pn),this.route=p(st),this.elementRef=p(Ie),this.wordsGroup=K.required(),un(()=>this.elementRef.nativeElement.focus())}handleKeyboardEvent(){this.router.navigate(["exercice"],{relativeTo:this.route})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["ng-component"]],hostAttrs:["tabIndex","-1",1,"outline-none"],hostBindings:function(o,i){o&1&&De("keydown.Enter",function(){return i.handleKeyboardEvent()})},inputs:{wordsGroup:[1,"wordsGroup"]},standalone:!0,features:[H],decls:6,vars:2,consts:[[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3","gap-3"],[1,"flex","justify-center","pt-10"],[1,"block","px-3","py-2","bg-black","text-white","rounded-md","shadow-lg","hover:opacity-80",3,"routerLink"],[1,"font-bold"]],template:function(o,i){o&1&&(w(0,"div",0),Pe(1,rS,6,2,"div",null,tS),b(),w(3,"div",1)(4,"a",2),V(5,"Exercice"),b()()),o&2&&(M(),ke(i.wordsGroup().words),M(3),J("routerLink",Yp(1,nS)))},dependencies:[ze],encapsulation:2});let e=t;return e})();var oS=["*"];function iS(e,t){e&1&&rs(0)}var Em=(()=>{let t=class t{constructor(){this.render=typeof window<"u"}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["app-client-side"]],standalone:!0,features:[H],ngContentSelectors:oS,decls:1,vars:1,template:function(o,i){o&1&&(ns(),nt(0,iS,1,0)),o&2&&rt(i.render?0:-1)},encapsulation:2});let e=t;return e})();var Cm=`hablar : parler
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
medroso : peureux, effrayant`;var Im=`diestro : droiter, adroit, habile
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
`;var Sm=`estancar : retenir, faire stagner
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
exito : succ\xE8s, gloire`;var Mm=`prisa : h\xE2te, empressement
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
agradar : plaire, appr\xE9cier`;var xm=`manazas : empot\xE9, avoir deux mains gauches
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
vulneracion : violacion
ponente : conf\xE9rencier, intervenant
cauto : prudent
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
indulto : gr\xE2ce
`;var Tm=`contra las cuerdas : dos au mur
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
`;function _m(e){let t=[...e];for(let n=t.length-1;n>0;n--){let r=Math.floor(Math.random()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}function Am(e,t){return e.reduce((n,r)=>{let o=t(r);return n[o]=[...n[o]??[],r],n},{})}var yl=40,Dl=[yr("LEVEL1A","Niveau 1a","niveau-1a",Dr(Cm)),yr("LEVEL1B","Niveau 1b","niveau-1b",Dr(Im)),yr("LEVEL2A","Niveau 2a","niveau-2a",Dr(Sm)),yr("LEVEL2B","Niveau 2b","niveau-2b",Dr(Mm)),yr("LEVEL2C","Niveau 2c","niveau-2c",Dr(xm)),yr("LEVEL3A","Niveau 3a","niveau-3a",Dr(Tm))];function bl(e,t,n=[]){let r=new Set,o=e.filter(a=>!n.includes(a.id)),i=Math.min(o.length,Math.round(t/2));for(;r.size<i;)r.add(o[Math.floor(Math.random()*o.length)].id);let s=Math.min(e.length,t);for(;r.size<s;)r.add(e[Math.floor(Math.random()*e.length)].id);return _m(e.filter(a=>r.has(a.id)))}function bo(e){return Dl.find(({pathParam:t})=>t===e)}function Ps(e,t){return bo(e)?.wordsGroups.find(({pathParam:n})=>n===t)}function yr(e,t,n,r){return{id:e,label:t,pathParam:n,nbWords:r.length,wordsGroups:fS(e,r)}}function fS(e,t){let n=t.length,r=Math.ceil(n/yl);return[...Array(r).keys()].map(o=>{let i=o*yl,s=Math.min(i+yl,n),a=o+1;return{id:`${e}_${a}`,pathParam:`${a}`,words:t.slice(i,s)}})}function Dr(e){return hS(e).split(`
`).filter(t=>!!t).map((t,n)=>{let[r,o]=t.split(" : ");return{id:n,value:r,translationFr:o}})}function hS(e){let t="data:text/plain;base64,";return e.startsWith(t)?atob(e.substring(t.length)):e}var pS=["WORDS_GROUP_COMPLETION"],wo=(()=>{let t=class t{constructor(r,o){this.type=r,this.id=o}toString(){return`${this.type}${t.DELIMITER}${this.id}`}static fromString(r){let[o,i]=r.split(t.DELIMITER);return o==null||i==null||!pS.includes(o)?null:new t(o,i)}};t.DELIMITER="--";let e=t;return e})();var Nm=(()=>{let t=class t{constructor(){this._storage=typeof localStorage<"u"?localStorage:null}read(r){return this._storage?.getItem(r.toString())??null}write(r,o){this._storage?.setItem(r.toString(),o)}remove(r){this._storage?.removeItem(r.toString())}getAllByType(r){return Object.entries(this._storage||{}).map(([o,i])=>[wo.fromString(o),i]).filter(o=>o[0]!=null).filter(([o])=>o.type===r)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var gS=[["LESS_THAN_TWO_DAYS",1728e5],["LESS_THAN_FOUR_DAYS",3456e5]];function wl(e){if(e==null||isNaN(+e))return"LONG_TIME_AGO_OR_NEVER";let n=new Date().getTime()-+e;return gS.find(([r,o])=>n<o)?.[0]??"LONG_TIME_AGO_OR_NEVER"}var qt=(()=>{let t=class t{constructor(){this._storageService=p(Nm),this.removeOldWordsGroupCompletion()}markAsCompleted(r){let o=new wo("WORDS_GROUP_COMPLETION",r.id);this._storageService.write(o,new Date().getTime().toString())}getCompletionAge(r){let o=new wo("WORDS_GROUP_COMPLETION",r.id),i=this._storageService.read(o);return wl(i)}removeOldWordsGroupCompletion(){this._storageService.getAllByType("WORDS_GROUP_COMPLETION").filter(([r,o])=>wl(o)==="LONG_TIME_AGO_OR_NEVER").forEach(([r])=>this._storageService.remove(r))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();var Eo=["preview","form"],El=Eo[0],Rm=10,gn=(()=>{let t=class t{constructor(){this._wordsGroupCompletionService=p(qt),this._wordsGroup=vt(void 0),this._wordsAvailable=X(()=>this._wordsGroup()?.words??[]),this._words=vt([]),this._wordIdsAnswered=vt([]),this._formValues=vt([]),this._formValuesValidities=X(()=>{let r=this.words();return this.formValues().map((o,i)=>o?.toLowerCase()===r[i].value.toLowerCase())}),this._stepIndex=X(()=>Eo.indexOf(this.step())),this._areAllWordsAvailableAnswered=X(()=>this.nbWordsAnswered()>=this.nbWordsAvailable()),this.lastInputFocusIndex=vt(0),this.step=vt(El),this.words=this._words.asReadonly(),this.formValues=this._formValues.asReadonly(),this.nbWordsAvailable=X(()=>this._wordsAvailable().length),this.nbWordsAnswered=X(()=>this._wordIdsAnswered().length),this.nbWords=X(()=>this._words().length),this.nbFormValues=X(()=>this._formValues().length),this.nbFormValuesValid=X(()=>this._formValuesValidities().filter(r=>r).length),this.isFormWin=X(()=>this._formValuesValidities().every(r=>r)),this.areAllWordsAnswered=X(()=>this.nbWordsAnswered()>=this.nbWordsAvailable()),$t(()=>{let r=this._wordsGroup();r&&this._areAllWordsAvailableAnswered()&&this._wordsGroupCompletionService.markAsCompleted(r)})}getFormValue(r){return this._formValues()[r]}setFormValue(r,o){this._formValues.set(this._formValues().map((i,s)=>r===s?o:i))}isFormValueValid(r){return this._formValuesValidities()[r]}reinit(r){this._wordsGroup.set(r??this._wordsGroup()),this._wordIdsAnswered.set([]),this._words.set(bl(this._wordsAvailable(),Rm)),this._formValues.set(this._words().map(o=>"")),this.lastInputFocusIndex.set(0),this.step.set(El)}nextExercice(){this._wordIdsAnswered.set(this.computeWordsIdAnswered()),this._words.set(bl(this._wordsAvailable(),Rm,this._wordIdsAnswered())),this._formValues.set(this._words().map(r=>"")),this.lastInputFocusIndex.set(0),this.step.set(El)}goToPreviousStep(){let r=this._stepIndex()-1;r>=0&&this.step.set(Eo[r])}goToNextStep(){let r=this._stepIndex()+1;r<Eo.length?this.step.set(Eo[r]):this.nextExercice()}computeWordsIdAnswered(){let r=this._words().filter((o,i)=>this.isFormValueValid(i)).map(o=>o.id);return[...new Set([...this._wordIdsAnswered(),...r])]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=D({token:t,factory:t.\u0275fac});let e=t;return e})();var mS=[[["","right",""]]],vS=["[right]"],ks=(()=>{let t=class t{constructor(){this.previousBtnText=K(""),this.nextBtnText=K(""),this.previousBtnDisabled=K(!1),this.nextBtnDisabled=K(!1),this.previousBtnClick=new oe,this.nextBtnClick=new oe}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["app-words-exercice-button-bar"]],inputs:{previousBtnText:[1,"previousBtnText"],nextBtnText:[1,"nextBtnText"],previousBtnDisabled:[1,"previousBtnDisabled"],nextBtnDisabled:[1,"nextBtnDisabled"]},outputs:{previousBtnClick:"previousBtnClick",nextBtnClick:"nextBtnClick"},standalone:!0,features:[H],ngContentSelectors:vS,decls:8,vars:8,consts:[[1,"flex","justify-center","gap-6","pt-6"],[1,"flex-1","flex","justify-end"],["type","button",3,"click","disabled"],[1,"flex-1","flex","gap-4"]],template:function(o,i){o&1&&(ns(mS),w(0,"div",0)(1,"div",1)(2,"button",2),De("click",function(){return i.previousBtnClick.emit()}),V(3),b()(),w(4,"div",3)(5,"button",2),De("click",function(){return i.nextBtnClick.emit()}),V(6),b(),rs(7),b()()),o&2&&(M(2),Mt("px-2 font-bold text-xl border border-black rounded-md shadow-lg hover:opacity-80 disabled:opacity-40"),J("disabled",i.previousBtnDisabled()),M(),xt(" ",i.previousBtnText()," "),M(2),Mt("px-2 font-bold text-xl border border-black bg-black text-white rounded-md shadow-lg hover:opacity-80 disabled:opacity-40"),J("disabled",i.nextBtnDisabled()),M(),xt(" ",i.nextBtnText()," "))},encapsulation:2});let e=t;return e})();function Fs(...e){let t=e.map(n=>n?.toLowerCase());return function(n,r){return function(...o){let s=o[0]?.target?.tagName?.toLowerCase();if(!t.includes(s))return n.call(this,...o)}}}var yS=(e,t)=>t.id,DS=e=>["../..",e];function bS(e,t){if(e&1&&(w(0,"span",3),V(1),b(),w(2,"span",4),V(3),b()),e&2){let n=t.$implicit;M(),ce(n.value),M(2),ce(n.translationFr)}}function wS(e,t){if(e&1&&(w(0,"a",5),V(1),b()),e&2){let n,r,o=yt();Mt("px-3 font-bold text-xl border border-black bg-black text-white rounded-md shadow-lg hover:opacity-80"),J("routerLink",os(4,DS,(n=o.nextWordsGroup())==null?null:n.pathParam)),M(),xt(" ",(r=o.nextWordsGroup())==null?null:r.pathParam," ")}}var Om=(()=>{var n;let e=[],t;return n=class{constructor(){this._elementRef=(Vo(this,e),p(Ie)),this.wordsExerciceService=p(gn),this.nextWordsGroup=K(),un(()=>this._elementRef.nativeElement.focus())}onEnter(){this.wordsExerciceService.goToNextStep()}},(()=>{let o=typeof Symbol=="function"&&Symbol.metadata?Object.create(null):void 0;t=[Fs("button")],jo(n,null,t,{kind:"method",name:"onEnter",static:!1,private:!1,access:{has:i=>"onEnter"in i,get:i=>i.onEnter},metadata:o},null,e),o&&Object.defineProperty(n,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})})(),n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=U({type:n,selectors:[["app-words-exercice-step-preview"]],hostAttrs:["tabIndex","-1",1,"outline-none"],hostBindings:function(i,s){i&1&&De("keydown.Enter",function(c){return s.onEnter(c)})},inputs:{nextWordsGroup:[1,"nextWordsGroup"]},standalone:!0,features:[H],decls:5,vars:1,consts:[[1,"grid","grid-cols-2","gap-4"],["previousBtnText","\u21BB","nextBtnText","\u2192",3,"previousBtnClick","nextBtnClick"],["right","",3,"routerLink","class"],[1,"justify-self-end","font-bold"],[1,"border-b","border-transparent"],["right","",3,"routerLink"]],template:function(i,s){i&1&&(w(0,"div",0),Pe(1,bS,4,2,null,null,yS),b(),w(3,"app-words-exercice-button-bar",1),De("previousBtnClick",function(){return s.wordsExerciceService.reinit()})("nextBtnClick",function(){return s.wordsExerciceService.goToNextStep()}),nt(4,wS,2,6,"a",2),b()),i&2&&(M(),ke(s.wordsExerciceService.words()),M(3),rt(s.wordsExerciceService.areAllWordsAnswered()&&s.nextWordsGroup()?4:-1))},dependencies:[ks,ze],encapsulation:2}),n})();var ES=["formInput"],CS=(e,t)=>t.id;function IS(e,t){e&1&&(w(0,"span",6),V(1,"\u2714"),b())}function SS(e,t){if(e&1){let n=zp();w(0,"span",3),V(1),b(),w(2,"div",4)(3,"input",5,0),De("input",function(o){let i=Rc(n).$index,s=yt();return Oc(s.onInput(i,o))})("focus",function(){let o=Rc(n).$index,i=yt();return Oc(i.wordsExerciceService.lastInputFocusIndex.set(o))}),b(),nt(5,IS,2,0,"span",6),b()}if(e&2){let n=t.$implicit,r=t.$index,o=yt();M(),ce(n.translationFr),M(2),Mt("flex-1 min-w-0 max-w-48 border-b border-black font-bold disabled:border-gray-400"),J("name","answer"+r)("value",o.wordsExerciceService.getFormValue(r))("disabled",o.wordsExerciceService.isFormValueValid(r)),M(2),rt(o.wordsExerciceService.isFormValueValid(r)?5:-1)}}var Pm=(()=>{var n;let e=[],t;return n=class{constructor(){this._elementRef=(Vo(this,e),p(Ie)),this.wordsExerciceService=p(gn),$t(()=>{let o=this.wordsExerciceService.nbFormValues();if(this.wordsExerciceService.nbFormValuesValid()>=o){this._elementRef?.nativeElement?.focus();return}ir(()=>{let a=this.wordsExerciceService.lastInputFocusIndex();for(let c=0;c<o;c++){let u=(a+c)%o;if(!this.wordsExerciceService.isFormValueValid(u)){this.inputs.get(u)?.nativeElement?.focus();return}}})})}onInput(o,i){let s=i.target.value;this.wordsExerciceService.setFormValue(o,s)}onEnter(){this.wordsExerciceService.isFormWin()?this.wordsExerciceService.goToNextStep():this.wordsExerciceService.goToPreviousStep()}},(()=>{let o=typeof Symbol=="function"&&Symbol.metadata?Object.create(null):void 0;t=[Fs("button")],jo(n,null,t,{kind:"method",name:"onEnter",static:!1,private:!1,access:{has:i=>"onEnter"in i,get:i=>i.onEnter},metadata:o},null,e),o&&Object.defineProperty(n,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})})(),n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=U({type:n,selectors:[["app-words-exercice-step-form"]],viewQuery:function(i,s){if(i&1&&qp(ES,5),i&2){let a;gu(a=mu())&&(s.inputs=a)}},hostAttrs:["tabIndex","-1",1,"outline-none"],hostBindings:function(i,s){i&1&&De("keydown.Enter",function(c){return s.onEnter(c)})},standalone:!0,features:[H],decls:4,vars:1,consts:[["formInput",""],[1,"grid","grid-cols-2","gap-4"],["previousBtnText","\u2190","nextBtnText","\u2714",3,"previousBtnClick","nextBtnClick","nextBtnDisabled"],[1,"justify-self-end"],[1,"flex","items-start"],["type","text","autocomplete","off","autocapitalize","off",3,"input","focus","name","value","disabled"],[1,"px-2","font-bold"]],template:function(i,s){i&1&&(w(0,"div",1),Pe(1,SS,6,7,null,null,CS),b(),w(3,"app-words-exercice-button-bar",2),De("previousBtnClick",function(){return s.wordsExerciceService.goToPreviousStep()})("nextBtnClick",function(){return s.wordsExerciceService.goToNextStep()}),b()),i&2&&(M(),ke(s.wordsExerciceService.words()),M(2),J("nextBtnDisabled",!s.wordsExerciceService.isFormWin()))},dependencies:[ks],encapsulation:2}),n})();var km=(()=>{let t=class t{constructor(){this.nbWordsAnswered=K.required(),this.nbWordsAvailable=K.required(),this.areAllWordsAnswered=K.required()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["app-words-exercice-header"]],inputs:{nbWordsAnswered:[1,"nbWordsAnswered"],nbWordsAvailable:[1,"nbWordsAvailable"],areAllWordsAnswered:[1,"areAllWordsAnswered"]},standalone:!0,features:[H],decls:3,vars:4,consts:[[1,"flex","justify-center","pb-4","gap-5"],[1,"py-1","px-2","text-gray-800"]],template:function(o,i){o&1&&(w(0,"div",0)(1,"span",1),V(2),b()()),o&2&&(M(),pu("font-bold",i.areAllWordsAnswered()),M(),vu(" ",i.nbWordsAnswered()," / ",i.nbWordsAvailable()," "))},encapsulation:2});let e=t;return e})();function MS(e,t){if(e&1&&Ue(0,"app-words-exercice-step-preview",1),e&2){let n=yt();J("nextWordsGroup",n.nextWordsGroup())}}function xS(e,t){e&1&&Ue(0,"app-words-exercice-step-form")}var Fm=(()=>{let t=class t{constructor(){this._wordsGroupCompletionService=p(qt),this.wordsExerciceService=p(gn),this.wordsCategory=K.required(),this.wordsGroup=K.required(),this.nextWordsGroup=X(()=>{let r=this.wordsCategory().wordsGroups,o=this.wordsGroup(),i=TS(r,o),s=Am(i,a=>this._wordsGroupCompletionService.getCompletionAge(a));return s.LONG_TIME_AGO_OR_NEVER?.[0]??s.LESS_THAN_FOUR_DAYS?.[0]}),$t(()=>{let r=this.wordsGroup();ir(()=>this.wordsExerciceService.reinit(r))})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["ng-component"]],hostAttrs:["tabIndex","-1"],inputs:{wordsCategory:[1,"wordsCategory"],wordsGroup:[1,"wordsGroup"]},standalone:!0,features:[Zp([gn]),H],decls:4,vars:5,consts:[[3,"nbWordsAnswered","nbWordsAvailable","areAllWordsAnswered"],[3,"nextWordsGroup"]],template:function(o,i){o&1&&(w(0,"app-client-side"),Ue(1,"app-words-exercice-header",0),nt(2,MS,1,1,"app-words-exercice-step-preview",1)(3,xS,1,0,"app-words-exercice-step-form"),b()),o&2&&(M(),J("nbWordsAnswered",i.wordsExerciceService.nbWordsAnswered())("nbWordsAvailable",i.wordsExerciceService.nbWordsAvailable())("areAllWordsAnswered",i.wordsExerciceService.areAllWordsAnswered()),M(),rt(i.wordsExerciceService.step()==="preview"?2:-1),M(),rt(i.wordsExerciceService.step()==="form"?3:-1))},dependencies:[Em,km,Om,Pm],encapsulation:2});let e=t;return e})();function TS(e,t){let n=e.length,r=e.filter(i=>i.id!==t.id),o=e.indexOf(t);return r.sort((i,s)=>{let a=e.indexOf(i),c=e.indexOf(s),u=(a-o+n)%n,l=(c-o+n)%n;return u-l}),r}function _S(e,t){if(e&1&&(w(0,"a",3)(1,"b"),V(2),b(),V(3),b()),e&2){let n=t.$implicit;J("routerLink",n.pathParam),M(2),ce(n.label),M(),xt(" (",n.nbWords,")")}}var Lm=(()=>{let t=class t{constructor(){this.wordsCategories=K.required(),this.nbWords=X(()=>this.wordsCategories().map(r=>r.nbWords).reduce((r,o)=>r+o,0))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["ng-component"]],inputs:{wordsCategories:[1,"wordsCategories"]},standalone:!0,features:[H],decls:7,vars:1,consts:[[1,"text-center","text-2xl"],[1,"font-bold","text-white","bg-black","px-1","rounded-md"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-10","items-center","pt-8"],[1,"py-12","text-lg","text-center","border","border-gray-400","rounded-t-md","shadow-md",3,"routerLink"]],template:function(o,i){o&1&&(w(0,"div",0)(1,"span",1),V(2),b(),V(3,` mots
`),b(),w(4,"div",2),Pe(5,_S,4,3,"a",3,ln),b()),o&2&&(M(2),ce(i.nbWords()),M(3),ke(i.wordsCategories()))},dependencies:[ze],encapsulation:2});let e=t;return e})();var AS=e=>[e];function NS(e,t){if(e&1&&(w(0,"span"),V(1),b()),e&2){let n=t.$implicit;M(),ce(n.value)}}function RS(e,t){if(e&1&&(w(0,"a",1)(1,"div",2)(2,"span",3),V(3),b(),w(4,"span",4),V(5),b()(),w(6,"div",5)(7,"div",6),Pe(8,NS,2,1,"span",null,ln),b()()()),e&2){let n=t.$implicit,r=t.$index,o=yt();J("routerLink",os(5,AS,n.pathParam)),M(),Mt(o.getHeaderClass(n.completionAge)),M(2),ce(r+1),M(2),ce(n.words.length),M(3),ke(n.words)}}var jm=(()=>{let t=class t{constructor(){this._wordsGroupCompletionService=p(qt),this.wordsCategory=K.required(),this.wordsGroups=X(()=>this.wordsCategory().wordsGroups.map(r=>z(m({},r),{completionAge:this._wordsGroupCompletionService.getCompletionAge(r)})))}getHeaderClass(r){return OS[r]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["ng-component"]],inputs:{wordsCategory:[1,"wordsCategory"]},standalone:!0,features:[H],decls:3,vars:0,consts:[[1,"flex","flex-col","gap-12"],[1,"border","border-gray-400","rounded-t-md","shadow-md",3,"routerLink"],[1,"flex","justify-between","items-center","px-5","py-1"],[1,"text-lg","font-bold"],[1,"text-sm"],[1,"p-3","pb-5","text-gray-950"],[1,"flex","flex-wrap","gap-x-4","gap-y-2"]],template:function(o,i){o&1&&(w(0,"div",0),Pe(1,RS,10,7,"a",1,ln),b()),o&2&&(M(),ke(i.wordsGroups()))},dependencies:[ze],encapsulation:2});let e=t;return e})(),OS={LESS_THAN_TWO_DAYS:"bg-black text-white bg-opacity-100",LESS_THAN_FOUR_DAYS:"bg-black text-white bg-opacity-60",LONG_TIME_AGO_OR_NEVER:""};var Vm=(e,t)=>{if(t.length===0)return!0;if(t.length===1){let n=t[0].path;return!!bo(n)}if(t.length>=2){let n=t[0].path,r=t[1].path;return!!Ps(n,r)}return!1};var Bm=e=>{let t=Um(e);return bo(t)},$m=e=>{let t=Um(e),n=PS(e);return Ps(t,n)};function Um(e){return e.paramMap.get("wordsCategory")}function PS(e){return e.paramMap.get("wordsGroup")}var Hm=[{path:"",canMatch:[Vm],providers:[qt],children:[{path:"",component:Lm,resolve:{wordsCategories:()=>Dl}},{path:":wordsCategory",resolve:{wordsCategory:Bm},children:[{path:"",component:jm},{path:":wordsGroup",resolve:{wordsGroup:$m},children:[{path:"",component:wm},{path:"exercice",component:Fm}]}]}]}];var zm=[...Hm,{path:"**",component:Os}];var qm={providers:[vm(zm,bm(),Dm({scrollPositionRestoration:"enabled"})),Og()]};function Cl(e,t){let n=!t?.manualCleanup;n&&!t?.injector&&$i(Cl);let r=n?t?.injector?.get(cn)??p(cn):null,o;t?.requireSync?o=vt({kind:0}):o=vt({kind:1,value:t?.initialValue});let i=e.subscribe({next:s=>o.set({kind:1,value:s}),error:s=>{if(t?.rejectErrors)throw s;o.set({kind:2,error:s})}});return r?.onDestroy(i.unsubscribe.bind(i)),X(()=>{let s=o();switch(s.kind){case 1:return s.value;case 2:throw s.error;case 0:throw new y(601,"`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.")}})}var Wm={url:"/",label:"voces"};function Gm(e){let t=[Wm],n=null;for(;e!=null;)e.url.length>0&&kS(t,e),n=e.component,e=e.firstChild;return n!=null&&n!=Os?t:[Wm]}function kS(e,t){let n=e.length>0?e[e.length-1].url:"";e.push({label:t.url.join(" ").replaceAll("-"," "),url:[n,...t.url].join("/")})}function FS(e,t){e&1&&(w(0,"span",2),V(1,"/"),b())}function LS(e,t){if(e&1&&(w(0,"a",1),V(1),b(),nt(2,FS,2,0,"span",2)),e&2){let n=t.$implicit,r=t.$index,o=t.$count;J("routerLink",n.url),M(),ce(n.label),M(),rt(r!==o-1?2:-1)}}var Zm=(()=>{let t=class t{constructor(){this.router=p(pn),this.route=p(st),this.breadcrumb=Cl(this.router.events.pipe(me(r=>r instanceof it),R(()=>Gm(this.route.root.snapshot))))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["app-breadcrumb"]],standalone:!0,features:[H],decls:3,vars:0,consts:[[1,"flex","flex-wrap","items-center","gap-2","text-sm"],[1,"capitalize","text-gray-700","hover:text-black",3,"routerLink"],[1,"px-1"]],template:function(o,i){o&1&&(w(0,"div",0),Pe(1,LS,3,3,null,null,ln),b()),o&2&&(M(),ke(i.breadcrumb()))},dependencies:[ze],encapsulation:2});let e=t;return e})();var Ym=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["app-header"]],standalone:!0,features:[H],decls:2,vars:0,consts:[[1,"pt-3","pb-5","flex","justify-between","items-center"]],template:function(o,i){o&1&&(w(0,"header",0),Ue(1,"app-breadcrumb"),b())},dependencies:[Zm],encapsulation:2});let e=t;return e})();var Qm=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=U({type:t,selectors:[["app-root"]],standalone:!0,features:[H],decls:4,vars:0,consts:[[1,"max-w-7xl","mx-auto","pb-10","px-4"]],template:function(o,i){o&1&&(w(0,"div",0),Ue(1,"app-header"),w(2,"main"),Ue(3,"router-outlet"),b()())},dependencies:[fl,Ym],encapsulation:2});let e=t;return e})();Ng(Qm,qm).catch(e=>console.error(e));
