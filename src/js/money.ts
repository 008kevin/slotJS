let money: number;
let transactions: number[] = [];

if (localStorage.getItem("money") !== null) {
    money = parseFloat(localStorage.getItem("money")!);
    transactions = JSON.parse(localStorage.getItem("transactions")!) || [];
} else {
    money = 1000;
    transactions.push(money);
}

function removeMoney(amount: number): void {
    money -= amount;
    transactions.push(money);
    localStorage.setItem("money", money.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addMoney(amount: number): void {
    money += amount;
    transactions.push(money);
    localStorage.setItem("money", money.toString());
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function getTransactions(): void {
    transactions.forEach((p) => {
        console.log(p);
    });
}

let table: HTMLTableElement | null = document.querySelectorAll<HTMLTableElement>(".table")[0];
let resultButton: HTMLButtonElement | null = document.querySelectorAll<HTMLButtonElement>(".button")[1];
resultButton?.addEventListener("click", (index) => {
    if (table) {
        transactions.forEach((transaction, index) => {
            let row = table?.insertRow(0);
            let cell1 = row?.insertCell(0);
            let cell2 = row?.insertCell(1);
            cell1.innerText = (index + 1).toString();
            cell2.innerText = transaction.toString();
        });
    }        
});
