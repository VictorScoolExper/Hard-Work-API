exports.success = function (req, res, mensaje = "", status = 200){
    // const statusCode = status || 200;
    // const mensajeOk = mensaje || '';
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    })
}

exports.error = function (req, res, mensaje = 'Error Internal', status = 500){
    // const statusCode = status || 500;
    // const mensajeError = mensaje || 'Error Internal';
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    })
}