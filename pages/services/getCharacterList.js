const getCharacterList = (httpClient) => {
    const getList = (page = 1) => httpClient.get(`/character/?page=${page}`);

    return {
        getList,
    }
};

export default getCharacterList;
