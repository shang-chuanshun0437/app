<template >
  <div class="selectWrapper">
    <div class="title">
      <span class="titleName">精选</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div>
      <img src="../../assets/noting.png" class="img">
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
  .selectWrapper{
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
    position: absolute;
    width: 100%;
    text-align: center;
    top: 10px;
  }
  .divide{
    position: absolute;
    top: 40px;
  }
  .img{
    position: absolute;
    top: 160px;
  }
</style>
