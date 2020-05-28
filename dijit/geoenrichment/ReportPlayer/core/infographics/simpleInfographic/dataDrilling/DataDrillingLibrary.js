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

define(["dojo/_base/lang","./_FieldInfoBuilder","../../../supportClasses/tableJson/TableJsonUtil","../../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoNameUtil","../../../../dataProvider/supportClasses/dataCollections/DataCollectionsLoader","./_config","./EnrichUtil"],(function(e,t,a,i,r,n,s){var o,l,u,f={};function c(e){return"string"==typeof e?e.split(",").map((function(e){return e+"/"})):e}function d(){return u=u||n.collectSubstitutionVariables()}return s.ddLibrary=f,f.getDrillingOptions=function(e,t,a){if(t){var r=function(){var r;if("string"==typeof t){var s=n.getById(e+"."+t);return s?[s]:null}var o=(r=t).usedFields||a&&a(r);if(o=o&&o.map((function(e){return e.toUpperCase()})),!r.variableID&&!o)return null;var l=r.variableID&&r.variableID.toUpperCase();function u(e,t){return!(!l||-1===l.indexOf(e))||o&&o.some((function(a){return-1!==a.indexOf(e)||-1!==a.indexOf(t)}))}var f=n.LIBRARY[e];for(var c in f){if(u(c.toUpperCase(),i.createFieldNameFromVariable(c).toUpperCase()))return f[c]}return null}();return r&&r.forEach((function(e){f._provideStateData(e)})),r}},f.getDrillingOptionInfo=function(t,i,r,n,o,l,u){var c,d=f.getDrillingOptions(t,i,u),p=d&&(r?d.filter((function(e){return e.name===r}))[0]:d[0]);if(!p)return null;!l&&p.defaultState&&(l=p.defaultState),l=l&&l.charAt(0)||"n",p.calcGroup&&((c=e.clone(p.calcGroup)).value=l+"/");var v=p.stateData[l],h=a.createSingleCellTable({fieldInfo:v.fieldInfo,width:n,height:o}),b=p.stateData.n||v;return{name:b.fieldInfo.chartJson&&b.fieldInfo.chartJson.visualProperties.title.text,calculationStatesGroup:c,tableJson:e.clone(h),enrichInfos:s._getStandardEnrichInfosForTableInfo(p,!0)}},f._provideStateData=function(a){if(!a.stateData){var i=a.states?e.clone(a.fieldInfo):a.fieldInfo;for(var r in a.stateData={n:{fieldInfo:a.fieldInfo}},a.fieldInfo.isChart&&f._updateChartJsonForState(a.fieldInfo.chartJson,"n",a.stateSettings&&a.stateSettings.n),a.states&&(a.states=c(a.states),a.states.forEach((function(t){var r=t.charAt(0);if("n"!==r){var n=e.clone(i);a.stateData[r]={fieldInfo:n},n.isChart&&f._updateChartJsonForState(n.chartJson,r,a.stateSettings&&a.stateSettings[r])}})),a.calcGroup=f.createCalculationStatesGroup(a.states)),a.stateData){var n=a.stateData[r];n.fieldInfo.isChart&&n.fieldInfo.chartJson.seriesItems.forEach((function(e){e.points.forEach((function(a){t.provideFieldInfoForChartPoint(a,e,1===n.fieldInfo.chartJson.seriesItems.length,r,n.fieldInfo.chartJson.comparisonInfo&&n.fieldInfo.chartJson.comparisonInfo.calculatorName)}))}))}delete a.states,delete a.stateSettings,delete a.fieldInfo}},f._updateChartJsonForState=function(t,a,i){i&&i.title?t.visualProperties.title.text=i&&i.title:"n"!==a&&(t.visualProperties.title.text+=" ("+n.STATE_LOCALIZATION_MAP_SHORT[a]+")"),t.visualProperties.yAxis&&(t.visualProperties.yAxis.title=i&&i.yAxisTitle||("n"===a?"":n.STATE_LOCALIZATION_MAP[a]),"i"===a&&(t.visualProperties.yAxis.baseLineValue=100)),"n"!==a&&(t.visualProperties.dataLabelsDecimals="p"===a?1:0),"p"===a&&(t.visualProperties.dataLabelsShowValuePercentSymbol=!0,t.visualProperties.yAxis&&(t.visualProperties.yAxis.showPercentSymbol=!0,t.visualProperties.yAxis.showSymbolForAllLabels=!0)),i&&i.isCurrency&&(t.visualProperties.dataLabelsShowValueCurrencySymbol=!0,t.visualProperties.yAxis&&(t.visualProperties.yAxis.showCurrencySymbol=!0,t.visualProperties.yAxis.showSymbolForAllLabels=!0)),e.mixin(t.visualProperties,i&&i.visualProps)},f.createCalculationStatesGroup=function(e){if(e)return{states:{ids:e=c(e),names:e.slice(),labels:e.map((function(e){return n.STATE_LOCALIZATION_MAP_SHORT[e.charAt(0)]}))},value:e[0]}},f.init=function(e){if(e&&e.countryID){var t=e.countryID,a=t+";"+(e.hierarchy||"census");if(o&&l===a)return o;l=a;var i=d(),s={};if(i[t]){if(r.canLoad()){var u=i[t].fields,f=i[t].variables;return o=r.loadVariables({countryID:t,hierarchy:e.hierarchy||"census",outFields:u,forceLowerCase:!0}).then((function(e){var a={fields:u,variables:[]};f.forEach((function(t){var i=e.fullNameToVariableCache[t];i.fullName=t,a.variables.push(i)})),s[t]=a})).then((function(){n.replaceSubstitutionVariables(s)}))}if(e.variableProvider){var c={fields:i[t].fields,variables:[]};s[t]=c,i[t].variables.forEach((function(t){var a=e.variableProvider.getVariableVintage(t);c.variables.push({fullName:t,vintage:a||"N/A"})})),n.replaceSubstitutionVariables(s)}o=!0}else o=!0}else o=!0},f.getSubstitutionVariables=function(e){var t=d()[e];return t&&t.variables},f}));