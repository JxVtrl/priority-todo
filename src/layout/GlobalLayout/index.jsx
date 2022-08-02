import React from 'react';
import { Flex } from '@chakra-ui/react'
import { useTools } from '../../context';
import { Header, Footer } from '../../section';

export function GlobalLayout({ children }) {
    const { darkMode } = useTools()

    return (
        <Flex
            bgColor={darkMode ? '#313453' : '#fff'} 
            w='100vw'
            h='100vh'
            maxW='900px'
            margin='0 auto'
            direction='column'
            flexDir='column'
            transition='all 0.2s linear'
        >
            <Header />
            {children}
            <Footer />
        </Flex>
  );
}