import React, { useEffect, useState } from 'react';
import {
    Text,
    Flex,
    Input,
    Button,
    Radio,
    RadioGroup,
    Stack,
    Badge,

    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalOverlay,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

import { useTools, useFirebase } from '../../context';

export function Add() {
    const { openAdd, setOpenAdd } = useTools()
    const { addTodo } = useFirebase()

    const [priority, setPriority] = useState('0')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState([new Date()]);
    const [badges, setBadges] = useState(
        [
            { text: 'Teste', color: 'gray.500', selected: false },
            { text: 'Teste', color: 'gray.500', selected: false },
            { text: 'Teste', color: 'gray.500', selected: false },
            { text: 'Teste', color: 'gray.500', selected: false },
        ]
    )

    const handleClose = () => {
        setOpenAdd.off()
        resetStates()
    }

    const resetStates = () => {
        setPriority(0)
        setTitle('')
        setDescription('')
        setDate([new Date()])
    }

    const saveData = () => {
        if (title && date) {
            addTodo(title, description, priority, date, badges)
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
                        gap='25px'
                        position='relative'
                    >
                        {/* Badges */}
                        <FormControl>
                            <Flex gap='10px' justify='center'>
                                {badges.map((item, idx) => (
                                    <Badge
                                        key={idx}
                                        bgColor={item.color}
                                        w='fit-content'
                                        variant='subtle'
                                        onClick={() => {
                                            const newBadges = [...badges]
                                            newBadges[idx].selected = !newBadges[idx].selected
                                            setBadges(newBadges)
                                        }}
                                        cursor='pointer'
                                        style={{
                                            opacity: item.selected ? 1 : 0.5,
                                        }}
                                    >
                                        {item.text}
                                    </Badge>
                                ))}
                            </Flex>
                        </FormControl>


                        {/* Title */}
                        <FormControl gap='5px'>
                            <FormLabel>
                                <Text>Title</Text>
                            </FormLabel>
                            <Input
                                w='100%'
                                placeholder='Titulo'
                                value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </FormControl>


                        {/* Description */}
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


                        {/* Priority */}
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

                        
                        {/* Date */}
                        <FormControl>
                            <FormLabel>
                                <Flex justify='space-between' align='center'>
                                    <Text>Date</Text>
                                    <AddIcon onClick={() => setDate([...date, new Date()])} cursor='pointer' w='15px' h='100%' color={'black'} />
                                </Flex>
                            </FormLabel>
                            <Flex w='100%' flexDir='column' gap='10px'>
                                {date?.map((item, idx) => (
                                    <Flex
                                        key={idx}
                                        justify='space-between'
                                        align='center'
                                        gap='10px'
                                    >
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            type="datetime-local"
                                            onChange={e => {
                                                const newDate = [...date]
                                                newDate[idx] = e.target.value
                                                setDate(newDate)
                                            }}
                                        />
                                        {idx === 0 || (
                                            <DeleteIcon
                                                position='absolute'
                                                right='-40px'
                                                cursor='pointer'
                                                onClick={() => {
                                                    const newDate = [...date]
                                                    newDate.splice(idx, 1)
                                                    setDate(newDate)
                                                }}
                                            />
                                        )}
                                    </Flex>

                                ))}
                            </Flex>
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
                        >
                            Cancel
                        </Button>
                    </ModalFooter>


                </ModalContent>
            </Modal>
        </>
    );
} 
