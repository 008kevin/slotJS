
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
        let randomNums = generateNewRandoms();
        let cols = document.querySelectorAll(".col");
        for (let i = 0; i < cols.length; i++) {
            cols[i].innerText = randomNums[i].toString();
        }
    });
}
