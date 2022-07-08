import React from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { SunIcon, MoonIcon, AddIcon } from '@chakra-ui/icons';
import { Logo } from '../../components';
import { useApp } from '../../context';

export function Header() {  
  const { darkMode, setDarkMode, setOpenAdd } = useApp()

  return (
    <Flex
      w='100%'
      h='60px'
      bg='#'
      align='center'
      justify='space-between'
      p='0 20px'
    >
      <Logo /> 
      <Flex
        gap='24px'
      >
        <Flex
          onClick={setDarkMode.toggle}
          cursor='pointer'
          w='25px'
          h='25px'
        >
          {!darkMode ?
            <MoonIcon w='100%' h='100%' /> :
            <SunIcon w='100%' h='100%' color='white' />
          }
        </Flex>
        <Flex
          cursor='pointer'
          w='25px'
          h='25px'
          onClick={setOpenAdd.toggle}
        >
          <AddIcon w='100%' h='100%' color={darkMode && 'white'} />
        </Flex>
      </Flex>
    </Flex>
  );
}
