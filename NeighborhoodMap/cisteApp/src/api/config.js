/**
 * Base Config
 * Created by tokei on 2017/6/14.
 */
// 常量, 判断jsonp是否取到API KEY
export const ERR_OK = 0;
// 常量, 判断FLICKR是否取到API
export const STATUS_OK ='ok';
// 常量, 判断是否找对路径
export const CISTE_WAY = 5;
// JSONP 连接 API KEY的设置
// 回调函数名以及等待时间
export const options = {
  param: 'niconiconi',
  name: 'niconiconi',
  timeout: 5000
};
// JSONP 连接 Flickr的设置
export const optionsFlickr = {
  param: 'jsonFlickrApi',
  name: 'jsonFlickrApi',
  timeout: 5000
};
// AJAX 高德地图的版本常量
export const mapComParam = {
  v: '1.3'
};
export const DEFAULT_SEARCH = '东方明珠';
