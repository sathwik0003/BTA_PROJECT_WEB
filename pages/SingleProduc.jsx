import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import Header from '../componants/Header';
import Loader from '../componants/Loader';
import './SingleProduct.css'

const SingleProduct = ({ state }) => {
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  const { contract } = state;
  const { itemId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewerDetails, setReviewerDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract && itemId) {
          const product = await contract.items(itemId);
          setItem(product);

          if (product[2]) {
            const userInfo = await contract.users(product[2]);
            setUser(userInfo);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [contract, itemId]);

  const handleBuyNow = async () => {
    try {
      if (contract && itemId) {
        const totalPrice = item[3];

        await contract.purchaseItem(itemId, {
          value: totalPrice.toString(),
        });

        alert('Purchase successful!');
      }
    } catch (error) {
      console.error('Error purchasing item:', error);
      alert('Purchase failed. Please try again.');
    }
  };

  const handleShowReviews = async () => {
    try {
      if (item) {
        const fetchedReviews = await contract.viewUserReviews(item[2]);
        setReviews(fetchedReviews);
        setShowReviews(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const viewReviewerDetails = async (reviewerId) => {
    try {
      // Assuming you have a function in your contract to fetch reviewer details by ID
      const reviewer = await contract.viewUser(reviewerId);
      setReviewerDetails(reviewer);
    } catch (error) {
      console.error('Error fetching reviewer details:', error);
    }
  };

  return (
    <div>
      <Header state={state} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="single-product-container">
          <div className="product-image">
            <img src={item[4]} alt="" />
          </div>
          <div className="product-details">
            <h2>Product Details</h2>
            <p>Item ID: {Number(itemId)}</p>
            <p>Item Name: {item[1]}</p>
            <p>Owner Address: {item[2]}</p>
            <p>Owner Name: {user.name}</p>
            <p>Owner Year: {user.ug}</p>
            <p>Owner Branch: {user.branch}</p>
            <button onClick={handleBuyNow}>BUY NOW</button>
            <button onClick={handleShowReviews}>SHOW REVIEWS</button>
          </div>
        </div>
      )}
      <h2>Reviews from buyers about the seller</h2>
      <div className="single-product-container">
        {showReviews && (
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="review">
                {review.content}
                <button onClick={() => viewReviewerDetails(review.reviewer)}>
                  View Reviewer Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {reviewerDetails && (
        <div className="reviewer-details">
          <h2>Reviewer Details</h2>
          <p>Reviewer ID: {reviewerDetails.name}</p>
          {/* Include other details of the reviewer */}
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
