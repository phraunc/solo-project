import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function MessagePage() {
  //Set up Dispatch
  const dispatch = useDispatch();

  //useSelector to pull messageItems from the messageItems store
  const messageItems = useSelector((store) => store.messageItems);
  console.log("here are my message items", messageItems);

  // use selector to pull userID from information generated on login. NOT used for anything sensitive.
  const userID = useSelector((store) => store.user.id);
  console.log(userID);

  // on page load, run 'FETCH_MESSAGE' -> results in rendering of MESSAGE.
  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGE",
    });
  }, []);

  const [newCategory, setNewCategory] = useState("");
  const [newMessage, inputNewMessage] = useState("");
//   const [newTimeStamp, inputNewTimeStamp] = useState('');
  const [newProfileId, inputNewProfileId] = useState('');
  const [newRecipientId, inputNewRecipientId]= useState('')

  const addNewMessage = (event) => {
    event.preventDefault()
    
    dispatch({
        type:'ADD_MESSAGE',
        payload:{
            time_stamp: Date.now(),
            category: newCategory,
            message: newMessage,
            profile_id: newProfileId,
            recipient_id: newRecipientId,
        }
        
    });
    // console.log('adding new message!', time_stamp, category, message, profile_id, recipient_id)
  };

  return (
    <>
      <div className="container">
        <h2>Messages</h2>
      </div>
      {messageItems.length &&
        messageItems.map((item) => {
            const timestamp = new Date(item.time_stamp).toLocaleString();
            return(
          <div key={item.id}>
            <p>
              {timestamp} : {item.category} : {item.message} :{" "}
              {item.profile_id} : {item.recipient_id}
            </p>
          </div>)
        })}
        <form onSubmit={addNewMessage}>
{/*             
            <input
            type="text"
            value={Date.now()}
            onChange={(event)=>inputNewTimeStamp(event.target.value)}/> */}
            <input
            type="text"
            value={newRecipientId}
            onChange={(event)=>inputNewRecipientId(event.target.value)}
            placeholder="recipient"
            />
            <input
            type="text"
            value={newCategory}
            onChange={(event)=>setNewCategory(event.target.value)}
            placeholder="category"
            />
            <input 
            type="text"
            value={newMessage}
            onChange={(event)=>inputNewMessage(event.target.value)}
            placeholder="new Message"
            />
            <input
            type="text"
            value={newProfileId}
            onChange={(event)=>inputNewProfileId(event.target.value)}
            placeholder="sender"
            />
            <button type="submit">Submit</button>


        </form>
    </>
  );
}

export default MessagePage;
