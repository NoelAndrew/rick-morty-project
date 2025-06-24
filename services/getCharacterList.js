import axios, { AxiosError } from "axios";

const API_URL = 'https://rickandmortyapi.com/api/'

export const getCharacterList = async (page) => {
    try {
      const { data } = await axios.get(`${API_URL}/character/?page=${page}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(`Error fetching all products: ${error.message}`);
      }
      throw error;
    }
  };
