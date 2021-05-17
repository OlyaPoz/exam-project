import {put} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/http/restController';
import {controller} from '../api/ws/socketController';

export  function* updateUserData(action){
    try{
        const {data}=yield restController.updateUser(action.data);
        yield put({type: ACTION.UPDATE_USER_DATA_SUCCESS,data: data});
        yield put({type: ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE,data: false});
    }
    catch (e) {
        yield  put({type: ACTION.UPDATE_USER_DATA_ERROR, error: e.response});
    }
}

