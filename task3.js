function maxRepeats(string) {
  if (typeof string !== 'string') {
    return 'нет строки';
  }
  let current = '';

  for (let i = 0; i < string.length; i++) {
    current += string[i];
    const substring = string.split(current);

    const repetitions = substring.length - 1;

    if (substring.every(value => value === '')) {
      return repetitions;
    }
  }
}

console.log(maxRepeats('abcabcabcabc'));
