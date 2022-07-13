import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGoogleAuth } from '../../context';
// import { Container } from './styles';

export function PrivateRoute({ children }) {
    const { signed } = useGoogleAuth()
    return (
        <>
            {signed ? <Outlet /> : <Navigate to='/login' />}
        </>    
    );
}
