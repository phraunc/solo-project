const sentMessage = (state = [], action) => {
    if (action.type === "SENT_MESSAGE") {
      return action.payload;
    }
    return state;
  };
  
  export default sentMessage;