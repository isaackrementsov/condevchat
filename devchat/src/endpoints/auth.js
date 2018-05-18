var dbFind = require('../core/dbFind');
module.exports = {
    renderLogin: function(req, res) {
        res.render('login', {session:req.session})
    },
    login: async function(req, res) {
        var user = await dbFind.find('User', {$or:[{'username':req.body.username.trim()}, {'email':req.body.username.trim()}], 'password': req.body.password.trim()});
        if(user){
            req.session.userId = user._id;
            req.session.user = user.username;
            req.session.dev = user.dev;
            req.session.gravatar = user.gravatar;
            res.redirect('/home')
        }else{
            req.session.err = ['Incorrect credentials'];
            res.redirect('/login')
        }
    },
    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/login')
    },
    any: function(req, res) {
        res.render('404', {session:req.session});
    }
}