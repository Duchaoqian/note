import data from './data.js'
var daohang = document.getElementById('daohang') // 获取导航栏
var all = document.getElementById('all') // 获取导航列表

for (let i = 0; i < data.length; i++) {
  // 添加导航栏内容
  var div = document.createElement('div')
  div.className = 'daohang'
  div.index = i
  div.style = 'color: rgb(102, 102, 102); border-color: rgb(234, 234, 234);'
  div.innerHTML = data[i].type
  daohang.appendChild(div)
}

for (let i = 0; i < data.length; i++) {
  // 添加导航列表内容
  var li = document.createElement('li') // 导航列表单项
  li.className = 'floor'
  li.index = i
  var div = document.createElement('div') // 单项标题
  div.className = 'big_title'
  div.innerHTML = data[i].type

  var ul = document.createElement('ul') // 单项列表
  ul.className = 'product_list'
  var str = ''
  for (let j = 0; j < data[i].goodList.length; j++) {
    // 单项列表内容
    str += `
            <li class="product">
                <div class="img_box">
                    <img img_src="${data[i].goodList[j].imgUrl}">
                </div>
                <div class="jieshao">${data[i].goodList[j].store}</div>
                <div class="title">${data[i].goodList[j].title}</div>
                <div class="price_box">
                    <div class="price">
                        <span class="p1">￥<span class="p2">${data[i].goodList[j].price}</span></span>
                    </div>
                    <div class="mark">
                        <span class="m1">精选</span>
                        <span class="m2">一起拼</span>
                    </div>
                </div>
                <div class="haoping">${data[i].goodList[j].nice}条好评</div>
            </li>
        `
  }
  ul.innerHTML = str
  li.appendChild(div)
  li.appendChild(ul)
  all.appendChild(li)
}

var img_box = document.getElementsByClassName('img_box') // 获取懒加载图片
var num = 0 // 懒加载优化
function tpljz() {
  // 图片懒加载
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  var H = window.innerHeight
  for (let i = num; i < img_box.length; i++) {
    var h = img_box[i].offsetTop
    if (h + 250 <= scrollTop + H) {
      img_box[i].children[0].src = img_box[i].children[0].getAttribute('img_src')
      num++
    } else {
      break // 不符合条件停止加载
    }
  }
}
tpljz()
window.addEventListener('scroll', tpljz, false)

let dh_num = 0 // 导航栏显示
function djtz(e) {
  // 点击跳转，导航栏高亮
  if (e.target.className != 'daohang') {
    // 排除错误
    return
  }
  daohang.children[dh_num].style = 'color: rgb(102, 102, 102); border-color: rgb(234, 234, 234);'
  dh_num = e.target.index
  document.body.scrollTop = all.children[dh_num].offsetTop
  document.documentElement.scrollTop = all.children[dh_num].offsetTop
  daohang.children[dh_num].style = 'color: rgb(251, 76, 129); border-color: rgb(251, 76, 129);'
}
daohang.addEventListener('click', djtz, false)

function gdtz() {
  // 滚动跳转，导航栏高亮
  daohang.children[dh_num].style = 'color: rgb(102, 102, 102); border-color: rgb(234, 234, 234);'
  for (let i = 0; i < all.children.length; i++) {
    var offsetTop = all.children[i].offsetTop
    var h = all.children[i].offsetHeight
    var H = window.innerHeight / 2
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (offsetTop <= H + scrollTop && offsetTop + h >= H + scrollTop) {
      dh_num = i
      daohang.children[dh_num].style = 'color: rgb(251, 76, 129); border-color: rgb(251, 76, 129);'
    }
  }
}
gdtz() //开始运行一次
window.addEventListener('scroll', gdtz, false)
