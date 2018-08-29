export default class Queue {
  constructor({ autoStart = true, rejectStop = true } = {}) {
    this.autoStart = autoStart;
    this.rejectStop = rejectStop;
    this.status = "waiting";
    this.queueArr = [];
  }
  add = fn => {
    return new Promise((resolve, reject) => {
      this.queueArr.push(() =>
        Promise.resolve()
          .then(fn)
          .then(
            data => {
              this.queueArr.shift();
              this.start();
              return Promise.resolve(data);
            },
            err => {
              if (!this.rejectStop) {
                this.queueArr.shift();
                this.start();
              }
              return Promise.reject(err);
            }
          )
          .then(resolve, reject)
      );
      this.autoStart && this.status === "waiting" && this.start();
    });
  };
  start = () => {
    if (this.queueArr[0]) {
      this.status = "processing";
      this.queueArr[0]();
    } else {
      this.status = "waiting";
    }
  };
}
