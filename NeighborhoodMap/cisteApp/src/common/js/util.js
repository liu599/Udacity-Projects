/**
 * util 工具类
 * 拼合字符串
 * Created by tokei on 2017/6/14.
 */


function param(data){
  let url='';
  for(let k in data){
    let value = data[k]!== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}

export default param;
