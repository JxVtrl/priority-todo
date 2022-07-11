import React, { useState } from 'react';
import {
    Text,
    Flex,
    Input,

    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalOverlay,

    FormControl,
    FormLabel,
} from '@chakra-ui/react'
import { useApp } from '../../context';

export function Add() {
    const { openAdd, setOpenAdd, addData } = useApp()
    const [priority, setPriority] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handlePriority = e => {
        if (e.target.value) 
            setPriority(Number(e.target.value))
    }

    const handleClose = () => {
        setOpenAdd.off()
        resetStates()
    }

    const resetStates = () => {
        setPriority(0)
        setTitle('')
        setDescription('')
    }

    const saveData = () => {
        if (title && description) {
            addData(title, description, priority)
            setOpenAdd.off()
        }
    }
    
    return (
        <>
            <Modal
                isCentered
                isOpen={openAdd}
                onClose={handleClose}
            >
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />

                <ModalContent
                    flexDir='column'
                    align='center'
                    height='fit-content'
                    w='80%'
                    margin='50px auto'
                    gap='20px'
                    padding='20px'
                    bgColor='white'
                    borderRadius='15px'
                    border='1px solid silver'
                >
                    <ModalHeader>
                        <Text as='h1'>Add Item</Text>
                    </ModalHeader>
                    <ModalBody display='flex' flexDir='column' margin='0 auto' gap='10px'>
                        <FormControl>
                            <FormLabel>
                                <Text>Title</Text>
                            </FormLabel>
                            <Input
                                w='100%'
                                placeholder='Titulo'
                                value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                <Text>Description</Text>
                            </FormLabel>
                            <Input
                                w='100%'
                                placeholder='Description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </FormControl>

                        <FormControl
                            onChange={e => handlePriority(e)}
                            display='flex'
                            flexDir='column'
                        >
                            <FormLabel>
                                <Text>Priority</Text>
                            </FormLabel>

                            <Flex flexDir='row' gap='15px'>

                                <Flex align='center' gap='5px'>
                                    <Input
                                        type={'radio'}
                                        value={0}
                                        id="priority-1"
                                        checked={priority === 0}
                                    />
                                    <label htmlFor="priority-1">Easy</label>
                                </Flex>

                                <Flex align='center' gap='5px'>
                                    <Input
                                        type={'radio'}
                                        value={1}
                                        id="priority-2"
                                        checked={priority === 1}
                                    />
                                    <label htmlFor="priority-2">Medium</label>
                                </Flex>

                                <Flex align='center' gap='5px'>
                                    <Input
                                        type={'radio'}
                                        value={2}
                                        id="priority-3"
                                        checked={priority === 2}
                                    />
                                    <label htmlFor="priority-3">Hard</label>
                                </Flex>
                            </Flex>

                        </FormControl>

                    </ModalBody>
                    <ModalFooter gap='15px' margin='0 auto'>
                        <Flex 
                            as='button'
                            onClick={saveData}
                            w='80px'
                            borderRadius='5px'
                            cursor='pointer'
                            align='center'
                            justify='center'
                            transition='all 0.25s ease'
                            _hover={{
                                bgColor: 'silver'
                            }}
                        >
                            Save
                        </Flex>
                        <Flex
                            as='button'
                            align='center'
                            justify='center'
                            onClick={handleClose}
                            w='80px'
                            borderRadius='5px'
                            cursor='pointer'
                            transition='all 0.25s ease'
                            _hover={{
                                bgColor: 'silver'
                            }}
                        >Cancel</Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
