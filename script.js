let memoryValue = 0;

window.onload = function() {
    memoryValue = parseFloat(localStorage.getItem("memoryValue")) || 0;
    document.getElementById("historyList").innerHTML = localStorage.getItem("history") || "";
    adjustFontSize();
};

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (!isNaN(key) || "/*-+.".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        backspace();
    }
});

function appendToDisplay(value) {
    const display = document.getElementById("display");
    display.value += value;
    adjustFontSize();
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
    adjustFontSize();
}

function backspace() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
    adjustFontSize();
}

function calculateResult() {
    const display = document.getElementById("display");
    try {
        const result = eval(display.value);
        if (result === Infinity) {
            throw new Error("Cannot divide by zero");
        }
        addHistory(display.value, result);
        display.value = result;
    } catch (error) {
        display.value = error.message || "Error";
    }
    adjustFontSize();
}

function addHistory(expression, result) {
    const historyList = document.getElementById("historyList");
    const historyItem = document.createElement("li");
    historyItem.textContent = `${expression} = ${result}`;
    historyList.appendChild(historyItem);
    localStorage.setItem("history", historyList.innerHTML);
}

function memoryAdd() {
    const display = document.getElementById("display");
    memoryValue += parseFloat(display.value) || 0;
    localStorage.setItem("memoryValue", memoryValue);
}

function memorySubtract() {
    const display = document.getElementById("display");
    memoryValue -= parseFloat(display.value) || 0;
    localStorage.setItem("memoryValue", memoryValue);
}

function memoryRecall() {
    document.getElementById("display").value = memoryValue;
    adjustFontSize();
}

function memoryClear() {
    memoryValue = 0;
    localStorage.setItem("memoryValue", memoryValue);
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

function changeTheme() {
    const theme = document.getElementById("themeSelector").value;
    document.body.className = theme;
}

function adjustFontSize() {
    const display = document.getElementById("display");
    const maxLength = 10;
    const fontSize = display.value.length > maxLength ? "1.5em" : "2.5em";
    display.style.fontSize = fontSize;
}
