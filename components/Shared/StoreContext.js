import React from 'react'

const initialState = {
  sidebarOpen: true
}

const Store = React.createContext(initialState)
const useStore = () => React.useContext(Store)



const reducer = (state, action) => {
  switch(action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen}
    case "SIDEBAR_OPEN":
      return {...state, sidebarOpen: action.payload}
    default:
      return state;
  }
}

const StoreProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      {children}
    </Store.Provider>
  )
}

export {StoreProvider, useStore}