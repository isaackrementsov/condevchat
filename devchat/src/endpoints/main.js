var dbFind = require('../core/dbFind');
module.exports = {
    home: async function(req,res){
        if(req.session.dev){
            var websites = await dbFind.search('Website', {'closed':true, 'members.name':req.session.user});
            res.render('home', {session:req.session, websites:websites})
        }else{
            var websites = await dbFind.search('Website', {'author':req.session.user, 'closed':true});
            res.render('home', {websites:websites, session:req.session})
        }
    }
}