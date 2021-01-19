const Stack = require("../1-Stack");

// 校验括号是否匹配
function isBalanced(code) {
  const bracketsPair = { "(": ")", "[": "]", "{": "}" };

  const leftBracket = new Set(["(", "[", "{"]);
  const rightBracket = new Set([")", "]", "}"]);

  const leftBracketStack = new Stack();

  for (let i = 0; i < code.length; i++) {
    const char = code.charAt(i);

    if (leftBracket.has(char)) {
      leftBracketStack.push(char);
    } else if (rightBracket.has(char)) {
      if (leftBracketStack.isEmpty()) return false;

      const lastUnclosedLeft = leftBracketStack.pop();
      if (bracketsPair[lastUnclosedLeft] !== char) return false;
    }
    console.log(leftBracketStack);
  }

  return leftBracketStack.isEmpty();
}

console.log(isBalanced("(aaa){"));
