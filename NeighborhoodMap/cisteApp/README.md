# Ciste App

地图API应用, 基于高德地图API, 使用框架KnockoutJS。

还额外使用了流行的构建工具Webpack以及ES6语法。

SAP based on map api and knockout.js. You can use this to play ciste! No sure to get a gift!

This is part of Udacity FrontEnd Nanodegree Project T3.

## 开发中的依赖 / devDependencies

- knockout: MVVM框架(项目要求)
- 高德地图API
- Flickr图片API
- Webpack and loaders
- eslint

## 运行方式 / Start

- 运行`git clone https://github.com/liu599/cisteApp.git` 
- `cd cisteApp`, 然后`npm install`安装依赖。
- 运行`npm start`进入调试模式。
- 运行`npm run lint` 代码查错
- 运行`npm run build` 生成dist下的生产代码
- 运行`npm run preview` 查看生产模式下的样子, 生产模式下的image目前有些问题, 没有解决掉。


## 开发日志 / Development Log

- 2017.06.11 New docs:
  - Write stories
  - Read Webpack2 and KnockoutJS Docs
  
- 2017.06.14 New feature: 
  - Finish Webpack2 Configuration
    - ES6 Supported
    - Dev and Production Mode
  - Finish Ajax and JSONP Encapsulation
  
- 2017.06.20 New feature:
	- Upgrade Webpack2 to Webpack3
	- Finish Map Api Function
	- Add a third api Flickr

- 2017.6.21 New feature:
	- Write KnockoutJS components
	
- 2017.6.23 New feature:
  - Mobile 
  - Production Mode

- 2017.7.2 New feature:
  - bind the click event to list
  
## Introduction

### How to Play

找到5个Flickr中有图片(图片数量不为0)的地点即可。

### What is Ciste?

The word ciste comes from the ancient Greek for a basket used to carry gifts for the Gods. It is known as a "modern-day" version of a treasure hunter.

### How to play?

You will be seeking goods, which may include some plastic key-rings, toys or small gifts from a buried box, known as a ciste. These cistes are hidden in more than 2,000 locations(just kidding) in our country. 

In order to find a "ciste", you(often called a ciste-hunter) need to log on the Ciste App, ask to be sent a riddle("enigmas") about location of a treasure box. These riddles usually involve references to local history, folklore and topography. It may take days to solve by using Internet, even visiting the library or chatting to locals to acquire the location information for the next milestone, or the final ciste.

Once the ciste is found, the hunters could remove one of the objects in the ciste, add one they have brought and write a note of thanks to the hider. Riddles are only sent when a hunter register a search for a special box.

The joy is not the presents themselves, but rather in the search itself. You could learn local culture and history, enjoy walking outdoor and find local monuments. 

## Reference

[1] [Hide and ciste](http://www.telegraph.co.uk/travel/destinations/europe/france/737729/Hide-and-ciste.html)

[2] [Geocaching](https://www.geocaching.com/play)

[3] [Terracaching](http://www.terracaching.com/)

[4] [Dartmoor](http://www.dartmoorletterboxing.org/)
 
## License

MIT

