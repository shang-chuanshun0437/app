<template>
  <div class="devices">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">{{deviceName}}</span>
      <span class="titleAdd" @click="addUser()">添加用户</span>
    </div>
    <div class="divideTitle" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <mt-datetime-picker ref="picker" type="date"
                        year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
                        @confirm="handleConfirm"></mt-datetime-picker>
    <div >
      <ul class="ul user" v-if="users.length != 0">
        <li v-for="user in users" :key="user.userPhone" class="item">
          <div class="imgDiv">
            <img src="../../assets/logo.png" class="img">
          </div>
          <div class="userInfo">
            <ul class="ul">
              <li>
                <span class="userPhone">用户账号：{{user.userPhone}}</span>
              </li>
              <li>
                <span class="createTime">添加日期：{{user.createTime.substr(0,19)}}</span>
              </li>
              <li>
                <div class="divide"></div>
                <span class="expiryDate" @click="updateExpiryDate(user.userPhone)">有效期：{{user.expiryDate.substr(0,10)}}</span>
              </li>
              <li>
                <div class="divideDelete"></div>
                <span class="delete" @click="deleteUser(user.userPhone)">收回钥匙</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data() {
      return {
        users: {},
        userPhone: "",
        token: "",
        deviceNum:"",
        deviceName: "",
        needModifyPhone: "",
      };
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      refresh(){
        //查询该设备下的用户
        var param = {userPhone:this.userPhone,token: this.token,deviceNum: this.deviceNum};
        API.POST(URL.DEVICE_USER_LIST_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              if (res.count == 0){
                this.users = "";
              }else {
                this.users = res.queryDeviceUserRes;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      addUser(){
        this.$router.push({path:"/device/bindDevice4User",query:{userPhone:this.userPhone,token:this.token,deviceNum: this.deviceNum}});
      },
      deleteUser(needUnBindPhone){
        //回收钥匙
        this.$messagebox.confirm('', {
          message: '您确定要回收  ' + needUnBindPhone + ' 的钥匙吗？',
          title: '回收钥匙',
          confirmButtonText: '回收',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            var param = {userPhone:this.userPhone,token: this.token,deviceNum: this.deviceNum,needUnBindPhone: needUnBindPhone};
            API.POST(URL.DEVICE_UNBIND4USER_URL, param)
              .then(res => {
                if (res.result.retCode === 0) {
                  this.refresh();
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
          }
        });

      },
      updateExpiryDate(needModifyPhone){
        this.needModifyPhone = needModifyPhone;
        this.$refs.picker.open();
      },
      handleConfirm (data) {
        let date = this.$moment(data).format('YYYY-MM-DD HH:mm:ss');

        //修改有效期
        var param = {userPhone:this.userPhone,token: this.token,deviceNum: this.deviceNum,needModifyPhone: this.needModifyPhone,expiryDate: date};
        API.POST(URL.DEVICE_UPDATE_DATE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.refresh();
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
      this.deviceNum = this.$route.query.deviceNum;
      this.deviceName = this.$route.query.deviceName;
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
    height: 40px;
    background-color: #FFFFFF;
    font-size: 18px;
  }
  .titleName{
    position: relative;
    left: 15%;
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
  .titleAdd{
    position: absolute;
    left: 75%;
    top: 10px;
    color: #2ac845;
    font-size: 17px;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .user{
    position: absolute;
    top: 40px;
    width: 100%;
    height: 100px;
    background: white;
  }
  .item{
    width: 100%;
    height: 100px;
    background: white;
    margin: 10px 0px 10px 0px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .imgDiv{
    display: inline-block;
  }
  .img{
    position: relative;
    top: 20px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
  .userInfo{
    position: relative;
    display: block;
    top: -30px;
    left: 10px;
  }
  .userPhone{
    position: relative;
    top: -20px;
    left: 60px;
    font-size: 15px;
  }
  .createTime{
    position: relative;
    top: -10px;
    left: 60px;
    font-size: 15px;
  }
  .divide{
    position: relative;
    top: 0px;
    left: 60px;
    width: 260px;
    height: 1px;
    background-color: black
  }
  .expiryDate{
    position: relative;
    top: 10px;
    left: 60px;
    font-size: 15px;
  }
  .divideDelete{
     position: relative;
     top: -21px;
     left: 220px;
     width: 1px;
     height: 35px;
     background-color: black
  }
  .delete{
    position: relative;
    top: -45px;
    left: 240px;
    font-size: 16px;
    margin: 5px;
    color: #ff5053;
  }
</style>
