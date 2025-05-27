
function generateNewRandoms() {
    let randomNums = [] // 9 random szam 
    for (let i = 0; i < 9; i++) {
        randomNums.Push(Math.floor(Math.random() * 20));
    }
    return randomNums;
}

let spinBtn = document.querySelectorAll(".button")[0];
spinBtn.addEventListener("click", () => {
    let randomNums = generateNewRandoms();
    for (let i = 0; i < 9; i++) {
        document.querySelectorAll(".col")[i].innerText = randomNums[i];
    }
    
});
