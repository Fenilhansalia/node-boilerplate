const jwt = require('jsonwebtoken');
const tokenSecretAdmin = process.env.TOKEN_SECRET.toString();

//Generate admin token

module.exports.issueAdmin = function(payload){
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
        id: payload,
    }, tokenSecretAdmin, {algorithm: 'HS512'})
}

module.exports.verifyAdmin = function (token, callBack) {   
    try{
        return jwt.verify(token, tokenSecretAdmin, {}, callBack)
    }catch(err){
        return "error"
    }
}