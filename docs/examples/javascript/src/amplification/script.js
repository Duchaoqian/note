small.children[0].style.opacity = 1
var x = 0

// 绑定事件 切换图片
for (var i = 0; i < small.children.length; i++) {
  small.children[i].index = i
  small.children[i].onclick = function () {
    // 切换中图路径
    middle.src = this.src
    //  切换大图路径
    big.children[0].src = this.src

    small.children[x].style.opacity = 0.6
    this.style.opacity = 1
    x = this.index
  }
}

// 中图上绑定鼠标移动事件
middle.onmousemove = function (e) {
  var st = document.body.scrollTop || document.documentElement.scrollTop
  var ot = view.offsetTop
  var ol = view.offsetLeft
  // x,y指的是鼠标到图片左上角距离
  var x = e.clientX - ol
  var y = e.clientY + st - ot
  console.log(e.clientY, st, ot)

  // 大图位置
  var t = -y * 2 + 100
  var l = -x * 2 + 100

  // 临界点处理
  t = t > 0 ? 0 : t
  t = t < -340 ? -340 : t
  l = l > 0 ? 0 : l
  l = l < -760 ? -760 : l

  // 调整大图位置
  big.children[0].style.top = t + 'px'
  big.children[0].style.left = l + 'px'
}

middle.onmouseover = function () {
  big.style.display = 'block'
}
middle.onmouseout = function () {
  big.style.display = 'none'
}
