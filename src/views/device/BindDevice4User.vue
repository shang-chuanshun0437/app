<template>
  <div style="width: 100%;height: 100%">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">添加用户</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="login">
      <div class="phone">
        <label >手机号:</label>
        <input type="text" v-model="needBindPhone" class="phoneInput" placeholder="请输入要添加的用户">
      </div>
      <div class="password">
        <label >有效期:</label>
        <input type="text" v-model="expiryDate" class="passwordInput" placeholder="请选择有效期" @click="selectExpiryDate">
      </div>
    </div>
    <div class="confirm">
      <mt-button type="primary" class="confirmButton" :disabled="disabled" @click="addUser">添加</mt-button>
    </div>
    <mt-datetime-picker ref="picker" type="date"
                        year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
     @confirm="handleConfirm"></mt-datetime-picker>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data() {
      return {
        needBindPhone:"",
        expiryDate: "",
        userPhone: "",
        token: "",
        deviceNum: "",
        disabled:true,
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      selectExpiryDate(){
        this.$refs.picker.open();
      },
      handleConfirm (data) {
        console.log(data);
        let date = this.$moment(data).format('YYYY-MM-DD HH:mm:ss');
        this.expiryDate = date;
        console.log(date);
      },
      addUser(){
        var param = {userPhone:this.userPhone,token: this.token,deviceNum: this.deviceNum, needBindPhone: this.needBindPhone, expiryDate: this.expiryDate};
        //用户登录
        API.POST(URL.DEVICE_BIND4USER_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$router.go(-1);
              this.$toast("添加成功");
            }else if(res.result.retCode === 1002){
              this.$toast('该手机号未注册，请注册后再添加.');
            }else if(res.result.retCode === 1007){
              this.$toast('您不是设备管理员');
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
      if (this.expiryDate != '' & this.needBindPhone != ''){
        this.disabled = false;
      }
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
      this.deviceNum = this.$route.query.deviceNum;
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
    left: 35%;
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
  .login{
    position: absolute;
    width: 80%;
    top: 100px;
    left: 10%;
  }
  .phone{
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .phoneInput{
    position: absolute;
    top: -1px;
    left: 60px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
    background-color: white;
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
    left: 60px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
    background-color: white;
  }
  .confirm{
    position: relative;
    top: 200px;
    width: 100%;
  }
  .confirmButton{
    position: absolute;
    top: 60px;
    width: 90%;
    left: 5%;
    font-size: 17px;
  }

</style>
