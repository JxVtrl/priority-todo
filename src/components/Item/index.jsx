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
import { useDevice } from '../../hooks'
import { Button } from '../'

export function Item({ item, idx }) {
  return (
    <AccordionItem key={idx} >
      <AccordionButton
        h='45px'
        border='none'
        cursor='pointer'
        padding='0 15px'
        borderRadius='5px'
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
  const { formatDate, formatHours } = useTools()
  const { device } = useDevice()

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
            w='100%'
            align='left'
            fontSize='sm'
            textTransform='capitalize'
            decoration={item.done ? 'line-through' : 'none'}
          >
            {item.name}
          </Text>
        </Flex>
        <Flex w='100%' gap='10px' align='center' justify='end' m='0 10px'>
          <Text mr='5px' decoration={item.done ? 'line-through' : 'none'}>
            {formatHours(
              new Date(item.date[0]).getHours(),
              new Date(item.date[0]).getMinutes()
            )}
            {' '}
            {device.isMobileSM ? <br/> : '-'}
            {' '}
            {formatDate(
              new Date(item.date[0]).getDate(),
              new Date(item.date[0]).getMonth() + 1,
              new Date(item.date[0]).getFullYear()
            )}
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
  return (
    <Flex flexDir='column' gap='25px'>
      <Flex flexDir='column' gap='15px'>
        <Text textTransform='capitalize'>
          {item.description}
        </Text>
        {item.date.length > 1 && (
          <ItemDates item={item} />
        )}
      </Flex>
      <ItemButtons item={item} />
    </Flex>
  )
}

function ItemDates({ item }) {
  const { formatDate, formatHours } = useTools()

  return (
    <Flex flexDirection='column' textAlign='end'>
      Next Dates
      {item.date.map((i, idx) => {
        if (idx > 0) {
          return (
            <Text key={idx - 1} textAlign='end'>
              {formatHours(
                new Date(item.date[idx]).getHours(),
                new Date(item.date[idx]).getMinutes()
              )}
              {' - '}
              {formatDate(
                new Date(i).getDate(),
                new Date(i).getMonth() + 1,
                new Date(i).getFullYear()
              )}
            </Text>
          )
        }
      })}
    </Flex>
  )
}

function ItemButtons({ item }) {
  const { itemData } = useApp()
  return (
    <Flex justify='space-between'>
      <Button
        type='delete'
        item={item}
        itemData={itemData}
      >Delete</Button>
      <Button
        type='edit'
        item={item}
        itemData={itemData}
      >Edit</Button>
    </Flex>
  )
}
