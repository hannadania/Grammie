import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]); // store fetched items

  // Function to send data to DynamoDB
  const sendToDynamoDB = async () => {
    try {
      const response = await fetch(
        "https://q17d7ggx54.execute-api.ap-southeast-1.amazonaws.com/dev/grsmmie",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            temiar: `item-${Date.now()}`, // unique primary key
            msg: "Hello from frontend!"
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from API:", data);
      alert("Data sent successfully! Check console for response.");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Check console.");
    }
  };

  // Function to fetch data from DynamoDB
  const fetchFromDynamoDB = async () => {
    try {
      const response = await fetch(
        "https://q17d7ggx54.execute-api.ap-southeast-1.amazonaws.com/dev/grsmmie",
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched items:", data.items);
      setItems(data.items); // update state
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Check console.");
    }
  };

  // Test button function - Query by topic
  const testButton = async () => {
    try {
      console.log("Testing query by topic...");
      
      // Query for words with topic "numbers"
      const response = await fetch(
        "https://q17d7ggx54.execute-api.ap-southeast-1.amazonaws.com/dev/grsmmie?topic=numbers",
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Words with topic 'numbers':", data.items);
      
      // Show first 3 results
      const firstThree = data.items.slice(0, 3);
      alert(`Found ${data.items.length} words with topic 'numbers'. First 3: ${firstThree.map(item => `${item.temiar} = ${item.english}`).join(', ')}`);
      
    } catch (error) {
      console.error("Error testing query:", error);
      alert("Error testing query. Check console.");
    }
  };

  return (
    <div className="App">
      <h1>Test DynamoDB Connection</h1>
      <button onClick={sendToDynamoDB}>Send Data</button>
      <button onClick={fetchFromDynamoDB}>Fetch Items</button>
      <button onClick={testButton}>Test Button</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.temiar}: {item.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
