const JWTService = require("../services/JWTService");

module.exports = async function(req,res, next){

    if(!req.headers || !req.headers.authorization){
        return res.badRequest({err: "Authorization header is missing!"});
    }
    const tokenParam = req.headers.authorization;
    const decodedToken = JWTService.verify(tokenParam);
    const user = await sails.models.user.findOne({id: decodedToken.user});
    if(!user){
        return next({err: 'Invalid credentials provided!'});
    }
    req.user = user.id;
    next();
}