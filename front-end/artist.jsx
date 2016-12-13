import React from 'react';
import $ from 'jquery';

var Artist = React.createClass({
  getInitialState(){
    return({artistNames:null})
  },

  componentDidMount(){
    $.ajax({
      url: '/api/artists'
    })
    .done((data) => {
      this.setState({artistNames:data})
    })
  },

  render(){
    return(
      <ul id="artistList">
        {this.state.artistNames ? this.state.artistNames.map((element, index)=>(<li key={index} >{element.artist.name}</li>)) : null}
      </ul>
    )
  }

})

export default Artist;