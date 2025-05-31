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
const resultModal = document.getElementById("historyModal");

resultButton?.addEventListener("click", () => {
    resultModal.showModal();
    document.querySelectorAll(".table")[0].classList.remove("hidden");
    balanceUpdate();
});

balanceUpdate();

function checkTransactions() {
    while (transactions.length > 11) {
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
    const table = document.querySelectorAll(".table")[1];
    const totalWins = document.getElementById("totalWins");
    const startMoney = document.getElementById("startMoney");
    table.innerHTML = "";
    transactions.forEach((transaction, idx) => {
        if (idx !== 0) {
            const row = table.insertRow(0);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const diff = transaction - transactions[idx - 1];
            cell1.innerText = idx.toString();
            cell2.innerText = `${diff >= 0 ? "+" : ""}${diff}$`;
            cell2.style.color = diff >= 0 ? "green" : "red";
        }
    });
    const diff = money - 1000;
    totalWins.innerText = `Össz. nyeremény: ${diff >= 0 ? "+" : ""}${diff}$`;
    startMoney.innerText = `Kezdő pénz: 1000$`;
}

