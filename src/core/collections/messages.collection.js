export default {
    data: {
        account: {
            id: '',
            username: '',
            name: '',
            color: ''
        }
    },
    groups: ['chat-messages'],
    routes: {

    },
    actions: {
        async send({ collect, services, data }, content) {

            if (content.startsWith('/')) {
                let lc = content.toLowerCase();
                let cmd = lc
                    .split("/")
                    .slice(1)
                    .join("")
                    .split(" ")[0];

                let raw = content.split(" ").splice(1).join(" ");

                switch (cmd) {
                    case "ping":
                        let content = 'Pong!';
                        collect({ id: Math.floor(Math.random() * 100000), content, system: true, date: new Date().toISOString() }, 'chat-messages');
                        break;

                    case "me":
                        let author = { username: data.account.username, name: data.account.name, action: true };
                        collect({ id: Math.floor(Math.random() * 100000), author, content: raw, date: new Date().toISOString() }, 'chat-messages');
                        await services.socket.sendMessage(raw, true);
                        break;
                    default:
                        break;
                }
            } else {
                let author = { username: data.account.username, name: data.account.name };
                collect({ id: Math.floor(Math.random() * 100000), content, author, date: new Date().toISOString() }, 'chat-messages');

                await services.socket.sendMessage(content);

                return true;
            }
        },

        populate({ collect }) {
            // collect(
            //     [
            //         { id: 1, content: "test", author: { username: "dustin", name: "Dustin", mod: true, color: '#9bb8dc' }, sent: new Date().setMinutes(Math.floor(Math.random() * 5), Math.floor(Math.random() * 59)) },
            //         { id: 2, content: "test 2", author: { username: "dustin", name: "Dustin", mod: true, color: '#9bb8dc' }, sent: new Date().setMinutes(13, Math.floor(Math.random() * 59)) },
            //         { id: 3, content: "biggest fan", author: { username: "deirdre", name: "Deirdre", mod: false, color: '#3bb0ff' }, sent: new Date().setMinutes(22, Math.floor(Math.random() * 59)) },
            //         { id: 4, content: "test", author: { username: "dustin", name: "Dustin", mod: true, color: '#9bb8dc' }, sent: new Date().setMinutes(35, Math.floor(Math.random() * 59)) },
            //         { id: 5, content: "yo yo yo", author: { username: "jake", name: "Jake", mod: true, color: '#fff000' }, sent: new Date().setMinutes(43, Math.floor(Math.random() * 59)) },
            //         { id: 6, content: "wtf", author: { username: "ty", name: "Ty", mod: false, color: '#e11551' }, sent: new Date().setMinutes(59, Math.floor(Math.random() * 59)) }
            //     ],
            //     "chat-messages"
            // );
        }
    }
}