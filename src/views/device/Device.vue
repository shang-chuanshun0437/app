<template>
  <div class="devices">
    <mt-header title="设备管理" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <ul class="ul info">
      <li v-for="manageDevice in manageDevices" :key="manageDevice.deviceNum" class="item" @click="deviceDetail(manageDevice.deviceNum)">
        <div class="imgDiv">
          <img src="../../assets/logo.png" class="img">
        </div>
        <div class="deviceInfo">
          <ul class="ul">
            <li>
              <span class="deviceName">设备名称：{{manageDevice.deviceName}}</span>
            </li>
            <li>
              <span class="status">设备状态：</span>
              <span class="onUse" v-if="manageDevice.status===0">正常</span>
              <span class="onPause" v-if="manageDevice.status===1">停用</span>
            </li>
            <li>
              <span class="num">用户量：{{manageDevice.userCount}}</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data() {
      return {
        selected: "manageDevice",
        manageDevices: {},
        userPhone: "",
        token: ""
      };
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      refresh(){
        //查询管理的设备
        var param = {userPhone:this.userPhone,token: this.token};
        API.POST(URL.DEVICE_MANAGE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {

              if (res.count === 0) {
                this.manageDevices = null;
              } else {
                this.manageDevices = res.deviceOuts;
              }
              console.log(res);
              console.log(this.manageDevices);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      deviceDetail(deviceNum){
        this.$router.push({path:"/device/deviceDetail",query:{userPhone:this.userPhone,token:this.token,deviceNum: deviceNum}});
      },
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
      this.refresh();
    },
  };
</script>

<style  scoped>
  .devices{
    position: relative;
    width: 100%;
    height: 100%;
    background: #f2f4f7;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    background-color: #ff5053;
    font-size: 18px;
  }
  .info{
    position: absolute;
    top: 20px;
    width: 100%;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .item{
    width: 100%;
    height: 100px;
    background: white;
    margin: 10px 0px 10px 0px;
  }
  .img{
    position: relative;
    top: 20px;
    left: 20px;
    width: 60px;
    height: 60px;
  }
  .deviceInfo{
    position: relative;
    display: block;
    top: -30px;
    left: 60px;
  }
  .deviceName{
    position: relative;
    top: -20px;
    left: 60px;
  }
  .status{
    position: relative;
    top: -10px;
    left: 60px;
  }
  .onUse{
    position: relative;
    top: -10px;
    left: 60px;
    color: #2ac845;
    font-size: 16px;
  }
  .onPause{
    position: relative;
    top: -10px;
    left: 60px;
    color: #ff5053;
    font-size: 16px;
  }
  .num{
    position: relative;
    top: 0px;
    left: 60px;
  }
</style>
