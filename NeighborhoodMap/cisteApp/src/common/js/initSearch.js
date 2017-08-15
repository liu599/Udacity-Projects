/**
 * Created by tokei on 2017/6/30.
 */

import mapObj from './initAPI'
import { initMapObj,
  searchPlaceDefault }  from '../../api/map';
import { isMobile } from './judgeMobile';

let mapCase = {};
mapCase.AMap = {};
// 搜索封装
mapCase.searchFunc = function () {
  // 创建地图搜索类, Api限制只能返回20个值
  let placeSearch = new mapCase.AMap.PlaceSearch({
    pageSize: 20,
    pageIndex: 1
  });
  // 限制搜索范围为上海
  placeSearch.setCity({city:'021'});
  //return searchDetailsDefault(placeSearch, 'Default');
  // 搜索方法返回一个Promise
  if(arguments[0] === undefined){
    return searchPlaceDefault(placeSearch, 'Default');
  } else {
    return searchPlaceDefault(placeSearch, arguments[0]);
  }
};
let searchPromise =
mapObj.then(
  (res) => {
    // 获取高德的地图类
    //console.log(res);
    let AMap = initMapObj(res);
    // console.log(typeof (AMap.Map) !== 'function')
    if(typeof (AMap.Map) !== 'function'){
      alert('加载失败请刷新!')
      return null;
    }
    // 对外暴露地图类
    mapCase.AMap = AMap;
    let newmap = new AMap.Map("container",{
      resizeEnable: true,
      center: [121.499809, 31.239666],
      zoom: 16
    });
    // 对外暴露map实例
    mapCase.newmap = newmap;
    // 游戏计数器(伪)
    newmap.cistePoint = 0;
    // 地图的组件, 仅仅在非移动端加载
    if(!isMobile.any() && window.innerWidth > 980){
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
        function(){

          newmap.addControl(new AMap.ToolBar());

          newmap.addControl(new AMap.Scale());
          // 鹰眼
          // newmap.addControl(new AMap.OverView({isOpen:true}));
        });
    }
    return mapCase.searchFunc();

  }
);
// 保留一个promise供初始化
mapCase.pr = searchPromise;

export default mapCase;
