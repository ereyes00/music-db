import React from 'react';
import $ from 'jquery';

var DisplayPlayLists = React.createClass({
  getInitialState(){
    return({playlistNames:null})
  },

  componentDidMount(){
    $.ajax({
      url:'/api/playlists'
    })
    .done((data) => {
      this.setState({playlistNames:data})
    })
  },

  render(){
    return(
        <ul id="allLists">
          {this.state.playlistNames ? this.state.playlistNames.map((element, index)=>(<li key={index} ><a href={"/playlists/"+element.title+"/"+element.id}>{element.title}</a></li>)) : null}
        </ul>
    )
  }
})

export default DisplayPlayLists;