// This file is suppose to be a constructor for DB to change db faster
// Check this video
// https://www.youtube.com/watch?v=5DJ0kJZalig&list=PLnfMiP0v59hAUA6QJNKBwKJyq5_gFkCYL&index=5
const db = require('../../db/mysql');
const ctrl = require('./userController');

module.exports = ctrl(db);