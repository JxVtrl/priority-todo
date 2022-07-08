import React from 'react';
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
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import { Add } from '../../components'

export function Home() {
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


      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa ex quaerat minima incidunt tempore consequatur deserunt velit nisi, voluptate provident recusandae autem odio voluptatibus dolorem accusamus optio sapiente a unde.
          </AccordionPanel>
        </AccordionItem>

        {/* <AccordionItem>
        </AccordionItem> */}
      </Accordion>

      <Add />
    </Flex>
  );
}

