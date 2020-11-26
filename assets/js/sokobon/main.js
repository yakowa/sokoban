var canvas = document.getElementById("play");
var ctx = canvas.getContext("2d");
var __version = "Indev b10";

function menuMain() {

    var image = new Image();
    image.src = "assets/media/sokobon/mainMenu.png";

    image.onload = function() {
        ctx.drawImage(image, 0, 0, 900, 600);

        ctx.fillStyle = "#1DB9B8";
        ctx.font = "bold 50px Bahnschrift";
        ctx.fillText("Sokobon", (canvas.width / 2) - 93, canvas.height / 3.5);

        ctx.fillStyle = "#fff";
        ctx.font = "30px Consolas";
        ctx.fillText("Click to start.", (canvas.width / 2) - 110, canvas.height / 2);

        ctx.fillStyle = "#fff";
        ctx.font = "20px Consolas";
        ctx.fillText("Made by Yako, All rights reserved.", canvas.width - 385, canvas.height - 20);

        ctx.fillStyle = "#fff";
        ctx.font = "20px Consolas";
        ctx.fillText(__version, canvas.width / 100, canvas.height - 20);
    }
    document.getElementById("play").addEventListener("click", leaveMainMenu, false);
}



function leaveMainMenu() {
    document.getElementById("play").removeEventListener("click", leaveMainMenu, false);
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    levelMenu(1);    
}





function levelMenu(pageI) {
    var image = new Image();
    image.src = "assets/media/sokobon/mainMenu.png";
    var buttons = [];
    var page = pageI;
    var level = [{"name": "Level 1"}, {"name": "Level 2"}, {"name": "Level 3"}, {"name": "Level 4"}, {"name": "Level 5"}, {"name": "Level 6"}, {"name": "Level 7"}, {"name": "Level 8"}, {"name": "Level 9"}, {"name": "Level 10"}, {"name": "Level 11"}, {"name": "Level 12"}, {"name": "Level 13"}, {"name": "Level 14"}, {"name": "Level 15"}, {"name": "Level 16"}];
    var levels = level.length;
    var levelNames = [];
    var minLvl = (12 * page) - 12;
    var maxLvl = 12 * page;
    var maxIter = levels;
    var isPageFull = false;

    image.onload = function() {
        ctx.drawImage(image, 0, 0, 900, 600);
        ctx.fillStyle = "#1DB9B8";
        ctx.font = "bold 50px Bahnschrift";
        ctx.fillText("Level Select", (canvas.width / 2) - 130, canvas.height / 6.5);


        for (var i = 0; i < minLvl; i++) {
            buttons.push(null)
        }

        for (var i = minLvl; i < maxLvl && i < maxIter; i++) {
            if (i == (maxIter - 1)) {
                isPageFull = true;
            }
            // Max horizontal rows, standard width and height
            var ratioW = 4;
            var width = 150;
            var height = 100;
            // If the first level in display
            if (i == minLvl) {
                var x = 38;
                var y = 160 - (height / 2);
            }
            // If ready for a new row
            else if (i == ratioW || i % ratioW == 0) {
                var x = 38;
                var y = buttons[i - 1].y + height + (height / 2);
            }
            // All other levels in display
            else {
                var x = buttons[i - 1].x + width + (width / 2);
                var y = buttons[i - 1].y;
            }
            // Saving i for other functions
            l = i;
            // Saving the name of the current level to be rendered later
            levelNames.push({"name": level[l].name, "x": x + 20, "y": y + (height / 2)});

            // Drawing the outline
            ctx.fillStyle = "black";
            ctx.fillRect(x - 1, y - 1, width + 2, height + 2);

            // Drawing the main button
            var grd = ctx.createLinearGradient(0, 0, 200, 0);
            grd.addColorStop(0, "#1952FF");
            grd.addColorStop(1, "#1000FF");
            ctx.fillStyle = grd;
            ctx.fillRect(x, y, width, height)
            // Saving the x, y, width, height and level number for use in the button listener
            buttons.push({"x": x, "y": y, "width": width, "height": height, "index": i});
        }
        // Rendering the text after all buttons
        ctx.fillStyle = "black";
        ctx.font = "25px Consolas";
        var nameLen = levelNames.length;
        for (var i = 0; i < nameLen; i++) {
            ctx.fillText(levelNames[i].name, levelNames[i].x, levelNames[i].y + 5);
        }

        // Rendering the page back button
        ctx.fillStyle = "#1DB9B8";
        ctx.fillRect(38, canvas.height - 15 - 50, 50, 50)
        // Saving the x, y, widht, height and command for use in the button listener
        buttons.push({"x": 38, "y": canvas.height - 15 - 50, "width": 50, "height": 50, "index": "<<<"});
        
        // Rendering the text on the back button
        ctx.fillStyle = "black";
        ctx.font = "25px Consolas";
        ctx.fillText("<<<", 42, canvas.height - 35);

        if (!isPageFull) {
            // Rendering the page forward button
            ctx.fillStyle = "#1DB9B8";
            ctx.fillRect(canvas.width - 38 - 50, canvas.height - 15 - 50, 50, 50)
            // Saving the x, y, widht, height and command for use in the button listener
            buttons.push({"x": canvas.width - 38 - 50, "y": canvas.height - 15 - 50, "width": 50, "height": 50, "index": ">>>"});
            // Rendering the text on the forward button
            ctx.fillStyle = "black";
            ctx.font = "25px Consolas";
            ctx.fillText(">>>", canvas.width - 42 - 42, canvas.height - 35);
        }

    // End of background image's onload function
    }
    
    // Adding an event listener for clicking
    canvas.addEventListener("click", checkButtonPress, false);

    // Handling all clicks while in the level select menu
    function checkButtonPress(e) {
        // For all buttons
        var btnsLen = buttons.length;
        for (var i = 0; i < btnsLen; i++) {
            if (buttons[i] == null) {
                continue;
            }
            // Calculating the x and y of the cursur on click
            var {pageX, pageY} = e.touches ? e.touches[0] : e;
            var xC = pageX - canvas.offsetLeft;
            var yC = pageY - canvas.offsetTop;
            // Getting the current button's x, y, widht, height
            var x = buttons[i].x;
            var y = buttons[i].y;
            var width = buttons[i].width;
            var height = buttons[i].height;
            // If click on a button
            if (xC > x && xC < x + width && yC > y && yC < y + height) {
                // If click on foward page button
                if (buttons[i].index == ">>>") {
                    //  < levels
                    if (page >= 1 && !(minLvl > levels)) {
                        canvas.removeEventListener("click", checkButtonPress, false);
                        levelMenu(page + 1);
                        break;
                    }
                }
                // // If click on backward page button
                else if (buttons[i].index == "<<<") {
                    if (page > 1) {
                        canvas.removeEventListener("click", checkButtonPress, false);
                        levelMenu(page - 1);
                        break;
                    }
                    else if (page == 1) {
                        canvas.removeEventListener("click", checkButtonPress, false);
                        menuMain()
                        break;
                    }
                }
                // // If click on a play level button
                else {
                    startGame(buttons[i].index);
                    break;
                }
            }
        }
    }
}

 



function startGame(level) {
    // Creating component's used in the game
    rawData = getLevel(level).map;
    entities = [];
    ratioW = 9;
    ratioH = 6;

    var rawDataLen = rawData.length;
    for (var i = 0; i < rawDataLen; i++) {
        var width = game.canvas.width / ratioW;
        var height = game.canvas.height / ratioH;
        if (i == 0) {
            var x = 0;
            var y = 0;
        }
        else if (i == ratioW || i % ratioW == 0) {
            var x = 0;
            var y = entities[i - 1].y + height;
        }
        else {
            var x = entities[i - 1].x + width;
            var y = entities[i - 1].y;
        }
        var asset = "";
        switch(rawData[i]) {
            case "a":
                asset = "assets/media/sokobon/tiles/a.png";
                break;
            case "p":
                asset = "assets/media/sokobon/tiles/p.png";
                break;
            case "e":
                asset = "assets/media/sokobon/tiles/e.png";
                break;
            default:
                asset = "assets/media/sokobon/tiles/error.png";
        }

        entities.push(new component(width, height, asset, x, y, width, height, "image"));
    }
    
    // Creating sound effects
    // crashSound = new sound("assets/media/sokobon/crash.wav");

    // Starting the game
    game.start();
}

var game = {
    // Selecting the canvas
    canvas : document.getElementById("play"),
    start : function() {
        // Getting the 2D context of the canvas
        this.context = this.canvas.getContext("2d");
        // Counting frames
        this.frames = 0
        // Setting the update to run every 50ms
        this.interval = setInterval(updateGameArea, 20);
        
        // Setting up inputs
        window.addEventListener('keydown', function (e) {
            game.keys = (game.keys || []);
            game.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            if (e.keyCode != 82 && e.keyCode != 17) {
                game.keys[e.keyCode] = false;
            }
        })
    },
    clear : function() {
        // Making a clear rectangle to clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        // Stop updating the screen every 50ms
        clearInterval(this.interval);
        crashSound.play()
        
        // game.canvas.style.webkitFilter = "blur(2px)";
        var endGameText = new component("30px", "Consolas", "black", (game.canvas.width / 2) - 83, 40, 1, 1, "text");
        endGameText.text = "GAME OVER!";
        endGameText.update();
        
        // document.getElementById("restartButton").style.display = "block";
    }
}



// Making an object that can be redered on the screen
function component(width, height, color, x, y, speedX, speedY, type) {
    // SizeX, SizeY, Color/scr, X, Y, SpeedX, SpeedY, Type
    this.type = type
    if (this.type == "image" || this.type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.color = color
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;
    // Re-render self
    this.update = function() {
        ctx = game.context;
        if (this.type == "text") {
            ctx = game.context;
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (this.type == "image" || this.type == "background") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if (this.type == "background") {
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        }
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    // Crash with calculation
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
        crash = false;
        }
        return crash;
    }
}



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
      this.stop = function() {
        this.sound.pause();
    }
}



function everyinterval(n) {
    if ((game.frames / n) % 1 == 0) {return true;}
    return false;
}

// Ran every 50ms
function updateGameArea() {

    game.frames += 1;

    // Clear the canvas
    game.clear();

    var entitiesLen = entities.length;
    for (var i = 0; i < entitiesLen; i++) {
        entities[i].update()
    }
}