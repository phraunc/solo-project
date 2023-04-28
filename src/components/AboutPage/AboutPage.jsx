import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Here is some information</p>
        <ul>
          <li>Linkden: http://linkedin.com/in/anthony-cole-750309247</li>
          <li>https://github.com/phraunc</li>
        </ul>
        <p>Technologies used</p>
          <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>Redux</li>
            <li>Postgress/SQL</li>
            <li>Material UI</li>
          </ul>
          <p>Special thanks to my daughters for the inspiration and support</p>
      </div>
     
      <iframe src="https://giphy.com/embed/P1GX8KtXfR1fO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/teamcoco-cat-angry-P1GX8KtXfR1fO">via GIPHY</a></p>
    </div>
  );
}

export default AboutPage;
