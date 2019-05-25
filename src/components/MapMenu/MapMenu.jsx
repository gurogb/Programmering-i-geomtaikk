import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import './menu.css'
//import FileDrop from '../../fileDrop/FileDrop.jsx'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class MapMenu extends Component{
  state = {
      allAvailableLayers: this.props.layers,
      layersOn: this.props.visibleLayers
  }

  renderLayerList = (layers) => {
    const layersOn = this.state.layersOn
    return layers.map(layer => {
      return(
        <div
          onClick={(e) => this.handleLayerOnClick(layer.id, e)}
          key={layer.id}
          >
          {layersOn.includes(layer) ? <span className="active-layer menu-layer">{layer.id}</span> : <span className="disabled-layer menu-layer">{layer.id}</span>}
        </div>
      )
    })
  }

  handleLayerOnClick = (id, event) => {
    const { layersOn , allAvailableLayers } = this.state
    let updatedLayers = []
    const clickedLayer = allAvailableLayers.find( layer => layer.id === id)
    if(layersOn.includes(clickedLayer)){
      updatedLayers = layersOn.filter(l =>  l.id !== id)
    }else{
      updatedLayers = [...layersOn, clickedLayer]
    }

    this.setState({
      layersOn: updatedLayers
    })

    this.props.layersChanged(updatedLayers)

  }

  render() {
    //console.log("Rendering MapMenu")
    const layers = this.state.allAvailableLayers
    //console.log(layers)

    return (
        <div className="layers-menu-container" >
          <h1>Lag</h1>
          {this.renderLayerList(layers)}
          <h1>Verktøy</h1>
        </div>
    );
  }
}

export default MapMenu
