import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { Button } from 'bootstrap'
const Home = () => {

  return (
    <div className='home'>
      <div className='title'>
        <p><h1 className='head'>RONCOIN!<div className='underline'></div></h1></p>
        <div><h3>Get realtime crypto exchange and coin data! </h3></div>
        <div className="images">
          <img className='bitcoin' src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="" />
          <img className='coin' src="https://cryptologos.cc/logos/versions/ethereum-eth-logo-colored.svg?v=029" alt="" />
          <img className='coin' src="https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029" alt="" />
          <img className='coin' src="https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=029" alt="" />
          <img className='coin' src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029" alt="" />

        </div>

      
        
      </div>
      
    </div>
  )
}

export default Home