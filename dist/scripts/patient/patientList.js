import ajax from "../common/ajax.js";
function handleTable() {
  function initTable() {
    if ($("#patientTable")[0]) {
      ajax(
        "https://62fdaba36e617f88deacf06e.mockapi.io/api/v1/patient/",
        "get"
      ).then((res) => {
        const data = [];
        res.forEach((item) => {
          data.push({
            "Patient ID": item.id,
            "Patient Name": item.name,
            "Date Check In": new Date(item.date_check_in).toLocaleString(
              "en-GB"
            ),
            "Doctor Assigned": item.doctorAssigned,
            Disease: item.disease,
            Status: item.status,
            "Room No": item.roomNo,
            avatar: item.avatar,
          });
        });
        $("#patientTable").append(`
          <thead>
            <tr>
              <th class="block-td-head">
                <input type="checkbox"/>
              </th>
              ${(function () {
                let html = "";
                for (const key in data[0]) {
                  if (Object.hasOwnProperty.call(data[0], key)) {
                    if (key != "avatar") {
                      html += `
                        <th class="text-strong block-td-head">${key}</th>
                      `;
                    }
                  }
                }
                return html;
              })()}
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item) => `
                  <tr>
                    <td class="block-td">
                      <input type="checkbox"/>
                    </td>
                    ${(function () {
                      let html = "";
                      for (const key in item) {
                        if (Object.hasOwnProperty.call(item, key)) {
                          if (key == "Patient Name") {
                            html += `<td class="text block-td">
                              <img src=${item.avatar}/>
                              <span>${item[key]}</span>
                            </td>`;
                          } else if (key != "avatar") {
                            switch (item[key]) {
                              case "New Patient":
                                html += `<td class="text block-td" style="color:#00BFAF;">${item[key]}</td>`;
                                break;
                              case "Recovered":
                                html += `<td class="text block-td" style="color:#00ACE2;">${item[key]}</td>`;
                                break;
                              case "In Treatment":
                                html += `<td class="text block-td" style="color:#FF6864;">${item[key]}</td>`;
                                break;
                              default:
                                html += `<td class="text block-td">${
                                  key == "Patient ID" ? "#" : ""
                                }${item[key]}</td>`;
                            }
                          }
                        }
                      }
                      return html;
                    })()}
                  </tr>
                `
              )
              .join("")}
          </tbody>
        `);

        let table = $("#patientTable").DataTable({
          language: {
            info: "Showing _END_ from _TOTAL_ data",
          },
          columnDefs: [{ orderable: false, targets: 0 }],
        });
        table.on("draw", function () {
          handleClick();
        });
        addClass();
        handleCheckBox();
        handleClick();
      });
    }
  }

  function handleCheckBox() {
    $("thead tr input").click((e) => {
      $("tbody tr input").each(function (_, input) {
        input.checked = e.target.checked;
      });
    });
  }

  function addClass() {
    $(".dataTables_info").addClass("text");
    $(".paginate_button").addClass("text");
    $(".dataTables_length").addClass("text");
    $("#patientTable_filter").addClass("text");
  }

  function handleClick() {
    $("#patientTable tbody tr").click(function () {
      window.location.replace(
        `patientProfile.html?${$(this).children()[1].innerText.slice(1)}`
      );
    });
  }

  initTable();
}

handleTable();
