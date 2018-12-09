<template>
  <div style="width: 100%;height: 100%">
    <mt-header title="欢迎登陆" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <img src="../../assets/logo.png" class="img">
    <div class="login">
      <div class="username">
        <label >账号:</label>
        <input type="text" v-model="userPhone" class="phoneInput" placeholder="请输入手机号">
      </div>
      <div class="password">
        <label >密码:</label>
        <input type="password" v-model="password" class="passwordInput" placeholder="请输入密码">
      </div>
    </div>
    <div class="confirm">
      <mt-button type="primary" class="confirmButton" :disabled="disabled" @click="login">登陆</mt-button>
      <ul class="ul">
        <li>
          <span class="register" @click="register">没有账号？注册</span>
        </li>
        <li>
          <span class="forget" @click="forget">忘记密码？</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data() {
      return {
        userPhone:"",
        password:"",
        disabled:true,
      }
    },
    methods:{
      refresh(){
      },
      back(){
        this.$router.go(-1);
      },
      login(){
        var param = {userPhone:this.userPhone,password: this.password};
        //用户登录
        API.POST(URL.LOGIN_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              var userDB = new UserDB();
              var obj = {userPhone: res.userPhone,userName: res.userName, token: res.token};
              userDB.clear();
              userDB.add(obj);
              this.$router.push("/home");
            }else {
              this.$toast('手机号或密码不正确');
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      register(){
        this.$router.push("/lock/register");
      },
      forget(){
        this.$router.push("/lock/forgetPassword");
      }
    },
    beforeUpdate(){
      if (this.userPhone != '' & this.password != ''){
        this.disabled = false;
      }
    },
    created() {
      this.refresh();
    },
    components: {
    }
  }
</script>

<style scoped>
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    background-color: #ff5053;
    font-size: 18px;
  }
  .img{
    position: absolute;
    top: 120px;
    width: 100px;
    height: 100px;
    left: 38%;
  }
  .login{
    position: absolute;
    width: 80%;
    top: 280px;
    left: 10%;
  }
  .username{
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .phoneInput{
    position: absolute;
    top: -1px;
    left: 50px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
  }
  .password{
    position: absolute;
    top: 60px;
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .passwordInput{
    position: absolute;
    top: -4px;
    left: 50px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
  }
  .confirm{
    position: relative;
    top: 400px;
    width: 100%;
  }
  .confirmButton{
    width: 90%;
    left: 5%;
    font-size: 17px;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .register{
    position: relative;
    top: 30px;
    left: 8%;
    font-size: 17px;
  }
  .forget{
    position: relative;
    top: 8px;
    left: 70%;
    color: #ff5053;
    font-size: 17px;
  }
</style>
