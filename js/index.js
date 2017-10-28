;(function () {
    var header = document.querySelector(".jd_header");
    window.onscroll = function () {
        //var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var scrollTop = window.pageYOffset;
        var opacity = 0;
        if (scrollTop < 600) {
            opacity = scrollTop / 600 * 0.9;
        } else {
            opacity = 0.9;
        }
        header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
    }
})();


;(function () {

    var ul = document.querySelector(".seckill_c ul");
    var lis = ul.querySelectorAll("li");
    //设置ul的宽度
    ul.style.width = lis.length * lis[0].offsetWidth + "px";

})();


;(function () {
    var spans = document.querySelectorAll(".seckill_time>span:nth-child(odd)");
    var seckillTime = new Date(2017, 9, 19, 17, 12, 0);
    setTime();
    var timer = setInterval(setTime, 1000);

    function setTime() {
        //当前时间
        var nowTime = new Date();

        //把时间差转换成秒数
        var time = parseInt((seckillTime - nowTime) / 1000);

        if (time <= 0) {
            time = 0;
            clearInterval(timer);
        }

        //一个小时 = 3600
        //设置小时部分
        var hour = parseInt(time / 3600);
        spans[0].innerHTML = addZero(hour);

        //设置分钟部分  只关注不满60的那部分
        var minute = parseInt(time / 60) % 60;
        spans[1].innerHTML = addZero(minute);


        //设置秒钟  只关注不满60的那部分
        var second = time % 60;
        spans[2].innerHTML = addZero(second);
    }


    function addZero(n) {
        return n < 10 ? "0" + n : n;
    }

})();


//功能4：京东快报
//思路：
//1. 获取元素， 运动的ul， 获取li的个数， 获取li的高度
//2. 使用过渡进行动画， 开启一个定时器，每2s秒钟设置一下translateY 负值
//3. 当跑到最后一个li的时候，需要瞬间回到第一个li的位置。

;(function () {
    var ul = document.querySelector(".jd_news>.info>ul");
    var lis = ul.children;
    var lisHeight = lis[0].offsetHeight;
    var index = 0;
    setInterval(function () {
        if (index >= lis.length - 1) {
            index = 0;
            ul.style.transition = "none";
            ul.style.webkitTransition = "none";
            ul.style.transform = "translateY(-" + index * lisHeight + "px)";
            ul.style.webktTransform = "translateY(-" + index * lisHeight + "px)";
        }
        ul.offsetWidth;
        index++;
        // console.log(index);
        // console.log(lisHeight);
        ul.style.transition = 'all .5s';
        ul.style.webkitTransition = 'all .5s';
        ul.style.transform = 'translateY(-' + index * lisHeight + 'px)';
        ul.style.webkitTransform = 'translateY(-' + index * lisHeight + 'px)';
    }, 1000);
    ul.addEventListener("transitionend", function () {

    });

})();


//功能5：轮播图功能
//思路：
//1. 获取元素  运动的ul， 获取li的个数， 获取li的宽度
//2. 使用过渡进行动画， 开启一个定时器， 每2s中设置一下translateX  负值
//3. 动画结束时，判断是否是最后一张图片，如果是，瞬间变成第二张


;(function () {
    var ul = document.querySelector(".jd_banner>ul");
    var lis = ul.children;
    var width = lis[0].offsetWidth;
    var ol = document.querySelector('.jd_banner>ol');
    var points = ol.children;
    var index = 1;


    var timer = setInterval(function () {

        index++;

        addTransition();

        setTranslate(-index * width);

    }, 1000);

    ul.addEventListener("transitionend", function () {
        if (index >= lis.length - 1) {
            index = 1;
        }

        if (index <= 0) {
            index = lis.length - 2;
        }
        removeTransition();
        setTranslate(-index * width);

        //同步小圆点
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        points[index - 1].classList.add('now');

    });

    // 给ul注册touch 相关的事件
    var startX = 0;
    var startTime = 0;


    ul.addEventListener("touchstart", function (e) {
        // 1. 记录手指开始滑动是的位置
        //    清除定时器
        startX = e.changedTouches[0].clientX;
        startTime = new Date();
        clearInterval(timer);
        // console.log(startTime);
    });

    ul.addEventListener("touchmove", function (e) {

        var distance = e.changedTouches[0].clientX - startX;
        // console.log(distance);
        removeTransition();
        setTranslate(-index * width + distance);

    });


    ul.addEventListener("touchend", function (e) {
        var distance = e.changedTouches[0].clientX - startX;

        var moveTime = new Date() - startTime;
        //console.log(moveTime);
        if (Math.abs(distance) >= width / 3 || (moveTime <= 300 && Math.abs(distance) >= 30) ) {
            //说明滑动成功了
            if (distance > 0) {
                index--;
            }
            if (distance < 0) {
                index++;
            }
        }
        console.log(index);
        removeTransition();
        setTranslate(-index * width);

        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslate(-index * width);
        }, 1000);

    });




    window.addEventListener("resize", function () {
        width=lis[0].offsetWidth;
        clearInterval(timer);
        removeTransition();
        setTranslate(-index * width);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslate(-index * width);
        });
    });






    function addTransition() {
        ul.style.transition = "all .2s";
        ul.style.webkitTransition = "all .2s";
    };
    function setTranslate(value) {
        ul.style.transform = "translateX(" + value + "px)";
        ul.style.webkitTransform = "translateX(" + value + "px)";
    }
    function removeTransition() {
        ul.style.transition="none";
        ul.style.wedkitTransition="none";
    }

})();