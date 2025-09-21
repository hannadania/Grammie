import React, { useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import AppPage from './AppPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'app'

  const handleStartApp = () => {
    setCurrentPage('app');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <HomePage onStartApp={handleStartApp} />
      ) : (
        <AppPage onGoHome={handleGoHome} />
      )}
    </div>
  );
}

export default App;
