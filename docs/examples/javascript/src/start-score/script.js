var txt = view.children[1]

// 开关 点击选择之后 必须点击重置 才可重新选择
var flag = true

for (var i = 0; i < 5; i++) {
  // 插入五个img标签
  var node = document.createElement('img')
  node.src = './start-score/star-off.png'
  box.appendChild(node)
  // 自定义元素属性存储索引
  node.index = i
  // 绑定鼠标经过事件，经过哪一个则让当前元素及前面的兄弟元素替换图片路径
  node.onmouseover = function () {
    if (flag) {
      for (var j = 0; j <= this.index; j++) {
        box.children[j].src = './start-score/star-on.png'
      }
      txt.innerHTML = this.index + 1 + '.0'
    }
  }
  node.onmouseout = function () {
    if (flag) {
      for (var j = 0; j < 5; j++) {
        box.children[j].src = './start-score/star-off.png'
      }
      txt.innerHTML = '0.0'
    }
  }

  node.onclick = function () {
    flag = false
  }
  reset.onclick = function () {
    flag = true
    for (var j = 0; j < 5; j++) {
      box.children[j].src = './start-score/star-off.png'
    }
    txt.innerHTML = '0.0'
  }
}
