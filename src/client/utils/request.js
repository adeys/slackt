import store from "../store";

const headers = {
    Accept: 'application/json'
};

function request(url, options) {
    let {auth, user} = store.getState();
    if (auth.isLoggedIn) {
        options.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return new Promise(((resolve, reject) => {
        let promise = fetch(url, options)
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    if (json.error.code === 401) {
                        store.setState({auth: {isLoggedIn: false}});
                        return;
                    }

                    if (reject) {
                        reject(json.error);
                        return;
                    }
                }

                resolve(json);
            });

        if (reject) {
            promise.catch(reject);
        }
    }))
}

export default {
    get: (url) => {
        return request(url, {method: 'GET', headers});
    },
    post: (url, data) => {
        return request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {...headers, 'Content-Type': 'application/json'}
        });
    }
};