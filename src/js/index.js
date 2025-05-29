let cols = document.querySelectorAll(".col");

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
const spin = document.querySelectorAll("img[alt=\"slotArm\"]")[0];

let canSpin = true;
spin.addEventListener("click", () => {
    if(money < 10){
        alert("Broke lol")
    }
    else if (canSpin) {
        canSpin = false;
        animatePull()

        removeMoney(10);


        // stilus reset
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
    let winMoney = 10; // alap tét
    for (let i = 0; i < 3; i++) {
        // sor
        if (rolledNums[i * 3] === rolledNums[1 + i * 3] && rolledNums[i * 3] === rolledNums[2 + i * 3]) {
            cols[i * 3].classList.add("winner", "horizontal");
            cols[1 + i * 3].classList.add("winner", "horizontal");
            cols[2 + i * 3].classList.add("winner", "horizontal");
            winMultiplier += 1;
            winMoney *= getMultiplier(rolledNums[i * 3]);
        }

        // oszlop
        if (rolledNums[i] === rolledNums[i + 3] && rolledNums[i] === rolledNums[i + 6]) {
            cols[i].classList.add("winner", "vertical");
            cols[i + 3].classList.add("winner", "vertical");
            cols[i + 6].classList.add("winner", "vertical");
            winMultiplier += 1;
            winMoney *= getMultiplier(rolledNums[i]);
        }
    }

    // atlok
    if (rolledNums[0] === rolledNums[4] && rolledNums[0] === rolledNums[8]) {
        cols[0].classList.add("winner", "diagonalFromTop");
        cols[4].classList.add("winner", "diagonalFromTop");
        cols[8].classList.add("winner", "diagonalFromTop");
        winMultiplier += 1;
        winMoney *= getMultiplier(rolledNums[0]);
    }
    if (rolledNums[6] === rolledNums[4] && rolledNums[6] === rolledNums[2]) {
        cols[6].classList.add("winner", "diagonalFromBottom");
        cols[4].classList.add("winner", "diagonalFromBottom");
        cols[2].classList.add("winner", "diagonalFromBottom");
        winMultiplier += 1;
        winMoney *= getMultiplier(rolledNums[6]);
    }

    if (winMultiplier > 0) {
        addMoney(winMoney * winMultiplier);
    }

    canSpin = true;
    //console.log(winMultiplier)
}

async function animatePull() {
    spin.style.transform = "scaleZ(-1)"
    setTimeout(() => {
        spin.style.transform = "scaleZ(1)"
    }, 1000)
}