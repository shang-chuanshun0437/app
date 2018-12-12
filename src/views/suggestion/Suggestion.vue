<template >
  <div class="suggestionWrapper">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">意见反馈</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="content">
      <textarea :placeholder="defaultContent" minlength="600" v-model="suggestion" class="inputContent"></textarea>
    </div>
    <mt-button type="primary" class="confirmButton" :disabled="disabled" @click="confirm">提交</mt-button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    data(){
      return{
        suggestion:'',
        defaultContent:"请输入您的建议",
        disabled: true
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      confirm(){
        this.$toast("您的意见已提交，我们会尽快给您答复的")
      }
    },
    created() {
    },
    beforeUpdate(){
      if (this.suggestion != ''){
        this.disabled = false;
      }else {
        this.disabled = true;
      }
    },
    components: {
    },
    computed: {
    },
  }
</script>

<style scoped>
  .suggestionWrapper{
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
    width: 96%;
    height: 320px;
    left: 2%;
    top: 80px;
  }
  .inputContent{
    background-color: #f2f4f7;
    height: 200px;
  }
  .confirmButton{
    position: absolute;
    top: 300px;
    width: 90%;
    left: 5%;
  }
</style>
