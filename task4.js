function PopularWord(string) {
  let words = string.split(/[ \s\t,.!?:;()]+/);
  let maxrepeat = [];
  let count = 0;
  let current;

  for (let i = 0; i < words.length; i++) {
    if (!words[i]) {
      continue;
    }
    let j = i + 1;
    let tempCount = 0;
    let inx;

    while ((inx = words.indexOf(words[i], j)) >= 0) {
      j = inx;
      words[j] = undefined;
      tempCount++;
    }
    if (tempCount >= count) {
      if (tempCount > count) {
        maxrepeat.length = 0;
      }
      count = tempCount;
      current = words[i];
      maxrepeat.push(current);
    }
    words[i] = undefined;
  }
  return maxrepeat[0];
}

console.log(PopularWord('Sed tempus ipsum quis eros tempus lacinia Cras finibus lorem ut lacinia egestas nunc nibh iaculis est convallis tincidunt mi mi sed \nnisl Sed porttitor aliquam elit ullamcorper tincidunt arcu euismod quis Mauris congue elit suscipit leo varius facilisis Cras et arcu sodales laoreet \nest vitae pharetra orci Integer eget nulla dictum aliquet justo semper molestie neque Maecenas bibendum lacus tincidunt auctor varius purus felis \nullamcorper dui et laoreet ligula ex et risus Donec eget fringilla nibh Cras congue tincidunt accumsan Maecenas euismod eleifend elit ut rhoncus tortor \nsodales a Cras egestas finibus lorem non tempor tincidunt aera\n'));
