export default {
    local: {
        heartbeatTimer: null,
        instance: null
    },
    data: {
        endpoint: 'wss://api.dustin.sh/socket',
        token: '',
        pendingMessages: []
    },
    persist: ['token'],
    routes: {
        getSocketToken: request => request.get(`auth/ws`)
    },
    actions: {
        async getSocketToken({ data, routes }) {
            await routes.getSocketToken().then(res => {
                data.token = res.data.token;
            });
            return true;
        },

        heartbeat({ local }) {
            let ws = local.instance || null;
            if (ws && ws.readyState != ws.OPEN) return;
            ws.send(JSON.stringify({ type: 'PING' }));
        },

        connect({ data, local, actions }, container) {
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
                };

                local.instance.onclose = event => {
                    clearInterval(actions.heartbeatTimer);
                    data.connectionAlive = false;
                    if (event.code == 1001 || event.code == 4001) return;
                    setTimeout(() => actions.connect(), 5000);
                };
            });
        },

        sendMessage({ local, messages, data}, content) {
            let ws = local.instance || null;
            if (ws && ws.readyState != ws.OPEN) return;

            let nonce = Math.floor(Math.random() * 999999999999) + 1000000000;
            data.pendingMessages.push(nonce);

            ws.send(JSON.stringify({
                op: 1,
                data: {
                    content,
                    nonce
                },
            }));
        },

        socketEvent({ local, data, messages }) {
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
                            if (!messagePending) {
                                messages.collect(payload.data, 'chat-messages');
                            } else {
                                // console.log(nonce, payload.data.nonce);
                                messages.update(nonce, payload.data);
                            }

                            local.container.scrollTop = local.container.scrollHeight;

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