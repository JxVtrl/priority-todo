import React from 'react';
import { Button } from '@chakra-ui/react'
import { useGoogleAuth } from '../../context';

export function Login() {
  const { signInGoogle } = useGoogleAuth()

  return (
    <div>
      <Button onClick={() => signInGoogle()}>
        Login with Google
      </Button>
    </div>
  );
}

