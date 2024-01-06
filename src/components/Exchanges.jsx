import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import { Box, Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader.jsx';
import { Scale } from 'chart.js';
import Error from './Error.jsx';
const Exchanges = () => {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, SetError] = useState(false);
    useEffect(() => {
        const fetchExchanges = async () => {
        try {
                const {data} = await axios.get(`${server}/exchanges`)
               
                setExchanges(data);
                setLoading(false);
        } catch (error) {
            setLoading(false);
            SetError(true);
        }
        }
        fetchExchanges();
    },[]);

    if(error) {return <Error/>}
  else return (
   
       < Container  maxW={"container.xl"} justifyContent={'space-evenly'}>
        {loading ? <Loader/> : (<>
        
        <HStack wrap={'wrap'} justifyContent={'center'}>
            {exchanges.map((i) => (
               <ExchangeCard key={i.id}  url={i.url} name={i.name} image={i.image} rank={i.trust_score_rank}/>
            ))}
        </HStack>
        
        </>
       ) }
      
       </Container>
    
  )
}

const ExchangeCard = ({url, name, image, rank}) => {
return <a href={url} target='blank'>
    <VStack backgroundColor={'rgb(234,250,250)'} border={'1px solid black'} w={'52'} shadow={'lg'} p={'8'} borderRadius={'11'} transition={"all 0.4s"} m={'4'} css={{
        "&:hover":{
            transform: "scale(1.07)"
        }
    }}>
        <Image w={'10'} h={'10'} objectFit={'contain'} src={image}></Image>
        <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
        <Text noOfLines={'1'}>{name}</Text>
    </VStack>
</a>
}


export default Exchanges