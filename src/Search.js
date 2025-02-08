import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHistoryVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchMovies = async (searchQuery) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === "") return;

    setLoading(true);
    setError("");
    setMovies([]);

    const response = await fetch(`https://www.omdbapi.com/?apikey=f623a9ca&s=${trimmedQuery}`);
    const data = await response.json();

    setLoading(false);

    if (data.Response === "True") {
      setMovies(data.Search);
      const updatedHistory = [...new Set([trimmedQuery, ...searchHistory])].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } else {
      setMovies([]);
      setError("No movies found. Try another search.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative" }}>
      <div style={{ display: "inline-block", position: "relative" }}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsHistoryVisible(true)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies(query)}
          style={{
            padding: "10px",
            width: "280px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={() => searchMovies(query)}
          style={{
            padding: "10px",
            marginLeft: "5px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {/* Styled Search History Dropdown */}
        {isHistoryVisible && searchHistory.length > 0 && (
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: "42px",
              left: "0",
              width: "285px",
              background: "#E3F2FD", // Light blue theme
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              zIndex: "10",
              padding: "5px 0",
              fontSize: "14px",
              border: "1px solid #007BFF",
            }}
          >
            {searchHistory.map((historyItem, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuery(historyItem);
                  searchMovies(historyItem);
                  setIsHistoryVisible(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: index !== searchHistory.length - 1 ? "1px solid #B3E5FC" : "none",
                  backgroundColor: "#E3F2FD",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#BBDEFB")}
                onMouseLeave={(e) => (e.target.style.background = "#E3F2FD")}
              >
                🔍 {historyItem}
              </div>
            ))}
            <button
              onClick={() => {
                setSearchHistory([]);
                localStorage.removeItem("searchHistory");
              }}
              style={{
                display: "block",
                width: "100%",
                background: "gray",
                color: "white",
                padding: "8px",
                border: "none",
                cursor: "pointer",
                marginTop: "5px",
              }}
            >
              Clear History
            </button>
          </div>
        )}
      </div>

      {loading && <ClipLoader color="blue" size={50} />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.imdbID}`}
            key={movie.imdbID}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="movie-card"
              style={{
                background: "white",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: "100%", height: "auto" }}
              />
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
