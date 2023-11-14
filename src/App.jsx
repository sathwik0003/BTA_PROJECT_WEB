import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import abi from './assets/contractJson/Trash.json'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import SingleProduc from './pages/SingleProduc'
import Loader from './componants/Loader'
import './App.css'
import Home from './pages/Home';
import Sold from './pages/Sold';
import Purchased from './pages/Purchased';

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
      <Route path='/' element={<Home state={state} /> }></Route>
      <Route path='/register' element={<Register state={state} /> }></Route>
      <Route path='/addproduct' element={<AddProduct state={state} /> }></Route>
      <Route path='/products' element={<Products state={state} /> }></Route>
      <Route path='/sold' element={<Sold state={state} /> }></Route>
      <Route path='/purchased' element={<Purchased state={state} /> }></Route>
      <Route path='/singleproduct/:itemId' element={<SingleProduc state={state} /> }
      />


    </Routes>
  )
}

export default App




