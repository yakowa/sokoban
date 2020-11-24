function getDB() {
    var db = [
        {
            "name": "About",
            "link": "about.html",
            "keywords": [
                "about",
                "help"
            ]
        },
        {
            "name": "Yako-Utilities",
            "link": "yako-utilities.html",
            "keywords": [
                "yako",
                "utilities"
            ]
        },
        {
            "name": "bonk",
            "link": "yako-sasutilities.html",
            "keywords": [
                "toast",
                "yako"
            ]
        },
    ]
    return db;
}


function query() {
    const resultsList = document.getElementById('results');
    new URLSearchParams(window.location.search).forEach((value, name) => {
        if (name == 'q') {
            db = getDB();
            found = false;
            for (var i = 0; i < db.length; i++) {
                for (var y = 0; y < db[i]['keywords'].length; y++) {
                    if (value.toLowerCase() == db[i]['keywords'][y]) {
                        found = true;
                        var show = document.createElement("a");
                        show.innerHTML = db[i]['link'];
                        show.href = db[i]['link'];
                        show.classList.add('result');
                        resultsList.append(show);
                        resultsList.append(document.createElement('br'));
                    }
                }
            }
            if (!found) {
                var show = document.createElement('h3');
                show.innerHTML = 'There was nothing found related to your search!'
                show.classList.add('failResult');
                resultsList.append(show);
            }
        }
    })
}