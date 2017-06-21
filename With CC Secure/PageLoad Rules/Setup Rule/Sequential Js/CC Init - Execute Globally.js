  ccLayer = []; 
	_satellite.getVar('55CookieConsentInit')()
  	window._trackSave=function(){
            var dlCC = [],
                cc = cookieconsent,
                iframes = [],
                layer = window[_satellite.getVar('55_ccLayer')()],
                l,nodes, nLength, dls;
           /* if(window.location === window.parent.location){
                iframes.push(document.querySelectorAll("iframe[src*='"+_topDomain+"']"));
                iframes.push(document.querySelectorAll("iframe[src^='/']"));
                l = iframes.length;
                for(var i=0; i<l; ++i){
                    nodes = iframes[i];
                    nLength = nodes.length;
                    for(var j=0; j<nLength; ++j){
                        try{
                           dlCC.push(nodes[j].contentWindow.layer);
                        }catch(e){
                            continue;
                        }
                    }
                }
            }*/
            var toPush = {
                event : "ccFinished"
              , ccLaunched : "yes"
            }
            cc("consent", "webAnalytics", function(b){toPush.ccWebAnalytics = b ? "accept" : "refuse"})
            cc("consent", "social", function(b){toPush.ccSocial = b ? "accept" : "refuse"})
            cc("consent", "advertising", function(b){toPush.ccAdvertising = b ? "accept" : "refuse"})
            var layer = window[_satellite.getVar('55_ccLayer')()]
            if(typeof layer != "undefined" && _satellite.getVar('55_ccDisplay')() == "module"){
                //setTimeout(function(){
                    layer.push(toPush)
                    dls = dlCC.length
                    for(var k =0; k<dls; ++k)
                      dlCC[k].push(toPush)
                    setTimeout(function(){
                        window.ccFlaged = "yes";
                    },1000)
                //}, 1e3)
            }
        }
   cookieconsent('start');