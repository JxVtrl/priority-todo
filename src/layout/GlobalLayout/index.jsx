import React from 'react';
import { Flex } from '@chakra-ui/react'
import { useApp } from '../../context';
import { Header } from '../../section';

export function GlobalLayout({ children }) {
    const { darkMode } = useApp()

    return (
        <Flex
            bgColor={darkMode ? '#000' : '#fff'} 
            w='100vw'
            h='100vh'
            flexDir='column'
        >
            <Header />
            {children}
        </Flex>
  );
}