import React from 'react'
import'./Search.css'
import { homeUI } from '../redux/uiSlice';
import { useDispatch } from 'react-redux';
export default function Search() {
    const dispatch = useDispatch();
   
    const handleSearch = () => {
        dispatch();
      }
  return (
    <div id='search'>
        <input type="search" placeholder="Search" />
        <button id="search-btn" onClick={handleSearch}><i className="fa-solid fa-magnifying-glass"></i>Search</button>
    </div>
  )
}
