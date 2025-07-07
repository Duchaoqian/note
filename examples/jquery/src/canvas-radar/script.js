/** @type {HTMLCanvasElement} */
var canvas = $("canvas")[0];
var ctx = canvas.getContext("2d");
var bw, bh, canvas_center;

// 1. 设置画布大小
function setCanvasSize() {
  bw = $(document).width();
  bh = $(document).height();
  canvas.width = bw;
  canvas.height = bh;

  canvas_center = { x: bw / 2, y: bh / 2 };
  // 将默认左上角的圆点坐标，平移到画布的中心点位置
  // ctx.translate(canvas_center.x, canvas_center.y);
}
setCanvasSize();
// 监听窗口改变
$(window).resize(setCanvasSize);

// 2. 创建敌军
var enemies = [];
for (var i = 0; i < 2; i++) {
  // 创建敌军，并设置敌军出现半径，角度，和透明度参数
  var enemy = {
    r: Math.random() * 200,
    deg: Math.random() * 360,
    opacity: 0,
  };
  enemies.push(enemy);
}

// 3. 绘制雷达
setInterval(drawRadar, 10);

// 定义旋转角度
var radarDeg = 0;
var radian_length = 100; // 定义总弧度

// 已知圆心，角度，弧度，求圆上的点坐标
function getPoint(r, deg) {
  return {
    x: canvas_center.x + r * Math.cos((Math.PI / 180) * deg),
    y: canvas_center.y + r * Math.sin((Math.PI / 180) * deg),
  };
}

// drawRadar();
function drawRadar() {
  // 雷达旋转角度不断 +1
  radarDeg += 1;

  // 在清除矩形区域之前，一定要ctx.beginPath();否则尾巴处会有一条线。
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制水平线和垂直交叉线
  ctx.moveTo(0, canvas_center.y);
  ctx.lineWidth = 1;
  ctx.lineTo(canvas.width, canvas_center.y);
  ctx.moveTo(canvas_center.x, 0);
  ctx.lineTo(canvas_center.x, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.stroke();

  // 绘制旋转的扫描扇形
  var newDeg = radarDeg % 360;

  for (var i = 0; i < radian_length; i++) {
    var deg1 = newDeg - i - 1;
    var deg2 = newDeg - i;

    // 根据两个度数求出来两个点坐标
    var r = 200; // 圆的半径为200
    var point1 = getPoint(r, deg1);
    var point2 = getPoint(r, deg2);

    // console.log(point1, point2);

    // 将这两个点坐标和圆心进行填充
    var opacity = 1 - i / radian_length - 0.3;

    ctx.beginPath();
    ctx.fillStyle = "rgba(185,147,98," + opacity + ")";
    ctx.moveTo(canvas_center.x, canvas_center.y);
    ctx.lineTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.fill();
  }

  // 出现敌机
  enemies.forEach(function (enemy, index) {
    // 获取敌机的点坐标位置
    var enemyPoint = getPoint(enemy.r, enemy.deg);

    // 绘制圆形的敌机
    ctx.beginPath();
    // 半径是4
    ctx.arc(enemyPoint.x, enemyPoint.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(185,147,98," + enemy.opacity + ")";
    ctx.fill();

    // 在敌机位置绘制十字交叉线
    var size = 6; // 线长
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(185,147,98," + enemy.opacity + ")";
    ctx.moveTo(enemyPoint.x - size, enemyPoint.y + size);
    ctx.lineTo(enemyPoint.x + size, enemyPoint.y - size);

    ctx.moveTo(enemyPoint.x - size, enemyPoint.y - size);
    ctx.lineTo(enemyPoint.x + size, enemyPoint.y + size);
    ctx.stroke();

    // 雷达和敌机位置重叠时，让敌机显示出来
    if (Math.abs(enemy.deg - newDeg) <= 1) {
      enemy.opacity = 1;
      $(".message").text(
        "半径: " + enemy.r.toFixed(3) + "，角度：" + enemy.deg.toFixed(3)
      );
    }
    // 透明度依次降低
    enemy.opacity *= 0.99;
    // console.log(enemy.opacity);

    // 这里判断透明度，不能直接判断是否为0，因为一开始的时候，所有的敌机的透明度都是0.
    if (enemy.opacity > 0 && enemy.opacity < 0.2) {
      enemy.opacity = 0;
      // 重新随机敌机位置
      enemy.r = Math.random() * 200;
      enemy.deg = Math.random() * 360;      
    }

    // 绘制敌机外侧环绕圆
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(185,147,98," + enemy.opacity + ")";
    ctx.arc(
      enemyPoint.x,
      enemyPoint.y,
      10 * (1 / enemy.opacity), // 根据透明度设置半径
      0,
      2 * Math.PI
    );
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(185,147,98,1)";
  // 绘制刻度圆盘
  // 将整个圆划分成120个间距，每一个间距是3度
  var allSpace = 120;
  var mark15 = 15; // 刻度每到15度的时候，需要刻度线加粗
  var markWidth = 0; // 刻度线的宽度
  var radius = 230; // 圆盘半径

  for (var i = 0; i < allSpace; i++) {
    ctx.beginPath();
    // 计算每一个刻度的度数，0，3，6，9
    var everyDeg = (i / allSpace) * 360;

    if (i % mark15 == 0) {
      markWidth = 10;
      ctx.lineWidth = 3;
    } else {
      markWidth = 5;
      ctx.lineWidth = 1;
    }

    var point1 = getPoint(radius, everyDeg);
    var point2 = getPoint(radius + markWidth, everyDeg);

    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);

    ctx.stroke();
  }

  // 绘制其它圆盘
  function drawCircle(r, lineWidth, func) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(185,147,98,1)";
    for (var i = 0; i <= 360; i++) {
      var point = getPoint(r, i);
      if (func(i)) {
        ctx.lineTo(point.x, point.y);
      }else {
        ctx.moveTo(point.x, point.y);
      }
    }
    ctx.stroke();
  }
  drawCircle(300, 2, function(deg) {
    return ((deg + radarDeg/10) % 180) < 90;
  })
  drawCircle(100, 1, function (deg) {
    return deg % 3 < 1;
  });
  drawCircle(190, 1, function (deg) {
    return true;
  });
}