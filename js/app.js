var numRows = 6;
var numCols = 5;
var playAreaWidth = 505;
var playAreaHeight = 606 - 108;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 3; //column to show sprite on
    this.y = 4; //row to show prite on
    this.playAreaWidth = 505; //movable pixels wide
    //added the math to show its the canvas height minus
    this.playAreaHeight = 606 - 108; //movable pixels tall
    this.xOffset = 0; //offset for the sprite
    this.yOffset = -10; //offset for sprite

    this.xPixles = //perform math to calculate the position on the canvas
      function(){
        return this.x * (this.playAreaWidth / numCols) + this.xOffset; }

    this.yPixles = //perform math to calculate the position on the canvas
      function(){
        return this.y * (this.playAreaHeight / numRows) + this.yOffset; }
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // currently this is not required to do anything
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPixles(), this.yPixles());
};

// Draw the enemy on the screen, required method for game
Player.prototype.handleInput = function(input) {
  //min and max functions keep the player in bounds
    switch(input){
      case 'left':
        this.x = Math.max(0, this.x - 1);
        break;
      case 'right':
        this.x = Math.min(numCols - 1, this.x + 1);
        break;
      case 'up':
        this.y = Math.max(0, this.y - 1);
        break;
      case 'down':
        this.y = Math.min(numRows - 1, this.y + 1);
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

for (var i = 0; i < 5; i++) {
  var enemy = new Enemy();
  allEnemies.push(enemy);
}

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
