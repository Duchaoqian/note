// 创建函数实现 创建标签并添加到页面中
var mainObj = document.querySelector('.main')
var itemArr = []
// x 指的是行数， y指的是列数
function create(x, y) {
  // 使用双重for 循环实现 3 行3列创建标x签
  for (var i = 0; i < x; i++) {
    // 外层循环控制有多少行
    for (var j = 0; j < y; j++) {
      // 内层循环控制有多少列
      var divObj = document.createElement('div')
      divObj.style.width = mainObj.clientWidth / y + 'px'
      divObj.style.height = mainObj.clientHeight / x + 'px'
      divObj.style.border = '1px solid black'
      divObj.style.boxSizing = 'border-box'
      // 判断是否是最后一个标签 如果是最后一个标签就不添加背图片
      if (i == x - 1 && j == y - 1) {
        divObj.className = 'kb' // 给空白标签添加一个特殊的类名
      } else {
        divObj.style.backgroundImage = 'url(./image-puzzle/01.jpg)'
        divObj.style.backgroundPositionX = `-${(mainObj.clientWidth / y) * j}px`
        divObj.style.backgroundPositionY = `-${(mainObj.clientHeight / x) * i}px`
        divObj.style.backgroundSize = `${mainObj.clientWidth}px ${mainObj.clientHeight}px`
        // 给每个标签绑定一个点击事件
        divObj.onclick = function (e) {
          var kb = document.querySelector('.kb')
          var kbOrder = kb.style.order // 读取空白标签的 order 属性值
          // this 表示当前标签
          var kbTop = kb.offsetTop
          var kbLeft = kb.offsetLeft
          var thisTop = this.offsetTop
          var thisLeft = this.offsetLeft
          // console.log(kbTop, kbLeft, thisTop, thisLeft);
          // console.log(this.offsetWidth);
          //  client 和 offset 获取标签元素的宽高
          //  client 只获取内容区域的宽度和高度
          //  offset 获取的内容区域加内边距 加 边框
          // if (kbTop == thisTop && kbLeft - thisLeft == this.offsetWidth) {
          //   kb.style.order = this.style.order; // 把当前标签的order属性值获取出来赋值给 空白标签
          //   this.style.order = kbOrder; // 把空白标签的order 属性值赋值给 当前标签
          // } else if (
          //   kbTop == thisTop &&
          //   kbLeft - thisLeft == -this.offsetWidth
          // ) {
          //   kb.style.order = this.style.order; // 把当前标签的order属性值获取出来赋值给 空白标签
          //   this.style.order = kbOrder;
          // } else if (
          //   kbLeft == thisLeft &&
          //   kbTop - thisTop == this.offsetHeight
          // ) {
          //   kb.style.order = this.style.order; // 把当前标签的order属性值获取出来赋值给 空白标签
          //   this.style.order = kbOrder;
          // } else if (
          //   kbLeft == thisLeft &&
          //   kbTop - thisTop == -this.offsetHeight
          // ) {
          //   kb.style.order = this.style.order; // 把当前标签的order属性值获取出来赋值给 空白标签
          //   this.style.order = kbOrder;
          // }

          if (
            (kbTop == thisTop && kbLeft - thisLeft == this.offsetWidth) ||
            (kbTop == thisTop && kbLeft - thisLeft == -this.offsetWidth) ||
            (kbLeft == thisLeft && kbTop - thisTop == this.offsetHeight) ||
            (kbLeft == thisLeft && kbTop - thisTop == -this.offsetHeight)
          ) {
            kb.style.order = this.style.order // 把当前标签的order属性值获取出来赋值给 空白标签
            this.style.order = kbOrder
            gameOver() // 调用函数判断游戏是否输赢
          }

          // kb.style.order = this.style.order; // 把当前标签的order属性值获取出来赋值给 空白标签
          // this.style.order = kbOrder; // 把空白标签的order 属性值赋值给 当前标签
          // offsetTop 当前标签到那个地方的距离？
        }
      }
      mainObj.appendChild(divObj)
      itemArr.push(divObj)
    }
  }
}

// 实现div 图片的随机排放
function orderItem() {
  // 为了避免删除数组元素造成 数组长度减小 在for 循环开始的时候 使用变量接受数组的长度
  var length = itemArr.length
  for (var i = 0; i < length; i++) {
    // 随机取出一个元素
    var index = Math.floor(Math.random() * itemArr.length)
    // 给随机取出的元素 指定order 实现排序
    itemArr[index].style.order = i
    // 将随机取出的元素从数组中删除掉
    itemArr.splice(index, 1)
  }
}
// 判断游戏输赢的函数
function gameOver() {
  // 写判断输赢的逻辑
  var divArr = document.querySelectorAll('.main > div')
  var isOver = true // 默认游戏结束了
  for (var i = 0; i < divArr.length; i++) {
    var order = divArr[i].style.order
    if (order != i) {
      // 当前标签所处位置是正确的
      // } else {
      // 当前标签所处位置是不正确的
      // 只要执行else 就说明游戏没有结束
      isOver = false
      break
    }
  }
  if (isOver) {
    //  isOver 最终结果为true 时就说明游戏结束了
    setTimeout(function () {
      // 等待 标签移动完成弹出弹框
      alert('游戏结束，你胜利了')
    }, 100)
  }
}
create(3, 3)
orderItem()
