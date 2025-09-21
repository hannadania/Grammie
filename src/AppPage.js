import React from 'react';
import './App.css';

function AppPage({ onGoHome }) {
  return (
    <div className="App">
      <div className="header">
        <h1>Temiar Language App</h1>
        <button className="home-button" onClick={onGoHome}>← Home</button>
      </div>
      
      <div className="empty-app">
        <h2>App Page</h2>
        <p>This page is empty for now. Add your app functionality here!</p>
      </div>
    </div>
  );
}

export default AppPage;
