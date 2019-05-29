import React, { Component } from 'react'
import './map.css'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
        lat: 63.4176,
        lng: 10.4057,
        zoom: 14.53
    };
  }

  componentDidMount() {
      this.initializeMap("mapbox://styles/mapbox/light-v10")
  }

  addNewLayer(layer){
      this.map.addLayer(layer)
  }

  changeBackroundMap(mapID){
      this.map.remove()
      this.initializeMap(mapID)

  }

  initializeMap(background){
      const { lng, lat, zoom } = this.state
      const  allAvailableLayers  = this.props.allAvailableLayers

      const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: background,
          center: [lng, lat],
          zoom: zoom,
        });
        map.on('load', function () {
            allAvailableLayers.forEach( layer => {
                map.addLayer(layer)
            })
        })
       map.on('move', () => {
        const { lng, lat } = map.getCenter()
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        })
      })
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      this.map = map
  }

  updateLayers(layersToAdd, layersToHide){
    this.hideLayers(layersToHide)
    this.showLayers(layersToAdd)
  }

  hideLayers(layers){
    layers.forEach(id => {
      const layer = this.map.getLayer(id)
      this.map.setLayoutProperty(layer.id, 'visibility', 'none')
    })
  }

  showLayers(layers){
    layers.forEach(id => {
      const layer = this.map.getLayer(id)
      this.map.setLayoutProperty(layer.id, 'visibility', 'visible')
    })
  }


  render() {
    return (
        <div className="map" ref={el => this.mapContainer = el} />
    );
  }
}



export default Map
