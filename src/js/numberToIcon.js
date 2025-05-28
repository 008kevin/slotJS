let icons = {
    0: "fa-circle",
    1: "fa-bomb",
    2: "fa-heart",
    3: "fa-money-bill",
    4: "fa-fire",
    5: "fa-snowflake",
    6: "fa-flag",
    7: "fa-leaf",
    8: "fa-crown",
    9: "fa-cube",
    10: "fa-toilet-paper"
}

function translateToIcon(number) {
    return number in icons ? icons[number] : "fa-square";
}