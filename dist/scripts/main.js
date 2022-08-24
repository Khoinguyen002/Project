var doit;
window.onresize = function () {
  clearTimeout(doit);
  doit = setTimeout(handleResize, 100);
};

function handleResize() {
  handleHeight();
  handleFontSizeChart();
  keepBalanceDashBoardSize();
}
