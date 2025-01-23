import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StarRating from './components/StartRating';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


function TestRating() {

  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating maxRating={5} messages={['🤮', '👎', '👌', '👍', '🤑']} defaultRating={3} onSetRating={setMovieRating} />
      <p>Movie Rating: {movieRating}</p>
    </div>
  )
}