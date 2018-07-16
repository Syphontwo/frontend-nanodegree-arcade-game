var numRows = 6;
var numCols = 5;
var allEnemies = [];
var paused = false;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Sets up initial positions.
    //Don't want the board to be free of anamies at the start
    this.row = (Math.floor(Math.random() * (3 - 0)) + 0) + 1 //for collision
    this.x = Math.floor(Math.random() * (505 - 0)) + 0;
    this.y = 60  + (83 * (this.row - 1));
    this.speedPerTick = (Math.floor(Math.random() * (400 - 150)) + 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speedPerTick * dt;
    if (this.x > 560){
      this.spawn();
    }
};

// Setup this enemy as a new one to come across the screen
Enemy.prototype.spawn = function(){
  this.row = (Math.floor(Math.random() * (3 - 0)) + 0) + 1;
  this.x = -1 * (Math.floor(Math.random() * (500 - 83)) + 83);
  this.y = 60  + (83 * (this.row - 1));
  this.speedPerTick = (Math.floor(Math.random() * (400 - 150)) + 150);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 3; //column to show sprite on
    this.y = 5; //row to show prite on
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

Player.prototype.update = function() {

  // check for collision
  allEnemies.forEach(function(enemy){
    if (enemy.row == this.y && //enemy and player on same row
      //emeny right is right of player left
        enemy.x + 98 >= this.xPixles() + 16 &&
      //enemy left is left of player right
        enemy.x + 1 <= this.xPixles() + 85){
          var gameOverScreen = document.getElementById('gameOver');
          gameOverScreen.style.display = "block";
          paused = true;
    }
  }, this);

  //check for win
  if (this.y == 0){
    var gameOverScreen = document.getElementById('gameSuccess');
    gameOverScreen.style.display = "block";
    paused = true;
  }
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
      case 'enter':
        //enter key should only have an interaction if a modal window is up
        if (paused){
          var gameOverScreen = document.getElementById('gameOver');
          gameOverScreen.style.display = "none";
          var gameOverScreen = document.getElementById('gameSuccess');
          gameOverScreen.style.display = "none";
          //reset the player position
          this.x = 3;
          this.y = 5;
          paused = false;
        }
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

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
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
