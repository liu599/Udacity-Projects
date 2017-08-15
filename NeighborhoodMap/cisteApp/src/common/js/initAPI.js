/**
 * Created by tokei on 2017/6/30.
 */
//API类, 用于获取地图类, 初始化搜索
import { getMapApiKey,
  getMapObj}  from '../../api/map';
// 判断异步操作是否成功的常数
import { ERR_OK }  from '../../api/config';

let mapObj =
getMapApiKey()
  .then(
    (res) => {
      console.log('获取 Api 密匙中')
      if(res.code === ERR_OK){
        //console.log(res.apikey);
        console.log('获取 Api 密匙成功')
      }
      return getMapObj(res.apikey, 'AMap.PlaceSearch');
    }, (err) => {
      alert('无法获得Apikey或者Apikey已经失效');
      return
    })

export default mapObj
