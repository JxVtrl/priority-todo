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
    const [itemDelete, setItemDelete] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)

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
                id: itemData.id
            }
        ])
    }


    const value = {
        darkMode,
        setDarkMode,
        openAdd,
        setOpenAdd,
        addData,
        setItemData,
        itemData,
        setItemEdit,
        itemEdit,
        setEditModal,
        editModal,
        setItemDelete,
        itemDelete,
        deleteModal,
        setDeleteModal,
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
