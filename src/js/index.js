import Money from './money.js';
import NumberToIcon from './numberToIcon.js';
import SlotMachine from './Slot.js';

const moneyManager = new Money();
const numberToIcon = new NumberToIcon();
const slotMachine = new SlotMachine(moneyManager, numberToIcon);

document.querySelectorAll(".button")[0].addEventListener("click", () => {
    const table = document.querySelectorAll(".table")[0];
    if (table) {
        table.innerHTML = "";
        moneyManager.getTransactions().forEach((transaction, index) => {
            const row = table.insertRow(0);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.innerText = (index + 1).toString();
            cell2.innerText = transaction.toString();
        });
    }
});