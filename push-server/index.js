const io = require('socket.io-client')
const config = require('../config')
const userInfo = config.userInfo
const command = require('../services/exec-release')

class PushService {

  constructor(url) {
    this.ready = false;
    this.client = io(url);
    this.roomId = '';
    this.client.on('connect', () => {
      this.client.emit('join', { userInfo })
    });
    this.client.on('joined', message => {
      this.ready = true;
      this.roomId = message.roomId
      console.log(`join socket.io-client for ${url} roomId ${this.roomId} ready`);
    })
  }
  listenPush() {
    this.client.on('message', ({ message, msgId, roomId }) => {
      console.log('message', message, msgId, roomId)
      this.client.emit('confirmRecept', { roomId, msgId})
      command.execRelease(message)
    })
  }
}

module.exports = new PushService(config.pushServiceUrl);

