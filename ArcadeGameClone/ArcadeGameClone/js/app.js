/*global ctx, Resources, Util:true*/


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var player = {
  defaultSettings: {
    loc: {
      x: 0, // x-coor
      y: 390 // y-coor
    },
    col:{
      score: 0, // score
      item: 0 // item collected
    },
    sprite: 'images/char-cat-girl.png'
  },
    // 初始化函数
  init: function(){
        // 从用户输入界面中获取
    this.times = 0;
    this.loc =  player.defaultSettings.loc;
    this.col =  player.defaultSettings.col;
    this.jumpflag = false;
    if(this.sprite === undefined){
      this.sprite =  player.defaultSettings.sprite;
    }
        //this.scoreboard = scb;

  },
  update: function(dt){
    if(player.scoreboard.passtime>3){
      player.jumpflag = true;

    }
  },
  render: function(){
        // 这里的sprite必须在engine中加载后才能使用
    ctx.drawImage(Resources.get(this.sprite), this.loc.x, this.loc.y);
    if(this.loc.y < 0){
      if(this.col.score >= this.scoreboard.passcore){

        player.times ++;

        this.scoreboard.set(
                    player.scoreboard.spt,
                    player.scoreboard.item,
                    player.scoreboard.inc*(player.times+1),
                    player.times
                );
        this.scoreboard.render(document.querySelector('.scoreboard'));
        this.loc.x = 0;
        this.loc.y = 390;
        alert('成功通关！恭喜！！');

      }else{
        document.querySelector('.notice').innerHTML = 'You need enough points!';
	  }


    }

  },
  handleInput: function(keyName){
    // console.log(this.loc.y);
    switch (keyName){
    case 'up':
      this.loc.y = (this.loc.y<0?this.loc.y:this.loc.y -= 80);
      break;
    case 'down':
      this.loc.y = (this.loc.y>350?this.loc.y:this.loc.y += 80);
      break;
    case 'right':
      this.loc.x = (this.loc.x>390?this.loc.x:this.loc.x += 100);
      break;
    case 'left':
      this.loc.x = (this.loc.x<90?this.loc.x:this.loc.x -= 100);
      break;
    }
    this.render();

  },
  change:function (url) {
        // 换Player的外观

    this.sprite = url;
  }
};
// 这是我们的玩家要躲避的敌人
var Enemy = function(setting) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
  var self = this;
  this.x = setting.loc.x || -50;
  this.y = setting.loc.y || 50;
  this.cat = setting.cat || 'bug'; // 类别



    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件

  switch(this.cat){
  case 'bug':
    this.sprite = 'images/enemy-bug.png';
    this.collisionCB = function(){
      player.loc.x = 0;
      player.loc.y = 390;


      player.col.score -= 70;
      player.col.item -= 1;

      player.scoreboard.set(player.col.score, player.col.item, player.scoreboard.passcore, player.times);
      player.scoreboard.render(document.querySelector('.scoreboard'));

    };
    this.failureDisp = 20;
    break;
  case 'badbug':
    this.sprite = 'images/enemy-bug.png';
    this.collisionCB = function(){
      player.loc.x = 0;
      player.loc.y = 390;

      player.col.score -= 100;
      player.col.item -= 1;

      player.scoreboard.set(player.col.score, player.col.item, player.scoreboard.passcore, player.times);
      player.scoreboard.render(document.querySelector('.scoreboard'));

    };
    this.failureDisp = 20;
    break;
  case 'GemBlue':
    this.sprite = 'images/Gem Blue.png';
    this.collisionCB = function(){
      player.col.score += 10;
      player.col.item += 1;
      self.regenerate();
      player.scoreboard.set(player.col.score, player.col.item, player.scoreboard.passcore, player.times);
      player.scoreboard.render(document.querySelector('.scoreboard'));
    };
    this.failureDisp = 80;
    break;
  case 'GemGreen':
    this.sprite = 'images/Gem Green.png';
    this.collisionCB = function(){
      player.col.score += 20;
      player.col.item += 1;
      console.log(this);
      self.regenerate();
      player.scoreboard.set(player.col.score, player.col.item, player.scoreboard.passcore, player.times);
      player.scoreboard.render(document.querySelector('.scoreboard'));
    };
    this.failureDisp = 80;
    break;
  default:
    this.sprite = 'images/enemy-bug.png';
    this.collisionCB = function(){
      console.log('default collision');
    };
    this.failureDisp = 80;
  }



};
// 重生成: 描述了可以重新生成Item的函数
Enemy.prototype.regenerate = function(){
  var self = this;
  self.x = Util.rnI(50, 400);
  self.y = Util.rnI(91, 260);
  self.cat = categoryItem[Util.rnI(0,1)];
  switch (self.cat) {
  case 'GemBlue':
    this.sprite = 'images/Gem Blue.png';
    break;
  case 'GemGreen':
    this.sprite = 'images/Gem Green.png';
    break;
  }
};


// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

    // console.log(this.x, this.y, dt);
  var velocity;
    // 根据类别确定运动速度:
  switch(this.cat){
        // 普通虫子速度比较慢
  case 'bug':
    velocity = Util.rnI(100,150);
    break;
        // badbug fast!!
  case 'badbug':
    velocity = Util.rnI(220,270);
    break;
        // 其他物体静止
  default:
    velocity = 0;
  }
    // 匀速运动的怪物
  this.x += dt*velocity;
    // 如果超出屏幕范围, 随机
  if(this.x>500){
    this.x = -80;
    this.y = Util.rnI(80,200); // 重新随机到一个位置中
  }
    // 碰撞检测
  var cflag = this.checkCollision();
  if(cflag === true){
        //console.log(this.cat);
        // 执行回调函数
    this.collisionCB();
  }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// 碰撞检测
Enemy.prototype.checkCollision = function(){
//  // player初始化后开始碰撞检测
//if(player.loc!== undefined) {
//      // 计算距离。
//  var disp = Math.pow(Math.abs(this.x - player.loc.x), 2) + Math.pow(Math.abs(this.y - player.loc.y), 2);
//      // 距离小于半径则判断碰撞发生, 回调函数执行
//  if (Math.pow(disp, 0.5) < this.failureDisp) {
//          //console.log(disp);
//    // console.log('collision happened');
//    return true;
//  }
//}
//return false;
  /*代码Review: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
   * 
   * */
  // 碰撞外边框
  var enemyW = 80, enemyH = 73, enemyX = this.x, enemyY = this.y + 75,
      playerW = 99, playerH = 90, playerX = player.loc.x, playerY = player.loc.y + 51;
  if(enemyX < playerX + playerW &&
     enemyX + enemyW > playerX && 
     enemyY < playerY + playerH &&
     enemyY + enemyH > playerY) {
  	console.log('collision happened');
  	return true;

  }
  return false;

};


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [];
var NumberOfEnemies = 6, // 敌人的数量
  NumberOfItems = 2; // 道具的数量
var categoryEnemy = ['bug', 'badbug'], // 工厂模式: 类别识别
  categoryItem = ['GemBlue', 'GemGreen']; // 工厂模式: 类别识别
var enemyInstance;
for(var tt = 0; tt < NumberOfEnemies; tt+=1){
  enemyInstance = new Enemy({
    loc: {x: -20,
      y: Util.rnI(20, 200)},
    cat: categoryEnemy[Util.rnI(0,1)]
  });
  allEnemies.push(enemyInstance);
  if(tt < NumberOfItems){
    enemyInstance = new Enemy({
      loc: {x: Util.rnI(-20, 200),
        y: Util.rnI(20, 200)},
      cat: categoryItem[Util.rnI(0,1)]
    });
    allEnemies.push(enemyInstance);
  }
}






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
