import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trends.css'
import { url } from '../utilis';

function Trends() {
  const [highestLikedPost, setHighestLikedPost] = useState(null);

  useEffect(() => {
    const fetchHighestLikedPost = async () => {
      try {
        const response = await axios.get(`${url}/trends`);
        setHighestLikedPost(response.data);
      } catch (error) {
        console.error('Error fetching highest liked post:', error);
      }
    };

    fetchHighestLikedPost();
  }, []);

  return (
    <div className="trends-container">
      <h4>Trending Post</h4>
      {highestLikedPost && (
        <div className="trending-post">
          <p>{highestLikedPost.first4Words}...</p>
        </div>
      )}
    </div>
  );
}

export default Trends;
