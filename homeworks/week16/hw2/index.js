class Stack {
  constructor() {
    this.data = [];
  }

  push(variable) {
    this.data.unshift(variable);
  }

  pop() {
    const res = this.data[0];
    this.data.shift();
    return res;
  }
}

class Queue {
  constructor() {
    this.data = [];
  }

  push(variable) {
    this.data.unshift(variable);
  }

  pop() {
    const i = this.data.length - 1;
    const res = this.data[i];
    this.data.splice(i, 1);
    return res;
  }
}

const stack = new Stack();
stack.push(10);
stack.push(5);
console.log(stack.pop()); // 5
console.log(stack.pop()); // 10

const queue = new Queue();
queue.push(1);
queue.push(2);
console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
