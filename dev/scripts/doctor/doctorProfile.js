import ajax from "../common/ajax.js";
import handleTabs from "../common/handleClickTabs.js";
import activeStar from "../common/activeStar.js";

function appendDoctorProfile() {
  const search = window.location.search;
  const query = search ? search.slice(1) : "1";
  ajax(
    `https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/doctor/${query}`,
    "get"
  ).then((res) => {
    $(".doctorProfile-profile .background img").attr("src", res.background);
    $(".doctorProfile-profile .avatar img").attr("src", res.avatar);
    $(".doctorProfile-profile .info .info-name").text(res.doctor_name);
    $(".doctorProfile-profile .info .info-specialized").text(
      res.select_department
    );
    $(".doctorProfile-profile .info .info-availableTime").text(
      res.available_time
    );
    $(".doctorProfile-profile .info .info-rate").html(activeStar(res.rate));
    $(".doctorProfile-profile .biography").text(res.biography);
  });
}

function initCalendar() {
  function selectDate(date) {
    $(".calendar-container").updateCalendarOptions({
      date: date,
    });
  }

  var defaultConfig = {
    weekDayLength: 1,
    date: new Date(),
    onClickDate: selectDate,
    prevButton: "<img src='assets/imgs/prev.svg'>",
    nextButton: "<img src='assets/imgs/nextCalendar.svg'>",
    showYearDropdown: false,
    startOnMonday: true,
    showTodayButton: false,
    alternateDayMap: {
      1: "mo",
      2: "tu",
      3: "we",
      4: "th",
      5: "fr",
      6: "sa",
      7: "su",
    },
    formatWeekDay: function (weekDay) {
      return this.alternateDayMap[weekDay];
    },
  };

  var calendar = $(".calendar-container")[0]
    ? $(".calendar-container").calendar(defaultConfig)
    : "";
}

function initSlick() {
  $(".doctorProfile-slide")[0]
    ? $(".doctorProfile-slide").slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
      })
    : "";
}

function appendDoctorSlide() {
  function handleClickSlide() {
    $(".doctorProfile-slide-item .item-info-name").click(function () {
      window.location.replace(
        `/doctorProfile.html?${$(this).parent().parent().attr("data-id")}`
      );
    });
  }

  ajax("https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/doctor", "get").then(
    (res) => {
      $(".doctorProfile-slide").append(
        res
          .map(
            (item) => `
                <div class="doctorProfile-slide-item block d-flex" data-id=${item.id}>
                    <div class="item-img"> 
                        <img src="${item.avatar}" alt="">
                    </div>
                    <div class="item-info">
                        <div class="item-info-name text-strong"> 
                            ${item.doctor_name}
                        </div>
                        <div class="item-info-des text-small cut-off-3">
                            “${item.short_description}”
                        </div>
                    </div>
                </div>
            `
          )
          .join("")
      );
      initSlick();
      handleClickSlide();
    }
  );
}
appendDoctorProfile();
appendDoctorSlide();
initCalendar();
handleTabs("doctorProfile-profile-tab");
