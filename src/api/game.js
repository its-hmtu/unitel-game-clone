import axios from "axios";

export const getAllGame = async () => {
  try {
    const data = await axios.get('https://fir-2630f-default-rtdb.asia-southeast1.firebasedatabase.app/games.json')
    if (parseInt(data.status) !== 200) {
      throw new Error(data.message)
    } 

    // return data array
    return data.data
  } catch(e) {
    throw new Error(e.message)
  }
}

export const getRoomLevels = async () => {
  try {
    const data = await axios.get('https://fir-2630f-default-rtdb.asia-southeast1.firebasedatabase.app/room-levels.json')

    if (parseInt(data.status) !== 200) {
      throw new Error(data.message)
    }

    return data.data
  } catch(e) {
    throw new Error(e.message)
  }
}

