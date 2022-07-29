import React, { useEffect } from 'react'
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
} from '@chakra-ui/react'
import { useApp } from '../../context'

export function Edit() {
    const { itemEdit, editModal, setEditModal, setItemEdit, editData } = useApp()

    const handleClose = () => {
        setEditModal(false)
        setItemEdit({})
    }

  return (
    <>
      <Modal isOpen={editModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input w='80%' placeholder='Title' value={itemEdit?.title} />
          </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Cancel
                </Button>
                <Button variant='ghost'>Save</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
