import React from 'react';

const NavBar = React.createClass({

  render(){
    return(
      <div id="navbar">
        <h1>Browse</h1>
        <span><a href="http://localhost:9999/">Artist</a></span>
        <span><a href="http://localhost:9999/songs">Songs</a></span>
        <span><a href="http://localhost:9999/playlists">Playlists</a></span>
        <span><a href="http://localhost:9999/newplaylist">Make A New Playlist</a></span>
      </div>
    )
  }
})

export default NavBar;