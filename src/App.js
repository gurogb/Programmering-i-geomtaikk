import React, { Component } from 'react'
import './App.css'
import Map from './Map/Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="main-container">
          <div className="menu-container">
            <p> Her kommer det en meny</p>
          </div>
          <div className="map-container">
            <Map />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
