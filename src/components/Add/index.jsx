import React, { useState, useRef } from 'react';
import {
    Button,
    Text,
    Input,

    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalOverlay,

    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { useApp } from '../../context';

export function Add() {
    const { openAdd, setOpenAdd } = useApp()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    
    return (
        <>
            <Modal
                isCentered
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={openAdd}
                onClose={setOpenAdd.off}
            >
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />

                <ModalContent
                    flexDir='column'
                    align='center'
                    height='200px'
                    w='80%'
                    margin='50px auto'
                    gap='20px'
                    padding='20px'
                    bgColor='white'
                    borderRadius='15px'
                    border='1px solid silver'
                >
                    <ModalHeader>Title</ModalHeader>
                    <ModalBody margin='0 auto'>
                        <FormControl>
                            <FormLabel>Input 1</FormLabel>
                            <Input ref={initialRef} placeholder='First name' />
                            </FormControl>

                            <FormControl mt={4}>
                            <FormLabel>Input 2</FormLabel>
                            <Input placeholder='Last name' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap='15px' margin='0 auto'>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={setOpenAdd.off}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
