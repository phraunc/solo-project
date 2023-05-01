import React, { useState } from "react";

function EditMessage(props) {
  const [editMessage, setEditMessage] = useState(props.message);
  const [editCategory, setEditCategory] = useState(props.category);

  const handleSubmit = (event) => {
    event.preventDefault();
    // pass the edited message details back to the parent component
    props.onEditMessage( editCategory, editMessage);
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>To:{props.recipient_username}</span>
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditMessage;
