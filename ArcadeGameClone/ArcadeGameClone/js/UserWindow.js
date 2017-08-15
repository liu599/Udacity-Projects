/**
 * @desp  处理游戏运行前后的界面
 * Created by tokei on 2017/5/24.
 */

 /*global Resources:true*/
(function(document, window){

  var userWin = function(){
    var self = this;
    this.choice = 0;
    this.obj = document.createElement('div');
    this.obj.className = 'optWin';
    this.obj.style.cssText = 'text-align: center';
    // 点击后的回调函数
    this.cb = function(){};
    this.userFigures = ['images/char-boy.png',
      'images/char-cat-girl.png',
      'images/char-horn-girl.png',
      'images/char-pink-girl.png',
      'images/char-princess-girl.png'];

    this.loadPics = function(){

	    	self.userFigures.forEach(function(elem, index){
			  if(index==0){
    self.obj.innerHTML += '<input type="radio" class="figure-select" data-index="'+index+'" checked="checked">';
			  }else{
    self.obj.innerHTML += '<input type="radio" class="figure-select" data-index="'+index+'">';
			  }
	            self.obj.appendChild(Resources.get(elem));
	        });
      self.obj.innerHTML = '<div>角色选择: 请选择自己喜欢的角色, 点击OK开始游戏</div>' + self.obj.innerHTML;
	    	self.obj.innerHTML += '<a href="#" class="btn" style="display: block; text-align:center; color: #444; line-height: 2;  cursor: pointer">我选好了/Ok!</a>';
	        	// 界面选择单选
	  self.obj.querySelectorAll('.figure-select').forEach(function(elem,index){
	            elem.onclick = function (ev) {
	                //console.log(ev.target.checked);
	                ev.target.parentNode.querySelectorAll('.figure-select').forEach(function(elem){
	                    elem.checked = false;
	                });
	                ev.target.checked = true;
	                self.choice = ev.target.dataset.index;
	            };
	        });
	        self.obj.querySelector('.btn').onclick = self.cb;

    };
    Resources.load(self.userFigures);
    Resources.onReady(self.loadPics);
    return this;
  };

  userWin.prototype = {
    constructor: userWin,
    show: function () {
      this.obj.style.display = 'block';
    },
    hide: function () {
      this.obj.style.display = 'none';
    }
  };


  window.UsrWindow = userWin;

}(document, window));