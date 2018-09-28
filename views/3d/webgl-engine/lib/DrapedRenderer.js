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

define(["require","exports","../../lib/gl-matrix","../../support/debugFlags","./Camera","./ComponentUtils","./DefaultVertexBufferLayouts","./glUtil3D","./HighlightUtils","./Renderer","./RenderPass","./SliceHelper","./Util","../lighting/Lightsources","../materials/internal/TexOnlyGLMaterial","../../../webgl/FramebufferObject","../../../webgl/Texture","../../../webgl/Util"],function(e,t,r,n,i,a,o,s,h,d,l,g,p,u,c,_,m,f){var y=function(){function e(e,t,n,i,a,o){var s=this;this._renderTargets={},this._clearColor=r.vec4d.createFrom(0,0,0,0),this._id2origin={},this._uniqueIdx=0,this._rctx=e,this._canvas=t,this._programRep=n,this._modelDirtySet=o,this._modelDirtySet.onMaterialChanged=function(e){return s.materialChanged(e)},this._renderer=new d(n,i,a,this._rctx,!0),this._sliceHelper=new g,this._renderer.onHasHighlightsChanged=function(e){s.onHasHighlightsChanged&&s.onHasHighlightsChanged(e)},this._renderer.setLighting({lights:[new u.AmbientLight(r.vec3d.createFrom(1,1,1))],groundLightingFactor:1,globalFactor:0})}return e.prototype.dispose=function(){for(var e in this._renderTargets)this._renderTargets[e].dispose();this._renderTargets=null,this._renderer.dispose(),this._renderer=null},e.prototype.createRenderTarget=function(e){return this.createRenderTargetInternal(e,!0)},e.prototype.createHighlightRenderTarget=function(e){return this.createRenderTargetInternal(e,!1)},e.prototype.disposeRenderTarget=function(e){var t=this._renderTargets[e];t&&t.dispose(),delete this._renderTargets[e]},e.prototype.getRenderTargetTexture=function(e){var t=this._renderTargets[e];return t?t.colorTexture:null},e.prototype.addRenderGeometries=function(e){var t=this;e.forEach(function(e){null==e.origin&&(e.origin=t.getOrigin(e.center,e.bsRadius)),e.idx=t._uniqueIdx++}),this._renderer.modify(e,[]),this.onContentChanged&&this.onContentChanged()},e.prototype.removeRenderGeometries=function(e){this._renderer.modify([],e),this.onContentChanged&&this.onContentChanged()},e.prototype.updateRenderGeometries=function(e,t){var r=e.map(function(e){return{renderGeometry:e,updateType:t}});this._renderer.modify([],[],r),this.onContentChanged&&this.onContentChanged()},e.prototype.updateRenderOrder=function(e){e.size>0&&(this._renderer.modifyRenderOrder(e),this.onContentChanged&&this.onContentChanged())},e.prototype.setBackgroundColor=function(e){this._clearColor=e,this.onContentChanged&&this.onContentChanged()},e.prototype.addRenderGeometryHighlight=function(e,t){var r=e.instanceParameters,n=h.generateHighlightId();return r.componentHighlights=a.addHighlight(r.componentHighlights,null,t,n),this.updateRenderGeometries([e],32),n},e.prototype.removeRenderGeometryHighlight=function(e,t){var r=e.instanceParameters;r.componentHighlights=a.removeHighlight(r.componentHighlights,t),this.updateRenderGeometries([e],32)},e.prototype.isEmpty=function(){return this._renderer.isEmpty()&&!n.OVERLAY_DRAW_TEST_TEXTURE},e.prototype.processDirtyMaterials=function(){var e=this._modelDirtySet.getDirtyMaterials();e&&this._renderer.modify([],[],[],e),this._modelDirtySet.clearDirtyMaterials()},Object.defineProperty(e.prototype,"hasHighlights",{get:function(){return this._renderer.hasHighlights},enumerable:!0,configurable:!0}),e.prototype.draw=function(e,t){return this.drawPass(l.MATERIAL,e,t)},e.prototype.drawHighlights=function(e,t){return this.drawPass(l.MATERIAL_HIGHLIGHT,e,t)},e.prototype.drawPass=function(e,t,i){if(this.isEmpty()||e===l.MATERIAL_HIGHLIGHT&&!this.hasHighlights)return!1;if(this.processDirtyMaterials(),!i.views.some(function(e){return e.extent[0]!==e.extent[2]&&e.extent[1]!==e.extent[3]}))return!1;var a=this._renderTargets[t];if(!a)return!1;var o=this._rctx,s=o.gl,h=i.width,d=i.height;a.width===h&&a.height===d||(a.resize(h,d),a.colorTexture.setSamplingMode(9729));var g=v.camera;v.fbo=a,v.pixelRatio=i.pixelRatio||1,g.near=1,g.far=1e4,o.bindFramebuffer(a),o.setDepthTestEnabled(!1),o.setBlendFunctionSeparate(770,771,1,771),o.setClearColor.apply(o,this._clearColor),o.clear(s.COLOR_BUFFER_BIT);for(var p=0;p<i.views.length;p++){var u=i.views[p];g.viewport=u.viewport,r.mat4d.ortho(0,u.extent[2]-u.extent[0],0,u.extent[3]-u.extent[1],g.near,g.far,g.projectionMatrix),r.mat4d.identity(g.viewMatrix),r.mat4d.translate(g.viewMatrix,[-u.extent[0],-u.extent[1],0]),g.setGLViewport(this._rctx),n.OVERLAY_DRAW_TEST_TEXTURE&&this._drawTestTexture(h,d,T[i.index%T.length]),this._renderer.renderGeometryPass(e,v,null,null,this._sliceHelper)}return o.setDepthTestEnabled(!0),o.setBlendFunctionSeparate(770,771,1,771),o.bindFramebuffer(null),o.setViewport(0,0,this._canvas.width,this._canvas.height),a.colorTexture.descriptor.hasMipmap&&a.colorTexture.generateMipmap(),!0},e.prototype._drawTestTexture=function(e,t,n){var i=this._rctx,a=i.gl;if(!this._testPatternMat){for(var h=new Uint8Array(e*t*4),d=0,l=0;l<t;l++)for(var g=0;g<e;g++){var p=Math.floor(g/10),u=Math.floor(l/10);p<2||u<2||10*p>e-20||10*u>t-20?(h[d++]=255,h[d++]=255,h[d++]=255,h[d++]=255):(h[d++]=255,h[d++]=255,h[d++]=255,h[d++]=1&p&&1&u?1&g^1&l?0:255:1&p^1&u?0:128)}var _=new m(i,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:e,height:t},h);this._testPatternMat=new c(this._programRep,_,[1,1,1,1],!0,a.ALWAYS),this._testPatternBindParams={proj:r.mat4d.identity(),view:r.mat4d.identity(),nearFar:[-1,1],origin:[0,0,0],viewInvTransp:null,viewport:null,lightingData:null,fovY:0},this._quadVAO=s.createQuadVAO(i,o.Pos3Tex)}this._testPatternMat.setColor([n[0],n[1],n[2],1]),this._testPatternMat.bind(i,this._testPatternBindParams),this._testPatternMat.bindView(i,this._testPatternBindParams),i.bindVAO(this._quadVAO),i.drawArrays(5,0,f.vertexCount(this._quadVAO,"geometry")),this._testPatternMat.release(i)},e.prototype.getOrigin=function(e,t){var n=0,i=10*t/1e4;i>1&&(n=Math.ceil(p.logWithBase(i,2)));var a=1e4*Math.pow(2,n),o=Math.round(e[0]/a),s=Math.round(e[1]/a),h=Math.round(e[2]/a),d=n+"_"+o+"_"+s+"_"+h,l=this._id2origin[d];return null==l&&(l={vec3:r.vec3d.createFrom(o*a,s*a,h*a),id:d},this._id2origin[d]=l),l},e.prototype.materialChanged=function(e){this.onContentChanged&&this.onContentChanged()},e.prototype.createRenderTargetInternal=function(e,t){for(var r=e,n=0;this._renderTargets[r];)r=e+"_"+ ++n;return this._renderTargets[r]=_.createWithAttachments(this._rctx,{target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9987,hasMipmap:t,maxAnisotropy:8,width:0,height:0},{colorTarget:0,depthStencilTarget:0}),r},e}(),T=[[1,.5,.5],[.5,.5,1],[.5,1,.5]],v={fbo:null,camera:new i,pixelRatio:1};return y});