var dbFind = require('../core/dbFind');
function comparePassword(obj, password, cb) {
  bcrypt.compare(password, obj.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch);
  });
}
module.exports = {
    renderLogin: function(req, res) {
        res.render('login', {session:req.session})
    },
    login: async function(req, res) {
        var user = await dbFind.find('User', {$or:[{'username':req.body.username.trim()}, {'email':req.body.username.trim()}]});
        comparePassword(user, req.body.password.trim(), function(err, isMatch){
            if(user && isMatch){
                req.session.userId = user._id;
                req.session.user = user.username;
                req.session.dev = user.dev;
                res.redirect('/home')
            }else{
                req.session.err = ['Incorrect credentials'];
                res.redirect('/login')
            }
        });
    },
    logout: function(req, res) {
        req.session.destroy();
        res.redirect('/login')
    },
    any: function(req, res) {
        res.render('404', {session:req.session});
    }
}