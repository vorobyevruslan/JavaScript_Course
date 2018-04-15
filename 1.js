function bin2dec(string) {
  if (typeof string !== 'string') {
    return undefined;
  }
  let decimal = 0;
  const reversestring = string.split('').reverse().join('');

  for (let i = 0; i < string.length; i++) {
    if (reversestring[i] !== '1' && reversestring[i] !== '0') {
      return undefined;
    }
    decimal += reversestring[i] * (2 ** i);
  }
  return decimal;
}

console.log(bin2dec('1001011'));
