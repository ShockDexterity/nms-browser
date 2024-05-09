import { createContext } from 'react'

export const PlanetContext = createContext(null)
export const DispatchContext = createContext(null)

export const REDUCER_INIT = {
  display: '',
  title: '',
  show: false,
  planet: null,
  refresh: true
}

export function planetReducer (state, action) {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, refresh: true }

    case 'STOP_REFRESH':
      return { ...state, refresh: false }

    case 'SHOW':
      return { ...state, show: true }

    case 'HIDE':
      return { ...state, show: false }

    case 'DETAILS':
      return {
        ...state,
        display: 'details',
        title: action.title,
        show: true
      }

    case 'ADD':
      return {
        ...state,
        display: 'add',
        title: 'Add a new Planet',
        show: true
      }

    case 'EDIT':
      return {
        ...state,
        display: 'edit',
        title: action.title,
        show: true
      }

    case 'REQUEST':
      return { ...state, requestedID: action.id }

    case 'RECEIVE':
      return { ...state, planet: action.planet, show: true }

    case 'SET_PLANET':
      return { ...state, planet: action.planet }

    default:
      return state
  }
}

export async function getPlanet (id, dispatch) {
  const fetchPlanet = async () => {
    try {
      const response = await fetch(`./planets/${id}`)
      const planet = await response.json()
      dispatch({ type: 'RECEIVE', planet })
    }
    catch (error) {
      console.error(error)
    }
  }

  try {
    const planet = await fetchPlanet()
    dispatch({ type: 'RECEIVE', planet })
  }
  catch (error) {
    console.error(error)
    dispatch({ type: 'RECEIVE', planet: null })
  }
}
