import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router, Route, browserHistory,IndexRoute} from 'react-router';

import NavBar from './navbar';
import Artist from './artist';
import Songs from './songs';
import DisplayPlaylists from './playlists';
import DisplayOneList from './singlePlayList';

var App = React.createClass({

render(){ 
  return(
    <div>
      <NavBar />
      {this.props.children}
    </div>
  )
 }

})

render(
   <Router history={browserHistory}>
      <Route path="/" component={App}>
       <IndexRoute component={Artist}/>
       <Route path="/songs" component={Songs} />
       <Route path="/playlists/:name/:id" component={DisplayOneList} />
       <Route path="/playlists" component={DisplayPlaylists} />
      </Route>
   </Router>,
  document.getElementById('app')
);
      // <Route path="/artist" component={Artist} />
      // <Route path="/createplaylist" component={NewPlayList} />