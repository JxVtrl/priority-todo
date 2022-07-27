import React from 'react'
import { Button as Btn, Text } from '@chakra-ui/react'
import { useApp, useFirebase } from '../../context'

export function Button({ children, type, item, itemData }) {
    const { setEditModal, setItemEdit, setItemData } = useApp()
    const { removeTodo } = useFirebase()
    

    const handleButtonClick = (i) => {
        console.log(i)
        switch (type) {
            case 'edit':
                setEditModal(true)
                setItemEdit(
                    {
                        date: i.date,
                        description: i.description,
                        done: i.done,
                        id: i.id,
                        priority: i.priority,
                        title: i.title,
                    }
                )
                break;
            case 'delete':
                removeTodo(i.id)
                break;
            default:
                break;
        }
    }



    return (
      <Btn
            bgColor={type === 'delete' ? 'red.500' : 'silver'}
            w='100px'
            h='30px'
            borderRadius='12px'
            align='center'
            justify='center'
            gap='8px'
            cursor='pointer'
            transition='all 0.25s linear'
            _hover={{
                bgColor: type === 'delete' ? '#fc5656' : '#b8b7b7' ,
            }}
          onClick={()=>handleButtonClick(item)}
      >
          <Text color='white'>
            {children}
          </Text>
      </Btn>
  )
}
