import ajax from "/scripts/common/ajax.js";
import handleTabs from "/scripts/common/handleClickTabs.js";

function appendPatientProfile() {
  ajax(
    `https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/patient/${
      window.location.search ? window.location.search.slice(1) : "1"
    }`,
    "get"
  ).then((res) => {
    $(".patientProfile-content .patientInfomation").append(`
        <div class="col-sm-6">
          ${(function () {
            let html = "";
            for (const key in res) {
              if (Object.hasOwnProperty.call(res, key)) {
                if (
                  !(
                    key == "avatar" ||
                    key == "name" ||
                    key == "date_check_in" ||
                    key == "avatar" ||
                    key == "id"
                  )
                ) {
                  html += `<div class="text">${(function (params) {
                    const words = key.replaceAll("_", " ").split(" ");
                    words.forEach((_, i) => {
                      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                    });
                    return words.join(" ");
                  })()}</div>`;
                }
              }
            }
            return html;
          })()}
        </div>
        <div class="col-sm-6">
          ${(function () {
            let html = "";
            for (const key in res) {
              if (Object.hasOwnProperty.call(res, key)) {
                if (
                  !(
                    key == "avatar" ||
                    key == "name" ||
                    key == "date_check_in" ||
                    key == "avatar" ||
                    key == "id"
                  )
                ) {
                  html += `<div class="text">${res[key]}</div>`;
                }
              }
            }
            return html;
          })()}
        </div>
      `);
    $(".patientProfile-content .head-avatar img").attr("src", res.avatar);
    $(".patientProfile-content .head-info .name").text(res.name);
    $(".patientProfile-content .head-info .id").text("#" + res.id);
    $(".patientProfile-content .head-info .disease").text(res.disease);
  });
}

function keepBalancePatientHeight() {
  const heightRef =
    $(".patientProfile .col-xl-5").height() -
    $(".heartRate-title").height() -
    70;
  $(".patientProfile-content").height(heightRef);
}

function appendHeartRateChart() {
  const ctx = $("#heartRateChart")[0];
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: ["New Patient"],
        data: [
          0, 0, -40, 60, -10, 0, 0, -30, 90, -50, 0, 0, -50, 95, -90, 0, 0, 0,
        ],
        borderColor: "#63da76",
        borderWidth: 2,
        backgroundColor: "#63da76",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    elements: {
      point: {
        pointStyle: "cross",
      },
    },
    scales: {
      x: {
        grid: {
          drawBorder: false,
          color: "#f8fafa",
        },
        ticks: {
          display: false,
        },
      },
      y: {
        max: 100,
        min: -100,
        grid: {
          drawBorder: false,
          drawTicks: false,
          color: "#f8fafa",
        },
        ticks: {
          stepSize: 20,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const config = {
    type: "line",
    data: data,
    options: options,
  };
  if (ctx) {
    new Chart(ctx, config);
  }
}

function appendBloodPressureChart() {
  function initBloodPressureChart(color, id) {
    const ctx = $(id)[0];
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: ["New Patient"],
          data: [
            90, 0, -40, 60, -10, 0, 0, -30, 90, -50, 0, 0, -50, 95, -90, 0, 0,
            0,
          ],
          borderColor: color,
          borderWidth: 2,
          backgroundColor: color,
          tension: 0.3,
        },
      ],
    };

    const options = {
      responsive: true,
      elements: {
        point: {
          pointStyle: "cross",
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    const config = {
      type: "line",
      data: data,
      options: options,
    };
    if (ctx) {
      new Chart(ctx, config);
    }
  }
  initBloodPressureChart("#ff8f6b", "#bloodPressureChart1");
  initBloodPressureChart("#5dd971", "#bloodPressureChart2");
}

appendPatientProfile();
appendHeartRateChart();
appendBloodPressureChart();
keepBalancePatientHeight();
handleTabs("patientProfileTab");
