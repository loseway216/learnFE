var EVT = new EventEmitter2();

$(document).ready(function () {
  // 不再手动init
  EVT.emit("init");
  // Header.init();
  // Carousel.init();
  // Details.init();
});
