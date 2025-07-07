var mianObj = document.querySelector('.main')
var imgArr = [
  './image-explosion/01.jpg',
  './image-explosion/02.jpg',
  './image-explosion/03.jpg',
  './image-explosion/04.jpg',
  './image-explosion/05.jpg',
  './image-explosion/06.jpg'
]
var index = 0 // 记录当前展示的图片是第几张图片
function create() {
  var divList = document.createElement('div')
  divList.style.position = 'absolute'
  divList.style.top = '0'
  divList.style.left = '0'
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      var divObj = document.createElement('div')
      divObj.style.width = mianObj.clientWidth / 20 + 'px'
      divObj.style.height = mianObj.clientHeight / 20 + 'px'
      // divObj.style.border = "1px solid black";
      divObj.style.boxSizing = 'border-box'
      divObj.style.backgroundImage = `url(${imgArr[index]})`
      divObj.style.backgroundSize = `${mianObj.clientWidth}px ${mianObj.clientHeight}px`
      divObj.style.backgroundPositionX = -(mianObj.clientWidth / 20) * j + 'px'
      divObj.style.backgroundPositionY = -(mianObj.clientHeight / 20) * i + 'px'
      divObj.style.transition = `all ${Math.random() + 0.5}s`
      divList.appendChild(divObj)
    }
  }
  mianObj.appendChild(divList)
}
create()
setInterval(function () {
  var itemArr = document.querySelectorAll('.main > div > div')
  var itemObj = document.querySelector('.main > div')
  // var num = index + 1;
  // if (num > imgArr.length - 1) {
  //   num = 0;
  // }
  // mianObj.style.backgroundImage = `url(${imgArr[num]})`;
  // mianObj.style.backgroundSize = `${mianObj.clientWidth}px ${mianObj.clientHeight}px`;
  itemObj.style.zIndex = 1
  index++
  if (index > imgArr.length - 1) {
    index = 0
  }
  create()
  for (var i = 0; i < itemArr.length; i++) {
    var x = Math.random() * 600 - 300
    // 写一个随机数    Math.random()  * 范围  + 起始值
    var y = Math.random() * 600 - 300
    var xdeg = Math.random() * 360 - 180
    var ydeg = Math.random() * 360 - 180
    var scale = Math.random() + 0.5
    itemArr[
      i
    ].style.transform = `translateX(${x}px) translateY(${y}px) rotateX(${xdeg}deg) rotateY(${ydeg}deg) scale(${scale})`
    itemArr[i].style.opacity = 0
  }
  setTimeout(function () {
    // for (var i = 0; i < itemArr.length; i++) {
    //   itemArr[i].remove()
    // }
    // 在1.5s之后要把当前爆炸的图片删除掉
    // mianObj.innerHTML = "";
    itemObj.remove()
  }, 1500)
}, 3000)
