/**
 * Created by tokei on 2017/6/30.
 */

import mapCase from './initSearch'

//components
import PanelWidget from '../../components/panelWidget';
// 渲染类: 使用KnockoutJS来渲染搜索框
import renderMap from '../../common/js/renderMap';

let InitMap = function () {
  mapCase.markerAll = [];
  mapCase.pr.then(
    (res) => {
      PanelWidget.init(res.poiList.pois, mapCase.markerAll);
      res.poiList.pois.forEach(renderMap);
      delete mapCase.pr
      // console.log(mapCase);
    }
  ).catch(function (e) {
    alert(e);
    return null;
  })
}

export default InitMap
