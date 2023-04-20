import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function NewMessage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [newCategory, setNewCategory] = useState("");
  const [newMessage, inputNewMessage] = useState("");

  const [newProfileId, inputNewProfileId] = useState("");
  const [newRecipientId, inputNewRecipientId] = useState("");

  const userID = useSelector((store) => store.user);



  const addNewMessage = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        category: newCategory,
        message: newMessage,
        // profile_id: newProfileId,
        recipient_id: newRecipientId,
      },
    });

    history.push("/message");
  };

  function handleAlert() {
    alert("Message Sent!");
  };

  return (
    <>
      <form onSubmit={addNewMessage}>
                    
            {/* <input
            type="text"
            value={Date.now()}
            onChange={(event)=>inputNewTimeStamp(event.target.value)}/> */}
        {/* <input
          type="text"
          value={newRecipientId}
          onChange={(event) => inputNewRecipientId(event.target.value)}
          placeholder="recipient"
        /> */}
       
        <select value={newRecipientId} onChange={(event)=> {inputNewRecipientId(event.target.value )
            console.log(newRecipientId)}} >
          <option value="">Recipient</option>
          <option value='13'>Mom</option>
          <option value='12'>Dad</option>
        </select>
       
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
        {/* <input
          type="text"
          value={newProfileId}
          onChange={(event) => inputNewProfileId(event.target.value)}
          placeholder="sender"
        /> */}
        <button type="submit" onClick={handleAlert}>
          Submit
        </button>
      </form>
    </>
  );
}

export default NewMessage;
