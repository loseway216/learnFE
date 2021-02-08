var Carousel = (function () {
  var $content,
    $items,
    $left,
    $right,
    contentWidth,
    itemsWidth,
    position,
    maxPosition;

  EVT.on("init", init);

  return { init };

  function init() {
    $content = $("[rel=js-carousel] > [rel=js-content]");
    $items = $content.children("[rel=js-items]");
    $left = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-left]");
    $right = $("[rel=js-carousel] > [rel=js-controls] > [rel=js-right]");

    contentWidth = $content.width();
    itemsWidth = $items.width();
    position = 0;
    maxPosition = itemsWidth - contentWidth;

    $left.on("click", scrollLeft);
    $right.on("click", scrollRight);

    // 从details中移到此处，因为操作的是carousel，分离clickPerson和loadPerson方法
    $items.on("click", "[rel*='js-item-']", clickPerson);
  }

  function scrollLeft(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position > 0) {
      position = Math.max(0, position - 250);
    }

    $items.css({ left: -position + "px" });
  }

  function scrollRight(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    if (position < maxPosition) {
      position = Math.min(maxPosition, position + 250);
    }

    $items.css({ left: -position + "px" });
  }

  function clickPerson(e) {
    // var id = e.target.className[e.target.className.length - 1];
    var id = $(e.target)
      .attr("rel")
      .replace(/^.*(\d+)$/, "$1"); // 用正则表达式

    // 从手动调用details中的function，改成事件驱动
    EVT.emit("person-selected", id);
    // Details.loadPerson()

    // highlight
    $items.children().css("border", "none");
    $(e.target).css("border", "1px solid orangered");
  }
})();
