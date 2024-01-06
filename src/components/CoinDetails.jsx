import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { server } from '../index';
import Loader from './Loader';
import { Button, Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import Error from './Error';
import Chart from './Chart';


const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(false);
 const[days, setDays] = useState('24h')
 const [marketChart, setMarketChart] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : '€';
  const params = useParams();

  const changeDays = (noofday) =>{
    setDays(noofday);
    setLoading(true);
  }

  const daysbtn = ["24h", "7d", "30d"]
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}`);

          const{data:marketdata} =  await axios.get(
            `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
            setMarketChart(marketdata.prices);
            
            setLoading(true);
            
          
          setCoin(data);
          setLoading(false);
      } catch (error) {
        setLoading(false);
        SetError(true);
      }
    }
    fetchCoin();
  },[currency, params.id, days])

  if(error){
    return <Error></Error>;
  }else{
    return (
      <Container maxW={'container.xl'}>
        {loading? (<Loader/>) :
        (
          <>
          <HStack alignItems={'center'}>
          <Text fontWeight={'900'} noOfLines={1} paddingTop={'4'} fontSize={'x-large'}>{coin.name}</Text>
          <Image width={'7'} height={'7'} src={coin.image.large}></Image>
          </HStack>
          <Box width={'full'} borderWidth={1}>
            <Chart arr={marketChart}  currency={currencySymbol} days={days}></Chart>
          </Box>
          {daysbtn.map((i)=>(
            <Button key={i} color={'white'} bgColor={'#64e687'} onClick={()=>changeDays(i)} margin={'5'}>{i}</Button>
          ))}
         
          <VStack spacing={'4'} p={['10','14']} alignItems={'flex-start'}>
            <Text noOfLines={1} alignSelf={'center'} opacity={'0.6'} fontSize={'small'}>
              Last Updated On {Date(coin.last_updated).split("G")[0]}
            </Text>
            <RadioGroup value={currency} onChange={setCurrency} p={'8'} paddingLeft={'0'} marginTop={'0'}>
            <HStack>
              <Radio fontWeight={`bold${'!important'}`} value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <Image width={'16'} height={'16'} src={coin.image.large}></Image>
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h>0 ? "increase":"decrease"}/>
              {coin.market_data.price_change_percentage_24h}%
              
            </StatHelpText>
          </Stat>
          <Badge border={"1px solid black"} fontSize={'2xl'} bgColor={'yellow'} color={'blackAlpha.900'}>#{coin.market_cap_rank}</Badge>

          <CustomBar currencySymbol={currencySymbol} high={coin.market_data.high_24h[currency]} low={coin.market_data.low_24h[currency]}/>

          <Box w={'full'} p={'4'}>
          <Item title={"Max Supply"} value={coin.market_data.max_supply}></Item>
          <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}></Item>
          </Box>
          </VStack>
          </>
        )
        }
      </Container>
    )
  }
}

const Item = ({title, value}) => {
  return <HStack w={'full'} justifyContent={'space-between'} my={'4'}>
    <Text fontSize={'large'} textDecoration={'bolder'} fontFamily={"Bebas Neue"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
}

const CustomBar = ({high, low, currencySymbol}) => {

  var percentage = ((high-low)/low)*100;
  return <VStack w={'full'}>
    <Progress  w={'full'} value={percentage>100?100: percentage<0?0 :percentage} colorScheme={percentage>50?"teal" : "red"}></Progress>
    
    <HStack alignItems={'center'} justifyContent={'space-between'} w={'full'}>
      <Badge colorScheme='red'>{currencySymbol}{low}</Badge>
  <Text   fontSize={'small'}>24H Range</Text>
      <Badge colorScheme='green'>{currencySymbol}{high}</Badge>
    </HStack>
  </VStack>
}
export default CoinDetails