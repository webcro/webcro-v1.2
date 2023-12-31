
/* JavaScript content from lib/e9f82624cf1d9ed9b3f9882ceaf5e5c5cee1c21f/scripts/satellite-595297d864746d0b950035be.js in folder common */
// Search for BMOINFO on page, if not:
if (typeof BMOINFO == "undefined") {

    // Page Variables, change when necessary
    var pageLang = "en";
    var pageCountry = "Can";
    var pageTemplate = "BlankTemplate";
    var pageContentType = "channel";

    var parser = document.createElement('a');

    // Call the URI of the current page 
    parser.href = location;

    // For IE, fix issue of empty protocol
    if (parser.host == "") {
        parser.href = parser.href;
    }

    // Split components of the url
    parser.protocol; // "http:"
    parser.host; // "bmo.com:3000"
    parser.hostname; // "bmo.com"
    parser.pathname; // "/path/"
    parser.search; // "?search=test"
    parser.hash; // "#hash"

    // Split pathname for individual sections
    var pathName = parser.pathname;
    var pathArray = parser.pathname.split('/');
    pathArray.splice(0,0,"OLB","PERS");
    var siteName = parser.hostname;

    // If browser does not have filter
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /*, thisp */ ) {
            "use strict";
            if (this === void 0 || this === null) throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") throw new TypeError();
            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t)) res.push(val);
                }
            }
            return res;
        };
    }

    // Filter empty elements in array    
    pathArray = pathArray.filter(function (n) {
        return n != ""
    });

    // Create BMOINFO Object
    var BMOINFO = {
        pageName: document.title,
        language: pageLang,
        country: pageCountry,
        template: pageTemplate,
        contentType: pageContentType,
        topic: "",
        site: siteName,
        Sections: pathArray,
    }

}
//End BMOINFO Creator


//DTM Object
var DTM = (function(){
		
	/* Avoid "console" errors in browsers that lack a console. */
	(function() {
		var method;
		var noop = function () {};
		var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}
	})();
	
	/* fix indexOf issue with internet explorer */
	(function() {
		if (!window.dojo) {
			if (!Array.indexOf) {
				Array.prototype.indexOf = function (obj) {
					for (var i = 0; i < this.length; i++) {
						if (this[i] == obj) {
							return i;
						}
					}
					return -1;
				}
			}
		}
	})();
	
	function getLevels(){
		//Get levels from BMOINFO Global Object
		var levels = BMOINFO.Sections;
		//Elements to remove from levels
		var toRemove = ['Staging','Home','Main','main'];
		//removing elements from toRemove Array
		levels = levels.filter( function( el ) {
			return toRemove.indexOf( el ) < 0;
		} );
		
		//sitePrefix in index 0 of the levels array (sitePrefix is a global function in the Mapping file of each site)
		levels.splice(0, 0, sitePrefix);
		
		//Changing the name of the levels for the mapping file ones.
		for (i = 0 ; i < levels.length ; i++){
			if (pageNameMapping[levels[i]])
				levels[i] = pageNameMapping[levels[i]]
		}
		
		return levels;
	}
	
	function getSiteSections(){
		if (BMOINFO.dtmSiteSections && BMOINFO.dtmSiteSections.length > 0) return BMOINFO.dtmSiteSections;
    var levels = getLevels();
		var siteSections = {};
		for (i = 1; i <= levels.length; i++){
			ssToCat = levels.slice(0,i);
			siteSections[i] = ssToCat.join(':');
		}
		
		return siteSections;
	}
	
	function getPageName(){	
		var levels = getLevels();
		var pageName = levels.join(':');
		
		return pageName;
	}
	
	function getHierarchy(){
		var levels = getLevels();
		var hierarchy = levels.join(':');
		
		return hierarchy;
	}
	
	// Linktracking Functions
	function _linkTracking(link41, pos42, name43, linkType){
		linkType = linkType || "Linktracking solution";
		s.linkTrackVars = "prop18,prop41,prop42,prop43";
    s.prop18 = link41;
		s.prop41 = link41;
		s.prop42 = pos42;
		s.prop43 = name43;
		s.tl(this,'o',linkType,null,'navigate');
	}
	
	//Form tracking
	function _setFormTracking(link41, pos42, name43, linkType){
		linkType = linkType || "FormTracking solution";
		s.linkTrackVars = "prop41,prop42,prop43";
		s.prop41 = link41;
		s.prop42 = pos42;
		s.prop43 = name43;
		s.tl(this,'o',linkType,null,'formTracker');
		//console.log(formData);
	}
  
	function _setCookie(c_name,value,expiredays) {
		var exdate=new Date();
		var cookieDomain = _getOnlyDomain(document.domain);
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";domain="+cookieDomain+";path=/";
	}
	
	function _getCookie(c_name) {
		if (document.cookie.length>0) {
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return "";
	}
	
	function _deleteCookie( name, path, domain ) {
		if( _getCookie( name ) ) {
			document.cookie = name + "=" + ((path) ? ";path="+path:"") + ((domain)?";domain="+domain:"") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
		}
	}
	

	
	function _getOnlyDomain(dom){
		domain = dom.split('.');
		domain = domain.splice(-2,2);
		domain = domain.join('.');
		return domain
	}
	
	function _setLTVarsFromCookie(){
		var s_v = _getCookie('s_lt');
		if (s_v!=null && s_v!=""){
			cookie = s_v.split(';');
			s.prop41 = cookie[0].substring(cookie[0].indexOf('=')+1);
			s.prop42 = cookie[1].substring(cookie[1].indexOf('=')+1);
			s.prop43 = cookie[2].substring(cookie[2].indexOf('=')+1);
			_deleteCookie('s_lt', '/', _getOnlyDomain(document.domain));
		}
	}
  
	return{
		pageName: getPageName(),
		hierarchy: getHierarchy(),
		linkTraking: _linkTracking,
		setFormTracking: _setFormTracking,
		siteSections: getSiteSections(),
		setLTVarsFromCookie: _setLTVarsFromCookie,
		getOnlyDomain: _getOnlyDomain,
		setCookie: _setCookie,
		getCookie: _getCookie,
		deleteCookie: _deleteCookie
	}
	
})();
