<template>
  <div class="doors">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">设备列表</span>
      <span class="titleAdd" @click="addDevice()">添加设备</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="door">
      <div v-for="door in doors" :key="door.deviceNum" class="doorsInfo" @click="open(door)">
        <img src="../../assets/logo.png" class="img">
        <div class="deviceName">{{door.deviceName}}</div>
        <div class="expiryDate">有效期：</div>
        <span class="manage" v-if="door.expiryDate == 0">永久有效（管理员）</span>
        <span class="normal" v-if="door.expiryDate != 0">{{door.expiryDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data() {
      return {
        doors:[],
        userPhone:"",
        token: "",
        userName:""
      }
    },
    methods:{
      refresh(){
        var param = {userPhone:this.userPhone,token: this.token};
        //查询用户下的所有设备
        API.POST(URL.DEVICE_ALL_LIST_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              if(res.count == 0){
                this.doors = [];
              }else {
                this.doors = res.getAllUserDevices;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      open(door){
        this.$router.push({path:"/lock/openDoor",query:{userPhone: this.userPhone,token: this.token,userName: this.userName,
            deviceName:door.deviceName,deviceNum:door.deviceNum,bluetoothMac: door.bluetoothMac
        ,expiryDate: door.expiryDate, version: door.version}});
      },
      back(){
        this.$router.go(-1);
      },
      addDevice(){
        this.$router.push({path:"/device/bindDevice",query:{userPhone:this.userPhone,token: this.token}});
      },
    },
    created() {
      var userDB = new UserDB();
      userDB.getAll().then((obj) => {
        if (obj != null) {
          this.userPhone = obj.userPhone;
          this.token = obj.token;
          this.userName = obj.userName;
          this.refresh();
        }
      })
    },
  }
</script>

<style scoped>
  .doors{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f2f4f7;
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
  .divide{
    position: absolute;
    top: 40px;
  }
  .titleAdd{
    position: absolute;
    left: 75%;
    top: 10px;
    color: #2ac845;
    font-size: 17px;
  }
 .door{
   position: absolute;
   width: 100%;
   top: 45px;
 }
  .doorsInfo{
    position: relative;
    width: 48%;
    height: 160px;
    background-color: white;
    border-radius: 3%;
    float: left;
    margin: 1%;
  }
  .img {
    position: relative;
    left: 35%;
    top: 15px;
    width: 50px;
    height: 50px;
  }
  .deviceName {
    position: relative;
    top: 40px;
    font-size: 15px;
    text-align: center;
  }
  .expiryDate {
    position: relative;
    top: 50px;
    left: 5px;
    font-size: 13px;
  }
  .manage {
    position: relative;
    top: 28px;
    left: 56px;
    font-size: 10px;
    color: #2ac845;
  }
  .normal {
    position: relative;
    top: 28px;
    left: 56px;
    font-size: 10px;
    color: #ff5053;
  }

</style>
