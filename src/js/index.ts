function generateNewRandoms(): number[] {
    let randomNums: number[] = [];
    let colNum : number = document.querySelectorAll<HTMLElement>(".col").length;
    for (let i = 0; i < colNum; i++) {
        randomNums.push(Math.floor(Math.random() * 20));
    }
    return randomNums;
}

const spin : HTMLButtonElement = document.querySelectorAll<HTMLButtonElement>(".button")[0];

if (spin) {
    spin.addEventListener("click", () => {
        let randomNums : number[] = generateNewRandoms();
        let cols = document.querySelectorAll<HTMLElement>(".col");
        for (let i = 0; i < cols.length; i++) {
            cols[i].innerText = randomNums[i].toString(); //fontawesome
        }
    });
}