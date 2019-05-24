import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import allLayers from '../datasets/layers.js'
import './menu.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class MapMenu extends Component{
  state = {
      layers: allLayers,
      layersOn: []
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
    if(layersOn.includes(id)){
      console.log("Turning off layer: " + id)
      const l = layersOn.filter(l => l.id !== id)
      console.log(l)
      this.setState({
        layersOn: layersOn.filter(a =>  a !== id)
      })
    }else{
      this.setState({
        layersOn: [...layersOn, id]
      })
      console.log("Turning on layer:" + id)
    }
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
