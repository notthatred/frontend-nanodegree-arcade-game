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
}

Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100
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
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player Class
var Player = function() {
  this.x = 200;
  this.y = 400;
}

Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0){ 
        this.x = this.x - 100;
    } else if (this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 100;
    } else if (this.ctlKey === 'up'){
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 83;
    }
    this.ctlKey = null;
    if (this.y < 60){
        this.reset();
    }
}

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(charImages[charIndex]), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
  this.ctlKey = key;
}

Player.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
  lives--;
  document.getElementById('lives').innerHTML = 'Lives: ' + lives;
  if (lives < 0) {
    endGame();
  }
}

// Gem class
var Gem = function() {
  this.x = gemX[Math.floor(Math.random() * 5)];
  this.y = allY[Math.floor(Math.random() * 3)];
}

Gem.prototype.update = function() {
    if (player.y === this.y + 8 && player.y === this.y + 8) {
        if (player.x === this.x && player.x === this.x) {
        totalPoints = totalPoints + pointsPerGem;
        this.x = gemX[Math.floor(Math.random() * 5)];
        this.y = allY[Math.floor(Math.random() * 3)];
        }
    }
    document.getElementById('points').innerHTML = 'Points: ' + totalPoints;
}

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(gemImages[gemIndex]), this.x, this.y);

}

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
