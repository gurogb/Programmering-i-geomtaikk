import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { bufferTool, unionTool, intersectionTool, differenceTool, lineLengthTool, areaTool } from '../../mapTools/tools.js'
import Collapsible from 'react-collapsible';
import './menu.css'
import menuIcon from '../../icons/menu-icon.png'

import ToolMenu from './ToolMenu.jsx'
import { HideIcon, ShowIcon } from '../../icons'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function LayerDiv(props){
  const { name, active} = props
  if (active){
    return <div className="active-layer layer">  {name} <ShowIcon/> </div>
  }else{
    return (
      <div className="disabled-layer layer">  {name} <HideIcon/> </div>
    )
  }
}

class MapMenu extends Component{
    constructor(props){
        super(props)

        this.handleBufferSubmit = this.handleBufferSubmit.bind(this)
        this.handleOtherSubmit = this.handleOtherSubmit.bind(this)
        this.handleMeasurementSubmit = this.handleMeasurementSubmit.bind(this)

    }


  renderLayerList = (layers, visibleLayers) => {
    return layers.map(layer => {
      const active = visibleLayers.includes(layer)
      const layerTag = layer.id
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
              console.log("ToolType not recognized")
          }
          if (newLayer) this.props.addLayer(newLayer)

  }

  handleMeasurementSubmit(event){
      event.preventDefault()
      const toolType = event.target.className
      const layerID = event.target.getElementsByClassName("measurement-select")[0].value
      const layer = this.props.layers.find(layer => layer.id === layerID)

      switch (toolType){
          case 'line-lenght-form':
            lineLengthTool(layer.source.data, layerID)
            break
          case 'area-form':
            areaTool(layer.source.data, layerID)
            break
          default:
              console.log("ToolType not recognized")
          }
  }

  render() {
    const {layers, visibleLayers} = this.props

    const layerMenuHeading = <div className="collapsible-header"><h1>Lag</h1> <img className="menu-header-icon"src = {menuIcon}/></div>
    const toolsMenuHeading = <div className="collapsible-header"><h1>Verktøy</h1> <img className= "menu-header-icon" src = {menuIcon}/></div>

    return (
        <div className="menu-container">

            <div className="layers-menu-container" >
                <Collapsible trigger={layerMenuHeading} open={true}>
                    {this.renderLayerList(layers, visibleLayers)}
                </Collapsible>

            </div>
            <div className="tools-menu-container">
                <Collapsible trigger={toolsMenuHeading} open={true}>
                    <ToolMenu
                        bufferToolSumbit={this.handleBufferSubmit}
                        handleSubmit={this.handleOtherSubmit}
                        measurementSubmit={this.handleMeasurementSubmit}
                        layers={layers}
                        />
                </Collapsible>
            </div>
            <div className="acknowledgement">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" >CC 3.0 BY</a></div>

        </div>

    )
  }
}

export default MapMenu
