export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getData = (key) => {
  try {
    const data = localStorage.getItem(key)
    return JSON.parse(data)
  } catch (error) {
    console.error(error.message)
  }
}

export const removeData = (key) => {
  localStorage.removeItem(key)
}

export const getI18nextLng = key => {
  try {
    const data = localStorage.getItem(key)
    return data
  } catch(err) {
    console.error(err.message)
  }
}

export const getLanguage = () => {
  return getI18nextLng('i18nextLng')
}

export const getUserInfo = () => {
  return getData('userInfo')
}

export const saveUserInfo = (data) => {
  setData('userInfo', data)
}

export const destroyUserInfo = () => {
  removeData('userInfo')
}