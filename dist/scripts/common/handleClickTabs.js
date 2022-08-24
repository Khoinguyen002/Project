export default function handleClickTab(childClass) {
  $(`.${childClass}`).click(function () {
    $(`.${childClass}.active`).removeClass("active");
    $(this).addClass("active");
  });
}
