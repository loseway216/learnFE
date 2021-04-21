const { SyncHook, SyncWaterfallHook, AsyncParallelHook } = require("tapable");

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncWaterfallHook(["newSpeed"]),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(["from", "to", "routesList"]),
    };
  }

  setSpeed(newSpeed) {
    console.log("do other things");
    this.hooks.accelerate.call(newSpeed);
  }

  async useNavigationSystemPromise(from, to) {
    var routesList = [];
    await this.hooks.calculateRoutes.promise(from, to, routesList);
    return routesList;
  }

  useNavigationSystemAsync(from, to, callback) {
    var routesList = [];
    this.hooks.calculateRoutes.callAsync(from, to, routesList, (err) => {
      if (err) return callback(err);
      callback(null, routesList);
    });
  }
}

const myCar = new Car();

// waterfall就是插件2可以接收插件1的返回值
myCar.hooks.accelerate.tap("LoggerPlugin", (...args) => {
  console.log(args);
  return "yes";
});

myCar.hooks.accelerate.tap("LoggerPlugin2", (...args) => console.log(args));

myCar.hooks.calculateRoutes.tapPromise(
  "GoogleMapsPlugin",
  (from, to, routesList) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        routesList.push("road1");
        routesList.push("road2");
        resolve();
      }, 1000);
    });
  }
);

myCar.setSpeed(100);

myCar
  .useNavigationSystemPromise("百家湖", "九龙湖")
  .then((res) => console.log(res));

myCar.useNavigationSystemAsync("百家湖", "九龙湖", (...args) => {
  console.log(args);
});
