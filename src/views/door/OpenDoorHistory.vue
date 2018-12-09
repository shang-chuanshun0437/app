<template>
  <div class="doors">
    <mt-header title="历史记录" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="door" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading"
         infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
      <!--ul里面几个scoller就是无限滚动的几个api-->
        <ul class="items">
          <!--li数据遍历循环部分-->
          <li class="li" v-for="item in list" :key="item.id">
            <div class="divide" style="width: 120%; height: 10px; background-color: #f2f4f7;"></div>
            <span class="itemName">
              {{item.userName}}
            </span >
            <span class="itemOpenTime">
              {{item.openTime}}
            </span>
            <span class="app">
              app  开门成功
            </span>
          </li>
        </ul>
        <!--底部判断是加载图标还是提示“全部加载”-->
        <span class="more_loading" v-show="!queryLoading">
          <mt-spinner type="snake" style= "align-content: center" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
          <span v-show="allLoaded" class="allLoad">已全部加载</span>
        </span>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data() {
      return {
        userPhone:"",
        token: "",
        deviceNum: "",
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        totalNum: 0,
        pageSize: 20,
        pageNum: 0,
        list: [],
      }
    },
    computed: {
      params() {
        return{
          //这里先定义要传递给后台的数据
          //然后将每次请求20条的参数一起提交给后台
          pageSize: this.pageSize
        }
      }
    },
    methods:{
      //无限加载函数
      loadMore() {
        if (this.allLoaded) {
          this.moreLoading = true;
          return;
        }
        if (this.queryLoading) {
          return;
        }
        this.moreLoading = !this.queryLoading;
        this.pageNum++;
        var param = {userPhone:this.userPhone,token: this.token,deviceNum: this.deviceNum,
          pageSize: this.pageSize,currentPage: this.pageNum};
        //用户登录
        API.POST(URL.OPEN_HISTORY, param)
          .then(res => {
            if (res.result.retCode === 0) {
              if (res.count && res.openDoorHistories){
                this.list = this.list.concat(res.openDoorHistories);
                this.allLoaded = this.list.length == res.count;
                console.log(this.list);
              }
              this.moreLoading = this.allLoaded;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      back(){
        this.$router.go(-1);
      },
    },
    created() {
      this.userPhone = this.$route.query.userPhone;
      this.token = this.$route.query.token;
      this.deviceNum = this.$route.query.deviceNum;
      console.log(this.list);
      this.loadMore();
    },
  }
</script>

<style scoped>
  .doors{
    position: relative;
    width: 100%;
    min-height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: white;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    background-color: #ff5053;
    font-size: 18px;
  }
 .door{
   position: absolute;
   width: 100%;
   overflow-y: visible;
   top: 35px;
 }
  .items{
    position: relative;
    width: 100%;
    list-style-type: none;
    border: 0;
    margin: 0px;
    left: -40px;
  }
  .divide{
    position: relative;
    width: 120%;
  }
  .li{
    width: 100%;
    margin-top: 10px;
    left: 0px;
    text-align: center;
  }
  .itemName{
    position: relative;
    font-size: 15px;
  }
  .itemOpenTime{
    position: relative;
    font-size: 15px;
    left: 20px;
  }
  .app{
    position: relative;
    font-size: 15px;
    left: 40px;
  }
  .more_loading{
    position: relative;
    font-size: 15px;
    text-align: center;
  }
  .allLoad{
    position: relative;
    font-size: 16px;
    color: #2ac845;
    top: 30px;
    left: 40%;
  }
</style>
