import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust the height as needed
      }}
    >
      <div style={{ maxWidth: '80%', textAlign: 'center' }}>
     
        <h2>Welcome to the Home Screen</h2>
        <p>This is some content on the home screen.</p>
      
      </div>
    </div>
  );
};

export default Home;
