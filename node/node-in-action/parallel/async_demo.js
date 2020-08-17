const async = require("async");
const child_process = require("child_process");
const exec = child_process.exec;

function downloadNodeVersion(version, destination, callback) {
  const url = `http://nodejs.org/dist/v${version}/node-v${version}.tar.gz`;
  const filepath = `${destination}/${version}.tgz`;
  exec(`curl ${url} > ${filepath}`, callback);
}

async.series([
  //串行1：下载
  callback => {
    //并行：下载2个包
    async.parallel(
      [
        callback => {
          console.log("downloading node v4.4.7...");
          downloadNodeVersion("4.4.7", "/tmp", callback);
        },
        callback => {
          console.log("downloading node v6.3.0...");
          downloadNodeVersion("6.3.0", "/tmp", callback);
        }
      ],
      callback
    );
  },
  //串行2：打包
  callback => {
    console.log("creating archive of downloaded files...");
    exec("tar cvf node_distros.tar /tmp/4.4.7.tgz /tmp/6.6.0.tgz", err => {
      if (err) throw err;
      console.log("all done");
      callback();
    });
  }
]);
