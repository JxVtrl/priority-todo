import React, { useEffect, useState } from 'react';
import {
    Text,
    Flex,
    Input,
    Button,
    Radio,
    RadioGroup,
    Stack,

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
    const [priority, setPriority] = useState('0')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        console.log(priority)
    },[priority])

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
            resetStates()
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
                    w='80%'
                    bgColor='white'
                    borderRadius='15px'
                    border='1px solid silver'
                >
                    <ModalHeader>
                        <Text as='h1'>Add new item</Text>
                    </ModalHeader>
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        margin='0 auto'
                        gap='10px'
                    >
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
                            display='flex'
                            flexDir='column'
                        >
                            <FormLabel>
                                <Text>Priority</Text>
                            </FormLabel>

                            <RadioGroup onChange={setPriority} defaultValue='0'>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='green' value='0'>Easy</Radio>
                                    <Radio colorScheme='yellow' value='1'>Medium</Radio>
                                    <Radio colorScheme='red' value='2'>Hard</Radio>      
                                </Stack>
                            </RadioGroup>                          
                        </FormControl>

                    </ModalBody>
                    <ModalFooter gap='15px' flex='1' w='fit-content' margin='0 auto'>
                        <Button 
                            onClick={saveData}
                            w='100px'
                            borderRadius='5px'
                            cursor='pointer'
                            transition='all 0.25s ease'
                            _hover={{
                                bgColor: 'silver'
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleClose}
                            w='100px'
                            borderRadius='5px'
                            cursor='pointer'
                            transition='all 0.25s ease'
                            _hover={{
                                bgColor: 'silver'
                            }}
                        >Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
} 
