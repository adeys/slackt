const headers = {
    Accept: 'application/json'
};

module.exports = {
    get: (url) => {
        return fetch(url, {method: 'GET', headers});
    },
    post: (url, data) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {...headers, 'Content-Type': 'application/json'}
        });
    }
};