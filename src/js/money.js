let money;
let transactions = [];
if (localStorage.getItem("money") !== null) {
    money = parseFloat(localStorage.getItem("money"));
    transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if(transactions == []){
        transactions.push(money)
    }
}
else {
    money = 1000;
    transactions.push(money);
}
balanceUpdate()

function checkTransactions(){
    if(transactions.length > 20){
        transactions.shift()
    }
}

function removeMoney(amount) {
    money -= amount;
    transactions.push(money);
    checkTransactions()
    localStorage.setItem("money", money.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
    balanceUpdate()
}

function addMoney(amount) {
    money += amount;
    transactions.pop()
    transactions.push(money);
    checkTransactions()
    localStorage.setItem("money", money.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
    balanceUpdate()
}

let table = document.querySelectorAll(".table")[0];
let resultButton = document.querySelectorAll(".button")[0];
resultButton === null || resultButton === void 0 ? void 0 : resultButton.addEventListener("click", (index) => {
    if (table) {
        
        
        table.innerHTML = "";
        transactions.forEach((transaction, index) => {
            let row = table === null || table === void 0 ? void 0 : table.insertRow(0);
            let cell1 = row === null || row === void 0 ? void 0 : row.insertCell(0);
            let cell2 = row === null || row === void 0 ? void 0 : row.insertCell(1);
            cell1.innerText = (index + 1).toString();
            cell2.innerText = transaction.toString();
        });
    }
});



function balanceUpdate(){
    let balance = document.querySelector("#balance")
    balance.innerHTML = `Pénz: ${money}$`
}

