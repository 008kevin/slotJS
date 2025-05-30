export default class NumberToIcon {
    constructor() {
        this.icons = [
            { icon: "fa-skull", multiplier: 0.1 },
            { icon: "fa-bomb", multiplier: 0.5 },
            { icon: "fa-heart", multiplier: 2 },
            { icon: "fa-money-bill", multiplier: 5 },
            { icon: "fa-crown", multiplier: 10 }
        ];
    }

    translateToIcon(number) {
        return this.icons.length > number ? this.icons[number].icon : "fa-square";
    }

    getMultiplier(number) {
        return this.icons.length > number ? this.icons[number].multiplier : 0;
    }
}