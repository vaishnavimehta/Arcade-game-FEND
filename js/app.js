// Player Class which initialises position of player on x-axis,y-axis, avatar of player and points
var Player=function(parameterX,parameterY)
{
	this.playerX=parameterX;//initial position of player character on the x axis
	this.playerY=parameterY;//initial position of player character on the y axis
	this.sprite='images/char-boy.png';//character used as player
	this.playerPoints=0;//points scored 
};

//displays the player
Player.prototype.render=function()
{
	ctx.drawImage(Resources.get(this.sprite), this.playerX, this.playerY);
};

// increases player points by 5 and checks if he has won the game.
Player.prototype.checkPoint=function()
{
	this.playerPoints+=5;
	var x=document.getElementById('points');
	
	if(this.playerPoints>=75)
	{
    document.write("<h1>yey, You won!!!</h1>");
  }
	else
	{
		x.innerHTML=this.playerPoints;
	}
};

// if player is out of canvas, resets player position else sets coordinates according to key pressed.
Player.prototype.handleInput=function(key)
{
	if(key==='up')
	{
			if(this.playerY<0)
 			{this.resetPosition();}
			else
			{this.playerY-=75;}
	}
	else if(key=='down')
	{
			if(this.playerY>330)
			{this.resetPosition();}
			else
			{this.playerY+=75;}
	}
	else if(key=='left')
	{
			if(this.playerX<=15)
			{this.resetPosition();}
			else
			{this.playerX-=75;}
	}
	else if(key=='right')
	{
			if(this.playerX>350)
			{this.resetPosition();}
			else
			{this.playerX+=75;}
	}
};

// reset function. resets position and points. 
Player.prototype.resetPosition=function()
{
	this.playerX=90;
	this.playerY=370;
	this.playerPoints=0;
	var x=document.getElementById('points');
	x.innerHTML=this.playerPoints;
};

//Key class sets initial coordinates of key and its image.
var Key=function()
{
	this.KeyX=115;
	this.KeyY=230;
	this.sprite='images/Key.png';
};

//displays the key
Key.prototype.render=function()
{
ctx.drawImage(Resources.get(this.sprite), this.KeyX, this.KeyY);
};
Key.prototype.update=function()
{
};

// heart class initialised with coordinates n logo of heart.
var Heart=function()
{
	this.HeartX=225;
	this.HeartY=265;
	this.sprite='images/Heart.png';
};

//displays heart
Heart.prototype.render=function()
{
	ctx.drawImage(Resources.get(this.sprite), this.HeartX, this.HeartY);//displays the Heart
};
Heart.prototype.update=function()
{
};

// Enemy class sets initial coordinates of bugs and speed and logo.
var Enemy = function(parameterX,parameterY) {
    this.enemyX=parameterX;
	this.enemyY=parameterY;
	this.enemySpeed=Math.floor(Math.random()*99);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position. dt is a time delta between ticks. Increments x coordinate of enemy and if it goes out of canvas, resets it.
Enemy.prototype.update = function(dt) {
    this.enemyX+=(this.enemySpeed*dt);
	if(this.enemyX>507)
	{this.enemyX=-95;}
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
};

// Updates player position if it touches enemy or heart or key or moves out of canvas.
Player.prototype.update=function(dt)
{
	if (this.playerX < allEnemies[0].enemyX + 75 && this.playerX + 75 > allEnemies[0].enemyX && this.playerY < allEnemies[0].enemyY+ 75 && this.playerY + 75 > allEnemies[0].enemyY) //checks for collision with the enemy
	{
		this.resetPosition();
	}
	else if (this.playerX < allEnemies[1].enemyX + 75 && this.playerX + 75 > allEnemies[1].enemyX && this.playerY < allEnemies[1].enemyY + 75 && this.playerY + 75 > allEnemies[1].enemyY) //checks for collision with the enemy
	{
		this.resetPosition();
	}
	else if (this.playerX < allEnemies[2].enemyX + 75 && this.playerX + 75 > allEnemies[2].enemyX && this.playerY < allEnemies[2].enemyY + 75 && this.playerY+ 75 > allEnemies[2].enemyY) //checks for collision with the enemy
	{
		this.resetPosition();
	}
	// updating keys and hearts.
	if (this.playerX<key.KeyX+40 && this.playerX+40>key.KeyX && this.playerY<key.KeyY+40 && this.playerY+40>key.KeyY) //checks for collision with the key
	{this.updateKey();
	 this.checkPoint();}
	if (this.playerX<heart.HeartX+60 && this.playerX+60>heart.HeartX && this.playerY<heart.HeartY+60 && this.playerY+60>key.KeyY) //checks for collision with the Heart
	{this.updateHeart();
	 this.checkHeartPoint();}
};
Player.prototype.updateHeart=function()
{
	heart.HeartX=Math.random()*305;
	var t=Math.random()*250;
	while(t<=60 && t>=250 && t%60===0)
	{
		t=Math.random()*250;
	}
	heart.HeartY=t;
};
// increases points by 10 and check for perfect score. Also updates scores on screen.
Player.prototype.checkHeartPoint=function()
{
	this.playerPoints+=10;
	var x=document.getElementById('points');
	if(this.playerPoints>=75)
	{document.write("<h1>yey, You won!!!</h1>");}
	else
	{
		x.innerHTML=this.playerPoints;
	}
};

//new random key position.
Player.prototype.updateKey=function()
{
	key.KeyX=Math.random()*405;
	var t=Math.random()*250;
	while(t<=100 && t>=250)
	{
		t=Math.random()*250;
	}
	key.KeyY=t;
};
//creting 3 enemies, one player, key and heart. Also adding event listeners for keys.
var allEnemies=[new Enemy(0,52),new Enemy(0,142),new Enemy(0,232)];
var player=new Player(90,370);
var key=new Key();
var heart=new Heart();
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
player.handleInput(allowedKeys[e.keyCode]);
});
