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
  system: null,
  systemList: [],
  refreshPlanets: true,
  refreshSystems: true,
  planetFilters: {
    biomeOrSpecial: '',
    stellar: '',
    otherResource1: '',
    otherResource2: ''
  },
  systemFilters: {
    faction: '',
    econType: '',
    econStr: '',
    conflict: '',
    exosuit: false,
    v3: false,
    atlas: false,
    blackhole: false
  }
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
        dialogTitle:
          'Add New ' + (action._for === 'planet' ? 'Planet' : 'System'),
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

    case 'SET_SYSTEM_LIST':
      return { ...state, systemList: action.list }

    case 'SET_PLANET_FILTER':
      return getPlanetFilter(state, action)

    case 'SET_SYSTEM_FILTER':
      return getSystemFilter(state, action)

    default:
      return state
  }
}

function getPlanetFilter (state, action) {
  if (action.biomeOrSpecial) {
    return {
      ...state,
      planetFilters: {
        ...state.planetFilters,
        biomeOrSpecial: action.biomeOrSpecial
      }
    }
  }
  else if (action.stellar) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, stellar: action.stellar }
    }
  }
  else if (action.otherResource1) {
    return {
      ...state,
      planetFilters: {
        ...state.planetFilters,
        otherResource1: action.otherResource1
      }
    }
  }
  else if (action.otherResource2) {
    return {
      ...state,
      planetFilters: {
        ...state.planetFilters,
        otherResource2: action.otherResource2
      }
    }
  }
  else {
    return { ...state }
  }
}

function getSystemFilter (state, action) {
  if (action.faction) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, faction: action.faction }
    }
  }
  else if (action.econType) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, econType: action.econType }
    }
  }
  else if (action.econStr) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, econStr: action.econStr }
    }
  }
  else if (action.conflict) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, conflict: action.conflict }
    }
  }
  else if (action.exosuit) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, exosuit: action.exosuit }
    }
  }
  else if (action.v3) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, v3: action.v3 }
    }
  }
  else if (action.atlas) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, atlas: action.atlas }
    }
  }
  else if (action.blackhole) {
    return {
      ...state,
      planetFilters: { ...state.planetFilters, blackhole: action.blackhole }
    }
  }
  else {
    return { ...state }
  }
}
