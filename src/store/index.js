import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
  }
})

export default store;