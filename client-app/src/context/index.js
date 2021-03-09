import { createContext, useReducer } from 'react'

import AppReducer, { initialState } from '../reducers'

export const AppContext = createContext()

/**
 * @name AppProvider
 * @param {Object} param0 
 */
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}
export default AppProvider