<template>
  <div class="registerPassword">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">设置密码</span>
    </div>
    <div class="divideTitle" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="login">
      <div class="password">
        <label >密码:</label>
        <input type="password" v-model="password" class="phoneInput" placeholder="请输入密码">
      </div>
      <div class="confirmPass">
        <label >确认密码:</label>
        <input type="password" v-model="confirmPass" class="passwordInput" placeholder="请确认输入密码">
      </div>
      <div class="userName">
        <label >用户名:</label>
        <input type="text" v-model="userName" class="userNameInput" placeholder="请输入用户名">
      </div>
    </div>
    <div>
      <mt-button type="primary" class="registerButton" :disabled="btnAble" @click="register">注册</mt-button>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    data() {
      return {
        phoneNum:"",
        password:"",
        confirmPass:"",
        userName:"",
        verificationCode:"",
        btnAble:true
      }
    },
    methods:{
      refresh(){
        this.phoneNum = this.$route.query.phoneNum;
        this.verificationCode = this.$route.query.verificationCode;
        console.log(this.phoneNum);
      },
      back(){
        this.$router.go(-1);
      },
      register(){
        if(this.password != this.confirmPass){
          this.$toast("确认密码有误，请重新输入");
        }else {
          var param = {userPhone: this.phoneNum,verificationCode: this.verificationCode,password: this.password,userName: this.userName};
          API.POST(URL.REGISTER_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                this.$router.push("/lock/login");
                this.$toast("注册成功");
              }else {
                this.$messagebox({
                  title: '验证码错误',
                  message: '验证码已过期，请重新注册',
                  confirmButtonText:"确定",
                }).then(action => {
                })
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
    },
    created() {
      this.refresh();
    },
    beforeUpdate(){
      if(this.password !='' & this.confirmPass != '' & this.userName != ''){
        this.btnAble = false;
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  .registerPassword{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
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
    left: 10%;
    top: -3px;
  }
  .backImg{
    position: relative;
    left: 10px;
    top: 5px;
    width: 30px;
    height: 30px;
  }
  .divideTitle{
    position: absolute;
    top: 40px;
  }

  .login{
    position: absolute;
    width: 80%;
    top: 90px;
    left: 10%;
  }
  .password{
    font-size: 17px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .phoneInput{
    position: absolute;
    top: -1px;
    left: 80px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 17px;
    background-color: #FFFFFF;
  }
  .confirmPass{
    position: absolute;
    top: 60px;
    font-size: 17px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .passwordInput{
    position: absolute;
    top: -4px;
    left: 80px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 17px;
    background-color: #FFFFFF;
  }
  .userName{
    position: absolute;
    top: 120px;
    font-size: 17px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .userNameInput{
    position: absolute;
    top: -4px;
    left: 80px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 17px;
    background-color: #FFFFFF;
  }
  .registerButton{
    position: absolute;
    top:300px;
    width: 90%;
    left: 5%;
  }
</style>
