import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchMessageAgain() {
  console.log("in the fetchMessageAgain function");
  try {
    const messageItems = yield axios.get("/api/message");
    console.log("incoming message!", messageItems.data);
    yield put({
      type: "SET_MESSAGE",
      payload: messageItems.data,
    });
    console.log("my messages that was just sent", messageItems.data);
  } catch (err) {
    console.log("error getting message items.", err);
  }
}



function* fetchMessage() {
  //fetching all message items
  yield takeEvery("FETCH_MESSAGE", fetchMessageAgain);
}

export default fetchMessage;
