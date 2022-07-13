import React from 'react';

import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';

import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Logo } from '../../components';
import { useApp } from '../../context';

export function Header() {  
  const { darkMode, setDarkMode, setOpenAdd } = useApp()

  return (
    <Flex
      w='100%'
      h='80px'
      align='center'
      justify='space-between'
      p='0 20px'
    >
      <Logo /> 
      <Flex
        gap='24px'
        align='center'
      >
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
      </Flex>
    </Flex>
  );
}
