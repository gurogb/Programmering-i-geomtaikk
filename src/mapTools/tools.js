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
        if(isMultiPolygon(l1.geometry.coordinates) && isMultiPolygon(l2.geometry.coordinates)){

            const polygonsl1 = multiPolygonToPolygons(l1.geometry.coordinates)
            const polygonsl2 = multiPolygonToPolygons(l2.geometry.coordinates)

            return createLayerFromGeoJSON(getIntersectingPolygonsFeatureFromArraysOfFeatures(polygonsl1, polygonsl2), 'fill', layerName + '-intersection')
        }else if(isMultiPolygon(l1.geometry.coordinates)){

            const polygons = multiPolygonToPolygons(l1.geometry.coordinates)
            return createLayerFromGeoJSON(getIntersectingPolygonsFeature(l2, polygons), 'fill', layerName + '-intersection')
        }else if(isMultiPolygon(l2.geometry.coordinates)){

            const polygons = multiPolygonToPolygons(l2.geometry.coordinates)
            return createLayerFromGeoJSON(getIntersectingPolygonsFeature(l1, polygons), 'fill', layerName + '-intersection')
        }else{
            alert("NULL")
            return
        }
    }else{
        return createLayerFromGeoJSON(data, 'fill', layerName + '-intersection')
    }
}

export function lineLengthTool(layer, layerName){
    const length = turf.length(layer, {units: 'meters'});
    alert("Lengden av " + layerName + " er " + length.toFixed(2) + " meter");
}

export function areaTool(layer, layerName){
    const area = turf.area(layer);
    alert("Arealet av " + layerName + " er " + area.toFixed(2) + " kvm");
}

function getIntersectingPolygonsFeatureFromArraysOfFeatures(arrayOfFeaturesOne, arrayOfFeaturesTwo){

    let intersectedPolygons = []
    for (var i = 0; i < arrayOfFeaturesOne.length; i++) {
        for (var j = 0; j < arrayOfFeaturesTwo.length; j++) {
            console.log(arrayOfFeaturesOne[i])
            console.log(arrayOfFeaturesTwo[j])
            const data = turf.intersect(arrayOfFeaturesOne[i], arrayOfFeaturesTwo[j])
            console.log(data)
            if(data !== null) intersectedPolygons.push(data.geometry.coordinates)
        }
    }
    const  multiPoly = turf.multiPolygon(intersectedPolygons)
    console.log(multiPoly)
    return multiPoly
}

function getIntersectingPolygonsFeature(singleFeature, arrayOfFeatures){
    let intersectedPolygons = []
    for (var i = 0; i < arrayOfFeatures.length; i++) {
        const data = turf.intersect(singleFeature, arrayOfFeatures[i])
        if(data !== null) intersectedPolygons.push(data.geometry.coordinates)
    }
    const  multiPoly = turf.multiPolygon(intersectedPolygons)
    return multiPoly
}

function isMultiPolygon(coordinates){
    const x = coordinates[0][0][0]
    const type = typeof x
    if(type  !== "number"){
        return true
    }else{
        return false
    }
}

function multiPolygonToPolygons(coordinates){
    let arrayOfPolygons = []

    for (const pol of coordinates) {
        const polygon = turf.polygon(pol)
        arrayOfPolygons.push(polygon)
    }
    return arrayOfPolygons
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
      "type": "line",
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
