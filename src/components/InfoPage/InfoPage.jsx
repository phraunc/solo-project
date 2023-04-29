import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <p>This is a messaging app that was created because of the inspiration
            of my 2 daughters. Out in the world, our children are trying to
            figure out life the best they can despite the hardshipss of truth
            they will experience from sources we have no control over.
            Sometimes, the ones who care about them the most may no longer be
            there for them and would like to leave special notes for them to
            always be able to go to as a reminder on how great they are. This is
            a way we can communicate with them in a secure way and remind them
            how great they are and always will be able to go back and see those
            notes as constant encouragement that they always have someone who
            thinks the world of them.</p>
    </div>
  );
}

export default InfoPage;
