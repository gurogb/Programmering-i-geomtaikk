import React, { Component } from 'react'
import './map.css'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

/**
Map-komponenten holder logikken og funksjonaliteten for mapbox-kartet, dets senterkoordinater og zoom-nivå og rendringen av kartlagene på kartete
*/
class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
        lat: 63.4176,
        lng: 10.4057,
        zoom: 14.53
    };
  }

  //Lifecycle-method som kalles automatisk når komponenten er 'mounted'
  componentDidMount() {
      this.initializeMap("mapbox://styles/mapbox/light-v10")
  }

  //Leggere til et kartlag layer på kartet
  addNewLayer(layer){
      this.map.addLayer(layer)
  }

  //Endrer bakgrunnskartet til stilen gitt av 'mapID'
  changeBackroundMap(mapID){
      this.map.remove()
      this.initializeMap(mapID)

  }

  /**Funksjon for å initialisere et mapbox-kart. Oppretter et kart med gitte senterkoordinater og zoomnivå tatt
    fra komponentens state, og et gitt bakgrunnkart
  */

  initializeMap(background){
      const { lng, lat, zoom } = this.state
      const  allAvailableLayers  = this.props.allAvailableLayers

      const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: background,
          center: [lng, lat],
          zoom: zoom,
        });

        //Legger på alle kartlag når kartet er 'loadet'
        map.on('load', function () {
            allAvailableLayers.forEach( layer => {
                map.addLayer(layer)
            })
        })

        //Sørger for å endre state når brukeren zoomere og panorerer kartet
       map.on('move', () => {
        const { lng, lat } = map.getCenter()
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        })
      })

      //Legger til kontroll for zoom, og tilt
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      this.map = map
  }

  //Kalles når det skal oppdateres hvilke lag som skal vises på kartet.
  //LayersToAdd er lagene som ikke synes på kartet fra før men skal legges til, og layersToHidee er kartene som vises på kartet som ikke skal vises lengre
  updateLayers(layersToAdd, layersToHide){
    this.hideLayers(layersToHide)
    this.showLayers(layersToAdd)
  }

  //Skjuler de gitte lagene, layers, på kartet
  hideLayers(layers){
    layers.forEach(id => {
      const layer = this.map.getLayer(id)
      this.map.setLayoutProperty(layer.id, 'visibility', 'none')
    })
  }

  //Skrur på 'visibility' for de gitte lagene, layers, slik at de vises på kartet
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
