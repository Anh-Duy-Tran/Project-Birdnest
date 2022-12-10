import React, { useEffect } from "react";
import { reducer, initialState } from "./reducer.js";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

export const DroneContext = React.createContext(initialState);

export const DroneProvider = ({ children }) => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    socket.on('connect', () => {
      dispatch({type : "connected"})
    });
    
    socket.on('disconnect', () => {
      dispatch({type : "disconnect"})
    });
    
    socket.on('update', ({ drones, violate }) => {
      dispatch({type : "update-drones", payload : JSON.parse(drones)});
      dispatch({type : "update-violate", payload : JSON.parse(violate)});
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('update');
    };
  }, []);

  return (
    <DroneContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </DroneContext.Provider>
  )
}