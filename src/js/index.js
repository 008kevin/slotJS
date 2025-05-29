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
const spin = document.querySelectorAll(".button")[0];
if (spin) {
    spin.addEventListener("click", () => {
    if(money <= 0){
        alert("Broke lol")
    }
else {
    removeMoney(10);
    

    // stilus reset
    for (let i = 0; i < cols.length; i++) {
        cols[i].classList.remove("winner");
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            if (i < 19) {
                rollSlot(false);
            } else
                rollSlot(true);
        }, i * i * 5);
    }

    balanceUpdate()
}
    });
}

function rollSlot(isLast) {
    let randomNums = generateNewRandoms();
    for (let j = 0; j < cols.length; j++) {
        cols[j].innerHTML = `<i class="fa-solid ${translateToIcon(randomNums[j])}"></i>`;
    }
    if (isLast) {
        checkWin(randomNums);
    }
}

function checkWin(rolledNums) {
    let winMultiplier = 0;
    for (let i = 0; i < 3; i++) {
        // sor
        if (rolledNums[i * 3] === rolledNums[1 + i * 3] && rolledNums[i * 3] === rolledNums[2 + i * 3]) {
            cols[i * 3].classList.add("winner");
            cols[1 + i * 3].classList.add("winner");
            cols[2 + i * 3].classList.add("winner");
            winMultiplier += 1;
        }

        // oszlop
        if (rolledNums[i] === rolledNums[i + 3] && rolledNums[i] === rolledNums[i + 6]) {
            cols[i].classList.add("winner");
            cols[i + 3].classList.add("winner");
            cols[i + 6].classList.add("winner");
            winMultiplier += 1;
        }
    }

    console.log(winMultiplier)
}