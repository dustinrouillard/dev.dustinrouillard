import Pulse from 'pulse-framework';
import Vue from 'vue';

// Controllers
import messages from './collections/messages.collection';
import accounts from './collections/accounts.collection';

Pulse.use(Vue);

export default new Pulse({
    collections: {
        messages,
        accounts
    }
});
