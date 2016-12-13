const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

const Artist = require('./models/artist-model');
const Song = require('./models/song-model');
const Genre = require('./models/genre-model');
const Playlist = require('./models/playlist-model')

//this will statically serve up your bundle folder which will allow your index.html file to link to your bundle.js file.
app.use(express.static(path.join(__dirname, '/front-end/bundle')));

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('9999', () => console.log('Listening on port 9999'));


//////////
// YOUR CODE HERE:
//////////

//////////
//ARTISTS
//////////

//1. get all artists ordered from a-z 
app.get('/api/artists', (req, res) => {
  Song.findAll({
    order: ['title'],
    include: [Artist]
  })
  .then((data) => {
    //console.log(data);
    res.send(data);
  })
});

//2. get artist by id
app.get('/api/artists/:id', (req,res) => {
  Artist.findById(req.params.id)
    .then((data) => {
      res.send(data)
    })
})

//3. create a new artist
app.post('/api/artists', (req,res) => {
  Artist.create({
    name: "Cher"
  }).then((data) => {
    res.send(data)
  })
})

//4. delete an artist by id
app.delete('/api/artists/:id', (req, res) => {
  Artist.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.send("Artist Deleted!")
  })
})

//5. update an artist name
app.put('/api/artists/:id/:newName', (req,res) => {
  Artist.update(
    {name: req.params.newName},
    {where: {
      id: req.params.id
      }
    }
  ).then((data) => {
      res.send(data)
  })
})


///////////////
//SONGS
///////////////

//6. get all songs with artist and genre populated
app.get('/api/songs', (req,res) => {
  Song.findAll({include: [Artist, Genre]})
    .then((data)=> {
      res.send(data)
    })
})

//7. get song by id
app.get('/api/songs/:id', (req,res) => {
  Song.findById(req.params.id)
    .then((data) => {
      res.send(data)
    })
})


//#8 doesnt work...
//create a new song that also adds in the genre
// app.post('/api/songs', (req,res) => {
//  Song.create({
//   title: "Falalalala lala lala",
//   youtube_url: "https://www.youtube.com/watch?v=MYvIk1rnsP0"
//  })
//  .then((song) => {
//   //console.log("song", song);
//   Artist.findOrCreate({where: {name: 'Blue'}})
//     .then((data) => {
//     song.addArtist([data])
//     })
//   res.send(song);
//  })
//  .catch((err) => console.log(err));
//})

const postNewSong = (req,res)=>{
  let body = req.body;
  Artist.findOrCreate({
    where: {name: body.artistName}
  })
  .then(artistInfo=>
    Song.create({
      title: body.title,
      youtube_url: body.youtube_url,
      artistId: artistInfo[0].dataValues.id
    })
    .then(songInfo=>{
      Genre.findOrCreate({
        where: {title: body.genre}
      })
      .then(genreInfo=>
        songInfo.addGenres([genreInfo[0].dataValues.id])
      )
    })
  )
  .then(()=>
    res.send('Song with name: '+body.title+', artist: '+body.artistName+', genre: '+body.genre+', youtube_url: '+body.youtube_url+' created!')
  )
}



//9. /api/songs/:id/:newTitle PUT (update) a specific song's title
app.put('/api/songs/:id/:newTitle', (req,res) => {
  Song.update(
    {title: req.body.title},
    {where: {id: req.params.id}
  }).then(function() {
    res.send('edited')
  })
})

//10. delete song by id
app.delete('/api/songs/:id', (req,res) => {
  Song.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.send("Song Deleted!")
  })
})

/////////////////
//PLAYLISTS
/////////////////

//11. /api/playlists GET all playlists with song information fully populated (in other words, should say full song, artist, and genre names, instead of only having the ids)
 app.get('/api/playlists', (req,res) =>{
  Playlist.findAll({
    include: [{
    model: Song,
    include: [Artist, Genre]}]
  })
  .then(function(data) {
    res.send(data);
  })

 });

//12. get a playlist by id
app.get('/api/playlists/:id', (req,res) => {
  Playlist.findById(req.params.id)
    .then((data) => {
      res.send(data)
    })
})

//13. /api/playlists POST (create) a new playlist
app.post('/api/playlists', (req,res) => {
  PLaylist.create({ 
    title: req.body.title, 
    deadline: new Date() })
  .then(function(task) {
      res.send(task);
     })
    
});


//14. delete playlist by id
app.delete('/api/playlists/:id', (req,res) => {
  Playlist.destroy({
    where: {
      id: req.params.id
    }
  }).then((data) => {
    res.send("Playlist Deleted!")
  })
})

/////////////
//GENRES
/////////////

//15. /api/genres GET all genres, ordered a-z
app.get('/api/genres', (req, res) => {
  Genre.findAll({
    order: ['title'],
    include: [Song]
  })
  .then((data) => {
    //console.log(data);
    res.send(data);
  })
});

//16. get genre by id
app.get('/api/genres/:id', (req,res) => {
  Genre.findById(req.params.id)
    .then((data) => {
      res.send(data)
    })
})

//17. /api/genres POST (create) a new genre
app.post('/api/genres', (req, res) => {
  Genre.create({title:req.body.title})
        .then((data)=>{
        res.send(data)
    })
});

//18. update genres name
app.put('/api/genres/:id/:newGenre', (req,res) => {
  Genre.update(
    {title: req.params.newGenre},
    {where: {
      id: req.params.id
      }
    }
  ).then((data) => {
      res.send(data)
  })
})

//updated your app.get('/') router in your server to be a catchall (aka add a *). Make sure you put it AFTER (at the end) of all your API routes, this will basically make your express server send back your React frontend app (which is loaded when you send index.html) whenever anyone navigates to any URL that's not caught by your API.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front-end/index.html'));
});



