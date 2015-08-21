// Add Variables
var userSelections = [false, false, false];
var renderFlag = false;
var charImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ];
var charIndex;
var enemySpeedMult = 300;
var collisionProx = 30;
var lives;
var gemImages = [
    'images/Gem-Green.png',
    'images/Gem-Blue.png',
    'images/Gem-Orange.png'
    ];
var gemIndex;
var gemX = [0, 100, 200, 300, 400];
var pointsPerGem;
var totalPoints = 0;
var minutes;
var allY = [60, 143, 226];

// Enemies Class (our player must avoid them!)
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = allY[Math.floor(Math.random() * 3)];
    this.speed = Math.floor(100 + (Math.random() * enemySpeedMult));
};

Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * enemySpeedMult));
        if (this.y > 226) {
            this.y = 60;
        }
    }
    if (player.y >= this.y - collisionProx && player.y <= this.y + collisionProx) {
        if (player.x >= this.x - collisionProx && player.x <= this.x + collisionProx) {
        player.reset();
        }
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Class
var Player = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if (this.ctlKey === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y != 400) {
        this.y = this.y + 83;
    }
    this.ctlKey = null;
    if (this.y < 60) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(charImages[charIndex]), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.ctlKey = key;
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    lives--;
    document.getElementById('lives').innerHTML = 'Lives: ' + lives;
    if (lives < 0) {
        endGame();
    }
};

// Gem class
var Gem = function() {
    this.x = gemX[Math.floor(Math.random() * 5)];
    this.y = allY[Math.floor(Math.random() * 3)];
};

Gem.prototype.update = function() {
    if (player.y === this.y + 8 && player.y === this.y + 8) {
        if (player.x === this.x && player.x === this.x) {
            totalPoints = totalPoints + pointsPerGem;
            this.x = gemX[Math.floor(Math.random() * 5)];
            this.y = allY[Math.floor(Math.random() * 3)];
        }
    }
    document.getElementById('points').innerHTML = 'Points: ' + totalPoints;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(gemImages[gemIndex]), this.x, this.y);
};

// Instantiate objects.
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var enemyD = new Enemy();
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

var player = new Player();

var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Selection Functions

// Char Selection Function
function charClick (imgId, imgIndex) {
    charIndex = imgIndex;
    var buttons = document.getElementsByClassName('charImg');
    for (var i = 0, length = buttons.length; i < length; i++) {
       buttons[i].style.border = '2px solid white';
    }
    document.getElementById(imgId).style.border = '2px solid green';
    userSelections[0] = true;
}

// Difficulty Selection Function
function difficultyClick (buttonID, rating) {
    switch (rating) {
    case 'Easy':
        enemySpeedMult = 200;
        collisionProx = 20;
        lives = 3;
        gemIndex = 0;
        pointsPerGem = 20;
        break;
    case 'Normal':
        enemySpeedMult = 400;
        collisionProx = 40;
        lives = 5;
        gemIndex = 1;
        pointsPerGem = 40;
        break;
    case 'Nightmare':
        enemySpeedMult = 1000;
        collisionProx = 60;
        lives = 7;
        gemIndex = 2;
        pointsPerGem = 60;
        break;
    }
    var buttons = document.getElementsByClassName('diffButton');
    for(var i = 0, length = buttons.length; i < length; i++) {
       buttons[i].style.border = '2px solid white';
    }
    document.getElementById(buttonID).style.border = '2px solid green';
    document.getElementById('lives').innerHTML = 'Lives: ' + lives;
    document.getElementById('diffName').innerHTML = 'Difficulty: ' + rating;
    userSelections[1] = true;
}

// Duration Selection Function
function timeClick (buttonID, duration) {
    switch (duration) {
    case 'one':
        minutes = 1;
        break;
    case 'two':
        minutes = 2;
        break;
    case 'three':
        minutes = 3;
    }
    var buttons = document.getElementsByClassName('durationButton');
    for (var i = 0, length = buttons.length; i < length; i++) {
       buttons[i].style.border = '2px solid white';
    }
    document.getElementById(buttonID).style.border = '2px solid green';
    userSelections[2] = true;
}

// Countdown Function
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1;
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if ( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if (mins > 1) {
               setTimeout(function () { countdown(mins - 1); }, 1000);
            }
        }
        if (current_minutes === 0 && seconds === 0) {
            endGame();
        }
    }
    tick();
}

// Play Selection Function
function playClick () {
    var selectionCount = 0;
    for (var i = 0, length = userSelections.length; i < length; i++) {
        if (userSelections[i] === true) {
           selectionCount++;
        }
    }
    if (selectionCount === 3) {
        document.getElementById('selectionMenu').style.display = 'none';
        renderFlag = true;
        countdown(minutes);
    } else {
        alert('Be sure you have selected any voice to play.');
    }
}

// Game Over Function
function endGame () {
    renderFlag = false;
    document.getElementById('pointsTotal').innerHTML = totalPoints;
    document.getElementById('gameOver').style.display = 'block';
}