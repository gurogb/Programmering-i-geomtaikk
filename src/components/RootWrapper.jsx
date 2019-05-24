import React, { Component } from 'react'
import Map from './Map/Map.jsx'
import MapMenu from './MapMenu/MapMenu.jsx'
import allLayers from '../datasets/layers.js'


class RootWrapper extends Component {

  constructor(props) {
    super(props);

    this.handleLayerChange = this.handleLayerChange.bind(this);

    this.state = {
      layers: allLayers,
      visibleLayers: []
    };
  }

  handleLayerChange(updatedLayers){
    console.log("Wrapper saying layers have changed!! visibleLayers:")
    console.log(updatedLayers)
    this.setState({
      visibleLayers: updatedLayers
    })
  }

  render() {
    const { layers, visibleLayers } = this.state;
    return (
      <div className="RootWrapper">
       <div className="main-container">
         <div className="menu-container">
           <MapMenu layers={layers} visibleLayers={visibleLayers} layersChanged={this.handleLayerChange}/>
         </div>
         <div className="map-container">
           <Map  layers={visibleLayers} />
         </div>
       </div>
     </div>
    )
  }
}

export default RootWrapper;
