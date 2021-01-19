class HashTable {
  constructor(val) {
    this._storage = [];
    this._tableSize = val;
  }

  insert(key, value) {
    const index = this._hash(key, this._tableSize);
    // 处理冲突，用嵌套数组
    if (!this._storage[index]) this._storage[index] = [];

    this._storage[index].push([key, value]);
  }

  // 检索 [0, 0, [['a', 1], ['b', 2]], 0, 0]
  retrieve(key) {
    const index = this._hash(key, this._tableSize);
    const arrayAtIndex = this._storage[index];
    if (arrayAtIndex) {
      for (let i = 0; i < arrayAtIndex.length; i++) {
        const keyValueArray = arrayAtIndex[i];
        if (keyValueArray[0] === key) return keyValueArray[1];
      }
    }
  }

  remove(key) {
    const index = this._hash(key, this._tableSize);
    const arrayAtIndex = this._storage[index];
    if (arrayAtIndex) {
      for (let i = 0; i < arrayAtIndex.length; i++) {
        const keyValueArray = arrayAtIndex[i];
        if (keyValueArray[0] === key) {
          arrayAtIndex.splice(i, 1);
          return keyValueArray[1];
        }
      }
    }
  }

  _hash(str, max) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += input.charCodeAt(i) * i;
    }
    return sum % max;
  }
}
