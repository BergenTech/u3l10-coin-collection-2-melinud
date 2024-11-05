// Game variables 
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let obstacleSpeed = 1
hits = 0
function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = 0;
  obstacleY = random(20, height-20);
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {

    if (keyIsDown(LEFT_ARROW)) {
      playerX -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      playerY -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      playerY += 5;
    }
}

function moveObstacle() {
  // Moving the obstacle down, resetting once it hits the bottom
  obstacleY += obstacleSpeed
  if( obstacleY > height){
    obstacleY = 0
    obstacleX = random(0, width)
  }
}

function checkCoinCollection() {
  // Checking the distance between the player and the coin, adding score and increasing speed if touched
  if (dist(playerX,playerY,coinX,coinY)<15){
    score++
    newCoin()
    drawCoin()
    obstacleX = random(0, width)
    obstacleY = 0
    obstacleSpeed+=0.5
  }

}

function checkCollisions() {
  // Checking if the player hits the obstacle, increasing hits, and checking if it is hit too many times
  if(dist(playerX,playerY,obstacleX,obstacleY)<20){
    hits++
    obstacleX = random(0, width)
    obstacleY = 0
  }
    if (hits >= 3){
      gameOver = true
    }

}

function displayStats() {
  textAlign(CENTER, CENTER)
  fill(0);
  textSize(16);
  text("Score: " + score, width/4, 20);
  text("Hits: " + hits, width/2, 20)
  text("Speed: " + obstacleSpeed, 3*width/4, 20)
}

function displayGameOver() {
  textAlign(CENTER, CENTER)
  textSize(50)
  text("Game Over", width/2, (height/2)-20)
  textSize(30)
  text("Final Score: " + score, width/2, (height/2)+30)
  textSize(16)
  text("Press R to restart", width/2, (height/2)+60)
}

function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}

function resetGame() {
  // Resetting the variables
  gameOver = false
  score = 0
  obstacleSpeed = 1
  hits = 0
  initializeGame()
}

function keyPressed() {
  // Checking if player resets during the game over screen
  if (key === 'r' && gameOver == true){
    resetGame()
  }
}