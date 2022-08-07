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

export function Login() {
  const { users  } = useFirebase()
  const { signInGoogle, signInUid } = useGoogleAuth()
  const [adminSelected, setAdminSelected] = useState(0)
  const [invalidCode, setInvalidCode] = useState(false)
  const [admin, setAdmin] = useState({
    name: '',
    code: '',
  })


  useEffect(() => {
    // Marcelo
    if (adminSelected === 1) {
      const admin = users.find(user => user.id === 'SEb2xpinxvIFFApltVx8')

      setAdmin({
        name: admin.name,
        code: users[0].code,
      })

    // João
    } else if (adminSelected === 2) {
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
      if(adminSelected === 1) 
        signInUid('#')
      else if (adminSelected === 2)
        signInUid('WXSlfpeZg4Tyuve7QFCJ2BWGoYG2')
    } else {
      setInvalidCode(true)
    }
  }

  return (
    <Flex
      w='100%'
      h='60%'
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
                  cursor='pointer'
                  size='xl'
                  name='João Vitral'
                  src='https://bit.ly/ryan-florence'
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
                  cursor='pointer'
                  size='xl'
                  name='Marcelo Bracet'
                  src='https://bit.ly/sage-adebayo'
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
              fontWeight='semibold'>{admin.name}</PopoverHeader>
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
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
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

