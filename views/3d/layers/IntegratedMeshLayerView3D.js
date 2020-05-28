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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Graphic","../../../core/maybe","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/vec4f64","../../../geometry/support/aaBoundingRect","./I3SMeshView3D","./LayerView3D","./support/layerViewUpdatingProperties","../../layers/LayerView"],(function(e,r,t,o,a,l,i,s,n,p,y,u,c,h){return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.lodFactor=1,r._elevationContext="im",r._isIntegratedMesh=!0,r._supportsLabeling=!1,r.drapeTargetType=1,r._overlayTexOffset=n.vec4f64.fromValues(-1,-1,-1,-1),r._overlayTexScale=n.vec4f64.create(),r._overlayTextures=[null,null],r._overlayHighlights=[null,null],r._overlayNormals=[null,null],r}return o(r,e),Object.defineProperty(r.prototype,"progressiveLoadFactor",{get:function(){return this.lodFactor>=1?.2:1},enumerable:!0,configurable:!0}),r.prototype.setDrapingTextures=function(e,r,t,o,a){var l=this;i.isSome(t)&&p.area(r)>0?(this._overlayTextures[e]=t,this._overlayHighlights[e]=o,this._overlayNormals[e]=a,this._overlayTexOffset[2*e]=-r[0]/p.width(r),this._overlayTexOffset[2*e+1]=-r[1]/p.height(r),this._overlayTexScale[2*e]=1/p.width(r),this._overlayTexScale[2*e+1]=1/p.height(r)):(this._overlayTextures[e]=null,this._overlayHighlights[e]=null,this._overlayNormals[e]=null,this._overlayTexOffset[2*e]=-1,this._overlayTexOffset[2*e+1]=-1,this._overlayTexScale[2*e]=0,this._overlayTexScale[2*e+1]=0),this._forAllNodes((function(e){return l._collection.updateMaterial(e.objectHandle,(function(e){return l._updateMaterialOverlay(e)}))}))},r.prototype._updateMaterialOverlay=function(e){e.overlayColorInner=this._overlayTextures[0],e.overlayColorOuter=this._overlayTextures[1],e.overlayHighlightInner=this._overlayHighlights[0],e.overlayHighlightOuter=this._overlayHighlights[1],e.overlayNormalInner=this._overlayNormals[0],e.overlayNormalOuter=this._overlayNormals[1],e.overlayTexOffset=this._overlayTexOffset,e.overlayTexScale=this._overlayTexScale},r.prototype.initialize=function(){},r.prototype.destroy=function(){},r.prototype._createLayerGraphic=function(){var e=new l;return e.layer=this.layer,e.sourceLayer=this.layer,e},r.prototype.canResume=function(){return this.inherited(arguments)&&(!this._controller||this._controller.rootNodeVisible)},r.prototype.isUpdating=function(){return this.updatingMeshView3D},a([s.property()],r.prototype,"layer",void 0),a([s.property({dependsOn:["updatingMeshView3D"]})],r.prototype,"updating",void 0),a([s.property({dependsOn:["_controller.rootNodeVisible"]})],r.prototype,"suspended",void 0),a([s.property(c.updatingProgress)],r.prototype,"updatingProgress",void 0),a([s.property({readOnly:!0,aliasOf:"_controller.updatingProgress"})],r.prototype,"updatingProgressValue",void 0),a([s.property({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.integratedMesh.lodFactor"})],r.prototype,"lodFactor",void 0),a([s.property({readOnly:!0,dependsOn:["lodFactor"]})],r.prototype,"progressiveLoadFactor",null),r=a([s.subclass("esri.views.3d.layers.SceneLayerView3D")],r)}(s.declared(y.I3SMeshView3D(u.LayerView3D(h))))}));