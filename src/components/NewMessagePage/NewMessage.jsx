import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
  }

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
        <Box sx={{ minWidth: 50 }}>
          <FormControl fullWidth>
            <InputLabel id="recipient">Recipient</InputLabel>
            <Select
              labelId="recipient"
              id="recipient"
              value={newRecipientId}
              label="Name"
              onChange={(event) => {
                inputNewRecipientId(event.target.value);
              }}
            >
              <MenuItem value={"13"}>Mom</MenuItem>
              <MenuItem value={"12"}>Dad</MenuItem>
              <MenuItem value={"14"}>Olivia</MenuItem>
              <MenuItem value={"15"}>Haley</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <select
          value={newRecipientId}
          onChange={(event) => {
            inputNewRecipientId(event.target.value);
            console.log(newRecipientId);
          }}
        >
          <option value="">Recipient</option>
          <option value="13">Mom</option>
          <option value="12">Dad</option>
          <option value="14">Olivia</option>
          <option value="15">Haley</option>
        </select> */}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Category"
            variant="outlined"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <TextField
            label="New Message"
            variant="outlined"
            value={newMessage}
            onChange={(event) => inputNewMessage(event.target.value)}
          />
        </Box>
        {/* <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="category"
        /> */}
        {/* <input
          type="text"
          value={newMessage}
          onChange={(event) => inputNewMessage(event.target.value)}
          placeholder="new Message"
        /> */}
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
