const fs = require("fs");
const zlib = require("zlib");
const gzip = zlib.createGzip();
const outStream = fs.createWriteStream("out.js.gz");

fs.createReadStream("./node-stream.js")
  .pipe(gzip)
  .pipe(outStream);

const outStream2 = fs.createWriteStream("out.js.zip");

fs.createReadStream("./node-stream.js")
  .pipe(zlib)
  .pipe(outStream2);
