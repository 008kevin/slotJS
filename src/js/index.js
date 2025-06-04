const cols = document.querySelectorAll(".col");
const spinArm = document.getElementById("slotArm");
const spinButton = document.getElementById("spinButtonImg");
const betInput = document.getElementById("bet");
const winOverlay = document.getElementById("winOverlay");
const winText = winOverlay.querySelector("p");
const slotTitle = document.getElementById("slot")

let canSpin = true;
let spinCounter = 0;

betInput.addEventListener("change", () => {
    let bet = Number(betInput.value);
    if (bet < 10) betInput.value = 10;
    if (bet > 1000) betInput.value = 1000;
});

function setSpinActive(active) {
    spinArm.style.opacity = active ? "1" : "0.5";
    spinArm.style.pointerEvents = active ? "auto" : "none";
    spinButton.style.opacity = active ? "1" : "0.5";
    spinButton.style.pointerEvents = active ? "auto" : "none";
    spinButton.classList.toggle("disabled-spin", !active);
}

function generateNewRandoms() {
    const randomNums = [];
    for (let i = 0; i < cols.length; i++) {
        let r = Math.floor(Math.random() * 15);
        if (r < 5) r = 0; // skull
        else if (r < 9) r = 1; // bomba
        else if (r < 12) r = 2; // szív
        else if (r < 14) r = 3; // pénz
        else r = 4; // korona
        randomNums.push(r);
    }
    return randomNums;
}

function rollSlot(isLast) {
    const randomNums = generateNewRandoms();
    cols.forEach((col, idx) => {
        col.innerHTML = `<i class="fa-solid ${translateToIcon(randomNums[idx])}"></i>`;
    });
    if (isLast) {
        setTimeout(() => checkWin(randomNums), 500);
    }
}

function checkWin(rolledNums) {
    let winMultiplier = 0;
    let winMoney = Number(betInput.value);
    let totalMultiplier = 1;
    cols.forEach(col => {
        col.className = "col";
        if (col.firstElementChild) col.firstElementChild.classList.remove("fa-beat");
    });
    //sor
    for (let i = 0; i < 3; i++) {
        if (rolledNums[i * 3] === rolledNums[1 + i * 3] && rolledNums[i * 3] === rolledNums[2 + i * 3]) {
            [0, 1, 2].forEach(j => {
                const idx = i * 3 + j;
                cols[idx].classList.add("winner", "horizontal");
                cols[idx].firstElementChild.classList.add("fa-beat");
            });
            winMultiplier++;
            totalMultiplier *= getMultiplier(rolledNums[i * 3]);
        }
        //oszlop
        if (rolledNums[i] === rolledNums[i + 3] && rolledNums[i] === rolledNums[i + 6]) {
            [0, 3, 6].forEach(j => {
                const idx = i + j;
                cols[idx].classList.add("winner", "vertical");
                cols[idx].firstElementChild.classList.add("fa-beat");
            });
            winMultiplier++;
            totalMultiplier *= getMultiplier(rolledNums[i]);
        }
    }
    //átlók
    if (rolledNums[0] === rolledNums[4] && rolledNums[0] === rolledNums[8]) {
        [0, 4, 8].forEach(idx => {
            cols[idx].classList.add("winner", "diagonalFromTop");
            cols[idx].firstElementChild.classList.add("fa-beat");
        });
        winMultiplier++;
        totalMultiplier *= getMultiplier(rolledNums[0]);
    }
    if (rolledNums[6] === rolledNums[4] && rolledNums[6] === rolledNums[2]) {
        [6, 4, 2].forEach(idx => {
            cols[idx].classList.add("winner", "diagonalFromBottom");
            cols[idx].firstElementChild.classList.add("fa-beat");
        });
        winMultiplier++;
        totalMultiplier *= getMultiplier(rolledNums[6]);
    }

    if (winMultiplier > 0) {
        let win = Math.ceil(winMoney * totalMultiplier);
        addMoney(win, true);
        showWin(win);
    } else {
        canSpin = true;
        setSpinActive(true);
    }

    console.log(spinCounter)
    spinCounter++;
    if (spinCounter === 5) {
        spinCounter = 0;
        secret()
    }
}

async function animatePull() {
    spinArm.style.transition = "transform 0.12s cubic-bezier(.4,2,.6,1)";
    spinArm.style.transform = "rotate(-15deg) scale(1.08)";
    setTimeout(() => {
        spinArm.style.transition = "transform 0.35s cubic-bezier(.4,0,.2,1)";
        spinArm.style.transform = "rotate(0deg) scale(1)";
    }, 220);
}

function showWin(money) {
    winText.innerHTML = `<p class="text-center" style="font-size:2.5rem;display:block;">BIG WIN!</p><p class="text-center" style="font-size:2.2rem;display:block;margin-top:1rem;">+${money}$</p>`;
    winOverlay.classList.remove("hidden");
    winOverlay.style.animation = "none";
    void winOverlay.offsetWidth;
    winOverlay.style.animation = "";
}

spinArm.addEventListener("click", () => {
    const bet = Number(betInput.value);
    if (money < bet) {
        alert("Broke lol");
        return;
    }
    if (canSpin) {
        canSpin = false;
        setSpinActive(false);
        animatePull();
        removeMoney(bet);
        cols.forEach(col => col.className = "col");
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                if (i < 19) rollSlot(false);
                else rollSlot(true);
            }, i * i * 5);
        }
    }
});

spinButton.addEventListener("click", () => spinArm.click());

winOverlay.addEventListener("click", () => {
    winOverlay.classList.add("hidden");
    canSpin = true;
    setSpinActive(true);
});

const showMoneyModal = document.getElementById("showMoneyModal");
const moneyModal = document.getElementById("moneyModal");
showMoneyModal.addEventListener("click", () => {
    moneyModal.showModal();
})

const addMoneyButton = document.getElementById("addMoneyButton");
const moneyInput = document.getElementById("moneyInput");
addMoneyButton.addEventListener(("click"), () => {
    if (moneyInput.value === "" || isNaN(moneyInput.value) || moneyInput.value <= 0 || !(moneyInput.value % 1 === 0)) {
        alert("Nem megfelelő bemenet");
    } else {
        money += Number(moneyInput.value)
        moneyModal.close();
        balanceUpdate();
    }
})