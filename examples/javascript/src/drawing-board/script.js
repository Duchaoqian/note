var canvarsobj = document.querySelector('canvas')
var ctx = canvarsobj.getContext('2d')

var num_text = document.getElementById('num_text')
var lin_w = num_text.value
var color_obj = document.getElementById('color')
var color_num = color_obj.value
var clear_can = document.getElementById('clear')
var clear_up = document.getElementById('up')
var clear_down = document.getElementById('down')

var w = ctx.canvas.width
var h = ctx.canvas.height
var imgdata = []
var num_id = 0

ctx.lineCap = 'round'
ctx.lineJoin = 'round'
let new_img = ctx.getImageData(0, 0, w, h)
imgdata.push(new_img)
canvarsobj.onmousedown = function (e) {
  ctx.beginPath()
  ctx.lineWidth = lin_w
  ctx.strokeStyle = color_num
  ctx.moveTo(e.layerX - canvarsobj.offsetLeft, e.layerY - canvarsobj.offsetTop)
  canvarsobj.onmousemove = function (e) {
    ctx.lineTo(e.layerX - canvarsobj.offsetLeft, e.layerY - canvarsobj.offsetTop)
    ctx.stroke()
  }
}
canvarsobj.onmouseout = function (e) {
  canvarsobj.onmousemove = null
  var img = ctx.getImageData(0, 0, w, h)
  imgdata.push(img)

  num_id = imgdata.indexOf(img)
}
canvarsobj.onmouseup = function (e) {
  canvarsobj.onmousemove = null
  var img = ctx.getImageData(0, 0, w, h)
  imgdata.push(img)

  num_id = imgdata.indexOf(img)
}

num_text.onchange = function () {
  lin_w = this.value
}

color_obj.onchange = function () {
  color_num = this.value
}

clear_can.onclick = function () {
  ctx.clearRect(0, 0, w, h)
  imgdata = []
  num_id = 0
  let new_img = ctx.getImageData(0, 0, w, h)
  imgdata.push(new_img)
}

clear_up.onclick = function () {
  num_id -= 1
  if (num_id <= 0) {
    num_id = 0
  }
  ctx.putImageData(imgdata[num_id], 0, 0)
}

clear_down.onclick = function () {
  num_id += 1
  if (num_id >= imgdata.length - 1) {
    num_id = imgdata.length - 1
  }
  ctx.putImageData(imgdata[num_id], 0, 0)
}
