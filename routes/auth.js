const express = require('express');

const respuestas = require('../red/respuesta');
const controlador = require('../controllers/auth');

const router = express.Router();
// comes from youtube video
router.get('/login', login);

async function login (req, res, next){
    try {
        const token = await controlador.login(req.body.usuario, req.body.password);
        respuestas.success(req, res, token, 200);
    } catch (err) {
        next(err)
    }
}

module.exports = router;