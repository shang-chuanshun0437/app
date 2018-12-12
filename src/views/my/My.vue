<template>
  <div class="me">
    <div class="title">
      <span class="titleName">我的</span>
      <img src="../../assets/settings.png" class="backImg" @click="changeToSetting">
    </div>
    <div class="wrapper">
      <div class="header">
        <img src="../../assets/xiaoxiong.jpg" class="img" @click="changeToLogin"/>
        <ul class="ul">
          <li class="username" @click="changeToLogin">
            {{user.userName}}
          </li>
          <li class="userPhone" @click="changeToLogin">
            账号：{{user.userPhone}}
          </li>
        </ul>
      </div>
      <div class="nav">
        <ul class="ul basic">
          <li class="device" @click="device()">
            <mt-cell title="设备管理" is-link>
              <i slot="icon" class="icon iconfont el-icon-ali-doorhandle" ></i>
            </mt-cell>
          </li>
          <li class="device" @click="contract()">
            <mt-cell title="租房合约" is-link>
              <i slot="icon" class="icon iconfont el-icon-ali-gaiicon-" ></i>
            </mt-cell>
          </li>
        </ul>
        <ul class="ul contact">
          <li class="device" @click="help()">
            <mt-cell title="帮助信息" is-link>
              <i slot="icon" class="icon iconfont el-icon-ali-bangzhu" ></i>
            </mt-cell>
          </li>
          <li class="device" @click="contact()">
            <mt-cell title="联系我们" is-link>
              <i slot="icon" class="icon iconfont el-icon-ali-jishuzhichizhichizhinengkefuzhinengfuwuzhinengzhichi" ></i>
            </mt-cell>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import UserDB from "../../common/UserDB"
  import Tabbar from '../../components/Tabbar'
  export default {
    data(){
      return{
        user: {
          src: '../../assets/logo.png',
          userName: '未设置昵称',
          userPhone: "未登录",
          token:'',
           setting: {
            badge: 2,
         }
        }
      }
    },
    components: {
    },
    methods:{
      changeToSetting(){            //跳转到设置界面
        if (this.user.userPhone == '未登录'){
          this.$router.push('/lock/login');
        }else {
          this.$router.push('/user/settings');
          console.log('ssdddf')
        }
      },
      changeToLogin(){       //跳转到登录界面
        if (this.user.userPhone == '未登录'){
          this.$router.push('/lock/login');
        }else {
          this.$router.push('/user/editUserInfo');
          console.log('ssdddf')
        }
      },
      device(){
        if (this.user.userPhone == '未登录'){
          this.$router.push('/lock/login');
        }else {
          this.$router.push({path:"/device/devices",query:{userPhone:this.user.userPhone,token:this.user.token}});
        }
      },
      contact(){
        this.$router.push("/my/contactUs");
      },
      contract(){
        if (this.user.userPhone == '未登录'){
          this.$router.push('/lock/login');
        }else {
          this.$router.push("/my/contract");
        }
      },
      help(){
          this.$router.push("/my/help");
      },
    },
    created() {
      var userDB = new UserDB();
      userDB.getAll().then((obj) => {
        if (obj != null) {
          this.user.userPhone = obj.userPhone;
          this.user.userName = obj.userName;
          this.user.token = obj.token;
        }
      })
    },
    computed: {
    },
}
</script>

<style scoped>
  .me{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f2f4f7;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    font-size: 18px;
  }
  .titleName{
    position: relative;
    left: 20%;
    top: 5px;
  }
  .backImg{
    position: relative;
    left: 70%;
    top: 10px;
    width: 20px;
    height: 20px;
  }
  .wrapper{
    position: absolute;
    background-color: #f2f4f7;
    width: 100%;
    top: 40px;
  }
  .header{
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: #2ac845;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .img{
    position: relative;
    top: 8px;
    left: 13%;
    width: 80px;
    height: 80px;
    border-radius:100px;
    border: 2px solid #ced1da;
    display: inline-block;
    margin-left: 0.21333rem;
    margin-top: 0.21333rem
  }
  .username{
    position: relative;
    top: -78px;
    left: 40%;
  }
  .userPhone{
    position: relative;
    top: -70px;
    left: 40%;
  }
  .basic{
    position: absolute;
    top: 100px;
    width: 100%;
  }
  .device{
    width: 100%;
    height: auto;
  }
  .contact{
    position: absolute;
    top: 220px;
    width: 100%;
  }
</style>
