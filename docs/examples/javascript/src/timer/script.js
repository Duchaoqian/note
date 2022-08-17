var divH = document.querySelector('.h')
var divM = document.querySelector('.m')
var divS = document.querySelector('.s')
var time_date = new Date()
var h = time_date.getHours()
var m = time_date.getMinutes()
var s = time_date.getSeconds()
h = h > 12 ? h - 12 : h // 将24小时制转化为 12 小时制
divH.style.animationDelay = `-${h * 60 * 60 + m * 60 + s}s`
divM.style.animationDelay = `-${m * 60 + s}s`
divS.style.animationDelay = `-${s}s`
