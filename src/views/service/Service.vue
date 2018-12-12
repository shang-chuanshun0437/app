<template >
  <div class="serviceWrapper">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">客服</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="content">
      <div>客服热线：18753137390</div>
      <div>微信号：18753137390</div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    data(){
      return{

      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
    },
    created() {
    },
    components: {
    },
    computed: {
    },
  }
</script>

<style scoped>
  .serviceWrapper{
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
    font-size: 20px;
  }
  .titleName{
    position: relative;
    width: 100%;
    left: 30%;
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
  .content{
    position: absolute;
    left: 20%;
    top: 160px;
  }
</style>
