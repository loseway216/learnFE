// delete很快，get很慢
class LinkedList {
  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    this.length++;
    if (!this.head) {
      this.head = node;
    } else {
      // 将当前的tail的next指向新增元素
      this.tail.next = node;
    }
    // 将新增的元素设成tail
    this.tail = node;
  }

  pop() {
    return this.delete(this.length - 1);
  }

  get(index) {
    const node = this._find(index, this._testIndex);
    if (!node) return null;
    return node.value;
  }

  // 找到value所属的node
  _find(value, test = this._test) {
    let current = this.head;
    let i = 0;
    while (current) {
      if (test(value, current.value, i, current)) {
        return current;
      }
      current = current.next;
      i++;
    }
    return null;
  }

  _test(search, nodeValue) {
    return search === nodeValue;
  }

  _testIndex(search, __, i) {
    return search === i;
  }

  delete(index) {
    // 删除head的特殊情况
    if (index === 0) {
      const head = this.head;
      if (head) {
        this.head = head.next;
      } else {
        this.head = this.tail = null;
      }
      this.length--;
      return head.value;
    }

    // 前一个
    const node = this._find(index - 1, this._testIndex);
    // 需要摘除的
    const excise = node.next;
    if (!excise) return null;
    node.next = excise.next;
    // 如果删除的是最后一个元素，把前一个设成tail
    if (node.next && !node.next.next) this.tail = node;
    this.length--;
    return excise.value;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// unit tests
// do not modify the below code
describe("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  it("constructor", () => {
    expect(list).toEqual(jasmine.any(LinkedList));
  });

  it("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  it("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  it("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  it("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
