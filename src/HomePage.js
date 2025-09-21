import React, { useState } from 'react';
import './App.css';

function HomePage({ onStartApp }) {
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

  // Bedrock chat function
  const startBedrockChat = async () => {
    try {
      console.log("Starting Bedrock chat...");
      
      const response = await fetch(
        "https://q17d7ggx54.execute-api.ap-southeast-1.amazonaws.com/dev/grsmmie/bedrock-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "Hello! Can you help me learn about the Temiar language?"
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Bedrock response:", data);
      alert(`Bedrock says: ${data.message}`);
      
    } catch (error) {
      console.error("Error with Bedrock chat:", error);
      alert("Error with Bedrock chat. Check console.");
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Grammie</h1>
      <p>Temiar Language Learning App</p>
      
      <div className="home-content">
        <h2>Start Learning Temiar Words</h2>
        <p>Explore the Temiar language database and test queries</p>
        
        <div className="controls">
          <button onClick={sendToDynamoDB}>Send Data</button>
          <button onClick={fetchFromDynamoDB}>Fetch Items</button>
          <button onClick={testButton}>Test Query (Numbers)</button>
          <button onClick={startBedrockChat}>Start Bedrock Chat</button>
        </div>

        <div className="results">
          <h3>Results:</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.temiar}: {item.msg}
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          className="start-button" 
          onClick={onStartApp}
        >
          Start App
        </button>
      </div>
    </div>
  );
}

export default HomePage;
