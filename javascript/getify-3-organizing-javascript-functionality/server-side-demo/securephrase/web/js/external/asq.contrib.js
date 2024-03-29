/*! asynquence-contrib
    v0.8.0-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!(function (n, e) {
  "undefined" != typeof module && module.exports
    ? ((module.exports = function t(n) {
        if ("string" == typeof n)
          try {
            n = require(n);
          } catch (r) {
            return t;
          }
        return e(n);
      }),
      "string" == typeof n &&
        (module.exports = module.exports(require("path").join("..", n))))
    : "function" == typeof define && define.amd
    ? define([n], e)
    : e(n);
})(this.ASQ || "asynquence", function (n) {
  "use strict";
  function e(e, a, u, i, o) {
    (a = a.map(function (e, a) {
      var c;
      return n.isSequence(e)
        ? ((c = { fn: e }),
          l(c),
          function (n) {
            c.fn
              .val(function () {
                u(n, a, t.call(arguments));
              })
              .or(function () {
                i(n, a, t.call(arguments));
              });
          })
        : function (n) {
            var l = t.call(arguments);
            (l[0] = function () {
              u(n, a, t.call(arguments));
            }),
              (l[0].fail = function () {
                i(n, a, t.call(arguments));
              }),
              (l[0].abort = function () {
                o();
              }),
              (l[0].errfcb = function (e) {
                e ? i(n, a, [e]) : u(n, a, t.call(arguments, 1));
              }),
              e.apply(r, l);
          };
    })),
      e.then(function () {
        var n = t.call(arguments);
        a.forEach(function (e) {
          e.apply(r, n);
        });
      });
  }
  var t = Array.prototype.slice,
    r = Object.create(null),
    a = "__ASQ__",
    u = n.__schedule,
    l = n.__tapSequence;
  return (
    n.extend("after", function (n) {
      return function (e) {
        var a = arguments.length > 1 ? t.call(arguments, 1) : void 0;
        return (
          (e = +e || 0),
          n.then(function (n) {
            var u = a || t.call(arguments, 1);
            setTimeout(function () {
              n.apply(r, u);
            }, e);
          }),
          n
        );
      };
    }),
    (n.after = function () {
      return n().after.apply(r, arguments);
    }),
    n.extend("any", function (a, u) {
      return function () {
        function l() {
          (g = !0), (p.length = 0), (h.length = 0);
        }
        function i(n) {
          h.length > 0
            ? ((h.length = s.length), n.apply(r, h))
            : ((p.length = s.length), n.fail.apply(r, p)),
            l();
        }
        function o(e, t, a) {
          g ||
            (f++,
            (h[t] = a.length > 1 ? n.messages.apply(r, a) : a[0]),
            f === s.length && ((g = !0), i(e)));
        }
        function c(e, t, a) {
          g ||
            t in p ||
            (f++, (p[t] = a.length > 1 ? n.messages.apply(r, a) : a[0])),
            g || f !== s.length || ((g = !0), i(e));
        }
        if (u("seq_error") || u("seq_aborted") || 0 === arguments.length)
          return a;
        var s,
          f = 0,
          p = [],
          g = !1,
          h = [];
        return (s = t.call(arguments)), e(a, s, o, c, l), a;
      };
    }),
    n.extend("errfcb", function (n) {
      return function () {
        var e = {
          val: function (n) {
            return (e.val_cb = n), e;
          },
          or: function (n) {
            return (e.or_cb = n), e;
          },
        };
        return (
          (e[a] = !0),
          n.seq(e),
          function (n) {
            n ? e.or_cb(n) : e.val_cb.apply(r, t.call(arguments, 1));
          }
        );
      };
    }),
    n.extend("failAfter", function (n) {
      return function (e) {
        var a = arguments.length > 1 ? t.call(arguments, 1) : void 0;
        return (
          (e = +e || 0),
          n.then(function (n) {
            setTimeout(function () {
              n.fail.apply(r, a);
            }, e);
          }),
          n
        );
      };
    }),
    (n.failAfter = function () {
      return n().failAfter.apply(r, arguments);
    }),
    n.extend("first", function (a, u) {
      return function () {
        function l() {
          f.length = 0;
        }
        function i(e, t, a) {
          p || ((p = !0), e(a.length > 1 ? n.messages.apply(r, a) : a[0]), l());
        }
        function o(e, t, a) {
          p ||
            t in f ||
            (s++,
            (f[t] = a.length > 1 ? n.messages.apply(r, a) : a[0]),
            s === c.length &&
              ((p = !0), (f.length = c.length), e.fail.apply(r, f), l()));
        }
        if (u("seq_error") || u("seq_aborted") || 0 === arguments.length)
          return a;
        var c,
          s = 0,
          f = [],
          p = !1;
        return (c = t.call(arguments)), e(a, c, i, o, l), a;
      };
    }),
    (function () {
      var e;
      n.iterable = function () {
        function l() {
          throw 1 === w.length ? w[0] : w;
        }
        function i() {
          var n;
          if (((d = null), b))
            for (0 !== S.length || _ || ((_ = !0), l()); S.length > 0; ) {
              (_ = !0), (n = S.shift());
              try {
                n.apply(r, w);
              } catch (e) {
                checkBranding(e) ? (w = w.concat(e)) : w.push(e),
                  0 === S.length && l();
              }
            }
        }
        function o() {
          return b || q || 0 === arguments.length
            ? v
            : (x.push.apply(x, arguments), v);
        }
        function c() {
          return q || 0 === arguments.length
            ? v
            : (S.push.apply(S, arguments), d || (d = u(i)), v);
        }
        function s() {
          return q || 0 === arguments.length
            ? v
            : (t.call(arguments).forEach(function (n) {
                o(n).or(n.fail);
              }),
              v);
        }
        function f() {
          if (b || q || 0 === x.length)
            return (
              x.length > 0 && p("Sequence cannot be iterated"), { done: !0 }
            );
          try {
            return { value: x.shift().apply(r, arguments) };
          } catch (e) {
            return n.isMessageWrapper(e) ? p.apply(r, e) : p(e), {};
          }
        }
        function p() {
          return b || q
            ? v
            : (w.push.apply(w, arguments), (b = !0), d || (d = u(i)), v);
        }
        function g() {
          b ||
            q ||
            ((q = !0),
            clearTimeout(d),
            (d = null),
            (x.length = S.length = w.length = 0));
        }
        function h() {
          var t;
          return (
            (e = { val_queue: x.slice(), or_queue: S.slice() }),
            (t = n.iterable()),
            (e = null),
            t
          );
        }
        function m() {
          return S.push(function () {}), v;
        }
        function y(n) {
          return Object.defineProperty(n, a, { enumerable: !1, value: !0 }), n;
        }
        var v,
          d,
          b = !1,
          _ = !1,
          q = !1,
          x = [],
          S = [],
          w = [];
        return (
          (v = y({
            val: o,
            then: o,
            or: c,
            pipe: s,
            next: f,
            throw: p,
            abort: g,
            duplicate: h,
            defer: m,
          })),
          (v[
            ("object" == typeof Symbol && null != Symbol && Symbol.iterator) ||
              "@@iterator"
          ] = function () {
            return v;
          }),
          e && ((x = e.val_queue.slice(0)), (S = e.or_queue.slice(0))),
          v.val.apply(r, arguments),
          v
        );
      };
    })(),
    n.extend("last", function (a, u) {
      return function () {
        function l() {
          (h = !0), (g.length = 0), (f = null);
        }
        function i(e) {
          null != f
            ? e(f.length > 1 ? n.messages.apply(r, f) : f[0])
            : ((g.length = s.length), e.fail.apply(r, g)),
            l();
        }
        function o(n, e, t) {
          h || (p++, (f = t), p === s.length && ((h = !0), i(n)));
        }
        function c(e, t, a) {
          h ||
            t in g ||
            (p++, (g[t] = a.length > 1 ? n.messages.apply(r, a) : a[0])),
            h || p !== s.length || ((h = !0), i(e));
        }
        if (u("seq_error") || u("seq_aborted") || 0 === arguments.length)
          return a;
        var s,
          f,
          p = 0,
          g = [],
          h = !1;
        return (s = t.call(arguments)), e(a, s, o, c, l), a;
      };
    }),
    n.extend("map", function (e, a) {
      return function (u, l) {
        return a("seq_error") || a("seq_aborted")
          ? e
          : (e
              .seq(function () {
                var e,
                  a = t.call(arguments),
                  i = u,
                  o = l;
                return (
                  o || (o = a.shift()),
                  i || (i = a.shift()),
                  "function" == typeof i &&
                    Array.isArray(o) &&
                    ((e = i), (i = o), (o = e)),
                  n.apply(r, a).gate.apply(
                    r,
                    i.map(function (n) {
                      return function () {
                        o.apply(r, [n].concat(t.call(arguments)));
                      };
                    })
                  )
                );
              })
              .val(function () {
                return t.call(arguments);
              }),
            e);
      };
    }),
    n.extend("none", function (a, u) {
      return function () {
        function l() {
          (g = !0), (p.length = 0), (h.length = 0);
        }
        function i(n) {
          h.length > 0
            ? ((h.length = s.length), n.fail.apply(r, h))
            : ((p.length = s.length), n.apply(r, p)),
            l();
        }
        function o(e, t, a) {
          g ||
            (f++,
            (h[t] = a.length > 1 ? n.messages.apply(r, a) : a[0]),
            f === s.length && ((g = !0), i(e)));
        }
        function c(e, t, a) {
          g ||
            t in p ||
            (f++, (p[t] = a.length > 1 ? n.messages.apply(r, a) : a[0])),
            g || f !== s.length || ((g = !0), i(e));
        }
        if (u("seq_error") || u("seq_aborted") || 0 === arguments.length)
          return a;
        var s,
          f = 0,
          p = [],
          g = !1,
          h = [];
        return (s = t.call(arguments)), e(a, s, o, c, l), a;
      };
    }),
    n.extend("pThen", function (e, a) {
      return function (l, i) {
        if (a("seq_aborted")) return e;
        var o = !1,
          c = !1;
        return (
          "function" == typeof l &&
            e.then(function (e) {
              if (o) e.apply(r, t.call(arguments, 1));
              else {
                var a,
                  u = n.messages.apply(r, arguments);
                u.shift(), 1 === u.length && (u = u[0]), (c = !0);
                try {
                  a = l(u);
                } catch (i) {
                  return (
                    n.isMessageWrapper(i) || (i = [i]), void e.fail.apply(r, i)
                  );
                }
                n.isSequence(a)
                  ? a.pipe(e)
                  : n.isMessageWrapper(a)
                  ? e.apply(r, a)
                  : ("object" != typeof a && "function" != typeof a) ||
                    "function" != typeof a.then
                  ? e(a)
                  : a.then(e, e.fail);
              }
            }),
          "function" == typeof i &&
            e.or(function () {
              if (!c) {
                var l,
                  s,
                  f = n.messages.apply(r, arguments),
                  p = t.call(a("or_queue"));
                1 === f.length && (f = f[0]),
                  (o = !0),
                  (l = i(f)),
                  (s = a("sequence_messages")),
                  (s.length = 0),
                  "undefined" != typeof l &&
                    (n.isMessageWrapper(l) || (l = [l]), s.push.apply(s, l)),
                  (a("sequence_errors").length = 0),
                  a("seq_error", !1),
                  a("then_ready", !0),
                  (a("or_queue").length = 0),
                  e.val(function () {
                    return n.messages.apply(r, arguments);
                  }),
                  p.length > 0 &&
                    u(function () {
                      e.or.apply(r, p);
                    });
              }
            }),
          e
        );
      };
    }),
    n.extend("pCatch", function (n, e) {
      return function (t) {
        return e("seq_aborted") ? n : (n.pThen(void 0, t), n);
      };
    }),
    n.extend("race", function (e, a) {
      return function () {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return e;
        var u = t.call(arguments).map(function (e) {
          var t;
          return n.isSequence(e)
            ? ((t = { fn: e }),
              l(t),
              function (n) {
                t.fn.pipe(n);
              })
            : e;
        });
        return (
          e.then(function () {
            var n = t.call(arguments);
            u.forEach(function (e) {
              e.apply(r, n);
            });
          }),
          e
        );
      };
    }),
    (n.react = function (e) {
      function a() {
        if (i) {
          var e = i.duplicate();
          return e.unpause.apply(r, arguments), e;
        }
        return n().val(function () {
          throw "Disabled Sequence";
        });
      }
      function u() {
        i &&
          ((i = null),
          o.forEach(function (n) {
            n();
          }),
          (o.length = 0));
      }
      function l(n) {
        i && "function" == typeof n && o.push(n);
      }
      var i,
        o = [];
      return (
        (a.onStream = function () {
          t.call(arguments).forEach(function (n) {
            n.on("data", a), n.on("error", a);
          });
        }),
        (a.unStream = function () {
          t.call(arguments).forEach(function (n) {
            n.removeListener("data", a), n.removeListener("error", a);
          });
        }),
        n(function () {
          e.call(i, a, l);
        }),
        (i = n().duplicate()),
        (i.stop = u),
        i
      );
    }),
    n.extend("runner", function (e, a) {
      return function () {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return e;
        var l = t.call(arguments);
        return (
          e.then(function (e) {
            function a(t) {
              var a = t;
              return (
                "function" == typeof t
                  ? (a = t.call(r, p))
                  : (n.isSequence(t) && "next" in t) ||
                    (a = n.iterable().val(t)),
                n.isSequence(a) &&
                  a.or(function () {
                    e.fail.apply(r, arguments);
                  }),
                a
              );
            }
            function i() {
              s.push.apply(s, t.call(arguments).map(a));
            }
            var o,
              c,
              s = l,
              f = { messages: t.call(arguments, 1), add: i },
              p = f;
            (s = s.map(a)),
              (function g() {
                var t, a;
                o = s.shift();
                try {
                  c =
                    n.isMessageWrapper(p) && n.isSequence(o)
                      ? o.next.apply(o, p)
                      : o.next(p);
                } catch (l) {
                  return e.fail(l);
                }
                c.value === f
                  ? (s.push(o), (p = f), u(g))
                  : (n.isSequence(c.value) ||
                      ((t = typeof c.value),
                      null === c.value ||
                      ("object" !== t && "function" !== t) ||
                      "function" != typeof c.value.then
                        ? "function" === t
                          ? ((a = c.value),
                            (c.value = n(function (n) {
                              a(n.errfcb);
                            })))
                          : (c.value = n.isMessageWrapper(c.value)
                              ? n.apply(
                                  r,
                                  c.value.length > 0
                                    ? c.value
                                    : n.messages(void 0)
                                )
                              : "undefined" != typeof c.value
                              ? n(c.value)
                              : n())
                        : (c.value = n().promise(c.value))),
                    c.value
                      .val(function () {
                        arguments.length > 0 &&
                          (p =
                            arguments.length > 1
                              ? n.messages.apply(r, arguments)
                              : arguments[0]),
                          c.done || (p === f ? s.push(o) : s.unshift(o)),
                          s.length > 0
                            ? g()
                            : "undefined" != typeof p
                            ? n.isMessageWrapper(p)
                              ? e.apply(r, p)
                              : e(p)
                            : e();
                      })
                      .or(function () {
                        o["throw"].apply(o, arguments);
                      }));
              })();
          }),
          e
        );
      };
    }),
    n.extend("toPromise", function (e) {
      return function () {
        return new Promise(function (a, u) {
          e.val(function () {
            var e = t.call(arguments);
            return a.call(r, e.length > 1 ? e : e[0]), n.messages.apply(r, e);
          }).or(function () {
            var n = t.call(arguments);
            u.call(r, n.length > 1 ? n : n[0]);
          });
        });
      };
    }),
    n.extend("try", function (e, a) {
      return function () {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return e;
        var u = t.call(arguments).map(function (e) {
          return function (a) {
            var u = t.call(arguments),
              l = n.apply(r, u.slice(1));
            l.then(function () {
              e.apply(r, arguments);
            })
              .val(function () {
                a.apply(r, arguments);
              })
              .or(function () {
                var e = n.messages.apply(r, arguments);
                a({ catch: e.length > 1 ? e : e[0] });
              });
          };
        });
        return e.then.apply(r, u), e;
      };
    }),
    n.extend("until", function (e, a) {
      return function () {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return e;
        var u = t.call(arguments).map(function (e) {
          return function a(u) {
            var l = t.call(arguments),
              i = n.apply(r, l.slice(1));
            i.then(function () {
              var n = t.call(arguments);
              (n[0]["break"] = function () {
                u.fail.apply(r, arguments), i.abort();
              }),
                e.apply(r, n);
            })
              .val(function () {
                u.apply(r, arguments);
              })
              .or(function () {
                a.apply(r, l);
              });
          };
        });
        return e.then.apply(r, u), e;
      };
    }),
    n.extend("waterfall", function (e, a) {
      return function () {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return e;
        var u = n.messages();
        return (
          t.call(arguments).forEach(function (t) {
            e.then(t).val(function () {
              var e = n.messages.apply(r, arguments);
              return u.push(e.length > 1 ? e : e[0]), u;
            });
          }),
          e
        );
      };
    }),
    (n.wrap = function (e, a) {
      function u(n, e) {
        return !n ||
          ("undefined" != typeof window && n === window) ||
          ("undefined" != typeof global && n === global)
          ? e
          : n;
      }
      var l, i, o, c;
      if (
        ((a = a && "object" == typeof a ? a : {}),
        (a.errfcb && a.splitcb) ||
          (a.errfcb && a.simplecb) ||
          (a.splitcb && a.simplecb) ||
          ("errfcb" in a && !a.errfcb && !a.splitcb && !a.simplecb) ||
          (a.params_first && a.params_last))
      )
        throw Error("Invalid options");
      return (
        (c = a["this"] && "object" == typeof a["this"] ? a["this"] : r),
        (l = a.errfcb || !(a.splitcb || a.simplecb)),
        (i =
          !!a.params_first ||
          (!a.params_last && !("params_first" in a || a.params_first)) ||
          ("params_last" in a && !a.params_first && !a.params_last)),
        (o = i ? "push" : "unshift"),
        a.gen
          ? function () {
              return n.apply(r, arguments).runner(e);
            }
          : l
          ? function () {
              var r = t.call(arguments),
                a = u(this, c);
              return n(function (n) {
                r[o](n.errfcb), e.apply(a, r);
              });
            }
          : a.splitcb
          ? function () {
              var r = t.call(arguments),
                a = u(this, c);
              return n(function (n) {
                r[o](n, n.fail), e.apply(a, r);
              });
            }
          : a.simplecb
          ? function () {
              var r = t.call(arguments),
                a = u(this, c);
              return n(function (n) {
                r[o](n), e.apply(a, r);
              });
            }
          : void 0
      );
    }),
    n
  );
});
