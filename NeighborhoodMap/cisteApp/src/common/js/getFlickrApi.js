/**
 * Created by tokei on 2017/7/2.
 */
import mapCase from './initSearch'
// 调用Flickr API获得图片的数量
import { getFlickrImg } from '../../api/map';
// 两个常量, 判断游戏结束和FlickrAPI是否正常工作
import { STATUS_OK, CISTE_WAY }  from '../../api/config';
export function getFlickrApi(elem, infoWindow) {
  getFlickrImg(elem.name).then(
    (res) => {

      //         console.log(res);
      if(res.stat === STATUS_OK){
        console.log('成功连接Flickr API');
        if(res.photos.pages === 0){
          infoWindow.setContent(['<div>',elem.name,
            '<br><a href="https://www.flickr.com/" target="_blank">Flickr </a>上没有该地点的图片。<br><span style="color:red;font-weight:700">', elem.address,'</span></div>'].join(''));
        }else{
          mapCase.newmap.cistePoint += 1;
          infoWindow.setContent(
            `<div>${elem.name}<br><a href="https://www.flickr.com/search/?text=${encodeURIComponent(elem.name)}" target="_blank">Flickr </a>在该地点有${res.photos.total}张图片<br><span style="color:red;font-weight:700">${elem.address}</span></div>`);
        }
      }
      if(mapCase.newmap.cistePoint === CISTE_WAY){
        alert('You have found a treasure');
        mapCase.newmap.cistePoint = 0;
      }

    },
    (err) => {
      infoWindow.setContent(
        `<div>${elem.name}<br><a href="https://www.flickr.com/search/?text=${encodeURIComponent(elem.name)}" target="_blank">Flickr </a>Flicker Api 由于网络原因无法使用<br><span style="color:red;font-weight:700">${elem.address}</span></div>`);
      throw(err);
    }
  );
}
