// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2016 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(["dojo/_base/declare","dojo/Deferred","dojo/Evented","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/on","dijit/_TemplatedMixin","../BaseEditor","../common/dijit/DrawLayer","dijit/form/Select","dijit/form/ToggleButton","dojo/text!./SelectFeatureSetFromLayer.html","esri/dijit/analysis/utils","esri/tasks/query","esri/toolbars/draw","esri/layers/FeatureLayer","esri/graphic","esri/symbols/PictureMarkerSymbol","esri/symbols/jsonUtils","../../mixins/browselayers/BrowseLayerMixin","../../AnalysisRegistry"],function(e,t,a,s,i,r,n,o,l,h,y,d,u,p,m,c,w,L,g,f,_,S){return e([l,o,a,_],{templateString:u,editorName:"SelectFeatureSetFromLayer",cssClass:{featureSetSelect:"fullSpread esriAnalysisSelect esriLongLabel longInputGP",layerChooseCtr:"layerChooseCtr"},constructor:function(e){this.inherited(arguments),e.cssClass&&s.mixin(this.cssClass,e.cssClass)},postCreate:function(){this.inherited(arguments),this.spatialFilterByFeatures=new y({class:this.cssClass.featureSetSelect}),this._analysisSelect=this.spatialFilterByFeatures,this.analysisLayers=this.config.analysisLayers,this.param&&this.param.defaultValue&&this.param.defaultValue.geometryType&&(this.analysisLayers=i.filter(this.analysisLayers,function(e){return this.param.defaultValue&&this.param.defaultValue.geometryType===e.geometryType},this)),this.analysisLayer||(this.analysisLayer=this.analysisLayers[0]),p.populateAnalysisLayers(this,"analysisLayer","analysisLayers",{posIncrement:1}),this.showBrowseLayers=!this.widget||this.widget.showBrowseLayers,this.showReadyToUseLayers=!this.widget||this.widget.showReadyToUseLayers,this.useArcGISComponents=!!this.widget&&this.widget.useArcGISComponents,this.helpFileName=this.widget.helpFileName,this.isBrowseInDialog=this.widget.isBrowseInDialog,this.portalUrl=this.config.portalUrl,this.isSingleTenant=!0,this.showGeoAnalyticsParams=this.config.showGeoAnalyticsParams,p.addReadyToUseLayerOption(this,[this._analysisSelect]),this.own(n(this.spatialFilterByFeatures,"change",s.hitch(this,this._onLayerChanged))),this.spatialFilterByFeatures.placeAt(this.layerChooseNode);var e,t;this.showDrawOption=void 0===this.config.showDrawOption||this.config.showDrawOption,this.showDrawOption&&(e=this.param.defaultValue.geometryType&&this.param.defaultValue.geometryType.toLowerCase(),t=e&&(-1!==e.indexOf("polygon")?"polygon":-1!==e.indexOf("point")?"point":"polyline"),this._drawBtn=new h({types:t||["polygon","point","polyline"],selectBtnNode:this.selectBtnNode,drawBtnNode:this.drawBtnNode}),n(this._drawBtn,"change",s.hitch(this,this._handleDrawBtnChange)),this._type=t,this._updateDrawnLayerName(),this._initDefaultSymbols()),this.on("add-ready-to-use-layer",s.hitch(this,function(e){this.widget&&this.widget.emit("add-ready-to-use-layer",e)}))},_updateDrawnLayerName:function(){var e,t=[],a=this.widget&&this.widget.drawLayer;a&&a.length>0&&(t=i.filter(a,function(e){return e.geometryType&&-1!==e.geometryType.toLowerCase().indexOf(this._type)},this)),e=0===t.length?"":"_"+t.length,"point"===this._type?this.set("drawnLayerName",this.widget&&this.widget.drawPointLayerName?this.widget.drawPointLayerName:this.nls.drawnPointLayer):"polyline"===this._type?this.set("drawnLayerName",this.widget&&this.widget.drawLineLayerName?this.widget.drawLineLayerName:this.nls.drawnPolylineLayer):"polygon"===this._type?this.set("drawnLayerName",this.widget&&this.widget.drawPolyLayerName?this.widget.drawPolyLayerName:this.nls.drawnPolygonLayer):this.set("drawnLayerName",this.widget&&this.widget.drawnLayerName?this.widget.drawnLayerName:this.nls.drawnLayerName),""!==e&&this._type&&this.set("drawnLayerName",this.get("drawnLayerName")+e)},_handleDrawBtnChange:function(e,t){this._type!=t&&(this._featureLayer=null,this._type=t),e?(this.emit("drawtool-activate",{}),this._featureLayer||this._createFeatColl(),this._drawtoolbar.activate("point"===this._type?c.POINT:"polyline"===this._type?c.FREEHAND_POLYLINE:c.POLYGON)):this._drawtoolbar.deactivate()},_onLayerChanged:function(e){var t,a,s;"browse"===e||"browselayers"===e?this.param&&this.param.defaultValue&&this.param.defaultValue.geometryType?(t=this.param.defaultValue.geometryType.toLowerCase(),-1!==t.indexOf("point")?(a="point",s=S.GeometryTypes.Point):-1!==t.indexOf("polygon")?(a="polygon",s=S.GeometryTypes.Polygon):(a="line",s=S.GeometryTypes.Line),this._createBrowseItems({browseValue:e,isDialog:this.isBrowseInDialog},{tags:[a],geometryTypes:[s]},this._analysisSelect)):this._createBrowseItems({browseValue:e,isDialog:this.isBrowseInDialog},{},this._analysisSelect):(this.analysisLayer=this.analysisLayers[e-1],this.emit("analysislayer-change",{analysisLayer:this.analysisLayer}))},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&p.addAnalysisReadyLayer({item:e.selection,layers:this.analysisLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,posIncrement:1,widget:this},t)},_createFeatColl:function(){this._updateDrawnLayerName(),this._initDefaultSymbols();var e=this.createFeatureCollection(this.drawnLayerName);this._featureLayer=new w(e,{id:this.drawnLayerName}),this.map.addLayer(this._featureLayer),r.connect(this._featureLayer,"onClick",s.hitch(this,function(e){this.map.infoWindow.setFeatures([e.graphic])})),this.widget&&this.widget.set("drawLayer",this._featureLayer)},createFeatureCollection:function(e){var t,a=S.GeometryTypes[this._type.charAt(0).toUpperCase()+this._type.substr(1)];return t={layerDefinition:null,featureSet:{features:[],geometryType:this.param.defaultValue.geometryType||a}},t.layerDefinition={objectIdField:"OBJECTID",templates:[],type:"Feature Layer",drawingInfo:{},name:e,hasAttachments:!1,capabilities:"Query",types:[],geometryType:this.param.defaultValue.geometryType||a,fields:this.param.defaultValue.fields||[]},t},_getRandomColor:function(){return[Math.floor(256*Math.random()),Math.floor(256*Math.random()),Math.floor(256*Math.random()),Math.floor(256*Math.random())]},_initDefaultSymbols:function(){var e=this.drawnLayerName&&-1!==this.drawnLayerName.search(/_[0-9]$/),t={style:"esriSMSCircle",color:e?this._getRandomColor():[0,0,128,128],name:"Circle",outline:{color:e?this._getRandomColor():[0,0,128,255],width:1},type:"esriSMS",size:18},a={style:"esriSLSSolid",color:e?this._getRandomColor():[79,129,189,255],width:3,name:"Blue 1",type:"esriSLS"},s={style:"esriSFSSolid",color:e?this._getRandomColor():[79,129,189,128],type:"esriSFS",outline:{style:"esriSLSSolid",color:e?this._getRandomColor():[54,93,141,255],width:1.5,type:"esriSLS"}};this.pointSymbol=f.fromJson(t),this.polylineSymbol=f.fromJson(a),this.polygonSymbol=f.fromJson(s)},_createGraphic:function(e){var t=e.type,a=null;return a="point"===t||"multipoint"===t?this.pointSymbol:"line"===t||"polyline"===t?this.polylineSymbol:this.polygonSymbol,new L(e,a)},_addFeatures:function(e){var t=this._createGraphic(e),a=[];if(this.map.graphics.add(t),a.push(t),this._featureLayer.applyEdits(a,null,null),0===this.analysisLayers.length||this.analysisLayers[this.analysisLayers.length-1]!==this._featureLayer){var s=this.analysisLayers.push(this._featureLayer),r=this._analysisSelect.getOptions();this._analysisSelect.removeOption(r),r=i.map(r,function(e){return e.selected=!1,e}),r.push({value:s,label:this._featureLayer.name,selected:!0}),this._analysisSelect.addOption(r),this._onLayerChanged(s)}this._drawBtn.set("checked",!1)},clear:function(){this._featureLayer&&(this.map.removeLayer(this._featureLayer),i.forEach(this.analysisLayers,function(e,t){if(e===this._featureLayer)return this._analysisSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.analysisLayers.splice(t,1)},this)),this._handleDrawBtnChange(!1)},_setDrawnLayerNameAttr:function(e){this.drawnLayerName=e},_getDrawnLayerNameAttr:function(){return this._featureLayer?this._featureLayer.name:this.drawnLayerName},_getDrawLayerAttr:function(){return this._featureLayer},getGPValue:function(){var e=this.analysisLayers[this._analysisSelect.get("value")-1];return this.wrapValueToDeferred(p.constructAnalysisInputLyrObj(e,!0))},_setMapAttr:function(e){this.map=e,this._drawtoolbar=new c(this.map),r.connect(this._drawtoolbar,"onDrawEnd",s.hitch(this,this._addFeatures))},_setAnalysisLayerAttr:function(e){this._set("analysisLayer",e)},_getAnalysisLayerAttr:function(){return this.analysisLayers[this._analysisSelect.get("value")-1]}})});