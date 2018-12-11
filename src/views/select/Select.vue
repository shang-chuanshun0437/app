<template >
  <div class="aboutUs">
    <div class="title">
      <img src="../../assets/back_black.png" class="backImg" @click="back">
      <span class="titleName">精选</span>
    </div>
    <div class="divide" style="width: 100%;height: 2px;background-color: #EBEBEB"></div>
    <div class="wrapper">
      <img src="../../assets/icon.png" class="img">
      <div class="version">
        <ul class="ul">
          <li class="desc">
            让生活，更简单
          </li>
          <li class="currentVersion">
            当前版本：V{{showVersion}}
          </li>
        </ul>
      </div>
      <div class="nav">
        <ul class="ul">
          <li class="check">
            <mt-cell title="检查更新" is-link>
              <i slot="icon" class="icon iconfont el-icon-ali-my" ></i>
              <span>{{checkVersion}}</span>
            </mt-cell>
          </li>
        </ul>
      </div>
    </div>
    <span class="copyrightTip">
        版权信息
      </span>
    <span class="copyright">
        Copyright© 2018-至今 唯易科技信息技术有限公司
      </span>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default {
    data(){
      return{
          checkVersion:"已是最新版本"
        }
      },
    methods:{
      back(){
        this.$router.go(-1);
      },
      refresh(){
        API.POST(URL.VERSION_URL)
          .then(res => {
            if (res.result.retCode === 0) {
              var newVersion = res.version;
              if (this.showVersion != newVersion){
                this.checkVersion = "有新版本";
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    created() {
      this.refresh();
    },
    components: {
    },
    computed: {
      ...mapState("version", {
        showVersion: state => state.version,
      }),
    },
}
</script>

<style scoped>
  .aboutUs{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f2f4f7;
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
  .wrapper{
    position: absolute;
    top: 60px;
    width: 100%;
    background-color:  #f2f4f7;
  }
  .img{
    position: relative;
    top: 30px;
    width: 30%;
    left: 35%;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .desc{
    position: relative;
    top: 60px;
    left: 35%;
  }
  .currentVersion{
    position: relative;
    top: 70px;
    left: 30%;
    font-size: 15px;
  }
  .check{
    position: relative;
    top: 100px;
    width: 100%;
    height: 40px;
  }
  .copyrightTip{
    position: absolute;
    bottom: 35px;
    left: 40%;
    color: #2ac845;
    font-size: 15px;
  }
  .copyright{
    position: absolute;
    bottom: 10px;
    left: 7%;
    color: #000000;
    font-size: 14px;
  }
</style>
