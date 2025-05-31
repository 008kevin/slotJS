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
let resultButton = document.querySelectorAll(".button")[0];
let resultDiv = document.querySelectorAll(".result")[0];
resultButton === null || resultButton === void 0 ? void 0 : resultButton.addEventListener("click", (index) => {
    resultDiv.style.display = "block";
    resultButton.style.display = "none";
    document.querySelectorAll(".table")[0].classList.remove("hidden");
    balanceUpdate();
}
);
balanceUpdate()

function checkTransactions(){
    while(transactions.length > 10){
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

function balanceUpdate(){
    let balance = document.querySelector("#balance");
    balance.innerHTML = `Pénz: ${money}$`;
    let table = document.querySelectorAll(".table")[0]; 
    table.innerHTML = "";
        transactions.forEach((transaction, index) => {
            let row = table === null || table === void 0 ? void 0 : table.insertRow(0);
            let cell1 = row === null || row === void 0 ? void 0 : row.insertCell(0);
            let cell2 = row === null || row === void 0 ? void 0 : row.insertCell(1);
            if(index === 0){
                if(1000-money > 0)
                    {
                        cell1.innerText = `Össz. nyeremény: -${1000-money}$`;                         
                    }
                else
                    {
                    cell1.innerText = `Össz. nyeremény: ${money-1000}$`; 
                    }
                cell2.innerText = `Kezdő pénz: 1000$`;
            }
            else{
                cell1.innerText = index.toString();
                cell2.innerText = `+${transaction - transactions[index-1]}$`;
                if (transactions[index-1]-transaction > 0){
                    cell2.innerText = `${transaction - transactions[index-1]}$`;
                }
            }
        });
}

