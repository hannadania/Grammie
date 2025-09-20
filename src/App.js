import './App.css';

function App() {
  // Simple dictionary data - just a few words to start
  const dictionary = [
    { word: "rumah", meaning: "house", language: "Malay" },
    { word: "air", meaning: "water", language: "Malay" },
    { word: "makan", meaning: "eat", language: "Malay" },
    { word: "jalan", meaning: "walk/road", language: "Malay" }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌿 Grammie Dictionary</h1>
        <p>Digital Dictionary for Orang Asli Languages</p>
        
        <div className="dictionary">
          <h2>Word List</h2>
          {dictionary.map((entry, index) => (
            <div key={index} className="word-entry">
              <h3>{entry.word}</h3>
              <p><strong>Meaning:</strong> {entry.meaning}</p>
              <p><strong>Language:</strong> {entry.language}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
