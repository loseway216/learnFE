const User = require('../models/user')

exports.submit = (req,res,next) => {
    const data = req.body.user;
    User.authenticate(data.name,data.pass,(err,user) => {
        if(err) return next(err)
        
    })
}