<template>
  <div>
    <mt-header fixed :title="deviceName"></mt-header>
    <img src="../../assets/logo.png" @click="openDoor()">
    https://gitee.com/raintao/vue2_app
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deviceName:"未知设备",
        deviceNum:"99999999999",
      }
    },
    methods:{
      refresh(){
      },
      openDoor(){
        console.log('openDoor');

      },
    },
    created() {
      this.deviceName = this.$route.query.deviceName;
      this.deviceNum = this.$route.query.deviceNum;
    },
    components: {
    }
  }
</script>

<style scoped>
  .slide1 a,
  .slide1 img {
    display: block;
    width: 100%;
    height: 250px;
  }
  .mui-icon {
    width: 50px;
    height: 50px;
  }
  .mui-icon-home {
    background-image: url(../../assets/logo.png);
    background-repeat:round;
  }
  .mui-icon-home:before,
  .mui-icon-email:before,
  .mui-icon-chatbubble:before,
  .mui-icon-location:before,
  .mui-icon-search:before,
  .mui-icon-phone:before {
    content: '';
  }
  .mui-grid-view.mui-grid-9 {
    background-color: white;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
  }
</style>
