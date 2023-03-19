const db = require("../../db/mysql");
// comes from youtube video
const auth = require('../auth');

const TABLA = "hw_erp_user";
// comes from youtube video
module.exports = function (dbInyectada) {
    let db = dbInyectada;
    // if db sent is currupt head to db/mysql
    if(!db){
        db = require('../../db/mysql');
    }

  function todos() {
    return db.todos(TABLA);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }

  async function agregar(body) {
    const usuario = {
      id: body.id,
      name: body.name,
      age: body.age,
      activo: body.activo
    }
    const respuesta = await db.agregar(TABLA, usuario);

    var insertId = 0;
    if(body.id == 0){
      insertId = respuesta.insertId;
    } else {
      insertId = body.id;
    }

    var respuesta2 = '';
    if(body.usuario || body.password){
      respuesta2 = await auth.agregar({
        id: insertId,
        usuario: body.usuario,
        password: body.password
      })
    }

    return respuesta2;
  }

  function eliminar(body) {
    return db.eliminar(TABLA, body);
  }

  return {
    todos,
    uno,
    agregar,
    eliminar,
  };
};
