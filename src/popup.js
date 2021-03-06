var dateHalloween = new Date(); 
var dateToday = new Date();
var writeArea = document.getElementById('countdown');
var ctx = writeArea.getContext('2d');
var isItOctober = false;
var isTodayHalloween = false;
var c_days,c_hours,c_minutes,c_seconds;
var jackSource = new Image();
var spriteLoop = 0;
var pos = 0;
jackSource.src = 'assets/jack-o-sprite.png';
const _DATE_FORMATING = 1000 * 60 * 60 * 24;

ctx.textAlign = 'center';

function getDateToday(){
    var today = new Date();
    dateToday = today;
}

function getDateHalloween() {
    var today = new Date();
    var offset = today.getTimezoneOffset() / 60;
    if (today.getUTCMonth() > 9) { // Past October
        y = today.getUTCFullYear() + 1;
        dateHalloween = new Date(Date.UTC(y,9,31,offset));
    } else { // Is or Before October
        y = today.getUTCFullYear();
        dateHalloween = new Date(Date.UTC(y,9,31,offset));
        if (today.getUTCMonth() == 9) { // Is it October
            isItOctober = true;
            if (today.getUTCDate() == 31) { // Is it Halloween
                isTodayHalloween = true;
            }
        }
    }
}

function timeDifference(endDate, startDate) {
    difference = endDate - startDate;
    c_days = Math.floor(difference / _DATE_FORMATING);
    c_hours = Math.floor((difference % _DATE_FORMATING) / (1000 * 60 * 60));
    c_minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    c_seconds = Math.floor((difference % (1000 * 60)) / 1000);
    time_array = [c_days,c_hours,c_minutes,c_seconds];
    if (c_days < 10) {
        c_days.toString();
        c_days = "0" + c_days;
    }
    if (c_hours < 10) {
        c_hours.toString();
        c_hours = "0" + c_hours;
    }
    if (c_minutes < 10) {
        c_minutes.toString();
        c_minutes = "0" + c_minutes;
    }
    if (c_seconds < 10) {
        c_seconds.toString();
        c_seconds = "0" + c_seconds;
    }
}

function fontLoad() {
    ctx.font ='20px Creepster-Regular';
    rem = document.getElementById("remove");
    rem.remove();
}

function clearCanvas() {
    w = writeArea.width;
    h = writeArea.height;
    ctx.fillStyle = '#D4641C';
    ctx.fillRect(0,0,w,h)
}

function drawCountdown() {
    w = writeArea.width / 8;
    h = writeArea.height / 4;
    ctx.fillStyle = '#000000';
    ctx.font ='40px Creepster-Regular';
    ctx.fillText(c_days,(w),(h*2));
    ctx.fillText(":",(w*2),(h*2));
    ctx.fillText(c_hours,(w*3),(h*2));
    ctx.fillText(":",(w*4),(h*2));
    ctx.fillText(c_minutes,(w*5),(h*2));
    ctx.fillText(":",(w*6),(h*2));
    ctx.fillText(c_seconds,(w*7),(h*2));
    ctx.font ='15px Creepster-Regular';
    ctx.fillText("DAYS",(w),((h*2)+20));
    ctx.fillText("HOURS",(w*3),((h*2)+20));
    ctx.fillText("MINUTES",(w*5),((h*2)+20));
    ctx.fillText("SECONDS",(w*7),((h*2)+20));
}

function normText() {
    w = writeArea.width / 2;
    ctx.fillStyle = '#000000';
    ctx.font ='30px Creepster-Regular';
    ctx.fillText("HALLOWEEN COUNTDOWN",w,30);
}

function octText() {
    w = writeArea.width / 2;
    ctx.fillStyle = '#000000';
    ctx.font ='30px Creepster-Regular';
    ctx.fillText("IT'S SPOOKY SEASON",w,30);
}

function hallowText() {
    w = writeArea.width / 2;
    h = writeArea.height / 2;
    ctx.fillStyle = "#000000";
    ctx.font = '40px Creepster-Regular';
    ctx.fillText("HAPPY HALLOWEEN!",w,h);
    ctx.font = '30px Creepster-Regular';
    ctx.fillText("Go be spooky!",w,h+40);
}

function octTheme(spriteLoop) {
    if (spriteLoop < 5){
        pos += 80;
        if (pos > 320) {
            pos = 320;
        }
    } else {
        pos -= 80;
        if (pos < 0) {
            pos = 0;
        }
    }
    ctx.drawImage(jackSource, pos, 0, 80, 80, 20, 100, 50, 50);
    ctx.drawImage(jackSource, pos, 0, 80, 80, 90, 100, 50, 50);
    ctx.drawImage(jackSource, pos, 0, 80, 80, 160, 100, 50, 50);
    ctx.drawImage(jackSource, pos, 0, 80, 80, 230, 100, 50, 50);
}

function mainLoop() {
    getDateToday();
    getDateHalloween();
    timeDifference(dateHalloween, dateToday);
    clearCanvas();
    if (isTodayHalloween == true) {
        hallowText();
    } else {
        if (isItOctober == true) {
            octText();
            octTheme(spriteLoop);
            spriteLoop += 1;
            if (spriteLoop == 9) {
                spriteLoop = 0;
            }
        } else {
            normText();
        }
        drawCountdown();
    }
}

fontLoad();
setInterval(mainLoop, 100);