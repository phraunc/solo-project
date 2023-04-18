import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

//this saga will add a new message
function* postNewMessage(action) {
  try {
    yield axios.post("/api/message", action.payload);
console.log('action.payload', action.payload)
    yield put({
      type: "FETCH_MESSAGE",
    });
  } catch (err) {
    console.log("error", err);
  }
}

function* postMessage() {
  yield takeEvery("ADD_MESSAGE", postNewMessage);
}

export default postMessage;
