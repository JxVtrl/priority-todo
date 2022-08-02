import React from 'react';

import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
} from '@chakra-ui/react';

import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Logo } from '../../components';
import { useApp, useFirebase } from '../../context';

export function Header() {  
  return (
    <Flex
      w='100%'
      h='80px'
      align='center'
      justify='space-between'
      p='0 20px'
    >
      <Logo /> 
      <HeaderContent />
    </Flex>
  );
}

function HeaderContent() {
  const { load } = useFirebase()

  return (
    <Flex
      gap='24px'
      align='center'
      h='100%'
    >
      {load && (
        <Flex mr='25px'>
          <Spinner
            speed='0.35s'
            thickness='4px'
            emptyColor='gray.200'
            color='blue.500' size='md'
            position='absolute'
            alignSelf='center'
          />
        </Flex>
      )}
      <HeaderIcons />
      <HeaderFilter />
    </Flex>
  )
}

function HeaderIcons() {
  const { darkMode, setDarkMode } = useApp()

  return (
    <Flex
      onClick={setDarkMode.toggle}
      cursor='pointer'
      w='25px'
      h='25px'
    >
      {darkMode ?
        <SunIcon w='100%' h='100%' color='white' />
        :
        <MoonIcon w='100%' h='100%' />
      }
    </Flex>
  )
}

function HeaderFilter() {
  const { darkMode } = useApp()

  return (
    <Flex>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon w='100%' h='100%' />}
          border='none'
          w='25px'
          h='28px'
          color={darkMode ? 'white' : 'black'}
        />
        <MenuList>
          <MenuItem>A-Z</MenuItem>
          <MenuItem>Date</MenuItem>
          <MenuItem>Priority</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}

