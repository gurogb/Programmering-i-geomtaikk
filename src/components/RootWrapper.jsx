import React, { Component } from 'react'
import Map from './Map/Map.jsx'
import MapMenu from './MapMenu/MapMenu.jsx'
import allLayers from '../datasets/layers.js'



class RootWrapper extends Component {

  constructor(props) {
    super(props);

    this.handleLayerChange = this.handleLayerChange.bind(this);
    this.newLayerAdded = this.newLayerAdded.bind(this);

    this.mapElement = React.createRef()

    this.state = {
      allAvailableLayers: allLayers,
      visibleLayers: [],
    };
  }

  newLayerAdded(layer){
      const {allAvailableLayers, visibleLayers} = this.state
      this.setState({
        visibleLayers: [...visibleLayers, layer],
        allAvailableLayers: [...allAvailableLayers, layer]
      })

      this.mapElement.current.addNewLayer(layer)
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
    //const buffered = bufferTool(allAvailableLayers[4].source.data, 5)
    //console.log(buffered)

    //allAvailableLayers[4].source.data = buffered


    return (
      <div className="RootWrapper">
       <div className="main-container">
         <MapMenu layers={allAvailableLayers} visibleLayers={visibleLayers} layersChanged={this.handleLayerChange} addLayer={this.newLayerAdded}/>
         <div className="map-container">
           <Map allAvailableLayers={allAvailableLayers} ref={this.mapElement} />
         </div>
       </div>
     </div>
    )
  }
}

export default RootWrapper;
