import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function MessagePage(){

    //Set up Dispatch
    const dispatch = useDispatch();

    const messageItems = useSelector((store) => store.messageItems);


    return(
        <>
        </>
    )
}

export default MessagePage;