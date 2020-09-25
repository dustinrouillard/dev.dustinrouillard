export default {
    data: {
        username: '',
        authenticated: false
    },
    routes: {
        login: (request, body) => request.post(`auth`, body),
        register: (request, body) => request.post(`auth/register`, body)
    },
    persist: ['username', 'authenticated'],
    actions: {
        async login({ data, routes }, username, password, router) {
            data.username = username;

            let login = await routes.login({ username, password });
            if (!login) return false;

            data.authenticated = true;

            // Navigate to the nda stream page
            router.push('nda');

            return true;
        },

        async register({ data, routes }, username, password, code, router) {
            data.username = username;

            let register = await routes.register({ username, name: username, password, code });
            if (!register) return false;

            data.authenticated = true;

            // Navigate to the nda stream page
            router.push('nda');

            return true;
        }
    }
}