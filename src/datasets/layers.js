const layer_fotruter = {
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
  },
  "layout":{
    "visibility":"none"
  }
}

const layer_brannstasjoner = {
  "id": "Brannstasjoner",
  "source-layer": "brannstasjoner-0eish2",
  "type": "circle",
  "source": {
    type: 'vector',
    url: 'mapbox://gurogb.0rro77ny'

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

const layer_bygninger = {
  "id": "Bygninger",
  "source-layer": "fkb-5wbegm",
  "type": "fill",
  "source": {
    type: 'vector',
    url: 'mapbox://gurogb.6j3row1r'
  },
  "paint": {
    "fill-color": "#ff69b4",
  },
  "layout":{
    "visibility":"none"
  }
}

const layer_befolkning = {
  "id": "Befolkning",
  "source-layer": "befolkning-6yprqr",
  "type": "fill",
  "source": {
    type: 'vector',
    url: 'mapbox://gurogb.776rza6q'
  },
  "paint": {
    "fill-color": "#ff69b4",
  },
  "layout":{
    "visibility":"none"
  }
}

const allLayers = [layer_fotruter, layer_bygninger, layer_befolkning, layer_brannstasjoner]

export default allLayers
