
/* JavaScript content from lib/e9f82624cf1d9ed9b3f9882ceaf5e5c5cee1c21f/scripts/satellite-598b0eb364746d4194000ea2.js in folder common */
_satellite.pushAsyncScript(function(event, target, $variables){
  //Link Tracking
//console.log("link tracking is working");

if (_satellite.isOutboundLink(this)) {
    /*	console.log('exit link');
    s.getPercentPageViewed();
    s.clearVars();
    console.log("this is clearing");*/


} else {
    var id = "not found";
    var pos = "no region";
    var urlBrowser = location.href;
    var urlhref = "";
    var href = this.getAttribute("href");
    var target = this.getAttribute("target");
    var isSameUrlNoHash = "";
    var classes = this.getAttribute("class") || "";
    var isTrack = (classes.indexOf('noTrack') > -1) ? false : true;
    var firstChild = this.firstChild || false;
    var parentRegion = this.closest("[data-region]") || false;
    var parentID = this.closest("[id]") || false;
    if (isTrack) {
        
        if (firstChild.tagName == "IMG") {
            id = firstChild.getAttribute('data-ana') || firstChild.getAttribute('data-meta') || firstChild.getAttribute('title') || firstChild.getAttribute('alt') || firstChild.getAttribute('src');
        } else {
            id = this.getAttribute('data-ana') || this.getAttribute('data-meta') || this.getAttribute('title') || this.getAttribute('id') || this.getAttribute('name') || this.outerText.trim() || href || "not found";
        }
        if (parentRegion) {
            pos = this.closest('[data-region]').getAttribute('data-region');
        } else if (parentID) {
            pos = this.closest('[id]').getAttribute('id');
        }

        if (href) {
            urlhref = href.split('#');
            urlBrowser = urlBrowser.split('#');
            isSameUrlNoHash = (urlhref[0] == urlBrowser[0]);

            if (target == '_blank' || href.indexOf('javascript') > -1 || href.indexOf('#') > -1 || isSameUrlNoHash) {
                DTM.linkTraking(id, pos, s.pageName);
            } else {
                DTM.setCookie("s_lt", "prop41=" + id + ";prop42=" + pos + ";prop43=" + s.prop12);
            }
        } else {
            DTM.linkTraking(id, pos, s.prop12);
        }
    } else {
        console.log('no tracking for this link');
    }
}
});
