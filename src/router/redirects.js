export default [
    { path: '/twitter', name: 'twitter', redirect: to => { window.location.href = 'https://twitter.com/dustinrouillard'; return to; } },
    { path: '/instagram', name: 'instagram', redirect: to => { window.location.href = 'https://instagram.com/dustinrouillard'; return to; } },
    { path: '/snapchat', name: 'snapchat', redirect: to => { window.location.href = 'https://snapchat.com/add/dustinrouillard'; return to; } },
    { path: '/notify', name: 'notify', redirect: to => { window.location.href = 'https://notify.me/dustin'; return to; } },
    { path: '/telegram', name: 'telegram', redirect: to => { window.location.href = 'https://t.me/joinchat/FUOJyhdhzeLrikZ67xipJA'; return to; } },
    { path: '/discord', name: 'discord', redirect: to => { window.location.href = 'https://discord.gg/dustin'; return to; } },
    { path: '/github', name: 'github', redirect: to => { window.location.href = 'https://github.com/dustinrouillard'; return to; } },
    { path: '/twitch', name: 'twitch', redirect: to => { window.location.href = 'https://twitch.tv/dustinrouillard'; return to; } },
    { path: '/linkedin', name: 'linkedin', redirect: to => { window.location.href = 'https://linkedin.com/in/dustinrouillard'; return to; } }
]