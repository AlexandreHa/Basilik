
    return function() {
        var e = window._cc;
        CookieConsent = window.CookieConsent;
        CookieConsent.cookielessTracking = window.__55cookielessTracking || false;
        CookieConsent.randomClientId = Math.random() * 2147483647 << 0;
        CookieConsent.gaCcAccount = "UA-48838450-1";
        CookieConsent._cookieLessTracking = function(e, t, n, r, i) {
            var s = document.getElementsByTagName("script")[0];
            if (s) {
                var o = document.createElement("img");
                o.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/collect?v=1&tid=" + e + "&cid=" + t + "&t=event&ec=" + n + "&ea=" + r + "&el=" + i + "&dh=" + document.location.hostname + "&aip=1&z=" + CookieConsent.randomClientId;
                o.alt = "";
                s.parentNode.insertBefore(o, s)
            }
        };
        CookieConsent.defaults = {
            dataLayer: "dataLayer",
            timers: {
                delay: 2500,
                length: 25e3,
                implicit: 0
            },
            path: "/",
            domain: function() {
                var t, n, r = "stld=cookie",
                    i = document.location.hostname.split(".", -1);
                for (t = i.length - 1; t >= 0; t--) {
                    n = i.slice(t).join(".");
                    document.cookie = r + ";domain=." + n + ";";
                    if (e.indexOf(document.cookie, r) > -1) {
                        document.cookie = r.split("=", -1)[0] + "=;domain=." + n + ";expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        return n
                    }
                }
            }(),
            lang: "fr",
            bitmask: 63,
            approvalLength: 33696e6,
            approvalScroll: 50,
            scrollElt: window,
            mode: null,
            iconSet: null,
            fr: {
                bar: {
                    title: "Ce site utilise des cookies.",
                    copy: {
                        start: "Les cookies garantissent une expérience de navigation optimale. Vous pouvez ",
                        modify: "modifier les réglages",
                        end: " d'acceptation des cookies pour ce site."
                    },
                    legal: {
                        label: "juridique"
                    },
                    sep: "|",
                    close: {
                        label: "fermer",
                        icon: "X"
                    }
                },
                list: {},
                items: [{
                    bit: 1,
                    configurable: 0,
                    group: "functional",
                    name: "Fonctionnement",
                    abbr: "F",
                    description: "Ces cookies garantissent le fonctionnement du site et permettent son optimisation.",
                    help: "Ces cookies ne peuvent pas être désactivés car cela empêcherait le fonctionnement correct du site."
                }, {
                    bit: 8,
                    configurable: 1,
                    group: "webAnalytics",
                    name: "Web Analytics",
                    abbr: "W",
                    description: "Ces cookies permettent le suivi anonyme et agrégé des outils de Web Analytics.",
                    help: "Désactiver ces cookies empêche les outils de Web Analytics de collecter des informations d'audience et de navigation."
                }, {
                    bit: 2,
                    configurable: 1,
                    group: "social",
                    name: "Social",
                    abbr: "S",
                    description: "Ces cookies vous permettent d'interagir avec les modules sociaux présents sur le site.",
                    help: "Désactiver ces cookies empêche toute interaction avec les réseaux sociaux."
                }, {
                    bit: 4,
                    configurable: 1,
                    group: "advertising",
                    name: "Publicité",
                    abbr: "A",
                    description: "Ces cookies permettent de mieux cibler les publicités qui vous sont proposées sur Internet.",
                    help: "Désactiver ces cookies empêche la collecte d'information permettant un meilleur ciblage publicitaire."
                }],
                help: {
                    abbr: "i",
                    text: "Cliquez sur chaque catégorie pour activer ou désactiver l'utilisation des cookies. le bandeau de couleur indique si les cookies sont actifs (vert, sur la gauche) ou inactifs (rouge, sur la droite)."
                },
                legalURL: null
            },
            styles: {
                configurable: {
                    textColor: "#fff",
                    disabledTextColor: "#999",
                    highlightTextColor: "#00F9A2",
                    linkColor: "#fff",
                    activeLinkColor: "#fff",
                    fontFamily: "helvetica, sans-serif",
                    backgroundColor: "#000",
                    backgroundOpacity: "0.8",
                    listOpacity: "0.8",
                    tileBackgroundColor: "#000",
                    tileWidth: 320,
                    choiceOpacity: "0.6",
                    acceptColor: "#00F9A2",
                    refuseColor: "#FF0249",
                    position: "bottom"
                }
            }
        };
        CookieConsent.getCssRules = function() {
            return [].concat(["@font-face {font-family:'cc-symbols';" + "src:url(" + CookieConsent.defaults.iconSet[0] + ") format('woff')" + ",url(" + CookieConsent.defaults.iconSet[1] + ") format('embedded-opentype')" + ",url(" + CookieConsent.defaults.iconSet[2] + ") format('truetype');" + "font-weight:normal;" + "font-style:normal;" + "}", ".ccpane{position:absolute;z-index:16777000;color:#fff;}", ".ccpane, .ccpane *{-moz-box-sizing:content-box;-webkit-box-sizing:content;box-sizing:content-box;margin:0;padding:0;font-weight:normal;font-style:normal;font-family:" + CookieConsent.defaults.styles.configurable.fontFamily + ";font-size:11px;line-height:14px;vertical-align:baseline;text-decoration:none;text-align:left;}", ".ccpane .ccbackg{position:absolute;z-index:0;top:0;right:0;left:0;bottom:0;background:" + CookieConsent.defaults.styles.configurable.backgroundColor + ";filter:alpha(opacity=" + CookieConsent.defaults.styles.configurable.backgroundOpacity * 100 + ");opacity:" + CookieConsent.defaults.styles.configurable.backgroundOpacity + ";}", ".cclist .ccbackg{filter:alpha(opacity=" + CookieConsent.defaults.styles.configurable.listOpacity * 100 + ");opacity:" + CookieConsent.defaults.styles.configurable.listOpacity + ";}", ".ccpane .ccwrap{position:relative;z-index:1;}", ".ccpane ul, .ccpane li{list-style:none;}", ".ccpane a{color:" + CookieConsent.defaults.styles.configurable.linkColor + ";} .ccpane a:visited, .ccpane a:link{text-decoration:underline;} .ccpane a:active, .ccpane a:hover{text-decoration:none;color:" + CookieConsent.defaults.styles.configurable.activeLinkColor + "}", ".ccpane p, .ccpane span, .ccpane li{color:" + CookieConsent.defaults.styles.configurable.textColor + ";}", ".ccbar{left:0;" + (CookieConsent.defaults.styles.configurable.position == "top" ? "top:0;" : "bottom:0;position:fixed;width:100%;") + "right:0;}", ".ccbar .ccwrap{padding:10px;margin:0 auto;}", ".ccbar .ccb-title{font-weight:700;font-size:13px;}", ".ccbar .ccb-actions{position:absolute;z-index:2;top:0;right:0;padding:7px;}", ".ccbar .ccb-close-icon{font-family:'cc-symbols';cursor:pointer;transition:color 0.2s;-webkit-transition:color 0.2s}", ".ccbar a.ccb-close-label{text-decoration:none;}", ".ccbar .ccb-close:hover span, .ccbar .ccb-close:hover a {color:#FF0249;}", ".cclist{width:" + CookieConsent.defaults.styles.configurable.tileWidth + "px;overflow:hidden;}", ".cclist .ccl-help{position:relative;padding:10px;}", ".cclist .ccl-help-content{position:relative;z-index:1}", ".cclist .ccl-help-icon{font-family:'cc-symbols';line-height:28px;font-size:24px;padding-left:4px;float:right;}", ".cclist .ccl-help-copy{font-size:11px;line-height:14px;display:block;zoom:1;}", ".cclist .ccl-cookie{position:relative;overflow:hidden;border-top:1px solid #000;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-webkit-touch-callout;none;}", ".ccpane.cclist{right:5px;" + (CookieConsent.defaults.styles.configurable.position === "top" ? "top:45px;" : "bottom:45px;position:fixed;") + "}", , ".cclist .ccl-cookie ul{}", ".ccl-cookie li.ccl-choice{position:absolute;z-index:0;top:0;bottom:0;width:0px;filter:alpha(opacity=" + CookieConsent.defaults.styles.configurable.choiceOpacity * 100 + ");opacity:" + CookieConsent.defaults.styles.configurable.choiceOpacity + ";overflow:hidden;}", ".cclist li.ccl-accept{background:" + CookieConsent.defaults.styles.configurable.acceptColor + ";left:0;}", ".cclist li.ccl-refuse{background:" + CookieConsent.defaults.styles.configurable.refuseColor + ";right:0;}", ".ccl-cookie li.ccl-choice .ccl-choice-icon{position:absolute;z-index:0;top:50%;margin-top:-16px;width:32px;height:32px;vertical-align:middle;font-size:32px;line-height:32px;font-family:'cc-symbols'}", ".ccl-cookie li.ccl-accept .ccl-choice-icon{left:28px;}", ".ccl-cookie li.ccl-refuse .ccl-choice-icon{right:32px;}", ".ccl-cookie li.desc{position:relative;z-index:1;width:" + (CookieConsent.defaults.styles.configurable.tileWidth - 32) + "px;padding:8px;cursor:pointer;}", ".ccl-cookie li.desc ul{position:relative;z-index:1;}", ".cclist .ccl-lock{position:absolute;top:7px;right:7px;font-family:'cc-symbols';}", ".ccl-cookie .ccl-copy{overflow:hidden;}", ".ccl-cookie .ccl-copy .ccl-icon{float:left;width:32px;height:32px;padding-right:8px;font-size:32px;line-height:32px;font-family:'cc-symbols'}", ".ccl-cookie .ccl-copy .ccl-text{float:left;width:" + (CookieConsent.defaults.styles.configurable.tileWidth - 72) + "px;}", ".ccl-cookie .ccl-copy .ccl-text .ccl-name{display:block;font-weight:700;}", ".ccl-cookie .ccl-copy .ccl-text .ccl-desc{}", ".ccl-cookie .ccl-copy{color:" + CookieConsent.defaults.styles.configurable.textColor + ";transition:color 1s;-webkit-transition:color 1s;}", ".ccl-cookie .disabled .ccl-copy li, .ccl-cookie .disabled .ccl-copy span{color:" + CookieConsent.defaults.styles.configurable.disabledTextColor + ";}"])
        };
        CookieConsent.defaults.iconSet = _satellite.getVar('55CookieConsentFont');
        window.cookieconsent = function() {
            var t = "1.2",
                n = new Array,
                r = function(e) {
                    return e.charAt(0).toUpperCase() + e.slice(1)
                },
                i = e.Router.create({
                    configure: function(t, n, r) {
                        e.invoke(CookieConsent.configure, r)
                    },
                    show: function(t, n, r) {
                        var i = r[0];
                        e.ccCloseSend = false;
                        if (CookieConsent.cookielessTracking && !CookieConsent.launchSend) {
                            CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Launch", document.location.pathname);
                        }
                        if (CookieConsent.instance) CookieConsent.instance.show().then(function() {
                            switch (i) {
                                case "footer":
                                    e.hadInteraction = true;
                                    break
                            }
                        })
                    },
                    start: function(t, i, s) {
                        var o = s[0] && s[0].constructor === Object ? s[0] : {},
                            u = typeof s[1] == "function" ? s[1] : function() {},
                            a = function() {
                                var t = +(new Date),
                                    n = +e.store.ccus;
                                if (n && t - n < CookieConsent.defaults.approvalLength) {
                                    window[CookieConsent.defaults.dataLayer].push({
                                        event: "ccClose"
                                    });
                                    return true
                                }
                                if (CookieConsent.cookielessTracking) {
                                    CookieConsent.launchSend = !0;
                                    CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Launch", document.location.pathname);
                                }
                                return false
                            }(),
                            f = function() {
                                var t, i, s, o, u, a, f, l, c, h;
                                for (t = 0, s = CookieConsent.defaults[CookieConsent.defaults.lang].items, i = s.length; t < i; t++) {
                                    f = s[t].group;
                                    l = s[t].bit;
                                    c = "consent" + r(f);
                                    h = {
                                        event: c,
                                        _55internal: true
                                    };
                                    a = e.store.ccbm & l;
                                    if (a) n.push({
                                        event: c + ".accept",
                                        _55internal: true
                                    });
                                    else n.push({
                                        event: c + ".refuse",
                                        _55internal: true
                                    });
                                    h[c] = a ? "accept" : "refuse";
                                    h.event = c;
                                    n.push(h)
                                }
                            },
                            l = function(t) {
                                var n = e.store.ccbm,
                                    r = n,
                                    i, s = function() {
                                        if (CookieConsent.instance.bar.displayState) t.hide(p)
                                    },
                                    o = function() {
                                        var e = CookieConsent.defaults.timers.implicit;
                                        clearTimeout(i);
                                        i = setTimeout(s, e ? e : CookieConsent.defaults.timers.length)
                                    },
                                    l = function() {
                                        var e = CookieConsent.defaults[CookieConsent.defaults.lang].items,
                                            t = [],
                                            n = 0,
                                            i = e.length,
                                            s;
                                        for (; n < i; n++) {
                                            s = e[n].group.charAt(0).toUpperCase();
                                            if (r & e[n].bit) s += "y";
                                            else s += "n";
                                            t.push(s)
                                        }
                                        return t.join("-")
                                    },
                                    c = function() {
                                        e.ccCloseSend = true;
                                        f();
                                        window._trackSave();
                                        if (!window.tmplPV) window[CookieConsent.defaults.dataLayer].push({
                                            event: "_virtualPageview"
                                        });
                                        if (CookieConsent.cookielessTracking && e.hasClickPopin) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Closing", l())
                                    },
                                    h = function() {
                                        function n(e, t) {
                                            return e.contains ? e != t && e.contains(t) : !!(e.compareDocumentPosition(t) & 16)
                                        }

                                        function r(e) {
                                            var t = e.target || e.srcElement;
                                            if (t.nodeName.toLowerCase() == "a") return true;
                                            if (t.parentNode.nodeName.toLowerCase() == "a") return true;
                                            return false
                                        }

                                        function i() {
                                            var r = !!window["csLayer"] ? window["csLayer"].length - 1 : -1;
                                            for (r; r >= 0; r -= 1) {
                                                if (window["csLayer"][r].event === "gtm.linkClick" && !n(t.bar.element("legal"), window["csLayer"][r]["gtm.element"]) && !n(t.list.element("pane"), window["csLayer"][r]["gtm.element"]) && !n(t.bar.element("pane"), window["csLayer"][r]["gtm.element"])) {
                                                    e.ccCloseSend = true;
                                                    return true
                                                }
                                            }
                                            r = !!window["dataLayer"] ? window["dataLayer"].length - 1 : -1;
                                            for (r; r >= 0; r -= 1) {
                                                if (window["dataLayer"][r].event === "gtm.linkClick" && !n(t.bar.element("legal"), window["dataLayer"][r]["gtm.element"]) && !n(t.list.element("pane"), window["dataLayer"][r]["gtm.element"]) && !n(t.bar.element("pane"), window["dataLayer"][r]["gtm.element"])) {
                                                    e.ccCloseSend = true;
                                                    return true
                                                }
                                            }
                                            return false
                                        }
                                        return function(s) {
                                            var u = s.target || s.srcElement;
                                            if (t.bar.displayState && !r(s) && !i() && !n(t.bar.element("legal"), s.target)) {
                                                if (!n(t.list.element("pane"), s.target) && !n(t.bar.element("pane"), s.target)) {
                                                    o();
                                                    e.store.ccus = +(new Date);
                                                    e.saveCookie();
                                                    if (!e.ccCloseSend) c();
                                                    if (CookieConsent.cookielessTracking && !e.hasClickPopin) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Closing", "No interaction")
                                                }
                                            } else {
                                                if (t.bar.displayState && r(s) && !i() && !n(t.bar.element("legal"), s.target) && !n(t.list.element("pane"), s.target) && !n(t.bar.element("pane"), s.target) && !e.ccCloseSend) {
                                                    o();
                                                    e.store.ccus = +(new Date);
                                                    e.saveCookie();
                                                    if (CookieConsent.cookielessTracking && !e.hasClickPopin) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Closing", "No interaction");
                                                    document.querySelector("a#cc55anchor").click()
                                                }
                                            }
                                        }
                                    }(),
                                    p = function(t) {
                                        if (!e.ccCloseSend) c()
                                    },
                                    d, v = function() {
                                        if (window.innerHeight) return window.innerHeight;
                                        else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
                                        else if (document.body) return document.body.clientHeight;
                                        return 0
                                    },
                                    m = function() {
                                        var n, r, i = function() {
                                                return u && u.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                                            },
                                            s = function() {
                                                return (u && u.scrollTop || document.body.scrollTop || document.documentElement.scrollTop || 0) + a
                                            },
                                            u = CookieConsent.defaults.scrollElt !== window && CookieConsent.defaults.scrollElt || null,
                                            a = v(),
                                            f = window["performance"] && window["performance"]["timing"] && window["performance"]["timing"]["domInteractive"] || (new Date).getTime(),
                                            l = function() {
                                                clearTimeout(n);
                                                n = setTimeout(p, 32)
                                            },
                                            p = function() {
                                                a = v()
                                            },
                                            d = function() {
                                                clearTimeout(r);
                                                r = setTimeout(m, 32)
                                            },
                                            m = function() {
                                                var n, r, u;
                                                n = s();
                                                r = Math.floor((n - a) / a * 100);
                                                if (t.bar.displayState && (r >= CookieConsent.defaults.approvalScroll || n >= i()) && !e.ccCloseSend) e.store.ccus = +(new Date), e.saveCookie(), u = true;
                                                if (u) {
                                                    e.removeEventListener(window, "resize", l);
                                                    e.removeEventListener(CookieConsent.defaults.scrollElt, "scroll", d);
                                                    e.removeEventListener(document.body || document.getElementsByTagName("body")[0], "mousedown", h);
                                                    try {
                                                        e.removeEventListener(document.querySelector("iframe[src*='" + document.domain + "']").contentDocument.body, "mousedown", h)
                                                    } catch (f) {}
                                                    if (CookieConsent.cookielessTracking && !e.hasClickPopin) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Closing", "No interaction");
                                                    o();
                                                    if (!e.ccCloseSend) c()
                                                }
                                            };
                                        return {
                                            start: function() {
                                                e.addEventListener(window, "resize", l);
                                                e.addEventListener(CookieConsent.defaults.scrollElt, "scroll", d);
                                                e.addEventListener(document.body || document.getElementsByTagName("body")[0], "mousedown", h);
                                                try {
                                                    e.addEventListener(document.querySelector("iframe[src*='" + document.domain + "']").contentDocument.body, "mousedown", h)
                                                } catch (t) {}
                                            }
                                        }
                                    }();
                                m.start();
                                t.on("list.show", function() {
                                    e.hasClickPopin = true;
                                    d = 1
                                });
                                t.on("mask.change", function(t) {
                                    if (t !== r) r = t, e.store.ccbm = t, e.ccCloseSend = false;
                                    e.saveCookie()
                                });
                                t.on("user.quit", function() {
                                    if (!e.hadInteraction) e.hadInteraction = true, e.store.ccus = +(new Date), e.saveCookie();
                                    if (!e.hasClickPopin && CookieConsent.cookielessTracking) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Closing", "Choiceless");
                                    p()
                                });
                                t.on("delay.quit", function() {
                                    var t = !!CookieConsent.defaults.timers.implicit;
                                    if (t) e.store.ccus = +(new Date), e.saveCookie();
                                    p(t)
                                });
                                t.on("show", function() {
                                    if (CookieConsent.defaults.timers.implicit) o()
                                });
                                t.on("mousemove", function() {
                                    if (CookieConsent.defaults.timers.implicit) o()
                                });
                                t.on("hide", function() {
                                    var t = !!CookieConsent.defaults.timers.implicit;
                                    if (t)
                                        if (!e.hadInteraction) e.hadInteraction = true, e.store.ccus = +(new Date), e.saveCookie();
                                    clearTimeout(i)
                                });
                                t.on("cookie.activation", function(e, t) {
                                    if (CookieConsent.cookielessTracking) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Preferences", "Activate_" + t)
                                });
                                t.on("cookie.deactivation", function(e, t) {
                                    if (CookieConsent.cookielessTracking) CookieConsent._cookieLessTracking(CookieConsent.gaCcAccount, CookieConsent.randomClientId, document.location.hostname, "Preferences", "Deactivate_" + t)
                                });
                                if (!a) t.show(u)
                            };
                        if (o.mode && e.predefinedModes[o.mode]) o.mode = e.predefinedModes[o.mode];
                        setTimeout(function() {
                            new CookieConsent.create(o, l)
                        }, CookieConsent.defaults.timers.delay)
                    },
                    consent: function(t, n, r) {
                        var i, s, o, u, a, f;
                        for (i = 0, o = CookieConsent.defaults[CookieConsent.defaults.lang].items, s = o.length; i < s; i++) e.definitionList[o[i].group] = o[i].bit;
                        u = typeof r[0] == "string" ? r[0] : "";
                        a = typeof r[1] == "function" ? r[1] : function() {};
                        e.store = !!document.cookie.match("__55CC=([^;$]*)") ? JSON.parse(document.cookie.match("__55CC=([^;$]*)")[1]) : e.store;
                        f = e.definitionList[u] ? !!(e.store.ccbm & e.definitionList[u]) && !!e.store.ccus : false;
                        a(f)
                    }
                });
            if (e.currMask = e.store.ccbm, !e.currMask) e.store.ccbm = CookieConsent.defaults.bitmask, e.saveCookie();
            else CookieConsent.defaults.bitmask = e.currMask;
            return function() {
                return i.dispatch(arguments[0], e.slice(arguments, 1))
            }
        }()
    }