var ws = require('ws');
module.exports = {
    broadcast: function(data, users, callback){
        for(let i = 0; i < users.length; i++){
            if(users[i].server.readyState == ws.OPEN){
                if(callback){
                    callback(data, users[i])
                }else{
                    users[i].server.send(data)
                }
            }
        }
    }
}
