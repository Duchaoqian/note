for (var i = 0; i < 60; i++) {
  var soption = document.createElement('option')
  var moption = document.createElement('option')
  $(moption).text(i < 10 ? '0' + i : i)
  $(soption).text(i < 10 ? '0' + i : i)
  $('#month').append(moption)
  $('#second').append(soption)
}
var arr = [
  [0, 1, 2, 3, 4, 5],
  [1, 2],
  [0, 1, 6, 4, 3],
  [0, 1, 6, 2, 3],
  [5, 6, 1, 2],
  [0, 5, 6, 2, 3],
  [0, 5, 4, 3, 2, 6],
  [0, 1, 2],
  [0, 1, 6, 4, 3, 2, 5],
  [0, 5, 6, 1, 2, 3]
]
function createNum(select, num, oldnum) {
  var num1 = Math.floor(num / 10)
  var num2 = num % 10
  var oldNum1 = Math.floor(oldnum / 10)
  var oldNum2 = oldnum % 10
  var $liArr1 = $(select).children().eq(0).children()
  var $liArr2 = $(select).children().eq(1).children()
  // $.each(arr[num1], function (index, item) {
  // console.log(index, item);
  function fun(liArr, obj, index) {
    liArr.eq(arr[obj][index]).animate({ opacity: '1' }, 20, function () {
      if (index + 1 <= arr[obj].length - 1) fun(liArr, obj, index + 1)
    })
  }
  if (num1 != oldNum1) {
    $liArr1.css({ opacity: '0.1' })
    fun($liArr1, num1, 0)
  }
  if (num2 != oldNum2) {
    $liArr2.css({ opacity: '0.1' })
    fun($liArr2, num2, 0)
  }
}
var timer
$('.btn').click(function (e) {
  var month = $('#month').val()
  var second = $('#second').val()
  $('.item').css('opacity', '1')
  // console.log(month, second);
  clearInterval(timer)
  timer = setInterval(() => {
    var oldsecond = second
    var oldmonth = month
    second--
    if (second < 0) {
      if (month == 0) {
        second = 0
        alert('倒计时结束了')
        clearInterval(timer)
        $('select').val('00')
        $('li').css('opacity', '0.1')
        $('.item').css('opacity', '0.1')
      } else {
        second = 59
      }
      month--
      month = month < 0 ? 0 : month
    }
    createNum('.month', month, oldmonth)
    createNum('.second', second, oldsecond)
  }, 1000)
  createNum('.month', month * 1)
  createNum('.second', second * 1)
})
$('.reset').click(function (e) {
  clearInterval(timer)
  $('select').val('00')
  $('li').css('opacity', '0.1')
  $('.item').css('opacity', '0.1')
})
