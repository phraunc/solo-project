import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Alert from 'react-pop-up-alert';
function NewMessage() {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [newCategory, setNewCategory] = useState("");
  const [newMessage, inputNewMessage] = useState("");
  //   const [newTimeStamp, inputNewTimeStamp] = useState('');
  const [newProfileId, inputNewProfileId] = useState("");
  const [newRecipientId, inputNewRecipientId] = useState("");

  const addNewMessage = (event) => {
    event.preventDefault();

    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        category: newCategory,
        message: newMessage,
        profile_id: newProfileId,
        recipient_id: newRecipientId,
      },
    });

    history.push('/message')
  };

  function alert(){

  }

  return (
    <>
      <form onSubmit={addNewMessage}>
        {/*             
            <input
            type="text"
            value={Date.now()}
            onChange={(event)=>inputNewTimeStamp(event.target.value)}/> */}
        <input
          type="text"
          value={newRecipientId}
          onChange={(event) => inputNewRecipientId(event.target.value)}
          placeholder="recipient"
        />
        <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="category"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(event) => inputNewMessage(event.target.value)}
          placeholder="new Message"
        />
        <input
          type="text"
          value={newProfileId}
          onChange={(event) => inputNewProfileId(event.target.value)}
          placeholder="sender"
        />
        <button type="submit" onClick={()=>alert('congrats!')}>Submit</button>
      </form>
    </>
  );
}

export default NewMessage;
