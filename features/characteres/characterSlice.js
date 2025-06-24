import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCharacterList } from '@/services/getCharacterList';
import { normalize } from 'normalizr';
import { characterList } from './schema';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page) => {
    const response = await getCharacterList(page);
    const normalizedData = normalize(response.results, characterList);
    return normalizedData;
  }
);

const initialState = {
  entities: {
    characters: {},
  },
  ids: [],
  page: 1,
  loading: false,
  hasMore: true,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        const { entities, result } = action.payload;
        state.entities.characters = {
          ...state.entities.characters,
          ...entities.characters,
        };
        const newIds = result.filter((id) => !state.ids.includes(id));
        state.ids = [...state.ids, ...newIds];
        state.page += 1;
        state.loading = false;
        state.hasMore = result.length > 0;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.loading = false;
        state.hasMore = false;
      });
  },
});

export default characterSlice.reducer;
