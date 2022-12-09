export const reducer = (state, action) => {
  switch (action.type) {
    case "update-drones": {
      return {
        ...state,
        drones : {...action.payload}
      }
    }

    case "connected" : {
      return {
        ...state,
        connected : true
      }
    }
    
    case "disconnected" : {
      return {
        ...state,
        connected : false
      }
    }

    case "update-mapsize" : {
      return {
        ...state,
        mapsize : {...action.payload}
      }
    }

    case "update-violate" : {
      return {
        ...state,
        violations : {...action.payload}
      }
    }

    default:
      return state
  }
}

export const initialState = {
  connected : false,
  drones : null,
  violateDrones: null,
  mapsize: null,
  violations: null
}