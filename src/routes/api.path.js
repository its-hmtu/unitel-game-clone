// const API_BASE_PATH = 'http://subasta.local:6788/'

const API_BASE_PATH = import.meta.env.VITE_REACT_APP_DOMAIN_API
// const API_BASE_PATH = "http://125.212.238.157:6799"
const API_ADMIN_PATH = `${API_BASE_PATH}/v1/`

export const API_PATHS = {
	getUser: `${API_ADMIN_PATH}user/get-userinfo`,
	getSetting: `${API_ADMIN_PATH}default/get-setting`,
	updateSetting: `${API_ADMIN_PATH}user/update-setting`,
	login: `${API_ADMIN_PATH}auth/authorize`,
	shopOTP: `${API_ADMIN_PATH}personal/register-service`,
	buyPackage: `${API_ADMIN_PATH}personal/buy-package`,
	changePass: `${API_ADMIN_PATH}user/change-password`,
	addReward: `${API_ADMIN_PATH}personal/add-reward`,
	getOTP: `${API_ADMIN_PATH}auth/push-otp`,
	getAllGame: `${API_ADMIN_PATH}default/get-all-game`,
	getPageInfo: `${API_ADMIN_PATH}default/get-page-info`,
	getPackage: `${API_ADMIN_PATH}default/list-package`,
	getRank: `${API_ADMIN_PATH}default/get-rank`,
	getRankPoint: `${API_ADMIN_PATH}user/get-rank-point`,
	getGift: `${API_ADMIN_PATH}default/gift`,
	getGiftHist: `${API_ADMIN_PATH}user/gift-history`,
	getFriend: `${API_ADMIN_PATH}default/friend`,
	getListRoomOfGame: `${API_ADMIN_PATH}room/list-room`,
	getLevelRoomOfGame: `${API_ADMIN_PATH}room/room-level`,
	createRoomOfGame: `${API_ADMIN_PATH}room/create-room`,
	createRoomByPlayNowOfGame: `${API_ADMIN_PATH}room/playing-now`,
	getRoomDetailOfGame: `${API_ADMIN_PATH}room/room-detail`,
	checkStartGame: `${API_ADMIN_PATH}room/check-start-game`,
	getListFriendInvitePlayGame: `${API_ADMIN_PATH}default/friend`,
	getUserInfo: `${API_ADMIN_PATH}user/get-userinfo`,
	getListInvitation: `${API_ADMIN_PATH}user/list-invitation`,
	acceptInviteFriend: `${API_ADMIN_PATH}user/accept-invite-friend`,
	editUserInfo: `${API_ADMIN_PATH}account/edit-profile`,
	joinRoomNow: `${API_ADMIN_PATH}room/join-now`,
	cancelPackage: `${API_ADMIN_PATH}personal/deregister-service`,
	getCheckEventWater: `${API_ADMIN_PATH}water/check-status`,
	getDropEventWater: `${API_ADMIN_PATH}water/get-drop`,
	getRankEventWater: `${API_ADMIN_PATH}water/get-rank`,
}
