import game, { handleUserAction } from "./gameState";
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";

function init() {
  // const jsonStr = sessionStorage.getItem("state");
  // if (jsonStr) {
  //   game.restoreState(jsonStr);
  // }
  console.log("starting game");
  initButtons(handleUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    // 每3秒执行一次
    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;

      // game.saveState();
    }

    requestAnimationFrame(nextAnimationFrame);
  }
  // 浏览器空闲时（idle）时执行动画
  requestAnimationFrame(nextAnimationFrame);
}

init();
