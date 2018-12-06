<template>
  <div class="openDoor">
    <mt-header :title="deviceName" class="title">
      <mt-button icon="back" slot="left" @click="back()"></mt-button>
    </mt-header>
    <div style="width: 100%;">
      <img src="../../assets/logo.png" class="img" @click="openIng()">
    </div>
    <div class="doorInfo">
      <ul class="ul">
        <li class="progress">开锁进展：{{progress}}</li>
        <li class="electric">设备电量：{{electric}}</li>
      </ul>
    </div>
    <div class="explain">
      <ul class="ul">
        <li class="version">门锁版本号：{{version}}</li>
        <li class="expiryDate">钥匙有效期：
          <span v-if="expiryDate == 0">永久有效（管理员）</span>
          <span v-if="expiryDate != 0">{{expiryDate}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceName:"未知设备",
        deviceNum:"99999999999",
        bluetoothMac: "",
        version: "",
        expiryDate: "",
        progress: "点击上面的图标，即可进行开锁",
        electric: "100%",
      }
    },
    methods:{
      refresh(){
      },
      back(){
        this.$router.go(-1);
      },
      openIng(){
        console.log('openDoor');
      },
    },
    created() {
      this.deviceName = this.$route.query.deviceName;
      this.deviceNum = this.$route.query.deviceNum;
      this.bluetoothMac = this.$route.query.bluetoothMac;
      this.version = this.$route.query.version;
      this.expiryDate = this.$route.query.expiryDate;
      console.log(this.bluetoothMac);
    },
  }
</script>

<style scoped>
  .openDoor{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    background-color: #ff5053;
    font-size: 18px;
  }
  .img{
    position: absolute;
    top: 100px;
    width: 80px;
    height: 80px;
    left: 35%;
  }
  .doorInfo{
    position: absolute;
    top: 220px;
    width: 100%;
  }
  .ul{
    list-style-type: none;
    padding: 0;
  }
  .progress{
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 15px;
  }
  .electric{
    position: absolute;
    top: 70px;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  .explain{
    position: absolute;
    top: 80%;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  .version{
    position: absolute;
    top: 30px;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  .expiryDate{
    position: absolute;
    top: 60px;
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
</style>
