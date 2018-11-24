<template>
  <div>
    <mt-header fixed title="芝麻开门"></mt-header>

    <ul class="mui-table-view mui-grid-view mui-grid-9">

      <li v-for="door in doors" :key="door.id" class="mui-table-view-cell mui-media mui-col-xs-6 mui-col-sm-2" @click="open(door)">
        <span class="mui-icon mui-icon-home"></span>
        <div class="mui-media-body">{{door.deviceName}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        doors:[
          {
            id: 1,
            deviceName: '软件谷人才公寓A',
          },
          {
            id: 2,
            deviceName: '软件谷人才公寓B',
          },
        ]
      }
    },
    methods:{
      refresh(){

      },
      open(door){
        this.$router.push({path:"/openDoor",query:{deviceName:door.deviceName,deviceNum:door.deviceNum,}});
      },
    },
    created() {

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
