const rickServiceName = (httpClient) => {
    const getCharacterByName = (id) => httpClient.get(`/character/${id}`);

    return {
        getCharacterByName
    }
};

export default rickServiceName;
