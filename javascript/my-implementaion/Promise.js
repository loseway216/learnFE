const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

function Promise(executor) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;

  this.onResolvedCallback = [];
  this.onRejectedCallback = [];

  let resolve = (value) => {
    if (this.status == PENDING) {
      this.status = FULFILLED;
      this.value = value;

      this.onResolvedCallback.forEach((fn) => fn());
    }
  };

  let reject = (reason) => {
    if (this.status == PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      this.onRejectedCallback.forEach((fn) => fn());
    }
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status == PENDING) {
    this.onResolvedCallback.push(() => {
      onFulfilled(this.value);
    });

    this.onRejectedCallback.push(() => {
      onRejected(this.reason);
    });
  }

  if (this.status == FULFILLED) {
    onFulfilled(this.value);
  }

  if (this.status == REJECTED) {
    onRejected(this.reason);
  }
};

var p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

console.log(p);

p.then(
  (data) => {
    console.log("result:", data);
  },
  (err) => {
    console.log("err", err);
  }
);
