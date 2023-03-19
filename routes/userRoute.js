const express = require('express');

const seguridad = require('../controllers/user/seguridad');
const respuestas = require('../red/respuesta');
const controlador = require('../controllers/user');

const router = express.Router();

router.get("/youtube", todos);
router.get("/youtube/:id", uno);
router.post("/youtube", seguridad(),agregar);
router.put('/youtube', seguridad(), eliminar);

 async function todos (req, res, next){
    try {
        const items = await controlador.todos();
        respuestas.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
    
};

async function uno (req, res, next){
    
    try {
        const items = await controlador.uno(req.params.id);
        respuestas.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function agregar (req, res, next){
    try {
        const items = await controlador.agregar(req.body);
        // id has to be fixed in db
        if(req.body.id == 0){
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado con exito';
        }
        respuestas.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
};

async function eliminar (req, res, next){
    try {
        const items = await controlador.eliminar(req.body);
        respuestas.success(req, res, 'Item eliminado', 200);
    } catch (err) {
        next(err);
    }
};

module.exports = router;