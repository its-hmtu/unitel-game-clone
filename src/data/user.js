import { useMutation, useQueryClient } from "react-query";
import { getGiftHistApi, getSettingApi, getUserApi, loginApi, updateUserInfoApi, updateUserSettingApi } from "api/user";
import { saveUserInfo } from "src/utils/localStorage";

export const userInfoKey = 'user-info';
export const settingKey = 'setting';
export const giftHistKey = 'gift-hist';
export const updateSettingKey = 'update-setting';

export const useLogin = (succes = function() {}, error = function() {}) => {
  const queryClient = useQueryClient();

  return useMutation(loginApi, {
    onSuccess: (data) => {
      saveUserInfo(data.data);
      queryClient.setQueryData(userInfoKey, data.data);
      if (data && parseInt(data.responseCode) !== 403) {
        console.log(data.data)
        succes(data.data)
      } else {
        error()
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(userInfoKey);
    }
  })
}

export const getUserQuery = () => ({
  queryKey: [userInfoKey],
  queryFn: getUserApi,
  refetchOnWindowFocus: true
})

export const getSettingQuery = () => ({
  queryKey: [settingKey],
  queryFn: getSettingApi,
  refetchOnWindowFocus: false
})

export const getGiftHistQuery = (time = 3, offset = 0, limit = 10) => ({
  queryKey: [giftHistKey, { time, offset, limit }],
  queryFn: getGiftHistApi,
  // refetchOnWindowFocus: false
})

export const useUpdateUserInfo = (success = () => {}) => {
  const queryClient = useQueryClient(); 
  return useMutation(updateUserInfoApi, {
    onSuccess: (data) => {
      queryClient.setQueryData(userInfoKey, data)
      success();
    },
    onSettled: async () => {
      queryClient.invalidateQueries(userInfoKey);
    }
  })
}

export const useUpdateSetting = (success = () => {}, error = () => {}) => {
  const queryClient = useQueryClient();

  return useMutation(updateUserSettingApi, {
    onSuccess: data => {
      queryClient.setQueryData(updateSettingKey, data.data)
      if (data && parseInt(data.responseCode) !== 200) {
        error(data)
      } else {
        success(data.data)
      }
    },
    onSettled: async () => {
      queryClient.invalidateQueries(updateSettingKey);
    }
  })
}