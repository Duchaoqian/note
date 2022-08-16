can.width = window.innerWidth;
    can.height = window.innerHeight;
    var ctx = can.getContext("2d");
    ctx.globalCompositeOperation = "lighter"

    // -5 -10   5 10
    function Circle(a) {
        var obj = {
            x: a.x || 10,
            y: a.y || 10,
            vx: random(1, 3) * (0.5 - Math.random() > 0 ? 1 : -1),
            vy: random(1, 3) * (0.5 - Math.random() > 0 ? 1 : -1),
            radius: a.radius || 20,
            fill: a.fill || 'black',
            draw: function () {
                ctx.fillStyle = this.fill;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            },
            update: function () {
                this.radius-=0.5;
                this.x += this.vx;
                this.y += this.vy;
                // if (this.x > window.innerWidth - this.radius || this.x < this.radius) {
                //     this.vx *= -1;
                //     this.fill="rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+","+Math.random()+")"
                // }
                // if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
                //     this.vy *= -1;
                //     this.fill="rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+","+Math.random()+")"
                // }
                this.draw();
            }
        }
        obj.draw();
        return obj;
    }

    function random(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

    var list = [];
    // for(var i=0;i<100;i++){
    //     list.push(Circle({
    //         x:random(30,window.innerWidth-30),
    //         y:random(30,window.innerHeight-30),
    //         radius:random(10,30),
    //         fill:"rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+","+Math.random()+")"
    //     }))
    // }


    function f() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (var i = 0; i < list.length; i++) {
            list[i].update();
            if (list[i].radius <= 0) {
                list.splice(i, 1);
                i--;
            }
        }

        
        requestAnimationFrame(f);
    
    }
    f();

    can.onmousemove = function (e) {
        for (var i = 0; i < 30; i++) {
            list.push(Circle({
                x: e.clientX,
                y: e.clientY,
                radius: random(20, 50),
                fill: "rgba(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + "," + Math.random() + ")"
            }))
        }
    }