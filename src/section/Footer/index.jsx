import React from 'react';
import { Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useApp } from '../../context';
// import { Container } from './styles';

export function Footer() {
  const { setOpenAdd, darkMode } = useApp()

  return (
    <Flex
      h='80px'
      bgColor={darkMode ? '#848687d2' :'#eff5f8d3'}
      backdropFilter='blur(24.0353px)'
      pos='relative'
      borderTopRightRadius='15px'
      borderTopLeftRadius='15px'
      flexDir='row'
      justify='space-between'
      padding='0 45px'
      gap='50%'
      transition='all 0.2s linear'
    >
    <Flex
      cursor='pointer'
      w='50px'
      h='50px'
      onClick={setOpenAdd.toggle}
      bgColor='#5A95FF'
      boxShadow='0px 20px 30px rgba(74, 144, 226, 0.393541)'
      borderRadius='50%'
      p='10px'
      margin='0 auto'
      pos='absolute'
      right='0'
      left='0'
      bottom='60%'
      transition='all 0.2s linear'
      _hover={{
        bgColor: '#5a94ffd0',
      }}
      >
        <AddIcon w='100%' h='100%' color={'white'} />
      </Flex>
      <Flex w='100%' h='100%' align='center' justify='center' >
        <i className="fa-regular fa-calendar fa-2xl" style={{ 'color': darkMode ? 'white' : 'black', 'transition': 'all 0.2s linear'}} />
      </Flex>
      <Flex w='100%' h='100%' align='center' justify='center'>
        <i className="fa-solid fa-user fa-2xl" style={{ 'color': darkMode ? 'white' : 'black', 'transition': 'all 0.2s linear'}} />
      </Flex>
    </Flex>
  );
}
