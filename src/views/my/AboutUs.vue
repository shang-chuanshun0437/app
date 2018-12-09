<template >
    <div class="wrapper">
      <div style="height: 40px"><mt-header title="关于我们" class="title">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
      </div>
      <img src="../../assets/logo.png" class="img">
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
    computed: {
      ...mapState("version", {
        showVersion: state => state.version,
      }),
    },
}
</script>

<style scoped>
  .wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    background-color:  #f2f4f7;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
  }
  .img{
    position: absolute;
    top: 100px;
    width: 30%;
    left: 35%;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .desc{
    position: absolute;
    top: 230px;
    left: 35%;
  }
  .currentVersion{
    position: absolute;
    top: 260px;
    left: 30%;
    font-size: 15px;
  }
  .check{
    position: absolute;
    top: 380px;
    width: 100%;
    height: 40px;
  }
  .copyrightTip{
    position: absolute;
    bottom: 40px;
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
