/*! asynquence
    v0.5.5-b (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!(function (n, e, t) {
  "undefined" != typeof module && module.exports
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e[n] = t(n, e));
})("ASQ", this, function n(e, t) {
  "use strict";
  function u() {
    function n(n) {
      (this.fn = n), (this.next = void 0);
    }
    var e, t, u;
    return {
      add: function (r) {
        (u = new n(r)), t ? (t.next = u) : (e = u), (t = u), (u = void 0);
      },
      drain: function () {
        var n = e;
        for (e = t = p = null; n; ) n.fn(), (n = n.next);
      },
    };
  }
  function r(n) {
    g.add(n), p || (p = h(g.drain));
  }
  function a(n) {
    var e;
    n.fn
      .val(function () {
        return e.apply(x, arguments), y.apply(x, arguments);
      })
      .or(function () {
        e.fail.apply(x, arguments);
      }),
      (n.fn = l(function (n) {
        e = n;
      }).defer()),
      (e = function () {
        n.fn = l.apply(x, arguments).defer();
      }),
      (e.fail = function () {
        var e = q.call(arguments);
        n.fn = l(function (n) {
          n.fail.apply(x, e);
        }).defer();
      });
  }
  function l() {
    function n() {
      W ? t() : C || (C = r(t));
    }
    function e() {
      throw 1 === G.length ? G[0] : G;
    }
    function t() {
      var t, r;
      if (((C = null), delete H.unpause, W))
        clearTimeout(C),
          (C = null),
          (B.length = D.length = F.length = G.length = 0);
      else if (M)
        for (0 !== D.length || P || ((P = !0), e()); D.length; ) {
          (P = !0), (t = D.shift());
          try {
            t.apply(x, G);
          } catch (a) {
            v(a) ? (G = G.concat(a)) : (G.push(a), a.stack && G.push(a.stack)),
              0 === D.length && e();
          }
        }
      else if (z && B.length > 0) {
        (z = !1),
          (t = B.shift()),
          (r = F.slice()),
          (F.length = 0),
          r.unshift(u());
        try {
          t.apply(x, r);
        } catch (a) {
          v(a) ? (G = G.concat(a)) : G.push(a), (M = !0), n();
        }
      }
    }
    function u() {
      function e() {
        M ||
          W ||
          z ||
          ((z = !0), F.push.apply(F, arguments), (G.length = 0), n());
      }
      return (
        (e.fail = function () {
          M ||
            W ||
            z ||
            ((M = !0), (F.length = 0), G.push.apply(G, arguments), n());
        }),
        (e.abort = function () {
          M || W || ((z = !1), (W = !0), (F.length = G.length = 0), n());
        }),
        (e.errfcb = function (n) {
          n ? e.fail(n) : e.apply(x, q.call(arguments, 1));
        }),
        e
      );
    }
    function i(n, e, t) {
      function u() {
        clearTimeout(p), (p = d = _ = s = null);
      }
      function a() {
        return h ? l() : void (p || (p = r(l)));
      }
      function l() {
        if (!(M || W || m)) {
          var e = [];
          (p = null),
            g
              ? (n.fail.apply(x, s), u())
              : h
              ? (n.abort(), u())
              : f() &&
                ((m = !0),
                d.forEach(function (n, t) {
                  e.push(_["s" + t]);
                }),
                n.apply(x, e),
                u());
        }
      }
      function f() {
        if (0 !== d.length) {
          var n = !0;
          return (
            d.some(function (e) {
              return null === e ? ((n = !1), !0) : void 0;
            }),
            n
          );
        }
      }
      function i() {
        function n() {
          if (!(M || W || g || h || m || d[e])) {
            var n = y.apply(x, arguments);
            (_["s" + e] = n.length > 1 ? n : n[0]), (d[e] = !0), a();
          }
        }
        var e = d.length;
        return (
          (n.fail = function () {
            M ||
              W ||
              g ||
              h ||
              m ||
              d[e] ||
              ((g = !0), (s = q.call(arguments)), a());
          }),
          (n.abort = function () {
            M || W || g || h || m || ((h = !0), l());
          }),
          (n.errfcb = function (e) {
            e ? n.fail(e) : n.apply(x, q.call(arguments, 1));
          }),
          (d[e] = null),
          n
        );
      }
      var c,
        o,
        s,
        p,
        g = !1,
        h = !1,
        m = !1,
        d = [],
        _ = {};
      e.some(function (n) {
        if (g || h) return !0;
        (c = t.slice()), c.unshift(i());
        try {
          n.apply(x, c);
        } catch (e) {
          return (o = e), (g = !0), !0;
        }
      }),
        o && (v(o) ? n.fail.apply(x, o) : n.fail(o));
    }
    function p() {
      return M || W || 0 === arguments.length
        ? H
        : (s(arguments, o).forEach(function (n) {
            d(n) ? k(n) : B.push(n);
          }),
          n(),
          H);
    }
    function g() {
      return W || 0 === arguments.length
        ? H
        : (D.push.apply(D, arguments), n(), H);
    }
    function h() {
      if (M || W || 0 === arguments.length) return H;
      var n = q.call(arguments).map(function (n) {
        var e;
        return d(n)
          ? ((e = { fn: n }),
            a(e),
            function (n) {
              e.fn.pipe(n);
            })
          : n;
      });
      return (
        p(function (e) {
          var t = q.call(arguments, 1);
          i(e, n, t);
        }),
        H
      );
    }
    function b() {
      return W || 0 === arguments.length
        ? H
        : (q.call(arguments).forEach(function (n) {
            p(function (e) {
              n.apply(x, q.call(arguments, 1)), e();
            }).or(n.fail);
          }),
          H);
    }
    function k() {
      return M || W || 0 === arguments.length
        ? H
        : (q.call(arguments).forEach(function (n) {
            var e = { fn: n };
            d(n) && a(e),
              p(function (n) {
                var t = e.fn;
                d(e.fn) || (t = e.fn.apply(x, q.call(arguments, 1))), t.pipe(n);
              });
          }),
          H);
    }
    function E() {
      return M || W || 0 === arguments.length
        ? H
        : (q.call(s(arguments, c)).forEach(function (n) {
            p(function (e) {
              var t = n.apply(x, q.call(arguments, 1));
              v(t) || (t = y(t)), e.apply(x, t);
            });
          }),
          H);
    }
    function A() {
      function n(n) {
        return function () {
          n.apply(x, v(arguments[0]) ? arguments[0] : arguments);
        };
      }
      return M || W || 0 === arguments.length
        ? H
        : (q.call(arguments).forEach(function (e) {
            p(function (t) {
              var u = e;
              "function" == typeof e &&
                "function" != typeof e.then &&
                (u = e.apply(x, q.call(arguments, 1))),
                u.then(n(t), n(t.fail));
            });
          }),
          H);
    }
    function j() {
      var n;
      return (
        E(function () {
          return (
            n ? n.apply(x, arguments) : (n = l.apply(x, arguments).defer()),
            y.apply(x, arguments)
          );
        }),
        g(function () {
          if (n) n.fail.apply(x, arguments);
          else {
            var e = q.call(arguments);
            n = l()
              .then(function (n) {
                n.fail.apply(x, e);
              })
              .defer();
          }
        }),
        l()
          .then(function (e) {
            n ? n.pipe(e) : (n = e);
          })
          .defer()
      );
    }
    function w() {
      return M ? H : ((W = !0), t(), H);
    }
    function O() {
      var n;
      return (
        (m = { then_queue: B.slice(), or_queue: D.slice() }),
        (n = l()),
        (m = null),
        n
      );
    }
    function S() {
      F.push.apply(F, arguments), C === !0 && (C = null), n();
    }
    function T() {
      return D.push(function () {}), H;
    }
    function I(n, e) {
      var t = arguments.length > 1;
      switch (n) {
        case "seq_error":
          if (!t) return M;
          M = e;
          break;
        case "seq_aborted":
          if (!t) return W;
          W = e;
          break;
        case "then_ready":
          if (!t) return z;
          z = e;
          break;
        case "then_queue":
          return B;
        case "or_queue":
          return D;
        case "sequence_messages":
          return F;
        case "sequence_errors":
          return G;
      }
    }
    function Q() {
      Object.keys(_).forEach(function (n) {
        H[n] = _[n](H, I);
      });
    }
    var C,
      M = !1,
      P = !1,
      W = !1,
      z = !0,
      B = [],
      D = [],
      F = [],
      G = [],
      H = f({
        then: p,
        or: g,
        onerror: g,
        gate: h,
        all: h,
        pipe: b,
        seq: k,
        val: E,
        promise: A,
        fork: j,
        abort: w,
        duplicate: O,
        defer: T,
      });
    return (
      Q(),
      m &&
        ((B = m.then_queue.slice()),
        (D = m.or_queue.slice()),
        (H.unpause = S),
        (C = !0)),
      H.then.apply(x, arguments),
      H
    );
  }
  function f(n) {
    return Object.defineProperty(n, k, { enumerable: !1, value: !0 });
  }
  function i(n) {
    return !(null == n || "object" != typeof n || !n[k]);
  }
  function c(n) {
    return y.apply(x, q.call(arguments).slice(1, n + 1));
  }
  function o(n) {
    arguments[n + 1].apply(x, q.call(arguments).slice(1, n + 1));
  }
  function s(n, e) {
    var t, u;
    for (n = q.call(n), t = 0; t < n.length; t++)
      if (v(n[t])) n[t] = e.bind.apply(e, [null, n[t].length].concat(n[t]));
      else if ("function" != typeof n[t] && (e === c || !d(n[t]))) {
        for (
          u = t + 1;
          u < n.length && "function" != typeof n[u] && !i(n[u]);
          u++
        );
        n.splice(
          t,
          u - t,
          e.bind.apply(e, [null, u - t].concat(n.slice(t, u)))
        );
      }
    return n;
  }
  var p,
    g,
    h =
      "undefined" != typeof setImmediate
        ? function (n) {
            return setImmediate(n);
          }
        : setTimeout;
  g = u();
  var m,
    y,
    d,
    v,
    _ = {},
    b = (t || {})[e],
    q = [].slice,
    k = "__ASQ__",
    x = Object.create(null);
  return (
    (l.failed = function () {
      var n = y.apply(x, arguments);
      return l(function () {
        throw n;
      }).defer();
    }),
    (l.extend = function (n, e) {
      return (
        ~[
          "then",
          "or",
          "gate",
          "all",
          "pipe",
          "seq",
          "val",
          "promise",
          "fork",
          "abort",
          "duplicate",
          "defer",
        ].indexOf(n) || (_[n] = e),
        l
      );
    }),
    (l.messages = y = function () {
      var n = q.call(arguments);
      return f(n);
    }),
    (l.isSequence = d = function (n) {
      return i(n) && !Array.isArray(n);
    }),
    (l.isMessageWrapper = v = function (n) {
      return i(n) && Array.isArray(n);
    }),
    (l.unpause = function (n) {
      return n.unpause && n.unpause(), n;
    }),
    (l.noConflict = function () {
      return t && (t[e] = b), l;
    }),
    (l.clone = function () {
      return n(e, t);
    }),
    (l.__schedule = r),
    (l.__tapSequence = a),
    l
  );
});
