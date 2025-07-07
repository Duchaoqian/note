// for (let i = 0; i < 42; i++) {
//   var liObj = document.createElement("li");
//   $(liObj).text(i);
//   $(".date").append(liObj);
// }
var date = new Date()
var y = date.getFullYear()
var m = date.getMonth()
function createDate(year, month, nowDete) {
  // 创建日历的函数
  // 根据下个月一号的时间戳 减去 24小时 得到本月最后一天的时间戳 转化为时间对象 就可以获取到最后一天是几号
  $('.date').html('')
  var now = new Date(year, month, 1)
  var nowDay = now.getDay() // 获取当前月 一号星期几
  var prevDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).getDate()
  var nextY = month + 1 > 11 ? year + 1 : year
  var nextM = month + 1 > 11 ? 0 : month + 1
  var nowNextDate = new Date(+new Date(nextY, nextM, 1) - 24 * 60 * 60 * 1000).getDate()
  // var datetime = 1;
  for (let i = 0; i < 42; i++) {
    var liObj = document.createElement('li')
    if (i < nowDay) {
      // 写的是上个月
      $(liObj)
        .text(prevDate - i)
        .css('color', '#e0e0e0')
      $('.date').prepend(liObj)
    } else if (i < nowNextDate + nowDay) {
      // 写本月
      if (
        nowDete.getFullYear() == year &&
        nowDete.getMonth() == month &&
        nowDete.getDate() == i - nowDay + 1
      ) {
        $(liObj)
          .text(i - nowDay + 1)
          .css('color', 'red')
      } else {
        $(liObj).text(i - nowDay + 1)
      }

      $('.date').append(liObj)
    } else {
      //写下个月的
      $(liObj)
        .text(i - nowNextDate - nowDay + 1)
        .css('color', '#e0e0e0')
      $('.date').append(liObj)
    }
  }
}

// 在页面加载完成执行函数
// $(window).ready(function () {
//   console.log("页面加载完成了");
// });

// 在页面加载完成执行函数 简写方法
$(function () {
  createDate(y, m, date)
  $('nav > span').text(`${y}年${m + 1}月`)
  $('.btn-year-left').click(function () {
    y--
    createDate(y, m, date)
    $('nav > span').text(`${y}年${m + 1}月`)
  })
  $('.btn-year-right').click(function () {
    y++
    createDate(y, m, date)
    $('nav > span').text(`${y}年${m + 1}月`)
  })
  $('.btn-month-left').click(function () {
    m--
    y = m < 0 ? y - 1 : y
    m = m < 0 ? 11 : m
    createDate(y, m, date)
    $('nav > span').text(`${y}年${m + 1}月`)
  })
  $('.btn-month-right').click(function () {
    m++
    y = m > 11 ? y + 1 : y
    m = m > 11 ? 0 : m
    createDate(y, m, date)
    $('nav > span').text(`${y}年${m + 1}月`)
  })
})
