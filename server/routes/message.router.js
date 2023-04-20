const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//Getting all the message and details from the DB to send to the GET component in SRC. **update the file name**
//GET route
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM "message" WHERE profile_id = $1`;
  const sqlParams = [req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((result) => {
      res.send(result.rows);
      console.log('here is my information', result.rows);
    })
    .catch((err) => {
      console.log("getting errors!", err);
      res.sendStatus(500);
    });
});


//adding a message and message information to be sent. 
router.post("/", rejectUnauthenticated, (req, res) => {
    //Im not really sure how the time stamp comes in; do I need to insert it as part of the table, will it show up on the DOM or is 
    //there code that I need to write/alter to get it to work?  

    const sqlText = `INSERT INTO "message" ("category","message","profile_id","recipient_id")
    VALUES($1, $2, $3, $4 )`;
    // 
    const sqlParams = [ req.body.category, req.body.message, req.body.recipient_id, req.user.id];

    pool
    .query(sqlText, sqlParams)
    .then((result) => {
        res.sendStatus(201)
    })
    .catch((err) => {
        console.log('error!', err)
        res.sendStatus(500)
    })
});

router.delete("/:id",rejectUnauthenticated, (req, res)=>{
  const sqlText = `DELETE FROM "message" WHERE (id=$1 AND profile_id=$2)`;
  const sqlParams = [req.params.id, req.user.id]

  pool
  .query(sqlText, sqlParams)
  .then((result) =>{
    res.sendStatus(200)
  })
  .catch((err)=>{
    console.log('error deleting message', err)
    res.sendStatus(500)
  })
})

module.exports = router;
