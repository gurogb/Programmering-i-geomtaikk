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
      zoom: 13
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom
    });

    map.on('load', function () {

      map.addLayer({
        "id": "Fotruter",
        "source-layer": "Fotruter-5g72iz",
        "type": "line",
        "source": {
          type: 'vector',
          url: 'mapbox://gurogb.9bemfz63'

        },
        "paint": {
          "line-color": "#ff69b4",
          "line-width": 1
        }
      });
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
