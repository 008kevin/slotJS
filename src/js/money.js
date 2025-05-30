export default class Money {
    constructor() {
        this.money = 0;
        this.transactions = [];
        if (localStorage.getItem("money") !== null) {
            this.money = parseFloat(localStorage.getItem("money"));
            this.transactions = JSON.parse(localStorage.getItem("transactions")) || [];
            if (this.transactions.length === 0) {
                this.transactions.push(this.money);
            }
        } else {
            this.money = 1000;
            this.transactions.push(this.money);
        }
        this.balanceUpdate();
    }

    checkTransactions() {
        if (this.transactions.length > 20) {
            this.transactions.shift();
        }
    }

    removeMoney(amount) {
        this.money -= amount;
        this.transactions.push(this.money);
        this.checkTransactions();
        localStorage.setItem("money", this.money.toString());
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
        this.balanceUpdate();
    }

    addMoney(amount) {
        this.money += amount;
        if (this.transactions.length > 0) this.transactions.pop();
        this.transactions.push(this.money);
        this.checkTransactions();
        localStorage.setItem("money", this.money.toString());
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
        this.balanceUpdate();
    }

    getTransactions() {
        return this.transactions;
    }

    getBalance() {
        return this.money;
    }

    balanceUpdate() {
        const balance = document.querySelector("#balance");
        if (balance) {
            balance.innerHTML = `Pénz: ${this.money}$`;
        }
    }
}