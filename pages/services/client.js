export const HttpClient = ({ baseUrl }) => {
    const get = (url) => fetch(baseUrl + url, {
        method: 'GET',
    }).then(res => res.json());

    return {
        get,
    }
}