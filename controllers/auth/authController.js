const db = require("../../db/mysql");
const bcrypt = require('bcrypt');
const auth = require('../../auth');

const TABLA = "hw_erp_auth";

module.exports =  function (dbInyectada) {
  let db = dbInyectada;
  // if db sent is currupt head to db/mysql
  if (!db) {
    db = require("../../db/mysql");
  }

  async function login(usuario, password){
    const data = await db.query(TABLA, {usuario: usuario});

    return bcrypt.compare(password, data.password)
      .then(resultado  => {
        if(resultado === true){
          // Generar un token
          return auth.asignarToken({...data})
        } else {
          throw new Error('Information Invalid');
        }
      })
  }

  async function agregar(data) {
    const authData = {
      id: data.id,
    }

    if(data.usuario){
      authData.usuario = data.usuario;
    }
    if(data.password){
      authData.password = await bcrypt.hash(data.password.toString(), 5);
    }
    return db.agregar(TABLA, authData);
  }

  return {
    agregar,
    login
  };
};
