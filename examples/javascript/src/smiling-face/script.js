var leftItem = document.querySelector(".left > .item");
      var rightItem = document.querySelector(".right > .item");
      var leftObj = document.querySelector(".left");
      var rightObj = document.querySelector(".right");
      var boxItem = document.querySelector(".box");
      var l_o_x =
        leftItem.offsetLeft + leftObj.offsetLeft + boxItem.offsetLeft + 15;
      var l_o_y =
        leftItem.offsetTop + leftObj.offsetTop + boxItem.offsetTop + 15;
      var r_o_x =
        rightItem.offsetLeft + rightObj.offsetLeft + boxItem.offsetLeft + 15;
      var r_o_y =
        rightItem.offsetTop + rightObj.offsetTop + boxItem.offsetTop + 15;
      console.log(l_o_x, l_o_y, r_o_x, r_o_y);
      document.onmousemove = function (e) {
        var mouse_x = e.clientX;
        var mouse_y = e.clientY;
        var l_x = mouse_x - l_o_x; // 计算出鼠标点距离左侧眼睛的x，y轴距离
        var l_y = mouse_y - l_o_y;
        var r_x = mouse_x - r_o_x;
        var r_y = mouse_y - r_o_y;
        // 计算出弧度
        var l_hd = Math.atan2(l_y, l_x);
        var r_hd = Math.atan2(r_y, r_x);
        // 小圆球的点坐标
        var l_l = Math.cos(l_hd) * (35 - 15) + 35;
        var l_t = Math.sin(l_hd) * (35 - 15) + 35;
        var r_l = Math.cos(r_hd) * (35 - 15) + 35;
        var r_t = Math.sin(r_hd) * (35 - 15) + 35;
        // 将计算的x，y坐标应用到眼睛上
        leftItem.style.left = l_l + "px";
        leftItem.style.top = l_t + "px";
        rightItem.style.left = r_l + "px";
        rightItem.style.top = r_t + "px";
      };