import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* deleteItemFromMessage(action) {
  console.log("in the delete Message function!", action);

  try {
    yield axios.delete(`/api/message/${action.payload}`);

    yield put({ type: "FETCH_MESSAGE" });
  } catch (error) {
    console.log("error deleting this message.");
  }
}

function* deleteMessage() {
  yield takeEvery("DELETE_MESSAGE", deleteItemFromMessage);
}

export default deleteMessage;
