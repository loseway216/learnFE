// Async Await ES2017
function getFile(file) {
  return new Promise(function (resolve) {
    fakeAjax(file, resolve);
  });
}

async function loadFiles(files) {
  // request all files concurrently
  var prs = files.map(getFile);

  for (const pr of prs) {
    // print in order, sequentially
    console.log(await pr);
  }

  // 报错
  prs.forEach(function each(pr){
    console.log(await pr);
  })
}

loadFiles(["file1", "file2", "file3"]);

// **************************************

function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text",
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

// *************************
// Async Generators with yield
// yield:pushing  await:pulling  与获取所有结果，return一个结果数组不同，获取到一个结果就yield一个
async function *fetchURLs(urls){
  for (const url of urls) {
    let resp = await fetch(url)
    if(resp.status==200){
      let text = await resp.text()
      yield text
    }else{
      yield undefined
    }
  }
}

async function main(favoriteSites){
  for await (const text of fetchURLs(favoriteSites)) {
    console.log(text);
  }
}
