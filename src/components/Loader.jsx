import React from 'react'
import { Spinner, VStack } from '@chakra-ui/react'

const Loader = () => {
  return (
    <VStack h={'90vh'} justifyContent={'center'}>
    <Spinner w={'10vh'} h={'10vh'} thickness='8px' ></Spinner>
    </VStack>
  )
}

export default Loader