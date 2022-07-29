import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from 'react'
import { db } from '../services/firebaseConfig'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
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

    const addTodo = async (name, description, priority, date) => {
        const todo = {
            name,
            description,
            priority,
            date: formatDate(date),
        }

        setTodos([...todos, todo])
        await addDoc(todosCollection, todo)
    }

    const deleteTodo = async item => {
        setTodos(todos.filter(todo => todo.id !== item.id))
        await deleteDoc(doc(db, "to-do", item.id));
    }



    const value = {
        todos,
        addTodo,
        deleteTodo

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
