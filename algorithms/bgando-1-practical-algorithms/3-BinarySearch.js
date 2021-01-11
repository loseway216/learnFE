function binarySearch(list, item) {
  let min = 0;
  let max = list.length - 1;
  let guess;

  while (min <= max) {
    guess = Math.floor((min + max) / 2);
    if (item < list[guess]) {
      max = guess - 1;
    }
    if (item > list[guess]) {
      min = guess + 1;
    }
    if (item === list[guess]) {
      return guess;
    }
  }
  return -1;
}

console.log(binarySearch([2, 6, 7, 90, 103], 90));
