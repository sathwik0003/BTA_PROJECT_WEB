import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';  
import Header from '../componants/Header';
import './AddProduct.css'

const AddProduct = ({state}) => {        
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');  
  const[imageURL, setImageURL] = useState('');

  const {contract} = state;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const amountInWei = ethers.parseEther(productPrice); 
    try 
    {
       await contract.sellItem(productName, amountInWei,imageURL);
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  };
  
    
        
  
  

  return (
    <div>
      <Header state={state}/>      
      <div className="add-product-container">
        <h2>Add a New Product</h2>
        <form onSubmit={handleAddProduct} className="add-product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageURL">Product Image</label>
            <input
              type="text"
              id="imageURL" 
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Product Price (ETH)</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <button className="add-product-button">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
