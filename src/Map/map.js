import React from 'react'
import mapboxgl from 'mapbox-gl'
import '../Styles/map.css'

const token = 'pk.eyJ1IjoiZ3Vyb2diIiwiYSI6ImNpeWxjM20yZTAwM3gyd2pyMjNkcGhmbG0ifQ.py-0lvMqieNiRogr_wIn4A';

class Map extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = token

    new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/light-v9'
    })
  }

  render() {
    return (
      <div className='Map' ref={(x) => { this.container = x }}>
      </div>
    )
  }
}

export default Map
