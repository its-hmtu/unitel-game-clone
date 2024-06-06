import {
  getAllGame
} from "api/game"

export const allGameQuery = "all-game"

export const getAllGameQuery = () => ({
  queryKey: [allGameQuery],
  queryFn: getAllGame,
  refetchOnWindowFocus: false
})