import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'

const ToolsContext = createContext({})

export function ToolsProvider({ children }) {
    
    const formatDate = (date: any) => {
        const newDate = date.split('-')
        return `${newDate[2]}/${newDate[1]}/${newDate[0]}`
    }

    const formatDateBack = (date: any, hour: any) => {
        if (hour && date){
            const newDate = date.split('-')
            if (newDate[0].length === 4) {
                return `${newDate[0]}-${newDate[1]}-${newDate[2]}T${hour}`
            } else {
                return `${newDate[2]}-${newDate[1]}-${newDate[0]}T${hour}`
            }
        }
       
    }

    const value = {
        formatDate,
        formatDateBack

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
