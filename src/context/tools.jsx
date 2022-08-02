import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'

const ToolsContext = createContext({})

export function ToolsProvider({ children }) {
    const formatHours = (hours, minutes) => {
        if (hours < 10)
            if (minutes < 10)
                return `0${hours}:0${minutes}`
            else
                return `0${hours}:${minutes}`
        return `${hours}:${minutes}`
    }
    
    const formatDate = (day, month, year) => {
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }

        return `${day}/${month}/${year}`
    }

    const formatDateBack = (date, hour) => {
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

    const createObject = (
        name,
        description,
        priority,
        date,
        done = false,
        id = null,
    ) => {
        return {
            name,
            description,
            priority,
            date,
            done,
            id
        }
    }
    
    const value = {
        formatDate,
        formatHours,
        formatDateBack,
        createObject

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
