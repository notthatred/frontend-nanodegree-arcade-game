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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
