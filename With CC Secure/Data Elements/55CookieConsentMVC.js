
    return function() {
        var _cc = window._cc;
        _cc.Model = _cc.klass(_cc.EventEmitter, {
            constructor: function() {
                var e = this;
                if (arguments.length) _cc.invoke(_cc.Model.prototype.set, arguments, this);
                this._update = {
                    keys: [],
                    timer: null
                };
                this.on("change", function(t) {
                    var n = e._update.keys;
                    if (!~_cc.indexOf(n, t)) n.push(t);
                    clearTimeout(e._update.timer);
                    e._update.timer = setTimeout(function() {
                        e.emit("update", n);
                        n.splice(0, n.length)
                    }, 0)
                })
            },
            _isModel: true,
            set: function(e, t) {
                var n = this._data = this._data || {},
                    r, i;
                if (arguments.length == 1)
                    if (typeof e == "string") return this._fromJSON(e);
                    else return this._fromHash(e);
                if (typeof e != "string") return this.emit("error", new TypeError("invalid argument 0"));
                if (t && t.constructor === Object) return this._fromHash(t, e);
                r = (this._hooks || {})[e] || null;
                i = n[e];
                if (typeof t == "function") t = _cc.invoke(t, [this]);
                if (typeof r == "function") t = _cc.invoke(r, [t], this);
                if (_cc.isArray(t)) t = JSON.parse(JSON.stringify(t));
                if (!n.hasOwnProperty(e)) this.emit("add>" + e, t), this.emit("add", e, t);
                n[e] = t;
                this.emit("change>" + e, t, i);
                this.emit("change", e, t, i);
                return this
            },
            _fromHash: function(e, t) {
                var n = this,
                    r = new _cc.Iterator(e),
                    i = r.enumerate(),
                    s = 0,
                    o = i.length,
                    t = !!t ? t + "." : "";
                for (; s < o; s++) n.set(t + i[s][0], i[s][1]);
                return this
            },
            _fromJSON: function(e) {
                var t;
                try {
                    t = JSON.parse(e)
                } catch (n) {
                    return this.emit("error", n)
                }
                return this._fromHash(t)
            },
            hooks: null,
            hook: function(e, t) {
                var n;
                if (arguments.length == 1 && e && e.constructor == Object) return function(e, t) {
                    var n = new _cc.Iterator(e),
                        r = n.enumerate(),
                        i = 0,
                        s = r.length;
                    for (; i < s; i++) t.hook(r[i][0], r[i][1]);
                    return t
                }(e, this);
                n = this._hooks = this._hooks || {};
                if (typeof e != "string") return this.emit("error", new TypeError("invalid argument 0"));
                if (arguments.length == 1) return n[e];
                if (typeof t != "function") return this.emit("error", new TypeError("invalid argument 1"));
                n[e] = t;
                return this
            },
            get: function(e) {
                var t = this,
                    n = this._data || {},
                    r, i, s, o = [];
                if (!arguments.length) return null;
                if (arguments.length == 1)
                    if (typeof e == "string") return n[e];
                    else r = [e];
                if (arguments.length > 1) r = _cc.slice(arguments);
                for (i = 0, s = r.length; i < s; i++) {
                    if (typeof r[i] != "string")
                        if (typeof r[i] == "number") r[i] = r[i].toString();
                        else r[i] = "", setTimeout(function() {
                            t.emit("error", new TypeError("invalid key"))
                        }, 0);
                    o.push(this.get(r[i]))
                }
                return o
            },
            iterator: function() {
                return new _cc.Iterator(this._data || {})
            },
            enumerate: function() {
                return this.iterator().enumerate()
            },
            length: function() {
                var e = this._data || {},
                    t = new _cc.Iterator(e, true);
                return t.length()
            },
            serialize: function() {
                return _cc.serialize(this._data || {})
            }
        });
        _cc.ready = _cc.Promise.create();
        _cc.docHead = null;
        _cc.docElt = null;
        _cc.docBody = null;
        _cc.browser = {
            hasBlob: function() {
                var e, t;
                try {
                    e = Blob(["test"], {
                        type: "text/plain"
                    });
                    t = URL.createObjectURL(e);
                    if ("msClose" in e) throw new Error;
                    URL.revokeObjectURL(t)
                } catch (n) {
                    return false
                }
                return true
            }()
        };
        _cc.addEventListener = function() {
            if (window.addEventListener) return function(e, t, n, r) {
                return e.addEventListener(t, n, !!r)
            };
            return function(e, t, n) {
                return e.attachEvent("on" + t, function(e) {
                    var e = e || window.event;
                    e.target = e.target || e.srcElement;
                    e.relatedTarget = e.relatedTarget || e.fromElement || e.toElement;
                    e.isImmediatePropagationStopped = e.isImmediatePropagationStopped || false;
                    e.preventDefault = e.preventDefault || function() {
                        e.returnValue = false
                    };
                    e.stopPropagation = e.stopPropagation || function() {
                        e.cancelBubble = true
                    };
                    e.stopImmediatePropagation = e.stopImmediatePropagation || function() {
                        e.stopPropagation();
                        e.isImmediatePropagationStopped = true
                    };
                    if (!e.isImmediatePropagationStopped) n(e)
                })
            }
        }();
        _cc.removeEventListener = function() {
            if (window.removeEventListener) return function(e, t, n, r) {
                return e.removeEventListener(t, n, !!r)
            };
            return function(e, t, n) {
                e.detachEvent("on" + t, n)
            }
        }();
        _cc.NodeExpression = function() {
            function r(e, n, i, s) {
                var o = e,
                    u, a = [],
                    f, l, c, h, p, d;
                while (u = t.exec(o), u)
                    if (!~_cc.indexOf(a, u[1])) a.push(u[1]);
                if (a.length) {
                    s.once("update", function(t) {
                        var o, u, f;
                        if (!n) return;
                        for (o = 0, u = t.length; o < u; o++)
                            if (!!~_cc.indexOf(a, t[o])) {
                                f = true;
                                break
                            }
                        if (f) setTimeout(function() {
                            r(e, n, i, s)
                        }, 0)
                    });
                    for (f = new _cc.Iterator(a), l = f.enumerate(), c = 0, h = l.length; c < h; c++) p = l[c][1], o = o.replace("$$" + p + "$$", typeof(d = s.get(p), d) != "undefined" ? d : "$$" + p + "$$")
                }
                n.nodeValue = o
            }

            function i(e, t, n, r, s) {
                var o = n.next(),
                    u = o[1];
                if (u === t) s += 1;
                if (u === e)
                    if (!s) return r.join("");
                    else s -= 1;
                r.unshift(u);
                return _cc.invoke(i, [e, t, n, r, s])
            }

            function s(e, t, r, i) {
                var o = e.next(),
                    u = o[1];
                if (n.hasOwnProperty(u)) _cc.invoke(n[u], arguments, this);
                else t.unshift(u);
                return _cc.invoke(s, arguments, this)
            }
            var e = /(?![\{\[])\*(?![\]\}])/,
                t = /\$\$([\w\.]*)\$\$/g,
                n = {
                    "^": function(t, n, r, i) {
                        r(n.splice(0, n.length).join(""))
                    },
                    "#": function o(e, t, n, r) {
                        var o = t.splice(0, t.length).join("");
                        r.push(function(e) {
                            e.id = o
                        })
                    },
                    ".": function u(e, t, n, r) {
                        var u = t.splice(0, t.length).join("");
                        r.push(function(e) {
                            var t = e.className;
                            if (!t.length) {
                                e.className = u
                            } else {
                                e.className += " " + u
                            }
                        })
                    },
                    "]": function(t, n, r, s) {
                        var o = i("[", "]", t, [], 0),
                            u = o.search("="),
                            a = o.split("=")[0],
                            f = o.slice(u + 1).replace(/"|'/g, "");
                        s.push(function(e) {
                            e.setAttribute(a, f)
                        })
                    },
                    "}": function(t, n, s, o) {
                        var u = i("{", "}", t, [], 0),
                            a = document.createTextNode("");
                        o.push(function(e, t, n) {
                            if (e.nodeType === 3 || !e.tagName) r(u, e, t, n);
                            else r(u, a, t, n), e.appendChild(a)
                        })
                    },
                    $: function(t, n, r, i) {
                        var s = n.splice(0, n.length).join(""),
                            o = this;
                        if (o && o._isView) i.push(function(e) {
                            if (!o._elements[s]) o._elements[s] = e;
                            else if (_cc.isArray(o._elements[s])) o._elements[s].push(e);
                            else o._elements[s] = [o._elements[s], e]
                        })
                    }
                };
            return {
                parse: function(t, n, r) {
                    var i, o = n && n._isView ? n : null,
                        u = r ? r : o ? o._data : n && (n._isCollection || n._isModel) ? n : new _cc.Model(n || {}),
                        a, f, l, c, h, p = [],
                        d, v = [],
                        m = [],
                        g, y = function(e) {
                            if (e)
                                if (g) throw new TypeError("node already defined");
                                else g = e !== "text" ? document.createElement(e) : document.createTextNode("");
                            return g
                        };
                    if (a = e.exec(t), a && u._isCollection) {
                        i = document.createDocumentFragment();
                        h = t.slice(0, a.index);
                        t = h + t.slice(a.index + 1);
                        for (l = 0, f = u.models(), c = f.length; l < c; l++) i.appendChild(_cc.NodeExpression.parse(t, o, f[l]));
                        return i
                    }
                    try {
                        h = ("^" + t).split("");
                        while (h.length) p.push(h.pop());
                        d = new _cc.Iterator(p);
                        _cc.invoke(s, [d, v, y, m], o)
                    } catch (b) {
                        if (!(b instanceof _cc.errors.StopIterationError))
                            if (o) o.emit("error", b);
                            else throw b
                    }
                    if (m.length)
                        for (l = 0, c = m.length; l < c; l++) _cc.invoke(m[l], [g, o, u]);
                    return g
                }
            }
        }();
        _cc.HTMLExpression = function() {
            function t(n, r, i) {
                var s = n.next(),
                    o = s[1];
                if (e.hasOwnProperty(o)) _cc.invoke(e[o], arguments, this);
                else r.push(o);
                return _cc.invoke(t, arguments, this)
            }

            function n(e, t, r, i, s) {
                var o = r.next(),
                    u = o[1];
                i.push(u);
                if (u === t) s += 1;
                if (u === e)
                    if (!s) return;
                    else s -= 1;
                return _cc.invoke(n, [e, t, r, i, s])
            }

            function r(e, t, n, i, s) {
                var o = n.next(),
                    u = o[1];
                if (u === t) s += 1;
                if (u === e)
                    if (!s) return i.join("");
                    else s -= 1;
                i.push(u);
                return _cc.invoke(r, [e, t, n, i, s])
            }
            var e = {
                "+": function(t, n, r) {
                    var i = n.length ? n.splice(0, n.length).join("") : "",
                        s;
                    if (i) s = _cc.NodeExpression.parse(i, this), r().appendChild(s)
                },
                ">": function(t, n, r) {
                    var i = n.length ? n.splice(0, n.length).join("") : "",
                        s = _cc.NodeExpression.parse(i, this);
                    r().appendChild(s);
                    r(s)
                },
                "(": function(t, n, i) {
                    var s = r(")", "(", t, [], 0);
                    i().appendChild(_cc.HTMLExpression.parse(s, this))
                },
                "[": function(t, r, i) {
                    r.push("[");
                    _cc.invoke(n, ["]", "[", t, r, 0])
                },
                "{": function(t, r, i) {
                    r.push("{");
                    _cc.invoke(n, ["}", "{", t, r, 0])
                }
            };
            return {
                parse: function(e, n) {
                    var r = document.createDocumentFragment(),
                        i = n && n._isView ? n : null,
                        s = i ? i._data : n && (n._isModel || n._isCollection) ? n : new _cc.Model(n || {}),
                        o = r,
                        u = function(e) {
                            if (e) o = e;
                            return o
                        },
                        a = [],
                        f = new _cc.Iterator((e + "+").split(""));
                    try {
                        _cc.invoke(t, [f, a, u], i || s)
                    } catch (l) {
                        if (!(l instanceof _cc.errors.StopIterationError))
                            if (i) i.emit("error", l);
                            else throw l
                    }
                    return r
                }
            }
        }();
        _cc.View = _cc.klass(_cc.EventEmitter, {
            _isView: true,
            constructor: function(e, t) {
                this._template = typeof e == "string" ? e : "";
                this._data = t && (t._isModel || t._isCollection) ? t : new this._Model(t || {});
                this._elements = {};
                this._fragment = _cc.HTMLExpression.parse(this._template, this);
                if (this._DOMEvents) this.DOMEvent(this._DOMEvents)
            },
            _Model: _cc.Model,
            model: function(e) {
                var t = new _model;
                if (t._isModel) this._Model = e;
                return this
            },
            _fragmentStatus: 1,
            html: function() {
                if (!this._fragmentStatus) this.emit("error", new Error("template fragment already requested"));
                this._fragmentStatus = 0;
                return this._fragment
            },
            clone: function() {
                var e = new _cc.View(this._template, this._data);
                return e
            },
            element: function(e) {
                return _cc.isArray(this._elements[e]) ? [].concat(this._elements[e]) : this._elements[e]
            },
            DOMEvent: function(e, t, n, r) {
                var i = this,
                    s, o, u;
                if (arguments.length <= 2 && e && e.constructor === Object) {
                    u = !!arguments[1];
                    for (o in e)(function(e, t) {
                        var n;
                        for (n in t) i.DOMEvent(e, n, t[n], u)
                    })(o, e[o])
                } else if (s = i.element(e), s)(function(e, n, i) {
                    var s = t.split(" "),
                        o = 0,
                        u = s.length;
                    for (; o < u; o++) _cc.addEventListener(e, s[o], function(e) {
                        _cc.invoke(n, [e, i], i)
                    }, !!r)
                })(s, n, i);
                return i
            }
        });
        _cc.StyleSheet = _cc.Promise.extend(function(e) {
            var t = /^([^{]*){(.*)(?=})/,
                n = function() {
                    var e;
                    if (_cc.browser.hasBlob) return 1;
                    else {
                        try {
                            e = document.createElement("style");
                            e.innerText = e.textContent = "";
                            e = null
                        } catch (t) {
                            return 4
                        }
                        return 2
                    }
                }();
            return {
                constructor: function(t, r, i) {
                    var s = this,
                        t = t || "",
                        r = r || [],
                        o, u, a, f = function() {
                            s._sheet = o.sheet;
                            s._sheetstatus = 1;
                            s.resolve(s, o)
                        };
                    _cc.invoke(e, [], this);
                    if (n === 1) u = Blob(r, {
                        type: "text/css"
                    }), a = URL.createObjectURL(u), o = this.node = _cc.NodeExpression.parse("link" + t), o.rel = "stylesheet", o.addEventListener("load", f), o.href = a;
                    else if (n === 2) o = this.node = _cc.NodeExpression.parse("style" + t), o.innerText = o.textContent = r.join("");
                    else if (n === 4) o = {
                        sheet: document.createStyleSheet()
                    }, o.sheet.cssText = r.join(""), document.styleSheets["css55"] = o;
                    if (i) s.then(function(e, t) {
                        _cc.invoke(i, [e, t], e)
                    });
                    _cc.ready.then(function() {
                        if (n !== 4) _cc.docHead.appendChild(o);
                        if (n !== 1) setTimeout(f, 0)
                    })
                },
                _sheetstatus: 0,
                set: function(e, t, r) {
                    var i = this,
                        s = i._sheet,
                        o = i._rules = i._rules || {},
                        u = o.hasOwnProperty(e) ? true : false,
                        a = u ? o[e] : (s.cssRules || s.rules).length,
                        r = r || "";
                    if (n !== 4) u ? s.deleteRule(a) : o[e] = a, s.insertRule(t + "{" + r + "}", a);
                    else u ? s.removeRule(a) : o[e] = a, s.addRule(t, r, a);
                    return i
                },
                get: function(e) {
                    var t = this,
                        n = t._sheet,
                        r = t._rules || {};
                    if (r.hasOwnProperty(e)) return (n.cssRules || n.rules)[r[e]].style
                },
                rule: function(e, t, n) {
                    var r = this,
                        i;
                    if (arguments.length == 1)
                        if (e && e.constructor === Object) {
                            for (i in e) r.set(i, e[i]);
                            return
                        } else return r.get(e);
                    r.set(e, t, n);
                    return r.get(e)
                }
            }
        });
        _cc.Transition = _cc.klass(_cc.EventEmitter, function(e, t) {
            var n = t.styleSheet = new _cc.StyleSheet("#sleipFX-transitions"),
                r = t.CSSTransition = "getComputedStyle" in window && "DOMStringMap" in window && "TransitionEvent" in window ? 1 : "WebKitTransitionEvent" in window ? 2 : 0,
                i = t.transitionCssProperty = r & 1 ? "transition" : r & 2 ? "-webkit-transition" : "",
                s = t.transitionEndEvent = r & 1 ? "transitionend" : r & 2 ? "webkitTransitionEnd" : "",
                o = !!window.getComputedStyle,
                u = o ? window.getComputedStyle(document.createElement("div")) : document.documentElement.currentStyle,
                a = 0;
            t.transitionShim = function(e, t, n) {
                var r = this,
                    e, i;
                for (i in t)
                    if (t.hasOwnProperty(i)) e.style[i] = t[i];
                n()
            };
            return {
                constructor: function() {
                    var e = this,
                        t = _cc.slice(arguments),
                        r = e._shim = typeof t[t.length - 1] == "function" ? t.pop() : _cc.Transition.transitionShim,
                        s = e._properties = e._properties || [],
                        f, l, c, h, p = [],
                        d;
                    e._transits = {};
                    if (t.length == 1 && t[0] && t[0].constructor === Object) f = t[0];
                    else if (t.length == 2) f = {}, f[t[0]] = t[1];
                    for (l in f)
                        if (f.hasOwnProperty(l))(function(e, t) {
                            var n;
                            if ((o ? u.getPropertyValue(e) : u[e]) == undefined) {
                                delete f[e];
                                return
                            }
                            n = [e];
                            s.push(e);
                            if (typeof t == "number") n.push(t.toString() + "s");
                            else if (typeof t == "string") n = n.concat(t.split(" "));
                            else if (t && t.constructor === Object) {
                                n.push((t.duration || 0).toString());
                                if (t.hasOwnProperty("timingFunction")) n.push(t.timingFunction);
                                if (t.hasOwnProperty("delay")) n.push(t.delay.toString())
                            }
                            p.push(n.join(" "))
                        })(l, f[l]);
                    c = e.uid = "sleipFX-trans-" + ++a;
                    h = e.cssSelector = "." + c;
                    d = e.cssText = i + ":" + p.join(", ");
                    n.then(function(t) {
                        e.cssRule = t.rule(c, h, d)
                    })
                },
                animate: function() {
                    if (!r) return function(e, t, n) {
                        var r = this,
                            t = t || {},
                            i = r._attributes || [],
                            s = r._shim,
                            o = new _cc.Promise,
                            u = o,
                            a = function() {
                                setTimeout(function() {
                                    o.resolve()
                                }, 0)
                            };
                        if (typeof t == "string") t = function(e) {
                            var t = {},
                                n = 0,
                                r = i.length;
                            for (; n < r; n++) t[i[n]] = e;
                            return t
                        }(t);
                        if (typeof n == "function") u = o.then(n);
                        _cc.invoke(s, [e, t, a], r);
                        return u
                    };
                    return function(e, t, n) {
                        var r = this,
                            e = e,
                            t = t || {},
                            i = +(new Date),
                            o = window.getComputedStyle(e),
                            n = n,
                            u = new _cc.Promise,
                            a = u,
                            f = r._properties || [],
                            l = [],
                            c;
                        if (e.dataset.transitId) {
                            return r._transits[e.dataset.transitId].then(function() {
                                return _cc.invoke(r.animate, [e, t, n], r)
                            })
                        }
                        e.dataset.transitId = i;
                        r._transits[i] = a;
                        if (!(e instanceof Node) || e.nodeType != 1) throw Error;
                        if (typeof t == "string") t = function(e) {
                            var t = {},
                                n = 0,
                                r = f.length;
                            for (; n < r; n++) t[f[n]] = e;
                            return t
                        }(t);
                        if (typeof n == "function") a = u.then(n);
                        for (c in t)
                            if (t.hasOwnProperty(c))
                                if (!!~_cc.indexOf(f, c))(function(n) {
                                    var r;
                                    if (typeof o.getPropertyValue(n) == "undefined") {
                                        delete t[c];
                                        return
                                    }
                                    r = o.getPropertyValue(n);
                                    e.style.setProperty(n, t[n]);
                                    if (r !== o.getPropertyValue(n)) l.push(n);
                                    e.style.setProperty(n, r)
                                })(c);
                        setTimeout(function() {
                            var n = l.length;
                            e.className += " " + r.uid;
                            setTimeout(function() {
                                _cc.addEventListener(e, s, function i(t) {
                                    if (t.target !== e) return;
                                    if (--n) return;
                                    _cc.removeEventListener(e, s, i);
                                    e.className = e.className.replace(" " + r.uid, "");
                                    delete r._transits[e.dataset.transitId];
                                    delete e.dataset.transitId;
                                    setTimeout(function() {
                                        u.resolve()
                                    }, 16)
                                });
                                for (c in t)
                                    if (t.hasOwnProperty(c)) e.style.setProperty(c, t[c])
                            }, 16)
                        }, 16);
                        return a
                    }
                }()
            }
        })
    }
