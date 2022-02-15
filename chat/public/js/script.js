const timehtml = document.querySelector('#time');
let currentDate = new Date();
let hours = currentDate.getHours()
let minutes = currentDate.getMinutes()
let seconds = currentDate.getSeconds()
let timeset = hours + ":" + minutes + ":" + seconds
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

let time = "00:00:00, 00/00/00"

setInterval(function(){
    currentDate = new Date();
    hours = currentDate.getHours()
    minutes = currentDate.getMinutes()
    seconds = currentDate.getSeconds()
    cDay = currentDate.getDate();
    cMonth = currentDate.getMonth() + 1;
    cYear = currentDate.getFullYear();
    if (hours < 10) {
      hours = "0" + hours
    }
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    if (cDay < 10) {
      cDay = "0" + cDay
    }
    if (cMonth < 10) {
      cMonth = "0" + cMonth
    }
    if (cYear < 10) {
      cYear = "0" + cYear
    }
    if (hours > 12) {
      hours -= 12
    }
    timeset = hours + ":" + minutes + ":" + seconds
    date = cMonth + "/" + cDay + "/" + cYear
    time = timeset + ", " + date
    timehtml.innerHTML = time
}, 0)