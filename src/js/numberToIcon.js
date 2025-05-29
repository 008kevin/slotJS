let icons = {
    0: "fa-skull", // 0.1 db5
    1: "fa-bomb",  // 0.5 db4
    2: "fa-heart", // 1 db3
    3: "fa-money-bill", // 1.5 db2
    4: "fa-crown", // 2 db1
}

function translateToIcon(number) {
    return number in icons ? icons[number] : "fa-square";
}