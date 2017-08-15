/**
 * 判断是否为移动端的方法
 * Created by tokei on 2017/6/23.
 */
export const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};


