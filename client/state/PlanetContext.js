import { createContext } from 'react'

export const PlanetContext = createContext(null)
export const DispatchContext = createContext(null)

export const REDUCER_INIT = {
  display: '',
  title: '',
  showDialog: '',
  showSnackbar: false,
  snackbarSeverity: 'warning',
  snackbarMessage: 'Snackbar message not set',
  planet: null,
  refresh: true
}

export function planetReducer (state, action) {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, refresh: true }

    case 'STOP_REFRESH':
      return { ...state, refresh: false }

    case 'SHOW_SNACKBAR':
      return { ...state, showSnackbar: true }

    case 'HIDE_SNACKBAR':
      return { ...state, showSnackbar: false }

    case 'SET_SNACKBAR_SEVERITY':
      return { ...state, snackbarSeverity: action.severity }

    case 'SET_SNACKBAR_MESSAGE':
      return { ...state, snackbarMessage: action.message }

    case 'DETAILS':
      return {
        ...state,
        dialogTitle: action.title,
        showDialog: 'details'
      }

    case 'ADD':
      return {
        ...state,
        dialogTitle: 'Add a new Planet',
        showDialog: 'add'
      }

    case 'EDIT':
      return {
        ...state,
        dialogTitle: action.title,
        showDialog: 'edit'
      }

    case 'CLOSE_DIALOG':
      return { ...state, showDialog: '' }

    case 'SET_PLANET':
      return { ...state, planet: action.planet }

    default:
      return state
  }
}
