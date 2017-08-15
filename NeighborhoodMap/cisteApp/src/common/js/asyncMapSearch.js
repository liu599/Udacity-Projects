// 异步获取查询结果
export default function asyncMapSearch(searchObj, searchString){

  return new Promise((resolve, reject) => {
    searchObj.search(searchString, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        resolve(result);
      }else{
        reject(result);
      }
    });
  })
}
