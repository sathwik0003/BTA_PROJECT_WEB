import { useState, useEffect } from 'react';
import { ethers } from 'ethers';  
import { Link } from 'react-router-dom'; 
import Header from '../componants/Header';
import './Product.css'


const Products = ({ state }) => {
  const [items, setItems] = useState([]);

  const { contract } = state;

  useEffect(() => {
    const fetchItems = async () => {
      // Call the smart contract to get the list of items
      const itemsFromContract = await contract.viewAllItems();

      // Update the state with the fetched items
      setItems(itemsFromContract);
    };

    // Fetch items when the component mounts
    fetchItems();
  }, [contract]);

  return (
    <div>
      <Header state={state} />

      <div className="products-container">
        <h2>Available Products</h2>
        <div className="product-list">
          {items.map((item) => (
            <Link className="Link" key={item.itemId} to={`/singleproduct/${item.itemId}`}> {/* Link to the Single Product page */}
              <div className="product-card">
                <img src={item.imageURL} alt={item.itemName} />
                <h3>{item.itemName}</h3>
                <p>Price: {ethers.formatEther(item.price)} ETH</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
