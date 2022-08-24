import ajax from "/scripts/common/ajax.js";
import handleTabs from "/scripts/common/handleClickTabs.js";

function handleAddPatientTab() {
  function hideTabContent() {
    $(".personalInfo").hide();
    $(".guardianInfo").hide();
  }
  hideTabContent();
  $(".personalInfo").fadeIn();

  $(".addNewPatientTab").click(function () {
    hideTabContent();
    handleTabs("addNewPatientTab");
    $(`[ref=${$(this).attr("data-id")}]`).fadeIn();
  });
}

function collectInfo() {
  const data = {};
  $("form#personalInfo button").click(() => {
    $("form#personalInfo")
      .serializeArray()
      .forEach((item) => {
        data[item.name] = item.value;
      });

    $(".addNewPatientTab.active").removeClass("active");
    $(".addNewPatientTab[data-id=addNewPatientTab1]").addClass("active");

    $(".personalInfo").hide();
    $(".guardianInfo").fadeIn();
  });

  $("form#guardianInfo button").click(() => {
    const fd = new FormData();
    const img = $("input[type=file]")[0].files[0];

    const status = () => {
      const random = Math.floor(Math.random() * 100);

      if (random <= 30) {
        return "In Treatment";
      } else if (random <= 60) {
        return "New Patient";
      } else return "Recovered";
    };

    fd.append("image", img);
    $("form#guardianInfo")
      .serializeArray()
      .forEach((item) => {
        data[item.name] = item.value;
      });

    // Hard Code
    data["disease"] = "Cold & Flu";
    data["status"] = status();
    data["roomNo"] = "D-106";
    data["doctorAssigned"] = "Charlotte";

    ajax(
      "https://api.imgbb.com/1/upload?key=809acb063cda3c3dab5d39decec18813",
      "post",
      fd,
      "#guardianInfo button"
    ).done((res) => {
      data.avatar = res.data.display_url;
      ajax(
        "https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/patient",
        "post",
        data,
        "#guardianInfo button"
      ).then(() => {
        window.location.replace("/patientList.html");
      });
    });
  });
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".avatar").css("background-image", `url(${e.target.result})`);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
  $(".upload-btn").click(() => {
    $(".personalInfo-avatar input").trigger("click");
  });
  $(".personalInfo-avatar input").change(function () {
    readURL(this);
  });
}

handleAddPatientTab();
collectInfo();
