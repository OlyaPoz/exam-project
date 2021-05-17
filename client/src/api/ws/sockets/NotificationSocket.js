import WebSocket from './WebSocket';
import React from 'react';
import Notification from '../../../components/Notification/Notification';
import {toast} from 'react-toastify';

class NotificationSocket extends WebSocket {
    constructor(dispatch, getState, room) {
        super(dispatch, getState, room);
    }

    onNewMessageNotification = () => {
        this.socket.on('messageNotification', ({dialogId})=>{
            console.log('it works', dialogId)
            const {chatStore:{chatData}} = this.getState()
            if(chatData && chatData._id !== dialogId){
                toast(`You have a new message`)
            }
        })
    };

    anotherSubscribes = () => {
        this.onEntryCreated();
        this.onChangeMark();
        this.onChangeOfferStatus();
        this.onNewMessageNotification();
    };

    onChangeMark = () => {
        this.socket.on('changeMark', () => {
            toast('Someone liked your offer');
        })
    };

    onChangeOfferStatus = () => {
        this.socket.on('changeOfferStatus', (message) => {
            toast(<Notification message={message.message} contestId={message.contestId}/>);
        })
    };

    onEntryCreated = () => {
        this.socket.on('onEntryCreated', () => {
            toast('New Entry');
        })
    };

    subscribe = (id) => {
        this.socket.emit('subscribe', id);
    };
    unsubsctibe = (id) => {
        this.socket.emit('unsubscribe', id);
    }
}

export default NotificationSocket;