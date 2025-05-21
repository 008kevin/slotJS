let money;
if (localStorage.getItem("money") != null) {
    money = localStorage.getItem("money");
} else {
    money = 1000; // alap pénz
}

function removeMoney(amount) {
    money += amount;
}

function addMoney(amount) {
    money += amount;
}