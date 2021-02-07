// put event handlers for header links here
$(document).ready(function () {
  var $modal = $("[rel='js-modal']");

  // $("[rel*='js-register'], [rel*='js-login']").click(function (e) {
  $("[rel*='js-controls']").on("click", "[rel*='js-']", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var url = $(e.target).attr("href");

    $.ajax(url, { dataType: "text" }).then(function (contents) {
      $modal.html(contents).show();
    });
  });
});
