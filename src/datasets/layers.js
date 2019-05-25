import {gloshaugen, campusrunden, kantiner, hoyskoleparken, frimerket} from './geojsondata.js'


const layer_gloshaugen = {
    "id": "Gløshaugen",
    "type": "fill",
    "source": {
      type: 'geojson',
      data: gloshaugen
    },
    "paint": {
      "fill-color": "#ff69b4",
      "fill-opacity": 0.4
    },
    "layout":{
      "visibility":"none"
    }
}

const layer_hoyskoleparken = {
    "id": "Høyskoleparken",
    "type": "fill",
    "source": {
      type: 'geojson',
      data: hoyskoleparken
    },
    "paint": {
      "fill-color": "#ff69b4",
      "fill-opacity": 0.4
    },
    "layout":{
      "visibility":"none"
    }
}

const layer_frimerket = {
    "id": "Frimerket",
    "type": "fill",
    "source": {
      type: 'geojson',
      data: frimerket
    },
    "paint": {
      "fill-color": "#ff69b4",
      "fill-opacity": 0.4
    },
    "layout":{
      "visibility":"none"
    }
}

const layer_campusrunden = {
  "id": "Campusrunden",
  "type": "line",
  "source": {
    type: 'geojson',
    data: campusrunden
  },
  "paint": {
    "line-color": "#ff69b4",
    "line-width": 1
  },
  "layout":{
    "visibility":"none"
  }
}

const layer_kantiner = {
  "id": "Kantiner",
  "type": "circle",
  "source": {
    type: 'geojson',
    data: kantiner
  },
  "paint": {
    "circle-color": "#e23f04",
    "circle-radius": 6,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff"
  },
  "layout":{
    "visibility":"none"
  }
}




const allLayers = [ layer_gloshaugen, layer_campusrunden, layer_kantiner, layer_hoyskoleparken, layer_frimerket]

export default allLayers
