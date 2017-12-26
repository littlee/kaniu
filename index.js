$(function() {
  function addAni() {
    $('.swiper-slide-active')
      .find('[data-anim]')
      .each(function() {
        var $this = $(this)
        console.log($this.data('anim'))
        $this.removeClass('hidden').addClass($this.data('anim'))
      })
  }

  function removeAni() {
    $('[data-anim]').each(function() {
      var $this = $(this)
      $this.removeClass($this.data('anim')).addClass('hidden')
    })
  }

  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    on: {
      init: swiper => {
        addAni()
      },
      slideChangeTransitionStart: swiper => {
        removeAni()
      },
      slideChangeTransitionEnd: swiper => {
        addAni()
      }
    }
  })

  $('body').on('click', '.music-icon', function() {
    $(this).toggleClass('animated')
  })

  $('body').on('click', '.p8-share', function() {
    $('.share-mask').removeClass('hide')
  })

  $('body').on('click', '.share-mask', function() {
    $(this).addClass('hide')
  })

  $('body').on('click', '.p8-take', function() {
    window.location =
      'https://credit.cardniu.com/creditcard/?channel=weixin&source=3&p_nav=20171226'
  })

  $.ajax({
    url: 'http://php.uclee.com/api/getJsSdkInfo',
    type: 'POST',
    data: JSON.stringify({
      url: window.location.href
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data) {
      wx.config({
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      })

      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: '2017信用卡的那些事',
          link: window.location.href,
          imgUrl: window.location.origin + '/share.png',
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        })

        wx.onMenuShareAppMessage({
          title: '2017信用卡的那些事',
          desc: '这可能是信用卡圈最“神”的总结',
          link: window.location.href,
          imgUrl: window.location.origin + '/share.png',
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        })
      })
    }
  })
})
