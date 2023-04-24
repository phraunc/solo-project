import axios from "axios";
import {takeEvery, put, take} from 'redux-saga/effects';

function* editMessages(action){

    let idForUrl = Number(action.payload.item_id)

    try{
        yield axios.put(`/api/message/${idForUrl}`,action.payload)

        yield put({type:'FETCH_MESSAGE'})
    }catch(err){
        console.log('error editting messages', err)
    }

}

function* editMessageInMessage(){
yield takeEvery('EDIT_MESSAGE', editMessages);

}

export default editMessageInMessage;