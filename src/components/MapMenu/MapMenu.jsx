import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import './menu.css'
//import FileDrop from '../../fileDrop/FileDrop.jsx'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class MapMenu extends Component{
  state = {
      layers: this.props.layers,
      layersOn: this.props.visibleLayers
  };

  componentDidMount() {
  }

  renderLayerList = (layers) => {
    const layersOn = this.state.layersOn
    return layers.map(layer => {
      return(
        <div
          onClick={(e) => this.handleLayerOnClick(layer.id, e)}
          key={layer.id}
          >
          {layersOn.includes(layer.id) ? <span className="active-layer menu-layer">{layer.id}</span> : <span className="disabled-layer menu-layer">{layer.id}</span>}
        </div>
      )
    })
  }

  handleLayerOnClick = (id, event) => {
    const layersOn = this.state.layersOn
    let updatedLayers = []
    if(layersOn.includes(id)){
      console.log("Turning off layer: " + id)
      updatedLayers = layersOn.filter(a =>  a !== id)
    }else{
      updatedLayers = [...layersOn, id]
      console.log("Turning on layer:" + id)
    }

    this.setState({
      layersOn: updatedLayers
    })

    this.props.layersChanged(updatedLayers)

  }

  render() {
    const layers = this.state.layers

    return (
        <div className="layers-menu-container" >
          <h1>Lag</h1>
          {this.renderLayerList(layers)}
        </div>
    );
  }
}

export default MapMenu
