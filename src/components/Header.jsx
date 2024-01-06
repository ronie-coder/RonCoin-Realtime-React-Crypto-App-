import { Box, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack opacity={1} justifyContent={['center','flex-start']} p={'2'}  paddingLeft={['0','20']} bgColor={'#141415'}>
        <Button px={'3'} color={'white'} variant={'unstyled'}>
            <Link to="/">Home</Link>
        </Button>
        <Button px={'3'} color={'white'} variant={'unstyled'}>
            <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button px={'3'} color={'white'} variant={'unstyled'}>
            <Link to="/coins">Coins</Link>
        </Button>
    </HStack>
    
  )
}

export default Header