var div = document.getElementById('div')
var img = document.getElementById('img')
var arr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
img.src = './banner/' + arr[0]
var count = 0
next.onclick = function () {
  count++
  if (count > arr.length - 1) {
    count = 0
  }
  for (var i = 0; i < arr.length; i++) {
    if (i == count) {
      point[count].style.background = 'blue'
    } else {
      point[i].style.background = 'darkgray'
    }
  }

  img.src = './banner/' + arr[count]
}
last.onclick = function () {
  count--
  if (count < 0) {
    count = arr.length - 1
  }
  for (var i = 0; i < arr.length; i++) {
    if (i == count) {
      point[count].style.background = 'blue'
    } else {
      point[i].style.background = 'darkgray'
    }
  }
  img.src = './banner/' + arr[count]
}
var div2 = document.getElementById('div2')
for (var j = 0; j < arr.length; j++) {
  div2.innerHTML += "<div class='point' id='point" + j + "'></div>"
  var point2 = document.getElementsByClassName('point')
}
var point = document.getElementsByClassName('point')
point[0].style.background = 'blue'
