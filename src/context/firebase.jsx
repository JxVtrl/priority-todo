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

    const createObject = (name, description, priority, date, done=false, id=null) =>{
        return {
            name,
            description,
            priority,
            date,
            done,
            id
        }
    }

    const addTodo = async (name, description, priority, date) => {
        await addDoc(todosCollection, createObject(name, description, priority, date))
        getTodos()
    }

    const editTodo = async (item) => {
        await
            updateDoc(
                doc(todosCollection, item.id),
                createObject(item.name, item.description, item.priority, item.date, item.done, item.id)
            )
        getTodos()
    }

    const deleteTodo = async item => {
        setTodos(todos.filter(todo => todo.id !== item.id))
        await deleteDoc(doc(db, "to-do", item.id));
    }

    const updateDone = async (item) => {
        await
            updateDoc(
                doc(todosCollection, item.id),
                createObject(item.name, item.description, item.priority, item.date, !item.done, item.id)
            )
        getTodos()
    }


    const value = {
        todos,
        addTodo,
        deleteTodo,
        editTodo,
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
