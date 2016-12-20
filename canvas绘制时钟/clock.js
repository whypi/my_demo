var dom = document.getElementById('clock');
var ctx = dom.getContext("2d");   //返回一个用于在画布上绘图的环境，“2d”二维绘图
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;

function drawBackground(){
  ctx.save();
  // 绘制外圆
  ctx.translate(r, r);  //重新映射画布上的（0,0）位置
  ctx.beginPath();  //起始一条路径，或重置当前路径
  ctx.lineWidth = 10 * rem; //设置或返回当前的线条宽度
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);  //创建弧/曲线（用于创建圆形或部分圆）
  ctx.stroke(); //绘制已定义的路径

  // 绘制时间
  var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
  ctx.font = 18 * rem + 'px Arial';
  ctx.textAlign = 'center';   //水平居中对齐
  ctx.textBaseline = 'middle';  //垂直居中对齐
  hourNumbers.forEach(function(number,i){
    var rad = 2 * Math.PI / 12 * i;
    var x = Math.cos(rad) * (r-30 * rem);
    var y = Math.sin(rad) * (r-30 * rem);
    ctx.fillText(number, x, y); //在画布上绘制填色的文本
  });

  // 绘制60个刻度点
  for(var i = 0; i<60; i++){
    var rad = 2 * Math.PI / 60 * i;
    var x = Math.cos(rad) * (r-18 * rem);
    var y = Math.sin(rad) * (r-18 * rem);
    ctx.beginPath();
    // 时刻数时原点设置为黑色，其他的则为灰色
    if(i % 5 ===0){
      ctx.fillStyle = '#000'; //设置或返回用于填充绘画的颜色、渐变或模式
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    } else {
        ctx.fillStyle = '#ccc';
        ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    }
    ctx.fill();
  }
}


  // 绘制静态的时针
function drawHour(hour,minute){
  ctx.save(); //
  ctx.beginPath();
  var rad = 2 * Math.PI / 12 * hour;
  var mrad = 2 * Math.PI / 12 / 60 * minute;
  ctx.rotate(rad + mrad);
  ctx.lineWidth = 6 * rem;
  ctx.lineCap = 'round';
  ctx.moveTo(0, 10 * rem);  //针尾部要超过原点一点
  ctx.lineTo(0, -r / 2);
  ctx.stroke();
  ctx.restore();  //
}
  // 绘制静态的分针
function drawMinute(minute){
    ctx.save();
    ctx.beginPath();
    var rad = 2 * Math.PI / 60 * minute;
    ctx.rotate(rad);
    ctx.lineWidth = 3 * rem;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 10 * rem);  //针尾部要超过原点一点
    ctx.lineTo(0, -r + 30 * rem);
    ctx.stroke();
    ctx.restore();  //
}

// 绘制静态的秒针
function drawSecond(second){
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    var rad = 2 * Math.PI / 60 * second;
    ctx.rotate(rad);
    ctx.moveTo(-2 * rem, 20 * rem);  //针尾部要超过原点一点
    ctx.lineTo(2 * rem,20 * rem);
    ctx.lineTo(1, -r + 18 * rem);
    ctx.lineTo(-1, -r + 18 * rem);
    ctx.fill();
    ctx.restore();  //
}

function drawDot(){
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
  ctx.fill();
}

function draw(){
  ctx.clearRect(0, 0, width, height);
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  drawBackground();
  drawHour(hour,minute);
  drawMinute(minute);
  drawSecond(second);
  drawDot();
  ctx.restore();
}
draw();
setInterval(draw, 1000);

// drawBackground();
// drawHour(4,30);
// drawMinute(30);
// drawSecond(50);
// drawDot();