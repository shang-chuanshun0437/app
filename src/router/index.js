import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OpenDoor from '../views/door/OpenDoor'
import Doors from '../views/door/Doors'
import My from '../views/my/My'
import ChangePwd from '../views/my/ChangePwd'
import EditUserInfo from '../views/my/EditUserInfo'
import Settings from '../views/my/Settings'
import Login from '../views/login/Login'
import Register from '../views/login/Register'
import VerifyCode from '../views/login/VerifyCode'
import RegisterPassword from '../views/login/RegisterPassword'
import ForgetPassword from '../views/login/ForgetPassword'
import CheckPassword from '../views/my/CheckPassword'
import ChangeAccount from '../views/my/ChangeAccount'
import AboutUs from '../views/my/AboutUs'
import ContactUs from '../views/my/ContactUs'
import Contract from '../views/my/Contract'
import Help from '../views/my/Help'
import Device from '../views/device/Device'
import DeviceDetail from '../views/device/DeviceDetail'
import DeviceUsers from '../views/device/DeviceUsers'
import BindDevice4User from '../views/device/BindDevice4User'
import BindDevice from '../views/device/BindDevice'
import OpenDoorHistory from '../views/door/OpenDoorHistory'
import Select from '../views/select/Select'
import Renting from '../views/renting/Renting'
import Live from '../views/live/Live'
import Community from '../views/community/Community'
import Service from '../views/service/Service'
import Suggestion from '../views/suggestion/Suggestion'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home',name: 'home',component: Home },
    { path: '/lock/doors',name: 'doors',component: Doors },
    { path: '/lock/openDoor', name: 'openDoor',component: OpenDoor },
    { path: '/my',name: 'my',component: My },
    { path: '/lock/login',name: 'login',component: Login },
    { path: '/lock/register', name: 'register', component: Register },
    { path: '/lock/verifyCode', name: 'verifyCode', component: VerifyCode },
    { path: '/lock/registerPassword', name: 'registerPassword', component: RegisterPassword },
    { path: '/lock/forgetPassword', name: 'forgetPassword', component: ForgetPassword },
    { path: '/user/editUserInfo', name: 'editUserInfo', component: EditUserInfo },
    { path: '/user/settings', name: 'settings', component: Settings },
    { path: '/user/changePwd', name: 'changePwd', component: ChangePwd },
    { path: '/user/checkPassword', name: 'checkPassword', component: CheckPassword },
    { path: '/user/changeAccount', name: 'changeAccount', component: ChangeAccount },
    { path: '/user/aboutUs', name: 'aboutUs', component: AboutUs },
    { path: '/device/devices', name: 'device', component: Device },
    { path: '/device/deviceDetail', name: 'deviceDetail', component: DeviceDetail },
    { path: '/device/deviceUsers', name: 'deviceUsers', component: DeviceUsers },
    { path: '/device/bindDevice4User', name: 'bindDevice4User', component: BindDevice4User },
    { path: '/device/bindDevice', name: 'bindDevice', component: BindDevice },
    { path: '/device/OpenDoorHistory', name: 'openDoorHistory', component: OpenDoorHistory },
    { path: '/select', name: 'select', component: Select },
    { path: '/home/renting', name: 'renting', component: Renting },
    { path: '/home/live', name: 'live', component: Live },
    { path: '/home/community', name: 'community', component: Community },
    { path: '/home/service', name: 'service', component: Service },
    { path: '/home/suggestion', name: 'suggestion', component: Suggestion },
    { path: '/my/contactUs', name: 'contactUs', component: ContactUs },
    { path: '/my/contract', name: 'contract', component: Contract },
    { path: '/my/help', name: 'help', component: Help },
  ]
})
