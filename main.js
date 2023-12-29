const previousDisplay = document.querySelector(".previous__display");
const currentDisplay = document.querySelector(".current__display");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const dotBtn = document.querySelector(".dot");
const deleteBtn = document.querySelector(".delete");
const minusBtn = document.querySelector(".minus");
//Global Variable
let currentValue = "";
let previousValue = "";
let operatorValue = "";
let result = "";
let numLimit = 10;

number.forEach(num => num.addEventListener("click", handleNumber));

function handleNumber(event) {
  if (currentValue.length > numLimit) {
    currentValue = currentValue.slice(0, numLimit);
    currentDisplay.textContent = currentValue;
  }
  let inputNumber = event.target.textContent;
  currentValue += inputNumber;
  currentDisplay.textContent = currentValue;
}

//Handle operator
operator.forEach(op => {
  op.addEventListener("click", handleOperator);
});

function handleOperator(event) {
  let inputOperator = event.target.textContent;

  if (previousDisplay.textContent.includes("=") && currentValue !== "") {
    previousDisplay.textContent = currentValue;
  }

  if (previousValue !== "") {
    operatorValue = inputOperator;
    previousDisplay.textContent = `${previousValue} ${operatorValue}`;
  }

  if (previousValue === "" && currentValue !== "") {
    operatorValue = inputOperator;
    previousValue = currentValue;
    previousDisplay.textContent = previousValue + " " + operatorValue;
    currentDisplay.textContent = "0";
    currentValue = "";
  } else if (previousValue !== "" && currentValue !== "") {
    previousValue = operate().toString();
    operatorValue = inputOperator;
    console.log("run", previousValue.length);

    if (previousValue.length > numLimit) {
      previousDisplay.textContent = `${previousValue
        .toString()
        .slice(0, numLimit)}... ${operatorValue}`;
    } else {
      previousDisplay.textContent = `${previousValue
        .toString()
        .slice(0, numLimit)}... ${operatorValue}`;
    }

    currentDisplay.textContent = "0";
    currentValue = "";
  }
}

clearBtn.addEventListener("click", () => {
  currentValue = "";
  previousValue = "";
  operatorValue = "";
  previousDisplay.textContent = "";
  currentDisplay.textContent = "0";
});

//Calculate value
function operate() {
  let result;
  switch (operatorValue) {
    case "+":
      return parseInt(previousValue) + parseInt(currentValue);
      break;
    case "-":
      return parseInt(previousValue) - parseInt(currentValue);
      break;
    case "/":
      return parseInt(previousValue) / parseInt(currentValue);
      break;
    case "x":
      return parseInt(previousValue) * parseInt(currentValue);
      break;
    default:
      return;
  }
}

//Handle equal button
equalBtn.addEventListener("click", () => {
  result = operate()
    .toString()
    .slice(0, numLimit);

  if (result.length === numLimit) {
    result += "...";
  }

  if (previousDisplay.textContent.includes("=")) {
    return;
  }
  previousDisplay.textContent = `${previousValue} ${operatorValue} ${currentValue} =  ${result}`;
  currentDisplay.textContent = result;
  currentValue = "";
});

dotBtn.addEventListener("click", () => {
  if (currentValue === "") {
    currentValue = "0.";
    currentDisplay.textContent = currentValue;
  } else if (currentValue !== "" && !currentValue.includes(".")) {
    currentValue = currentValue + ".";
    currentDisplay.textContent = currentValue;
  }
});

//Handle delete
deleteBtn.addEventListener("click", () => {
  if (currentValue === "") {
    return;
  } else if (currentValue.length === 1 && currentValue !== "") {
    currentValue = "";
    currentDisplay.textContent = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
    currentDisplay.textContent = currentValue;
  }
});

//Handle minus
minusBtn.addEventListener("click", () => {
  if (currentValue !== "" && !currentValue.includes("-")) {
    currentValue = "-" + currentValue;
    currentDisplay.textContent = currentValue;
  }
});
