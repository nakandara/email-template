
import React, { useEffect, useState } from 'react';

// Define an interface for the user data
interface UserData {
  name: string;
  email: string;
  // You can add more properties here if needed
}

const Home = () => {
  // Initialize userData state with null and provide type information
  const [userData, setUserData] = useState<UserData | null>(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        
        
        if (response) {
          const resObject = await response.json();
          console.log(resObject,'responseresponseresponse');
          setUser(resObject.user);
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    getUser();
  }, []);
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/facebook/callback', {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);
  
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
      <h1>Welcome to the Home Page</h1>
      {/* Check if userData is not null before accessing its properties */}
      {userData && (
        <div>
          <h2>User Details:</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Render additional user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;