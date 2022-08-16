// 设置移动速度初始值
var speedX = 8
var speedY = 8
var x = 0
var y = 0
var clr = 0
// 获取浏览器窗口的宽高
var w = $(window).width()
var h = $(window).height()
var pagex = 0

$(window).resize(function () {
  w = $(window).width()
  h = $(window).height()
})
$(".ball").html("")
setInterval(function () {
  clr++
  clr = clr > 360 ? 0 : clr
  if (x + 50 > w || x < 0) {
    speedX *= -1
  }
  if (y + 50 > h || y < 0) {
    speedY *= -1
  }
  if (y + 50 > h - 62 && x > pagex && x < pagex + 200) {
    speedY *= -1
    $('.slipper')
      .css({
        border: `1px solid hsla(${clr}, 80%, 80% ,1)`,
        color: `hsla(${clr}, 80%, 80% ,1)`
      })
      .addClass('slipperAni')
    $('.slipper').on('animationend', function () {
      $(this).removeClass('slipperAni')
    })
  }
  var div = document.createElement('div')
  $(div).css({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: `1px solid hsla(${clr}, 80%, 80%, 1)`,
    backgroundColor: `hsla(${clr}, 80%, 80%, 1)`,
    position: 'fixed',
    top: (y += speedY) + 'px',
    left: (x += speedX) + 'px'
  })
  $(div).addClass('ballAni')
  setTimeout(function () {
    $(div).remove()
  }, 1000)
  $('.ball').append(div)
}, 20)
$(window).mousemove(function (e) {
  // console.log(e.pageX, e.pageY);
  // var pagex = e.pageX - 100 > w ? w - 100 : e.pageX - 50;
  pagex = e.pageX - 100
  if (e.pageX + 100 > w) {
    pagex = w - 200
  } else if (e.pageX - 100 < 0) {
    pagex = 0
  }
  $('.slipper').css({ left: pagex + 'px' })
})
