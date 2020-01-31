export default {
    local: {
        heartbeatTimer: null,
        instance: null
    },
    data: {
        endpoint: 'wss://api.dustin.sh/socket',
        chattersCount: 0,
        chatters: [],
        token: '',
        pendingMessages: []
    },
    persist: ['token'],
    routes: {
        getSocketToken: request => request.get(`auth/ws`)
    },
    actions: {
        async getSocketToken({ data, routes, accounts }) {
            try {
                let tokenReq = await routes.getSocketToken();
                data.token = tokenReq.data.token;

                return true;
            } catch (error) {
                data.token = null;
                accounts.authenticated = false;
                window.location = '/login';
                return false;
            }
        },

        heartbeat({ local }) {
            let ws = local.instance || null;
            if (ws && ws.readyState != ws.OPEN) return;
            ws.send(JSON.stringify({ type: 'PING' }));
        },

        connect({ data, local, actions, messages }, container) {
            // Check if the connection is alive
            if (data.connectionAlive) return;

            local.container = container;
            
            // Request a new socket token
            actions.getSocketToken().then(() => {
                // Create new instance
                local.instance = new WebSocket(`${data.endpoint}?token=${data.token}`);

                // Init all channels
                local.instance.onopen = () => {
                    actions.socketEvent();

                    // Start sending the socket heartbeat events every 30 seconds
                    local.heartbeatTimer = setInterval(() => actions.heartbeat(), 30000);

                    // Log and set connectionAlive true
                    actions.connectionAlive = true;

                    messages.collect({ id: Math.floor(Math.random() * 100000), content: 'Connected!', system: true, date: new Date().toISOString() }, 'chat-messages');
                    messages.collect({ id: Math.floor(Math.random() * 100000), content: 'Welcome to the chat room, remember everything on stream and in chat is confidential and is not allowed to be shared under any circumstances', system: true, date: new Date().toISOString() }, 'chat-messages');
                };

                local.instance.onclose = event => {
                    clearInterval(actions.heartbeatTimer);
                    data.connectionAlive = false;
                    if (event.code == 1001 || event.code == 4001) return;
                    setTimeout(() => actions.connect(), 5000);
                };
            });
        },

        sendMessage({ local, data }, content, action) {
            let ws = local.instance || null;
            if (ws && ws.readyState != ws.OPEN) return;

            let nonce = Math.floor(Math.random() * 999999999999) + 1000000000;
            data.pendingMessages.push(nonce);

            let msgData = { op: 1, data: { content, nonce, action }, };
            ws.send(JSON.stringify(msgData));

            return msgData;
        },

        socketEvent({ local, data, messages, stream }) {
            local.instance.onmessage = message => {
                try {
                    let payload = JSON.parse(message.data);

                    switch (payload.op) {
                        case 1:
                            // delete msg.nonce;
                            let messagePending = data.pendingMessages.includes(payload.data.nonce);
                            data.pendingMessages = data.pendingMessages.filter(_nonce => _nonce != nonce);

                            let nonce = payload.data.nonce;

                            // delete payload.data.nonce;
                            if (!messagePending) messages.collect(payload.data, 'chat-messages');
                            else messages.update(nonce, payload.data);

                            local.container.scrollTop = local.container.scrollHeight;

                            break;

                        case 0:
                            data.chattersCount = payload.data.chattersCount;
                            data.chatters = payload.data.chatters;
                            break;
                        case 9:
                            stream.online = !!payload.data.url

                            stream.url = payload.data.url;
                            stream.title = payload.data.title;

                            if (typeof payload.data.online != 'undefined') return;

                            if (stream.online) messages.collect({ id: Math.floor(Math.random() * 100000), content: 'Stream started', system: true, date: new Date().toISOString() }, 'chat-messages');
                            else messages.collect({ id: Math.floor(Math.random() * 100000), content: 'Stream ended', system: true, date: new Date().toISOString() }, 'chat-messages');

                            break;

                        case 10:
                            messages.account = payload.data;
                            break;
                            
                        default:
                            console.log(payload);
                            break;
                    }
                } catch (err) {
                    // nothing
                }
            };
        },
    }
}