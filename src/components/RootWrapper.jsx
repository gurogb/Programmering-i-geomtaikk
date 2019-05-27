import React, { Component } from 'react'
import Map from './Map/Map.jsx'
import MapMenu from './MapMenu/MapMenu.jsx'
import allLayers from '../datasets/layers.js'


class RootWrapper extends Component {

  constructor(props) {
    super(props);

    this.handleLayerChange = this.handleLayerChange.bind(this);
    this.newLayerAdded = this.newLayerAdded.bind(this);
    this.handleBackroundChange = this.handleBackroundChange.bind(this);

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
        allAvailableLayers: [...allAvailableLayers, layer],
      })

      this.mapElement.current.addNewLayer(layer)
  }

  handleLayerChange(updatedLayers){
    const currentVisibleLayers = this.state.visibleLayers
    updatedLayers.map(layer => layer.layout.visibility = "visible")
    this.setState({
      visibleLayers: updatedLayers
    })

    const newLayers = updatedLayers.filter(layer => !currentVisibleLayers.includes(layer)).map(layer => layer.id)
    const layersToHide = currentVisibleLayers.filter(layer => !updatedLayers.includes(layer)).map(layer => layer.id)

    this.mapElement.current.updateLayers(newLayers, layersToHide)
  }

  handleBackroundChange(event){
      const newStyle = event.target.value;
      console.log(newStyle)
      this.setState({
          backgroundMap: newStyle
      })
      this.mapElement.current.changeBackroundMap(newStyle)
  }

  render() {
    const { allAvailableLayers, visibleLayers} = this.state

    return (
      <div className="RootWrapper">
       <div className="main-container">
          <div className="map-menu-container">
              Mapbox bakgrunnskart
              <form >
                  <select className="backround-map-input" onChange={this.handleBackroundChange} defaultValue="mapbox://styles/mapbox/light-v10">
                      <option value="mapbox://styles/mapbox/streets-v11">Streets</option>
                      <option value='mapbox://styles/mapbox/outdoors-v11'>Outdoors</option>
                      <option value='mapbox://styles/mapbox/light-v10'>Light</option>
                      <option value='mapbox://styles/mapbox/dark-v10'>Dark</option>
                      <option value='mapbox://styles/mapbox/satellite-v9'>Satellite</option>
                  </select>
              </form>
          </div>
         <MapMenu layers={allAvailableLayers} visibleLayers={visibleLayers} layersChanged={this.handleLayerChange} addLayer={this.newLayerAdded}/>
         <div className="map-container">
           <Map allAvailableLayers={allAvailableLayers} visibleLayers={visibleLayers} ref={this.mapElement} />
         </div>
       </div>
     </div>
    )
  }
}

export default RootWrapper;
