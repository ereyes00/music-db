import React from 'react';

const Song = React.createClass({
    render(){
        console.log('this.props.songs:',this.props.songs)
        return
            (<div>
                {
                    this.props.songs.map((song,indx)=> {
                         return (<li key={indx}>
                                 </li>)
                })
                }
            </div>
            )
    }
})
export default Song;