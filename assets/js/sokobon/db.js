var levels = [
    {
        "name": "Level One",
        "ratioWidth": "9",
        "ratioHeight": "6",
        "map": "aaaaaaaaaaeeebeecaaepeeeeeaaeeeeeeeaaeeebeecaaaaaaaaaa",
        "key": {
            "a": "WALL"
        }
    },
    {
        "name": "Level Two",
        "ratioWidth": "9",
        "ratioHeight": "6",
        "map": "aaaaaabaa",
        "key": {
            "a": "WALL",
            "b": "PLAYER"
        }
    }
]

function getLevel(requestedLevel) {
    try {
        returningLevel = levels[requestedLevel];
        return returningLevel;
    }
    catch {
        return null;
    }
}

function getAllLevels() {
    return levels
}

function getLevelsAmount() {
    return levels.length;
}