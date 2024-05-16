import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import './App.css';
import Swap from './components/Swap';
import Tokens from './components/Tokens';
import Liquidity from './components/Liquidity';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from 'axios';

function App() {

  const tokensHasFetched = useRef(false)

  const [tokens, setTokens] = useState([]);

  async function getTokenLists() {
    const url = "http://localhost:3001/tokenList";
    const response = await axios.get(url);
    const tokenArray = Object.values(response.data);
    setTokens(tokenArray)
  }

  useEffect(() => {
    if (!tokensHasFetched.current) {
      getTokenLists()
      tokensHasFetched.current = true;
    }
  }, [])



  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  return (
    <div className="App">

      <Header connect={connect} isConnected={isConnected} address={address} />
      <Routes>
        <Route path="/" element={<Swap isConnected={isConnected} address={address} tokens={tokens} />} />
        <Route path="/tokens" element={<Tokens tokens={tokens} />} />
        <Route path="/liquidity" element={<Liquidity />} />

      </Routes>
      <Footer />
      </div>


  );
}

export default App;
