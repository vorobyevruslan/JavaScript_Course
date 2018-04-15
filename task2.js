function Node(value) {
  this.value = value;
  this.nextNode = null;

  this.print = () => {
    process.stdout.write(value.toString());
    if (this.nextNode != null) {
      process.stdout.write(' -> ');
      this.nextNode.print();
    } else {
      process.stdout.write('\n');
    }
  };

  this.appendWithNode = newElem => {
    let elem = this;

    while (elem.nextNode != null) {
      elem = elem.nextNode;
    }
    elem.nextNode = newElem;
  };

  this.findNode = digit => {
    if (this.value === digit) {
      return this;
    }

    if (this.nextNode != null) {
      return this.nextNode.findElement(digit);
    }
    return null;
  };

  this.copy = () => {
    const c = new Node(this.value);

    c.nextNode = this.nextNode != null ? this.nextNode.copy() : null;
    return c;
  };

  this.removeNode = digit => {
    if (this.value === digit) {
      return this.nextNode == null ? null : this.nextNode.copy();
    }

    return this.copy().nextNode.removeNode(digit);
  };
}

function numberToList(num) {
  if (typeof num !== 'number') {
    console.log('Not a number passed!');
  }
  if (num === 0) {
    return new Node(0);
  }
  const list = new Node(num % 10);

  num = Math.floor(num / 10);
  while (num !== 0) {
    list.appendWithNode(new Node(num % 10));
    num = Math.floor(num / 10);
  }
  return list;
}

function add(listFirst, listSecond) {
  let newvalue = (listFirst.value + listSecond.value) % 10;
  let rest = Math.floor((listFirst.value + listSecond.value) / 10);
  const result = new Node(newvalue);

  listFirst = listFirst.nextNode;
  listSecond = listSecond.nextNode;
  while (1) {
    if (listFirst == null || listSecond == null) {
      break;
    }
    newvalue = (listFirst.value + listSecond.value + rest) % 10;
    rest = Math.floor((listFirst.value + listSecond.value + rest) / 10);
    result.appendWithNode(new Node(newvalue));

    listFirst = listFirst.nextNode;
    listSecond = listSecond.nextNode;
  }
  if (listFirst != null || listSecond != null) {
    if (listSecond !== null) {
      listFirst = listSecond;
    }
  }
  while (listFirst != null) {
    newvalue = (listFirst.value + rest) % 10;
    rest = Math.floor((listFirst.value + rest) / 10);
    result.appendWithNode(new Node(newvalue));
    listFirst = listFirst.nextNode;
  }
  if (rest !== 0) {
    result.appendWithNode(new Node(rest));
  }

  return result;
}

const num1 = numberToList(465);
const num2 = numberToList(243);

add(num1, num2).print();
