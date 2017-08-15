# 经典街机游戏克隆

这是一个使用面向对象的Javascript以及HTML5 canvas实现的一个经典的"青蛙过河"游戏。

操作人类同学躲避讨厌的虫子, 收集足够多的财富到达河边。

Udacity - 纳米学位前端进阶项目I

## 技术栈

- JavaScript
- HTML5(canvas)

## 安装/Installation

`git clone https://github.com/liu599/Udacity-T1.git` 

解压, 双击文件夹下的`index.html`在浏览器中打开即可开始游戏。

## 使用手册/Usage

1. 选择一个喜欢的角色, 点击OK按钮。
2. 使用方向键操作角色, 躲避虫子并收集宝石。碰到虫子财富值会锐减同时角色回到原位。
3. 达到最低的通关财富就可以达到河岸通关了, 财富值不够即使达到河边也无法取得clear。
4. 通关后所需的财富值会上升, 通关三次即可获得游戏的胜利。

## 开发日志/Log

1. `2017.05.23` 项目开始, 编写简要的开发文档。

2. `2017.05.24` 主要弄清楚以下问题:

    - Engine.js是如何工作的。(递归调用main函数反复刷新帧)
    - Resources.js中加载图片含有缓存层, 需要先在app中初始化。
    - 列出需求/TODOS

3. `2017.05.25~2017.5.26` 实现功能

    - 加入选择角色和结束游戏功能
    - 实现碰撞检测
    - 实现计分板

4. `2017.05.27` 实现功能

    - 完善README
    - 代码格式化检测


## 开发进度/Procedure

### 游戏基本功能需求
1. 创造世界/在引擎加载前加入启动功能  -  完成100%
2. 添加多个敌人/随机敌人位置  -  完成100%
3. 敌人可以自发从左向右侧运动/不同的速度  -  完成100%
4. 玩家可以控制自己的角色  -  完成100%
5. 玩家角色只能在幕布范围内运动 -  完成100%
6. 到达水中结束游戏的机能  -  完成100%
7. 碰撞检测, 碰撞后结束游戏的机能  -  完成100%

### 附加机能
1. 玩家角色可以选择  -  完成100%
2. 计分功能
    - 随机出现任务道具  -  完成100%
    - 吃掉任务道具积分  -  完成100%
    - 指定积分过河触发游戏结束  -  完成100%

### 数据结构

//TODOS: 这里还是用了工厂模式, 应该改为原型继承模式
1. 敌人/道具类Enemy
    - 属性
        - isCollided: false 是否被碰撞
        - cat: 判断敌人的类别(虫子bug、速度很快的虫子badbug、蓝宝石GemBlue、绿宝石GemGreen)
        - failureDisp: 判断相撞的距离。
    - 方法
        - collisionCB: 碰撞后的回调函数
        - prototype.regenerate: 重新生成
        - prototype.render: 渲染
        - prototype.update: 运动
        - prototype.checkCollision: 碰撞检测

2. 玩家类player
    - 位置属性loc: {x:xloc,y:yloc}
    - 人物界面属性 sprite: spriteUrl 图像地址
    - 积分道具属性
      - score: {获得的积分pt, 吃掉的道具数量item}
    - 脱出属性 jumpflag 为true时游戏结束。
    - 积分属性 scoreboard 是玩家类的一个子组件
    - 方法
        - 构造函数
        - init 初始化函数
        - update 更新
        - render 渲染
        - handleInput 键盘响应
        - change 修改角色的外观

3. 工具方法util.rnI(n,m): 生成n~m范围内的随机整数
4. 计分板
     - cb 预留的回调函数
     - spt 道具分数
     - item 道具数量
     - passcore 通关分数
     - passtime 通关次数
     - inc 通关后下一关所需分数的增量
     - 方法
       - init 初始界面
       - set 设定该界面的属性值
       - render 渲染该界面的html
       - show 显示界面
       - hide 隐藏界面
  5. 角色选择界面
      - loadPics方法: 生成界面
      - show方法: 显示界面
      - hide 隐藏界面

## 发布信息/License

项目开发人: eddie32

本项目遵循 [MIT](https://github.com/liu599/Udacity-T1/blob/master/LICENSE) 版权协定。
