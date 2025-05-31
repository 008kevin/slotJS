let cols = document.querySelectorAll(".col");
const spinArm = document.querySelectorAll("img[alt=\"slotArm\"]")[0];
const spinButton = document.getElementById("spinButtonImg");
let canSpin = true;
const winOverlay = document.getElementById("winOverlay")
const winText = document.querySelector("#winOverlay p")

document.querySelector("#bet").addEventListener("change", () =>{
    if(document.querySelector("#bet").value < 10) document.querySelector("#bet").value = 10;
    if(document.querySelector("#bet").value > 1000) document.querySelector("#bet").value = 1000;
})

spinArm.addEventListener("click", () => {
    let bet = document.querySelector("#bet").value;
    console.log(bet)
    if(money < bet){
        alert("Broke lol")
    }
    else if (canSpin) {
        canSpin = false;
        setSpinActive(false);
        animatePull()
        removeMoney(bet);
        for (let i = 0; i < cols.length; i++) {
            cols[i].classList = ["col"];
        }

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                if (i < 19) {
                    rollSlot(false);
                } else
                    rollSlot(true);
            }, i * i * 5);
        }
    }
});

spinButton.addEventListener("click", () => {
    spinArm.click();
});

winOverlay.addEventListener("click", () => {
    winOverlay.classList.add("hidden")
    canSpin = true;
    setSpinActive(true);
})

function generateNewRandoms() {
    let randomNums = [];
    let randomNum = 0;
    let colNum = document.querySelectorAll(".col").length;
    for (let i = 0; i < colNum; i++) {
        randomNum = Math.floor(Math.random() * 15)
        if(randomNum < 5){
            randomNum = 0 // skull
        }
        else if(randomNum < 9){
            randomNum = 1 // bomba
        }
        else if(randomNum < 12){
            randomNum = 2 // szív
        }
        else if(randomNum < 14){
            randomNum = 3 // pénz
        }
        else {
            randomNum = 4 //korona
        }

        randomNums.push(randomNum);
    }
    return randomNums;
}

function setSpinActive(active) {
    if (active) {
        spinArm.style.opacity = "1";
        spinArm.style.pointerEvents = "auto";
        spinButton.style.opacity = "1";
        spinButton.style.pointerEvents = "auto";
        spinButton.classList.remove("disabled-spin");
    } else {
        spinArm.style.opacity = "0.5";
        spinArm.style.pointerEvents = "none";
        spinButton.style.opacity = "0.5";
        spinButton.style.pointerEvents = "none";
        spinButton.classList.add("disabled-spin");
    }
}

function rollSlot(isLast) {
    let randomNums = generateNewRandoms();
    for (let j = 0; j < cols.length; j++) {
        cols[j].innerHTML = `<i class="fa-solid ${translateToIcon(randomNums[j])}"></i>`;
    }
    if (isLast) {
        setTimeout(() => {
            checkWin(randomNums);
        }, 500)
    }
}

function checkWin(rolledNums) {
    let winMultiplier = 0;
    let winMoney = document.querySelector("#bet").value; // alap tét
    let totalMultiplier = 1;
    for (let i = 0; i < 3; i++) {
        // sor
       if (rolledNums[i * 3] === rolledNums[1 + i * 3] && rolledNums[i * 3] === rolledNums[2 + i * 3]) {
            cols[i * 3].classList.add("winner", "horizontal");
            cols[1 + i * 3].classList.add("winner", "horizontal");
            cols[2 + i * 3].classList.add("winner", "horizontal");

            cols[i * 3].firstElementChild.classList.add("fa-beat");
            cols[1 + i * 3].firstElementChild.classList.add("fa-beat");
            cols[2 + i * 3].firstElementChild.classList.add("fa-beat");

            winMultiplier += 1;
            totalMultiplier *= getMultiplier(rolledNums[i * 3]);
        }
        if (rolledNums[i] === rolledNums[i + 3] && rolledNums[i] === rolledNums[i + 6]) {
            cols[i].classList.add("winner", "vertical");
            cols[i + 3].classList.add("winner", "vertical");
            cols[i + 6].classList.add("winner", "vertical");

            cols[i].firstElementChild.classList.add("fa-beat");
            cols[i + 3].firstElementChild.classList.add("fa-beat");
            cols[i + 6].firstElementChild.classList.add("fa-beat");

            winMultiplier += 1;
            totalMultiplier *= getMultiplier(rolledNums[i]);
        }
    }
    if (rolledNums[0] === rolledNums[4] && rolledNums[0] === rolledNums[8]) {
        cols[0].classList.add("winner", "diagonalFromTop");
        cols[4].classList.add("winner", "diagonalFromTop");
        cols[8].classList.add("winner", "diagonalFromTop");

        cols[0].firstElementChild.classList.add("fa-beat");
        cols[4].firstElementChild.classList.add("fa-beat");
        cols[8].firstElementChild.classList.add("fa-beat");

        winMultiplier += 1;
        totalMultiplier *= getMultiplier(rolledNums[0]);
    }
    if (rolledNums[6] === rolledNums[4] && rolledNums[6] === rolledNums[2]) {
        cols[6].classList.add("winner", "diagonalFromBottom");
        cols[4].classList.add("winner", "diagonalFromBottom");
        cols[2].classList.add("winner", "diagonalFromBottom");

        cols[6].firstElementChild.classList.add("fa-beat");
        cols[4].firstElementChild.classList.add("fa-beat");
        cols[2].firstElementChild.classList.add("fa-beat");

        winMultiplier += 1;
        totalMultiplier *= getMultiplier(rolledNums[6]);
    }

    if (winMultiplier > 0) {
        let win = Math.ceil(winMoney * totalMultiplier)
        addMoney(win);
        showWin(win);
    } else {
        canSpin = true;
        setSpinActive(true);
    }
    // console.log(winMultiplier)
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
    winText.textContent = `\$${money}`
    winOverlay.classList.remove("hidden")
}

