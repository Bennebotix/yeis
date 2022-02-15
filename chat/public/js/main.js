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
