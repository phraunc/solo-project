import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function MessagePage() {
  //Set up Dispatch
  const dispatch = useDispatch();

  //useSelector to pull messageItems from the messageItems store
  const messageItems = useSelector((store) => store.messageItems);

  // use selector to pull userID from information generated on login. NOT used for anything sensitive.
  const userID = useSelector((store) => store.user.id);

  // on page load, run 'FETCH_MESSAGE' -> results in rendering of MESSAGE.
  useEffect(() => {
    dispatch({
      type: "FETCH_MESSAGE",
    });
  }, []);

  const [newCategory, setNewCategory] = useState('');
  const [newMessage, inputNewMessage] = useState('');

  return(

    <>
  <div className='container'>
    <h2>Messages</h2>
  </div>
    {messageItems.length && 
    messageItems.map((item)=>{
        <div key={item.id}>
            <p>{item.time_stamp}</p>
            <p>{item.category}</p>
            <p>{item.message}</p>
            <p>{item.profile_id}</p>
            <p>{item.recipient_id}</p>

</div>
    })};
  </>
  ) 
}

export default MessagePage;
