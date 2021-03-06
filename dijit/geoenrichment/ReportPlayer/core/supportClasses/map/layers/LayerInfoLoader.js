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
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.

define(["esri/dijit/geoenrichment/utils/requests/UniversalClient","../WebMapsUtil"],(function(e,n){return{_cache:{},getInfo:function(r){return this._cache[r]||(this._cache[r]=e.request(r).otherwise((function(){return n.executeItemUrl({url:r})})).then((function(e){return{url:r,name:e.name,rendererJson:e.drawingInfo&&e.drawingInfo.renderer,geometryType:e.geometryType}})).otherwise((function(e){return console.log(e),null}))),this._cache[r]}}}));