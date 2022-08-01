import React from 'react';
import {
  Accordion,
  Flex,
} from '@chakra-ui/react';
import { Add, Delete, Edit, Item } from '../../components'
import { useFirebase } from '../../context';

export function Home() {
  const { todos } = useFirebase()

  return (
    <Flex
      h="100%"
      w='100%'
      direction='column'
      margin='0 auto'
      padding='0 20px'
      flexDir='column'
      // overflow='auto'
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
