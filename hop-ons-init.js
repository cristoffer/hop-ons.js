/*
This is the initial script that is downloaded to the user page.
The purpose of this scipt is to determine if the main script should be downloaded and run or not.
The script should be run on the encapsulating document but not on the encapsulated document (inside iframe).
*/
var stylesheetURLs = new Array();

function hopons_init(){
    var that = this;
    var base = 'http://hoptest.cristoffer.cc/script/';
    var thisname = 'hop_ons_init';
    var hopons_script_url = 'new_script/hop-ons-main.js';
    var hopons_css_url = base+'hop-ons-style.css';
    var thisurl = 'hop-ons-init.js'

    
    /*    
    clearDocument...
    Remove everything from document 
    */
    that.clearDocumentBody = function(){
        document.getElementsByTagName('body')[0].innerHTML = '';
    }
    
    that.clearDocumentScripts = function(){
        var scrpts = document.getElementsByTagName('script');
        for(var i=0; i<scrpts.length ; i++){
            if(scrpts[i].getAttribute('name')!=thisname){
                scrpts[i].parentElement.removeChild(scrpts[i]);
            }
        }
    }
    
    that.clearDocumentLinks = function(){
        var links = document.getElementsByTagName('link');
        for(var i=0; i<links.length; i++){
            links[i].parentElement.removeChild(links[i]);
        }
    }
    
    /*    
    loadScript(h)
    create script element and append to head.
    parameter: (parent element)
    */
    that.loadScript = function(h){
        var l = document.createElement('script');
        l.setAttribute('type', 'text/javascript');
        l.setAttribute('src', hopons_script_url);
        h.appendChild(l);
    }

    /*
    TESTED: in chrome
    
    loadCSS(h)
    create css link element and append to head.
    parameter: (parent element)
    */
    that.loadCSS = function(h){
        var l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        l.setAttribute('href', hopons_css_url);
        h.appendChild(l);
    }

    /*
    TESTED: in chrome
    
    run()
    checks url parameters to determine if to run or not.
    if run
        load main script
        load css
        empty document body
    */
    that.run = function(){
        if(self==top){
            that.clearDocumentScripts();
            that.clearDocumentBody();
            that.clearDocumentLinks();
            var h = document.getElementsByTagName('head')[0];
            that.loadScript(h);
            that.loadCSS(h);
        }
    }
}

function readyforstuff(){
    var hoi = new hopons_init(); //window.location.search.substring(1));
    hoi.run();
}


/* borrowed code */

function init() {
    // quit if this function has already been called
    if (arguments.callee.done) return;

    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;

    // kill the timer
    if (_timer) clearInterval(_timer);
    readyforstuff();
};

/* for Mozilla/Opera9 */

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
  document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
  var script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      init(); // call the onload handler
    }
  };
/*@end @*/

/* for webkit */

if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = init;
