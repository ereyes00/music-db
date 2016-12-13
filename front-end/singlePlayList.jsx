import React from 'react';
import $ from 'jquery';

var DisplayOneList = React.createClass({
  getInitialState(){
    return({
      singleListData:null,
    })
  },

  extractDataFromPlaylistObject(){
    var playListHeader = [];
    var songArray = this.state.singleListData.songs;
    var genreArray = [];
    var unpackingArray = [];

      //adding title and date created 
    playListHeader.push(this.state.singleListData.title);
    playListHeader.push(this.state.singleListData.createdAt);

      //will iterate though songs array and pull out data
    songArray.forEach((songs,indx) => {
      playListHeader.push(songs.title, songs.artist.name, songs.youtube_url);
      genreArray.push(songs.genres);
    });

      //will iterate through genres arrays within array
    for(var i = 0; i < genreArray.length; i++){
      for(var j = 0; j < genreArray[i].length; j++){
        unpackingArray.push(genreArray[i][j].title);
      }
    }

      //removing genre duplicates and adding to playListHeader
    unpackingArray.sort()
    for(var i = 0; i < unpackingArray.length; i++){
      if(unpackingArray[i] == unpackingArray[i+1]){
        unpackingArray.splice(i, 1);
      }
    }
    playListHeader.push(unpackingArray);

    return playListHeader;
  },

  componentDidMount(){
    var url = document.URL.split('/');
    var id = url[url.length - 1];
    $.ajax({
      url:'/api/playlists/'
    })
    .done((data) => {
      data.map((element, indx) => {
          //DO NOT TRIPLE EQUAL BELOW, they are not meant to be the same data type
        if(element.id == id){
          this.setState({singleListData:element});
        } 
      })
    })
  },

  render(){
    if(this.state.singleListData){
      var readyToDisplay = this.extractDataFromPlaylistObject();
      console.log(readyToDisplay);
    }

    return(
      <ul>
      {this.state.singleListData ? readyToDisplay.map((element, index)=>(<li key={index} >{element}</li>)) : (<li>Loading...</li>)}
      </ul>
    )
  }
})

export default DisplayOneList;