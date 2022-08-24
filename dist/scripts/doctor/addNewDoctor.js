function handlePictureUpload(className) {
  function modifyUpload(e, input) {
    $(`.${className} .file-upload-img img`).attr("src", e.target.result);
    $(`.${className} .drag-text.text`).text("Cancel");
    $(`.${className} .file-upload-btn`).text(input.files[0].name);
  }

  function modifyCancel(input) {
    if ($(`.${className} .drag-text.text`).text() == "Cancel") {
      $(`.${className} .file-upload-img img`).attr(
        "src",
        "assets/imgs/cloud.svg"
      );
      input.files[0] = null;
      $(`.${className} .drag-text.text`).text("Maximum Image Size 2MB");
      $(`.${className} .file-upload-btn`).text("drop your image here");
    }
  }
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        modifyUpload(e, input);
      };
      $(`.${className} .drag-text`).click(() => {
        modifyCancel(input);
      });
      reader.readAsDataURL(input.files[0]);
    }
  }

  function addEvent() {
    $(`.${className} .file-upload-input`).change(function () {
      readURL(this);
    });
  }
  addEvent();
}

function handleSubmit() {
  const data = {};
  $("#doctorInfo button").click(() => {
    const fd = new FormData();
    const img = $(".profilePicture input[type=file]")[0].files[0];
    fd.append("image", img);
    ajax(
      "https://api.imgbb.com/1/upload?key=809acb063cda3c3dab5d39decec18813",
      "post",
      fd,
      "#doctorInfo button"
    ).then((response) => {
      const formData = new FormData();
      const image = $(".coverPicture input[type=file]")[0].files[0];
      formData.append("image", image);
      data["avatar"] = response.data.display_url;
      ajax(
        "https://api.imgbb.com/1/upload?key=809acb063cda3c3dab5d39decec18813",
        "post",
        formData,
        "#doctorInfo button"
      ).then((res) => {
        data["background"] = res.data.display_url;

        // hard code
        data["rate"] = Math.round(Math.random() * 5);
        data["biography"] =
          "George A. Sample, MD, FCCP, is a graduate of George Washington University Medical School." +
          "He trained in internal medicine at the University of Oregon Health Sciences (UOHS) and pulmonary critical care" +
          "medicine at UOHS and the University of Southern California.Sample has been practicing since 1976, the last 12 years" +
          "in Washington, D.C., at the Washington Hospital Center, selected as one of the top 100 hospitals in the United States." +
          "Sample's practice specializes in the care of critically.George A. Sample, MD, FCCP, is a graduate of George Washington " +
          "University Medical School. He trained in internal medicine at the University of Oregon Health Sciences (UOHS) and pulmonary " +
          "critical care medicine at UOHS and the University of Southern California.Sample has been practicing since 1976," +
          "the last 12 years in Washington, D.C., at the Washington Hospital Center, selected as one of the top 100 hospitals in the United States." +
          "Sample's practice specializes in the care of critically.";

        data["short_description"] =
          "George A. Sample, MD, FCCP, is a Medical graduate George Washington University internal medicine.";
        data["available_time"] = "4:00 AM : 8:00 PM";

        $("#doctorInfo")
          .serializeArray()
          .forEach((item) => {
            data[item.name] = item.value;
          });
        ajax(
          "https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/doctor",
          "post",
          data,
          "#doctorInfo button"
        ).then(() => {
          window.location.replace("/allDoctor.html");
        });
      });
    });
  });
}

handlePictureUpload("profilePicture");
handlePictureUpload("coverPicture");
handleSubmit();
