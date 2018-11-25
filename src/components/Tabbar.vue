<template>
  <div class="tab">
    <mt-tabbar fixed>
      <mt-tab-item id="首页" class="tabbar-item" @click.native="changeToMain">
        <i slot="icon" class="icon iconfont el-icon-ali-home" :style="maincolor"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="精选" class="tabbar-item" @click.native="changeToSelect">
        <i slot="icon" class="icon iconfont el-icon-ali-jingxuanchanpinku" :style="classifycolor"></i>
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
        classifycolor: iconColor,
        mycolor: iconColor,
      }
    },
    computed: {
    },
    methods:{
      changeToMain(){
        this.$router.push({path:'/home'});
        this.maincolor = iconColorActive;
        this.classifycolor = iconColor;
        this.mycolor = iconColor;
      },
      changeToSelect(){
        this.$router.push({path:'/lock/classify'});
        this.maincolor = iconColor;
        this.classifycolor = iconColorActive;
        this.mycolor = iconColor;
      },
      changeToMy(){
        this.$router.push({path:'/lock/my'});
        this.maincolor = iconColor;
        this.classifycolor = iconColor;
        this.mycolor = iconColorActive;
      },
    }
  }
</script>

<style scoped>

  .icon{
    font-size: 25px;
  }
   .mint-tabbar{
     height: 10%
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
