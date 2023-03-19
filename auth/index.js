// Note this comes from youtube video
const jwt = require('jsonwebtoken');
config = require('../config');

const secret = config.jwt.secret;

function asignarToken(data){
    return jwt.sign(data, secret);
}
// Note this comes from youtube video
function verificarToken(token){
    return jwt.verify(token, secret);
}

const chequearToken ={
    confirmarToken : function(req, id){
        const decoficado = decodificarCabecera(req);

        if(decoficado.id !== id){
            throw new Error('No Tienes privilegio para hacer esto')
        }
    }
}

function obtenerToken(autorizacion){
    if(!autorizacion){
        throw new Error('No viene token');
    }

    if(autorizacion.indexOf('Bearer') === -1){
        throw new Error('Formato Invalido')
    }

    let token = autorizacion.replace('Bearer ', '');
    return token;
}

function decodificarCabecera(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado = verificarToken(token);

    req.user = decodificado;

    return decodificado;
}

module.exports = {
    asignarToken,
    chequearToken
}