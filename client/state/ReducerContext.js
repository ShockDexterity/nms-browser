import { createContext } from 'react'

export const ReducerContext = createContext(null)
export const DispatchContext = createContext(null)

export const REDUCER_INIT = {
  display: '',
  title: '',
  showDialog: '',
  showSnackbar: false,
  snackbarSeverity: 'warning',
  snackbarMessage: 'Snackbar message not set',
  planet: null,
  refreshPlanets: true,
  refreshSystems: true,
  planetFilters: {},
  systemFilters: {}
}

export function planetReducer (state, action) {
  switch (action.type) {
    case 'REFRESH_PLANETS':
      return { ...state, refreshPlanets: true }

    case 'STOP_REFRESH_PLANETS':
      return { ...state, refreshPlanets: false }

    case 'REFRESH_SYSTEMS':
      return { ...state, refreshSystems: true }

    case 'STOP_REFRESH_SYSTEMS':
      return { ...state, refreshSystems: false }

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
        showDialog: `${action._for}_details`
      }

    case 'ADD':
      return {
        ...state,
        dialogTitle: 'Add a new Planet',
        showDialog: `add_${action._for}`
      }

    case 'EDIT':
      return {
        ...state,
        dialogTitle: action.title,
        showDialog: `edit_${action._for}`
      }

    case 'CLOSE_DIALOG':
      return { ...state, showDialog: '' }

    case 'SET_PLANET':
      return { ...state, planet: action.planet }

    case 'SET_SYSTEM':
      return { ...state, system: action.system }

    default:
      return state
  }
}
