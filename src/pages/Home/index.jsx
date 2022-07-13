import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Add } from '../../components'
import { useApp } from '../../context';
export function Home() {
  const { itemData, setItemData } = useApp()
  const [data, setData] = useState([])

  useEffect(() => {
    setData(itemData)
    console.log(itemData)
  }, [itemData])
  
  const handleDone = (id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        item.done = !item.done
      }
      return item
    })
    setItemData(newData)
  }


  return (
    <Flex
    h="100%"
    padding='0 20px'
    flexDir='column'
    gap='12px'
    position='relative'
    >
      <Accordion allowToggle display='flex' flexDir='column'>
        {data.map((item, idx) => (
          <AccordionItem key={idx} >
            <AccordionButton
              cursor='pointer'
              h='45px'
              padding='0 15px'
              borderRadius='5px'
              border='none'
            >
              <Flex gap='10px' align='center' w='100%'>
                <Box
                  w='10px'
                  h='10px'
                  borderRadius='50%'
                  bgColor={item.priority == '0' ? 'green' : item.priority == '1' ? 'yellow' : 'red'}
                />
                <Text
                  align='left'
                  decoration={item.done ? 'line-through' : 'none'}>
                  {item.title}
                </Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding='10px 15px' >
              <Text>
                {item.description}
                {item.date}
              </Text>
              <Checkbox
                size='lg'
                value='done'
                onChange={() => handleDone(idx)}
              >done</Checkbox>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Add />
    </Flex>
  );
}

