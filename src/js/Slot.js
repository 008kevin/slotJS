export default class SlotMachine {
    constructor(moneyManager, numberToIcon) {
        this.moneyManager = moneyManager;
        this.numberToIcon = numberToIcon;
        this.cols = document.querySelectorAll(".col");
        this.spinArm = document.querySelector('img[alt="slotArm"]');
        this.spinButton = document.querySelectorAll(".button")[1];
        this.canSpin = true;
        this.setupEvents();
    }

    setupEvents() {
        if (this.spinArm) {
            this.spinArm.addEventListener("click", () => this.handleSpin());
        }
        if (this.spinButton) {
            this.spinButton.addEventListener("click", () => this.handleSpin());
        }
    }

    handleSpin() {
        if (this.moneyManager.getBalance() < 10) {
            alert("Broke lol");
            return;
        }
        if (!this.canSpin) return;
        this.canSpin = false;
        this.setSpinActive(false);
        this.animatePull();
        this.moneyManager.removeMoney(10);

        for (let i = 0; i < this.cols.length; i++) {
            this.cols[i].classList = ["col"];
        }

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                if (i < 19) {
                    this.rollSlot(false);
                } else {
                    this.rollSlot(true);
                }
            }, i * i * 5);
        }
    }

    setSpinActive(active) {
        if (!this.spinArm || !this.spinButton) return;
        if (active) {
            this.spinArm.style.opacity = "1";
            this.spinArm.style.pointerEvents = "auto";
            this.spinButton.style.opacity = "1";
            this.spinButton.style.pointerEvents = "auto";
            this.spinButton.classList.remove("disabled-spin");
        } else {
            this.spinArm.style.opacity = "0.5";
            this.spinArm.style.pointerEvents = "none";
            this.spinButton.style.opacity = "0.5";
            this.spinButton.style.pointerEvents = "none";
            this.spinButton.classList.add("disabled-spin");
        }
    }

    generateNewRandoms() {
        let randomNums = [];
        let colNum = this.cols.length;
        for (let i = 0; i < colNum; i++) {
            let randomNum = Math.floor(Math.random() * 15);
            if (randomNum < 5) randomNum = 0;
            else if (randomNum < 9) randomNum = 1;
            else if (randomNum < 12) randomNum = 2;
            else if (randomNum < 14) randomNum = 3;
            else randomNum = 4;
            randomNums.push(randomNum);
        }
        return randomNums;
    }

    rollSlot(isLast) {
        let randomNums = this.generateNewRandoms();
        for (let j = 0; j < this.cols.length; j++) {
            this.cols[j].innerHTML = `<i class="fa-solid ${this.numberToIcon.translateToIcon(randomNums[j])}"></i>`;
        }
        if (isLast) {
            setTimeout(() => {
                this.checkWin(randomNums);
            }, 500);
        }
    }

    checkWin(rolledNums) {
        let winMultiplier = 0;
        let winMoney = 10;
        let totalMultiplier = 1;

        for (let i = 0; i < 3; i++) {
            // sorok
            //kevin ez meg mindig mi a fasz
            if (
                rolledNums[i * 3] === rolledNums[1 + i * 3] &&
                rolledNums[i * 3] === rolledNums[2 + i * 3]
            ) {
                this.cols[i * 3].classList.add("winner", "horizontal");
                this.cols[1 + i * 3].classList.add("winner", "horizontal");
                this.cols[2 + i * 3].classList.add("winner", "horizontal");
                winMultiplier += 1;
                totalMultiplier *= this.numberToIcon.getMultiplier(rolledNums[i * 3]);
            }
            // oszlopok
            if (
                rolledNums[i] === rolledNums[i + 3] &&
                rolledNums[i] === rolledNums[i + 6]
            ) {
                this.cols[i].classList.add("winner", "vertical");
                this.cols[i + 3].classList.add("winner", "vertical");
                this.cols[i + 6].classList.add("winner", "vertical");
                winMultiplier += 1;
                totalMultiplier *= this.numberToIcon.getMultiplier(rolledNums[i]);
            }
        }
        // atlok
        if (rolledNums[0] === rolledNums[4] && rolledNums[0] === rolledNums[8]) {
            this.cols[0].classList.add("winner", "diagonalFromTop");
            this.cols[4].classList.add("winner", "diagonalFromTop");
            this.cols[8].classList.add("winner", "diagonalFromTop");
            winMultiplier += 1;
            totalMultiplier *= this.numberToIcon.getMultiplier(rolledNums[0]);
        }
        if (rolledNums[6] === rolledNums[4] && rolledNums[6] === rolledNums[2]) {
            this.cols[6].classList.add("winner", "diagonalFromBottom");
            this.cols[4].classList.add("winner", "diagonalFromBottom");
            this.cols[2].classList.add("winner", "diagonalFromBottom");
            winMultiplier += 1;
            totalMultiplier *= this.numberToIcon.getMultiplier(rolledNums[6]);
        }

        if (winMultiplier > 0) {
            this.moneyManager.addMoney(winMoney * totalMultiplier);
        }

        this.canSpin = true;
        this.setSpinActive(true);
    }

    animatePull() {
        if (!this.spinArm) return;
        this.spinArm.style.transition = "transform 0.12s cubic-bezier(.4,2,.6,1)";
        this.spinArm.style.transform = "rotate(-15deg) scale(1.08)";
        setTimeout(() => {
            this.spinArm.style.transition = "transform 0.35s cubic-bezier(.4,0,.2,1)";
            this.spinArm.style.transform = "rotate(0deg) scale(1)";
        }, 220);
    }
}