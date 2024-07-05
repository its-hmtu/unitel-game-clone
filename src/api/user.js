import axios from "axios";
import { parse } from "dotenv";
import { API_PATHS } from "routes/api.path";
import { getLanguage, getUserInfo } from "utils/localStorage";

axios.interceptors.request.use(
   (config) => {
    const user = getUserInfo()
    const lng = getLanguage()
    config.headers.Authorization = `Bearer ${user?.accessToken}`
    config.headers.language = lng
    return config
  }, 
  (error) => {
    return Promise.reject(error)
  }
)

export const loginApi = async (user) => {
  try {
    const { data, status } = await axios.post(API_PATHS.login, user)

    if (status !== 200 || data?.success === false) {
      throw new Error(data.message || "Login failed")
    }

    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const updateUserInfoApi = async userInfo => {
  try {
    const {data} = await axios.post(API_PATHS.editUserInfo, userInfo)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || "Cannot update user info")
    }

    console.log(data)
    return data
  } catch (e) {
    console.error(e.message)
  }
}

export const getUserApi = async () => {
  try {
    const {data} = await axios.get(API_PATHS.getUser)
    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || 'Cannot get user info')
    }

    return data.data
  } catch (e) {
    console.error(e.message)
  }
}

export const getSettingApi = async () => {
  try {
    const {data} = await axios.get(API_PATHS.getSetting)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message)
    }

    return data.data.htmlContent
  } catch (e) {
    console.error(e.message)
  }
}

export const getGiftHistApi = async ({ queryKey }) => {
  try {
    const [, { time, offset, limit }] = queryKey

    const {data} = await axios.get(`${API_PATHS.getGiftHist}?time=${time}&offset=${offset}&limit=${limit}`)

    if (parseInt(data.responseCode) !== 200) {
      throw new Error(data.message || "Cannot get gift history")
    }
    return data.data.history
  } catch (e) {
    console.error(e.message)
  }
}

export const updateUserSettingApi = async (setting) => {
  try {
    const {data, status} = await axios.post(API_PATHS.updateSetting, setting)

    if (status !== 200 || data?.success === false) {
      throw new Error(data.message || "Can't update setting!")
    }

    return data
  } catch(e) {
    console.error(e.message)
  }
}

