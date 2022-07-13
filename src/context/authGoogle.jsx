import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { app } from '../services/firebaseConfig'

const provider = new GoogleAuthProvider();

const AuthGoogleContext = createContext()

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

            if (sessionToken && sessionUser) {
                setUser(JSON.parse(sessionUser));
            }
        }
    }, [])


    const setInSessionStorage = (user, token) => {
        sessionStorage.setItem('@AuthFirebase:token', token);
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
    }

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                const token = credential.accessToken;
                const user = result.user;
                
                setUser(user);
                setInSessionStorage(user, token);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const value = {
        signInGoogle,
        signed: !!user,
    }

    return (
        <AuthGoogleContext.Provider value={value}>
            {children}
        </AuthGoogleContext.Provider>
    )
}

export function useGoogleAuth() {
    return useContext(AuthGoogleContext)
}