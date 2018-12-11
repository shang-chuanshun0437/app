<template>
  <div class="addDevice">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">添加设备</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="login">
      <div class="phone">
        <label >设备编号:</label>
        <input type="number" v-model="deviceNum" class="phoneInput" placeholder="请输入11位设备编号">
      </div>
      <div class="deviceName">
        <label >设备名称:</label>
        <input type="text" v-model="deviceName" class="deviceNameInput" placeholder="请输入设备名称">
      </div>
    </div>
    <div class="confirm">
      <mt-button type="primary" class="confirmButton" :disabled="disabled" @click="addDevice()">添加</mt-button>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    data() {
      return {
        deviceNum:"",
        deviceName: "",
        userPhone: "",
        token: "",
        disabled:true,
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      addDevice(){
        var param = {userPhone:this.userPhone,token: this.token,deviceNum: this.deviceNum, deviceName: this.deviceName};
        //绑定设备
        API.POST(URL.DEVICE_BIND_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$router.go(-1);
              this.$toast("添加成功");
            }else if(res.result.retCode === 1007){
              this.$messagebox({
                title: '添加失败',
                message: '该设备不存在或该设备下已有管理员',
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
    updated(){
      if (this.deviceNum != '' & this.deviceName != ''){
        this.disabled = false;
      }else {
        this.disabled = true;
      }
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
    },
    components: {
    }
  }
</script>

<style scoped>
  .addDevice{
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
    left: 72px;
    border: 0;
    width: 180px;
    height: 30px;
    font-size: 16px;
    background-color: white;
  }
  .deviceName{
    position: absolute;
    top: 60px;
    font-size: 16px;
    margin: 0.3rem;
    border-bottom: 1px solid #000000;
    height: 35px;
    width: 100%;
  }
  .deviceNameInput{
    position: absolute;
    top: -4px;
    left: 70px;
    border: 0;
    width: 230px;
    height: 30px;
    font-size: 16px;
    background-color: white;
  }
  .confirm{
    position: absolute;
    top: 240px;
    width: 100%;
  }
  .confirmButton{
    width: 90%;
    left: 5%;
    font-size: 17px;
  }

</style>
