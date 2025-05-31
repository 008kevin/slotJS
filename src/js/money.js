let money;
let transactions = [];

if (localStorage.getItem("money") !== null) {
    money = parseFloat(localStorage.getItem("money"));
    transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if (transactions.length === 0) {
        transactions.push(money);
    }
} else {
    money = 1000;
    transactions.push(money);
}

const resultButton = document.querySelectorAll(".button")[0];
const resultDiv = document.querySelectorAll(".result")[0];

resultButton?.addEventListener("click", () => {
    resultDiv.style.display = "block";
    resultButton.style.display = "none";
    document.querySelectorAll(".table")[0].classList.remove("hidden");
    balanceUpdate();
});

balanceUpdate();

function checkTransactions() {
    while (transactions.length > 10) {
        transactions.shift();
    }
}

function removeMoney(amount) {
    money -= Number(amount);
    transactions.push(money);
    checkTransactions();
    localStorage.setItem("money", money.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
    balanceUpdate();
}

function addMoney(amount) {
    money += Number(amount);
    if (transactions.length > 0) transactions.pop();
    transactions.push(money);
    checkTransactions();
    localStorage.setItem("money", money.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
    balanceUpdate();
}

function balanceUpdate() {
    const balance = document.querySelector("#balance");
    balance.innerHTML = `Pénz: ${money}$`;
    const table = document.getElementById("transactionsTable");
    table.innerHTML = "";
    transactions.forEach((transaction, idx) => {
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        if (idx === 0) {
            const diff = money - 1000;
            cell1.innerText = `Össz. nyeremény: ${diff >= 0 ? "+" : ""}${diff}$`;
            cell2.innerText = `Kezdő pénz: 1000$`;
        } else {
            const diff = transaction - transactions[idx - 1];
            cell1.innerText = idx.toString();
            cell2.innerText = `${diff >= 0 ? "+" : ""}${diff}$`;
        }
    });
}

