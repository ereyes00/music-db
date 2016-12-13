const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');
const Genre = require('./genre-model');

//////////
// YOUR CODE HERE:
//////////
var Song = sequelizeConnection.define('song',{
  title: Sequelize.STRING(250),

  youtube_url: {type: Sequelize.STRING,
    validate: {
    isUrl: true,
    max: 50,
    min: 1
    }
  }
})

Song.belongsTo(Artist);
Song.belongsToMany(Genre, { through: 'song_genre'});
Genre.belongsToMany(Song, { through: 'song_genre'});

module.exports = Song;
