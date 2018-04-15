function parenthesisSequence(string) {
  const bracketsequence = '[]{}()';
  const stack = [];
  let bracePosition;

  for (let i = 0; string[i]; i++) {
    bracePosition = bracketsequence.indexOf(string[i]);

    if (bracePosition === -1) {
      continue;
    }

    if (bracePosition % 2 === 0) {
      stack.push(bracePosition + 1);
    } else {
      if (stack.pop() !== bracePosition) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(parenthesisSequence('{[]({})}'));
