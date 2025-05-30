let icons = [
    {icon: "fa-skull", multiplier: 0.1}, // 0.1 db5
    {icon: "fa-bomb", multiplier: 1.1},  // 0.5 db4
    {icon: "fa-heart", multiplier: 2}, // 1 db3
    {icon: "fa-money-bill", multiplier: 5}, // 1.5 db2
    {icon: "fa-crown", multiplier: 10}, // 2 db1
]

function translateToIcon(number) {
    return icons.length > number ? icons[number].icon : "fa-square";
}

function getMultiplier(number) {
    return icons.length > number ? icons[number].multiplier : 0;
}