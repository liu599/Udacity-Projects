/**
 * Created by tokei on 2017/6/22.
 */

export function clearAllAnimation(markerAll){
  markerAll.forEach(function(elem){
    elem.setAnimation(''); // 清除动画效果。
  })
}

export function hideAllMarkers(markerAll){
  markerAll.forEach(function(elem){
    elem.hide(); // 清除点
  })
}
