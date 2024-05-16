import { createSlice } from "@reduxjs/toolkit";
import { fetchAllGames, fetchRoomLevels } from "./actions";

const initialState = {
  games: [],
  selected: {},
  roomLevels: []
}

export const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    selectGame: (state, action) => {
      state.selected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGames.fulfilled, (state, action) => {
      state.games = action.payload;
    })

    builder.addCase(fetchRoomLevels.fulfilled, (state, action) => {
      state.roomLevels = action.payload;
    })
  }
}) 

export default gameSlice.reducer;