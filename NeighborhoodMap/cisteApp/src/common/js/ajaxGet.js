/**
 * Ajax Get
 * Created by tokei on 2017/6/14.
 */
// 这里包装了Ajax的get方法
import axios from 'axios';
import param from './util';

export default function ajaxGet(url, data){

  url += (url.indexOf('?') < 0 ? '?' : '&') +
    param(data);
  // 检查字符串拼接是否有误！
  // console.log(url);
  return axios.get(url)

}
