var ws = new WebSocket('ws://localhost:8080');
var chat = document.getElementsByClassName('chatList')[0];
chat.scrollTop = chat.offsetHeight + 1000;
function updateTime(){
    var times = document.getElementsByClassName('timeAgo');
    var dates = document.getElementsByClassName('dateAgo');
    for(let i = 0; i < times.length; i++){
        var time = timeAgo(parseInt(dates[i].value));
        if(time == '0s'){
            time = 'now'
        }
        times[i].innerHTML = time;
    }
}
var upd = updateTime();
var t = setInterval(updateTime, 10000);
function message(e){
    if(e.keyCode == 13){
        msg()
    }
}
function msg(){
    input = document.getElementsByClassName('chat-send')[0];
    send(input.value);
    input.value = '';
    return false
}
function send(data){
    if(ws.readyState == WebSocket.OPEN){
        ws.send(data)
    }else{
        throw 'No connection'
    }
}
function timeAgo(date){
  var seconds = ((new Date() - date) / 1000);
  var interval = (seconds / 31536000);
  if(interval > 1) return Math.floor(interval) + ' years';
  interval = Math.floor(seconds / 2592000);
  if(interval > 1) return Math.floor(interval) + ' months';
  interval = (seconds / 86400);
  if(interval > 1) return Math.floor(interval) + 'd';
  interval = (seconds / 3600);
  if(interval > 1) return Math.floor(interval) + 'h';
  interval = (seconds / 60);
  if(interval > 1) return Math.floor(interval) + 'm';
  return Math.floor(seconds) + 's';
}
ws.addEventListener('message', function(msg){
    var chat = document.getElementsByClassName('chatList')[0];
    var chatCont = document.getElementsByClassName('chat')[0];
    var session = JSON.parse(document.getElementById('session').value);
    var data = JSON.parse(msg.data);
    var clss = 'message';
    if(session.user.toString().trim() == data.author.toString().trim()){
        clss = 'sentMessage';
        data.author = 'You'
    }
    var htmlMsg = `<p class="p${clss} inline">${data.message}<span class="timestamp">${data.author} | <input type="hidden" class="dateAgo" value="${data.madeAt}"><span class="timeAgo">now</span></span></p>`
    chat.innerHTML += htmlMsg;
    chat.scrollTop = chat.offsetHeight + 1000;
})