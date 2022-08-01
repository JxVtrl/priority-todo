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
import { useApp, useFirebase, useTools } from '../../context'

export function Edit() {
  const { itemEdit, editModal, setEditModal, setItemEdit } = useApp()
  const { formatDateBack } = useTools()
  const { updateTodo } = useFirebase()

  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPriority, setNewPriority] = useState('')
  const [newDate, setNewDate] = useState('00-00-0000')
  const [newHour, setNewHour] = useState('00:00')

  useEffect(() => {
    setNewName(itemEdit.name)
    setNewDescription(itemEdit.description)
    setNewPriority(itemEdit.priority)
    setNewDate(itemEdit.date?.replaceAll('/', '-'))
    setNewHour(itemEdit.hour)
  }, [itemEdit])

  const handleClose = () => {
    setEditModal(false)
    setItemEdit({})
  }

  const handleSubmit = () => {
    if (newName && newDate && newHour) {
      updateTodo({
        id: itemEdit.id,
        name: newName,
        description: newDescription,
        priority: newPriority,
        date: newDate,
        hour: newHour,
        done: itemEdit.done,
      })
    }
    setItemEdit({})
    setEditModal(false)
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
            <Input w='80%' placeholder='Description' value={newDescription} onChange={e => setNewDescription(e.target.value)} />
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
              value={formatDateBack(newDate, newHour)}
              onChange={e => { setNewDate(e.target.value.split('T')[0]); setNewHour(e.target.value.split('T')[1]) }}
            />
                
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
