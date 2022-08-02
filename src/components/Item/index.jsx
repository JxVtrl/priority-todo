import React from 'react'
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useApp, useFirebase, useTools } from '../../context';
import { Button } from '../'

export function Item({ item, idx }) {
  return (
    <AccordionItem key={idx} >
      <AccordionButton
        cursor='pointer'
        h='45px'
        padding='0 15px'
        borderRadius='5px'
        border='none'
      >
        <ItemHeader item={item} ikey={idx} />
      </AccordionButton>
      <AccordionPanel padding='10px 15px'>
        <ItemDescription item={item} />
      </AccordionPanel>
    </AccordionItem>
  )
}

function ItemHeader({ item }) {
  const { updateDone } = useFirebase()
  const { formatDate } = useTools()

  return (
    <>
      <Flex gap='10px' align='center' w='100%'>
        <Flex align='center' gap='10px' w='100%'>
          <Checkbox
            size='md'
            value='done'
            defaultChecked={item.done}
            onChange={() => updateDone(item)}
            fontWeight={item.done ? '600' : '300'}
          />
          <Text
            align='left'
            decoration={item.done ? 'line-through' : 'none'}
            fontSize='sm'
            w='100%'
            textTransform='capitalize'
          >
            {item.name}
          </Text>
        </Flex>
        <Flex w='100%' gap='10px' align='center' justify='end' m='0 10px'>
          <Text mr='5px' decoration={item.done ? 'line-through' : 'none'}>
            {new Date(item.date[0]).getHours()}:{new Date(item.date[0]).getMinutes()}
            {' '}
            -
            {' '}
            {formatDate(new Date(item.date[0]).getDate())}/{formatDate(new Date(item.date[0]).getMonth() + 1)}/{new Date(item.date[0]).getFullYear()}
          </Text>
          <Box
            w='10px'
            h='10px'
            borderRadius='50%'
            bgColor={item.priority == '0' ? 'green' : item.priority == '1' ? 'yellow' : 'red'}
          />
        </Flex>
      </Flex>
      <AccordionIcon />
    </>
  )
}

function ItemDescription({ item }) {
  const { itemData } = useApp()
  return (
    <Flex flexDir='column' gap='15px'>
      <Text textTransform='capitalize'>
        {item.description}
      </Text>
      <Flex justify='space-between'>
        <Button type='delete' item={item} itemData={itemData}>Delete</Button>
        <Button type='edit' item={item} itemData={itemData}>Edit</Button>
      </Flex>
    </Flex>
  )
}
