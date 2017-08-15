/**
 * Jsonp to promise
 * 自己使用Promise封装的jsonp方法
 * Created by tokei on 2017/6/14.
 */
import OriginalJSONP from './originalJSONP';
import param from './util';

export default function jsonp(url, data, opt){

  url += (url.indexOf('?') < 0 ? '?' : '&') +
          param(data);

  return new Promise((resolve, reject) => {
    OriginalJSONP(url, opt, (err, data) => {
      if(!err){
        resolve(data);
      }else{
        reject(err);
      }
    })
  });

}


