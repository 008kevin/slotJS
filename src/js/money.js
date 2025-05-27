let money;
let transactions = [];

if (localStorage.getItem("money") != null) {
    money = localStorage.getItem("money");
    transactions = localStorage.getItem("")
} else {
    money = 1000; // alap pénz
    transactions.push(money)
}

function removeMoney(amount) {
    money += amount;
    transactions.push(money)
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function addMoney(amount) {
    money += amount;
    transactions.push(money)
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

function getTransactions(){
transactions.forEach((p) => {
console.log(p)
})
}