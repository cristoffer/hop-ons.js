/*
This is the initial script that is downloaded to the user page.
The purpose of this scipt is to determine if the main script should be downloaded and run or not.
The script should be run on the encapsulating document but not on the encapsulated document (inside iframe).
2kb before minimizing.
*/
/*

javascript:(function(){hopscr=document.createElement('script');hopscr.type='text/javascript';hopscr.src='http://hoptest.cristoffer.cc/script/hop-ons-init.js';document.getElementsByTagName('head')[0].appendChild(hopscr);})();

*/
var stylesheetURLs = new Array();
function hopons_init(){
    var that = this;
    var base = 'http://hoptest.cristoffer.cc/script/';//'script/';
    //base = '/script/';
    var thisname = 'hop_ons_init';
    var hopons_script_url = 'https://rawgit.com/cristoffer/hop-ons.js/8154c7ba22590ee69f4bccc39e3e36607a21d8b5/hop_ons_minified.js';// base+'hop_ons_minified.js'//base+'/hop-ons-main.js';//'new_script/hop_ons_minified.js'// //base + 'hop-ons-main.js';//
    //hopons_script_url = 'new_script/hop-ons-main.js';
    //hopons_script_url = base + 'hop-ons-main.js';
    var hopons_css_url = 'https://rawgit.com/cristoffer/hop-ons.js/8af9fcca66a309b2d0c07807ede41c28ac2b25a8/hop-ons-style.css';// base+'hop-ons-style.css';
    var thisurl = 'hop-ons-init.js'
    //var hopons_mqlimits_url = base+'hop-ons-mqlimits.js';
    
    
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
            if(scrpts[i].getAttribute('name')!==thisname){
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

    that.loadScript = function(h){
        var l = document.createElement('script');
        l.setAttribute('type', 'text/javascript');
        l.setAttribute('src', hopons_script_url);
        h.appendChild(l);
    }

    that.loadCSS = function(h){
        var l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        l.setAttribute('href', hopons_css_url);
        h.appendChild(l);
    }

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
    var hoi = new hopons_init();
    hoi.run();
}


function init() {
    if (arguments.callee.done) return;
    arguments.callee.done = true;
    if (_timer) clearInterval(_timer);
    readyforstuff();
};

/* for Mozilla/Opera9 */

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}

if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = init;
