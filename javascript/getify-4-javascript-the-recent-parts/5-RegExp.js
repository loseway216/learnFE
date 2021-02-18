// *****************************
// ES2018添加了后行断言 look-behind
var msg = "Hello World";

msg.match(/(l.)/g);
// [("ll", "ld")];

// 匹配末尾
msg.match(/(l.)$/g);
// ["ld"];

// 先行断言，positive look-ahead，跟在o前面的
msg.match(/(l.)(?=o)/g);
// ["ll"];

// negative look-ahead
msg.match(/(l.)(?!o)/g);
// [("lo", "ld")];

// positive look-behind
msg.match(/(?<=e)(l.)/g);
// ["ll"]

// nagetive look-behind
msg.match(/(?<!e)(l.)/g);
// [("lo", "ld")];

// *******************************
// capture groups
msg.match(/.(l.)/);
// [ 'ell', 'll', index: 1, input: 'Hello World', groups: undefined ]

msg.match(/([jkl])o Wor\1/);
// ["lo Worl", "l", index: 3, input: "Hello World", groups: undefined]

// named capture groups
msg.match(/(?<cap>l.)/).groups;
// {cap: "ll"}

msg.replace(/(?<cap>l.)/g, "-$<cap>-");
// "He-ll-o Wor-ld-"

msg.replace(/(?<cap>l.)/g, function re(...args) {
  var [, , , , { cap }] = args;
  return cap.toUpperCase();
});
// "HeLLo WorLD"

// ***************************
// dotAll mode
var msg = `
The quick brown fox
jumps over the
lazy dog`;

msg.match(/brown.*over/);
// null

msg.match(/brown.*over/s);
// ["brown fox↵jumps over", index: 11, input: "↵The quick brown fox↵jumps over the↵lazy dog", groups: undefined]

console.log("-----------------------");
console.log("Exercise\r\n");
// The Power of a Smile
// by Tupac Shakur
var poem = `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`;

for (let power of powers(poem)) {
  console.log(power);
}
// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// smile: heal

function* powers(poem) {
  var re = /(?<=power of )(?<thing>(a )?\w+).*?(?<=can )(?<verb>\w+)/gs;

  var match;
  while ((match = re.exec(poem))) {
    let {
      groups: { thing, verb },
    } = match;
    yield `${thing}:${verb}`;
  }
}
