<template>
  <div class="verifyCodeTitle">
      <div class="title">
        <img src="../../assets/back_black.png" class="backImg" @click="back">
        <span class="titleName">验证码</span>
      </div>
      <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div>
      <span class="tip">
       短信验证码已发送至
      </span>
      <span class="phoneNum">
        {{phoneNum}}
      </span>
      <span class="check">
        ，请查收
      </span>
      <mt-button type="default" :disabled="disabled" class="getCodeBtn" @click="sendMsg">{{btnCode}}</mt-button>
      <div class="msgDiv">
        <input type="text" v-model="msg" class="msg" placeholder="请输入验证码">
      </div>
    </div>
    <mt-button type="primary" class="confirmButton" :disabled="registerBtn" @click="next">下一步</mt-button>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default{
    data(){
      return {
        phoneNum:"",
        btnCode: "重新获取120s",
        msg:"",
        disabled:false,
        registerBtn:true
      }
    },
    methods:{
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
        var param = {userPhone:this.userPhone};
        API.POST(URL.GET_VERIFY_CODE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.getCode(120);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      next(){
        //校验验证码
        var param = {userPhone: this.phoneNum,verificationCode: this.msg};
        API.POST(URL.CHECK_VERIFY_CODE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$router.push({path:"/lock/registerPassword",query:{phoneNum:this.phoneNum,verificationCode: this.msg}});
            }else {
              this.$messagebox({
                title: '验证码错误',
                message: '请输入正确的验证码',
                confirmButtonText:"确定",
              }).then(action => {
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    beforeUpdate(){
      if (this.msg.length == 6){
        this.registerBtn = false;
      }else {
        this.registerBtn = true;
      }
    },
    created() {
      this.phoneNum = this.$route.query.phoneNum;
      this.getCode(119)
    },
  }
</script>

<style scoped>
  .verifyCodeTitle{
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
  .tip{
    position: absolute;
    top: 60px;
    left:20px;
    font-size: 15px;
  }
  .getCodeBtn{
    position: absolute;
    top: 80px;
    left: 20px;
    font-size: 15px;
    background-color: white;
  }
  .msgDiv{
    position: absolute;
    top: 140px;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 80%;
    left: 10%;
  }
  .msg{
    position: absolute;
    border: 0;
    width: 135px;
    height: 30px;
    font-size: 16px;
    background-color: #FFFFFF;
  }
  .phoneNum{
    position: absolute;
    top: 60px;
    left: 160px;
    color: #2ac845;
    font-size: 16px;
  }
  .check{
    position: absolute;
    top: 60px;
    left: 260px;
    font-size: 15px;
  }
  .confirmButton{
    position: absolute;
    top:200px;
    width: 90%;
    left: 5%;
  }
</style>
