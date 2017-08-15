/**
 * Created by tokei on 2017/6/23.
 */
// 筛选方法
export function filterArray(ary, propx, cond){
  // console.log(mapCase.markerAll[0].Ri.contentDom.title)
  let F = Object.assign({
    item: [],
    indexArray: []
  });

  ary.forEach(function(elem, index){

    if(elem[propx] && elem[propx].indexOf(cond)!==-1){
      F.item.push(elem);
      F.indexArray.push(index);
    }

  });
  console.log(F)
  return F;
}
