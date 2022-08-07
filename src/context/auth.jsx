import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithCustomToken,
    signInWithCredential
} from "firebase/auth";
import { app } from '../services/firebaseConfig'
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const AuthGoogleContext = createContext()

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
        const sessionUser = sessionStorage.getItem("@AuthFirebase:user");

        if (sessionToken && sessionUser) {
            setUser(JSON.parse(sessionUser));
        }
        
    }, [])

    useEffect(() => {
        if (user.uid) {
            navigate("/")
        }
    } , [user])


    const setInSessionStorage = (user, token) => {
        sessionStorage.setItem('@AuthFirebase:token', token);
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
    }

    const signInGoogle = async () => {
        await signInWithPopup(auth, provider)
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

    const signInUid = async (uid) => {
        console.log(uid)
        await signInWithCredential(auth, uid)
            .then((result) => {
                const token = result.credential.accessToken;
                const user = result.user;

                setUser(user);
                setInSessionStorage(user, token);
            }).catch((error) => {
                console.log(error)
            });
    }

    const value = {
        signInGoogle,
        signInUid,
        signed: !!user.uid,
        user: user,
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