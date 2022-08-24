function appendPatientHisChart() {
  const ctx = $("#patientHisChart")[0];

  Chart.defaults.font.size = 16;
  Chart.defaults.color = "#C2C2DD";
  Chart.defaults.font.weight = "100";

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
    ],
    datasets: [
      {
        label: ["New Patient"],
        data: [500, 700, 1500, 800, 600, 1300, 1000, 600, 800, 1400, 600, 1000],
        borderColor: "#FF55BF",
        borderWidth: 4,
        tension: 0.4,
        backgroundColor: "#FF55BF",
      },
      {
        label: ["Old Patient"],
        data: [
          600, 1200, 1200, 500, 1400, 900, 1500, 600, 1600, 600, 800, 1200,
        ],
        borderColor: "#605BFF",
        borderWidth: 4,
        tension: 0.4,
        backgroundColor: "#605BFF",
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
          display: false,
        },
      },
      y: {
        max: 2000,
        min: 0,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          stepSize: 500,
        },
      },
    },
    plugins: {
      legend: {
        align: "end",
        labels: {
          padding: 30,
          usePointStyle: true,
          pointStyle: "circle",
          boxHeight: 6,
          boxWidth: 6,
          color: "#70708C",
        },
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
function appendTopDiseasesChart() {
  const ctx = $("#topDiseasesChart")[0];
  const data = {
    labels: ["Tuberculosis", "Stroke", "lung cancers", "Diabetes", "Cirrhosis"],
    datasets: [
      {
        label: "My First Dataset",
        data: [30, 25, 20, 20, 25],
        backgroundColor: [
          "#FFBF00",
          "#5DD971",
          "#FF7C52",
          "#4A95FF",
          "#FF55BF",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          padding: 10,
          pointStyle: "circle",
          usePointStyle: true,
          color: "#70708C",
        },
      },
    },
  };
  const config = {
    type: "doughnut",
    data: data,
    options: options,
  };
  if (ctx) {
    new Chart(ctx, config);
  }
}
function appendTotalPatientChart() {
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Admitted",
        data: [200, 150, 200, 190, 170, 230, 150],
        backgroundColor: "#6B66FF",
        stack: "Stack 0",
        borderRadius: 5,
      },
      {
        label: "Discharged",
        data: [190, 200, 140, 150, 230, 200, 150],
        backgroundColor: "#FF8F6B",
        stack: "Stack 1",
        borderRadius: 5,
      },
    ],
  };
  const ontions = {
    maintainAspectRatio: false,
    categoryPercentage: 0.4,
    barPercentage: 0.7,
    plugins: {
      legend: {
        align: "end",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          color: "#70708C",
          boxWidth: 10,
          boxHeight: 10,
          padding: 30,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 50,
        },
        grid: {
          display: false,
          drawBorder: false,
          tickWidth: 100,
        },
      },
    },
  };

  const config = {
    type: "bar",
    data: data,
    options: ontions,
  };
  const ctx = $("#totalPatientChart")[0];
  if (ctx) {
    new Chart(ctx, config);
  }
}
function appendRevenueChart() {
  const ctx = $("#revenueChart")[0];
  const data = {
    labels: ["Jan", "Mar", "May", "July", "Sep", "Nov"],
    datasets: [
      {
        label: "Income",
        data: [9000, 12000, 8000, 25000, 17000, 16000, 29000],
        tension: 0.2,
        borderColor: "#FF5B26",
      },
      {
        label: "Expense",
        data: [8000, 6000, 10000, 20000, 15000, 13000, 22000],
        tension: 0.2,
        borderColor: "#6B66FF",
        color: "#6B66FF",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          color: "#DFDFFB",
          borderDash: [5, 10],
          drawTicks: false,
        },
      },
      x: {
        ticks: {
          padding: 8,
        },
        grid: {
          color: "#DFDFFB",
          borderDash: [5, 10],
          drawTicks: false,
        },
      },
    },
    plugins: {
      legend: {
        align: "end",
        labels: {
          pointStyle: "star",
          usePointStyle: true,
          padding: 20,
          color: "#6B66FF",
        },
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
const setHeight = (classRef, classToBeSet) => {
  if ($(classToBeSet)[0]) {
    $(classToBeSet).css("height", `${$(classRef)[0].offsetHeight}px`);
  }
};
const handleHeight = () => {
  setHeight(".patientHis-content", ".topDiseases-content");
  setHeight(".totalPatient-content", ".topDoctor-content");
  setHeight(".revenue-content", ".recentPatient-content");
};
const handleFontSizeChart = () => {
  if (window.innerWidth <= 992) {
    Chart.defaults.font.size = 13;
  } else Chart.defaults.font.size = 16;
};

function keepBalanceDashBoardSize() {
  handleFontSizeChart();
  handleHeight();
}

appendPatientHisChart();
appendTopDiseasesChart();
appendTotalPatientChart();
appendRevenueChart();
keepBalanceDashBoardSize();
