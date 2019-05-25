import * as turf from '@turf/turf'

export function bufferTool(layer, bufferDistance, layerName){
    const bufferData =  turf.buffer(layer, bufferDistance, {units: 'meters'})
    return createLayerFromGeoJSON(bufferData, 'fill', layerName + bufferDistance)
}

export function unionTool(l1, l2, layerName){
    const data =  turf.union(l1, l2)
    if(data === null){
        alert("NULL")
        return
    }else{
        return createLayerFromGeoJSON(data, 'fill', layerName + '-union')
    }

}

export function intersectionTool(l1, l2, layerName){
    const data=  turf.intersect(l1, l2)
    if(data === null){
        alert("NULL")
        return
    }else{
        return createLayerFromGeoJSON(data, 'fill', layerName + '-intersection')
    }

}

export function differenceTool(layer, layerToSubtract, layerName){
    const data =  turf.difference(layer, layerToSubtract)
    if(data === null){
        alert("NULL")
        return
    }else{
        return createLayerFromGeoJSON(data, 'fill', layerName + '-difference')
    }

}

export function createLayerFromGeoJSON(data, layerType, layerName){
    switch (layerType){
        case 'fill':
            return createFillLayer(data, layerName)
        case 'circle':
            return createPointLayer(data, layerName)
        case 'line':
            return createLineLayer(data, layerName)
        default:
            console.log("LayerType not recognized")
    }
}


function createFillLayer(data, layerName){
    return {
      "id": layerName,
      "type": "fill",
      "source": {
        type: 'geojson',
        data: data
      },
      "paint": {
        "fill-color": "#ff69b4",
        "fill-opacity": 0.4
      },
      "layout":{
        "visibility":"visible"
      }
    }
}

function createPointLayer(data, layerName){
    return {
      "id": layerName,
      "type": "circle",
      "source": {
        type: 'geojson',
        data: data
      },
      "paint": {
          "circle-color": "#e23f04",
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff"
      },
      "layout":{
        "visibility":"visible"
      }
    }
}

function createLineLayer(data, layerName){
    return  {
      "id": layerName,
      "type": "fill",
      "source": {
        type: 'geojson',
        data: data
      },
      "paint": {
         "line-color": "#ff69b4",
         "line-width": 1
      },
      "layout":{
        "visibility":"visible"
      }
    }
}
