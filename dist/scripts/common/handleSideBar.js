function activeTab() {
  const arrowRight = () => {
    $(".tab.active .tab-title img").attr("src", "assets/imgs/arrowRight.svg");
  };
  const arrowBottom = () => {
    $(".tab.active .tab-title img").attr("src", "assets/imgs/arrowBottom.svg");
  };

  $(".tab").click(function () {
    const tab_links_class = ".tab.active .tab-links";

    $(".tab.active").removeClass("active");
    $(this).addClass("active");
    if ($(tab_links_class).children().length != 0) {
      if ($(tab_links_class).css("display") === "none") {
        $(tab_links_class).fadeIn(500);
        arrowBottom();
      } else {
        $(tab_links_class).hide();
        arrowRight();
      }
    }
  });

  $(".tab-link").click(function (e) {
    e.stopPropagation();
    $(".tab-link.active").removeClass("active");
    $(this).addClass("active");
  });

  function handleActiveReload() {
    let path = window.location.pathname;
    const tabToActive = $(`div[href=".${path}"]`);

    if (tabToActive.parent().attr("class") == "base-sidebar-linkList") {
      tabToActive.addClass("active");
    } else {
      tabToActive.parent().prev().parent().addClass("active");
      tabToActive.parent().show();
      tabToActive.addClass("active");
    }
  }
  handleActiveReload();
}
activeTab();
