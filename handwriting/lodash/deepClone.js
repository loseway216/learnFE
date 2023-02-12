function deepClone1(target) {
  return JSON.parse(JSON.stringify(target));
}

function deepClone(target, map = new Map()) {
  if (typeof target === "object") {
    // 处理数组
    let cloneTarget = Array.isArray(target) ? [] : {};
    // 处理循环引用
    if (map.get(target)) {
      return target
    }
    map.set(target, cloneTarget)
    for (const key in target) {

      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: {
//     child: 'child'
//   },
//   field4: [2, 4, 8]
// };

// const obj2 = deepClone(target);

// target.field3.child = 3;
// console.log(target);
// console.log(obj2);


console.log('////////////////////////////////');

// const arr1 = [1, { a: 2 }]

// const arr2 = deepClone(arr1)

// arr1[1].a = 3
// console.log(arr1);
// console.log(arr2);



console.log('////////////////////////////////');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target;

const cloneTarget = deepClone(target)
target.target.field1 = 2

console.log(target);
console.log(cloneTarget);
