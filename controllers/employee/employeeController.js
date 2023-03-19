const db = require("../../db/mysql");
// comes from youtube video
const TABLA = "hw_erp_employees";
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

  function agregar(body) {
    return db.agregar(TABLA, body);
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
