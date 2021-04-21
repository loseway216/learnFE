(function UMD(name, context, definition) {
  if (typeof module != "undefined" && module.exports)
    module.exports = definition(name, context);
  else if (typeof define == "function" && define.amd) define(definition);
  else context[name] = definition(name, context);
})(
  "Tmpls",
  typeof global != "undefined" ? global : this,
  function definition(name, context) {
    "use strict";

    function init() {
      (function ___about__(G) {
        var partial = G.definePartial,
          clone = G.cloneObj,
          error = G.error,
          extend = G.extend,
          cID = "/about";
        extend(cID, "/master");
        partial(
          function __content__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            ret +=
              '\n\n<div id="content">\n\n	<h1>About</h1>\n	<p>\n		This generator uses the <a href="http://world.std.com/~reinhold/diceware.html" data-ignore="yes">Diceware</a> algorithm and <a href="http://world.std.com/~reinhold/dicewarewordlist.pdf" data-ignore="yes">wordlist (PDF)</a> to generate a strong passphrase to protect your password databases or other sensitive resources.\n	</p>\n	<p>\n		Instead of manually rolling physical dice, we simulate the dice rolls for you. You choose a phrase length of 4 to 8 words, and we randomly selected them from the word list. Now just memorize your new secure passphrase. It is not stored in anyway (either in your browser or on our server), so once you leave the page, it will be gone!\n	</p>\n	<p>\n		By default, random number generation happens in JavaScript entirely in your browser. If you\'re using a modern browser, the random numbers come from a <a href="https://developer.mozilla.org/en-US/docs/Web/API/RandomSource/getRandomValues">cryptographically strong random number generator</a> built into the browser. Older browsers fall back to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random"><strong>Math.random()</strong></a>, which is unfortunately not considered cryptographically strong. In that case, you can uncheck "Localized Randomness" and the generator will pull more suitable numbers (over HTTPS!) from <a href="https://random.org">random.org</a>.\n	</p>\n	<p>\n		<strong>Note:</strong> If for some reason JS is not running (properly) in the page, the generator falls back to requesting random phrases from our server (which uses the same cryptographically strong number generation techniques, or random.org). These numbers and words are not stored on our server in any way. There is also a simple API available for generating these phrases, which is basically the same as the fallback when browser JS is turned off or not working.\n	</p>\n\n</div>\n\n';
            return ret;
          },
          "/about#content",
          { type: 2, pos: { line: 4, col: 0 }, val: '{$: "#content" }' }
        );
      })(this.grips || grips);
      (function _____(G) {
        function __sort_fn__(a, b) {
          return a - b;
        }
        var partial = G.definePartial,
          clone = G.cloneObj,
          error = G.error,
          extend = G.extend,
          unerr = new Error("Unknown error"),
          RLH = G.RangeLiteralHash,
          cID = "/";
        extend(cID, "/master");
        partial(
          function __content__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            ret +=
              '\n\n<div id="content">\n\n	<h1>Secure Phrase Generator</h1>\n	<p>\n		Make a secure passphrase. Read <a href="/about">more about</a> how this works.\n	</p>\n\n	<form method="post" action="/" rel="js-form">\n		<p>\n			<select name="level" rel="js-level">\n				<option value="4">4 (weak)</option>\n				<option value="5">5 (ok)</option>\n				<option value="6" selected>6 (best)</option>\n				<option value="7">7 (overkill)</option>\n				<option value="8">8 (insane)</option>\n			</select> Word Count\n		</p>\n		<p><input id="localized" name="localized" type="checkbox" value="local" rel="js-local" checked> <label for="localized">Localized Randomness</label> (<a href="/about">?</a>) (otherwise, uses <a href="https://random.org">random.org</a>)</p>\n		<p>\n			<input type="submit" value="Generate Phrase" rel="js-btn-generate">\n		</p>\n	</form>\n\n	';
            try {
              ret2 = $;
            } catch (err) {
              return error(
                cID,
                { type: 12, val: "$" },
                "Include template context reference failed",
                err
              );
            }
            try {
              ret2 = G.render("#phrase_results", ret2, $$);
            } catch (err) {
              if (err instanceof G.TemplateError) {
                err.ref = {
                  type: 8,
                  pos: { line: 660, col: 44 },
                  val: "#phrase_results",
                };
                return err;
              } else {
                return error(
                  cID,
                  {
                    type: 8,
                    pos: { line: 660, col: 44 },
                    val: "#phrase_results",
                  },
                  "Include template reference failed",
                  err
                );
              }
            }
            if (ret2 instanceof G.TemplateError) {
              return ret2;
            } else {
              ret += ret2;
            }
            ret += "\n\n</div>\n\n";
            return ret;
          },
          "/#content",
          { type: 2, pos: { line: 4, col: 0 }, val: '{$: "#content" }' }
        );
        partial(
          function __phrase_results__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            ret += '\n	<div id="phrase_results" rel="js-phrase-results">\n		';
            ret2 = (function __loop__() {
              function __iter__($, $$, value, key, index) {
                var i,
                  ret = "",
                  ret2,
                  _;
                if (value == null) return ret;
                $$ = clone($$);
                _ = {
                  value: value,
                  key: key,
                  index: index,
                  even: index % 2 === 0,
                  odd: index % 2 === 1,
                  first: index === 0,
                  last: index === len - 1,
                };
                try {
                  $$.phrase = _.value;
                } catch (err1) {
                  return error(
                    cID,
                    {
                      type: 11,
                      pos: { line: 1460, col: 81 },
                      val: "phrase = _.value",
                    },
                    "Assignment failed in loop iteration: " +
                      JSON.stringify(_, ["key", "index"]),
                    err1
                  );
                }
                ret += "\n			";
                try {
                  ret2 = _;
                } catch (err) {
                  return error(
                    cID,
                    { type: 12, pos: { line: 1690, col: 27 }, val: "_" },
                    "Include template context reference failed",
                    err
                  );
                }
                try {
                  ret2 = G.render("#phrase", ret2, $$);
                } catch (err) {
                  if (err instanceof G.TemplateError) {
                    err.ref = {
                      type: 8,
                      pos: { line: 1690, col: 16 },
                      val: "#phrase",
                    };
                    return err;
                  } else {
                    return error(
                      cID,
                      { type: 8, pos: { line: 1690, col: 16 }, val: "#phrase" },
                      "Include template reference failed",
                      err
                    );
                  }
                }
                if (ret2 instanceof G.TemplateError) {
                  return ret2;
                } else {
                  ret += ret2;
                }
                ret += "\n		";
                return ret;
              }
              var i,
                j = 0,
                len,
                ret = "",
                it,
                tmp;
              try {
                it = $.phrase_results;
                if (it == null) {
                  return "";
                }
                if (Array.isArray(it)) {
                  len = it.length;
                  for (i = 0; i < len; i++) {
                    ret2 = __iter__($, $$, it[i], "" + i, i);
                    if (ret2 instanceof G.TemplateError) {
                      return ret2;
                    } else {
                      ret += ret2;
                    }
                  }
                } else if (typeof it === "object") {
                  tmp = Object.keys(it);
                  len = tmp.length;
                  if (it instanceof RLH) {
                    tmp.sort(__sort_fn__);
                  }
                  for (i = 0; i < len; i++) {
                    ret2 = __iter__($, $$, it[tmp[i]], tmp[i], i);
                    if (ret2 instanceof G.TemplateError) {
                      return ret2;
                    } else {
                      ret += ret2;
                    }
                  }
                } else {
                  return (
                    error(
                      cID,
                      {
                        type: 9,
                        pos: { line: 1460, col: 62 },
                        val: "$.phrase_results",
                      },
                      "Invalid loop-iterator reference"
                    ) || unerr
                  );
                }
              } catch (err) {
                return error(
                  cID,
                  {
                    type: 9,
                    pos: { line: 1460, col: 62 },
                    val: "$.phrase_results",
                  },
                  "Failed loop iteration",
                  err
                );
              }
              return ret;
            })();
            if (ret2 instanceof G.TemplateError) {
              return ret2;
            } else {
              ret += ret2;
            }
            ret += "\n	</div>\n";
            return ret;
          },
          "/#phrase_results",
          {
            type: 2,
            pos: { line: 1320, col: 49 },
            val: '{$: "#phrase_results" }',
          }
        );
        partial(
          function __phrase__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            ret += "\n	<p>";
            try {
              ret += $$.phrase;
            } catch (err) {
              return error(
                cID,
                { type: 9, pos: { line: 1697, col: 15 }, val: "phrase" },
                "Insert reference failed",
                err
              );
            }
            ret += "</p>\n";
            return ret;
          },
          "/#phrase",
          { type: 2, pos: { line: 1696, col: 2 }, val: '{$: "#phrase" }' }
        );
      })(this.grips || grips);
      (function ___master__(G) {
        var partial = G.definePartial,
          clone = G.cloneObj,
          error = G.error,
          cID = "/master";
        partial(
          function __page__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            try {
              $$.title = $.page_title
                ? $.page_title
                : "Secure Phrase Generator";
            } catch (err1) {
              return error(
                cID,
                {
                  type: 11,
                  pos: { line: 2, col: 1 },
                  val:
                    'title = $.page_title ? $.page_title : "Secure Phrase Generator"',
                },
                "Assignment failed",
                err1
              );
            }
            ret +=
              '\n\n<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<meta name=viewport content="width=device-width, initial-scale=1">\n<title>';
            try {
              ret += $$.title;
            } catch (err) {
              return error(
                cID,
                { type: 9, pos: { line: 10, col: 16 }, val: "title" },
                "Insert reference failed",
                err
              );
            }
            ret +=
              '</title>\n<link rel="stylesheet" href="/css/site.css">\n</head>\n<body>\n\n<div id="notifications"><div class="list"></div><div class="close">X</div></div>\n\n';
            try {
              ret2 = $;
            } catch (err) {
              return error(
                cID,
                { type: 12, val: "$" },
                "Include template context reference failed",
                err
              );
            }
            try {
              ret2 = G.render("#nav", ret2, $$);
            } catch (err) {
              if (err instanceof G.TemplateError) {
                err.ref = { type: 8, pos: { line: 17, col: 11 }, val: "#nav" };
                return err;
              } else {
                return error(
                  cID,
                  { type: 8, pos: { line: 17, col: 11 }, val: "#nav" },
                  "Include template reference failed",
                  err
                );
              }
            }
            if (ret2 instanceof G.TemplateError) {
              return ret2;
            } else {
              ret += ret2;
            }
            ret += "\n\n";
            try {
              ret2 = $;
            } catch (err) {
              return error(
                cID,
                { type: 12, val: "$" },
                "Include template context reference failed",
                err
              );
            }
            try {
              ret2 = G.render("#content", ret2, $$);
            } catch (err) {
              if (err instanceof G.TemplateError) {
                err.ref = {
                  type: 8,
                  pos: { line: 19, col: 11 },
                  val: "#content",
                };
                return err;
              } else {
                return error(
                  cID,
                  { type: 8, pos: { line: 19, col: 11 }, val: "#content" },
                  "Include template reference failed",
                  err
                );
              }
            }
            if (ret2 instanceof G.TemplateError) {
              return ret2;
            } else {
              ret += ret2;
            }
            ret +=
              '\n\n<script src="/js/load.js"></script>\n\n</body>\n</html>\n\n';
            return ret;
          },
          "/master#page",
          { type: 2, pos: { line: 1, col: 0 }, val: '{$: "#page" }' }
        );
        partial(
          function __nav__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            ret +=
              '\n	<nav><a href="/">home</a> | <a href="/about">about</a></nav>\n';
            return ret;
          },
          "/master#nav",
          { type: 2, pos: { line: 29, col: 0 }, val: '{$: "#nav" }' }
        );
        partial(
          function __content__($, $$) {
            $$ = clone($$) || {};
            var i,
              ret = "",
              ret2,
              _;
            return ret;
          },
          "/master#content",
          { type: 2, pos: { line: 34, col: 0 }, val: '{$: "#content" }' }
        );
      })(this.grips || grips);
    }

    // hybrid event bindings
    context.Events.once(name, init);

    var grips = context.grips;

    // module API
    var public_api = {
      init: init,
    };

    return public_api;
  }
);
