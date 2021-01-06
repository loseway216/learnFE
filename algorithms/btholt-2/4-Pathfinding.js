// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data
const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

const findShortestPathLength = (maze, [xA, yA], [xB, yB]) => {
  // 针对每个点，构造更复杂的data structure
  const visited = maze.map((row, y) =>
    row.map((origin, x) => ({
      closed: origin === 1,
      length: 0,
      openedBy: NO_ONE,
      x,
      y,
    }))
  );
  visited[yA][xA].openedBy = BY_A;
  visited[yB][xB].openedBy = BY_B;
  logMaze(visited);

  let aQueue = [visited[yA][xA]];
  let bQueue = [visited[yB][xB]];
  let iteration = 0;

  while (aQueue.length && bQueue.length) {
    iteration++;

    // 获取A点的四个邻居、邻居的邻居，reduce相当于一起出队列
    const aNeighbors = aQueue.reduce(
      (acc, neighbor) =>
        acc.concat(getNeighbors(visited, neighbor.x, neighbor.y)),
      []
    );

    // 清空队列，下面把邻居添加到队列
    aQueue = [];
    for (let i = 0; i < aNeighbors.length; i++) {
      const neighbor = aNeighbors[i];
      // 如果和B点的路径相交了，就是找到了最短路径
      if (neighbor.openedBy === BY_B) {
        return neighbor.length + iteration;
        // 没找到，状态更新为被A点接触
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = BY_A;
        aQueue.push(neighbor);
      }
    }

    const bNeighbors = bQueue.reduce(
      (acc, neighbor) =>
        acc.concat(getNeighbors(visited, neighbor.x, neighbor.y)),
      []
    );
    bQueue = [];
    for (let i = 0; i < bNeighbors.length; i++) {
      const neighbor = bNeighbors[i];
      if (neighbor.openedBy === BY_A) {
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = BY_B;
        bQueue.push(neighbor);
      }
    }
    logMaze(visited);
  }
  // 找不到路径返回1
  return -1;
};

// 获取一个点的四周
const getNeighbors = (visited, x, y) => {
  const neighbors = [];

  // up
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    neighbors.push(visited[y - 1][x]);
  }

  // down
  if (y + 1 < visited.length && !visited[y + 1][x].closed) {
    neighbors.push(visited[y + 1][x]);
  }

  // left
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    neighbors.push(visited[y][x - 1]);
  }

  // right
  if (x + 1 < visited[0].length && !visited[y][x + 1].closed) {
    neighbors.push(visited[y][x + 1]);
  }

  return neighbors;
};

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// {
//  openedBy: number - represents who owns it, 0 meaning no one owns it yet
//  closed: boolean  - if the node is an unpassable wall
// .length: number   - how far away the current node is from its origin
// }
function logMaze(maze) {
  console.log("================");
  let header = "XX | ";
  let subheader = "-----";
  for (let i = 0; i < maze[0].length; i++) {
    const num = i >= 10 ? i : "0" + i;
    header += `${num} `;
    subheader += "---";
  }
  console.log(header);
  console.log(subheader);
  maze.forEach((row, i) => {
    const num = i >= 10 ? i : "0" + i;
    let buffer = `${num} | `;

    row.forEach((item) => {
      if (item.closed) {
        buffer += "XX ";
      } else if (item.openedBy === NO_ONE) {
        buffer += "•• ";
      } else {
        buffer += (item.length >= 10 ? item.length : "0" + item.length) + " ";
      }
    });

    console.log(buffer);
  });
}

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having, solve some of the edge cases too!
// just remove the x from xdescribe
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2],
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
