import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'
import { db } from '../services/firebaseConfig'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { useTools } from './tools'
const FirebaseContext = createContext()

export function FirebaseProvider({ children }) {
    const { formatDate } = useTools()
    const [users, setUsers] = useState([])
    const [todos, setTodos] = useState([])

    // referencia para as duas collections
    const usersCollection = collection(db, 'users')
    const todosCollection = collection(db, 'to-do')

    const getUsers = async () => {
        const data = await getDocs(usersCollection)
        setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    const getTodos = async () => {
        const data = await getDocs(todosCollection)
        setTodos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getUsers()
        getTodos()
    }, [])

    const addTodo = async (name, description, priority, date, hour) => {
        const todo = {
            name,
            description,
            priority,
            date: formatDate(date),
            hour,
            done: false,
        }
        await addDoc(todosCollection, todo)
        getTodos()
    }

    const updateTodo = async (item) => {
        const todo = {
            name: item.name,
            description: item.description,
            priority: item.priority,
            date: item.date,
            hour: item.hour,
            done: item.done,
            id: item.id,
        }
        await updateDoc(doc(todosCollection, item.id), todo)
        getTodos()
    }

    const updateDone = async (item) => {
        const todo = {
            name: item.name,
            description: item.description,
            priority: item.priority,
            date: item.date,
            hour: item.hour,
            id: item.id,
            done: !item.done,
        }
        await updateDoc(doc(todosCollection, item.id), todo)
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
        updateTodo,
        updateDone

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
