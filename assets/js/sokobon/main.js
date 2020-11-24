function startGame() {
    // Removing the restart button
    // document.getElementById("restartButton").style.display = "none";

    // Creating component's used in the game
    player = new component(66, 33, "assets/media/sokobon/player.png", 10, 10, 4, 3, "image");
    entities = []
    background = new component(800, 450, "assets/media/sokobon/background.png", 0, 0, 1, 1, "background");
    score = new component("30px", "Consolas", "black", 600, 40, 1, 1, "text");

    // Creating sound effects
    crashSound = new sound("assets/media/sokobon/crash.wav");
    // backgroundMusic = new sound("music.mp3");
    // backgroundMusic.play();

    // Starting the game
    game.start();
}



var game = {
    // Selecting the canvas
    canvas : document.getElementById("_game_canvas"),
    start : function() {
        // Setting the canvas size
        // this.canvas.width = 500;
        // this.canvas.height = 900;

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
                player.image.src = "assets/media/sokobon/player.png";
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

    // Setting the html text
    var textP = document.getElementById('coords');
    textP.innerHTML = 'Co-ords: x:' + player.x + ' y:' + player.y;

    // Background
    background.x += -1;
    if (background.type == "background") {
        if (background.x == -(background.width)) {
            background.x = 0;
        }
    }
    background.update()

    // Player Movement and Input
    // A:
    if (game.keys && game.keys[65]) {player.x -= player.speedX; player.image.src = "assets/media/sokobon/player_active.png";}
    // D
    if (game.keys && game.keys[68]) {player.x += player.speedX; player.image.src = "assets/media/sokobon/player_active.png";}
    // W
    if (game.keys && game.keys[87]) {player.y -= player.speedY; player.image.src = "assets/media/sokobon/player_active.png";}
    // S
    if (game.keys && game.keys[83]) {player.y += player.speedY; player.image.src = "assets/media/sokobon/player_active.png";}
    player.update();

    // If the player goes outside the canvas
    if (player.x < 0 || player.y < 0 || (player.x + player.width) > (game.canvas.width) || (player.y + player.height) > (game.canvas.height)) {
        game.stop()
    }

    // Entity updates
    var x, y;
    if (game.frames == 1 || everyinterval(150)) {
        x = game.canvas.width;
        y = game.canvas.height - 200;

        minHeight = 25;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 35;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        entities.push(new component(10, height, "green", x, 0, 1, 1));
        entities.push(new component(10, x - height - gap, "green", x, height + gap, 1, 1));
    }
    for (i = 0; i < entities.length; i += 1) {
        if ((entities[i].x + 15) - 1 <= 0) {
            entities.splice(i, 1);

        }
        else {
            entities[i].x -= entities[i].speedX;
            entities[i].update();
        }
    }
    for (i = 0; i < entities.length; i += 1) {
        if (player.crashWith(entities[i])) {
            crashSound.play()
            game.stop();
        }
    }
    // Updating the score
    score.text = "SCORE: " + game.frames;
    score.update();
}