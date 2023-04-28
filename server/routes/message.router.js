const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Getting all the message and details from the DB to send to the GET component in SRC. **update the file name**
//GET route
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT "message".id, "message".time_stamp, "message".category, "message".message, "message".profile_id, "message".recipient_id, "user".username FROM "message" 
  JOIN "user"
  ON "message".profile_id = "user".id
  WHERE recipient_id = $1`;
  const sqlParams = [req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
      console.log("here is my information", result.rows);
    })
    .catch((err) => {
      console.log("getting errors!", err);
      res.sendStatus(500);
    });
});


//I want this GET route to be able to show sent messages on the user profile to edit
router.get("/sent", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT "message".id, "message".time_stamp, "message".category, "message".message, "message".profile_id, "message".recipient_id, "user".username FROM "message" 
  JOIN "user"
  ON "message".profile_id = "user".id
  WHERE profile_id = $1`;
  const sqlParams = [req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
      console.log("here is my information", result.rows);
    })
    .catch((err) => {
      console.log("getting errors!", err);
      res.sendStatus(500);
    });
});

//this is the code that I pulled from online to see if the user was in the data base for me to send a message as well as inputting a name vice a user id.
//  it seems to work however, i am not sure how i will be able to display the name of the sender to show up on the DOM.
// router.post("/send-message", async (req, res) => {
//   const { users, message } = req.body;

//   // Check if each user is present in the database
//   for (const user of users) {
//     let result;

//     if (user.id) {
//       result = await pool.query("SELECT * FROM users WHERE id = $1", [user.id]);
//     } else {
//       result = await pool.query("SELECT * FROM users WHERE name = $1", [
//         user.name,
//       ]);
//     }

//     if (result.rowCount === 0) {
//       return res
//         .status(400)
//         .json({
//           error: `User ${user.name || user.id} not found in the database.`,
//         });
//     }
//   }
//   const sqlText = `INSERT INTO "message" ("category","message","profile_id","recipient_id") VALUES($1, $2, $3, $4 )`;

//   const sqlParams = [
//     req.body.category,
//     req.body.message,
//     req.body.recipient_id,
//     req.user.id,
//   ];

//   pool
//     .query(sqlText, sqlParams)
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.log("error!", err);
//       res.sendStatus(500);
//     });
// });

// //adding a message and message information to be sent.
router.post("/", rejectUnauthenticated, (req, res) => {
  //Im not really sure how the time stamp comes in; do I need to insert it as part of the table, will it show up on the DOM or is
  //there code that I need to write/alter to get it to work?

  const sqlText = `INSERT INTO "message" ("category","message","profile_id","recipient_id")
    VALUES($1, $2, $3, $4 )`;
  //
  const sqlParams = [
    req.body.category,
    req.body.message,
    req.user.id,
    req.body.recipient_id,
  ];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error!", err);
      res.sendStatus(500);
    });
});
// This will be able for the recipeint to delete messages sent by targeteing the id to the reciepient_id to delete.
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM "message" WHERE (id=$1 AND recipient_id=$2)`;
  const sqlParams = [req.params.id, req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error deleting message", err);
      res.sendStatus(500);
    });
});


//This is the EDIT router for the id to be targeted on a user_id (who is logged in) 
//to edit messages that were sent and then be able to edit them.

// router.put(`/api/messages/${id}`, editedMessage)
// .then((response) => {
//   console.log(response.data);
//   // If the message was updated successfully, update the messageItems in the state of the component.
//   setMessageItems((prevItems) =>
//     prevItems.map((item) => (item.id === id ? editedMessage : item))
//   );
//   // Reset the edit form.
//   setEditUserName("");
//   setEditCategory("");
//   setEditMessage("");
// })
// .catch((error) => {
//   console.error(error);
// });
router.put("/:id", rejectUnauthenticated, (req, res)=>{
  const sqlText = `UPDATE "message" SET "category" = $1, "message" = $2, "recipient_id" = $3 WHERE "id" = $4 AND "profile_id" = $5`
  const sqlParams = [req.body.category, req.body.message, req.body.recipient_id, req.params.id, req.user.id]

  pool.query(sqlText, sqlParams)
  // console.log('sqlText, sqlParams', sqlText, sqlParams)
    .then((response)=>{res.sendStatus(200)})
    .catch((error)=>{console.log('Error with Edit', error)
    res.sendStatus(500)})
})

module.exports = router;
