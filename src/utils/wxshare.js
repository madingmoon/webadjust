//后台加密算法接口,传入当前页url给后台,后台返回加密签名等
// import { gethlSignature } from '@/api/index' 引入分享方法，是项目而定
import wx from 'weixin-jsapi'

let browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

export const wxshare = {
  install: (Vue, msg) => {
    Vue.prototype.$wxshare = (msg) => {
      let isShareStr = window.location.href.split('#')[0]
      let isShare
      if(isShareStr.indexOf('?')>0){
        isShare = isShareStr.split('?')[0]
      }else{
        isShare = isShareStr
      }
      let isPageStr = window.location.href.split('#')[1]
      let href = isShare + '#/?' + isPageStr.split('?')[1]
      let formDate = {
        // url: 'https://micstage.arcdmi.com'//location.href.split('#')[0]
        url: href
      }
      if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          gethlSignature(formDate).then((response) => {
              // 通过config接口注入权限验证配置
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
                // 参数信息会通过log打出，仅在pc端时才会打印。
                appId: response.appId, // 必填，公众号的唯一标识
                timestamp: response.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.nonceStr, // 必填，生成签名的随机串
                signature: response.signature, // 必填，签名，见附录1
                jsApiList: [
                  // 'checkJsApi',// 判断当前版本是否支持分享指定JS接口
                  'onMenuShareTimeline', // 分享到朋友圈
                  'onMenuShareAppMessage', // 分享到微信好友
                  'onMenuShareQQ', // 分享到QQ
                  'onMenuShareWeibo', // 分享到微博
                  'onMenuShareQZone'// 分享到空间
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              })
              /*eslint-disable */
              let share_config = {
                'share': {
                  'imgUrl': msg.imgUrl, // 分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
                  'desc': msg.desc, // 摘要,如果分享到朋友圈的话，不显示摘要。
                  'title': msg.title, // 分享卡片标题
                  'link': msg.link, // 分享出去后的链接，这里可以将链接设置为另一个页面。
                  'success': function () { // 分享成功后的回调函数
                  },
                  'cancel': function () {
                    // 用户取消分享后执行的回调函数
                  }
                }
              }
              // 点击修改要分享的内容
              wx.ready(function () {
                wx.onMenuShareAppMessage(share_config.share) // 分享给好友
                wx.onMenuShareTimeline(share_config.share) // 分享到朋友圈
                wx.onMenuShareQQ(share_config.share) // 分享到QQ
                wx.onMenuShareWeibo(share_config.share) // 分享到腾讯微博
                wx.onMenuShareQZone(share_config.share) // 分享到空间
              })

              wx.error(function (res) {
                // alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
              })
          }).catch((rej) => {
            console.log(rej)
          })
        }
      }else{
        return
      }
    }
  }
}
