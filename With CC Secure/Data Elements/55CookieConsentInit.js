return function() {
        (function() {
            "use strict";
            window._cc = (typeof _cc !== 'undefined' ? _cc : {});
            _cc.isArray = Array.isArray || function(e) {
                return Object.prototype.toString.call(e) === "[object Array]"
            };
            _cc.slice = function() {
                var e = Array.prototype.slice;
                return function(t, n) {
                    var r, n, i;
                    try {
                        r = e.call(t, n)
                    } catch (s) {
                        r = [];
                        for (n = 0, i = t.length; n < i; n++) r.push(t[n])
                    }
                    return r
                }
            }();
            _cc.indexOf = function() {
                if (Array.prototype.indexOf) return function(e, t) {
                    return e.indexOf(t)
                };
                return function(e, t) {
                    var n, r;
                    for (n = 0, r = e.length; n < r; n++)
                        if (e[n] === t) return n;
                    return -1
                }
            }();
            _cc.enumerate = Object.keys || function(e) {
                var t, n = [],
                    e = !!e ? !!e.callee ? Array.prototype.slice.call(e) : e : {};
                for (t in e)
                    if (n.hasOwnProperty.call(e, t)) n.push(t);
                return n
            };
            var e = _cc.JSON = window.JSON;
            _cc.serialize = function() {
                var e = arguments.length > 1 && arguments || arguments[0],
                    t = new _cc.Iterator(e),
                    n = t.enumerate(),
                    r = 0,
                    i = n.length,
                    s = [];
                for (; r < i; r++) s.push(encodeURIComponent(n[r][0]) + "=" + encodeURIComponent(n[r][1]));
                return s.join("&").replace(/%20/g, "+")
            };
            _cc.invoke = function(e, t, n) {
                if (typeof e != "function") throw new TypeError("argument 0 must be a valid function");
                var t = t || [],
                    n = n || null;
                switch (t.length) {
                    case 0:
                        return e.call(n);
                    case 1:
                        return e.call(n, t[0]);
                    case 2:
                        return e.call(n, t[0], t[1]);
                    case 3:
                        return e.call(n, t[0], t[1], t[2]);
                    default:
                        return e.apply(n, t)
                }
            };
            _cc.klass = function() {
                var e = arguments.length == 2 ? arguments[0] : null,
                    t = e ? e.prototype : {},
                    n = {},
                    r, i = function(t) {
                        if (typeof t == "function") return t(e, n);
                        return t || {}
                    }(arguments[arguments.length - 1]),
                    s = i.hasOwnProperty("constructor") ? function() {
                        var e = i.constructor;
                        delete i.constructor;
                        return e
                    }() : function() {};
                s.prototype = {};
                for (r in t)
                    if (t.hasOwnProperty(r)) s.prototype[r] = t[r];
                for (r in i)
                    if (i.hasOwnProperty(r)) s.prototype[r] = i[r];
                s.prototype.constructor = s;
                s.create = function() {
                    function t() {
                        return _cc.invoke(s, e, this)
                    }
                    var e = arguments;
                    t.prototype = s.prototype;
                    return new t
                };
                s.extend = function(e) {
                    return _cc.klass(s, e)
                };
                for (r in n)
                    if (n.hasOwnProperty(r) && !s.hasOwnProperty(r)) s[r] = n[r];
                return s
            };
            _cc.errors = {
                StopIterationError: _cc.klass(Error, {
                    constructor: function(e) {
                        this.name = "StopIteration";
                        this.message = e || ""
                    },
                    _isError: true
                })
            };
            _cc.EventEmitter = _cc.klass(function() {
                function e(e, t) {
                    this.prefix = e + ":";
                    this.emitter = t
                }
                return {
                    _isEventEmitter: true,
                    emit: function(e) {
                        var t = this,
                            n = this._events = this._events || {},
                            r = this._pipes = this._pipes || [],
                            i = n[e],
                            s, o = arguments.length > 1 ? _cc.slice(arguments, 1) : [],
                            u, a, f = new _cc.Invoker({
                                $event: e
                            });
                        if (typeof e != "string") return this.emit("error", new TypeError("invalid argument 0"));
                        if (e == "error" && !i)
                            if (arguments[1] instanceof Error || arguments[1]._isError) throw arguments[1];
                            else throw new Error(arguments[1]);
                        if (i)
                            if (typeof i.handleEvent == "function") f.apply(i.handleEvent, o, i);
                            else if (typeof i == "function") f.apply(i, o, t);
                        else {
                            s = [].concat(i);
                            for (u = 0, a = s.length; u < a; u++)
                                if (typeof s[u].handleEvent == "function") f.apply(s[u].handleEvent, o, s[u]);
                                else f.apply(s[u], o, t)
                        }
                        for (u = 0, a = r.length; u < a; u++) _cc.invoke(_cc.EventEmitter.prototype.emit, [r[u].prefix + e].concat(o), r[u].emitter);
                        return this
                    },
                    on: function(e, t) {
                        var n = this._events = this._events || {},
                            r = n[e];
                        if (!t || typeof t != "function" && typeof t.handleEvent != "function") return this.emit("error", new TypeError("invalid argument 1"));
                        if (!r || r === Object.prototype[e]) n[e] = t;
                        else if (typeof r == "function" || typeof r.handleEvent == "function") n[e] = [n[e], t];
                        else r.push(t);
                        return this
                    },
                    once: function(e, t) {
                        var n = this,
                            r;
                        if (!t || typeof t != "function" && typeof t.handleEvent != "function") return this.emit("error", new TypeError("missing/bad arguments[1]"));
                        r = function() {
                            var i, s;
                            if (typeof t.handleEvent == "function") i = t.handleEvent, s = t;
                            else i = t, s = null;
                            _cc.invoke(i, arguments, s);
                            n.off(e, r)
                        };
                        return this.on(e, r)
                    },
                    off: function(e, t) {
                        var n = this._events = this._events || {},
                            r = n[e],
                            i;
                        if (!e || typeof e != "string") return this.emit("error", new TypeError("invalid argument 0"));
                        if (t === "*" || !t) delete n[e];
                        if (typeof t == "function")
                            if (r)
                                if (r === t) delete n[e];
                                else {
                                    while (i = _cc.indexOf(r, t), !!~i) n[e].splice(i, 1);
                                    if (!n[e].length) delete n[e]
                                }
                        return this
                    },
                    listeners: function(e) {
                        var t = this._events = this._events || {},
                            n = t[e];
                        if (_cc.isArray(n)) return n;
                        return !!n ? [n] : []
                    },
                    pipe: function(t, n) {
                        var r = this._pipes = this._pipes || [];
                        if (!t || typeof t != "string") this.emit("error", new TypeError("invalid argument 0"));
                        if (!n || !n._isEventEmitter) this.emit("error", new TypeError("invalid argument 1"));
                        r.push(new e(t, n));
                        return this
                    }
                }
            });
            _cc.Promise = function() {
                var e = _cc.klass(_cc.EventEmitter, {
                        _isPromise: true,
                        then: function(e, t, n) {
                            var r = this._state || -1,
                                i = this._yield || null,
                                s = new _cc.Promise,
                                o;
                            if (r == 1 && typeof e == "function") {
                                o = _cc.invoke(e, i, null);
                                if (o && o._isPromise) o.then(function() {
                                    _cc.invoke(s.resolve, arguments, s)
                                });
                                else s.resolve(o)
                            } else if (r == 0 && typeof t == "function") {
                                o = _cc.invoke(t, i, null);
                                if (o && o._isPromise) o.then(null, function() {
                                    _cc.invoke(s.reject, arguments, s)
                                });
                                else s.reject(o)
                            }
                            if (r == -1) {
                                if (typeof e == "function") this.once("resolve", function() {
                                    o = _cc.invoke(e, arguments);
                                    if (o && o._isPromise) o.then(function() {
                                        _cc.invoke(s.resolve, arguments, s)
                                    });
                                    else s.resolve(o)
                                });
                                if (typeof t == "function") this.once("reject", function() {
                                    o = _cc.invoke(t, arguments);
                                    if (o && o._isPromise) o.then(null, function() {
                                        _cc.invoke(s.reject, arguments, s)
                                    });
                                    else s.reject(o)
                                });
                                if (typeof n == "function") this.on("progress", function() {
                                    _cc.invoke(n, arguments);
                                    _cc.invoke(s.progress, arguments, s)
                                })
                            }
                            return s
                        },
                        resolve: function() {
                            var e = arguments.length ? _cc.slice(arguments) : [];
                            if (this._state === 0) return this.emit("error", new TypeError);
                            if (this._state !== 1) this._state = 1, this._yield = e;
                            return _cc.invoke(_cc.EventEmitter.prototype.emit, ["resolve"].concat(e), this)
                        },
                        reject: function() {
                            var e = arguments.length ? _cc.slice(arguments) : [];
                            if (this._state === 1) return this.emit("error", new TypeError);
                            if (this._state !== 0) this._state = 0, this._yield = e;
                            return _cc.invoke(_cc.EventEmitter.prototype.emit, ["reject"].concat(e), this)
                        },
                        progress: function() {
                            var e = arguments.length ? _cc.slice(arguments) : [];
                            if (this._state !== -1) return this.emit("error", new TypeError);
                            return _cc.invoke(_cc.EventEmitter.prototype.emit, ["progress"].concat(e), this)
                        },
                        status: function() {
                            return this._state || -1
                        },
                        yield: function() {
                            return _cc.isArray(this._yield) ? [].concat(this._yield) : []
                        }
                    }),
                    t = _cc.klass(e, {
                        constructor: function() {
                            var e = this,
                                t, n, r;
                            this._promises = [];
                            this._yield = [];
                            this._state = -1;
                            this._closed = 0;
                            if (!arguments.length) return this.reject(null);
                            else if (arguments.length == 1) t = _cc.isArray(arguments[0]) ? arguments[0] : [arguments[0]];
                            else t = _cc.slice(arguments);
                            for (n = 0, r = t.length; n < r; n++)
                                if (!t[n]._isPromise) setTimeout(function() {
                                    e.emit("error", new TypeError("invalid promise"))
                                }, 0);
                                else(function(t, n) {
                                    e._promises[n] = t;
                                    t.then(function(r) {
                                        e._yield[n] = r;
                                        e.progress(t, r)
                                    }, function(r) {
                                        e._yield[n] = r;
                                        e.reject(t)
                                    })
                                })(t[n], n);
                            this._closed = 1
                        },
                        progress: function(e, n) {
                            var r = this,
                                i, s = this._promises || [],
                                o, u, a = 0;
                            if (!this._closed) return i = _cc.slice(arguments), setTimeout(function() {
                                _cc.invoke(t.prototype.progress, i, r)
                            }, 0);
                            for (o = 0, u = s.length; o < u; o++) switch (s[o].status()) {
                                case -1:
                                    a++;
                                    break;
                                case 0:
                                    return this.reject(this._yield)
                            }
                            if (!a) _cc.invoke(_cc.Promise.prototype.resolve, this._yield, this);
                            else _cc.invoke(_cc.EventEmitter.prototype.emit, ["progress"].concat([e, n]), this);
                            return this
                        }
                    });
                e.group = function() {
                    function n() {
                        return _cc.invoke(t, e, this)
                    }
                    var e = arguments;
                    n.prototype = t.prototype;
                    return new n
                };
                e.sequence = function() {
                    var e = _cc.isArray(arguments[0]) ? arguments[0] : _cc.slice(arguments),
                        t = e.length;
                    return function(e, t) {
                        return function() {
                            var n = new _cc.Promise,
                                r = n,
                                i = _cc.slice(arguments),
                                s = 0;
                            for (; s < t; s++)
                                if (typeof e[s] == "function") r = r.then(e[s]);
                                else n.emit("error", new TypeError("invalid argument"));
                            setTimeout(function() {
                                _cc.invoke(n.resolve, i, n)
                            }, 0);
                            return r
                        }
                    }(e, t)
                };
                return e
            }();
            _cc.Invoker = _cc.klass(function() {
                var e = /^function(?:[^\(]*)\(([^\)]*)/;
                return {
                    constructor: function(e) {},
                    rules: function(e) {
                        return this
                    },
                    apply: function(e, t, n) {
                        return _cc.invoke(e, t, n)
                    }
                }
            }());
            _cc.Iterator = _cc.klass(_cc.EventEmitter, {
                constructor: function(e, t) {
                    if (!e) return this.emit("error", new TypeError("missing arguments 0 when constructing new Iterator object"));
                    var n = this,
                        t = !!arguments[1],
                        r, i, s;
                    try {
                        r = _cc.enumerate(e)
                    } catch (o) {
                        r = [];
                        setTimeout(function() {
                            n.emit("error", o)
                        }, 0)
                    }
                    this._pointer = -1;
                    this._current = null;
                    this._range = [];
                    for (i = 0, s = r.length; i < s; i++) this._range.length += 1, this._range[i] = t ? [r[i]] : [r[i], e[r[i]]]
                },
                _isIterator: true,
                onstopiteration: null,
                next: function() {
                    var e = this._pointer + 1,
                        t;
                    if (e >= this._range.length) return function(e) {
                        var t = new _cc.errors.StopIterationError;
                        if (typeof e.onstopiteration == "function") return e.onstopiteration(t);
                        return e.emit("error", t)
                    }(this);
                    else this._pointer = e;
                    t = this._current = this._range[e];
                    return t
                },
                length: function() {
                    return this._range.length
                },
                enumerate: function() {
                    return [].concat(this._range || [])
                }
            });
            _cc.Router = _cc.klass(_cc.EventEmitter, function() {
                function e(e, t) {
                    return e === t
                }

                function t() {}
                return {
                    constructor: function(t, n) {
                        var n = typeof arguments[arguments.length - 1] == "function" ? arguments[arguments.length - 1] : e,
                            t = arguments[0] && arguments[0].constructor == Object ? arguments[0] : null;
                        this._routes = {};
                        this._dispatcher = n;
                        if (t) this.when(t)
                    },
                    _isRouter: true,
                    onstopiteration: null,
                    dispatch: function() {
                        var e = this,
                            n = arguments[0],
                            r = _cc.slice(arguments, 1),
                            i = new _cc.Iterator(this._routes),
                            s, o = new _cc.Invoker({
                                $route: n,
                                $next: function() {
                                    return _cc.invoke(s, [], e)
                                }
                            }),
                            u = function(i) {
                                var u, f, l;
                                u = i[1];
                                if (typeof u == "function") return s = a, o.apply(u, [a, n].concat(r), e);
                                else {
                                    for (f = 0, l = u.length - 1; f < l; f++) s = function() {
                                        _cc.invoke(t, [], e)
                                    }, o.apply(u[f], [t, n].concat(r), e);
                                    return s = a, o.apply(u[l], [a, n].concat(r), e)
                                }
                            },
                            a = function() {
                                var t, f;
                                try {
                                    t = i.next();
                                    f = t[0] === "*" ? true : _cc.invoke(e._dispatcher, [t[0]].concat([n].concat(r)), null)
                                } catch (l) {
                                    if (l instanceof _cc.errors.StopIterationError && typeof e.onstopiteration == "function") return s = undefined, o.apply(e.onstopiteration, [l].concat(n, r), e);
                                    return e.emit("error", l)
                                }
                                if (!f) return a();
                                else return u(t)
                            };
                        return a()
                    },
                    when: function(e, t) {
                        var n, r, i;
                        if (arguments.length == 1) {
                            for (n = _cc.enumerate(e), r = 0, i = n.length; r < i; r++) this.when(n[r], e[n[r]]);
                            return this
                        }
                        if (typeof t != "function") this.emit("error", new TypeError("argument 1 is expected to be a function"));
                        if (!this._routes[e] || this._routes[e] === Object.prototype[e]) this._routes[e] = t;
                        else if (typeof this._routes[e] == "function") this._routes[e] = [this._routes[e], t];
                        else this._routes[e].push(t);
                        return this
                    },
                    route: function(e) {
                        var t = (this._routes || {})[e];
                        if (_cc.isArray(t)) t = [].concat[t];
                        return t
                    },
                    routes: function() {
                        var e = this._routes || {},
                            t = {},
                            n = new _cc.Iterator(e),
                            r = n.enumerate(),
                            i = 0,
                            s = r.length;
                        for (; i < s; i++) t[r[i][0]] = this.route(r[i][0]);
                        return t
                    }
                }
            });
						_satellite.getVar('55CookieConsentMVC')();
            var t = function() {
                if (_cc.ready.status() !== -1) return;
                _cc.docElt = document.documentElement;
                _cc.docHead = document.getElementsByTagName("head")[0];
                _cc.docBody = document.getElementsByTagName("body")[0];
                _cc.ready.resolve({
                    nodes: {
                        documentElement: _cc.docElt,
                        head: _cc.docHead,
                        body: _cc.docBody
                    }
                })
            };
            if (document.readyState) {
                if (document.readyState == "complete") t()
            } else setTimeout(t, 0);
            _cc.addEventListener(window, "DOMContentLoaded", t);
            _cc.addEventListener(window, "load", t);
            _cc.addEventListener(document, "readystatechange", function() {
                if (document.readyState === "complete") t()
            });

            _satellite.getVar('55CookieConsentCore')();

            _satellite.getVar('55CookieConsentMod')();
        })()

    }