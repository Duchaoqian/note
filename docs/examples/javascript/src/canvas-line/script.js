var canvarsobj = document.querySelector('canvas')
var ctx = canvarsobj.getContext('2d')
// console.log(document.getElementsByTagName("body"))
canvarsobj.width = window.innerWidth
canvarsobj.height = window.innerHeight

window.onresize = function () {
  canvarsobj.width = window.innerWidth
  canvarsobj.height = window.innerHeight
}
var mousPont = {
  x: null,
  y: null,
  len: 20000
}
canvarsobj.onmousemove = function (e) {
  mousPont.x = e.layerX
  mousPont.y = e.layerY
}
canvarsobj.onmouseout = function (e) {
  mousPont.x = null
  mousPont.y = null
}
var pont = []
for (let index = 0; index < 100; index++) {
  var x = Math.random() * canvarsobj.width
  var y = Math.random() * canvarsobj.height

  var sepX = Math.random() - 0.5
  var sepY = Math.random() - 0.5

  pont.push({
    x: x,
    y: y,
    sepX: sepX,
    sepY: sepY,
    len: 6000
  })
}
function sep() {
  ctx.clearRect(0, 0, canvarsobj.width, canvarsobj.height)
  var pont2 = [mousPont].concat(pont)
  pont.forEach(function (pontVal, index) {
    pontVal.x -= pontVal.sepX
    pontVal.y -= pontVal.sepY
    pontVal.sepX *= pontVal.x < 0 || pontVal.x > canvarsobj.width ? -1 : 1
    pontVal.sepY *= pontVal.y < 0 || pontVal.y > canvarsobj.height ? -1 : 1
    ctx.fillRect(pontVal.x, pontVal.y, 3, 3)
    for (let i = 0; i < pont2.length; i++) {
      var pont2_val = pont2[i]
      // console.log(pont2[i].x)

      //   console.log(pont2_val)
      if (pontVal == pont2_val) {
        continue
      }

      var a = pontVal.x - pont2_val.x
      var b = pontVal.y - pont2_val.y

      var c = Math.pow(a, 2) + Math.pow(b, 2)
      if (pont2_val.x < 30 || pont2_val.y < 30) {
        continue
      }
      if (c < pont2_val.len) {
        // 移动点到坐标之间距离的百分之一 ， 使之向鼠标点靠拢
        if (pont2_val == mousPont && c > pont2_val.len / 2) {
          pontVal.x -= a * 0.01
          pontVal.y -= b * 0.01
        }

        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = 'blue'
        ctx.moveTo(pontVal.x, pontVal.y)
        ctx.lineTo(pont2_val.x, pont2_val.y)
        ctx.stroke()
      }
    }
    pont2.splice(pont2.indexOf(pontVal), 1)
  })
}
sep()
setInterval(sep, 10)
