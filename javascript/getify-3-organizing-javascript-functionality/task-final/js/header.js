var Header = (function () {
  var $modal;

  EVT.on("init", init);

  return { init };

  function init() {
    $modal = $("[rel='js-modal']");

    // $("[rel*='js-register'], [rel*='js-login']").click(function (e) {
    $("[rel*='js-controls']").on("click", "[rel*='js-']", HeaderLinkClicks);
  }

  function HeaderLinkClicks(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var url = $(e.target).attr("href");

    $.ajax(url, { dataType: "text" }).then(function (contents) {
      $modal.html(contents).show();
    });
  }
})();
