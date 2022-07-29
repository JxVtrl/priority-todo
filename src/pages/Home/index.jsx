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
import { Add, Button as MyButton, Delete, Edit } from '../../components'
import { useApp, useFirebase } from '../../context';
export function Home() {
  const { itemData } = useApp()
  const { todos } = useFirebase()
  const [itens, setItens] = useState(itemData)

  useEffect(() => {
    setItens(itemData)
  }, [itemData])


  return (
    <Flex
      h="100%"
      w='100%'
      direction='column'
      margin='0 auto'
      padding='0 20px'
      flexDir='column'
      overflow='auto'
      overflowX='hidden'
      gap='12px'
      position='relative'
    >
      <Accordion allowToggle display='flex' flexDir='column'>
        {todos.map((item, idx) => <Item key={idx} item={item} idx={idx} />)}
      </Accordion>
      <Add />
      <Edit />
      <Delete />
    </Flex>
  );
}

function Item({ item, idx }) {
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


function ItemHeader({ item, ikey }) {
  const { setItemData, itemData } = useApp()

  const handleDone = () => {
    const newData = itemData.map(item => {
      if (item.id == ikey) {
        item.done = !item.done
      }
      return item
    })
    setItemData(newData)
  }

  return (
    <>
      <Flex gap='10px' align='center' w='100%'>
        <Flex align='center' gap='10px' w='100%'>
          <Checkbox
            size='md'
            value='done'
            onChange={() => handleDone()}
            fontWeight={item.done ? '600' : '300'}
          >
          </Checkbox>
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
            {item.date}
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
        <MyButton type='delete' item={item} itemData={itemData}>Delete</MyButton>
        <MyButton type='edit' item={item} itemData={itemData}>Edit</MyButton>
      </Flex>
    </Flex>
  )
}

