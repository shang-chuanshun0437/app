<template>
  <div class="openDoor">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">{{deviceName}}</span>
      <img src="../../assets/more.png" class="moreImg" @click="more()">
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div style="width: 100%;">
      <img src="../../assets/opendoor.png" class="img" @click="openIng()" id="openDoorImg">
    </div>
    <div class="doorInfo">
      <ul class="ul">
        <li class="progress">开锁进展：{{progress}}</li>
        <li class="electric">设备电量：{{electric}}%</li>
      </ul>
      <img src="../../assets/battery_100.png" class="batteryImg" v-if="electric == 100">
      <img src="../../assets/battery_90.png" class="batteryImg" v-if="electric == 90">
      <img src="../../assets/battery_50.png" class="batteryImg" v-if="electric == 80">
      <img src="../../assets/battery_70.png" class="batteryImg" v-if="electric == 70">
      <img src="../../assets/battery_60.png" class="batteryImg" v-if="electric == 60">
      <img src="../../assets/battery_50.png" class="batteryImg" v-if="electric == 50">
      <img src="../../assets/battery_40.png" class="batteryImg" v-if="electric == 40">
      <img src="../../assets/battery_30.png" class="batteryImg" v-if="electric == 30">
      <img src="../../assets/battery_20.png" class="batteryImg" v-if="electric == 20">
      <img src="../../assets/battery_10.png" class="batteryImg" v-if="electric == 10">
      <img src="../../assets/battery_0.png" class="batteryImg" v-if="electric == 0">
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
    <mt-actionsheet :actions= "options" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    data() {
      return {
        userPhone: "",
        token: "",
        userName: "",
        deviceName:"未知设备",
        deviceNum:"99999999999",
        bluetoothMac: "",
        isOpenIng: false,
        version: "",
        expiryDate: "",
        progress: "点击上面的图标，即可进行开锁",
        electric: 60,
        sheetVisible: false,
        options: [{
          name: '开门记录',
          method : this.openDoorHistory	// 调用methods中的函数
        }, {
          name: '删除设备',
          method : this.deleteDoor	// 调用methods中的函数
        }],
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      more(){
        this.sheetVisible = true;
      },
      openDoorHistory: function(){
        this.$router.push({path:"/device/OpenDoorHistory",query:{userPhone: this.userPhone,token: this.token,
            deviceNum:this.deviceNum}});
      },
      deleteDoor: function(){
        this.$messagebox.confirm('', {
          message: '您要删除的设备为 ' + this.deviceName,
          title: '确定要删除该设备吗？',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {
            var param = {userPhone:this.userPhone,token: this.token,
              deviceNum: this.deviceNum};
            //用户登录
            API.POST(URL.DEVICE_UNBIND_SELF_URL, param)
              .then(res => {
                if (res.result.retCode === 0) {
                  this.$router.go(-1);
                  this.$toast('删除成功');
                }else if (res.result.retCode === 1009){
                  this.$toast('删除失败，该设备下还有其他用户');
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        });
      },
      openIng(){
        if (this.isOpenIng == false){
          this.isOpenIng = true;
        }else {
          this.isOpenIng = false;
        }
        this.progress = "正在开门，请稍等.....";
        var deg = 0;
        let time = 100;
        let timer = setInterval(() => {
          if (time <= 0 || this.isOpenIng == false) {
            try{
              document.getElementById("openDoorImg").style.transform = "rotate(" + 0 + "deg)";
            }
            catch (err){
              clearInterval(timer);
            }
            if (this.isOpenIng == true){
              //开门成功之后插入一条开门记录
              var param = {userPhone:this.userPhone,token: this.token,userName: this.userName,
                deviceNum: this.deviceNum,deviceName: this.deviceName};
              //用户登录
              API.POST(URL.ADD_HISTORY, param)
                .then(res => {
                  if (res.result.retCode === 0) {
                  }
                })
                .catch(err => {
                  console.log(err);
                });
              this.progress = "开门成功";
            }else {
              this.progress = "开门取消";
            }
            this.isOpenIng = false;
            clearInterval(timer);
          } else {
            deg += 10;
            try {
              document.getElementById("openDoorImg").style.transform = "rotate(" + deg + "deg)";
            }
            catch (err){
              clearInterval(timer);
            }
            time--;
          }
        }, 50);
      }
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
      this.userName = this.$route.query.userName;
      this.deviceName = this.$route.query.deviceName;
      this.deviceNum = this.$route.query.deviceNum;
      this.bluetoothMac = this.$route.query.bluetoothMac;
      this.version = this.$route.query.version;
      this.expiryDate = this.$route.query.expiryDate;
    },
  }
</script>

<style scoped>
  .openDoor{
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
  .moreImg{
    position: absolute;
    left: 85%;
    top: 5px;
    width: 30px;
    height: 30px;
  }
  .img{
    position: absolute;
    top: 100px;
    width: 160px;
    height: 160px;
    left: 30%;
  }
  .doorInfo{
    position: absolute;
    top: 260px;
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
  .batteryImg{
    position: absolute;
    top: 62px;
    width: 40px;
    left: 20%;
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
