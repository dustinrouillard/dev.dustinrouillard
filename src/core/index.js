import Pulse from 'pulse-framework';
import Vue from 'vue';

// Controllers
import messages from './collections/messages.collection';
import accounts from './collections/accounts.collection';

// Services
import socket from './services/socket.service';

Pulse.use(Vue);

export default new Pulse({
    request: {
        baseURL: 'https://api.dustin.sh',
        credentials: 'include'
    },
    collections: {
        messages,
        accounts
    },
    services: {
        socket
    }
});
