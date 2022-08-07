import React from 'react';
// import { Footer } from '../../section'
import { Flex } from '@chakra-ui/react';

export function LoginLayout({ children }) {
    return (
        <Flex
            bgColor='#fff'
            w='100vw'
            h='100vh'
            margin='0 auto'
            direction='column'
            flexDir='column'
            transition='all 0.2s linear'
        >
            
            {children}
        </Flex>
    );
}
