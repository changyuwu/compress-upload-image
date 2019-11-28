!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),a=function(){function t(e){i(this,t);var n={upload_type:"blob",upload_input_id:"canvas-compress-upload-input-ele-"+this._getUuid(),compress_canvas_id:"canvas-compress-upload-canvas-ele-"+this._getUuid(),upload_btn_selector:"",max_size:{width:500,height:500},multiple:!1,transferCallback:function(){}};this.options=Object.assign({},n,e),this.inputEle=null,this.canvasEle=null,this.options.upload_btn_selector&&document.querySelector(this.options.upload_btn_selector)&&this.bindEvent()}return o(t,[{key:"bindEvent",value:function(){var t=this;document.querySelector(this.options.upload_btn_selector).addEventListener("click",function(){t.checkUploadElements(),t.inputEle.click()})}},{key:"checkUploadElements",value:function(){var t=this,e=document.getElementById(this.options.upload_input_id),n=document.getElementById(this.options.compress_canvas_id);if(!e){var i=document.createElement("input");i.setAttribute("type","file"),i.setAttribute("id",this.options.upload_input_id),i.setAttribute("accept","image/*"),this.options.multiple&&i.setAttribute("multiple","multiple"),i.style.display="none",i.addEventListener("change",function(){t.onInputChange()}),document.body.appendChild(i)}if(!n){var o=document.createElement("canvas");o.setAttribute("id",this.options.compress_canvas_id),o.style.display="none",document.body.appendChild(o)}this.inputEle=document.getElementById(this.options.upload_input_id),this.canvasEle=document.getElementById(this.options.compress_canvas_id)}},{key:"onInputChange",value:function(){var t=this,e=this.inputEle.files,n=this.getEmptyArray(e.length).map(function(t){return{file:e[t],name:e[t].name}});if(!(window.FileReader&&this.canvasEle.getContext&&window.atob&&window.Uint8Array&&"blob"===this.options.upload_type))return void this.doTransferComplete(n);var i=this.getEmptyArray(e.length).map(function(n){return t.transferSingleFilePromise(e[n])});Promise.all(i).then(function(e){t.doTransferComplete(e)}).catch(function(e){t.doTransferComplete(n)})}},{key:"transferSingleFilePromise",value:function(t){var e=this;return new Promise(function(n){var i=new FileReader;i.readAsDataURL(t),i.onload=function(){var i=this.result,o=new Image;o.src=i,o.onload=function(){n(e.compressEvent({img:o,file:t}))}}})}},{key:"compressEvent",value:function(t){var e=t.img,n=t.file,i=this.createRandomCanvasEle(),o=i.getContext("2d"),a=e.width,r=e.height,s=this.getMaxScale(a,r);e.width=a*s,e.height=r*s,a*=s,r*=s,i.width=a,i.height=r,o.drawImage(e,0,0,a,r);var l=n.type?n.type:"image/jpeg",u=i.toDataURL(l),c=this.dataURItoBlob(u);return document.body.removeChild(i),{file:c,name:n.name}}},{key:"createRandomCanvasEle",value:function(){var t=(this._getUuid(),document.createElement("canvas"));return t.setAttribute("id",this.options.compress_canvas_id),t.style.display="none",document.body.appendChild(t),t}},{key:"dataURItoBlob",value:function(t){for(var e=t.split(","),n=e[0].match(/:(.*?);/)[1],i=atob(e[1]),o=i.length,a=new Uint8Array(o);o--;)a[o]=i.charCodeAt(o);return new Blob([a],{type:n})}},{key:"doTransferComplete",value:function(t){this.options.transferCallback&&"function"==typeof this.options.transferCallback&&this.options.transferCallback(t),document.body.removeChild(this.inputEle),document.body.removeChild(this.canvasEle),this.canvasEle=null,this.inputEle=null}},{key:"getMaxScale",value:function(t,e){var n=this.options.max_size.width/t,i=this.options.max_size.height/e;return Math.min(n,i)>1?1:Math.min(n,i)}},{key:"_getUuid",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:30,e="",n=1;n<=t;n++){e+=Math.floor(16*Math.random()).toString(16)}return"a"+e}},{key:"getEmptyArray",value:function(t){return Array.from(new Array(t).keys())}}],[{key:"getUuid",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:30,e="",n=1;n<=t;n++){e+=Math.floor(16*Math.random()).toString(16)}return"a"+e}}]),t}();window.CanvasUploaderTrasnsfer=a,e.default=a}]);