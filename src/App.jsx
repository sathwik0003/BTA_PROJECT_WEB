import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import abi from './assets/contractJson/Trash.json'
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register';
import AddProduct from '../pages/AddProduct';
import Products from '../pages/Products';
import SingleProduc from '../pages/SingleProduc'
import Loader from '../componants/Loader'
import './App.css'
import Home from '../pages/Home';
import Sold from '../pages/Sold';
import Purchased from '../pages/Purchased';

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [loading, setLoading] = useState(true);

  const [account, setAccount] = useState('')
  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xa1ef02e0a63c85e2B04CC478329d1bDF72E72d3B";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        await ethereum.request({
          method: "eth_requestAccounts"
        })

        const provider = new ethers.BrowserProvider(ethereum);

        const accounts = await provider.listAccounts();
        setTimeout(() => {
          setAccount(accounts[0].address);
        }, 2000);

        window.ethereum.on("accountsChanged", async () => {
          const accounts = await provider.listAccounts();
          setAccount(accounts[0].address);
        })

        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        setTimeout(() => {
          setState({ provider: provider, signer: signer, contract: contract, account: account })
        }, 2000);
      } catch (err) {
        alert(err)
        console.log(err)
      }
    }
    template();
  }, [account])

  




  return (
    <Routes>
      <Route path='/' element={state.account ? <Home state={state} /> : <Loader/>}></Route>
      <Route path='/register' element={state.account ? <Register state={state} /> : <Loader/>}></Route>
      <Route path='/addproduct' element={state.account ? <AddProduct state={state} /> : <Loader/>}></Route>
      <Route path='/products' element={state.account ? <Products state={state} /> : <Loader/>}></Route>
      <Route path='/sold' element={state.account ? <Sold state={state} /> : <Loader/>}></Route>
      <Route path='/purchased' element={state.account ? <Purchased state={state} /> : <Loader/>}></Route>
      <Route path='/singleproduct/:itemId' element={state.account ? <SingleProduc state={state} /> : <Loader/>}
      />


    </Routes>
  )
}

export default App




