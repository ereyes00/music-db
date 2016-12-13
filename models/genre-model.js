const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

//////////
// YOUR CODE HERE:
//////////
var Genre = sequelizeConnection.define('genre', {
  title: {type: Sequelize.STRING,
    validate: {
      //isAlpha: true,
      max:100,
      min:1
    }}
});


module.exports = Genre;
