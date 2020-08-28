var WINDOW_WIDTH = 1000
var WINDOW_HEIGHT = 600
var RADIUS = 5
var WINDOW_TOP = 50
var WINDOW_LEFT = 50

window.onload = function () {
    //WINDOW_HEIGHT = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    WINDOW_WIDTH = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    console.log(WINDOW_HEIGHT,WINDOW_WIDTH);
    WINDOW_LEFT = Math.round(WINDOW_WIDTH / 6); 
    WINDOW_TOP = Math.round(WINDOW_HEIGHT / 4);
    RADIUS = Math.round(WINDOW_WIDTH * 4/6/108 - 1);

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    console.log(canvas.height,canvas.width);
    var timer = null;
    var currentHour,currentMinute,currentSecond;
    var nextHour,nextMinute,nextSecond;
    var date = new Date();
    currentHour = date.getHours();
    currentMinute = date.getMinutes();
    currentSecond = date.getSeconds();
    var aBalls = [];
    var aColors = ['#f07c82','#bc84a8','#45b787','#fbda41','#f8c387','#f2cac9','#93b5cf'];
    

    timer = setInterval(function(){
        render(context);
        upDate();
    },50);

    function upDate(){
        var date = new Date();
        nextHour = date.getHours();
        nextMinute = date.getMinutes();
        nextSecond = date.getSeconds();
        if(nextSecond != currentSecond){
            if(parseInt(nextHour/10) != parseInt(currentHour/10)){
                addBalls(WINDOW_LEFT,WINDOW_TOP,parseInt(nextHour/10));
            }
            if(nextHour%10 != currentHour%10){
                addBalls(WINDOW_LEFT + 15*(RADIUS+1),WINDOW_TOP,parseInt(nextHour%10))
            }
            if(parseInt(nextMinute/10) != parseInt(currentMinute/10)){
                addBalls(WINDOW_LEFT + 39*(RADIUS+1),WINDOW_TOP,parseInt(nextMinute/10))
            }
            if(nextMinute%10 != currentMinute%10){
                addBalls(WINDOW_LEFT + 54*(RADIUS+1),WINDOW_TOP,parseInt(nextMinute%10))
            }
            if(parseInt(nextSecond/10) != parseInt(currentSecond/10)){
                addBalls(WINDOW_LEFT + 78*(RADIUS+1),WINDOW_TOP,parseInt(nextSecond/10))
            }
            if(nextSecond%10 != currentSecond%10){
                addBalls(WINDOW_LEFT + 93*(RADIUS+1),WINDOW_TOP,parseInt(nextSecond%10))
            }
            currentHour = nextHour;
            currentMinute = nextMinute;
            currentSecond = nextSecond;
        }
        moveBalls();
    }

    function addBalls(x,y,num){
        for(var i = 0;i < digit[num].length;i++){
            for(var j = 0;j < digit[num][i].length;j++){
                if(digit[num][i][j] == 1){
                    var oBall = {x : x + 2*j*(RADIUS+1)+(RADIUS+1),
                                y : y + 2*i*(RADIUS+1)+(RADIUS+1),
                                vx : 4 * Math.pow(-1,Math.ceil(1000 * Math.random())),
                                vy : -3 + 2 * Math.random(),
                                g : 2.5 * Math.random(),
                                color : aColors[Math.floor(aColors.length * Math.random())]
                                }
                    aBalls.push(oBall);
                }
            }
        }
    }

    function moveBalls(){
        for(var i = 0;i < aBalls.length;i++){
            aBalls[i].x += aBalls[i].vx;
            aBalls[i].y += aBalls[i].vy;
            aBalls[i].vy += aBalls[i].g;
            
            if(aBalls[i].y >= WINDOW_HEIGHT - RADIUS){
                aBalls[i].y = WINDOW_HEIGHT - RADIUS;
                aBalls[i].vy = - aBalls[i].vy * 0.5;
            }
        }
        var count = 0;
        for(var i = 0;i < aBalls.length;i++){
            if((aBalls[i].x + RADIUS) > 0 && (aBalls[i].x + RADIUS) < WINDOW_WIDTH){
                aBalls[count++] = aBalls[i]
            }
        }
        while(aBalls.length > Math.min(300,count)){
            aBalls.pop();
        }
    }

    function render(cxt){
        cxt.clearRect(0,0,  WINDOW_WIDTH,WINDOW_HEIGHT);
        var hour = currentHour;
        var minute = currentMinute;
        var second = currentSecond;
        renderDigit(WINDOW_LEFT,WINDOW_TOP,parseInt(hour/10),cxt);
        renderDigit(WINDOW_LEFT + 15*(RADIUS+1),WINDOW_TOP,parseInt(hour%10),cxt);
        renderDigit(WINDOW_LEFT + 30*(RADIUS+1),WINDOW_TOP,10,cxt);
        renderDigit(WINDOW_LEFT + 39*(RADIUS+1),WINDOW_TOP,parseInt(minute/10),cxt);
        renderDigit(WINDOW_LEFT + 54*(RADIUS+1),WINDOW_TOP,parseInt(minute%10),cxt);
        renderDigit(WINDOW_LEFT + 69*(RADIUS+1),WINDOW_TOP,10,cxt);
        renderDigit(WINDOW_LEFT + 78*(RADIUS+1),WINDOW_TOP,parseInt(second/10),cxt);
        renderDigit(WINDOW_LEFT + 93*(RADIUS+1),WINDOW_TOP,parseInt(second%10),cxt);
        drawBalls(cxt);
    }

    function drawBalls(cxt){
        for(var i = 0;i < aBalls.length;i++){
            cxt.fillStyle = aBalls[i].color;
            cxt.beginPath();
            cxt.arc(aBalls[i].x,aBalls[i].y,RADIUS,0,2*Math.PI);
            cxt.closePath();
            cxt.fill();
        }
    }

    function renderDigit(x,y,num,cxt) {
        cxt.fillStyle = '#96c24e'
        for(var i = 0;i < digit[num].length;i++){
            for(var j = 0;j < digit[num][i].length;j++){
                if(digit[num][i][j] == 1){
                    cxt.beginPath();
                    cxt.arc(x + 2 * j*(RADIUS+1) + (RADIUS+1),y + 2*i*(RADIUS+1) + (RADIUS+1),RADIUS,0,2*Math.PI);
                    cxt.closePath(); 
                } 
                cxt.fill();
            }
        }
        
    }

}