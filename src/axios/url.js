/*
 * Email:519983770@qq.com
 */

//注册用的URL
export const LOGIN_URL = "/user/login"; //登录
export const IF_REGISTER_URL = "/user/checkIfRegister"; //是否注册
export const GET_VERIFY_CODE_URL = "/user/getVerificationCode"; //获取验证码
export const CHECK_VERIFY_CODE_URL = "/user/checkVerifyCode"; //验证码是否正确
export const REGISTER_URL = "/user/register"; //注册
export const FORGET_PASSWORD_URL = "/user/forgetPassword"; //忘记密码
export const DESTROY_URL = "/user/destroyUser"; //注册

//系统
export const VERSION_URL = "/system/checkVersion"; //获取软件版本号

//账户
export const ACCOUNT_INFO_URL = "/user/query/userInfo"; //查询账户详情
export const ACCOUNT_UPDATE_URL = "/user/updateUser"; //更新账户
export const MODIFY_PWD_URL = "/user/modifyPassword"; //修改账户的密码
export const CHECK_PWD_URL = "/user/query/checkPassword"; //校验用户密码
export const CHANGE_ACCOUT_URL = "/user/changeAccount"; //更换账号

//出库设备
export const DEVICE_MANAGE_URL = "/device/manage/queryDeviceList"; //查询管理的设备
export const DEVICE_UNMANAGE_URL = "/device/unManage/queryDeviceList"; //查询普通设备
export const DEVICE_MODIFY_NAME_URL = "/device/modify/deviceName"; //设备管理员修改设备名称
export const DEVICE_MODIFY_STATUS_URL = "/device/modify/deviceStatus"; //设备管理员修改设备状态
export const DEVICE_BIND4USER_URL = "/user/device/bindDevice4User"; //设备管理员添加用户
export const DEVICE_USER_LIST_URL = "/user/device/manage/queryUserList"; //设备管理员：查询设备下的用户
export const DEVICE_UNBIND4USER_URL = "/user/device/unbindDevice4User"; //设备管理员：收回钥匙
export const DEVICE_UPDATE_DATE_URL = "/user/device/modify/user"; //设备管理员：修改有效期
export const DEVICE_ALL_LIST_URL = "/user/device/queryAllDeviceList"; //获取用户下的所有设备
export const DEVICE_BIND_URL = "/user/device/bindDevice"; //绑定设备

//开门历史记录
export const OPEN_HISTORY = "/open/door/history/query/list"; //开门历史记录
