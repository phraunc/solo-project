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

  return (
    <>
      <div className="container">
        <h2>Messages</h2>
      </div>
      {messageItems.length &&
        messageItems.map((item) => {
            return(
          <div key={item.id}>
            <p>
              {item.time_stamp} : {item.category} : {item.message} :{" "}
              {item.profile_id} : {item.recipient_id}
            </p>
          </div>)
        })}
    </>
  );
}

export default MessagePage;
