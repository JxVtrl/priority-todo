import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'

const ToolsContext = createContext({})

export function ToolsProvider({ children }) {
    
    const formatDate = (date) => {
        const d = new Date(date)
        let string = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        let stringSplit = string.split('/') 

        if (Number(stringSplit[0]) < 10) {
            stringSplit[0] = `0${stringSplit[0]}`
        } else if (Number(stringSplit[1]) < 10) {
            stringSplit[1] = `0${stringSplit[1]}`
        } else if (Number(stringSplit[2]) < 10) {
            stringSplit[2] = `0${stringSplit[2]}`
        }

        return stringSplit.join('/')
    }

    const value = {
        formatDate

    }

    return (
        <ToolsContext.Provider value={value}>
            {children}
        </ToolsContext.Provider>
    )
}

export function useTools() {
    return useContext(ToolsContext)
}
