"use strict";

// Enemies our player must avoid
var Enemy = function (startX, startY, speed, enableSpecial) {
    this.sprite = 'images/enemy-bug.png';
    this.originX = startX;
    this.originY = startY;
    this.movementSpeed = speed;
    this.x = startX;
    this.y = startY;
    this.specialMovement = enableSpecial;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.movementSpeed * dt;

    if (this.x > 6 * tileWidth)
        this.reset();
    else if (this.specialMovement)
        this.y = this.originY + 83 * Math.cos(this.x / 50);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resets the enemy to its starting position
Enemy.prototype.reset = function () {
    this.x = this.originX;
    this.y = this.originY;
}

// Player class
var Player = function (startX, startY) {
    this.originX = startX;
    this.originY = startY;
    this.xMoveSpeed = 101;
    this.yMoveSpeed = 83;
    this.sprites = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    this.resetPosition();
    this.points = 0;
};

/* Performs very simplistic check for player collisions with enemies
 * by comparing occupying tile, based on entity sprite (x, y)
 */
Player.prototype.update = function (dt) {
    // get player tile coordinates
    var pTileX = Math.floor(this.x / tileWidth);
    var pTileY = Math.floor(this.y / tileHeight);

    for (var i = 0; i < allEnemies.length; i++) {
        // get current enemy tile coordinates
        var curEnemy = allEnemies[i];
        var eTileX = Math.floor(curEnemy.x / tileWidth);
        var eTileY = Math.floor(curEnemy.y / tileHeight);

        // if same tile coordinates as player, reset
        if (eTileX === pTileX && eTileY === pTileY)
            this.resetPosition();
    }
};

// Resets player position and selects a character sprite randomly
Player.prototype.resetPosition = function () {
    this.x = this.originX;
    this.y = this.originY;
    this.sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];
};

// Renders the player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles player reaching the goal row
Player.prototype.scorePoint = function () {
    this.resetPosition();
    this.points += 1;
};

// Handles user input
Player.prototype.handleInput = function (keyName) {
    switch (keyName) {
        case 'left':
            if (this.x > this.xMoveSpeed)
                this.x -= this.xMoveSpeed;
            break;
        case 'up':
            if (this.y > this.yMoveSpeed)
                this.y -= this.yMoveSpeed;
            else {
                this.scorePoint();
            }
            break;
        case 'right':
            if (this.x + this.xMoveSpeed < 5 * tileWidth)
                this.x += this.xMoveSpeed;
            break;
        case 'down':
            if (this.y + this.yMoveSpeed < 5 * tileHeight)
                this.y += this.yMoveSpeed;
            break;
    }
};


var allEnemies = [
    new Enemy(-101, 60, 150, false),
    new Enemy(-101, 142, 75, false),
    new Enemy(-101, 224, 100, false),
    new Enemy(-101, 142, 225, true)
];
var player = new Player(203, 401);


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