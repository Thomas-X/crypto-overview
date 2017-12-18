import io from 'socket.io';

export default class Socket {

    constructor (http) {
        this.io = io(http);
    }

    bindSockets () {
        // bind sockets here
        // samples
        // this.io.emit('bla', {bla: 'bla' });
        // this.io.on('bla', (data) => { info(data) });
    }
}