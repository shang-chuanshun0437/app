<template>
  <div class="wrapper">
    <div class="header">
      <ul class="ul">
        <li class="title">
          我的
        </li>
        <li class="setting" @click="changeToSetting">
          <mt-button type="default" style="background-color: #2ac845">设置</mt-button>
        </li>
      </ul>
      <img :src="user.src" class="img" @click="changeToLogin"/>
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
            <i slot="icon" class="icon iconfont el-icon-ali-my" ></i>
          </mt-cell>
        </li>
        <li class="device">
          <mt-cell title="租房合约" is-link>
            <i slot="icon" class="icon iconfont el-icon-ali-my" ></i>
          </mt-cell>
        </li>
      </ul>
      <ul class="ul contact">
        <li class="device">
          <mt-cell title="帮助信息" is-link>
            <i slot="icon" class="icon iconfont el-icon-ali-my" ></i>
          </mt-cell>
        </li>
        <li class="device">
          <mt-cell title="联系我们" is-link>
            <i slot="icon" class="icon iconfont el-icon-ali-my" ></i>
          </mt-cell>
        </li>
      </ul>
    </div>
    <Tabbar></Tabbar>
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
      Tabbar
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
      }
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
  .wrapper{
    position: relative;
    background-color: #f2f4f7;
    width: 100%;
    height: 100%;
  }
  .header{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 140px;
    background-color: #2ac845;
  }
  .title{
    position: absolute;
    top: 15px;
    left: 20%;
  }
  .setting{
    position: absolute;
    top: 10px;
    right: 50px;
    background-color: #2ac845;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .img{
    position: absolute;
    top: 40px;
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
    position: absolute;
    top: 55px;
    left: 40%;
  }
  .userPhone{
    position: absolute;
    top: 90px;
    left: 40%;
  }
  .basic{
    position: absolute;
    top: 140px;
    width: 100%;
  }
  .device{
    width: 100%;
    height: auto;
  }
  .contact{
    position: absolute;
    top: 260px;
    width: 100%;
  }
</style>
