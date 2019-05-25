import React, { Component } from 'react'
import Map from './Map/Map.jsx'
import MapMenu from './MapMenu/MapMenu.jsx'
import allLayers from '../datasets/layers.js'


class RootWrapper extends Component {

  constructor(props) {
    super(props);

    this.handleLayerChange = this.handleLayerChange.bind(this);

    this.mapElement = React.createRef()

    this.state = {
      allAvailableLayers: allLayers,
      visibleLayers: [],
    };
  }

  handleLayerChange(updatedLayers){
    const currentVisibleLayers = this.state.visibleLayers
    this.setState({
      visibleLayers: updatedLayers
    })

    const newLayers = updatedLayers.filter(layer => !currentVisibleLayers.includes(layer)).map(layer => layer.id)
    const layersToHide = currentVisibleLayers.filter(layer => !updatedLayers.includes(layer)).map(layer => layer.id)

    this.mapElement.current.updateLayers(newLayers, layersToHide)
  }

  render() {
    const { allAvailableLayers, visibleLayers } = this.state

    return (
      <div className="RootWrapper">
       <div className="main-container">
         <div className="menu-container">
           <MapMenu layers={allAvailableLayers} visibleLayers={visibleLayers} layersChanged={this.handleLayerChange}/>
         </div>
         <div className="map-container">
           <Map allAvailableLayers={allAvailableLayers} ref={this.mapElement} />
         </div>
       </div>
     </div>
    )
  }
}

export default RootWrapper;
