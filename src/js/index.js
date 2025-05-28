
function generateNewRandoms() {
    let randomNums = [];
    let colNum = document.querySelectorAll(".col").length;
    for (let i = 0; i < colNum; i++) {
        randomNums.push(Math.floor(Math.random() * 10));
    }
    return randomNums;
}
const spin = document.querySelectorAll(".button")[0];
if (spin) {
    
    spin.addEventListener("click", () => {
        if(money <= 0){
            alert("Broke lol")
        }
    else{
        removeMoney(10);
        if(transactions.length > 20){
            transactions.shift()
        }
        
        for (let i = 0; i < 20; i++) {
            setTimeout(rollSlot, i * i * 5);
        }

        balanceUpdate()
    }
    });
}

function rollSlot() {
    let randomNums = generateNewRandoms();
    let cols = document.querySelectorAll(".col");
    for (let j = 0; j < cols.length; j++) {
        cols[j].innerHTML = `<i class="fa-solid ${translateToIcon(randomNums[j])}"></i>`;
    }
}