import React, { useState } from 'react';
import './Search.css';
import { useDispatch } from 'react-redux';
import { homeUI } from '../redux/uiSlice';
import axios from 'axios';

export default function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/search?query=${searchTerm}`);
      const results = response.data;
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      
    }
dispatch(homeUI("search"));
  };

  return (
    <div id="search">
      <input id="search-input" type="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button id="search-btn" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        Search
      </button>

      
      {searchResults.length > 0 && (
        <div id="search-results">
          <h3>Search Results:</h3>
          {searchResults.map((result) => (
            <div key={result.postID}>
              <p>{result.content}</p>
              <p>Likes: {result.likesCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
