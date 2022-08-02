import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
   Text,
  Button,
    Input,
} from '@chakra-ui/react'
import { useTools, useFirebase } from '../../context'

export function Delete() {
  const { deleteModal, setDeleteModal, itemDelete, setItemDelete } = useTools()
  const { deleteTodo } = useFirebase()

  const handleClose = () => {
    setDeleteModal(false)
    setItemDelete({})
  }

  return (
    <>
      <Modal isCentered isOpen={deleteModal} onClose={handleClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Sure you want to delete it?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You will never see {itemDelete.name} anymore</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => { deleteTodo(itemDelete); handleClose()}}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
