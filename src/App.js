import React, { Component } from 'react'
import './App.css'
import Map from './Map/Map.jsx'
import MapMenu from './MapMenu/MapMenu.jsx'

import { Provider } from 'react-redux'

import Posts from './components/Posts'
import PostsForm from './components/PostsForm'

import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <div className="main-container">
          <div className="menu-container">
            <MapMenu />
          </div>
          <div className="map-container">
            <Map />
          </div>
        </div>
      </div>
      </Provider>
    );
  }
}

export default App;

//https://www.youtube.com/watch?v=93p3LxR9xfM
//45 minutes
//Error with connect
/*<PostsForm/>
<Posts/>*/

/**/
