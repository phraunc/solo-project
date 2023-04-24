import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* sentMessageAgain(action) {
  try {
    const sentMessageItems = yield axios.get("/api/message/sent");
    console.log("lets see those sent messages!", action);
    yield put({
      type: "SENT_MESSAGE",
      payload: sentMessageItems.data,
    });
  } catch (err) {
    console.log("error", err);
  }
}

function* sentMessage() {
  yield takeEvery("SENT_MESSAGE_AGAIN", sentMessageAgain);
}

export default sentMessage;
