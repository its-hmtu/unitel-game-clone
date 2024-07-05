import axios from "axios";
import { API_PATHS } from "src/routes/api.path";

export const getAllGame = async () => {
  try {
    // const data = await axios.get('https://fir-2630f-default-rtdb.asia-southeast1.firebasedatabase.app/games.json')
    
    // console.log(data)
    // if (parseInt(data.status) !== 200) {
    //   throw new Error(data.message)
    // } 

    // return data.data

    const { data } = await axios.get(API_PATHS.getAllGame)

    console.log(data)

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

    return data.data.ranks
  } catch (e) {
    console.error(e.message)
  }
}

