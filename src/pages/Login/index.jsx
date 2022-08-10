import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Image,
  Text,
  Avatar,
  Wrap,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PinInput,
  PinInputField
} from '@chakra-ui/react'
import { useFirebase, useGoogleAuth } from '../../context';
import { joao_pic, marcelo_pic } from '../../assets/img'

export function Login() {
  const { users  } = useFirebase()
  const { signInGoogle, signInUid } = useGoogleAuth()
  const [adminSelected, setAdminSelected] = useState(0)
  const [invalidCode, setInvalidCode] = useState(false)
  const [validCode, setValidCode] = useState(false)

  const [admin, setAdmin] = useState({
    name: '',
    code: '',
  })


  useEffect(() => {
    setValidCode(false)
    setInvalidCode(false)
    // Marcelo
    if (adminSelected === 2) {
      const admin = users.find(user => user.id === 'SEb2xpinxvIFFApltVx8')

      setAdmin({
        name: admin.name,
        code: users[0].code,
      })

    // João
    } else if (adminSelected === 1) {
      const admin = users.find(user => user.id === 'cs2wVZOB7eV68EJwcC4r')

      setAdmin({
        name: admin.name,
        code: admin.code,
      })
    } else {
      setAdmin({
        name: '',
        code: '',
      })
    }
  }, [adminSelected])

  const handleAdminSelect = (e) => {
    if (adminSelected === 1 || adminSelected === 2) {
      setAdminSelected(0)
      setInvalidCode(false)
    } else {
      const sel = e.target.alt
      if (sel === 'João Vitral') {
        setAdminSelected(1)
      } else if (sel === 'Marcelo Bracet') {
        setAdminSelected(2)
      }
    }
  }

  const handleCode = (code) => {
    if (code == admin.code) {
      setInvalidCode(false)
      setValidCode(true)
      if(adminSelected === 1) 
        signInUid('WXSlfpeZg4Tyuve7QFCJ2BWGoYG2')
      else if (adminSelected === 2)
        signInUid('#')
    } else {
      setInvalidCode(true)
      setValidCode(false)
    }
  }

  return (
    <Flex
      w='100%'
      h='55%'
      justify='center'
      gap='40px'
      alignItems='center'
      flexDir='column'
    >
      <Flex>
        <Popover isLazy onClose={() => setAdminSelected(0)}>
          <Wrap overflow='visible'>
            {(adminSelected === 1 || adminSelected === 0) && (
              <PopoverTrigger>
                <Avatar
                  name='João Vitral'
                  cursor='pointer'
                  size='xl'
                  src={joao_pic}
                  onClick={(e) => handleAdminSelect(e)}
                  transition='all 0.2s ease-in-out'
                  _hover={{
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.1)'
                  }}
                />
              </PopoverTrigger>
            )}
            {(adminSelected === 2 || adminSelected === 0) && (
              <PopoverTrigger>
                <Avatar
                  name='Marcelo Bracet'
                  cursor='pointer'
                  size='xl'
                  src={marcelo_pic}
                  onClick={(e) => handleAdminSelect(e)}
                  transition='all 0.2s ease-in-out'
                  _hover={{
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1.1)'
                  }}
                />
              </PopoverTrigger>
            )}
          </Wrap>
          <PopoverContent>
            <PopoverHeader
              fontWeight='semibold'>Bem-vindo, {admin.name}</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Flex
                flexDir='row'
                w='60%'
                justify='space-around'
                align='center'
                margin='0 auto'
              >
                <PinInput
                  mask
                  isInvalid={invalidCode}
                  onComplete={handleCode}
                  autoFocus
                  type='alphanumeric'
                >
                  <PinInputField borderColor={validCode ? 'green' : invalidCode ? 'red' : 'gray' } />
                  <PinInputField borderColor={validCode ? 'green' : invalidCode ? 'red' : 'gray' } />
                  <PinInputField borderColor={validCode ? 'green' : invalidCode ? 'red' : 'gray' } />
                  <PinInputField borderColor={validCode ? 'green' : invalidCode ? 'red' : 'gray' } />
                </PinInput>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>


      <Button
        onClick={() => signInGoogle()}
        h='fit-content'
        w='fit-content'
        bgColor='transparent'
        display='flex'
        flexDir='column'
        border='1px solid #e0dede'
        padding='10px'
        gap='10px'
        _hover={{ bgColor: 'transparent', transform: 'scale(1.04)' }}
      >
        <Image
          h='30px'
          w='30px'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
        />
        <Text
          textAlign='center'
          fontSize='xs'
        >
          Sign in with Google
        </Text>
      </Button>
    </Flex>
  );
}

