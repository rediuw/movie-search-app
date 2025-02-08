import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Search from './Search';
import MovieDetails from './MovieDetails';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "dark-mode" : ""} style={{ minHeight: '100vh', backgroundColor: darkMode ? '#121212' : 'white', color: darkMode ? 'white' : 'black' }}>
        <header style={{ 
          backgroundColor: darkMode ? '#1f1f1f' : '#282c34', 
          color: 'white', 
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between', // Moves elements to left & right
          alignItems: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'white',
          backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Soft gradient
          backgroundClip: 'text', // Gradient effect on the text
          textAlign: 'center',
          padding: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
          margin: 0
                }}>  Discover Your Favorite Movies!</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={{ 
            padding: '10px',
            cursor: 'pointer',
            background: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '5px'
 }}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
