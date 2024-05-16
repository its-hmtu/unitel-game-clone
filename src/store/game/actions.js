import {createAsyncThunk} from "@reduxjs/toolkit";
import { getAllGame, getRoomLevels } from "src/api/game";

export const fetchAllGames = createAsyncThunk("game/fetchAllGames", async () => {
  try {
    const data = await getAllGame();
    return data;
  } catch (e) {
    console.log(e);
  }
})

export const fetchRoomLevels = createAsyncThunk("game/fetchRoomLevels", async () => {
  try {
    const data = await getRoomLevels();
    return data;
  } catch (e) {
    console.log(e)
  }
})

