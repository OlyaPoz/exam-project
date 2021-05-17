const WebSocket = require('./WebSocket');
const CONSTANTS = require('../../../constants');

class ChatController extends WebSocket{

  anotherSubscribes (socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat (socket) {
    socket.on('subscribeChat', (id) => {
      console.log('new socket client:',id)
      socket.join(id);
    });
  }

  onUnsubscribeChat (socket) {
    socket.on('unsubscribeChat', (id) => {
      socket.join(id);
      console.log('minus socket client:',id)
    });
  }

  emitNewMessage (target, message) {
    this.io.to(Number(target)).emit(CONSTANTS.NEW_MESSAGE,
      { message });
  }

  emitChangeBlockStatus (target, message) {
    this.io.to(Number(target)).emit(CONSTANTS.CHANGE_BLOCK_STATUS,
      { message });
  }
}

module.exports = ChatController;