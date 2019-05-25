import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import './menu.css'
import Collapsible from 'react-collapsible'

import ToolMenu from './ToolMenu.jsx'
import { HideIcon, ShowIcon } from '../../icons'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function LayerDiv(props){
  const { name, active} = props
  if (active){
    return <div className="active-layer layer"> <ShowIcon/> {name}</div>
  }else{
    return (
      <div className="disabled-layer layer"> <HideIcon/> {name}</div>
    )
  }
}

class MapMenu extends Component{
  state = {
      allAvailableLayers: this.props.layers,
      layersOn: this.props.visibleLayers
  }

  renderLayerList = (layers) => {
    const layersOn = this.state.layersOn
    return layers.map(layer => {
      const active = layersOn.includes(layer)
      return(
        /*<Collapsible trigger={layer.id}
          key={layer.id}
          >
          <div
            onClick={(e) => this.handleLayerOnClick(layer.id, e)}
            >
            {layersOn.includes(layer) ? <ShowIcon/> : <HideIcon />}
          </div>
        </Collapsible>*/
        <div
          onClick={(e) => this.handleLayerOnClick(layer.id, e)}
          key={layer.id}
          >
          <LayerDiv active={active} name={layer.id} />
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
        <div className="menu-container">
          <div className="layers-menu-container" >
            <h1>Lag</h1>
            {this.renderLayerList(layers)}


          </div>
          <div className="tools-menu-container">
            <h1>Verktøy</h1>
            <ToolMenu />
          </div>
          <div className="acknowledgement">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

        </div>

    )
  }
}

export default MapMenu
