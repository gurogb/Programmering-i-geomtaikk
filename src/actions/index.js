import store from '../'

export const addLayer = layer => ({
  type: 'ADD_LAYER',
  layer
})

export const deleteLayer = layer => ({
  type: 'DELETE_LAYER',
  layer
})

export const updateLayers = layer => ({
  type: 'UPDATE_LAYERS',
  layer
})
