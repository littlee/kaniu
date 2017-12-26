$(function() {
  function addAni() {
    $('.swiper-slide-active')
      .find('[data-anim]')
      .each(function() {
        var $this = $(this)
        $this.removeClass('hidden').addClass($this.data('anim'))
      })
  }

  function removeAni() {
    $('[data-anim]').each(function() {
      var $this = $(this)
      $this.removeClass($this.data('anim')).addClass('hidden')
    })
  }

  $('body').on('click', '.music-icon', function() {
    $(this).toggleClass('animated')
    if ($(this).hasClass('animated')) {
      document.getElementById('bg-music').play()
    } else {
      document.getElementById('bg-music').pause()
    }
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
    url: '/api/getJsSdkInfo',
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

  if (typeof WeixinJSBridge != 'undefined') {
    WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
      document.getElementById('bg-music-audio').play()
    })
  }

  var assets = [
    './images/arrow_down.png',
    './images/btn_share.png',
    './images/btn_take.png',
    './images/music_icon.png',
    './images/p1.png',
    './images/p1_cube_1.png',
    './images/p1_planet_1.png',
    './images/p1_planet_2.png',
    './images/p1_title.png',
    './images/p2.png',
    './images/p2_icon_bj.png',
    './images/p2_icon_cd.png',
    './images/p2_icon_cq.png',
    './images/p2_icon_gz.png',
    './images/p2_icon_qz.png',
    './images/p2_icon_sh.png',
    './images/p2_icon_sz.png',
    './images/p2_map.png',
    './images/p2_text.png',
    './images/p3.png',
    './images/p3_data_1.png',
    './images/p3_data_2.png',
    './images/p3_data_3.png',
    './images/p3_text.png',
    './images/p4.png',
    './images/p4_clock.png',
    './images/p4_line.png',
    './images/p4_table.png',
    './images/p4_text.png',
    './images/p5.png',
    './images/p5_credit.png',
    './images/p5_pillar.png',
    './images/p5_text.png',
    './images/p6.png',
    './images/p7.png',
    './images/p7_crown.png',
    './images/p7_rank.png',
    './images/p7_text.png',
    './images/p8.png',
    './images/share_tip.png'
  ]

  function loadImg() {
    if (assets.length) {
      var img = new Image()
      img.onload = () => {
        setTimeout(
          loadImg,
          30 // 100ms delay
        )
      }
      img.src = assets.shift()
    } else {
      $('.wrap').load('./content.html', function() {
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
      })
    }
  }

  loadImg()
})
