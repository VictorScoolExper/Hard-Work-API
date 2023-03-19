const auth = require('../../auth');

// comes form youtube video
module.exports = function chequearAuth(){
    function middleware(req, res, next){
        const id = req.body.id;
        auth.chequearToken.confirmarToken(req, id);
        next();
    }
    return middleware;
}
// Note this comes from youtube video