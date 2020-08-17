//从rss_feeds.txt里配置的feed读title和link
//定义一个数组，顺序执行读文件、发请求、处理返回
const fs = require("fs");
const request = require("request");
const htmlparser = require("htmlparser");
const configFilename = "./rss_feeds.txt";

function checkForRSSFile() {
  fs.exists(configFilename, exists => {
    if (!exists) {
      return next(new Error(`file not found: ${configFilename}`));
    }
    next(null, configFilename);
  });
}

function readRSSFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) {
      return next(err);
    }
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, "")
      .split("\n");
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed(feedUrl) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200)
      return next(new Error(`respnes status code:${res.statusCode}`));
    next(null, body);
  });
}

function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) return next(new Error("NO RSS items found"));
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

const tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];
function next(err, result) {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}
next();
//async.series([])
