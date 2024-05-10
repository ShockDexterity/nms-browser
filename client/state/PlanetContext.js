import { createContext } from 'react'

export const PlanetContext = createContext(null)
export const DispatchContext = createContext(null)

export const REDUCER_INIT = {
  display: '',
  title: '',
  show_dialog: false,
  show_snackbar: false,
  planet: null,
  refresh: true
}

export function planetReducer (state, action) {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, refresh: true }

    case 'STOP_REFRESH':
      return { ...state, refresh: false }

    case 'SHOW_DIALOG':
      return { ...state, show_dialog: true }

    case 'HIDE_DIALOG':
      return { ...state, show_dialog: false }

    case 'SHOW_SNACKBAR':
      return { ...state, show_snackbar: true }

    case 'HIDE_SNACKBAR':
      return { ...state, show_snackbar: false }

    case 'SET_SNACKBAR_SEVERITY':
      return { ...state, snackbar_severity: action.severity }

    case 'SET_SNACKBAR_MESSAGE':
      return { ...state, snackbar_message: action.message }

    case 'DETAILS':
      return {
        ...state,
        display: 'details',
        dialog_title: action.title,
        show_dialog: true
      }

    case 'ADD':
      return {
        ...state,
        display: 'add',
        dialog_title: 'Add a new Planet',
        show_dialog: true
      }

    case 'EDIT':
      return {
        ...state,
        display: 'edit',
        dialog_title: action.title,
        show_dialog: true
      }

    case 'REQUEST':
      return { ...state, requestedID: action.id }

    case 'RECEIVE':
      return { ...state, planet: action.planet, show_dialog: true }

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
