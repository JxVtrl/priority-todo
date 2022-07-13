import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/img/logo.png'
// import { Container } from './styles';

export function Logo() {
    return (
        <Box w='44px' h='35px' align='center' ml='10px'>
            <Image src={logo} alt="logo" w='100%' h='100%' />
        </Box>
    );
}
