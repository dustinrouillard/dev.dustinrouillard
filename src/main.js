// Modules
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';
import VueAnalytics from 'vue-analytics';
import VueShortkey from 'vue-shortkey';
import VueTippy from 'vue-tippy'

import core from './core';

// App, Router, and store
import App from './App';
import router from './router';

// Font Awesome Libraries
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedinIn, faTwitch, faGithub, faGitlab, faDiscord, faNpm, faPatreon, faKeybase } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VueChatScroll from 'vue-chat-scroll';

library.add({ faTwitter, faLinkedinIn, faTwitch, faGithub, faGitlab, faDiscord, faNpm, faEnvelope, faPatreon, faKeybase, faCodeBranch });

Vue.component('fa', FontAwesomeIcon);

Vue.use(VueChatScroll)

// Vue shortkey
Vue.use(VueShortkey);

// Vue Config Stuff
Vue.config.productionTip = false;
Vue.config.productionSourceMap = true;

// Use Vue Markdown
Vue.use(VueMarkdown);

// Use Vue Tippy
Vue.use(VueTippy);

Vue.use(core);

// User Vue Analytics
Vue.use(VueAnalytics, {
  id: 'UA-135624090-1',
  router
});

// Create Vue Instance
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
