<template>
  <div class="registerWrapper">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">欢迎注册</span>
    </div>
    <div class="divideTitle" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="register">
      <div class="country">
        <label >手机号归属地</label>
        <span class="china">中国大陆</span>
      </div>
      <div class="phoneNum">
        <label >+86</label>
        <input v-model="userPhone" autofocus class="phoneNumInput" placeholder="请输入手机号">
      </div>
    </div>
    <div class="next">
      <mt-button type="primary" class="confirmButton" @click="next">下一步</mt-button>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data() {
      return {
        userPhone:"",
      }
    },
    methods:{
      refresh(){
      },
      back(){
        this.$router.go(-1);
      },
      next(){
        //校验手机号是否注册
        var param = {userPhone:this.userPhone};
        API.POST(URL.IF_REGISTER_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              //获取短信验证码
              API.POST(URL.GET_VERIFY_CODE_URL, param)
                .then(res => {
                  if (res.result.retCode === 0) {
                    this.$router.push({path:"/lock/verifyCode",query:{phoneNum:this.userPhone}});
                  }else {
                    this.$messagebox({
                      title: '手机号非法',
                      message: '请输入正确的手机号',
                      confirmButtonText:"确定",
                    }).then(action => {
                    })
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
            else {
              //this.$toast('已注册');
              this.$messagebox({
                title: '注册失败',
                message: '该用户已注册',
                confirmButtonText:"确定",
                cancelButtonText:"取消"
              }).then(action => {
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    created() {
      this.refresh();
    },
    beforeMount(){

    },
    components: {
    }
  }
</script>

<style scoped>
  .registerWrapper{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
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
  .register{
    position: absolute;
    width: 80%;
    left: 10%;
  }
  .country{
    position: relative;
    top: 50px;
    font-size: 17px;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .china{
    position: relative;
    left: 40%;
    font-size: 15px;
    color: #2ac845;
  }
  .phoneNum{
    position: relative;
    top: 60px;
    font-size: 17px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .phoneNumInput{
    position: relative;
    top: -4px;
    left: 50px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 17px;
    background-color: white;
  }
  .next{
    position: relative;
    top: 150px;
    width: 100%;
  }
  .confirmButton{
    width: 90%;
    left: 5%;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .register{
    position: relative;
    top: 30px;
    left: 8%;
  }
  .forget{
    position: relative;
    top: 8px;
    left: 70%;
    color: #ff5053;
  }
</style>
