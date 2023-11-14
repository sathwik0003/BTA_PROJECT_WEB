import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';  
import { Link } from 'react-router-dom'; 
import Header from '../componants/Header';
import './Product.css'


const Purchased = ({ state }) => {
  const [items, setItems] = useState([]);
  const [reviewText, setReviewText] = useState('');


  const { contract } = state;

  useEffect(() => {
    const fetchItems = async () => {
      // Call the smart contract to get the list of items
      const itemsFromContract = await contract.boughtItemsfun();

      // Update the state with the fetched items
      setItems(itemsFromContract);
    };

    // Fetch items when the component mounts
    fetchItems();
  }, [contract]);

  const submitReview = async (itemId) => {
    try {
      // Call the smart contract function to submit the review
      await contract.writeReview(itemId, reviewText);
      
      // Optionally, you can update the local state or fetch the updated items after submitting the review
      // For example, refetch the items
     console.log(reviewText)
      // Clear the review text box after submission
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  

  return (
    <div>
      <Header state={state} />

      <div className="products-container">
        <h2>Purchased Products</h2>
        <div className="product-list">
        {items.map((item) => (
  <div key={item.itemId}>
    <Link className="Link" to={`/singleproduct/${item.itemId}`}>
      <div className="product-card">
        <img src={item.imageURL} alt={item.itemName} />
        <h3>{item.itemName}</h3>
        <p>Price: {ethers.formatEther(item.price)} ETH</p>
      </div>
    </Link>
    <textarea
      placeholder="Write a review..."
      value={reviewText}
      onChange={(e) => setReviewText(e.target.value)}
    />
    <button onClick={() => submitReview(item.userAddress)}>Submit Review</button>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default Purchased;