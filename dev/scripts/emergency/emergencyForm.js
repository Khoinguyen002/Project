import activeTab from "../common/handleClickTabs.js";

function handleActiveTab() {
  function activeTabContent(instance) {
    $(".tab-content").children().hide();
    $(`.tab-content [data-id=${$(instance).attr("data-id")}]`).fadeIn();
  }
  $(".emergencyForm-tab").click(function () {
    activeTabContent(this);
  });
  $(".emergencyForm button").click(function () {
    const parentElement = $(this).closest("[data-id]");
    const nextElement = $(
      `.tab-styled[data-id=${parentElement.attr("data-id")}]`
    ).next();
    parentElement.next()[0] ? nextElement.trigger("click") : "";
  });

  activeTabContent($(".tab-content").children()[0]);
  activeTab("emergencyForm-tab");
}

function clickService() {
  const data = {};
  let total = 0;

  function setPrice() {
    total = 0;
    for (const key in data) {
      if (data[key]) {
        total += data[key].price * data[key].amount;
      }
    }
    $(".serviceTotal-total .text:last-child").text("$" + total);
  }

  $(".serviceList-item").click(function () {
    const data_id = $(this).attr("data-id");
    const name = $(this).children()[0].innerText;
    const price = $(this).children()[1].innerText.slice(1);

    if (data[data_id]) {
      data[data_id].amount++;
      data[data_id].total = data[data_id].amount * data[data_id].price;
      $(`.serviceTotal-item[data-id=${data_id}] .text:first-child input`).val(
        data[data_id].amount
      );
    } else {
      data[data_id] = {
        name: name,
        price: price,
        amount: 1,
        total: price,
      };
      $(".serviceTotal-total").before(`
          <div class="serviceTotal-item d-flex" data-id=${data_id}>
              <div class="text">
                  <input type="number" value=1 class="text">
              </div>
              <div class="text">
                  ${name}
              </div>
              <div class="text">
                  $${price}
              </div>
          </div>
        `);
    }

    $(`.serviceTotal-item[data-id=${data_id}] .text:first-child input`).change(
      function () {
        let dataSelector =
          data[$(this).closest($(".serviceTotal-item")).attr("data-id")];
        dataSelector.amount = Number($(this).val());
        if (dataSelector.amount == 0) {
          data[$(this).closest($(".serviceTotal-item")).attr("data-id")] = null;
          $(this).closest($(".serviceTotal-item")).remove();
        }
        setPrice();
        console.log(data);
      }
    );
    setPrice();
  });
}

function handleSubmit() {
  $(".emergencyForm button").click();
  $(".serviceList-content button");
}

handleActiveTab();
clickService();
