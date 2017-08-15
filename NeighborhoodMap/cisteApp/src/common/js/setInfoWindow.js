/**
 * Created by tokei on 2017/7/1.
 */
import mapCase from './initSearch'
// 渲染地点元素
// 清除所有Marker的动态效果
import { clearAllAnimation } from './clearMarker';
import { getFlickrApi } from './getFlickrApi'
export function setInfoWin(marker, elem) {
  // 初始化信息窗体
  // 定义信息窗体
  let infoWindow = new mapCase.AMap.InfoWindow({
    offset: new AMap.Pixel(0, -5)
  });
  //鼠标点击marker弹出自定义的信息窗体
  mapCase.AMap.event.addListener(marker, 'click', function(e) {
    infoWindow.setContent(['<div>',elem.name,
      '<br><span style="color:red;font-weight:700">', elem.address,'</span></div>'].join(''));
    infoWindow.open(mapCase.newmap, [e.lnglat.lng, e.lnglat.lat]);
    // 清除所有标签的动画效果
    clearAllAnimation(mapCase.markerAll);
    // 添加点击标签的动画效果
    this.setAnimation('AMAP_ANIMATION_BOUNCE');
    mapCase.newmap.setFitView(marker);
    //console.log(elem.name);
    // https://c1.staticflickr.com/6/5585/14672691529_a07f835c1b_z.jpg
    // /farm/server/id_secret_z.jpg
    // 调用FlickrAPI的异步操作
    getFlickrApi(elem, infoWindow);

  });
}
