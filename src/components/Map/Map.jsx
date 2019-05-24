import React, { Component } from 'react'
import './map.css'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends Component{
  constructor(props) {
    super(props);
    this.state = {
      lng: 10.390457,
      lat: 63.42442,
      zoom: 13,
      layers: props.layers
    };
  }

  componentDidMount() {
    const { lng, lat, zoom, layers } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    map.on('load', function () {
      layers.forEach( layer => {
        console.log("Adding layer" + layer.id)
        map.addLayer(layer)
      })
    });



     map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
        <div className="map" ref={el => this.mapContainer = el} />
    );
  }
}

export default Map
