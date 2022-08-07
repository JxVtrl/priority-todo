import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useGoogleAuth } from '../../context';
// import { Container } from './styles';

export function PrivateRoute({ children }) {
    const [user, setUser] = useState({});
    const { signed } = useGoogleAuth();

    useEffect(() => {
        if(sessionStorage.getItem('@AuthFirebase:user'))
            setUser(JSON.parse(sessionStorage.getItem('@AuthFirebase:user')))
    }, [])

    return (
        <>
            {signed ? children : <Navigate to="/login" replace={true} />}
        </>
    )


}

export function PrivateLoginRoute({ children }) {
    const [user, setUser] = useState({});
    const { signed } = useGoogleAuth();

    useEffect(() => {
        if(sessionStorage.getItem('@AuthFirebase:user'))
            setUser(JSON.parse(sessionStorage.getItem('@AuthFirebase:user')))
    } , [])

    return (
        <>
            {user?.uid? <Navigate to="/" replace={true} /> : children}
        </>
    )
}
