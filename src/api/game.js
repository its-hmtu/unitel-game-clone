import axios from "axios";

export const getAllGame = async () => {
  try {
    const data = await axios.get('https://662b7376de35f91de1584f4b.mockapi.io/games')
    if (parseInt(data.status) !== 200) {
      throw new Error(data.message)
    } 

    // return data array
    return data.data
  } catch(e) {
    throw new Error(e.message)
  }
}

