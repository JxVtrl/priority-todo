import React from 'react'
import { Button as Btn, Text } from '@chakra-ui/react'
import { useTools } from '../../context'

export function Button({ children, type, item }) {
    const { setEditModal, setItemEdit, setDeleteModal, setItemDelete } = useTools()

    const handleButtonClick = () => {
        switch (type) {
            case 'edit':
                setEditModal(true)
                setItemEdit(item)
                break;
            case 'delete':
                setDeleteModal(true)
                setItemDelete(item)
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
            onClick={()=>handleButtonClick()}
      >
          <Text color='white'>
            {children}
          </Text>
      </Btn>
  )
}
