function ajax(url, method, data, buttonLoading) {
  let option;
  function startRotate() {
    $(`${buttonLoading}`).attr("disabled", true).addClass("rotate");
  }
  function endRotate() {
    $(`${buttonLoading}`).attr("disabled", false).removeClass("rotate");
  }
  if (url.includes("https://api.imgbb.com/")) {
    option = {
      url: url,
      method: method,
      data: data,
      processData: false,
      contentType: false,
      beforeSend: () => {
        startRotate();
      },
      success: () => {
        endRotate();
      },
    };
  } else
    option = {
      url: url,
      method: method,
      data: data,
      beforeSend: () => {
        startRotate();
      },
      success: () => {
        endRotate();
      },
    };
  return $.ajax(option);
}

export default ajax;
