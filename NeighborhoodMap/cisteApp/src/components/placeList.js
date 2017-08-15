let ko = require('knockout');
import { clearAllAnimation } from '../common/js/clearMarker';
import mapCase from '../common/js/initSearch'

ko.components.register('place-list', {
  // 父容器.value => name
  viewModel: function(params) {
    //console.log(params.mp)
    this.getindex = params.index; // 获取第几个Marker
    this.name = params.value;
    this.dataShow = function ()  {
      // console.log(mapCase.markerAll)
      // let dataIndex = this.getindex();
      //let thisMarker = mapCase.markerAll[params.mp];
      let thisMarker = mapCase.markerAll[this.getindex()];
      clearAllAnimation(mapCase.markerAll);
      thisMarker.setAnimation('AMAP_ANIMATION_BOUNCE');

      let infoWindow = new mapCase.AMap.InfoWindow({
        offset: new mapCase.AMap.Pixel(0, -20)
      });
      infoWindow.setContent(['<div>',thisMarker.Ri.contentDom.title,'</div>'].join(''));
      infoWindow.open(mapCase.newmap, [thisMarker.G.position.lng, thisMarker.G.position.lat]);

    }
  },

  template:
    `<li class="place" data-bind="click: dataShow">
        <span class="place-title" data-bind="text: name"></span>
    </li>`
});
