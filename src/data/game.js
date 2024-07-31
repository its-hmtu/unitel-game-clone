import {
  createRoomByPlayNow,
  createRoomOfGame,
  getAllGame,
  getCheckEventWater,
  getGift,
  getListFriend,
  getListRoomOfGame,
  getPackage,
  getPageInfo,
  getRank,
  getRoomDetailOfGame,
  getRoomLevels,
  joinRoomNow
} from "api/game"
import { useMutation, useQueryClient } from "react-query"

export const allGameQuery = "all-game"
export const packageQuery = "package"
export const roomLevelsQuery = "room-levels"
export const giftQuery = "gift"
export const pageInfoQuery = "page-info"
export const rankQuery = "rank"
export const createRoomByPlayNowQueryKey = "create-room-by-play-now"
export const createRoomQueryKey = "create-room"
export const roomDetailQueryKey = "room-detail"
export const checkWaterQueryKey = "check-water"
export const listRoomQueryKey = "list-room"
export const joinNowQueryKey = "join-now"
export const friendPlayGameQuery = "invite-friend-play-game"

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

export const useCreateRoomByPlayNowOfGame = (
  success = () => {},
  error = () => {}
) => {
  const queryClient = useQueryClient()

  return useMutation(createRoomByPlayNow, {
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(createRoomByPlayNowQueryKey, data)
      if (data && parseInt(data.responseCode) !== 200) {
        error(data)
      } else {
        success(data)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(createRoomByPlayNowQueryKey)
    }
  })
}

export const useCreateRoomOfGame = (success = () => {}) => {
  const queryClient = useQueryClient()
  return useMutation(createRoomOfGame, {
    onSuccess: (data) => {
      success(data)
    },
    onSettled: async () => {
      queryClient.invalidateQueries(createRoomQueryKey)
    },
    onError: (error) => {
      console.log('error create room:', error)
    }
  })
}

export const getRoomDetailOfGameQuery = room_id => ({
  queryKey: [roomDetailQueryKey, {room_id}],
  queryFn: getRoomDetailOfGame,
  cacheTime: 0,
})

export const getCheckEventWaterQuery = () => ({
  queryKey: [checkWaterQueryKey],
  queryFn: getCheckEventWater,
})

export const getListRoomOfGameQuery = (
  game_id = 0,
  offset = 0,
  limit = 0,
  q = '',
  level = 1,
) => ({
  queryKey: [listRoomQueryKey, {game_id, offset, limit, q, level}],
  queryFn: getListRoomOfGame,
})

export const useJoinRoomNowOfGame = (
  success = () => {},
  error = () => {}
) => {
  const queryClient = useQueryClient()

  return useMutation(joinRoomNow, {
    onSuccess: data => {
      queryClient.setQueryData(joinNowQueryKey, data)
      if (data && parseInt(data.responseCode) !== 200) {
        error(data)
      }
      else {
        success(data)
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries(joinNowQueryKey)
    }
  })
}

export const getListFriendInvitePlayQuery = (offset = 0, limit = 10) => ({
  queryKey: [friendPlayGameQuery, {offset, limit}],
  queryFn: getListFriend
})
