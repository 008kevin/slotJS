
function generateNewRandoms() {
    let randomNums = [];
    let colNum = document.querySelectorAll(".col").length;
    for (let i = 0; i < colNum; i++) {
        randomNums.push(Math.floor(Math.random() * 20));
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
        let randomNums = generateNewRandoms();
        let cols = document.querySelectorAll(".col");
        for (let i = 0; i < cols.length; i++) {
            cols[i].innerHTML = `<i class="fa-solid ${translateToIcon(randomNums[i])}"></i>`;
        }
    }
    
        
    });
}
