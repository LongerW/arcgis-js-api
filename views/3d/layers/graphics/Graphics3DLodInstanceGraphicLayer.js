// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../geometry/support/aaBoundingBox","./featureExpressionInfoUtils","./Graphics3DGraphicElevationContext","./graphicUtils","../../webgl-engine/lib/Object3DStateSet"],(function(e,t,n,i,r,o,a,s,h,l,c,d,g){var u=function(){function e(e,t,n,i){this.graphics3DSymbolLayer=e,this.instanceIndex=t,this.elevationAligner=n,this.type="lod-instance",this.alignedSampledElevation=0,this.isElevationSource=!1,this.needsElevationUpdates=!1,this.elevationContext=new c(i)}return e.prototype.initialize=function(){},e.prototype.setVisibility=function(e){var t=this.lodRenderer.instanceData;return e!==t.getVisible(this.instanceIndex)&&(t.setVisible(this.instanceIndex,e),!0)},e.prototype.destroy=function(){null!=this.instanceIndex&&(this.lodRenderer.instanceData.removeInstance(this.instanceIndex),this.graphics3DSymbolLayer.notifyDestroyGraphicLayer(this))},e.prototype.alignWithElevation=function(e,t,n){if(this.elevationAligner){l.setContextFeature(this.elevationContext.featureExpressionInfoContext,n);var i=this.elevationAligner(this,this.elevationContext,e,t);null!=i&&(this.alignedSampledElevation=i)}},e.prototype.getBSRadius=function(){var e=this.lodRenderer;return e.baseBoundingSphere.radius*e.instanceData.getCombinedMaxScaleFactor(this.instanceIndex)},e.prototype.getCenterObjectSpace=function(e){return void 0===e&&(e=s.vec3f64.create()),this.lodRenderer.instanceData.getCombinedLocalTransform(this.instanceIndex,x),a.vec3.transformMat4(e,this.lodRenderer.baseBoundingSphere.center,x)},e.prototype.getBoundingBoxObjectSpace=function(e){void 0===e&&(e=h.create()),this.lodRenderer.instanceData.getCombinedLocalTransform(this.instanceIndex,x);var t=this.lodRenderer.baseBoundingBox;h.empty(e);for(var n=0;n<8;++n)a.vec3.set(f,0==(1&n)?t[0]:t[3],0==(2&n)?t[1]:t[4],0==(4&n)?t[2]:t[5]),a.vec3.transformMat4(f,f,x),h.expandPointInPlace(e,f);return e},e.prototype.computeAttachmentOrigin=function(e){this.lodRenderer.instanceData.getGlobalTransform(this.instanceIndex,x),e.render.origin[0]+=x[12],e.render.origin[1]+=x[13],e.render.origin[2]+=x[14],e.render.num++},e.prototype.getProjectedBoundingBox=function(e,t,n,o,s){return r(this,void 0,void 0,(function(){var r,l,c,g,u,b,y,S,I;return i(this,(function(i){switch(i.label){case 0:for(r=this.getBoundingBoxObjectSpace(s),l=m,c=h.isPoint(r)?1:l.length,this.lodRenderer.instanceData.getGlobalTransform(this.instanceIndex,x),b=0;b<c;b++)g=l[b],f[0]=r[g[0]],f[1]=r[g[1]],f[2]=r[g[2]],a.vec3.transformMat4(f,f,x),p[3*b+0]=f[0],p[3*b+1]=f[1],p[3*b+2]=f[2];if(!e(p,0,c))return[2,null];for(h.empty(r),u=null,this.calculateRelativeScreenBounds&&(u=this.calculateRelativeScreenBounds()),b=0;b<3*c;b+=3){for(y=0;y<3;y++)r[y]=Math.min(r[y],p[b+y]),r[y+3]=Math.max(r[y+3],p[b+y]);u&&n.push({location:p.slice(b,b+3),screenSpaceBoundingRect:u})}if(!t)return[3,5];if(h.center(r,v),"absolute-height"===this.elevationContext.mode)return[3,5];S=void 0,I=d.demResolutionForBoundingBox(r,t),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,t.service.queryElevation(v[0],v[1],o,I)];case 2:return S=i.sent(),[3,4];case 3:return i.sent(),S=null,[3,4];case 4:null!=S&&h.offset(r,0,0,-this.alignedSampledElevation+S),i.label=5;case 5:return[2,r]}}))}))},e.prototype.addObjectState=function(e,t){var n=this;if(0===e){var i=g.generateObject3DStateId(e);this.addHighlightId(i),t.addExternal((function(e){n.removeHighlightId(e)}),i)}},e.prototype.removeObjectState=function(e){this.highlights&&this.highlights.forEach((function(t){return e.remove(t)}))},e.prototype.addHighlightId=function(e){this.highlights=this.highlights||new Set,this.highlights.add(e),this.lodRenderer.instanceData.setHighlight(this.instanceIndex,!0)},e.prototype.removeHighlightId=function(e){this.highlights&&(this.highlights.delete(e),this.lodRenderer.instanceData.setHighlight(this.instanceIndex,this.highlights.size>0),0===this.highlights.size&&(this.highlights=null))},Object.defineProperty(e.prototype,"lodRenderer",{get:function(){return this.graphics3DSymbolLayer.lodRenderer},enumerable:!0,configurable:!0}),e}(),p=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],f=s.vec3f64.create(),v=s.vec3f64.create(),m=[[0,1,2],[3,1,2],[0,4,2],[3,4,2],[0,1,5],[3,1,5],[0,4,5],[3,4,5]],x=o.mat4f64.create();return u}));