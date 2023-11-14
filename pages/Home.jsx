import React from 'react';
import './Home.css'; // Import the CSS file for styling
import Header from '../componants/Header'; // Correct the import path
import clg from './clg.png'

import buy from './buy.jpg';

const Home = ({ state }) => {
  return (
    <>
      <Header state={state} />
      <div className="home-page">
        <div className="content-container">
          <div className="content">
            {/* Content for the left half */}
            <h1>ZERO WASTE <br/> MARKETPLACE,<br/>JUST FOR STUDENTS</h1>
            <p>The student marketplace app to buy and sell without postage or packing</p>
          </div>
          <div className="image-container">
            <img className="img1" src={buy} alt="Image" />
          </div>

        </div>
        
      </div>
      <div className='img_con2'>
          <img className="img2" src={clg} alt="Image" />
        </div>
    </>
  );
};

export default Home;


