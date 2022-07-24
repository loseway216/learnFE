const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");

// let's store all current messages here
let allChat = [];

// the interval to poll at in milliseconds
const INTERVAL = 3000;

// a submit listener on the form in the HTML
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  const data = {
    user,
    text,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  await fetch("/poll", options);
}

async function getNewMsgs() {
  try {
    const res = await fetch("/poll");
    const json = await res.json();

    if (res.status >= 400) {
      throw new Error("request did not succeed: " + res.status);
    }

    allChat = json.msg;
    render();
    failedTries = 0;
  } catch (error) {
    console.error("polling error", error);
    failedTries++;
  }

  // setTimeout与setInterval的区别是会先执行完前面的操作
  // setTimeout(getNewMsgs, INTERVAL);
}

function render() {
  // as long as allChat is holding all current messages, this will render them
  // into the ui. yes, it's inefficent. yes, it's fine for this example
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

// given a user and a msg, it returns an HTML string to render to the UI
const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

// make the first request
// getNewMsgs();

const BACKOFF = 5000;
// 用requestAnimationFrame来替代，切换tab页会暂停请求
let timeToMakeNextRequest = 0;
let failedTries = 0;
async function rafTimer(time) {
  if (timeToMakeNextRequest <= time) {
    await getNewMsgs();
    timeToMakeNextRequest = time + INTERVAL + failedTries * BACKOFF;
  }

  requestAnimationFrame(rafTimer);
}

requestAnimationFrame(rafTimer);
