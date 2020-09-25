export default {
    data: {
        online: false,
        title: 'Pending',
        url: ''
    },
    computed: {
        options({ stream }) {
            return {
                autoplay: true,
                muted: true,
                controls: true,
                poster: "https://assets.notify.me/covers/2.png",
                suppressNotSupportedError: true,
                live: true,
                source: {
                    src: stream.url
                }
            }
        }
    }
}