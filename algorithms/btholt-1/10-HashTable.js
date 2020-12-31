/*

  A HashTableSet!

  Name your class/newable-function HashTableSet.

  With a set, you want to put in a value to check later if it's in the collection.
  You are going to watch a sufficiently large array to assure you don't have collisions. I did 255
  to start with. When added, use a hashing function to hash the string and put in your table.
  The class should have three functions:

  add -   function - takes a string as an input, hashes it, and puts in its table
  check - function - takes a string and returns true if it exists in its table; otherwise returns false
  hash -  function - takes a string and a max number and return a number between 0 and the max number
                     function must be idempotent; the same string and max number will always yield the
                     same output
*/

class HashTableSet {
  constructor() {
    this.table = new Array(255);
  }
  add(input) {
    this.table[this.hash(input, 255)] = input;
  }
  check(input) {
    return !!this.table[this.hash(input, 255)];
  }
  hash(input, max) {
    let num = 0;
    for (let i = 0; i < input.length; i++) {
      num += input.charCodeAt(i) * i;
    }
    return num % max;
  }
}

// unit tests
// do not modify the below code
describe("hash table set", function () {
  it("hash", () => {
    const table = new HashTableSet();
    expect(table.hash("test 1", 50)).toEqual(table.hash("test 1", 50));
    expect(table.hash("test 2", 10)).toEqual(table.hash("test 2", 10));
    expect(
      table.hash("a much longer strings than the other ones", 255)
    ).toEqual(table.hash("a much longer strings than the other ones", 255));
    expect(table.hash("1 tset", 50)).not.toEqual(table.hash("test 1", 50));
    expect(
      table.hash("a much longer strings than the other ones", 2)
    ).toBeLessThan(3);
  });
  it("add and check", () => {
    const table = new HashTableSet();
    table.add("hi");
    table.add("this is fun");
    table.add("another thing");

    //document.getElementById('target').innerHTML = JSON.stringify(table, null, 4);

    expect(table.check("hi")).toEqual(true);
    expect(table.check("this is fun")).toEqual(true);
    expect(table.check("another thing")).toEqual(true);

    expect(table.check("ih")).toEqual(false);
    expect(table.check("not in the list")).toEqual(false);
    expect(table.check("also not in the list")).toEqual(false);
  });
});
