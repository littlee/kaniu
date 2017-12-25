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
    window.location = 'https://credit.cardniu.com/creditcard/?channel=weixin&source=3&p_nav=20171226'
  })

  // $.post('http://php.uclee.com/api/getJsSdkInfo', {
  //   url: window.location.href
  // }, function(data) {

  // }, 'json')
})
