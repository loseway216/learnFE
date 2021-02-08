var Details = (function () {
  var $content;

  EVT.on("init", init);
  // 订阅点击人员的事件
  EVT.on("person-selected", loadPerson);

  return { init };

  function init() {
    $content = $("[rel=js-details]");

    // 点击a标签从人员2切到4
    $content.on("click", "[rel=js-select-person]", pickAnotherPerson);
  }

  function pickAnotherPerson(e) {
    var id = $(e.target).attr("data-person");

    EVT.emit("person-selected", id);
  }

  function loadPerson(id) {
    var url = `details/${id}.html`;
    $.ajax(url, { dataType: "text" }).then(function (content) {
      $content.html(content);
    });
  }
})();
