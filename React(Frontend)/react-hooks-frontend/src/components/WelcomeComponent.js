import React from 'react';
import { Link } from 'react-router-dom';
import '../WelcomeComponent.css'; 

const WelcomeComponent = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to the CRM System Application</h1>
      
      
      <img 
        src="https://i.hizliresim.com/je3yu3e.jpg" 
        alt="CRM System"
        className="welcome-image"
      />

      
      <div className="btn-group mt-3">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
      </div>
      <br></br>
    </div>
  );
}

export default WelcomeComponent;
