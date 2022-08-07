import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'
import { db } from '../services/firebaseConfig'
import {
    doc,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'
import { useBoolean } from '@chakra-ui/react'
const FirebaseContext = createContext()
import { useTools } from './tools'

export function FirebaseProvider({ children }) {
    const [users, setUsers] = useState([])
    const [todos, setTodos] = useState([])
    const [load, setLoad] = useBoolean(false)
    const { createObject } = useTools()

    // referencia para as duas collections
    const usersCollection = collection(db, 'users')
    const todosCollection = collection(db, 'to-do')
    // const adminCollection = collection(db, 'admin')

    useEffect(() => {
        getUsers()
        getTodos()
    }, [])


    // REQUEST
    const getUsers = async () => {
        const data = await getDocs(usersCollection)
        setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    const getTodos = async () => {
        setLoad.on()
        const data = await getDocs(todosCollection)

        setTodos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        data.docs.map(doc => {
            const dates = doc.data().date
            dates.sort((a, b) => {
                return new Date(a) - new Date(b)
            })
            
            setTodos(prev => {
                return prev.map(todo => {
                    if (todo.id === doc.id) {
                        return { ...todo, date: dates }
                    }
                    return todo
                }
                )
            })
        })
        
        setLoad.off()
    }

    // POST
    const addTodo = async (name, description, priority, date, badge) => {
        await addDoc(
            todosCollection,
            createObject(name, description, priority, date, badge)
        )
        getTodos()
    }

    const editTodo = async (item) => {
        setLoad.on()
        await
        updateDoc(
            doc(todosCollection, item.id),
            createObject(item.name, item.description, item.priority, item.date, item.badge, item.done, item.id )
        )
        getTodos()
    }

    const updateDone = async (item) => {
        setLoad.on()
        await
            updateDoc(
                doc(todosCollection, item.id),
                createObject(item.name, item.description, item.priority, item.date, !item.done, item.id, item.badge)
            )
        getTodos()
    }

    const deleteTodo = async item => {
        setTodos(todos.filter(todo => todo.id !== item.id))
        await deleteDoc(doc(db, "to-do", item.id));
    }


    const value = {
        todos,
        addTodo,
        deleteTodo,
        editTodo,
        updateDone,
        load,
        users,
        setTodos
    }

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

export function useFirebase() {
    return useContext(FirebaseContext)
}
