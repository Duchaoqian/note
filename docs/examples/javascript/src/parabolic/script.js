var item = document.querySelector('.item')
// 声明变量记录小球位置
var x = 0
var y = document.body.clientHeight - item.clientHeight
// console.log( document.body.clientHeight);
// 设置小球每次移动的步数
var speedX = 5
var speedY = -30
var a = 1
function move() {
  speedY += a
  if (y > document.body.clientHeight - item.clientHeight) {
    if (speedY > 30) {
      speedY = 30
    }
    speedY = -speedY
  }
  if (x > document.body.clientWidth - item.clientWidth) {
    speedX = -speedX
  }
  if (x < 0) {
    speedX = -speedX
  }
  x += speedX
  y += speedY
  item.style.top = y + 'px'
  item.style.left = x + 'px'
}
setInterval(move, 10)
move()
