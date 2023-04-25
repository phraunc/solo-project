import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditMessage from "../EditMessage/EditMessage";
import { Button } from '@mui/material';

function MessagePage() {
  //Set up Dispatch
  const dispatch = useDispatch();
  // history to go different pages as needed.
  const history = useHistory();

  //useSelector to pull messageItems from the messageItems store
  const messageItems = useSelector((store) => store.messageItems);

  //useSelector to pull sent messages for the sentMessage Store to display in the 'Sent Messages' piece on the DOM.
  const sentMessage = useSelector((store) => store.sentMessage);

  console.log("here are my message items", messageItems);

  // use selector to pull userID from information generated on login. NOT used for anything sensitive.
  //  Keeping in mind that this is the whole object of the user in the store.
  const userID = useSelector((store) => store.user);

  const [messageToEdit, setMessageToEdit] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);

  const editSentMessage = (item) => {
    setMessageToEdit(item);
    setShowEditForm(true);
  };

  // on page load, run 'FETCH_MESSAGE' -> results in rendering of MESSAGE.
  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGE",
    });
    dispatch({
      type: "SENT_MESSAGE_AGAIN",
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

  //This is the edit function of hitting submit after the iputs are filled in.
  //I want to change this to this a button with an, onClick function and to go to another page.
  // const editSentMessage = (
  //   editUserName,
  //   editCategory,
  //   editMessage,
  //   incommingID
  // ) => {
  //   if (editUserName === "") {
  //     setEditUserName(incommingUserName);
  //   }

  //   if (editCategory === "") {
  //     setEditCategory(incommingCategory);
  //   }

  //   if (editMessage === "") {
  //     setEditMessage(incommingMessage);
  //   }
  //   dispatch({
  //     type: "EDIT_MESSAGE",
  //     payload: {
  //       username: incommingUserName,
  //       category: incommingCategory,
  //       message: incommingMessage,
  //       profile_id: incommingID,
  //     },
  //   });
  // };

  return (
    <>
      <div className="container">
        <h2>Messages</h2>
      </div>
      <h2>Recieved Messages</h2>
      {messageItems.length &&
        messageItems.map((item) => {
          const timestamp = new Date(item.time_stamp).toLocaleString();
          return (
            <div key={item.id}>
              <p>
                {timestamp} From: {item.username} Category: {item.category} :{" "}
                Message: {item.message}
                {/* Taking 'userID' from the store by itself was not fetching the 'user ID'.  I needed to 
              input userID.id to get the specific id from the store.  userID is the whole object and I just
              wanted the 'id' portion of the object.  */}
                {userID.id === item.recipient_id ? (
                  <Button variant="outlined" startIcon={<DeleteIcon />} id={item.id} onClick={deleteMessage}>
                  Delete
                </Button>
                 
                ) : (
                  <></>
                )}
              </p>

              {/* <button id={item.id}onClick={deleteMessage}>delete</button> */}
            </div>
          );
        })}
      <h2>Sent Messages</h2>
      {sentMessage.map((item) => {
        const timestamp = new Date(item.time_stamp).toLocaleString();

        return (
          <div key={item.id}>
            {/* <p>
              {timestamp} To: {item.username} Category: {item.category}: {""}
              Message: {item.message}
            </p> */}
            {messageToEdit.id === item.id ? (
              <EditMessage
                username={messageToEdit.username}
                category={messageToEdit.category}
                message={messageToEdit.message}
                onEditMessage={(editUserName, editCategory, editMessage) => {
                  dispatch({
                    type: "EDIT_MESSAGE",
                    payload: {
                      username: editUserName,
                      category: editCategory,
                      message: editMessage,
                      profile_id: messageToEdit.id,
                    },
                  });
                  setMessageToEdit({});
                }}
              />
            ) : (
                  <div key={item.id}>
                    <p>
                      {timestamp} To: {item.username} Category: {item.category}:{" "}
                      {""}
                      Message: {item.message}
                    </p>

                    <button onClick={() => editSentMessage(item)}>
                      Edit Message
                    </button>
                  </div>
            )}

            {/* <form
              onSubmit={() =>
                editSentMessage(
                  item.id,
                  item.username,
                  item.category,
                  item.message
                )
              }
              id={item.id}
            >
              <input
                placeholder="username"
                type="text"
                value={editUserName}
                onChange={(event) => SetEditUserName(event.target.value)}
              />
              <input
                placeholder="category"
                type="text"
                value={editCategory}
                onChange={(event) => setEditCategory(event.target.value)}
              />
              <input
                placeholder="message"
                type="text"
                value={editMessage}
                onChange={(event) => setEditMessage(event.target.value)}
              />
              <button type="submit">Edit Message</button>
            </form> */}
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
