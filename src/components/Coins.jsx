
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index.js";
import {
  Box,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "./Loader.jsx";
import { Scale } from "chart.js";
import Error from "./Error.jsx";
import { Link } from "react-router-dom";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : '€';

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }

  const btns = new Array(113).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
       
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        SetError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) {
    return <Error />;
  } else
    return (
      <Container maxW={"container.xl"} justifyContent={"space-evenly"}>
        {loading ? (
          <Loader />
        ) : (
          <>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
            <HStack wrap={"wrap"} justifyContent={'center'}>
              {coins.map((i) => (
                <CoinCard
                  symbol={i.symbol}
                  price={i.current_price}
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  currencySymbol={currencySymbol}
                />
              ))}
            </HStack>
            <HStack w={'full'} overflowX={"auto"} p={'8'}>
             {
             btns.map((value, index) => (
               <Button key={index} bgColor={'teal'} color={"white"} onClick={() => changePage(index+1)}>{index+1}</Button>
             ))
             }
            </HStack>
          </>
        )}
      </Container>
    );
};

const CoinCard = ({ id, price, name, image, symbol, currencySymbol = "₹" }) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
      backgroundColor={'rgb(234,250,250)'}
      border={'1px solid black'}
        borderRadius={"11"}
        w={"52"}
        shadow={"lg"}
        p={"8"}
        transition={"all 0.4s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.07)",
          },
        }}
      >
        <Image w={"10"} h={"10"} objectFit={"contain"} src={image}></Image>
        <Heading size={"md"} noOfLines={"1"}>
          {symbol}
        </Heading>
        <Text noOfLines={"1"}>{name}</Text>
        <Text noOfLines={"1"}>
          {price ? `${currencySymbol}${price}` : "NA"}
        </Text>
      </VStack>
    </Link>
  );
};

export default Coins;
