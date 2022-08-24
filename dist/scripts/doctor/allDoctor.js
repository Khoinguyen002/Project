import ajax from "../common/ajax.js";
import activeStar from "../common/activeStar.js";

function appendDoctor() {
  ajax("https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/doctor", "get").then(
    (res) => {
      $(".allDoctor-content.row").append(
        res
          .map(
            (item) => `
            <div class="col-xl-6">
                <div class="doctor block">
                    <div class="row">
                        <div class="doctor-img col-sm-5">
                            <img src=${item.avatar} />
                        </div>
                        <div class="doctor-info col-sm-7 text">
                            <div class="doctor-info-name title">${
                              item.doctor_name
                            }</div>
                            <div class="doctor-info-rate">
                                ${activeStar(item.rate)}
                            </div>
                            <div class="doctor-info-specialized">${
                              item.select_department
                            }</div>
                            <div class="doctor-info-availableTime">
                                <img src="assets/imgs/clock.svg" />
                                ${item.available_time}
                            </div>
                            <div class="doctor-info-description cut-off-3">${
                              item.short_description
                            }</div>
                            <div class="doctor-info-button">
                                <button class="btn-style2-fw text border-radius-10" type="text" data-id=${
                                  item.id
                                }>View Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
          )
          .join("")
      );
      viewProfileDoctor();
    }
  );
  function viewProfileDoctor() {
    $(".doctor-info-button button").click(function () {
      window.location.replace(`/doctorProfile.html?${$(this).attr("data-id")}`);
    });
  }
}

appendDoctor();
