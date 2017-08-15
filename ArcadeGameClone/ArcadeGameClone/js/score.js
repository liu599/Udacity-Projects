/**
 * 计分板
 * Created by tokei on 2017/5/25.
 */
(function(document, window){
  var scoreboard = function(){
    this.cb = function(){};
    this.spt = 0; // point
    this.item = 0; // item
    this.passcore = 100; // 通关分数
    this.inc = 100; // increment
    this.passtime = 0; // 通关次数
    return this;
  };

  scoreboard.prototype = {
    init: function(){
      var container = document.createElement('div');
      container.className = 'scoreboard';
      this.render(container);
      this.obj = container;
    },
    set: function (spt, item, passcore, passtime) {
      this.spt = spt;
      this.item = item;
      this.passcore = passcore;
      this.passtime = passtime;
    },
    render: function(container){
      container.innerHTML = '<nav class="score">【当前分数(Points)】: <span class="nav-score" style="color: red; font-weight: 700">'+this.spt+'</span>  【道具收集(collection)】: <span class="nav-item" style="color: deeppink; font-weight: 700; background:  #fcf">'+this.item+'</span></nav>';
      container.innerHTML += '<div class="pass-score">【通关最低分数(PassScore)】 : <span class="nav-score" style="color: red; font-weight: 700; font-size: 20px">' + this.passcore + '</span><span>【通关次数】:</span><span style="color:lime;font-weight: 700; font-size: 20px"> '+this.passtime+'/4</span></div><div class="notice"></div>';
    },
    show: function(){
      this.obj.style.display = 'block';
    },
    hide: function(){
      this.obj.style.display = 'none';
    }


  };



  window.Scoreboard = scoreboard;

}(document, window));