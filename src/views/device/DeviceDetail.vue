<template style="width: 100px">
  <div class="wrapper">
    <mt-header title="设备详情" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div>
      <ul class="ul deviceDetail">
        <li class="deviceNum">
          <mt-cell style="min-height: 40px;" title="设备编号">
            <span>{{deviceNum}}</span>
          </mt-cell>
        </li>
        <li class="deviceName" @click="updateDeviceName()">
          <mt-cell style="min-height: 40px" title="设备名称" is-link>
            <span>{{deviceName}}</span>
          </mt-cell>
        </li>
        <li class="status" @click="updateStatus()">
          <mt-cell style="min-height: 40px" title="设备状态" is-link>
            <span v-if="status == 0" style="color: #2ac845;">正常</span>
            <span v-if="status == 1" style="color: #ff5053;">禁用</span>
          </mt-cell>
        </li>
      </ul>
      <ul class="ul users">
        <li class="user" @click="users()">
          <mt-cell style="min-height: 40px" title="用户量" is-link>
            <span>{{userCount}}</span>
          </mt-cell>
        </li>
      </ul>
      <ul class="ul company">
        <li>
          <mt-cell style="min-height: 40px" title="硬件版本">
            <span>{{version}}</span>
          </mt-cell>
        </li>
        <li>
          <mt-cell style="min-height: 40px" title="蓝牙MAC">
            <span>{{bluetoothMac}}</span>
          </mt-cell>
        </li>
        <li >
          <mt-cell style="min-height: 40px" title="出厂日期">
            <span>{{createTime}}</span>
          </mt-cell>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import UserDB from "../../common/UserDB"
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data(){
      return{
        userPhone: "",
        token: '',
        deviceNum: "",
        deviceName: "",
        bluetoothMac:"",
        version: "",
        status: 0,
        createTime: "",
        userCount: 0,
      }
    },
    methods:{
      refresh(){
        var param = {userPhone: this.userPhone, token: this.token, deviceNum: this.deviceNum};
        API.POST(URL.DEVICE_MANAGE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              console.log(res.deviceOuts);
              this.deviceName = res.deviceOuts[0].deviceName;
              this.bluetoothMac = res.deviceOuts[0].bluetoothMac;
              this.version = res.deviceOuts[0].version;
              this.status = res.deviceOuts[0].status;
              this.createTime = res.deviceOuts[0].createTime;
              this.userCount = res.deviceOuts[0].userCount;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      back(){
        this.$router.go(-1);
      },
      updateDeviceName(){
        this.$messagebox.prompt('修改设备名称', {
          inputValidator: (val) => {
            if (val === null) {
              return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
            }
            return !(val.length < 1)
          }, inputErrorMessage: '请输入设备名称'
        }).then((val) => {
          if (val.value != null){
            var param = {userPhone: this.userPhone, token: this.token, deviceNum: this.deviceNum, deviceName: val.value};
            API.POST(URL.DEVICE_MODIFY_NAME_URL, param)
              .then(res => {
                if (res.result.retCode === 0) {
                  this.deviceName = val.value;
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }, () => {
          console.info('cancel')
        });
      },
      updateStatus(){
        //修改设备状态
        var message = "设备为正常状态，是否要禁用该设备?";
        if (this.status == 1){
          message = "设备为禁用状态，是否要启用该设备?";
        }
        this.$messagebox({
          title: '修改设备状态',
          message: message,
          showCancelButton: true,
          confirmButtonText:"确定",
          cancelButtonText:"取消"
        }).then(action => {
          if (action == 'confirm') {
            if (this.status == 0){
              this.updateStatusNow(1)
            }else {
              this.updateStatusNow(0)
            }
          }
        });
      },
      updateStatusNow(status){
        //修改设备状态
        var param = {userPhone: this.userPhone, token: this.token, deviceNum: this.deviceNum, status: status};
        API.POST(URL.DEVICE_MODIFY_STATUS_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.status = status;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      users(){
        this.$router.push({path:"/device/deviceUsers",query:{userPhone:this.userPhone,token:this.token,deviceNum: this.deviceNum,deviceName: this.deviceName}});
      },
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
      this.deviceNum = this.$route.query.deviceNum;
      this.refresh();
    },
    computed: {
    },
}
</script>

<style scoped>
  .wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f2f4f7;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    background-color: #ff5053;
    font-size: 18px;
  }
  .ul{
    position: absolute;
    padding: 0;
    list-style-type: none;
  }
  .deviceDetail{
    top: 40px;
    width: 100%;
  }
  .deviceNum{
    width: 100%;
    max-height: 40px;
  }
  .deviceName{
    width: 100%;
    max-height: 40px;
    font-size: 14px;
  }
  .users{
    top: 180px;
    width: 100%;
  }
  .company{
    top: 240px;
    width: 100%;
  }
</style>
