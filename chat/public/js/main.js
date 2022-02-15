const username = prompt('Enter Username:')
let ccurrentDate = new Date();
let ctime = ccurrentDate.getHours() + ":" + ccurrentDate.getMinutes()
let ccDay = ccurrentDate.getDate();
let ccMonth = ccurrentDate.getMonth() + 1;
let ccYear = ccurrentDate.getFullYear();
let cdate = ccMonth + "/" + ccDay + "/" + ccYear
var socket = io();
var messages = document.getElementById("messages");

(function() {
  $("form").submit(function(e) {
    let li = document.createElement("li");
    e.preventDefault(); // prevents page reloading
    socket.broadcast.emit("chat message", username + ': ' + $("#message").val());

    messages.appendChild(li).append("You: " + $("#message").val());
    let span = document.createElement("span");
ccurrentDate = new Date();
ctime = ccurrentDate.getHours() + ":" + ccurrentDate.getMinutes()
ccDay = ccurrentDate.getDate();
ccMonth = ccurrentDate.getMonth() + 1;
ccYear = ccurrentDate.getFullYear();
cdate = ccMonth + "/" + ccDay + "/" + ccYear
    messages.appendChild(span).append("At: " + ctime + ", " + cdate);

    $("#message").val("");

    return false;
  });

  socket.on("received", data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    var messages = document.getElementById("messages");
    messages.appendChild(li).append(data.message);
ccurrentDate = new Date();
ctime = ccurrentDate.getHours() + ":" + ccurrentDate.getMinutes()
ccDay = ccurrentDate.getDate();
ccMonth = ccurrentDate.getMonth() + 1;
ccYear = ccurrentDate.getFullYear();
cdate = ccMonth + "/" + ccDay + "/" + ccYear
    messages.appendChild(span).append("At: " + ctime + ", " + cdate);
  });
})();

// fetching initial chat messages from the database
(function() {
  fetch("/chats")
    .then(data => {
      return data.json();
    })
    .then(json => {
      json.map(data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        messages.appendChild(li).append(data.message);
        messages
          .appendChild(span)
          .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
      });
    });
})();

//is typing...

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

//isTyping event
messageInput.addEventListener("keypress", () => {
  socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
  typing.innerText = data.user + " " + data.message;
  console.log(data.user + data.message);
});

//stop typing
messageInput.addEventListener("keyup", () => {
  socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
  typing.innerText = "";
});

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
