import{R as v,a as y}from"./style.5b79529b.js";import{q as g,_ as F,h as E,s as f,m as b,t as D,o as C,v as A,x as d}from"../app.0f4232ef.js";const c=JSON.parse(`{"accordion":{"index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"ie=edge\\" />\\n    <title>Document</title>\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\n  </head>\\n\\n  <body>\\n    <div class=\\"view clearfix\\">\\n      <div class=\\"item\\">\\n        <div class=\\"title\\">\\n          <font>\u7535\u8BDD</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(146, 255, 146)\\">\\n        <div class=\\"title\\">\\n          <font>WIFI</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(105, 133, 255)\\">\\n        <div class=\\"title\\">\\n          <font>\u624B\u673A</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(255, 78, 87)\\">\\n        <div class=\\"title\\">\\n          <font>\u4E91\u76D8</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(141, 232, 255)\\">\\n        <div class=\\"title\\">\\n          <font>\u4E92\u8054\u7F51</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(183, 233, 0)\\">\\n        <div class=\\"title\\">\\n          <font>\u8BED\u97F3</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n    </div>\\n  </body>\\n  <script src=\\"./script.js\\"><\/script>\\n</html>\\n","script.js":"var x = 0\\nvar flag = true\\n\\n$('.item').eq(x).css('width', 300)\\nfor (var j = 1; j < 7; j++) {\\n  $('.title')\\n    .eq(j - 1)\\n    .css('backgroundImage', 'url(./accordion/img' + j + '.png)')\\n  $('.concent')\\n    .eq(j - 1)\\n    .css('backgroundImage', 'url(./accordion/img0' + j + '.png)')\\n}\\n\\n$('.title').click(function () {\\n  var index = $(this).parent().index()\\n  console.log(index)\\n  if (flag) {\\n    flag = false\\n\\n    $('.item')\\n      .eq(index)\\n      .animate(\\n        {\\n          width: 300\\n        },\\n        function () {\\n          flag = true\\n        }\\n      )\\n    $('.item')\\n      .eq(x)\\n      .animate(\\n        {\\n          width: 50\\n        },\\n        function () {\\n          x = index\\n        }\\n      )\\n  }\\n})\\n","style.css":"* {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\n.clearfix {\\n  zoom: 1;\\n}\\n\\n.clearfix::after {\\n  content: \\"\\";\\n  display: block;\\n  clear: both;\\n  visibility: hidden;\\n}\\n\\n.item {\\n  width: 50px;\\n  float: left;\\n  height: 250px;\\n  overflow: hidden;\\n  background: goldenrod;\\n  /* transition: all .5s; */\\n  position: relative;\\n}\\n\\n.title {\\n  width: 50px;\\n  height: 250px;\\n  background-size: 100% auto;\\n  background-repeat: no-repeat;\\n  background-position: center 90px;\\n  font-size: 12px;\\n  color: white;\\n  font-weight: bolder;\\n  text-align: center;\\n  line-height: 150px;\\n}\\n\\n.concent {\\n  background-size: 80% auto;\\n  background-position: center;\\n  width: 250px;\\n  height: 250px;\\n  background-repeat: no-repeat;\\n  background-position: center center;\\n  position: absolute;\\n  top: 0;\\n  left: 50px;\\n}"},"calendar":{"index.html":"<!DOCTYPE html>\\r\\n<html lang=\\"en\\">\\r\\n  <head>\\r\\n    <meta charset=\\"UTF-8\\" />\\r\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\r\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\r\\n    <title>Document</title>\\r\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\r\\n  </head>\\r\\n  <body>\\r\\n    <div class=\\"box\\">\\r\\n      <header>\u65E5\u5386</header>\\r\\n      <main>\\r\\n        <nav>\\r\\n          <button class=\\"btn-year-left\\"><<</button>\\r\\n          <button class=\\"btn-month-left\\"><</button>\\r\\n          <span></span>\\r\\n          <button class=\\"btn-month-right\\">></button>\\r\\n          <button class=\\"btn-year-right\\">>></button>\\r\\n        </nav>\\r\\n        <ul class=\\"week\\">\\r\\n          <li style=\\"color: red\\">\u65E5</li>\\r\\n          <li>\u4E00</li>\\r\\n          <li>\u4E8C</li>\\r\\n          <li>\u4E09</li>\\r\\n          <li>\u56DB</li>\\r\\n          <li>\u4E94</li>\\r\\n          <li>\u516D</li>\\r\\n        </ul>\\r\\n        <ul class=\\"date\\"></ul>\\r\\n      </main>\\r\\n    </div>\\r\\n    <script src=\\"./script.js\\"><\/script>\\r\\n  </body>\\r\\n</html>\\r\\n","script.js":"// for (let i = 0; i < 42; i++) {\\n//   var liObj = document.createElement(\\"li\\");\\n//   $(liObj).text(i);\\n//   $(\\".date\\").append(liObj);\\n// }\\nvar date = new Date()\\nvar y = date.getFullYear()\\nvar m = date.getMonth()\\nfunction createDate(year, month, nowDete) {\\n  // \u521B\u5EFA\u65E5\u5386\u7684\u51FD\u6570\\n  // \u6839\u636E\u4E0B\u4E2A\u6708\u4E00\u53F7\u7684\u65F6\u95F4\u6233 \u51CF\u53BB 24\u5C0F\u65F6 \u5F97\u5230\u672C\u6708\u6700\u540E\u4E00\u5929\u7684\u65F6\u95F4\u6233 \u8F6C\u5316\u4E3A\u65F6\u95F4\u5BF9\u8C61 \u5C31\u53EF\u4EE5\u83B7\u53D6\u5230\u6700\u540E\u4E00\u5929\u662F\u51E0\u53F7\\n  $('.date').html('')\\n  var now = new Date(year, month, 1)\\n  var nowDay = now.getDay() // \u83B7\u53D6\u5F53\u524D\u6708 \u4E00\u53F7\u661F\u671F\u51E0\\n  var prevDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).getDate()\\n  var nextY = month + 1 > 11 ? year + 1 : year\\n  var nextM = month + 1 > 11 ? 0 : month + 1\\n  var nowNextDate = new Date(+new Date(nextY, nextM, 1) - 24 * 60 * 60 * 1000).getDate()\\n  // var datetime = 1;\\n  for (let i = 0; i < 42; i++) {\\n    var liObj = document.createElement('li')\\n    if (i < nowDay) {\\n      // \u5199\u7684\u662F\u4E0A\u4E2A\u6708\\n      $(liObj)\\n        .text(prevDate - i)\\n        .css('color', '#e0e0e0')\\n      $('.date').prepend(liObj)\\n    } else if (i < nowNextDate + nowDay) {\\n      // \u5199\u672C\u6708\\n      if (\\n        nowDete.getFullYear() == year &&\\n        nowDete.getMonth() == month &&\\n        nowDete.getDate() == i - nowDay + 1\\n      ) {\\n        $(liObj)\\n          .text(i - nowDay + 1)\\n          .css('color', 'red')\\n      } else {\\n        $(liObj).text(i - nowDay + 1)\\n      }\\n\\n      $('.date').append(liObj)\\n    } else {\\n      //\u5199\u4E0B\u4E2A\u6708\u7684\\n      $(liObj)\\n        .text(i - nowNextDate - nowDay + 1)\\n        .css('color', '#e0e0e0')\\n      $('.date').append(liObj)\\n    }\\n  }\\n}\\n\\n// \u5728\u9875\u9762\u52A0\u8F7D\u5B8C\u6210\u6267\u884C\u51FD\u6570\\n// $(window).ready(function () {\\n//   console.log(\\"\u9875\u9762\u52A0\u8F7D\u5B8C\u6210\u4E86\\");\\n// });\\n\\n// \u5728\u9875\u9762\u52A0\u8F7D\u5B8C\u6210\u6267\u884C\u51FD\u6570 \u7B80\u5199\u65B9\u6CD5\\n$(function () {\\n  createDate(y, m, date)\\n  $('nav > span').text(\`\${y}\u5E74\${m + 1}\u6708\`)\\n  $('.btn-year-left').click(function () {\\n    y--\\n    createDate(y, m, date)\\n    $('nav > span').text(\`\${y}\u5E74\${m + 1}\u6708\`)\\n  })\\n  $('.btn-year-right').click(function () {\\n    y++\\n    createDate(y, m, date)\\n    $('nav > span').text(\`\${y}\u5E74\${m + 1}\u6708\`)\\n  })\\n  $('.btn-month-left').click(function () {\\n    m--\\n    y = m < 0 ? y - 1 : y\\n    m = m < 0 ? 11 : m\\n    createDate(y, m, date)\\n    $('nav > span').text(\`\${y}\u5E74\${m + 1}\u6708\`)\\n  })\\n  $('.btn-month-right').click(function () {\\n    m++\\n    y = m > 11 ? y + 1 : y\\n    m = m > 11 ? 0 : m\\n    createDate(y, m, date)\\n    $('nav > span').text(\`\${y}\u5E74\${m + 1}\u6708\`)\\n  })\\n})\\n","style.css":"ul,\\n      li {\\n        margin: 0;\\n        list-style: none;\\n        padding: 0;\\n      }\\n      .box {\\n        width: 500px;\\n        height: 500px;\\n        border-radius: 10px;\\n        box-shadow: 0 0 15px #ababab;\\n        margin: 0 auto;\\n      }\\n      header {\\n        height: 50px;\\n        line-height: 50px;\\n        font-size: 20px;\\n        padding: 0 20px;\\n        border-bottom: 1px solid #eee;\\n      }\\n      main {\\n        padding: 0 30px;\\n      }\\n      nav {\\n        display: flex;\\n        justify-content: space-between;\\n        padding: 10px 0;\\n        font-weight: 900;\\n        /* border-bottom: 1px solid #eee; */\\n      }\\n      nav > button {\\n        background-color: rgba(0, 0, 0, 0);\\n        border: none;\\n      }\\n      .week {\\n        display: flex;\\n        padding: 10px 0;\\n        border-bottom: 1px solid #eee;\\n      }\\n      .week > li {\\n        flex: 1;\\n        text-align: center;\\n      }\\n      .date > li {\\n        width: calc(100% / 7);\\n        text-align: center;\\n        margin: 10px 0;\\n      }\\n      .date {\\n        display: flex;\\n        flex-wrap: wrap;\\n      }"},"canvas-radar":{"index.html":"<!DOCTYPE html>\\r\\n<html lang=\\"en\\">\\r\\n  <head>\\r\\n    <meta charset=\\"UTF-8\\" />\\r\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\r\\n    <title>Document</title>\\r\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\r\\n  </head>\\r\\n  <body>\\r\\n    <canvas></canvas>\\r\\n    <div class=\\"info\\">\\r\\n      <h1>\u53D1\u73B0\u76EE\u6807</h1>\\r\\n      <p class=\\"message\\">temp</p>\\r\\n    </div>\\r\\n\\r\\n    <script src=\\"./script.js\\"><\/script>\\r\\n  </body>\\r\\n</html>\\r\\n","script.js":"/** @type {HTMLCanvasElement} */\\nvar canvas = $(\\"canvas\\")[0];\\nvar ctx = canvas.getContext(\\"2d\\");\\nvar bw, bh, canvas_center;\\n\\n// 1. \u8BBE\u7F6E\u753B\u5E03\u5927\u5C0F\\nfunction setCanvasSize() {\\n  bw = $(document).width();\\n  bh = $(document).height();\\n  canvas.width = bw;\\n  canvas.height = bh;\\n\\n  canvas_center = { x: bw / 2, y: bh / 2 };\\n  // \u5C06\u9ED8\u8BA4\u5DE6\u4E0A\u89D2\u7684\u5706\u70B9\u5750\u6807\uFF0C\u5E73\u79FB\u5230\u753B\u5E03\u7684\u4E2D\u5FC3\u70B9\u4F4D\u7F6E\\n  // ctx.translate(canvas_center.x, canvas_center.y);\\n}\\nsetCanvasSize();\\n// \u76D1\u542C\u7A97\u53E3\u6539\u53D8\\n$(window).resize(setCanvasSize);\\n\\n// 2. \u521B\u5EFA\u654C\u519B\\nvar enemies = [];\\nfor (var i = 0; i < 2; i++) {\\n  // \u521B\u5EFA\u654C\u519B\uFF0C\u5E76\u8BBE\u7F6E\u654C\u519B\u51FA\u73B0\u534A\u5F84\uFF0C\u89D2\u5EA6\uFF0C\u548C\u900F\u660E\u5EA6\u53C2\u6570\\n  var enemy = {\\n    r: Math.random() * 200,\\n    deg: Math.random() * 360,\\n    opacity: 0,\\n  };\\n  enemies.push(enemy);\\n}\\n\\n// 3. \u7ED8\u5236\u96F7\u8FBE\\nsetInterval(drawRadar, 10);\\n\\n// \u5B9A\u4E49\u65CB\u8F6C\u89D2\u5EA6\\nvar radarDeg = 0;\\nvar radian_length = 100; // \u5B9A\u4E49\u603B\u5F27\u5EA6\\n\\n// \u5DF2\u77E5\u5706\u5FC3\uFF0C\u89D2\u5EA6\uFF0C\u5F27\u5EA6\uFF0C\u6C42\u5706\u4E0A\u7684\u70B9\u5750\u6807\\nfunction getPoint(r, deg) {\\n  return {\\n    x: canvas_center.x + r * Math.cos((Math.PI / 180) * deg),\\n    y: canvas_center.y + r * Math.sin((Math.PI / 180) * deg),\\n  };\\n}\\n\\n// drawRadar();\\nfunction drawRadar() {\\n  // \u96F7\u8FBE\u65CB\u8F6C\u89D2\u5EA6\u4E0D\u65AD +1\\n  radarDeg += 1;\\n\\n  // \u5728\u6E05\u9664\u77E9\u5F62\u533A\u57DF\u4E4B\u524D\uFF0C\u4E00\u5B9A\u8981ctx.beginPath();\u5426\u5219\u5C3E\u5DF4\u5904\u4F1A\u6709\u4E00\u6761\u7EBF\u3002\\n  ctx.beginPath();\\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\\n\\n  // \u7ED8\u5236\u6C34\u5E73\u7EBF\u548C\u5782\u76F4\u4EA4\u53C9\u7EBF\\n  ctx.moveTo(0, canvas_center.y);\\n  ctx.lineWidth = 1;\\n  ctx.lineTo(canvas.width, canvas_center.y);\\n  ctx.moveTo(canvas_center.x, 0);\\n  ctx.lineTo(canvas_center.x, canvas.height);\\n  ctx.strokeStyle = \\"rgba(255,255,255,0.1)\\";\\n  ctx.stroke();\\n\\n  // \u7ED8\u5236\u65CB\u8F6C\u7684\u626B\u63CF\u6247\u5F62\\n  var newDeg = radarDeg % 360;\\n\\n  for (var i = 0; i < radian_length; i++) {\\n    var deg1 = newDeg - i - 1;\\n    var deg2 = newDeg - i;\\n\\n    // \u6839\u636E\u4E24\u4E2A\u5EA6\u6570\u6C42\u51FA\u6765\u4E24\u4E2A\u70B9\u5750\u6807\\n    var r = 200; // \u5706\u7684\u534A\u5F84\u4E3A200\\n    var point1 = getPoint(r, deg1);\\n    var point2 = getPoint(r, deg2);\\n\\n    // console.log(point1, point2);\\n\\n    // \u5C06\u8FD9\u4E24\u4E2A\u70B9\u5750\u6807\u548C\u5706\u5FC3\u8FDB\u884C\u586B\u5145\\n    var opacity = 1 - i / radian_length - 0.3;\\n\\n    ctx.beginPath();\\n    ctx.fillStyle = \\"rgba(185,147,98,\\" + opacity + \\")\\";\\n    ctx.moveTo(canvas_center.x, canvas_center.y);\\n    ctx.lineTo(point1.x, point1.y);\\n    ctx.lineTo(point2.x, point2.y);\\n    ctx.fill();\\n  }\\n\\n  // \u51FA\u73B0\u654C\u673A\\n  enemies.forEach(function (enemy, index) {\\n    // \u83B7\u53D6\u654C\u673A\u7684\u70B9\u5750\u6807\u4F4D\u7F6E\\n    var enemyPoint = getPoint(enemy.r, enemy.deg);\\n\\n    // \u7ED8\u5236\u5706\u5F62\u7684\u654C\u673A\\n    ctx.beginPath();\\n    // \u534A\u5F84\u662F4\\n    ctx.arc(enemyPoint.x, enemyPoint.y, 4, 0, 2 * Math.PI);\\n    ctx.fillStyle = \\"rgba(185,147,98,\\" + enemy.opacity + \\")\\";\\n    ctx.fill();\\n\\n    // \u5728\u654C\u673A\u4F4D\u7F6E\u7ED8\u5236\u5341\u5B57\u4EA4\u53C9\u7EBF\\n    var size = 6; // \u7EBF\u957F\\n    ctx.beginPath();\\n    ctx.lineWidth = 4;\\n    ctx.strokeStyle = \\"rgba(185,147,98,\\" + enemy.opacity + \\")\\";\\n    ctx.moveTo(enemyPoint.x - size, enemyPoint.y + size);\\n    ctx.lineTo(enemyPoint.x + size, enemyPoint.y - size);\\n\\n    ctx.moveTo(enemyPoint.x - size, enemyPoint.y - size);\\n    ctx.lineTo(enemyPoint.x + size, enemyPoint.y + size);\\n    ctx.stroke();\\n\\n    // \u96F7\u8FBE\u548C\u654C\u673A\u4F4D\u7F6E\u91CD\u53E0\u65F6\uFF0C\u8BA9\u654C\u673A\u663E\u793A\u51FA\u6765\\n    if (Math.abs(enemy.deg - newDeg) <= 1) {\\n      enemy.opacity = 1;\\n      $(\\".message\\").text(\\n        \\"\u534A\u5F84: \\" + enemy.r.toFixed(3) + \\"\uFF0C\u89D2\u5EA6\uFF1A\\" + enemy.deg.toFixed(3)\\n      );\\n    }\\n    // \u900F\u660E\u5EA6\u4F9D\u6B21\u964D\u4F4E\\n    enemy.opacity *= 0.99;\\n    // console.log(enemy.opacity);\\n\\n    // \u8FD9\u91CC\u5224\u65AD\u900F\u660E\u5EA6\uFF0C\u4E0D\u80FD\u76F4\u63A5\u5224\u65AD\u662F\u5426\u4E3A0\uFF0C\u56E0\u4E3A\u4E00\u5F00\u59CB\u7684\u65F6\u5019\uFF0C\u6240\u6709\u7684\u654C\u673A\u7684\u900F\u660E\u5EA6\u90FD\u662F0.\\n    if (enemy.opacity > 0 && enemy.opacity < 0.2) {\\n      enemy.opacity = 0;\\n      // \u91CD\u65B0\u968F\u673A\u654C\u673A\u4F4D\u7F6E\\n      enemy.r = Math.random() * 200;\\n      enemy.deg = Math.random() * 360;      \\n    }\\n\\n    // \u7ED8\u5236\u654C\u673A\u5916\u4FA7\u73AF\u7ED5\u5706\\n    ctx.beginPath();\\n    ctx.lineWidth = 1;\\n    ctx.strokeStyle = \\"rgba(185,147,98,\\" + enemy.opacity + \\")\\";\\n    ctx.arc(\\n      enemyPoint.x,\\n      enemyPoint.y,\\n      10 * (1 / enemy.opacity), // \u6839\u636E\u900F\u660E\u5EA6\u8BBE\u7F6E\u534A\u5F84\\n      0,\\n      2 * Math.PI\\n    );\\n    ctx.stroke();\\n  });\\n\\n  ctx.strokeStyle = \\"rgba(185,147,98,1)\\";\\n  // \u7ED8\u5236\u523B\u5EA6\u5706\u76D8\\n  // \u5C06\u6574\u4E2A\u5706\u5212\u5206\u6210120\u4E2A\u95F4\u8DDD\uFF0C\u6BCF\u4E00\u4E2A\u95F4\u8DDD\u662F3\u5EA6\\n  var allSpace = 120;\\n  var mark15 = 15; // \u523B\u5EA6\u6BCF\u523015\u5EA6\u7684\u65F6\u5019\uFF0C\u9700\u8981\u523B\u5EA6\u7EBF\u52A0\u7C97\\n  var markWidth = 0; // \u523B\u5EA6\u7EBF\u7684\u5BBD\u5EA6\\n  var radius = 230; // \u5706\u76D8\u534A\u5F84\\n\\n  for (var i = 0; i < allSpace; i++) {\\n    ctx.beginPath();\\n    // \u8BA1\u7B97\u6BCF\u4E00\u4E2A\u523B\u5EA6\u7684\u5EA6\u6570\uFF0C0\uFF0C3\uFF0C6\uFF0C9\\n    var everyDeg = (i / allSpace) * 360;\\n\\n    if (i % mark15 == 0) {\\n      markWidth = 10;\\n      ctx.lineWidth = 3;\\n    } else {\\n      markWidth = 5;\\n      ctx.lineWidth = 1;\\n    }\\n\\n    var point1 = getPoint(radius, everyDeg);\\n    var point2 = getPoint(radius + markWidth, everyDeg);\\n\\n    ctx.moveTo(point1.x, point1.y);\\n    ctx.lineTo(point2.x, point2.y);\\n\\n    ctx.stroke();\\n  }\\n\\n  // \u7ED8\u5236\u5176\u5B83\u5706\u76D8\\n  function drawCircle(r, lineWidth, func) {\\n    ctx.beginPath();\\n    ctx.strokeStyle = \\"rgba(185,147,98,1)\\";\\n    for (var i = 0; i <= 360; i++) {\\n      var point = getPoint(r, i);\\n      if (func(i)) {\\n        ctx.lineTo(point.x, point.y);\\n      }else {\\n        ctx.moveTo(point.x, point.y);\\n      }\\n    }\\n    ctx.stroke();\\n  }\\n  drawCircle(300, 2, function(deg) {\\n    return ((deg + radarDeg/10) % 180) < 90;\\n  })\\n  drawCircle(100, 1, function (deg) {\\n    return deg % 3 < 1;\\n  });\\n  drawCircle(190, 1, function (deg) {\\n    return true;\\n  });\\n}","style.css":"* {\\n  padding: 0;\\n  margin: 0;\\n}\\nbody {\\n  height: 100vh;\\n  overflow: hidden;\\n}\\ncanvas {\\n  background-color: #111;\\n}\\n.info {\\n  position: absolute;\\n  left: 50px;\\n  bottom: 50px;\\n}\\nh1 {\\n  color: white;\\n  letter-spacing: 3px;\\n}\\n.message {\\n  color: #b99362;\\n}"},"digital-tube-timer":{"index.html":"<!DOCTYPE html>\\r\\n<html lang=\\"en\\">\\r\\n  <head>\\r\\n    <meta charset=\\"UTF-8\\" />\\r\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\r\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\r\\n    <title>Document</title>\\r\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\r\\n  </head>\\r\\n  <body>\\r\\n    <main>\\r\\n      <header>\\r\\n        <select name=\\"\\" id=\\"month\\"></select>\\r\\n        <span>\u5206</span>\\r\\n        <select name=\\"\\" id=\\"second\\"></select>\\r\\n        <span>\u79D2</span>\\r\\n        <button class=\\"btn\\">\u5F00\u59CB</button>\\r\\n        <button class=\\"reset\\">\u91CD\u7F6E</button>\\r\\n      </header>\\r\\n      <hr />\\r\\n      <div class=\\"box\\">\\r\\n        <div class=\\"month\\">\\r\\n          <ul>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n          </ul>\\r\\n          <ul>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n          </ul>\\r\\n        </div>\\r\\n        <div class=\\"item\\"></div>\\r\\n        <div class=\\"second\\">\\r\\n          <ul>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n          </ul>\\r\\n          <ul>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n            <li></li>\\r\\n          </ul>\\r\\n        </div>\\r\\n      </div>\\r\\n    </main>\\r\\n    <script src=\\"./script.js\\"><\/script>\\r\\n  </body>\\r\\n</html>\\r\\n","script.js":"for (var i = 0; i < 60; i++) {\\n  var soption = document.createElement('option')\\n  var moption = document.createElement('option')\\n  $(moption).text(i < 10 ? '0' + i : i)\\n  $(soption).text(i < 10 ? '0' + i : i)\\n  $('#month').append(moption)\\n  $('#second').append(soption)\\n}\\nvar arr = [\\n  [0, 1, 2, 3, 4, 5],\\n  [1, 2],\\n  [0, 1, 6, 4, 3],\\n  [0, 1, 6, 2, 3],\\n  [5, 6, 1, 2],\\n  [0, 5, 6, 2, 3],\\n  [0, 5, 4, 3, 2, 6],\\n  [0, 1, 2],\\n  [0, 1, 6, 4, 3, 2, 5],\\n  [0, 5, 6, 1, 2, 3]\\n]\\nfunction createNum(select, num, oldnum) {\\n  var num1 = Math.floor(num / 10)\\n  var num2 = num % 10\\n  var oldNum1 = Math.floor(oldnum / 10)\\n  var oldNum2 = oldnum % 10\\n  var $liArr1 = $(select).children().eq(0).children()\\n  var $liArr2 = $(select).children().eq(1).children()\\n  // $.each(arr[num1], function (index, item) {\\n  // console.log(index, item);\\n  function fun(liArr, obj, index) {\\n    liArr.eq(arr[obj][index]).animate({ opacity: '1' }, 20, function () {\\n      if (index + 1 <= arr[obj].length - 1) fun(liArr, obj, index + 1)\\n    })\\n  }\\n  if (num1 != oldNum1) {\\n    $liArr1.css({ opacity: '0.1' })\\n    fun($liArr1, num1, 0)\\n  }\\n  if (num2 != oldNum2) {\\n    $liArr2.css({ opacity: '0.1' })\\n    fun($liArr2, num2, 0)\\n  }\\n}\\nvar timer\\n$('.btn').click(function (e) {\\n  var month = $('#month').val()\\n  var second = $('#second').val()\\n  $('.item').css('opacity', '1')\\n  // console.log(month, second);\\n  clearInterval(timer)\\n  timer = setInterval(() => {\\n    var oldsecond = second\\n    var oldmonth = month\\n    second--\\n    if (second < 0) {\\n      if (month == 0) {\\n        second = 0\\n        alert('\u5012\u8BA1\u65F6\u7ED3\u675F\u4E86')\\n        clearInterval(timer)\\n        $('select').val('00')\\n        $('li').css('opacity', '0.1')\\n        $('.item').css('opacity', '0.1')\\n      } else {\\n        second = 59\\n      }\\n      month--\\n      month = month < 0 ? 0 : month\\n    }\\n    createNum('.month', month, oldmonth)\\n    createNum('.second', second, oldsecond)\\n  }, 1000)\\n  createNum('.month', month * 1)\\n  createNum('.second', second * 1)\\n})\\n$('.reset').click(function (e) {\\n  clearInterval(timer)\\n  $('select').val('00')\\n  $('li').css('opacity', '0.1')\\n  $('.item').css('opacity', '0.1')\\n})\\n","style.css":"body {\\n  background-color: #000;\\n}\\nmain {\\n  width: 1000px;\\n  margin: 0 auto;\\n}\\nul,\\nli {\\n  list-style: none;\\n  margin: 0;\\n  padding: 0;\\n}\\nheader {\\n  text-align: center;\\n  padding: 50px 0;\\n}\\nul {\\n  width: 120px;\\n  height: 225px;\\n  /* border: 1px solid red; */\\n  position: relative;\\n  margin: 20px 30px;\\n}\\nli {\\n  width: 90px;\\n  height: 15px;\\n  background-color: red;\\n  border-radius: 8px;\\n  position: absolute;\\n  opacity: 0.1;\\n}\\nli:nth-child(1) {\\n  top: 0;\\n  left: 15px;\\n}\\nli:nth-child(2) {\\n  width: 15px;\\n  height: 90px;\\n  top: 15px;\\n  right: 0;\\n}\\nli:nth-child(3) {\\n  width: 15px;\\n  height: 90px;\\n  top: 120px;\\n  right: 0;\\n}\\nli:nth-child(3) {\\n  top: 120px;\\n  right: 0;\\n}\\nli:nth-child(4) {\\n  bottom: 0;\\n  right: 15px;\\n}\\nli:nth-child(5) {\\n  width: 15px;\\n  height: 90px;\\n  top: 120px;\\n  left: 0;\\n}\\nli:nth-child(6) {\\n  width: 15px;\\n  height: 90px;\\n  top: 15px;\\n  left: 0;\\n}\\nli:nth-child(7) {\\n  top: 105px;\\n  left: 15px;\\n}\\n.box > .item {\\n  width: 50px;\\n  height: 50px;\\n  border-radius: 50%;\\n  background-color: red;\\n  opacity: 0.1;\\n}\\n.box {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n.month,\\n.second {\\n  display: flex;\\n}\\nspan {\\n  color: #fff;\\n}\\nselect {\\n  width: 100px;\\n}"},"helloworld":{"description.txt":"\u5185\u7F6Ejquery\u5E93 \u53EF\u76F4\u63A5\u4E66\u5199JQ\u4EE3\u7801","index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Document</title>\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\n  </head>\\n  <body>\\n    <script src=\\"./script.js\\"><\/script>\\n  </body>\\n</html>\\n","script.js":"$(document.body).append('Hello World')\\n","style.css":""}}`);function m(n,r,e){for(const t in r)typeof r[t]!="string"?m(n+"/"+t,r[t],e):e[n+"/"+t]=r[t]}function p(n,r,e){const{"index.html":t,"script.js":u,"style.css":a}=n;for(const i in n)i!=="index.html"&&i!=="script.js"&&i!=="style.css"&&i!=="description.txt"&&typeof n[i]=="string"?r[i]=n[i]:typeof n[i]!="string"&&m(i,n[i],r);e({template:t,script:u,style:a})}function w(n,r){const e={};return n["import-map.json"]=n["import-map.json"]?n["import-map.json"]:"",p(n,e,({template:t,script:u,style:a})=>{const i=n["description.txt"];let o=i?`<!--
${i.trim()}
-->

`:"";a&&(t=t.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${a}

</style>`)),u&&(t=t.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script type="module">
			import 'jquery' 

			${u}
		<\/script>`)),o+=t,e["index.html"]=o}),e}function B(n,r){const e={};n["import-map.json"]=n["import-map.json"]?n["import-map.json"]:"";const t=n["description.txt"];let u=t?`<!--
${t.trim()}
-->

`:"",a="",i="";return e["index.html"]=u,p(n,e,({template:o,script:l,style:s})=>{s&&(a+=s),o&&(u+=o.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),l&&(l=l.replace(/(\$|jQuery)([^\w\{\}])/g,function(k,h,x){return`window.${h}${x}`}),i+=`import 'jquery'

${l}`)}),e["index.html"]=u,a&&(e["style.css"]=a),i&&(e["script.js"]=i),e}function $(n){window.addEventListener("hashchange",n),g(()=>{window.removeEventListener("hashchange",n)})}const j=E({__name:"ExampleRepl",setup(n){let r=f("prefer-html")||b();const e=new v({serializedState:"",defaultVueRuntimeURL:"",defaultVueServerRendererURL:"",showOutput:!1,outputMode:"preview"});e.setImportMap({imports:{jquery:"https://unpkg.com/jquery@3.6.0/dist/jquery.min.js"}}),D(t),$(t);function t(){let u=location.hash.slice(1);c.hasOwnProperty(u)||(u="helloworld",location.hash=`#${u}`),e.setFiles(r.value?w(c[u]):B(c[u]),"index.html")}return(u,a)=>(C(),A(d(y),{store:d(e),showImportMap:!0,showCompileOutput:!1,clearConsole:!1},null,8,["store"]))}});var T=F(j,[["__scopeId","data-v-66f3ae20"]]);export{T as default};