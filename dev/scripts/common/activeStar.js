export default function activeStar(rate) {
  let html = "";
  for (let i = 0; i < rate; i++) {
    html += '<img src="assets/imgs/starActive.svg">';
  }
  for (let i = rate; i < 5; i++) {
    html += '<img src="assets/imgs/star.svg">';
  }
  return html;
}
