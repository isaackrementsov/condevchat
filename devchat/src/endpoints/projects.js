var dbFind = require('../core/dbFind');
var dbUpdate = require('../core/dbUpdate');
module.exports = {
    show: async function(req,res){
        var website = await dbFind.find('Website', {'_id':req.params.websiteId, 'closed':true, $or:[{'author':req.session.user}, {'members.name':req.session.user}]});
        var tasks = await dbFind.search('Task', {'websiteId':req.params.websiteId, $or:[{'author':req.session.user}, {'members.name':req.session.user}]});
        req.session.chatId = req.params.websiteId;
        res.render('project', {session:req.session, website:website, tasks:tasks})
    },
    update: function(req,res){
        var websiteId = req.params.websiteId;
        var attr = req.params.attr;
        var formValue = req.body.value;
        console.log('updating...')
        if(attr = 'githubRepository'){
            dbUpdate.update('Website', {'_id':websiteId, 'author':req.session.user}, {'githubRepository':formValue})
        }
        res.redirect('/projects/' + websiteId)
    },
    finish: async function(req,res){
        var websiteId = req.params.websiteId;
        var tasks = await dbFind.search('Task', {'websiteId':websiteId, 'author':req.session.user});
        if(tasks){
            if(tasks.filter(function(task){return task.done == true}).length == tasks.length){
                dbUpdate.findOneAndUpdate('Website', {'_id':websiteId, 'author':req.session.user}, {'done':true}, function(err, doc){
                    if(doc && !err && !doc.done){
                        for(let i = 0; i < doc.members.length; i++){
                            dbUpdate.update('User', {'username':doc.members[i].name}, {$inc:{'xp':20}})
                        }
                        dbUpdate.update('User', {'username':req.session.user}, {$inc:{'xp':20}})
                    }
                })
            }
        }
        res.redirect('/projects/' + websiteId)
    }
}