// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/paramHelper","dojo/_base/kernel","dojo/_base/url","dojo/promise/all","../config","../kernel","../request","../core/Error","../core/has","../core/JSONSupport","../core/lang","../core/Loadable","../core/promiseUtils","../core/accessorSupport/decorators","../geometry/Extent","./PortalQueryParams","./PortalQueryResult","./PortalUser"],function(e,t,r,o,n,p,u,a,i,l,s,y,d,c,h,f,m,v,P,g,S,_,b){var O,G={Bookmark:function(){return v.create(function(t){return e(["./Bookmark"],t)})},Portal:function(){return v.create(function(t){return e(["./Portal"],t)})},PortalFolder:function(){return v.create(function(t){return e(["./PortalFolder"],t)})},PortalGroup:function(){return v.create(function(t){return e(["./PortalGroup"],t)})},PortalItem:function(){return v.create(function(t){return e(["./PortalItem"],t)})},PortalQueryParams:function(){return v.create(function(t){return e(["./PortalQueryParams"],t)})},PortalQueryResult:function(){return v.create(function(t){return e(["./PortalQueryResult"],t)})},PortalRating:function(){return v.create(function(t){return e(["./PortalRating"],t)})},PortalUser:function(){return v.create(function(t){return e(["./PortalUser"],t)})}};return function(t){function h(e){var r=t.call(this)||this;return r.access=null,r.allSSL=!1,r.authMode="auto",r.authorizedCrossOriginDomains=null,r.basemapGalleryGroupQuery=null,r.bingKey=null,r.canListApps=!1,r.canListData=!1,r.canListPreProvisionedItems=!1,r.canProvisionDirectPurchase=!1,r.canSearchPublic=!0,r.canShareBingPublic=!1,r.canSharePublic=!1,r.canSignInArcGIS=!1,r.canSignInIDP=!1,r.colorSetsGroupQuery=null,r.commentsEnabled=!1,r.created=null,r.culture=null,r.customBaseUrl=null,r.defaultBasemap=null,r.defaultExtent=null,r.defaultVectorBasemap=null,r.description=null,r.eueiEnabled=!1,r.featuredGroups=null,r.featuredItemsGroupQuery=null,r.galleryTemplatesGroupQuery=null,r.livingAtlasGroupQuery=null,r.hasCategorySchema=!1,r.helperServices=null,r.homePageFeaturedContent=null,r.homePageFeaturedContentCount=null,r.httpPort=null,r.httpsPort=null,r.id=null,r.ipCntryCode=null,r.isPortal=!1,r.layerTemplatesGroupQuery=null,r.maxTokenExpirationMinutes=null,r.modified=null,r.name=null,r.portalHostname=null,r.portalMode=null,r.portalProperties=null,r.region=null,r.rotatorPanels=null,r.showHomePageDescription=!1,r.supportsHostedServices=!1,r.symbolSetsGroupQuery=null,r.templatesGroupQuery=null,r.units=null,r.url=l.portalUrl,r.urlKey=null,r.user=null,r.useStandardizedQuery=!1,r.useVectorBasemaps=!1,r.vectorBasemapGalleryGroupQuery=null,r}o(h,t),m=h,h.prototype.normalizeCtorArgs=function(e){return"string"==typeof e?{url:e}:e},h.prototype.destroy=function(){this._esriId_credentialCreateHandle&&(this._esriId_credentialCreateHandle.remove(),this._esriId_credentialCreateHandle=null)},h.prototype.readAuthorizedCrossOriginDomains=function(e){if(e)for(var t=0,r=e;t<r.length;t++){var o=r[t];-1===l.request.trustedServers.indexOf(o)&&l.request.trustedServers.push(o)}return e},h.prototype.readDefaultBasemap=function(e){if(e){var t=O.fromJSON(e);return t.portalItem={portal:this},t}return null},h.prototype.readDefaultVectorBasemap=function(e){if(e){var t=O.fromJSON(e);return t.portalItem={portal:this},t}return null},Object.defineProperty(h.prototype,"extraQuery",{get:function(){var e=this.user&&this.user.orgId,t=!e||this.canSearchPublic;return this.id&&!t?" AND orgid:"+this.id:null},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isOrganization",{get:function(){return!!this.access},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"restUrl",{get:function(){var e=this.url;if(e){var t=e.indexOf("/sharing");e=t>0?e.substring(0,t):this.url.replace(/\/+$/,""),e+="/sharing/rest"}return e},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"thumbnailUrl",{get:function(){var e=this.restUrl,t=this.thumbnail;return e&&t?this._normalizeSSL(e+"/portals/self/resources/"+t):null},enumerable:!0,configurable:!0}),h.prototype.readUrlKey=function(e){return e?e.toLowerCase():e},h.prototype.readUser=function(e){var t=null;return e&&(t=b.fromJSON(e),t.portal=this),t},h.prototype.load=function(){var t=this,r=v.create(function(t){return e(["../Basemap"],t)}).then(function(e){O=e}).then(function(){return t._fetchSelf()}).then(function(e){if(s.id){var r=s.id;t.credential=r.findCredential(t.restUrl),t.credential||t.authMode!==m.AUTH_MODE_AUTO||(t._esriId_credentialCreateHandle=r.on("credential-create",function(){r.findCredential(t.restUrl)&&t._signIn()}))}t.read(e)});return this.addResolvingPromise(r),this.when()},h.prototype.fetchBasemaps=function(e){var t=new S;return t.query=e||(this.useVectorBasemaps?this.vectorBasemapGalleryGroupQuery:this.basemapGalleryGroupQuery),t.disableExtraQuery=!0,this.queryGroups(t).then(function(e){if(t.num=100,t.query='type:"Web Map" -type:"Web Application"',e.total){var r=e.results[0];return t.sortField=r.sortField||"name",t.sortOrder=r.sortOrder||"desc",r.queryItems(t)}return null}).then(function(e){return e&&e.total?e.results.filter(function(e){return"Web Map"===e.type}).map(function(e){return new O({portalItem:e})}):[]})},h.prototype.fetchCategorySchema=function(){return this.hasCategorySchema?this._request(this.restUrl+"/portals/self/categorySchema").then(function(e){return e.categorySchema}):v.resolve([])},h.prototype.fetchFeaturedGroups=function(){var e=this.featuredGroups,t=new S;if(t.num=100,t.sortField="title",e&&e.length){for(var r=[],o=0,n=e;o<n.length;o++){var p=n[o];r.push('(title:"'+p.title+'" AND owner:'+p.owner+")")}return t.query=r.join(" OR "),this.queryGroups(t).then(function(e){return e.results})}return v.resolve([])},h.prototype.fetchRegions=function(){var e=this.user&&this.user.culture||this.culture||u.locale;return this._request(this.restUrl+"/portals/regions",{query:{culture:e}})},h.getDefault=function(){return m._default||(m._default=new m),m._default},h.prototype.queryGroups=function(e){return this._queryPortal("/community/groups",e,"PortalGroup")},h.prototype.queryItems=function(e){return this._queryPortal("/search",e,"PortalItem")},h.prototype.queryUsers=function(e){return e.sortField||(e.sortField="username"),this._queryPortal("/community/users",e,"PortalUser")},h.prototype.toJSON=function(){throw new d("internal:not-yet-implemented","Portal.toJSON is not yet implemented")},h.prototype._fetchSelf=function(e,t){void 0===e&&(e=this.authMode),void 0===t&&(t=!1);var r=this.restUrl+"/portals/self",o={authMode:e,query:{culture:u.locale}};return"auto"===o.authMode&&(o.authMode="no-prompt"),t&&(o.query.default=!0),this._request(r,o)},h.prototype._queryPortal=function(e,t,r){var o=this,n=function(r){return o._request(o.restUrl+e,t.toRequestOptions(o)).then(function(e){var n=t.clone();return n.start=e.nextStart,new _({nextQueryParams:n,queryParams:t,total:e.total,results:m._resultsToTypedArray(r,{portal:o},e)})}).then(function(e){return i(e.results.map(function(t){return"function"==typeof t.when?t.when():e})).always(function(){return e})})};return r&&G[r]?G[r]().then(function(e){return n(e)}):n()},h.prototype._signIn=function(){var e=this;if(this.authMode===m.AUTH_MODE_ANONYMOUS)return v.reject(new d("portal:invalid-auth-mode",'Current "authMode"\' is "'+this.authMode+'"'));if("failed"===this.loadStatus)return v.reject(this.loadError);var t=function(t){return v.resolve().then(function(){return"not-loaded"===e.loadStatus?(t||(e.authMode="immediate"),e.load().then(function(){return null})):"loading"===e.loadStatus?e.load().then(function(){return e.credential?null:(e.credential=t,e._fetchSelf("immediate"))}):e.user&&e.credential===t?null:(e.credential=t,e._fetchSelf("immediate"))}).then(function(t){t&&e.read(t)})};return s.id?s.id.getCredential(this.restUrl).then(function(e){return t(e)}):t(this.credential)},h.prototype._normalizeSSL=function(e){var t=this.allSSL;if(!t&&c("esri-secure-context")&&(t=!0),this.isPortal){var r=new a(e);return this.portalHostname.toLowerCase().indexOf(r.host.toLowerCase())>-1&&r.port&&"80"!==r.port&&"443"!==r.port?t?"https://"+r.host+(this.httpsPort&&443!==this.httpsPort?":"+this.httpsPort:"")+r.path+"?"+r.query:"http://"+r.host+(this.httpPort&&80!==this.httpPort?":"+this.httpPort:"")+r.path+"?"+r.query:t?e.replace("http:","https:"):e}return t?e.replace("http:","https:"):e},h.prototype._normalizeUrl=function(e){var t=this.credential&&this.credential.token;return this._normalizeSSL(t?e+(e.indexOf("?")>-1?"&":"?")+"token="+t:e)},h.prototype._requestToTypedArray=function(t,r,o){var n=this,p=function(e){return n._request(t,r).then(function(t){var r=m._resultsToTypedArray(e,{portal:n},t);return i(r.map(function(e){return"function"==typeof e.when?e.when():t})).always(function(){return r})})};return o?v.create(function(t){return e(["./"+o],t)}).then(function(e){return p(e)}):p()},h.prototype._request=function(e,t){var o=this.authMode===m.AUTH_MODE_ANONYMOUS?"anonymous":"auto",n=null,p="auto",u={f:"json"},a="json";t&&(t.authMode&&(o=t.authMode),t.body&&(n=t.body),t.method&&(p=t.method),t.query&&(u=r({},u,t.query)),t.responseType&&(a=t.responseType));var i={authMode:o,body:n,method:p,query:u,responseType:a,timeout:0};return y(this._normalizeSSL(e),i).then(function(e){return e.data})},h._resultsToTypedArray=function(e,t,r){var o;return r?(o=r.listings||r.notifications||r.userInvitations||r.tags||r.items||r.groups||r.comments||r.provisions||r.results||r.relatedItems||r,(e||t)&&(o=o.map(function(r){var o=f.mixin(e?e.fromJSON(r):r,t);return"function"==typeof o.load&&o.load(),o}))):o=[],o};var m;return h.AUTH_MODE_ANONYMOUS="anonymous",h.AUTH_MODE_AUTO="auto",h.AUTH_MODE_IMMEDIATE="immediate",n([P.property()],h.prototype,"access",void 0),n([P.property()],h.prototype,"allSSL",void 0),n([P.property()],h.prototype,"authMode",void 0),n([P.property()],h.prototype,"authorizedCrossOriginDomains",void 0),n([P.reader("authorizedCrossOriginDomains")],h.prototype,"readAuthorizedCrossOriginDomains",null),n([P.property()],h.prototype,"basemapGalleryGroupQuery",void 0),n([P.property()],h.prototype,"bingKey",void 0),n([P.property()],h.prototype,"canListApps",void 0),n([P.property()],h.prototype,"canListData",void 0),n([P.property()],h.prototype,"canListPreProvisionedItems",void 0),n([P.property()],h.prototype,"canProvisionDirectPurchase",void 0),n([P.property()],h.prototype,"canSearchPublic",void 0),n([P.property()],h.prototype,"canShareBingPublic",void 0),n([P.property()],h.prototype,"canSharePublic",void 0),n([P.property()],h.prototype,"canSignInArcGIS",void 0),n([P.property()],h.prototype,"canSignInIDP",void 0),n([P.property()],h.prototype,"colorSetsGroupQuery",void 0),n([P.property()],h.prototype,"commentsEnabled",void 0),n([P.property({type:Date})],h.prototype,"created",void 0),n([P.property()],h.prototype,"credential",void 0),n([P.property()],h.prototype,"culture",void 0),n([P.property()],h.prototype,"currentVersion",void 0),n([P.property()],h.prototype,"customBaseUrl",void 0),n([P.property()],h.prototype,"defaultBasemap",void 0),n([P.reader("defaultBasemap")],h.prototype,"readDefaultBasemap",null),n([P.property({type:g})],h.prototype,"defaultExtent",void 0),n([P.property()],h.prototype,"defaultVectorBasemap",void 0),n([P.reader("defaultVectorBasemap")],h.prototype,"readDefaultVectorBasemap",null),n([P.property()],h.prototype,"description",void 0),n([P.property()],h.prototype,"eueiEnabled",void 0),n([P.property({dependsOn:["user","id","canSearchPublic"],readOnly:!0})],h.prototype,"extraQuery",null),n([P.property()],h.prototype,"featuredGroups",void 0),n([P.property()],h.prototype,"featuredItemsGroupQuery",void 0),n([P.property()],h.prototype,"galleryTemplatesGroupQuery",void 0),n([P.property()],h.prototype,"livingAtlasGroupQuery",void 0),n([P.property()],h.prototype,"hasCategorySchema",void 0),n([P.property()],h.prototype,"helpBase",void 0),n([P.property()],h.prototype,"helperServices",void 0),n([P.property()],h.prototype,"helpMap",void 0),n([P.property()],h.prototype,"homePageFeaturedContent",void 0),n([P.property()],h.prototype,"homePageFeaturedContentCount",void 0),n([P.property()],h.prototype,"httpPort",void 0),n([P.property()],h.prototype,"httpsPort",void 0),n([P.property()],h.prototype,"id",void 0),n([P.property()],h.prototype,"ipCntryCode",void 0),n([P.property({dependsOn:["access"],readOnly:!0})],h.prototype,"isOrganization",null),n([P.property()],h.prototype,"isPortal",void 0),n([P.property()],h.prototype,"layerTemplatesGroupQuery",void 0),n([P.property()],h.prototype,"maxTokenExpirationMinutes",void 0),n([P.property({type:Date})],h.prototype,"modified",void 0),n([P.property()],h.prototype,"name",void 0),n([P.property()],h.prototype,"portalHostname",void 0),n([P.property()],h.prototype,"portalMode",void 0),n([P.property()],h.prototype,"portalProperties",void 0),n([P.property()],h.prototype,"region",void 0),n([P.property({dependsOn:["url"],readOnly:!0})],h.prototype,"restUrl",null),n([P.property()],h.prototype,"rotatorPanels",void 0),n([P.property()],h.prototype,"showHomePageDescription",void 0),n([P.property()],h.prototype,"staticImagesUrl",void 0),n([P.property()],h.prototype,"stylesGroupQuery",void 0),n([P.property()],h.prototype,"supportsHostedServices",void 0),n([P.property()],h.prototype,"symbolSetsGroupQuery",void 0),n([P.property()],h.prototype,"templatesGroupQuery",void 0),n([P.property()],h.prototype,"thumbnail",void 0),n([P.property({dependsOn:["restUrl","thumbnail"],readOnly:!0})],h.prototype,"thumbnailUrl",null),n([P.property()],h.prototype,"units",void 0),n([P.property()],h.prototype,"url",void 0),n([P.property()],h.prototype,"urlKey",void 0),n([P.reader("urlKey")],h.prototype,"readUrlKey",null),n([P.property()],h.prototype,"user",void 0),n([P.reader("user")],h.prototype,"readUser",null),n([P.property()],h.prototype,"useStandardizedQuery",void 0),n([P.property()],h.prototype,"useVectorBasemaps",void 0),n([P.property()],h.prototype,"vectorBasemapGalleryGroupQuery",void 0),n([p(1,P.cast(S))],h.prototype,"_queryPortal",null),h=m=n([P.subclass("esri.portal.Portal")],h)}(P.declared(h,m))});