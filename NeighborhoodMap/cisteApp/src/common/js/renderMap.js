/**
 * Created by tokei on 2017/6/22.
 */
/*eslint no-console: 1*/

import mapCase from './initSearch'
import { setInfoWin } from './setInfoWindow'

export default function renderMap(elem, index)
{
  let marker;

  if (mapCase.markerAll[index] !== undefined && arguments[2] !== undefined){
    // 筛选后利用缓存数据
    // console.log('利用缓存')
    marker = mapCase.markerAll[arguments[2].indexArray[index]];
    marker.show()

  }else{
    // 初始化
    // latitude
    // console.log('重新初始化')
    let lat = elem.location.lat;
    // longitude
    let lng = elem.location.lng;
    // 初始化marker
    marker = new mapCase.AMap.Marker({
      icon: "common/image/marker.png",
      position: [lng, lat]
    });
    mapCase.markerAll.push(marker);
    marker.setMap(mapCase.newmap);
    marker.setTitle(elem.name);
  }
  // console.log(mapCase.markerAll)
  // 弹出窗口设置
  setInfoWin(marker, elem);

}

