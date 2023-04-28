import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditMessage from "../EditMessage/EditMessage";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

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

  return (
    <>
    <Box sx={{ width: '100%' }}></Box>
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
                {userID.id === item.recipient_id ? (
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    id={item.id}
                    onClick={deleteMessage}
                  >
                    Delete
                  </Button>
                ) : (
                  <></>
                )}
              </p>

            </div>
          );
        })}
      <h2>Sent Messages</h2>
      {sentMessage.map((item) => {
        const timestamp = new Date(item.time_stamp).toLocaleString();

        return (
          <div key={item.id}>

            {messageToEdit.id === item.id ? (
              <EditMessage
                username={messageToEdit.username}
                category={messageToEdit.category}
                message={messageToEdit.message}
                onEditMessage={(editCategory, editMessage) => {
                  dispatch({
                    type: "EDIT_MESSAGE",
                    payload: {
                      category: editCategory,
                      message: editMessage,
                      profile_id: userID.id,
                      id: messageToEdit.id,
                    },
                  });
                  console.log("message to edit:", messageToEdit);
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

           
          </div>
        );
      })}
<br>
</br>
      <div>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
      
      <Fab size="medium" color="secondary" aria-label="add" onClick={newMessage}>
        <AddIcon />
      </Fab>
     
    </Box>
      </div>
    </>
  );
}

export default MessagePage;
