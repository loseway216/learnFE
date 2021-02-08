$(document).ready(function () {
  var $items = $("[rel=js-carousel] > [rel=js-content] > [rel=js-items]");
  var $content = $("[rel=js-details]");

  function loadPerson(ID) {
    $.ajax("details/" + ID + ".html", { dataType: "text" }).then(function (
      content
    ) {
      $content.html(content);
    });
  }

  function personClicked(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

    var ID = $(evt.target)
      .attr("rel")
      .replace(/^.*(\d+)$/, "$1");
    loadPerson(ID);
  }

  $items.on("click", "> [rel^=js-item-]", personClicked);
});
