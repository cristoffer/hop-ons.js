window.hop_ons_media_queries=function(){"use strict";function s(){}function o(){e.clearMqs();while(i.length>0){i.pop()}}function u(){o();f();var n;for(n=0;n<t.length;n++){p(t[n])}i.sort(function(e,t){var n=parseInt(e[1]);var r=parseInt(t[1]);return n-r});e.applyMQ(i);var r,s;for(var n=0;n<i.length;n++){r=e.genericCreateElement(a(i[n]));if(i[n][0]==="max"){s="<"}else{s=">"}r.innerHTML="<p>"+s+""+i[n][1]+"</p>"}}function a(t){return["div",t[0]+""+t[1],[["class","functionalcss"]],[["click",e.setMqSize]],"mqlimit_container",false]}function f(){r=n.contentDocument||n.contentWindow.document;var e=r.getElementsByTagName("link");var i,s;for(i=0;i<e.length;i++){if(e[i].getAttribute("rel")==="stylesheet"){s=e[i].getAttribute("href",2);if(!s.match(/http/)){t.push(s)}else{}}}}function c(e){if(l){if(e.match(/\*\//)){l=false;return e.replace(/[^\*\/]*/,"")}else{return""}}else{if(e.match(/\/\*/)){l=true;if(e.match(/\*\//)){l=false}return e.replace(/\*\/(.*)/,"\n")}else{return e.replace(/\/\/(.*)/,"\n")}}}function h(e){var t=e.split("\n");var n=t.length;var r=/@media/;for(s=0;s<n;s++){t[s]=c(t[s])}n=t.length;for(var s=0;s<n;s++){if(t[s].match(r)&&t[s].match(/screen/)){var o=[,];if(t[s].match(/min-width/)){o[0]="min"}else if(t[s].match(/max-width/)){o[0]="max"}o[1]=t[s].match(/\d+(px|em|pt)/)[0];if(d(o[0],o[1])){i.push(o)}}}}function p(e){var t=new XMLHttpRequest;t.open("GET",e,false);t.onreadystatechange=function(){if(t.readyState===4){if(t.status===200){h(t.responseText)}else{}}};t.send(Object)}function d(e,t){var n=i.length;for(var r=0;r<n;r++){if(i[r][0]==e&&i[r][1]==t){return false}}return true}var e,t=[],n,r,i=[];s.prototype.init=function(t){e=t;n=document.getElementById("hop_ons_iframe");n.addEventListener("load",u)};var l=false;var v;var m={init:function(){v=new s;return v}};return m}();window.hop_ons_preivew=function(){"use strict";function m(){}function g(e,t){var n=Math.max((window.innerWidth-parseInt(e))/2,0);var i=Math.max((window.innerHeight-parseInt(t))/2,0);r.style.top=i+"px";r.style.left=n+"px";r.style.height=t;r.style.width=e}var e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v;m.prototype.setSize=function(e,t){g(e,t)};m.prototype.init=function(){r=document.getElementById("hop_ons_iframe_shadow");i=document.getElementById("hop_ons_iframe_shadow_container");d=document.getElementById("hop_ons_iframe");o=document.getElementsByTagName("body")[0];a=document.getElementById("viewport_size_x");f=document.getElementById("viewport_size_y");l=document.getElementById("device_disp");e=document.getElementById("orientation_disp");s=this;this.setSize(window.innerWidth+"px",window.innerHeight+"px")};m.prototype.setDeviceDisp=function(e){l.innerHTML=e.replace("_"," ")};m.prototype.setDeviceDispBack=function(){l.innerHTML=u.replace("_"," ")};m.prototype.setCurrentDevice=function(e){s.setDeviceDisp(e);u=e;t=false};m.prototype.setOrientation=function(n){e.innerHTML=n;p=n;t=false};m.prototype.assocDevices=function(e,t){c=e;h=t};m.prototype.rotatePreviousBack=function(){if(n){if(h[n].classList.contains("rotateImg")){h[n].classList.remove("rotateImg")}}};m.prototype.rotateDeviceImg=function(e){if(e!=="unsaved"){if(!e.match(/min/)&&!e.match(/max/)||e.match(/mini/)){n=e;t=true;if(h[e].classList.contains("rotateImg")){h[e].classList.remove("rotateImg")}else{h[e].classList.add("rotateImg")}}}};m.prototype.previewSizeOn=function(e){window.clearTimeout(v);var t=e.target.id;if(e.target.tagName==="IMG"||e.target.classList.contains("custom_number")){t=e.target.parentElement.id}if(e.target.tagName==="P"){t=e.target.parentElement.parentElement.id}if(t==="orientation_disp"||t==="toggleportraitlandscape"){t=u;if(u.match(/max/)||u.match(/min/)){return}if(u==="unsaved"){return}}s.setDeviceDisp(t);var n,o,a=0;if(c[t][2]==="landscape"){a=1}n=c[t][a][0];o=c[t][a][1];if(p==="landscape"&&parseInt(n)>parseInt(o)&&t===u){n=c[t][0][0];o=c[t][0][1]}else if(p==="portrait"&&parseInt(n)<parseInt(o)&&t===u){n=c[t][1][0];o=c[t][1][1]}i.classList.add("hop_ons_iframe_shadow_container_visible");r.style.outlineColor="rgba(150,150,150,0.6)";g(n,o)};m.prototype.previewSizeOff=function(e){var t=e.target.id;if(e.target.tagName==="IMG"){t=e.target.parentElement.id}if(e.target.tagName==="P"){t=e.target.parentElement.parentElement.id}if(t==="orientation_disp"||t==="toggleportraitlandscape"){t=u}if(t==="mqlimit_device"){return}s.setDeviceDispBack();var n=d.offsetWidth+"px";var o=d.offsetHeight+"px";r.style.outlineColor="rgba(150,150,150,0)";window.clearTimeout(v);v=window.setTimeout(function(){i.classList.remove("hop_ons_iframe_shadow_container_visible")},300);g(n,o)};var y={init:function(){return new m}};return y}();window.hop_ons_main=function(){"use strict";function m(){i=new hop_ons_preivew.init;r=new hop_ons_media_queries.init;n="http://cristoffer.cc/hoptest/script/";e=this;var t;var s=this.mainElements();var o=s.length;for(t=0;t<o;t++){p[s[t][1]]=this.genericCreateElement(s[t])}var l=this.functionalElements();s=this.makeFunctionalElement(l);o=s.length;var d;for(t=0;t<o;t++){d=this.genericCreateElement(s[t]);this.genericCreateElement(["img",[],[["src",n+l[t][2]],["alt",l[t][3]],["title",l[t][3]]],[],d,false])}l=this.deviceElements();s=this.makeDeviceElement(l);o=s.length;for(t=0;t<o;t++){d=this.genericCreateElement(s[t]);c[l[t][0]]=this.genericCreateElement(["img",[],[["src",n+l[t][3]],["alt",l[t][0]],["title",l[t][0]]],[],d,false]);h[l[t][0]]=[[l[t][1][0],l[t][1][1]],[l[t][2][0],l[t][2][1]],l[t][4],l[t][0]]}var m=this.genericCreateElement(["div","mq_toggle_size",[["class","functionalcss mq_toggle_hidden transitionable"]],[["click",O]],"functional_menu_container",true]);m.innerHTML="Toggle size";p["mq_toggle_size"]=m;i.init();r.init(this);u=document.getElementById("hop_ons_iframe");i.assocDevices(h,c);a=document.getElementById("viewport_size_x");f=document.getElementById("viewport_size_y");T("fullscreen");v=document.getElementById("questionCursor")}function g(e,t){if(e>t){o="landscape"}else{o="portrait"}i.setOrientation(o)}function y(e,t){a.value=parseInt(e);f.value=parseInt(t);g(parseInt(e),parseInt(t))}function b(e){l=e;i.setCurrentDevice(e)}function w(e,t){var n=window.innerHeight;var r=0;var i=parseInt(t);if(n>parseInt(t)){r=(n-i)/2}u.style.height=t;u.style.width=e;u.style.marginTop=r+"px";y(e,t)}function E(){if(X){W("This button toggles orientation of the window between portrait and landscape");return}var e,t;if(!l.match(/max/)&&!l.match(/min/)||l.match(/mini/)){if(o==="landscape"){e=h[l][0][0];t=h[l][0][1]}else{e=h[l][1][0];t=h[l][1][1]}}else{t=u.offsetWidth;e=u.offsetHeight}w(e,t);i.rotateDeviceImg(l)}function S(){var e=document.getElementsByClassName("active"),t;for(t=0;t<e.length;t++){e[t].classList.remove("active")}}function x(e){document.getElementById(e).classList.add("active")}function T(e){P();L();S();if(l!==e){l=e;i.rotatePreviousBack();if(h[e][2]==="landscape"){w(h[e][1][0],h[e][1][1])}else{w(h[e][0][0],h[e][0][1])}}else{E()}if(e.match(/custom/)){B()}else{j()}x(e);b(e)}function N(e,t){S();x(e);L();i.rotatePreviousBack();var n=0;if(t==="landscape"){n=1}w(h[e][n][0],h[e][n][1]);b(e);if(h[e][2]!==t){i.rotateDeviceImg(e)}}function L(){var e=p.mqlimit_container;e.style.visibility="hidden";e.style.bottom=0;e.style.opacity=0;k=false;_()}function A(){var e=p.mqlimit_container;e.style.visibility="visible";e.style.bottom=-e.offsetHeight+"px";e.style.opacity=1;k=true}function O(){if(X){W("This button increases / decreases the window width with 1px<br> this way you can easily see what difference <br> you media query does");return}var e;var t=d[l];if(t[0]==="max"){e=+1}else{e=-1}if(!C){w(u.offsetWidth+e+"px",u.offsetHeight);C=true}else{w(u.offsetWidth-e+"px",u.offsetHeight);C=false}}function M(){p.mq_toggle_size.classList.add("mq_toggle_visible");p.mq_toggle_size.classList.remove("mq_toggle_hidden")}function _(){p.mq_toggle_size.classList.remove("mq_toggle_visible");p.mq_toggle_size.classList.add("mq_toggle_hidden")}function D(){p.save_size_icon.style.visibility="visible"}function P(){p.save_size_icon.style.visibility="hidden"}function H(e,t){var n;e=parseInt(e);t=parseInt(t);for(n in h){if(parseInt(h[n][0][0])===e&&parseInt(h[n][0][1])===t){N(n,"portrait");return false}if(parseInt(h[n][1][0])===e&&parseInt(h[n][1][1])===t){N(n,"landscape");return false}}return true}function B(){document.getElementById("remove_custom").style.visibility="visible"}function j(){document.getElementById("remove_custom").style.visibility="hidden"}function F(){if(X){W("This button removes the active custom size from the list of devices");return}if(l.match(/custom/)){delete p[l];delete h[l];document.getElementById(l).parentNode.removeChild(document.getElementById(l));T("fullscreen")}}function z(t){if(t.keyCode===13){e.setCustomSize()}else{if(t.keyCode===38){var n=t.target.id;if(n==="viewport_size_x"){w(parseInt(p.viewport_size_x.value)+1+"px",parseInt(p.viewport_size_y.value)+"px")}else if(n==="viewport_size_y"){w(p.viewport_size_x.value+"px",parseInt(p.viewport_size_y.value)+1+"px")}}else if(t.keyCode===40){var n=t.target.id;if(n==="viewport_size_x"){w(parseInt(p.viewport_size_x.value)-1+"px",p.viewport_size_y.value+"px")}else if(n==="viewport_size_y"){w(p.viewport_size_x.value+"px",parseInt(p.viewport_size_y.value)-1+"px")}}}}function W(e){p.css_tips_backdrop.classList.remove("css_tips_backdrop_hidden");var t="<h3>"+e+"</h3>";p.css_tips_container.innerHTML=t}function V(e){v.style.left=e.clientX+10+document.body.scrollLeft+"px";v.style.top=e.clientY+10+document.body.scrollTop+"px"}var e,t,n,r,i,s=0,o,u,a,f,l,c=[],h=[],p=[],d=[],v;t=document.getElementsByTagName("body")[0];m.prototype.genericCreateElement=function(e){var t=e[0],n=document.createElement(t),r,i=e[2].length;n.setAttribute("id",e[1]);for(r=0;r<i;r++){n.setAttribute(e[2][r][0],e[2][r][1])}i=e[3].length;for(r=0;r<i;r++){n.addEventListener(e[3][r][0],e[3][r][1])}var s=e[4];if(typeof e[4]==="string"){s=p[e[4]]}if(e[5]){return s.insertBefore(n,e[4].firstChild)}else{return s.appendChild(n)}};m.prototype.makeDeviceElement=function(e){var t=[],n=e.length,r;for(r=0;r<n;r++){t.push(["div",e[r][0],[["class","devicss"]],[["mouseover",i.previewSizeOn],["mouseout",i.previewSizeOff],["click",this.setToThisDeviceSize]],p.device_menu_container,false])}return t};m.prototype.makeFunctionalElement=function(e){var t=[],n=e.length,r;for(r=0;r<n;r++){t.push(["div",e[r][0],[["class","functionalcss"]],e[r][1],p.functional_menu_container,true])}return t};m.prototype.closeBackDrop=function(e){if(e.target.id=="css_tips_backdrop"){p.css_tips_backdrop.classList.add("css_tips_backdrop_hidden")}};m.prototype.cssCodeTips=function(){if(X){W("This button gives you code snippets of how a media query can look to fit the current device");return}p.css_tips_backdrop.classList.remove("css_tips_backdrop_hidden");var e=p.hop_ons_iframe.offsetWidth;var t="<h2>Media Query example for "+l+" in "+o+"</h2>";t+="<br><h3>Mobile First</h3><p>@media screen and (max-width: "+e+"px){...}</p>";t+="<br><h3>Graceful degradation</h3><p>@media screen and (min-width: "+e+"px){...}</p>";p.css_tips_container.innerHTML=t};m.prototype.genericFlipOrientation=function(){E()};var C=false;m.prototype.clearMqs=function(){C=false;L();while(d.length>0){d.pop()}var e=document.getElementById("mqlimit_container");while(e.hasChildNodes()){e.removeChild(e.lastChild)}};m.prototype.applyMQ=function(e){var t,n,r=e.length;for(t=0;t<r;t++){n=e[t][0]+""+e[t][1];d[n]=[e[t][0],e[t][1]]}};var k=false;m.prototype.toggleMQDeviceVisible=function(){if(X){W("This button finds all media queries in your stylesheets<br> and displays them as devices in a list. <br><br> When one of these devices are active an other button appears <br>with which you can toggle the size of the window by 1px to test the effect of the media query.");return}if(k){L()}else{A()}};m.prototype.setMqSize=function(e){if(X){W("This button sets the window size to the exact limit of this media query");return}C=false;var t=e.target.id;if(e.target.tagName==="P"){t=e.target.parentNode.id}S();x(t);i.rotatePreviousBack();M();b(t);g();w(d[t][1],Math.max(parseInt(d[t][1])*1.6,250)+"px")};m.prototype.setToThisDeviceSize=function(e){var t=e.target.id;if(e.target.tagName!=="DIV"||e.target.classList.contains("custom_number")){t=e.target.parentElement.id}if(e.target.tagName==="P"){t=e.target.parentElement.parentElement.id}if(X){W("This button sets the window size to the "+t.replace("_"," ")+" window size");return}T(t)};m.prototype.setCustomSize=function(){if(X){W("This button sets the window size to the values given in the inputfields");return}if(U){var e=parseInt(p.viewport_size_x.value)+"px";var t=parseInt(p.viewport_size_y.value)+"px";S();if(H(e,t)){w(e,t);b("unsaved");D()}else{P()}U=false}};m.prototype.saveSizeAsDevice=function(){if(X){W("This button saves your custom size as a device in the list");return}var t=parseInt(p.viewport_size_x.value)+"px";var r=parseInt(p.viewport_size_y.value)+"px";if(H(t,r)){s++;var o="custom"+s;var u=[];if(t>r){u[0]=[r,t];u[1]=[t,r];u[2]="landscape";u[3]=o}else{u[0]=[t,r];u[1]=[r,t];u[2]="portrait";u[3]=o}P();h[o]=u;var a=e.genericCreateElement(["div",o,[["class","devicss"]],[["mouseover",i.previewSizeOn],["mouseout",i.previewSizeOff],["click",e.setToThisDeviceSize]],p.device_menu_container,true]);a=e.genericCreateElement(["div",o,[["class","devicss_inner transitionable"]],"",a,false]);c[o]=a;e.genericCreateElement(["img",[],[["src",n+"custom_device_2.png"],["alt",o],["title",o]],[],a,false]);var f=e.genericCreateElement(["div","",[["class","custom_number"]],"",a,false]);f.innerHTML="<p>"+s+"</p>";T(o)}};m.prototype.reloadIframe=function(){if(X){W("This button reloads the site without reloading the entire window");return}p.hop_ons_iframe.contentWindow.location.reload()};var I=false;m.prototype.toggleHideTool=function(){if(X){W("This button minimizes the tool");return}if(!I){I=true;L();j();P();p.device_menu_container.style.right="-40px";p.functional_menu_container.style.top="-45px";p.set_custom_size_img.style.visibility="hidden";p.device_disp.style.visibility="hidden";p.orientation_disp.style.visibility="hidden";p.viewport_size_x.style.marginLeft="23px";p.hop_ons_display.style.background="none";p.hop_ons_display.style.border="none";p.hop_ons_container.classList.add("hop_ons_container_minimized");p.toggle_hide_tool_img.setAttribute("src",n+"maximize.png")}else{I=false;p.device_menu_container.style.right="0px";p.functional_menu_container.style.top="0px";p.set_custom_size_img.style.visibility="visible";p.device_disp.style.visibility="visible";p.orientation_disp.style.visibility="visible";p.viewport_size_x.style.marginLeft="3px";p.hop_ons_display.style.background="rgba(55,55,55,0.9)";p.hop_ons_display.style.borderTop="1px solid rgb(100,100,100)";p.hop_ons_display.style.borderLeft="1px solid rgb(100,100,100)";p.hop_ons_display.style.borderRight="1px solid rgb(30,30,30)";p.hop_ons_display.style.borderBottom="1px solid rgb(30,30,30)";p.hop_ons_container.classList.remove("hop_ons_container_minimized");p.toggle_hide_tool_img.setAttribute("src",n+"minimize.png")}};var q,R,U=false;m.prototype.focusBindBackspace=function(){if(X){W("This field shows the current size of the window and can be directly manipulated");return}q=p.viewport_size_x.value;R=p.viewport_size_y.value;p.viewport_size_x.addEventListener("input",e.XvalueChange);p.viewport_size_y.addEventListener("input",e.YvalueChange);window.addEventListener("keydown",z)};m.prototype.XvalueChange=function(){if(q!==p.viewport_size_x.value){U=true;p.set_custom_size_img.classList.remove("CustomInctive");p.set_custom_size_img.classList.add("CustomActive")}};m.prototype.YvalueChange=function(){if(R!=p.viewport_size_y.value){U=true;p.set_custom_size_img.classList.remove("CustomInctive");p.set_custom_size_img.classList.add("CustomActive")}};m.prototype.blurUnbindBackspace=function(){window.removeEventListener("keydown",z);p.viewport_size_x.removeEventListener("input",e.XvalueChange);p.viewport_size_y.removeEventListener("input",e.YvalueChange);p.set_custom_size_img.classList.remove("CustomActive");p.set_custom_size_img.classList.add("CustomInctive")};m.prototype.deviceDispInf=function(){if(X){W("This field shows the current active device name")}return};var X=false;m.prototype.question=function(){if(!X){X=true;document.getElementById("question").style.background="rgb(20,20,20)";document.getElementById("questionCursor").style.display="block"}else{X=false;document.getElementById("question").style.background="rgba(55,55,55,0.9)";p.css_tips_backdrop.classList.add("css_tips_backdrop_hidden");document.getElementById("questionCursor").style.display="none"}};m.prototype.mainElements=function(){var e=window.location.href;if(e.match(/\?/)){e+="&hopons"}else{e+="?&hopons"}return[["div","hop_ons_body_container",[],"",t,false],["iframe","hop_ons_iframe",[["class","transitionable"],["src",e]],[["load",m.init_iframe_document]],"hop_ons_body_container",false],["div","hop_ons_iframe_shadow_container",[["class","hop_ons_iframe_shadow_container_hidden"]],"","hop_ons_body_container",false],["div","hop_ons_iframe_shadow",[["class","transitionable"]],"","hop_ons_iframe_shadow_container",false],["div","hop_ons_container",[["class","hop_ons_container_maximized"]],"","hop_ons_body_container",false],["div","hop_ons_display",[],"","hop_ons_container",false],["div","form_container",[],"","hop_ons_display",false],["form","viewport_size_form",[],"","form_container",false],["input","viewport_size_x",[["class","input_numeric"],["type","number"],["pattern","[0-9.]+"]],[["focus",this.focusBindBackspace],["blur",this.blurUnbindBackspace]],"viewport_size_form",false],["input","viewport_size_y",[["class","input_numeric"],["type","number"],["pattern","[0-9.]+"]],[["focus",this.focusBindBackspace],["blur",this.blurUnbindBackspace]],"viewport_size_form",false],["img","set_custom_size_img",[["class","CustomInactive"],["src",n+"set_custom_size.png"],["title","resize"],["alt","resize"]],[["click",this.setCustomSize]],"viewport_size_form",false],["h1","device_disp",[],[["click",this.deviceDispInf]],"hop_ons_display",false],["h1","orientation_disp",[],[["click",this.genericFlipOrientation],["mouseover",i.previewSizeOn],["mouseout",i.previewSizeOff]],"hop_ons_display",false],["div","remove_custom",[],[["click",F]],"hop_ons_display",false],["img","",[["src",n+"remove_custom.png"],["alt","delete custom"],["title","delete custom"]],[],"remove_custom",false],["div","device_menu_container",[],"","hop_ons_container",false],["div","functional_menu_container",[],"","hop_ons_container",false],["img","save_size_icon",[["title","save size as device"],["alt","save as device"],["src",n+"save_size_icon.png"]],[["click",this.saveSizeAsDevice]],"form_container",false],["div","mqlimit_container",[["class","transitionable mq_device_hidden"]],[],"hop_ons_container",false],["div","css_tips_backdrop",[["class","css_tips_backdrop_hidden"]],[["click",this.closeBackDrop]],"hop_ons_body_container",false],["div","css_tips_container","","","css_tips_backdrop",false],["div","toggle_hide_tool",[],[["click",this.toggleHideTool]],"hop_ons_display",false],["img","toggle_hide_tool_img",[["src",n+"minimize.png"]],[],"toggle_hide_tool",false],["div","questionCursor",[],[],t,false]]};m.prototype.deviceElements=function(){var e=window.innerWidth+"px";var t=window.innerHeight+"px";var n="portrait";var r="landscape";return[["fullscreen",[t,e],[e,t],"fullscreen.png",r],["iphone",["320px","480px"],["480px","320px"],"iphone.png",n],["ihpone5",["320px","568px"],["568px","320px"],"iphone5.png",n],["ipad_mini",["768px","946px"],["946px","768px"],"ipad_mini.png",n],["ipad",["768px","1024px"],["1024px","768px"],"ipad.png",n],["HDTV 1080p",["1080px","1920px"],["1920px","1080px"],"hdtv.png",r]]};m.prototype.functionalElements=function(){return[["question",[["click",this.question]],"question.png","get information about the parts of the script"],["reloadiframe",[["click",this.reloadIframe]],"reload.png","reload inner site"],["toggleportraitlandscape",[["click",this.genericFlipOrientation],["mouseover",i.previewSizeOn],["mouseout",i.previewSizeOff]],"toggleportraitlandscape.png","toggle landscape/portrait"],["css_tips",[["click",this.cssCodeTips]],"csstips.png","css code tip"],["mq_limits",[["click",this.toggleMQDeviceVisible]],"mqlimits.png","Show media queries from YOUR stylesheet"]]};window.onresize=function(){var e=t.offsetWidth;var n=t.offsetHeight;h.fullscreen[0][1]=e;h.fullscreen[0][0]=n;h.fullscreen[1][0]=e;h.fullscreen[1][1]=n;if(e>n){h.fullscreen[3]="landscape"}else{h.fullscreen[3]="portrait"}if(l==="fullscreen"){w(e,n)}else{w(p.hop_ons_iframe.offsetWidth,p.hop_ons_iframe.offsetHeight)}};document.addEventListener("mousemove",V);var $={init:function(){return new m}};return $}();var hop=new hop_ons_main.init
