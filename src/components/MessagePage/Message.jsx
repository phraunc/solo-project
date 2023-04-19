import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MessagePage() {
  //Set up Dispatch
  const dispatch = useDispatch();
  const history = useHistory();

  //useSelector to pull messageItems from the messageItems store
  const messageItems = useSelector((store) => store.messageItems);
  console.log("here are my message items", messageItems);

  // use selector to pull userID from information generated on login. NOT used for anything sensitive.
  const userID = useSelector((store) => store.user);
  console.log(userID);

  // on page load, run 'FETCH_MESSAGE' -> results in rendering of MESSAGE.
  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGE",
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
              <p>
                {timestamp} : {item.category} : {item.message} :{" "}
                {item.profile_id} : {item.recipient_id}
              </p>
              {userID.id === item.profile_id ? 
                <button id={item.id} onClick={deleteMessage}>
                  Delete Message
                </button>
               :
              <></>
              }
              {/* <button id={item.id}onClick={deleteMessage}>delete</button> */}
            </div>
          );
        })}
      <div>
        <button onClick={newMessage}>New Message</button>
      </div>
    </>
  );
}

export default MessagePage;
