import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,

  Menu,
  MenuButton,
  MenuList,
  MenuItem,


  IconButton,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import { Add } from '../../components'
import { useApp } from '../../context';

export function Home() {
  const { itemData } = useApp()
  const [data, setData] = useState([])

  useEffect(() => {
    setData(itemData)
  },[itemData])


  return (
    <Flex
      padding='0 20px'
      flexDir='column'
      gap='12px'
      position='relative'
    >
      <Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            padding='5px'
            borderRadius='5px'
            
          />
          <MenuList>
            <MenuItem>Priority</MenuItem>
            <MenuItem>Date</MenuItem>
            <MenuItem>...</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Accordion allowToggle display='flex' flexDir='column' gap='15px'>
        {data.map((item, idx) => (
          <AccordionItem key={idx} >
            <AccordionButton
              cursor='pointer'
              borderRadius='5px' borderColor={item.priority === 0 ? 'green' : item.priority === 1 ? 'yellow' : 'red'}
            >
              <Box flex='1' textAlign='left'>
                <Text>
                  {item.title}
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>
                {item.description}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}

      </Accordion>

      <Add />
    </Flex>
  );
}

