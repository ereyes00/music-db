const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//////////
// YOUR CODE HERE:
//////////
var Artist = sequelizeConnection.define('artist',{
  name: Sequelize.STRING(100)
});

module.exports = Artist;
