/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4 */
/*global define */

window.hop_ons_media_queries = (function () {
    "use strict";
    var hop_on, urls = [], iframe, innerDoc, mq_limits = [];
    
    function Hop_ons_media_queries() {
        
        
    }
    
    Hop_ons_media_queries.prototype.init = function (thus) {
        hop_on = thus;
        iframe = document.getElementById('hop_ons_iframe');
        iframe.addEventListener('load', getMQs);
    };
    
    function clearMQs() {
        hop_on.clearMqs();
        while (mq_limits.length > 0) {
            mq_limits.pop();
        }
    }
    
    function getMQs() {
        clearMQs();
        
        getStylesheetURLs();
        /*
        if( urls.length < 1) {
            console.log('could not find any stylesheet urls');
        } else {
            console.log('found ' + urls.length + ' stylesheets')
        }
        */
        
        var i;
        for (i = 0; i < urls.length; i++) {
            styleSheetsHTTP(urls[i]);
        }        
        mq_limits.sort(function(a,b){
            var x=parseInt(a[1]);
            var y=parseInt(b[1]);
            return x-y;
        });
        /*
        if ( mq_limits.length < 1 ) {
            console.log('no media queries found!');
            console.log('can only read format: \'max-width: XX\' or \'min-width: XX\'');
        } else {
            console.log('found ' + mq_limits.length + ' unique media queries');
        }
        */
        hop_on.applyMQ(mq_limits);
        
        var el, comparator;
        for (var i = 0; i<mq_limits.length; i++){
            el = hop_on.genericCreateElement(mqAsDevice(mq_limits[i]));
            if (mq_limits[i][0] === 'max') {
                comparator = '<';
            } else {
                comparator = '>';
            }
            el.innerHTML = '<p>' + comparator + '' + mq_limits[i][1] + '</p>';
            //console.log('added @' + comparator + '' + mq_limits[i][1] + ' to list');
        }
        
    };
    
    function mqAsDevice(mq){
        return ['div', mq[0] + '' + mq[1], [['class', 'functionalcss']], [['click', hop_on.setMqSize]], 'mqlimit_container', false];
    }
    
    function getStylesheetURLs() {
        innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        var list = innerDoc.getElementsByTagName('link');
        var i, temp;
        for (i = 0; i < list.length; i++) {
            if (list[i].getAttribute('rel') === 'stylesheet'){
                temp = list[i].getAttribute('href', 2);
                if (!temp.match(/http/)) {
                    urls.push(temp);
                } else {
                    //console.log('this file can not be retrieved due to cross domain violation: ' + temp);
                }
            }
        }
    }
    
    var comment = false;
    
    function removeLineComment(line) {
        if (comment) {
            if (line.match(/\*\//)) {
                comment = false;
                return line.replace(/[^\*\/]*/, '');
            } else {
                return '';
            }
        } else {
            if (line.match(/\/\*/)) {
                comment = true;
                if (line.match(/\*\//)) {
                    comment = false;
                }
                return line.replace(/\*\/(.*)/,"\n");
            } else {
                return line.replace(/\/\/(.*)/,"\n");    
            }
        }
    }
    
    function parseStyleSheet(sheet) {
        var lines = sheet.split("\n");
        var length = lines.length;
        var mq_regex = /@media/;
        
        for (i = 0; i < length; i++) {
            lines[i] = removeLineComment(lines[i]); 
        }
        
        length = lines.length;
        
        for (var i = 0; i<length; i++){
            if (lines[i].match(mq_regex) && lines[i].match(/screen/)) {
                var mq = [,];
                if (lines[i].match(/min-width/)){
                    mq[0] = 'min';
                } else if (lines[i].match(/max-width/)) {
                    mq[0] = 'max';
                }
                mq[1] = lines[i].match(/\d+(px|em|pt)/)[0];
                if (isNewLimit(mq[0],mq[1])) {
                    mq_limits.push(mq);
                }
            }
        }
    }
    
    function styleSheetsHTTP(url) {
        var client = new XMLHttpRequest();
        client.open('GET', url, false);
        client.onreadystatechange = function () {
            if (client.readyState === 4) {
                if (client.status === 200) {
                    parseStyleSheet(client.responseText);
                } else {
                    //console.log('this file can not be retrieved:' + url);
                }
            }
        }
        client.send(Object);
    }
    
    function isNewLimit(attribute, value){
        var length = mq_limits.length;
        for(var i = 0; i<length; i++){
            if(mq_limits[i][0]==attribute && mq_limits[i][1]==value){
                return false;
            }
        }
        return true;
    }
    
    var hoper;
    var hop = {
        init: function () {
            hoper = new Hop_ons_media_queries();
            return hoper;
        },
    };
    return hop;
}());


/* ======================================================================================= */
/* ==========|XXXXXX\==|XXXXXX\==|XXXXXXX|=|X|=====|X|=|X|=|XXXXXXX|=|X|==========|X|===== */
/* ==========|X|===\X|=|X|===\X|=|X|=======|X|=====|X|=|X|=|X|=======|X|==========|X|===== */
/* ==========|X|===|X|=|X|===|X|=|X|=======|X|=====|X|=|X|=|X|=======|X|==========|X|===== */
/* ==========|X|===/X|=|X|===/X|=|XXXX|====|X|=====|X|=|X|=|XXXX|====|X|==========|X|===== */
/* ==========|XXXXXX/==|XXXXXX/==|X|========\X\===/X/==|X|=|X|========\X\===/\===/X/====== */
/* ==========|X|=======|X|=\X\===|X|=========\X\=/X/===|X|=|X|=========\X\=/XX\=/X/======= */
/* ==========|X|=======|X|==\X\==|X|==========\XVX/====|X|=|X|==========\XVX/\XVX/======== */
/* ==========|X|=======|X|===\X\=|XXXXXXX|=====\X/=====|X|=|XXXXXXX|=====\X/==\X/========= */
/* ======================================================================================= */

window.hop_ons_preivew = (function () {
    "use strict";
    var orientation_disp, spinback, rotated, shadow, sh_container, that, body, current_device, input_x, input_y, device_disp, assoc_devices_dim, assoc_img, orientation, iframe, tmr;
    
    function Hop_ons_preview() {
    }
    
    function setSize(x, y) {
        var ofsx = Math.max((window.innerWidth - parseInt(x)) / 2, 0);
        var ofsy = Math.max((window.innerHeight - parseInt(y)) / 2, 0);
        
        shadow.style.top = ofsy + 'px';
        shadow.style.left = ofsx + 'px';
        shadow.style.height = y;
        shadow.style.width = x;
    }
    
    Hop_ons_preview.prototype.setSize = function (x, y) {
        setSize(x, y);
    };
    
    Hop_ons_preview.prototype.init = function () {
        
        shadow = document.getElementById('hop_ons_iframe_shadow');
        sh_container = document.getElementById('hop_ons_iframe_shadow_container');
        iframe = document.getElementById('hop_ons_iframe');
        body = document.getElementsByTagName('body')[0];
        input_x = document.getElementById('viewport_size_x');
        input_y = document.getElementById('viewport_size_y');
        device_disp = document.getElementById('device_disp');
        orientation_disp = document.getElementById('orientation_disp');
        that = this;
        this.setSize(window.innerWidth + 'px', window.innerHeight + 'px');
    };
    
    Hop_ons_preview.prototype.setDeviceDisp = function (id) {
        device_disp.innerHTML = id.replace('_', ' ');
    };
    
    Hop_ons_preview.prototype.setDeviceDispBack = function () {
        device_disp.innerHTML = current_device.replace('_', ' ');
    };
    
    Hop_ons_preview.prototype.setCurrentDevice = function (str) {
        that.setDeviceDisp(str);
        current_device = str;
        spinback = false;
    };
    
    Hop_ons_preview.prototype.setOrientation = function (str) {
        orientation_disp.innerHTML = str;
        orientation = str;
        spinback = false;
    };
    
    Hop_ons_preview.prototype.assocDevices = function (list, imgs) {
        assoc_devices_dim = list;
        assoc_img = imgs;
    };
    
    Hop_ons_preview.prototype.rotatePreviousBack = function () {
        if(rotated) {
            if (assoc_img[rotated].classList.contains('rotateImg')) {
                assoc_img[rotated].classList.remove('rotateImg');
            }
        }
    }
    
    Hop_ons_preview.prototype.rotateDeviceImg = function (id) {
        if (id !== 'unsaved') {
            if (!id.match(/min/) && !id.match(/max/) || id.match(/mini/)) {
                
                rotated = id;
                spinback = true;
                if (assoc_img[id].classList.contains('rotateImg')) {
                    assoc_img[id].classList.remove('rotateImg');
                } else {
                    assoc_img[id].classList.add('rotateImg');
                }
            }
        }
    };
    
    /* done and tested */
    Hop_ons_preview.prototype.previewSizeOn = function (e) {
        
        window.clearTimeout(tmr);
        var id = e.target.id;
        if (e.target.tagName === 'IMG' || e.target.classList.contains('custom_number')) {
            id = e.target.parentElement.id;
        }
        
        if (e.target.tagName === 'P') {
            id = e.target.parentElement.parentElement.id;
        }
        
        if (id === 'orientation_disp' || id === 'toggleportraitlandscape') {
            id = current_device;
            if (current_device.match(/max/) || current_device.match(/min/)) {
                return;
            }
            if (current_device === 'unsaved') {
                return;
            }
        }
        
        
        that.setDeviceDisp(id);
        
        var x, y, ind = 0;
        
        if (assoc_devices_dim[id][2] === 'landscape') {
            ind = 1;
        }
        
        x = assoc_devices_dim[id][ind][0];
        y = assoc_devices_dim[id][ind][1];
        
        
        
        if (orientation === 'landscape' && parseInt(x) > parseInt(y) && id === current_device) {
            x = assoc_devices_dim[id][0][0];
            y = assoc_devices_dim[id][0][1];
        } else if (orientation === 'portrait' && parseInt(x) < parseInt(y) && id === current_device) {
            x = assoc_devices_dim[id][1][0];
            y = assoc_devices_dim[id][1][1];
        }
        sh_container.classList.add('hop_ons_iframe_shadow_container_visible');
        
        
        shadow.style.outlineColor = 'rgba(150,150,150,0.6)';
        setSize(x, y);
    };
    
    /* done and tested */
    Hop_ons_preview.prototype.previewSizeOff = function (e) {
        
        var id = e.target.id;
        if (e.target.tagName === 'IMG') {
            id = e.target.parentElement.id;
        }
        
        if (e.target.tagName === 'P') {
            id = e.target.parentElement.parentElement.id;
        }
        
        if (id === 'orientation_disp' || id === 'toggleportraitlandscape') {
            id = current_device;
        }
         
        if (id === 'mqlimit_device') {
            return;
        }
        that.setDeviceDispBack();
        var x = iframe.offsetWidth + 'px';
        var y = iframe.offsetHeight + 'px';
        shadow.style.outlineColor = 'rgba(150,150,150,0)';
        
        window.clearTimeout(tmr);
        
        tmr = window.setTimeout(function () {
            sh_container.classList.remove('hop_ons_iframe_shadow_container_visible');
        }, 300);
        
        setSize(x, y);
        
    };
    
    var hop = {
        init: function () {
            return new Hop_ons_preview();
        }
    };
    return hop;
}());

    


/* ================================================================================= */
/* ==========|\=======/|========A========|X|=|\=====X|============================== */
/* ==========|X\=====/X|=======/X\=======|X|=|X\====X|============================== */
/* ==========|XX\===/XX|======/X=X\======|X|=|XX\===X|============================== */
/* ==========|X=X\=/X=X|=====/X===X\=====|X|=|X=X\==X|============================== */
/* ==========|X==XVX==X|====/X=====X\====|X|=|X==X\=X|============================== */
/* ==========|X===X===X|===/XXXXXXXXX\===|X|=|X===X\X|============================== */
/* ==========|X=======X|==/X=========X\==|X|=|X====XX|============================== */
/* ==========|X=======X|=/X===========X\=|X|=|X=====X|============================== */
/* ================================================================================= */

window.hop_ons_main = (function () {
    /* ====== variables ======*/
    "use strict";
    var that, body, base, mq, preview, customs = 0, orientation, iframe, input_x, input_y, current_device, assoc_img = [], assoc_devices_dim = [], assoc_elements_id = [], assoc_mq = [], questionmark;
    body = document.getElementsByTagName('body')[0];
    
    /* ====== Constructor ======*/
    function Hop_ons_main() {
        preview = new hop_ons_preivew.init();
        mq = new hop_ons_media_queries.init();
        base = 'http://cristoffer.cc/hoptest/script/';//'script/';//'../script/'; //
        //base = '../script/'
        that = this;
        
        var i;
        /* generic */
        var list = this.mainElements();
        var length = list.length;
        for (i = 0; i < length; i++) {
            assoc_elements_id[list[i][1]] = this.genericCreateElement(list[i]);
        }
        
        /* functional */
        var full = this.functionalElements();
        list = this.makeFunctionalElement(full);
        length = list.length;
        var par;
        for (i = 0; i < length; i++) {
            par = this.genericCreateElement(list[i]);
            this.genericCreateElement(['img', [], [['src', base + full[i][2]], ['alt', full[i][3]], ['title', full[i][3]]], [], par, false]);
        }
        
        /* devices */
        full = this.deviceElements();        
        list = this.makeDeviceElement(full);
        length = list.length;
        for (i = 0; i < length; i++) {
            par = this.genericCreateElement(list[i]);
            assoc_img[full[i][0]] = this.genericCreateElement(['img', [], [['src', base + full[i][3]], ['alt', full[i][0]], ['title', full[i][0]]], [], par, false]);
            assoc_devices_dim[full[i][0]] = [[full[i][1][0], full[i][1][1]], [full[i][2][0], full[i][2][1]], full[i][4], full[i][0]];
        }
        
        var tg = this.genericCreateElement(['div','mq_toggle_size',[['class','functionalcss mq_toggle_hidden transitionable']],[['click', mqToggleSize]], 'functional_menu_container', true]);
        tg.innerHTML = "Toggle size";
        assoc_elements_id['mq_toggle_size'] = tg;
        
        
        preview.init();
        mq.init(this);
        iframe = document.getElementById('hop_ons_iframe');
        preview.assocDevices(assoc_devices_dim, assoc_img);
        input_x = document.getElementById('viewport_size_x');
        input_y = document.getElementById('viewport_size_y');
        setToDeviceSize('fullscreen');
        questionmark = document.getElementById('questionCursor');
    }
    
    /* ====== Utils ====== */
    
    /*
    0       1   2           3       4       5
    type    id  attributes  binds   parent  first
    */
    /* done and tested */
    Hop_ons_main.prototype.genericCreateElement = function (attr_list) {
        var type = attr_list[0], elm = document.createElement(type), i, length = attr_list[2].length;
        elm.setAttribute('id', attr_list[1]);
        for (i = 0; i < length; i++) {
            elm.setAttribute(attr_list[2][i][0], attr_list[2][i][1]);
        }
        // bind event handlers
        length = attr_list[3].length;
        for (i = 0; i < length; i++) {
            elm.addEventListener(attr_list[3][i][0], attr_list[3][i][1]);
        }
        // Parent
        var par = attr_list[4];
        if (typeof (attr_list[4]) === "string") {
            par = assoc_elements_id[attr_list[4]];
        }
        // first or last
        if (attr_list[5]) {
            return par.insertBefore(elm, attr_list[4].firstChild);
        } else {
            return par.appendChild(elm);
        }
    };
    
    /* done and tested */
    Hop_ons_main.prototype.makeDeviceElement = function (list) {
        var ret = [], length = list.length, i;
        for (i = 0; i < length; i++) {
            ret.push(['div', list[i][0], [['class', 'devicss']], [['mouseover', preview.previewSizeOn], ['mouseout', preview.previewSizeOff], ['click', this.setToThisDeviceSize]], assoc_elements_id.device_menu_container, false]);
        }
        return ret;
    };
    
    /* done and tested */
    Hop_ons_main.prototype.makeFunctionalElement = function (list) {
        var ret = [], length = list.length, i;
        for (i = 0; i < length; i++) {
            ret.push(['div', list[i][0], [['class', 'functionalcss']], list[i][1], assoc_elements_id.functional_menu_container, true]);
        }
        return ret;
    };
    
    /* =========== INTERNAL FUNCTIONS ============= */
    
    /* done and tested */
    function setOrientationDisp(x, y) {
        if (x > y) {
            orientation = 'landscape';
        } else {
            orientation = 'portrait';
        }
        preview.setOrientation(orientation);
    }
    
    /* done and tested */
    function displaySize(x, y) {
        input_x.value = parseInt(x);
        input_y.value = parseInt(y);
        setOrientationDisp(parseInt(x), parseInt(y));
    }
    
    /* done and tested */
    function setDeviceDisp(id) {
        current_device = id;
        preview.setCurrentDevice(id);
    }
    
    /* done and tested */
    function setToSize(x, y) {
        var wh = window.innerHeight;
        var ofsy = 0;
        var yi = parseInt(y);
        if (wh > parseInt(y)) {
            ofsy = (wh - yi) / 2;
        }
        iframe.style.height = y;// + 'px';
        iframe.style.width = x;// + 'px';
        iframe.style.marginTop = ofsy + 'px';
        displaySize(x, y);
    }
    
    /* done and tested */
    function genericFlipOrientation() {
        if (question) {
            informate('This button toggles orientation of the window between portrait and landscape');
            return;
        }
        var x, y;
        if (!current_device.match(/max/) && !current_device.match(/min/) || current_device.match(/mini/)){
            if(orientation === 'landscape') {
                x = assoc_devices_dim[current_device][0][0];
                y = assoc_devices_dim[current_device][0][1];
            } else {
                x = assoc_devices_dim[current_device][1][0];
                y = assoc_devices_dim[current_device][1][1];
            }
        } else {
            y = iframe.offsetWidth;
            x = iframe.offsetHeight;
        }
        setToSize(x, y);
        preview.rotateDeviceImg(current_device);
    }
    
    /* done and tested */
    function clearActive() {
        var list = document.getElementsByClassName('active'), i;
        for (i = 0; i < list.length; i++) {
            list[i].classList.remove('active');
        }
    }
    
    /* done and tested */
    function setActive(id) {
        document.getElementById(id).classList.add('active');
    }
    
    /* done and tested */
    function setToDeviceSize(id) {
        disableSaveAsDevice();
        hideMQDevices();
        clearActive();
        if (current_device !== id) {
            // new device
            current_device = id;
            preview.rotatePreviousBack();
            if (assoc_devices_dim[id][2] === 'landscape') {
                setToSize(assoc_devices_dim[id][1][0], assoc_devices_dim[id][1][1]);
            } else {
                setToSize(assoc_devices_dim[id][0][0], assoc_devices_dim[id][0][1]);
            }
        } else {
            genericFlipOrientation();
        }
        
        if (id.match(/custom/)) {
            removeCustomSizeVisible();    
        } else {
            removeCustomSizeHide();
        }
        
        setActive(id);
        setDeviceDisp(id);
    }
    
    /* done and tested */
    function setToDeviceSizeAndOrientation(id, ori) {
        clearActive();
        setActive(id);
        hideMQDevices();

        preview.rotatePreviousBack();
        var ind = 0;
        if (ori === 'landscape') {
            ind = 1;
        }
        setToSize(assoc_devices_dim[id][ind][0], assoc_devices_dim[id][ind][1]);
        setDeviceDisp(id);
        if (assoc_devices_dim[id][2] !== ori) {
            preview.rotateDeviceImg(id);
        }
    }
    
    /* =========== BINDS ============= */
    
    Hop_ons_main.prototype.closeBackDrop = function (e) {
        if(e.target.id=='css_tips_backdrop'){
            assoc_elements_id.css_tips_backdrop.classList.add('css_tips_backdrop_hidden');
        }
    };
    
    Hop_ons_main.prototype.cssCodeTips = function () {
        if (question) {
            informate('This button gives you code snippets of how a media query can look to fit the current device');
            return;
        }
        
        assoc_elements_id.css_tips_backdrop.classList.remove('css_tips_backdrop_hidden');
        var width = assoc_elements_id.hop_ons_iframe.offsetWidth;
        var inr = "<h2>Media Query example for "+current_device+" in "+orientation+"</h2>"
        inr += "<br><h3>Mobile First</h3><p>@media screen and (max-width: "+width+"px){...}</p>";
        inr += "<br><h3>Graceful degradation</h3><p>@media screen and (min-width: "+width+"px){...}</p>";
        assoc_elements_id.css_tips_container.innerHTML = inr;
    };
    
    Hop_ons_main.prototype.genericFlipOrientation = function () {
        genericFlipOrientation();
    };
    
    var resized = false;
    
    /* done and tested */
    Hop_ons_main.prototype.clearMqs = function () {
        resized = false;
        hideMQDevices();
        while (assoc_mq.length > 0) {
            assoc_mq.pop();
        }
        var par = document.getElementById('mqlimit_container');
        
        while (par.hasChildNodes()){
            par.removeChild(par.lastChild);
        }
        
    }
    
    /* done and tested */
    Hop_ons_main.prototype.applyMQ = function (list) {
        var i, key, length = list.length;
        for (i = 0; i < length; i++) {
            key = list[i][0] + '' + list[i][1];
            assoc_mq[key] = [list[i][0], list[i][1]];
        }
    };
    
    var mqvisible = false;
    
    /* done and tested */
    Hop_ons_main.prototype.toggleMQDeviceVisible = function () {
        if (question) {
            informate('This button finds all media queries in your stylesheets<br> and displays them as devices in a list. <br><br> When one of these devices are active an other button appears <br>with which you can toggle the size of the window by 1px to test the effect of the media query.');
            return;
        }
        if(mqvisible){
            hideMQDevices();
        }else{
            showMQDevices();
        }
    }
    
    function hideMQDevices() {
        var dv = assoc_elements_id.mqlimit_container;
        dv.style.visibility = 'hidden';
        dv.style.bottom = 0;
        dv.style.opacity = 0;
        mqvisible = false;
        hideToggleSizeButton();
    }
    
    function showMQDevices() {
        var dv = assoc_elements_id.mqlimit_container;
        dv.style.visibility = 'visible';
        dv.style.bottom = -dv.offsetHeight+'px';
        dv.style.opacity = 1;
        mqvisible = true;
    }
    
    function mqToggleSize() {
        if (question) {
            informate('This button increases / decreases the window width with 1px<br> this way you can easily see what difference <br> you media query does');
            return;
        }
        var sizr;
        var lim = assoc_mq[current_device];
        if (lim[0] === 'max') {
            sizr = +1;
        } else {
            sizr = -1;
        }
        if (!resized) {
            setToSize(iframe.offsetWidth + sizr + 'px', iframe.offsetHeight);
            resized = true;
        } else {
            setToSize(iframe.offsetWidth - sizr + 'px', iframe.offsetHeight);
            resized = false;
        }
    }
    
    Hop_ons_main.prototype.setMqSize = function (e) {
        if (question) {
            informate('This button sets the window size to the exact limit of this media query');
            return;
        }
        resized = false;
        var id = e.target.id;
        if(e.target.tagName === 'P'){
            id = e.target.parentNode.id;
        }
        
        clearActive();
        setActive(id);
        preview.rotatePreviousBack();
        
        showToggleSizeButton();
        setDeviceDisp(id);
        setOrientationDisp();
        setToSize(assoc_mq[id][1], Math.max((parseInt(assoc_mq[id][1])*1.6), 250) + 'px');
    };
    
    /* done and tested */
    function showToggleSizeButton(){
        assoc_elements_id.mq_toggle_size.classList.add('mq_toggle_visible');
        assoc_elements_id.mq_toggle_size.classList.remove('mq_toggle_hidden');
    }
    
    /* done and tested */
    function hideToggleSizeButton(){
        assoc_elements_id.mq_toggle_size.classList.remove('mq_toggle_visible');
        assoc_elements_id.mq_toggle_size.classList.add('mq_toggle_hidden');
    }
    
    
    
    
    
    /* done and tested */
    Hop_ons_main.prototype.setToThisDeviceSize = function (e) {
        var id = e.target.id;
        if (e.target.tagName !== 'DIV' || e.target.classList.contains('custom_number')) {
            id = e.target.parentElement.id;
        }
        
        if (e.target.tagName === 'P') {
            id = e.target.parentElement.parentElement.id;
        }
        
        if (question) {
            informate('This button sets the window size to the ' + id.replace('_', ' ') + ' window size');
            return;
        }
        
        setToDeviceSize(id);
    };
    
    /* done and tested */
    function enableSaveAsDevice() {
        assoc_elements_id.save_size_icon.style.visibility = 'visible';
    };
    
    /* done and tested */
    function disableSaveAsDevice() {
        assoc_elements_id.save_size_icon.style.visibility = 'hidden';
    }
    
    /* done and tested */
    function isNewSize(x, y) {
        var key;
        x = parseInt(x);
        y = parseInt(y);
        for (key in assoc_devices_dim) {
            if (parseInt(assoc_devices_dim[key][0][0]) === x && parseInt(assoc_devices_dim[key][0][1]) === y) {
                setToDeviceSizeAndOrientation(key, 'portrait');
                return false;
            }
            
            if (parseInt(assoc_devices_dim[key][1][0]) === x && parseInt(assoc_devices_dim[key][1][1]) === y) {
                setToDeviceSizeAndOrientation(key, 'landscape');
                return false;
            }
        }
        return true;
    }
    
    /* done and tested */
    Hop_ons_main.prototype.setCustomSize = function () {
        if (question) {
            informate('This button sets the window size to the values given in the inputfields');
            return;
        }
        if(new_val){
            var x = parseInt(assoc_elements_id.viewport_size_x.value) + 'px';
            var y = parseInt(assoc_elements_id.viewport_size_y.value) + 'px';
            clearActive();

            if (isNewSize(x, y)) {
                setToSize(x, y);
                setDeviceDisp('unsaved');
                enableSaveAsDevice();
            } else {
                disableSaveAsDevice();
            }
            new_val = false;
        }
    };
    
    function removeCustomSizeVisible() {
        document.getElementById('remove_custom').style.visibility = 'visible';
    }
    
    function removeCustomSizeHide() {
        document.getElementById('remove_custom').style.visibility = 'hidden';
    }
    
    function removeCustomSize() {
        if (question) {
            informate('This button removes the active custom size from the list of devices');
            return;
        }
        if (current_device.match(/custom/)) {
            delete assoc_elements_id[current_device];
            delete assoc_devices_dim[current_device];
            document.getElementById(current_device).parentNode.removeChild(document.getElementById(current_device));   
            setToDeviceSize('fullscreen');
        }
    }
    
    /* done and tested */
    Hop_ons_main.prototype.saveSizeAsDevice = function () {
        if (question) {
            informate('This button saves your custom size as a device in the list');
            return;
        }
        var x = parseInt(assoc_elements_id.viewport_size_x.value) + 'px';
        var y = parseInt(assoc_elements_id.viewport_size_y.value) + 'px';
        
        if ( isNewSize(x, y)) {
            customs++;
            var id = 'custom' + customs;
            var list = [];
            if (x > y) {
                list[0] = [y, x];
                list[1] = [x, y];
                list[2] = 'landscape';
                list[3] = id;
            } else {
                list[0] = [x, y];
                list[1] = [y, x];
                list[2] = 'portrait';
                list[3] = id;
            }

            disableSaveAsDevice();
            assoc_devices_dim[id] = list;
            
            var par = that.genericCreateElement(['div', id, [['class', 'devicss']], [['mouseover', preview.previewSizeOn], ['mouseout', preview.previewSizeOff], ['click', that.setToThisDeviceSize]], assoc_elements_id.device_menu_container, true]);
            
            
            par = that.genericCreateElement(['div', id, [['class', 'devicss_inner transitionable']], '', par, false]);
            
            assoc_img[id] = par;
            that.genericCreateElement(['img', [], [['src', base + 'custom_device_2.png'], ['alt', id], ['title', id]], [], par, false]);
            var nr = that.genericCreateElement(['div', '', [['class', 'custom_number']], '', par, false]);
            nr.innerHTML = '<p>' + customs + '</p>';
            setToDeviceSize(id);
        }
    };
    
    /* done and tested */
    Hop_ons_main.prototype.reloadIframe = function () {
        if (question) {
            informate('This button reloads the site without reloading the entire window');
            return;
        }
        assoc_elements_id.hop_ons_iframe.contentWindow.location.reload();
    };
    
    var minimized = false;
    Hop_ons_main.prototype.toggleHideTool = function () {
        if (question) {
            informate('This button minimizes the tool');
            return;
        }
        if( !minimized ) {
            minimized = true;
            hideMQDevices();
            removeCustomSizeHide();
            disableSaveAsDevice();
            assoc_elements_id.device_menu_container.style.right = '-40px';
            assoc_elements_id.functional_menu_container.style.top = '-45px';
            
            assoc_elements_id.set_custom_size_img.style.visibility = 'hidden';
            assoc_elements_id.device_disp.style.visibility = 'hidden';
            assoc_elements_id.orientation_disp.style.visibility = 'hidden';
            assoc_elements_id.viewport_size_x.style.marginLeft = '23px';
            
            assoc_elements_id.hop_ons_display.style.background = 'none';
            assoc_elements_id.hop_ons_display.style.border = 'none';
            assoc_elements_id.hop_ons_container.classList.add('hop_ons_container_minimized');
            assoc_elements_id.toggle_hide_tool_img.setAttribute('src', base + 'maximize.png');
            
        } else {
            minimized = false;
            
            
            
            assoc_elements_id.device_menu_container.style.right = '0px';
            assoc_elements_id.functional_menu_container.style.top = '0px';
            
            assoc_elements_id.set_custom_size_img.style.visibility = 'visible';
            assoc_elements_id.device_disp.style.visibility = 'visible';
            assoc_elements_id.orientation_disp.style.visibility = 'visible';
            assoc_elements_id.viewport_size_x.style.marginLeft = '3px';
            
            assoc_elements_id.hop_ons_display.style.background = 'rgba(55,55,55,0.9)';
            assoc_elements_id.hop_ons_display.style.borderTop = '1px solid rgb(100,100,100)';
            assoc_elements_id.hop_ons_display.style.borderLeft = '1px solid rgb(100,100,100)';
            assoc_elements_id.hop_ons_display.style.borderRight = '1px solid rgb(30,30,30)';
            assoc_elements_id.hop_ons_display.style.borderBottom = '1px solid rgb(30,30,30)';
            
            assoc_elements_id.hop_ons_container.classList.remove('hop_ons_container_minimized');
            assoc_elements_id.toggle_hide_tool_img.setAttribute('src', base + 'minimize.png');
        }
        
    };
    
    var old_x, old_y, new_val = false;
    
    
    Hop_ons_main.prototype.focusBindBackspace = function () {
        if (question) {
            informate('This field shows the current size of the window and can be directly manipulated');
            return;
        }
        old_x = assoc_elements_id.viewport_size_x.value;
        old_y = assoc_elements_id.viewport_size_y.value;
        assoc_elements_id.viewport_size_x.addEventListener('input', that.XvalueChange);
        assoc_elements_id.viewport_size_y.addEventListener('input', that.YvalueChange);
        
        window.addEventListener('keydown', bindBackspace);
        
    }
    
    Hop_ons_main.prototype.XvalueChange = function () {
        if(old_x !== assoc_elements_id.viewport_size_x.value){
            new_val = true;
            assoc_elements_id.set_custom_size_img.classList.remove('CustomInctive');
            assoc_elements_id.set_custom_size_img.classList.add('CustomActive');    
        }
    }
    
    
    Hop_ons_main.prototype.YvalueChange = function () {
        if(old_y != assoc_elements_id.viewport_size_y.value){
            new_val = true;
            assoc_elements_id.set_custom_size_img.classList.remove('CustomInctive');
            assoc_elements_id.set_custom_size_img.classList.add('CustomActive');
        }
    }
    
    Hop_ons_main.prototype.blurUnbindBackspace = function () {
        window.removeEventListener('keydown', bindBackspace);
        assoc_elements_id.viewport_size_x.removeEventListener('input', that.XvalueChange);
        assoc_elements_id.viewport_size_y.removeEventListener('input', that.YvalueChange);
        assoc_elements_id.set_custom_size_img.classList.remove('CustomActive');
        assoc_elements_id.set_custom_size_img.classList.add('CustomInctive');
    }
    
    function bindBackspace(e) {
        if (e.keyCode === 13){
            that.setCustomSize();
        }
        else
        {
            // arrow increase/decrease value
            if (e.keyCode === 38) {
                // up arrow, increase
                var id = e.target.id;
                if (id === 'viewport_size_x') {               
                    setToSize((parseInt(assoc_elements_id.viewport_size_x.value) + 1) + 'px', parseInt(assoc_elements_id.viewport_size_y.value) + 'px');
                } else if (id === 'viewport_size_y') {
                    setToSize(assoc_elements_id.viewport_size_x.value + 'px', (parseInt(assoc_elements_id.viewport_size_y.value) + 1 + 'px'));
                }
            } else if (e.keyCode === 40) {
                // down arrow, decrease
                var id = e.target.id;
                if (id === 'viewport_size_x') {
                    setToSize((parseInt(assoc_elements_id.viewport_size_x.value) - 1) + 'px', assoc_elements_id.viewport_size_y.value + 'px');
                } else if (id === 'viewport_size_y') {
                    setToSize(assoc_elements_id.viewport_size_x.value + 'px', (parseInt(assoc_elements_id.viewport_size_y.value) - 1) + 'px');
                }
                
            }
        }
    }
    
    Hop_ons_main.prototype.deviceDispInf = function () {
        if (question) {
            informate('This field shows the current active device name');
        }
        return;
    }
    
    function informate(str) {
        assoc_elements_id.css_tips_backdrop.classList.remove('css_tips_backdrop_hidden');
        var inr = '<h3>' + str + '</h3>'; 
        assoc_elements_id.css_tips_container.innerHTML = inr;
    };

    var question = false;
    Hop_ons_main.prototype.question = function () {
        if(!question) {
            question = true;
            document.getElementById('question').style.background = 'rgb(20,20,20)';
            document.getElementById('questionCursor').style.display = 'block';
        } else {
            question = false;
            document.getElementById('question').style.background = 'rgba(55,55,55,0.9)';
            assoc_elements_id.css_tips_backdrop.classList.add('css_tips_backdrop_hidden');
            document.getElementById('questionCursor').style.display = 'none';
        }
    }
    
    
    
    function moveCursor(e) {
        questionmark.style.left = e.clientX + 10 + document.body.scrollLeft + 'px';
        questionmark.style.top = e.clientY + 10 + document.body.scrollTop + 'px';
    }
    
    Hop_ons_main.prototype.mainElements = function () {
        /* ADD NEW STATIC ELEMENTS HERE!!!
            0       1       2               3           4        5
            type,   id,     attribute[[]],  bind[[]],   parent   first
        */
        var location = window.location.href;
        if (location.match(/\?/)) {
            location += '&hopons';
        } else {
            location += '?&hopons';
        }
        
        
        return [
            ['div', 'hop_ons_body_container', [], '', body, false],
            ['iframe', 'hop_ons_iframe', [['class', 'transitionable'], ['src', location]], [['load', Hop_ons_main.init_iframe_document]], 'hop_ons_body_container', false],
            ['div', 'hop_ons_iframe_shadow_container', [['class', 'hop_ons_iframe_shadow_container_hidden']], '', 'hop_ons_body_container', false],
            ['div', 'hop_ons_iframe_shadow', [['class', 'transitionable']], '', 'hop_ons_iframe_shadow_container', false],
            ['div', 'hop_ons_container', [['class', 'hop_ons_container_maximized']], '', 'hop_ons_body_container', false],
            ['div', 'hop_ons_display', [], '', 'hop_ons_container', false],
            ['div', 'form_container', [], '', 'hop_ons_display', false],
            ['form', 'viewport_size_form', [], '', 'form_container',  false],
            ['input', 'viewport_size_x', [['class', 'input_numeric'], ['type', 'number'], ['pattern',"[0-9.]+"]], [['focus', this.focusBindBackspace],['blur', this.blurUnbindBackspace]], 'viewport_size_form', false],
            ['input', 'viewport_size_y', [['class', 'input_numeric'], ['type', 'number'], ['pattern',"[0-9.]+"]], [['focus', this.focusBindBackspace],['blur', this.blurUnbindBackspace]], 'viewport_size_form', false],
            ['img', 'set_custom_size_img', [['class', 'CustomInactive'],['src', base + 'set_custom_size.png'],['title', 'resize'], ['alt', 'resize']], [['click', this.setCustomSize]], 'viewport_size_form', false],
            ['h1', 'device_disp', [], [['click', this.deviceDispInf]], 'hop_ons_display', false],
            ['h1', 'orientation_disp', [], [['click', this.genericFlipOrientation], ['mouseover', preview.previewSizeOn], ['mouseout', preview.previewSizeOff]], 'hop_ons_display', false],
            ['div', 'remove_custom', [], [['click', removeCustomSize]], 'hop_ons_display', false],
            ['img', '', [['src', base + 'remove_custom.png'],['alt', 'delete custom'],['title', 'delete custom']], [], 'remove_custom', false],
            ['div', 'device_menu_container', [], '', 'hop_ons_container', false],
            ['div', 'functional_menu_container', [], '', 'hop_ons_container', false],
            ['img', 'save_size_icon', [['title', 'save size as device'], ['alt', 'save as device'], ['src', base + 'save_size_icon.png']],  [['click', this.saveSizeAsDevice]], 'form_container', false],
            ['div', 'mqlimit_container', [['class', 'transitionable mq_device_hidden']], [], 'hop_ons_container', false],
            ['div', 'css_tips_backdrop', [['class', 'css_tips_backdrop_hidden']], [['click', this.closeBackDrop]], 'hop_ons_body_container', false],
            ['div', 'css_tips_container', '', '', 'css_tips_backdrop', false],
            ['div', 'toggle_hide_tool', [], [['click', this.toggleHideTool]], 'hop_ons_display', false],
            ['img', 'toggle_hide_tool_img', [['src', base + 'minimize.png']], [], 'toggle_hide_tool', false],
            ['div', 'questionCursor', [], [], body, false]
        ];
    };
    
    Hop_ons_main.prototype.deviceElements = function () {
        /* device name, portrait x y, landscape x y, img src, default orientation */
        
        var x = window.innerWidth + 'px';
        var y = window.innerHeight + 'px';
        var portrait = 'portrait';
        var landscape = 'landscape';
        
        
        return [
            ['fullscreen', [y, x] , [x, y], 'fullscreen.png', landscape],
            ['iphone', ['320px', '480px'], ['480px', '320px'], 'iphone.png', portrait],
            ['ihpone5', ['320px', '568px'], ['568px', '320px'], 'iphone5.png', portrait],
            ['ipad_mini', ['768px', '946px'], ['946px', '768px'], 'ipad_mini.png', portrait],
            ['ipad', ['768px', '1024px'], ['1024px', '768px'], 'ipad.png', portrait],
            ['HDTV 1080p', ['1080px', '1920px'], ['1920px', '1080px'], 'hdtv.png', landscape]
        ];
    };
    
    Hop_ons_main.prototype.functionalElements = function () {
        return [
            ['question', [['click', this.question]], 'question.png', 'get information about the parts of the script'],
            ['reloadiframe', [['click', this.reloadIframe]], 'reload.png', 'reload inner site'],
            ['toggleportraitlandscape', [['click', this.genericFlipOrientation], ['mouseover', preview.previewSizeOn], ['mouseout', preview.previewSizeOff]], 'toggleportraitlandscape.png', 'toggle landscape/portrait'],
            ['css_tips', [['click', this.cssCodeTips]], 'csstips.png', 'css code tip'],
            ['mq_limits', [['click', this.toggleMQDeviceVisible]], 'mqlimits.png', 'Show media queries from YOUR stylesheet']
        ];
    };
    
    window.onresize = function () {
        var w = body.offsetWidth;
        var h = body.offsetHeight;
        assoc_devices_dim.fullscreen[0][1] = w;
        assoc_devices_dim.fullscreen[0][0] = h;
        assoc_devices_dim.fullscreen[1][0] = w;
        assoc_devices_dim.fullscreen[1][1] = h;
        if (w > h) {
            assoc_devices_dim.fullscreen[3] = 'landscape';
        } else {
            assoc_devices_dim.fullscreen[3] = 'portrait';
        }
        
        if (current_device === 'fullscreen') {
            setToSize(w, h);
        } else {
            setToSize(assoc_elements_id.hop_ons_iframe.offsetWidth, assoc_elements_id.hop_ons_iframe.offsetHeight);
        }
    };
    
    document.addEventListener('mousemove', moveCursor);
    var hop = {
        init: function () {
            return new Hop_ons_main();
        }
    };
    return hop;
    
}());

var hop = new hop_ons_main.init();
