// import React from 'react';

// const Home = () => {
//   return (
//     <div
//       style={{
//         border: '1px solid #ccc',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh', // Adjust the height as needed
//       }}
//     >
//       <div style={{ maxWidth: '80%', textAlign: 'center' }}>
     
//         <h2>Welcome to the Home Screen</h2>
//         <p>This is some content on the home screen.</p>
      
//       </div>
//     </div>
//   );
// };

// export default Home;




import React, { useState, useEffect } from 'react';

const inputPayloadNew = ['name', 'example', 'address.addressLine1', 'address.addressLine2', 'address.city', 'address.zipCode', 'birthday', 'pastOrders'];

const Home = () => {
  // Function to initialize state either from localStorage or with default values
  const initialState = () => {
    const storedData = localStorage.getItem('payload');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const defaultState: { [key: string]: string } = {}; // Specify the type here
      inputPayloadNew.forEach(field => {
        defaultState[field] = ''; // Initialize all fields with empty strings
      });
      return defaultState;
    }
  };

  const [payload, setPayload] = useState<{ [key: string]: string }>(initialState);

  // Update localStorage whenever the payload changes
  useEffect(() => {
    localStorage.setItem('payload', JSON.stringify(payload));
  }, [payload]);

  const handleChange = (key: string, value: string) => {
    setPayload(prevPayload => ({
      ...prevPayload,
      [key]: value
    }));
  };

  const handleSave = () => {
    
    console.log('Saving payload:', payload);
  };

  return (
    <div>
      <h2>Input Payload</h2>
      {inputPayloadNew.map((field, index) => (
        <div key={index}>
          <label htmlFor={field}>{field}: </label>
          <input
            id={field}
            type="text"
            value={payload[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Home;
