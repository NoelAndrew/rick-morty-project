const rickServiceID = (httpClient) => {
    const getCharacterByID = (name) => httpClient.get(`/character/?name=${name}`);

    return {
        getCharacterByID
    }
};

export default rickServiceID;
