<template>
  <div style="width: 100%;height: 100%">
    <mt-header title="更换账号" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="login">
      <div class="userPhone">
        <input type="text" v-model="newUserPhone" class="userPhoneInput" placeholder="请输入新手机号">
        <div class="divide" style="width: 1px; height: 35px; background-color: black;"></div>
        <el-button type="text" class="getCodeBtn" :disabled="disabled" @click.native.prevent="sendMsg">{{btnCode}}</el-button>
      </div>
      <div class="verify">
        <input type="password" v-model="verificationCode" class="verifyInput" placeholder="请确认输入验证码">
      </div>
      <div class="password">
        <input type="password" v-model="newPassword" class="passwordInput" placeholder="请输入新密码">
      </div>
    </div>
    <mt-button type="primary" class="confirmButton" @click="confirm">确认</mt-button>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data() {
      return {
        btnCode: "获取短信验证码",
        disabled:false,
        userPhone:"",
        password:"",
        token:"",
        verificationCode:"",
        newPassword:"",
        newUserPhone:"",
        btnAble:true
      }
    },
    methods:{
      refresh(){
        this.userPhone = this.$route.query.phoneNum;
        this.password = this.$route.query.password;
        this.token = this.$route.query.token;
        console.log(this.userPhone);
      },
      back(){
        this.$router.go(-1);
      },
      getCode(time) {
        // 将按钮设置为不可点击状态
        this.disabled = true;
        // 120秒倒计时
        let timer = setInterval(() => {
          if (time <= 0) {
            //倒计时结束后，恢复
            this.disabled = false;
            this.btnCode = "获取短信验证码";
            clearInterval(timer);
          } else {
            this.btnCode = "重新获取" + time + "s";
            time--;
          }
        }, 1000);
      },
      sendMsg(){
        if(this.newUserPhone == '' || this.newUserPhone.length != 11){
          this.$toast('请输入11位的手机号');
        }else {
          var param = {userPhone:this.newUserPhone};
          //校验用户是否注册
          API.POST(URL.IF_REGISTER_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                API.POST(URL.GET_VERIFY_CODE_URL, param)
                  .then(res => {
                    if (res.result.retCode === 0) {
                      this.getCode(119);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }else {
                this.$toast('该用户已注册，请重新输入手机号');
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      confirm(){
        var param = {userPhone: this.userPhone,verificationCode: this.verificationCode,password: this.password,
          token: this.token,newPhone: this.newUserPhone,newPassword: this.newPassword};
        API.POST(URL.CHANGE_ACCOUT_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              var user = {};
              var userDB = new UserDB();

              user.userPhone = res.user.userPhone;
              user.token = res.user.userToken;
              user.userName = res.user.userName;

              userDB.clear();
              userDB.add(user);
              this.$router.push("/lock/my")

              this.$toast("更换成功");
            }else if(res.result.retCode === 1001){
              this.$toast("您输入的手机号已被注册");
            }else if(res.result.retCode === 1003){
              this.$toast("密码错误");
            }else if(res.result.retCode === 1000){
              this.$toast("验证码错误，请重新输入验证码");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    beforeUpdate(){
      if (this.newUserPhone != '' & this.verificationCode != '' & this.newPassword != ''){

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
  .login{
    position: absolute;
    width: 80%;
    top: 90px;
    left: 10%;
  }
  .userPhone{
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .userPhoneInput{
    position: absolute;
    left: -10px;
    top: 4px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
  }
  .divide{
    position: absolute;
    left: 55%;
  }
  .getCodeBtn{
    position: absolute;
    left: 60%;
  }
  .verify{
    position: absolute;
    top: 60px;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .verifyInput{
    position: absolute;
    left: -10px;
    border: 0;
    top: 4px;
    width: 180px;
    height: 30px;
    font-size: 16px;
  }
  .password{
    position: absolute;
    top: 120px;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .passwordInput{
    position: absolute;
    border: 0;
    top: 4px;
    left: -10px;
    width: 180px;
    height: 30px;
    font-size: 16px;
  }
  .confirmButton{
    position: absolute;
    top: 280px;
    left: 5%;
    width: 90%;
    font-size: 17px;
  }
</style>
