import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'
import { useBoolean } from '@chakra-ui/react'
import { useFirebase } from './firebase'

const AppContext = createContext()

export function AppProvider({ children }) {
    const [darkMode, setDarkMode] = useBoolean()
    const [openAdd, setOpenAdd] = useBoolean()
    const [itemEdit, setItemEdit] = useState({})
    const [editModal, setEditModal] = useState(false)

    // const { sendFirebase } = useFirebase()

    const [itemData, setItemData] = useState(
        [
            {
                title: 'teste',
                description: 'teste',
                priority: 'easy',
                done: false,
                date: new Date().toLocaleDateString(),
                id: 0
            }
        ]
    )

    const addData = (title, description, priority) => {
        setItemData([...itemData,
            {
                title: title,
                description: description,
                priority: priority,
                done: false,
                date: new Date().toLocaleDateString(),
                id: itemData.length
            }
        ])
    }

    const editData = (title, description, priority, id) => {
        setItemData(itemData.map(item => {
            if (item.id === id) {
                return {
                    title: title,
                    description: description,
                    priority: priority,
                    done: false,
                    date: new Date().toLocaleDateString(),
                    id: id
                }
            }
            return item
        }))
    }

    const value = {
        darkMode,
        setDarkMode,
        openAdd,
        setOpenAdd,
        editData,
        addData,
        setItemData,
        itemData,
        setItemEdit,
        itemEdit,
        setEditModal,
        editModal
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
