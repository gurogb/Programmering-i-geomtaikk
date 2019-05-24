import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './map.css'

import { connect } from "react-redux";
import { updateLayers } from "../actions";

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map extends Component{
  state = {
      lng: 10.390457,
      lat: 63.42442,
      zoom: 13,
      layers:[]
  };

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const layers = this.props.layers

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    this.map = map;

    /*map.on('load', function () {
      layers.forEach( layer => {
        console.log("Adding layer" + layer.id)
        map.addLayer(layer)
      })

    });*/

     map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  componentDidUpdate(){
    this.updateMapLayers()
  }

  updateMapLayers(props){
    this.deleteLayers()
    this.addLayers()
  }

  deleteLayers(){
    console.log(this.state)
    for (let layer of this.state.layers) {
      if(this.map.getSource(layer.id)){
        console.log("Removing layer" + layer)
      }
    }
  }

  addLayers(){
    for(let layer of this.props.layers){
      switch (layer.features[0].geometry.type) {
        case 'Polygon':
          console.Log("Adding polygonlayer")
          break
        case 'Multipolygon':
          console.Log("Adding Multipolygon")
          break
        case 'MultiLineString':
          console.Log("Adding MultiLineString")
          break
        case 'Point':
          console.Log("Adding Pointlayer")
          break;
        default:
          console.log("Layer type not identified!" + layer.type)
      }
    }
  }

  render() {

    return (
        <div className="map" ref={el => this.mapContainer = el} />
    );
  }
}

Map.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    visibility: PropTypes.string.isRequired,
    layerColor: PropTypes.string.isRequired,
    layerBorder:PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

const mapStateToProps = (state) => ({
  layers: state.layers
});

const mapDispatchToProps = {
  updateLayers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
