<template>
  <div class="tab">
    <mt-tabbar v-show="isShowTabbar" fixed>
      <mt-tab-item id="首页" class="tabbar-item" @click.native="changeToMain">
        <i slot="icon" class="icon iconfont el-icon-ali-home" :style="maincolor"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="精选" class="tabbar-item" @click.native="changeToSelect">
        <i slot="icon" class="icon iconfont el-icon-ali-jingxuanchanpinku" :style="selectcolor"></i>
        精选
      </mt-tab-item>
      <mt-tab-item id="我的" class="tabbar-item" @click.native="changeToMy">
        <i slot="icon" class="icon iconfont el-icon-ali-my" :style="mycolor"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>

</template>

<script>
  const iconColor = "color: #cdcdcd";
  const iconColorActive ="color: #000000";
  export default {
    data(){
      return{
        maincolor: iconColorActive,
        selectcolor: iconColor,
        mycolor: iconColor,
      }
    },
    computed: {
      isShowTabbar () {
        let routeLength = this.$route.path.split('/').length;
        // let home = this.$route.path.split('/')[1];

        return routeLength > 2  ? false : true;
      }
    },
    methods:{
      changeToMain(){
        this.maincolor = iconColorActive;
        this.selectcolor = iconColor;
        this.mycolor = iconColor;
        this.$router.push({path:'/home'});
      },
      changeToSelect(){
        this.maincolor = iconColor;
        this.selectcolor = iconColorActive;
        this.mycolor = iconColor;
        this.$router.push({path:'/select'});
      },
      changeToMy(){
        this.maincolor = iconColor;
        this.selectcolor = iconColor;
        this.mycolor = iconColorActive;
        this.$router.push({path:'/my'});
      },
    }
  }
</script>

<style scoped>

  .icon{
    font-size: 25px;
  }
   .mint-tabbar{
     height: 10%;
   }
  .mint-tab-item{
    vertical-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #000000;
  }

</style>
