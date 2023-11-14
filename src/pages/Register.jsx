import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from '../componants/Header';
import './Register.css'



const Register = ({ state }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  console.log(state);

  const { contract, account } = state;

  const doRegister = async (event) => {
    event.preventDefault();
   
    await contract.registerUser(name, year, branch); // Assuming your function takes both name and year
  };

  useEffect(() => {          
    const fetchUserInfo = async () => {   
      const user = await contract.userTrue();
      setUserInfo(user);  
          if(userInfo && account!='Not connected'){      
              console.log(account);                
              const res = await contract.getUserInfo(account) 
              console.log(res[0]);                            
              console.log(userInfo.name)   
            }    
    };

    fetchUserInfo();    
  }, []);
//   if(userInfo && account!='Not connected'){      
//     console.log(account)    
//     console.log(contract.getUserInfo(account))            
//     console.log(userInfo.name)   
//   }

  

  return (
    <div>
      <Header state={state} />  
      <div className="register-container">
        <form onSubmit={doRegister} className="register-form">
          <h2>Registration</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="ug4">UG 4</option>
              <option value="ug3">UG 3</option>
              <option value="ug2">UG 2</option>
              <option value="ug1">UG 1</option>
            </select>      
          </div>
          <div className="form-group">
            <label htmlFor="branch">branch</label>
            <select
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="account">Account</label>
            <input
              id="account"
              type="text"
              value={account}
              readOnly
            />
          </div>
          <button className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
