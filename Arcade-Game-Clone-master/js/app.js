// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x=x;
    this.y=y;

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed=50+Math.floor(Math.random()*200);
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x=this.x+this.speed*dt;
    if(this.x>505){
        this.x=0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/char-horn-girl.png';
};

//update()函数
Player.prototype.update=function(dt){
    this.checkCollisions();
    //this.reset();
};

//checkCollisions()函数，玩家和敌人的碰撞检测
Player.prototype.checkCollisions = function() {
  for (i = 0; i < allEnemies.length; i++) {
    if (this.x < allEnemies[i].x + 60 && this.x + 60 > allEnemies[i].x && this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
      this.reset();
    }
  }
};

//reset()函数
Player.prototype.reset=function(){
    var that=this;
    setTimeout(function(){
        that.y=405;
        that.x=200;
    },250);
}

//render()函数，在屏幕上画出玩家
Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

//handleInput()函数，通过用户输入来上下左右移动玩家
Player.prototype.handleInput=function(pressKey){
    switch(pressKey){
        case"left":
        if(this.x>0)
            this.x=this.x-100;
        break;
        case"up":
        if(this.y>0)
            this.y=this.y-85;
        break;
        case"right":
        if(this.x<400)
            this.x=this.x+100;
        break;
        case"down":
        if(this.y<400)
            this.y=this.y+85;
        break;
    }
    this.checkWinGame();
};

//checkWinGame()函数，赢得比赛时的状态
Player.prototype.checkWinGame=function(){
    if(this.y<0){
        setTimeout(function(){
            if(confirm("Congratulation!!")){
                this.reset();
            }
        }.bind(this),200);
    }
};

// 现在实例化你的所有对象
var enemy1=new Enemy(-50,225);
var enemy2=new Enemy(-200,145);
var enemy3=new Enemy(-100,60);
var enemy4=new Enemy(-150,145);

// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies=[];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

// 把玩家对象放进一个叫 player 的变量里面
var player=new Player(200,405);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
