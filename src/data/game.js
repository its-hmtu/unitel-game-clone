import {
  getAllGame,
  getGift,
  getPackage,
  getPageInfo,
  getRank,
  getRoomLevels
} from "api/game"

export const allGameQuery = "all-game"
export const packageQuery = "package"
export const roomLevelsQuery = "room-levels"
export const giftQuery = "gift"
export const pageInfoQuery = "page-info"
export const rankQuery = "rank"

export const getAllGameQuery = () => ({
  queryKey: [allGameQuery],
  queryFn: getAllGame,
  refetchOnWindowFocus: false
})

export const getPackageQuery = () => ({
  queryKey: [packageQuery],
  queryFn: getPackage,
  refetchOnWindowFocus: false
})

export const getRoomLevelsQuery = () => ({
  queryKey: [roomLevelsQuery],
  queryFn: getRoomLevels,
  refetchOnWindowFocus: false
})

export const getGiftQuery = () => ({
  queryKey: [giftQuery],
  queryFn: getGift,
  refetchOnWindowFocus: false
})

export const getPageInfoQuery = () => ({
  queryKey: [pageInfoQuery],
  queryFn: getPageInfo,
  refetchOnWindowFocus: false
})

export const getRankQuery = (time = 'month', offset = 0, limit = 10) => ({
  queryKey: [rankQuery, {time, offset, limit}],
  queryFn: getRank
})