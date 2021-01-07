// 线性查找
function linearSearch(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) return array[i];
  }
}

// 二分查找，O(log n)，前提：array是排好序的
function binarySearch(id, array) {
  let min = 0;
  let max = array.length - 1;
  let index;
  let element;

  while (min <= max) {
    index = Math.floor((min + max) / 2);
    element = array[index];
    if (element.id < id) {
      min = index + 1;
    } else if (element.id > id) {
      max = index - 1;
    } else {
      return element;
    }
  }
}

// unit tests
// do not modify the below code
describe("linear search", function () {
  it("should find an object on an unsorted array", () => {
    const lookingFor = { id: 5, name: "Brian" };
    expect(
      linearSearch(5, [
        { id: 1, name: "Sam" },
        { id: 11, name: "Sarah" },
        { id: 21, name: "John" },
        { id: 10, name: "Burke" },
        { id: 13, name: "Simona" },
        { id: 31, name: "Asim" },
        { id: 6, name: "Niki" },
        { id: 19, name: "Aysegul" },
        { id: 25, name: "Kyle" },
        { id: 18, name: "Jem" },
        { id: 2, name: "Marc" },
        { id: 51, name: "Chris" },
        lookingFor,
        { id: 14, name: "Ben" },
      ])
    ).toBe(lookingFor);
  });
});

describe("binary search", function () {
  it("should test things", () => {
    const lookingFor = { id: 23, name: "Brian" };
    expect(
      binarySearch(23, [
        { id: 1, name: "Sam" },
        { id: 3, name: "Sarah" },
        { id: 5, name: "John" },
        { id: 6, name: "Burke" },
        { id: 10, name: "Simona" },
        { id: 12, name: "Asim" },
        { id: 13, name: "Niki" },
        { id: 15, name: "Aysegul" },
        { id: 17, name: "Kyle" },
        { id: 18, name: "Jem" },
        { id: 19, name: "Marc" },
        { id: 21, name: "Chris" },
        lookingFor,
        { id: 24, name: "Ben" },
      ])
    ).toBe(lookingFor);
  });
});
