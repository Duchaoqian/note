var con = document.getElementsByClassName("content")[0];
var h = 0,
    m = 0,
    s = 0,
    ms = 0;
var timer; //存储计时器
function setTimer() {
    // 每秒执行一次
    timer = setInterval(function () {

        ms += 2;
        if (ms == 100) {
            s++;
            ms = 0;
        }

        if (s > 59) {
            m++;
            s = 0;
        }

        if (m > 59) {
            h++;
            m = 0;
        }

        var h_str = h;
        var m_str = m;
        var s_str = s;
        var ms_str = ms;

        if (h < 10) {
            h_str = "0" + h;
        }

        if (m < 10) {
            m_str = "0" + m;
        }

        if (s < 10) {
            s_str = "0" + s;
        }

        if (ms < 10) {
            ms_str = "0" + ms;
        }

        hours.innerHTML = h_str;
        minute.innerHTML = m_str;
        second.innerHTML = s_str;
        msecond.innerHTML = ms_str;

    }, 20)
}

var flag = false;

st.onclick = function () {
    flag = !flag;
    if (flag) {
        setTimer();
        st.innerHTML = "暂停";
    } else {
        clearInterval(timer);
        st.innerHTML = "开始";
    }
}
reset.onclick = function () {
    if (flag) {
        clearInterval(timer);
        st.innerHTML = "开始";
        flag = !flag;
    } else {
        st.innerHTML = "开始";
    }
    hours.innerHTML = "00";
    minute.innerHTML = "00";
    second.innerHTML = "00";
    msecond.innerHTML = "00";
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
    con.innerHTML = "";
}
content.onclick = function () {
    var sub = "<p>" + hours.innerHTML + ":" + minute.innerHTML + ":" + second.innerHTML + ":" + msecond
        .innerHTML + "</p>";
    con.innerHTML += sub;
};