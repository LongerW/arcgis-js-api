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

define(["require","exports","../../../../../../core/tsSupport/makeTemplateObjectHelper","../attributes/VertexColor.glsl","../util/MixExternalColor.glsl","../../shaderModules/interfaces"],(function(e,o,r,n,a,t){var l,i,c;Object.defineProperty(o,"__esModule",{value:!0}),o.ComputeMaterialColor=function(e,o){e.include(n.VertexColor,o),e.include(a.MixExternalColor,{stages:1});var s=e.fragment;s.uniforms.add("uBaseColor","vec4"),s.uniforms.add("uObjectOpacity","float"),o.attributeColor?s.code.add(t.glsl(l||(l=r(["\n      vec3 _baseColor() {\n        // combine the old material parameters into a single one\n        return uBaseColor.rgb * vColor.rgb;\n      }\n\n      float _baseOpacity() {\n        return uBaseColor.a * vColor.a;\n      }\n    "],["\n      vec3 _baseColor() {\n        // combine the old material parameters into a single one\n        return uBaseColor.rgb * vColor.rgb;\n      }\n\n      float _baseOpacity() {\n        return uBaseColor.a * vColor.a;\n      }\n    "])))):s.code.add(t.glsl(i||(i=r(["\n      vec3 _baseColor() {\n        // combine the old material parameters into a single one\n        return uBaseColor.rgb;\n      }\n\n      float _baseOpacity() {\n        return uBaseColor.a;\n      }\n    "],["\n      vec3 _baseColor() {\n        // combine the old material parameters into a single one\n        return uBaseColor.rgb;\n      }\n\n      float _baseOpacity() {\n        return uBaseColor.a;\n      }\n    "])))),s.code.add(t.glsl(c||(c=r(["\n    vec4 computeMaterialColor(vec4 textureColor, vec4 externalColor, int externalColorMixMode) {\n      vec3 baseColor = _baseColor();\n      float baseOpacity = _baseOpacity();\n\n      vec3 color = mixExternalColor(\n        baseColor,\n        textureColor.rgb,\n        externalColor.rgb,\n        externalColorMixMode\n      );\n      float opacity = uObjectOpacity * mixExternalOpacity(\n        baseOpacity,\n        textureColor.a,\n        externalColor.a,\n        externalColorMixMode\n      );\n\n      return vec4(color, opacity);\n    }\n  "],["\n    vec4 computeMaterialColor(vec4 textureColor, vec4 externalColor, int externalColorMixMode) {\n      vec3 baseColor = _baseColor();\n      float baseOpacity = _baseOpacity();\n\n      vec3 color = mixExternalColor(\n        baseColor,\n        textureColor.rgb,\n        externalColor.rgb,\n        externalColorMixMode\n      );\n      float opacity = uObjectOpacity * mixExternalOpacity(\n        baseOpacity,\n        textureColor.a,\n        externalColor.a,\n        externalColorMixMode\n      );\n\n      return vec4(color, opacity);\n    }\n  "]))))}}));