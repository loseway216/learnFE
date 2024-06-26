(function (context) {
  var notifications = [],
    $notifications,
    $notifications_list,
    $close;

  function notice(msg) {
    var i, $msg, notification;

    // cache DOM lookups
    $notifications = $notifications || $("#notifications");
    $notifications_list =
      $notifications_list || $notifications.children(".list");
    if (!$close) {
      $close = $notifications.children(".close");
      $close.bind("click", reset);
    }

    for (i = 0; i < notifications.length; i++) {
      if (notifications[i] === msg) {
        // move previous notification message to top of list
        $notifications_list.prepend(
          $notifications_list.children(".notification:eq(" + i + ")")
        );
        notification = notifications.splice(i, 1)[0];
        notifications.unshift(notification);
        return;
      }
    }

    notifications.unshift(msg);
    $msg = $("<div></div>").addClass("notification").text(msg);

    $notifications_list.prepend($msg);
    $notifications.show();
  }

  function warn(msg) {
    warn(msg);
  }

  function error(msg) {
    notice(msg);
  }

  function reset() {
    notifications.length = 0;
    if ($notifications) {
      $notifications_list.empty();
      $notifications.hide();
    }
  }

  context.Events.on("notify.notice", notice);
  context.Events.on("notify.warn", warn);
  context.Events.on("notify.error", error);
  context.Events.on("notify.reset", reset);
})(window);
