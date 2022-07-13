import React from 'react';
import { Flex } from '@chakra-ui/react'
import { useApp } from '../../context';
import { Header, Footer } from '../../section';

export function GlobalLayout({ children }) {
    const { darkMode } = useApp()

    return (
        <Flex
            bgColor={darkMode ? '#313453' : '#fff'} 
            w='100vw'
            h='100vh'
            flexDir='column'
            overflow='hidden'
            transition='all 0.2s linear'
        >
            <Header />
            {children}
            <Footer />
        </Flex>
  );
}