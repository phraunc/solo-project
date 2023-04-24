import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MessagePage() {
  //Set up Dispatch
  const dispatch = useDispatch();
  // history to go different pages as needed.
  const history = useHistory();

  //useSelector to pull messageItems from the messageItems store
  const messageItems = useSelector((store) => store.messageItems);

  //useSelector to pull sent messages for the sentMessage Store to display in the 'Sent Messages' piece on the DOM. 
  const sentMessage = useSelector((store)=> store.sentMessage)

  console.log("here are my message items", messageItems);

  // use selector to pull userID from information generated on login. NOT used for anything sensitive.
  //  Keeping in mind that this is the whole object of the user in the store.
  const userID = useSelector((store) => store.user);

  // on page load, run 'FETCH_MESSAGE' -> results in rendering of MESSAGE.
  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGE",
    });
  }, []);

  useEffect(()=> {
  
    dispatch({
      type:"SENT_MESSAGE",
      payload: sentMessage,
    });
  }, []);




  const deleteMessage = (event) => {
    console.log("event.target.id", event.target.id);
    dispatch({ type: "DELETE_MESSAGE", payload: event.target.id });
  };

  const newMessage = (event) => {
    history.push("/newmessage");
  };

  return (
    <>
      <div className="container">
        <h2>Messages</h2>
      </div>
      {messageItems.length &&
        messageItems.map((item) => {
          const timestamp = new Date(item.time_stamp).toLocaleString();
          return (
            <div key={item.id}>
              <h2>Recieved Messages</h2>
              <p>
                {timestamp} From: {item.username} Category: {item.category} :{" "}
                Message: {item.message}
                {/* Taking 'userID' from the store by itself was not fetching the 'user ID'.  I needed to 
              input userID.id to get the specific id from the store.  userID is the whole object and I just
              wanted the 'id' portion of the object.  */}
                {userID.id === item.recipient_id ? (
                  <button id={item.id} onClick={deleteMessage}>
                    Delete Message
                  </button>
                ) : (
                  <></>
                )}
              </p>

              {/* <button id={item.id}onClick={deleteMessage}>delete</button> */}
            </div>
          );
        })}
        {sentMessage.length && sentMessage.map((item)=>{
          const timestamp = new Date(item.time_stamp).toLocaleString();
          return(
            <div key={item.id}>
              <h2>Sent Messages</h2>
              <p>
                {timestamp} To: {item.username} Category: {item.category}: {''}
                Message: {item.message}
              </p>

            </div>
          )
        })}

      <div>
        <button onClick={newMessage}>New Message</button>
      </div>
    </>
  );
}

export default MessagePage;
