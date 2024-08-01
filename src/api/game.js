import axios from "axios";
import { API_PATHS } from "src/routes/api.path";
import { getUrlParamsFromJson } from "utils/helpers";
import { destroyUserInfo, getUserInfo } from "utils/localStorage";

export const getAllGame = async () => {
  try {
    const { data } = await axios.get(API_PATHS.getAllGame)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || 'Error')
    }

    return data.data.games
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getRoomLevels = async () => {
  try {
    const {data} = await axios.get(API_PATHS.getLevelRoomOfGame)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message)
    }

    return data.data.roomLevels
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getPackage = async () => {
  try {
    const { data } = await axios.get(API_PATHS.getPackage)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message)
    }

    return data.data
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getGift = async () => {
  try {
    const {data} = await axios.get(API_PATHS.getGift)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message)
    }

    return data.data.gifts
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getPageInfo = async () => {
  try {
   const { data } = await axios.get(API_PATHS.getPageInfo)

   if (parseInt(data.responseCode) !== 200) {
    throw new Error(data.message)
   }

   return data.data.banner
  } catch (e) {
    console.error(e.message)
  }
}

export const getRank = async ({queryKey}) => {
  try {
    const [, {time, offset, limit}] = queryKey
    const {data} = await axios.get(
      `${API_PATHS.getRank}?time=${time}&offset=${offset}&limit=${limit}`
    )

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.errorMessage || "Can't get user ranking")
    }

    // console.log(data.data.ranks)
    return data.data.ranks
  } catch (e) {
    console.error(e.message)
  }
}

export const createRoomByPlayNow = async (play) => {
  try {
    const {data} = await axios.post(API_PATHS.createRoomByPlayNowOfGame, play)

    if (parseInt(data.responseCode) !== 200) {
      // 
    }

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const createRoomOfGame = async paramsGame => {
  try {
    const { data } = await axios.post(
      `${API_PATHS.createRoomOfGame}`,
      paramsGame,
    )

    if (parseInt(data.responseCode) !== 200) {
      if (parseInt(data.responseCode) === 403) {
        if (getUserInfo()) {
          destroyUserInfo()
        }
      }
      return {
        status: false,
        data: null,
        message: data.message || "Can't create room!"
      }
    }
    return {
      status: true,
      data: data.data,
      message: data.message || 'Success'
    }
  } catch (e) {
    console.error(e.message)
    return {
      status: false,
      data: null,
      message: "Can't create room!"
    }
  }
}

export const getRoomDetailOfGame = async ({queryKey}) => {
  try {
    const [, { room_id }] = queryKey
    const params = getUrlParamsFromJson({ room_id })
    const { data } = await axios.get(
      `${API_PATHS.getRoomDetailOfGame}?${params}`
    )
    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || "Can't get room detail!")
    }

    return data.data
  } catch (e) {
    console.error(e.message);
  }
}

export const getCheckEventWater = async () => {
  try {
    const { data, status } = await axios.get(API_PATHS.getCheckEventWater)
    if (status !== 200) {
      return null
    }

    return data.data
  } catch (e) {
    return null
  }
}

export const getListRoomOfGame = async ({queryKey}) => {
  try {
    const [, {game_id, offset, limit, q, level}] = queryKey
    const params = getUrlParamsFromJson({
      game_id,
      limit,
      offset,
      q,
      level,
    })

    const {data} = await axios.get(`${API_PATHS.getListRoomOfGame}?${params}`)
    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || "Can't get list room!")
    }
    
    return {rooms: data.data.rooms}
  } catch (e) {
    console.error(e.message)
  }
}

export const joinRoomNow = async (joinNow) => {
  try {
    const { data } = await axios.post(API_PATHS.joinRoomNow, joinNow)

    return data
  } catch (e) {
    console.error(e.message)
    return e
  }
}

export const getListFriend = async ({queryKey}) => {
  try {
    const [, {offset, limit}] = queryKey
    const params = getUrlParamsFromJson({offset, limit})

    const {data} = await axios.get(`${API_PATHS.getListFriendInvitePlayGame}?${params}`)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || "Can't get list friend!") 
    }

    return data.data
  } catch (e) {
    console.error(e.message)
  }
}
