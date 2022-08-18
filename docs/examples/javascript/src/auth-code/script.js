var c = document.querySelector('#mycanvas')
var ctx = c.getContext('2d')
var w = c.clientWidth
var y = c.clientHeight
// 生成一个有范围的随机数
function ranbNum(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}
// 生成有范围的颜色
function ranbColor(min, max) {
  var r = ranbNum(min, max)
  var g = ranbNum(min, max)
  var b = ranbNum(min, max)
  return `rgb(${r},${g},${b})`
}
// 矩形绘制 填充颜色
function draw() {
  console.log(w, y)
  ctx.fillStyle = ranbColor(170, 250) //这里背景色的取值范围为[170,250],颜色比较适中
  ctx.fillRect(0, 0, w, y) //绘制矩形
}
function printText() {
  var data = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
  var text = ''
  for (var i = 0; i < 4; i++) {
    //循环四次,取四个字
    var c = data[ranbNum(0, data.length - 1)] //index为随机数,[0,data.length-1]  取字(随机)
    ctx.fillStyle = ranbColor(60, 160) //字体颜色
    ctx.font = ranbNum(25, 40) + 'px SimHei' //字体大小,字体
    ctx.fillText(c, (i * w) / 4 + ranbNum(5, 12), ranbNum(25, 50)) //字体填充(字内容,x轴,y轴)位置都是随机
    text += c
  }
  console.log(text)
}
// 干扰线
function linePath() {
  for (var i = 0; i < 20; i++) {
    ctx.beginPath() //路径开始,子路经的集合
    ctx.moveTo(ranbNum(0, 150), ranbNum(0, 150)) //起始点(x,y),都随机
    ctx.lineTo(ranbNum(0, 150), ranbNum(0, 150)) //终止点(x,y)
    ctx.strokeStyle = ranbColor(60, 160) //路径的颜色
    ctx.stroke() //将上面的两个点连接起来
  }
}
// 干扰圆圈
function cirPath() {
  for (var i = 0; i < 20; i++) {
    ctx.beginPath() //路径开始
    ctx.arc(ranbNum(0, 120), ranbNum(0, 30), ranbNum(1, 5), 0, 2 * Math.PI) //画圆(x,y,z,0,2*Math.PI) x坐标,y坐标,半径,完整圆
    ctx.strokeStyle = ranbColor(60, 160)
    ctx.stroke()
  }
}
draw()
linePath()
cirPath()
printText()
