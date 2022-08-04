import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Text,
  Flex,
  Textarea
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { useTools, useFirebase } from '../../context'

export function Edit() {
  const { itemEdit, editModal, setEditModal, setItemEdit } = useTools() 

  const [newObj, setNewObj] = useState({
    name: itemEdit.name,
    description: itemEdit.description,
    priority: itemEdit.priority,
    date: itemEdit.date
  })

  useEffect(() => {
    setNewObj({
      name: itemEdit.name,
      description: itemEdit.description,
      priority: itemEdit.priority,
      date: itemEdit.date
    })
  }, [itemEdit])

  const handleClose = () => {
    setEditModal(false)
    setItemEdit({})
  }

  return (
  <Modal isOpen={editModal} onClose={handleClose}>
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
    <ModalContent w='92%'>
      <EditHeader />
      <ModalCloseButton />
      <EditBody
        editObj={newObj}
        setEditObj={setNewObj}
      />
      <EditFooter
        close={handleClose}
        editObj={newObj}
      />
    </ModalContent>
  </Modal>
  )
}


function EditBody({ editObj, setEditObj }) {
  const { itemEdit } = useTools()

  return (
    <ModalBody gap='15px' display='flex' flexDir='column' pos='relative'>
      {/* Title */}
      <FormControl gap='5px'>
        <FormLabel>
            <Text>Title</Text>
        </FormLabel>
        <Textarea
          placeholder='Title'
          value={editObj.name}
          onChange={e => setEditObj({ ...editObj, name: e.target.value })}
        />
      </FormControl>


      {/* Description */}
      <FormControl gap='5px'>
        <FormLabel>
            <Text>Description</Text>
        </FormLabel>
        <Textarea
          placeholder='Description'
          value={editObj.description}
          onChange={e => setEditObj({ ...editObj, description: e.target.value })}
        />
      </FormControl>

      
      {/* Priority */}
      <FormControl>
        <FormLabel>
            <Text>Priority</Text>
        </FormLabel>
        <RadioGroup onChange={e => { setEditObj({ ...editObj, priority: e })}} value={editObj.priority}>
            <Stack spacing={5} direction='row'>
                <Radio colorScheme='green' value='0'>Easy</Radio>
                <Radio colorScheme='yellow' value='1'>Medium</Radio>
                <Radio colorScheme='red' value='2'>Hard</Radio>      
            </Stack>
        </RadioGroup> 
      </FormControl>

      
      {/* Date */}
      <FormControl gap='5px' id='date_input_add'>
        <FormLabel>
          <Flex justify='space-between' align='center'>
            <Text>Date</Text>
            <AddIcon onClick={() => {
              setEditObj({ ...editObj, date: [...editObj.date, ''] })
            }} cursor='pointer' w='15px' h='100%' color={'black'} />
          </Flex>
        </FormLabel>
        <Flex
          gap='10px'
          flexDir='column'
          >
          {editObj.date?.map((date, idx) => (
            <Flex align='center' gap='10px' key={idx}>
              <Input
                w='90%'
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={date}
                onChange={e => {
                  const newDate = [...editObj.date]
                  newDate[idx] = e.target.value
                  setEditObj({ ...editObj, date: newDate })
                }}
              />
              {editObj.date.length > 1 && (
                <DeleteIcon
                  cursor='pointer'
                  onClick={() => {
                    const newDate = [...editObj.date]
                    newDate.splice(idx, 1)
                    setEditObj({ ...editObj, date: newDate })
                  }}
                />
              )}
            </Flex>
          ))}
        </Flex>
      </FormControl>
    </ModalBody>
  )
}

function EditFooter({ close, editObj }) {
  const { itemEdit, setEditModal, setItemEdit } = useTools()
  const { editTodo } = useFirebase()

  const handleSubmit = () => {
    if (editObj.name && editObj.date) {
      editTodo({
        id: itemEdit.id,
        done: itemEdit.done,
        name: editObj.name,
        date: editObj.date,
        priority: editObj.priority,
        description: editObj.description,
      })
    }
    setItemEdit({})
    setEditModal(false)
  }
  
  return (
    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={() => close()}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} variant='ghost'>Save</Button>
    </ModalFooter>
  )
}

function EditHeader() {
  return (
    <ModalHeader>
      <Text>
        Edit item
      </Text>
    </ModalHeader>
  )
}
