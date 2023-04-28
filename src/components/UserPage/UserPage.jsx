import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>You're Amazing, {user.username}!</h2>
      
      <iframe src="https://giphy.com/embed/d7OHjf5B1RK6aoZvY3" width="350" height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cat-hello-catgrass-d7OHjf5B1RK6aoZvY3">via GIPHY</a></p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
