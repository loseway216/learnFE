//从text目录下的文件中计数单词出现频率
//定义一个计数器，并行执行读取任务
const fs = require("fs");
const tasks = [];
const wordCounts = {};
const filesDir = "./text";
let completedTasks = 0;

function checkIfComplete() {
  completedTasks++;
  if (completedTasks === tasks.length) {
    for (let index in wordCounts) {
      console.log(`${index}:${wordCounts[index]}`);
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();
  words.filter(word => word).forEach(word => addWordCount(word));
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const task = (file => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(`${filesDir}/${file}`);
    tasks.push(task);
  });
  tasks.forEach(task => task());
});
