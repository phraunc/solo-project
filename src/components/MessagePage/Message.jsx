import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import EditMessage from "../EditMessage/EditMessage";
import { AccordionActions, Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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

  // function for getting my two message areas into cards..
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <>
      <Box sx={{ width: "300%" }}>
        <div className="container">
          <h2>Messages</h2>
        </div>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography
              varient="h2"
              component="h2"
              color="text.secondary"
              gutterBottom
            >
              Recieved Messages
            </Typography>

            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            />

            {messageItems.length &&
              messageItems.map((item) => {
                const timestamp = new Date(item.time_stamp).toLocaleString();

                return (
                  <div key={item.id}>
                    <p>
                      <Accordion>
                        <AccordionSummary>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {timestamp}
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            From: {item.username}
                          </Typography>{" "}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                          >
                            Category: {item.category}
                          </Typography>

                          <Typography
                            sx={{ fontSize: 15 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Message: {item.message}
                          </Typography>
                          {userID.id === item.recipient_id ? (
                            <CardActions>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                id={item.id}
                                onClick={deleteMessage}
                              >
                                Delete
                              </Button>
                            </CardActions>
                          ) : (
                            <></>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </p>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ width: "300%" }}>
        <Typography
          varient="h2"
          component="h"
          color="text.secondary"
          gutterBottom
        >
          Sent Messages
        </Typography>
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            {sentMessage.map((item) => {
              const timestamp = new Date(item.time_stamp).toLocaleString();
              console.log(item);

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
                      <Accordion>
                        <AccordionSummary>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {timestamp}
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>
                          <Typography varient="body" color="inherit">
                            &nbsp;
                          </Typography>

                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            To: {item.recipient_username}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Category: {item.category}{" "}
                          </Typography>
                          {""}
                          <Typography
                            sx={{ fontSize: 20 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            Message: {item.message}
                          </Typography>

                          <Button
                            variant="outlined"
                            id={item.id}
                            onClick={() => editSentMessage(item)}
                          >
                            Edit Message
                          </Button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </Box>
      <br></br>
      <div>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            onClick={newMessage}
          >
            <AddIcon />
          </Fab>
        </Box>
      </div>
      
    </>
  );
}

export default MessagePage;
