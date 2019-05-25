import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { bufferTool, unionTool, intersectionTool, differenceTool } from '../../mapTools/tools.js'

import './menu.css'

import ToolMenu from './ToolMenu.jsx'
import { HideIcon, ShowIcon } from '../../icons'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function LayerDiv(props){
  const { name, active} = props
  if (active){
    return <div className="active-layer layer"> <ShowIcon/> {name} </div>
  }else{
    return (
      <div className="disabled-layer layer"> <HideIcon/> {name}</div>
    )
  }
}

class MapMenu extends Component{
    constructor(props){
        super(props)

        this.handleBufferSubmit = this.handleBufferSubmit.bind(this)
        this.handleOtherSubmit = this.handleOtherSubmit.bind(this)


    }


  renderLayerList = (layers, visibleLayers) => {
    return layers.map(layer => {
      const active = visibleLayers.includes(layer)
      const layerTag = layer.id + ", " + layer.type;
      return(
        <div
          onClick={(e) => this.handleLayerOnClick(layer.id, e)}
          key={layer.id}
          >
          <LayerDiv active={active} name={layerTag} />
        </div>
      )
    })
  }



  handleLayerOnClick = (id, event) => {
    const {layers, visibleLayers} = this.props
    let updatedLayers = []
    const clickedLayer = layers.find( layer => layer.id === id)
    if(visibleLayers.includes(clickedLayer)){
      updatedLayers = visibleLayers.filter(l =>  l.id !== id)
    }else{
      updatedLayers = [...visibleLayers, clickedLayer]
    }

    this.props.layersChanged(updatedLayers)

  }

  handleBufferSubmit(event){
      event.preventDefault()
      const layerID = event.target.getElementsByClassName("bufferSelect")[0].value
      const bufferDist = event.target.getElementsByClassName("bufferDist")[0].value
      const layer = this.props.layers.find(layer => layer.id === layerID)
      const bufferedLayer = bufferTool(layer.source.data, bufferDist, layerID)
      this.props.addLayer(bufferedLayer)
  }

  handleOtherSubmit(event){
      event.preventDefault()
      const toolType = event.target.className
      const layerOneID = event.target.getElementsByClassName("select-one")[0].value
      const layerTwoID = event.target.getElementsByClassName("select-two")[0].value

      const layerOne = this.props.layers.find(layer => layer.id === layerOneID)
      const layerTwo = this.props.layers.find(layer => layer.id === layerTwoID)

      let newLayer;

      switch (toolType){
          case 'intersection-form':
              newLayer = intersectionTool(layerOne.source.data, layerTwo.source.data, layerOneID +"-" + layerTwoID)
              break
          case 'difference-form':
              newLayer = differenceTool(layerOne.source.data, layerTwo.source.data, layerOneID +"-" + layerTwoID)
              break
          case 'union-form':
              newLayer = unionTool(layerOne.source.data, layerTwo.source.data, layerOneID +"-" + layerTwoID)
              break
          default:
              console.log("LayerType not recognized")
          }
          if (newLayer) this.props.addLayer(newLayer)

  }

  render() {
    const {layers, visibleLayers} = this.props

    return (
        <div className="menu-container">
          <div className="layers-menu-container" >
            <h1>Lag</h1>
            {this.renderLayerList(layers, visibleLayers)}


          </div>
          <div className="tools-menu-container">
            <h1>Verktøy</h1>
            <ToolMenu
                bufferToolSumbit={this.handleBufferSubmit}
                handleSubmit={this.handleOtherSubmit}
                unionTool={unionTool}
                intersectionTool={intersectionTool}
                differenceTool={differenceTool}
                layers={layers}
                />
          </div>
          <div className="add-layer-container">
              Slippe filer her?
          </div>
          <div className="acknowledgement">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" >CC 3.0 BY</a></div>

        </div>

    )
  }
}

export default MapMenu
