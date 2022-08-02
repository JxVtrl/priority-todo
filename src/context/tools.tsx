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
        if(date < 10) {
            return `0${date}`
        } else {
            return date
        }
    }

    const formatDateBack = (date: any, hour: any) => {
        if(date)
            for (let i = 0; i < date.length; i++) {
                if (hour && date) {
                    const newDate = date[i].split('-')
                    if (newDate[0].length === 4) {
                        return `${newDate[0]}-${newDate[1]}-${newDate[2]}T${hour[i]}`
                    } else {
                        return `${newDate[2]}-${newDate[1]}-${newDate[0]}T${hour[i]}`
                    }
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
