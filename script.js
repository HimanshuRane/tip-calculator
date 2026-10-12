const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const errorEl = document.getElementById("error");
const tipAmountEl = document.getElementById("tip-amount");
const totalBillEl = document.getElementById("total-bill");
const perPersonEl = document.getElementById("per-person");
const resetBtn = document.getElementById("reset");
const tipButtons = document.querySelectorAll(".tip-btn");

let selectedTip = 15;

function formatMoney(value) {
  return "$" + value.toFixed(2);
}

function showResults(tipAmount, totalBill, perPerson) {
  tipAmountEl.textContent = formatMoney(tipAmount);
  totalBillEl.textContent = formatMoney(totalBill);
  perPersonEl.textContent = formatMoney(perPerson);
}

function clearResults() {
  showResults(0, 0, 0);
}

function calculate() {
  const billValue = billInput.value.trim();
  const peopleValue = peopleInput.value.trim();

  if (billValue === "" && peopleValue === "") {
    errorEl.textContent = "";
    clearResults();
    return;
  }

  const bill = Number(billValue);
  const people = Number(peopleValue);

  if (billValue !== "" && (Number.isNaN(bill) || bill < 0)) {
    errorEl.textContent = "Bill amount cannot be negative.";
    clearResults();
    return;
  }

  if (peopleValue !== "" && (Number.isNaN(people) || people < 1 || !Number.isInteger(people))) {
    errorEl.textContent = "Number of people must be at least 1.";
    clearResults();
    return;
  }

  if (billValue === "" || peopleValue === "") {
    errorEl.textContent = "";
    clearResults();
    return;
  }

  errorEl.textContent = "";

  const tipAmount = bill * (selectedTip / 100);
  const totalBill = bill + tipAmount;
  const perPerson = totalBill / people;

  showResults(tipAmount, totalBill, perPerson);
}

function setActiveTipButton(activeButton) {
  tipButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}

tipButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedTip = Number(button.getAttribute("data-tip"));
    setActiveTipButton(button);
    calculate();
  });
});

billInput.addEventListener("input", calculate);
peopleInput.addEventListener("input", calculate);

resetBtn.addEventListener("click", function () {
  billInput.value = "";
  peopleInput.value = "";
  selectedTip = 15;
  errorEl.textContent = "";
  clearResults();
  setActiveTipButton(document.querySelector('.tip-btn[data-tip="15"]'));
});

setActiveTipButton(document.querySelector('.tip-btn[data-tip="15"]'));
clearResults();
