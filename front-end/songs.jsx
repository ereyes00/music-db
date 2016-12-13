import React from 'react';
import $ from 'jquery';
import Song from './song.jsx';

const Songs = React.createClass({
    getInitialState(){
        return ({
            songs: {}
        })
    },
    componentDidMount(){
        $.ajax({
            url: '/api/songs',
            method: 'GET'
        }).done((data)=>{
            //console.log('data:',data)
            this.setState({songs: data})
        })
    },
    render(){
        //console.log(this.state.songs)
        return(
            <div>
                <h1>Songs List</h1>
                <ul>
                </ul>
            </div>
        )
    }
})
export default Songs;
                        // <Song {this.state.songs}/>