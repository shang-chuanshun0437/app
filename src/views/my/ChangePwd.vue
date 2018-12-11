<template>
  <div class="changePwdWrapper">
    <div class="title">
    <img src="../../assets/back_black.png" class="backImg" @click="back">
    <span class="titleName">修改密码</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <span class="notice">
      密码长度为8~48位,建议同时包含字母、数字、特殊符号，密码越复杂，您的账号就越安全。
    </span>
    <div class="changePwd">
      <div class="oldPwd">
        <input type="text" v-model="oldPwd" class="oldPwdInput" placeholder="请输入当前密码">
      </div>
      <div class="newPwd">
        <input type="password" v-model="newPwd" class="newPwdInput" placeholder="请输入新密码">
      </div>
      <div class="confirmPwd">
        <input type="password" v-model="confirmPwd" class="confirmPwdInput" placeholder="请确认新密码">
      </div>
    </div>
    <mt-button type="primary" class="confirmButton" :disabled="disabled" @click="confirm">确认修改</mt-button>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data() {
      return {
        oldPwd:"",
        newPwd:"",
        confirmPwd:"",
        userPhone:"",
        userName:"",
        token:"",
        disabled:true,
      }
    },
    methods:{
      refresh(){
        var userDB = new UserDB();
        userDB.getAll().then((obj) => {
          if (obj != null) {
            this.userPhone = obj.userPhone;
            this.token = obj.token;
            this.userName = obj.userName;
          }
        })
      },
      back(){
        this.$router.go(-1);
      },
      confirm(){
        if (this.newPwd != this.confirmPwd){
          this.$toast("确认密码输入错误，请重新输入")
        }else {
          var param = {userPhone:this.userPhone,token: this.token,oldPassword: this.oldPwd,newPassword: this.newPwd};

          API.POST(URL.MODIFY_PWD_URL, param)
            .then(res => {
              if (res.result.retCode === 0) {
                var userDB = new UserDB();
                var obj = {userPhone: this.userPhone, token: res.token,userName: this.userName};
                userDB.put(obj);
                this.refresh();
                this.$toast('登录密码修改成功');
                this.$router.go(-1);
              }else {
                this.$toast('手机号或密码不正确');
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      register(){
        this.$router.push("/lock/register");
      },
      forget(){
        this.$router.push("/lock/forgetPassword");
      }
    },
    beforeUpdate(){
      if (this.oldPwd != '' & this.newPwd != '' & this.confirmPwd != ''){
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
  .changePwdWrapper{
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
    left: 30%;
    top: -3px;
  }
  .backImg{
    position: relative;
    left: 10px;
    top: 5px;
    width: 30px;
    height: 30px;
  }
  .divide{
    position: absolute;
    top: 40px;
  }
  .notice{
    position: absolute;
    width: 90%;
    top: 60px;
    left: 5%;
    font-size: 16px;
  }
  .changePwd{
    position: absolute;
    width: 90%;
    top: 140px;
    left: 5%;
  }
  .oldPwd{
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .oldPwdInput{
    position: absolute;
    left: -8px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
    background-color: #FFFFFF;
  }
  .newPwd{
    position: absolute;
    top: 60px;
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .newPwdInput{
    position: absolute;
    left: -8px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
    background-color: #FFFFFF;
  }
  .confirmPwd{
    position: absolute;
    top: 120px;
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .confirmPwdInput{
    position: absolute;
    left: -8px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
    background-color: #FFFFFF;
  }
  .confirmButton{
    position: absolute;
    top: 360px;
    left: 5%;
    width: 90%;
    font-size: 16px;
  }
</style>
