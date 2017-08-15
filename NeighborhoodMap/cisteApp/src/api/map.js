/**
 * @func: return Map Object from Map Api
 * 所有的异步操作使用Promise包装
 * Created by tokei on 2017/6/14.
 */
/*global AMap*/
/*eslint no-console: 1*/

import jsonp from '../common/js/jsonp';

import ajaxGet from '../common/js/ajaxGet';

import asyncMapSearch from '../common/js/asyncMapSearch';

import { options, optionsFlickr } from './config';

import { mapComParam } from './config';


// 获取地图Api key的异步操作， 这里为了增加复杂度, 使用了jsonp
export function getMapApiKey() {

  const keyurl = 'http://eddie32.qiniudn.com/apikey.js';

  const data = Object.assign({});

  return jsonp(keyurl, data, options);

}

// 获取Flickr的api(也是jsonp格式)
export function getFlickrImg(tag) {
  // https://c1.staticflickr.com/6/5585/14672691529_a07f835c1b_z.jpg
  // /farm/server/id_secret_z.jpg
  // https://www.flickr.com/photos/46583291@N07/14672691529
  // /owner/id
  const apiFlickrKey = '0db4146b44bc7e1851841ec387e9332c';

  const data = Object.assign({
    method: 'flickr.photos.search',
    format: 'json',
    api_key: apiFlickrKey,
    tags: tag
  });

  const flickrUrl = 'https://api.flickr.com/services/rest/?';

  return jsonp(flickrUrl, data, optionsFlickr);

}

// 获取高德地图的Api 这里是Ajax格式
export function getMapObj(apikey) {
  let pluginName;
  // console.log(apikey);
  if(arguments.length>1)
    pluginName = arguments[1];

  const url = 'http://webapi.amap.com/maps';

  const data = Object.assign({},mapComParam,{
    key: apikey,
    plugin: (typeof pluginName === 'undefined')?'':pluginName
  });
  // console.log(data);
  return ajaxGet(url, data)

}

// 返回地图类的处理
export function initMapObj(inner) {
  // 此处API返回的是一个纯HTML, 不过其实是一个可执行的JS匿名函数
  // 动态插入script
  let scriptElem = document.createElement('script');
  scriptElem.innerHTML = inner.data;
  document.body.appendChild(scriptElem);
  // 添加之后就可以删除了, 有点类似jsonp。
  if (scriptElem.parentNode) scriptElem.parentNode.removeChild(scriptElem);
  // 测试是否获得了AMap类
  if (typeof AMap !== 'object'){
    alert('无法获得高德地图API地图类');
    return null;

  }
  else {
    // console.log(AMap);
    console.log('欢迎使用高德地图API');
  }

  return AMap;
}
// 异步调用搜索

export function searchPlaceDefault(searchObj, searchString){

  if (arguments[1] === 'Default') searchString = "东方明珠";

  return asyncMapSearch(searchObj, searchString);


}

