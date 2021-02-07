var Details = (function () {
  function loadPerson(e) {
    // var id = e.target.className[e.target.className.length - 1];
    var id = $(e.target)
      .attr("rel")
      .replace(/^.*(\d+)$/, "$1"); // 用正则表达式

    var url = `details/${id}.html`;
    $.ajax(url, { dataType: "text" }).then(function (content) {
      $content.html(content);
    });
  }

  function init() {
    $items = $("[rel=js-carousel] > [rel=js-content] > [rel=js-items]");
    $content = $("[rel=js-details]");

    $items.on("click", "[rel*='js-item-']", loadPerson);
  }

  var $items;
  var $content;

  return { init };
})();

$(document).ready(Details.init);
