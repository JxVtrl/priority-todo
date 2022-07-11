import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useBoolean } from '@chakra-ui/react'

// import { useNavigate } from 'react-router-dom'

// import { auth } from '../services/firebase/firebase.js'
// import { db } from '../services/firebase/firebase.js'
// import { doc, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [darkMode, setDarkMode] = useBoolean()
    const [openAdd, setOpenAdd] = useBoolean()

    const [itemData, setItemData] = useState([])

    const addData = (title, description, priority) => {
        setItemData([...itemData,
            {
                title: title,
                description: description,
                priority: priority
            }
        ])
    }

    const value = {
        darkMode,
        setDarkMode,
        openAdd,
        setOpenAdd,
        addData,
        itemData
        
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export function useApp() {
    return useContext(AppContext)
}
