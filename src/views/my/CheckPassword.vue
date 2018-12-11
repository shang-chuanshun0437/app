<template>
  <div style="width: 100%;height: 100%">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">校验密码</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <span class="notice">
      请输入当前账号
    </span>
    <span class="noticePhone">
      {{this.phoneNum}}
    </span>
    <span class="noticeNext">
      的密码
    </span>
    <div class="login">
      <div class="password">
        <input type="password" v-model="password" class="phoneInput" placeholder="请输入当前密码">
      </div>
    </div>
    <div>
      <mt-button type="primary" class="registerButton" :disabled="btnAble" @click="next">下一步</mt-button>
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
        token:"",
        btnAble:true
      }
    },
    methods:{
      refresh(){
        this.phoneNum = this.$route.query.phoneNum;
        this.token = this.$route.query.token;
        console.log(this.phoneNum);
      },
      back(){
        this.$router.go(-1);
      },
      next(){
        var param = {userPhone: this.phoneNum,password: this.password,token: this.token};
        API.POST(URL.CHECK_PWD_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$router.push({path:"/user/changeAccount",query:{phoneNum:this.phoneNum,token:this.token,password: this.password}});
            }else {
              this.$messagebox({
                title: '密码错误',
                message: '请重新输入密码',
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
    created() {
      this.refresh();
    },
    beforeUpdate(){
      if(this.password !=''){
        this.btnAble = false;
      }
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
  .divide{
    position: absolute;
    top: 40px;
  }
  .notice{
    position: absolute;
    top: 60px;
    left: 5%;
    font-size: 16px;
  }
  .noticePhone{
    position: absolute;
    top: 60px;
    left: 40%;
    font-size: 18px;
    color: #2ac845;
  }
  .noticeNext{
    position: absolute;
    top: 60px;
    left: 75%;
    font-size: 16px;
  }
  .login{
    position: absolute;
    width: 80%;
    top: 110px;
    left: 5%;
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
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 17px;
    background-color: #FFFFFF;
  }
  .registerButton{
    position: absolute;
    top:200px;
    width: 90%;
    left: 5%;
  }
</style>
