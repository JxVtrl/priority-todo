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
  Input,
  Text,
} from '@chakra-ui/react'
import { useApp, useFirebase } from '../../context'

export function Edit() {
  const { itemEdit, editModal, setEditModal, setItemEdit } = useApp()
  const { updateTodo } = useFirebase()

  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const [newDate, setNewDate] = useState('')

  useEffect(() => {
    setNewName(itemEdit.name)
    setNewDescription(itemEdit.description)
    setNewPriority(itemEdit.priority)
    setNewDate(itemEdit.date)
  }, [itemEdit])

  const handleClose = () => {
    setEditModal(false)
    setItemEdit({})
  }

  const handleSubmit = () => {
    updateTodo({
      id: itemEdit.id,
      name: newName,
      description: newDescription,
      priority: newPriority,
      date: newDate,
    })
    setEditModal(false)
    setItemEdit({})
  }

  return (
    <>
      <Modal isOpen={editModal} onClose={handleClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>
            <Text>
              Edit item
            </Text>
          </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input w='80%' placeholder='Title' value={newName} onChange={e=>setNewName(e.target.value)} />
              <Input w='80%' placeholder='Description' value={newDescription} onChange={e=>setNewDescription(e.target.value)} />
                
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Cancel
                </Button>
                <Button onClick={handleSubmit} variant='ghost'>Save</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
