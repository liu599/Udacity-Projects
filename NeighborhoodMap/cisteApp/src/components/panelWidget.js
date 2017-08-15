//components
import './placeList';
import renderMap from '../common/js/renderMap';
import { filterArray } from '../common/js/filterArray';
import { hideAllMarkers } from '../common/js/clearMarker';
// 判断是否为手机端
import { isMobile } from '../common/js/judgeMobile';
import mapCase from '../common/js/initSearch'
import { DEFAULT_SEARCH } from '../api/config';
//https://stackoverflow.com/questions/11561756/knockout-how-do-i-toggle-visibility-of-multiple-divs-on-button-click
/*eslint no-console: 1*/
/*global AMap*/

let PanelWidget = {
  init: function(data, markerAll){
    let ko = require('knockout');
    ko.components.register('panel-widget', {
      viewModel: function(params) {
        // 通过观察, 得知需要一个content属性
        // console.log(params);
        // 处理数据, 增加一个markPos属性为索引值
        // placeList引用为mp
        params.content = data;
        params.content.forEach((elem,index) => {
          elem.markPos = index;
        });
        //console.log(params.content)
        let self = this;
        this.places = ko.observableArray(params.content);
        this.isVisible = ko.observable('');
        let winWidth = document.documentElement.clientWidth;
        // 响应式: 监听Resize事件
        window.addEventListener('resize', function(){
          winWidth = window.innerWidth;
          if(!isMobile.any() && winWidth > 980){
            //console.log(isMobile.any());
            self.isVisible(true);
          }else{
            self.isVisible(false);
          }
        });
        if(!isMobile.any() && winWidth > 980){
          self.isVisible(true);
        }
        // TODO: 监听queryPlace，使用Subscribe得到动态筛选 Oninput效果
        // console.log(DEFAULT_SEARCH)
        this.queryPlace = ko.observable(DEFAULT_SEARCH);
        this.applyFilter = function(){
          // 清除INFO WINDOW
          let infoWindow = new mapCase.AMap.InfoWindow({
            offset: new mapCase.AMap.Pixel(0, -20)
          });
          infoWindow.open(mapCase.newmap,[11,15])
          infoWindow.close()
          // 执行筛选
          let rc = filterArray(params.content, 'name', self.queryPlace());
          if(rc.item.length > 0){
            // 清空dom数组
            params.content.splice(0,params.content.length);
            hideAllMarkers(markerAll);
            // forEach这里无法使用箭头函数, 因为箭头函数词法上绑定了this值
            rc.item.forEach(function(elem, index) {
              let _this = rc;
              self.places.push(elem);
              renderMap(elem, index, _this);
            }, rc);
            console.log(mapCase.markerAll)
            for(let i=0; i<mapCase.markerAll.length; i+=1){
              if (rc.indexArray.indexOf(i) === -1){
                mapCase.markerAll[i] = ''
              }
            }
            for(let i=0; i<mapCase.markerAll.length; i+=1){
              if (mapCase.markerAll[i].length === 0){
                mapCase.markerAll.splice(i, 1);
                i -= 1;
              }
            }
            console.log(mapCase.markerAll)

          }
          else{
            //TODO: 搜索
            console.log('不符合当前列表')
          }
          //console.log(this.queryPlace);
        }.bind(this);
        this.queryPlace.subscribe(self.applyFilter)
        this.togglevs = function(){
          self.isVisible(!self.isVisible());
        }
      },
      // 父容器.value => name
      // foreach: root.places
      template:
        `<a href="#" id="show_btn" data-bind="click: togglevs;">
          <i class="icon-menu"></i> 
        </a>
         <div id="panel" data-bind="visible: isVisible" style="display: none;">
         <input class="search"
         name="search"
         placeholder="查询地点"
         value="东方明珠"
         data-bind="textInput: queryPlace"/>
         <a class="button" 
        href="#"
        data-bind="click: applyFilter, clickBubble: false">
        <i class="icon-filter"></i>
        </a>
        <ul class="search-place-list" data-bind="foreach: places">
          <place-list params="value: name, index: $index, mp: markPos"></place-list>
        </ul>
        </div>`
    });
    //console.log(data);
    let vm = {
      "tag": "CisteApp",
      "places": data
    };
    ko.applyBindings(vm);
  }
};


export default PanelWidget;
