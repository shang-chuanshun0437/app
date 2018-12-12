<template>
  <div class="wrapper">
    <div class="title">
      <span class="titleName">大管家</span>
    </div>
    <swipe class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <img src="../assets/swipe1.jpg" class="img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/swipe2.jpg" class="img">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/swipe3.jpg" class="img">
        </mt-swipe-item>
      </mt-swipe>
    </swipe>

    <ul class="mui-table-view mui-grid-view grid">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/lock/doors">
          <img src="../assets/zhimakaimen.png" class="kefuImg">
          <div class="mui-media-body">芝麻开门</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/service">
          <img src="../assets/kefu.png" class="kefuImg">
          <div class="mui-media-body">客服</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/suggestion">
          <img src="../assets/yijianfankui.png" class="kefuImg">
          <div class="mui-media-body">意见反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/renting">
          <img src="../assets/zufang.png" class="kefuImg">
          <div class="mui-media-body">租房</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/live">
          <img src="../assets/fuwu.png" class="kefuImg">
          <div class="mui-media-body">生活服务</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/community">
          <img src="../assets/shequ.png" class="kefuImg">
          <div class="mui-media-body">社区服务</div>
        </router-link>
      </li>
    </ul>
    <div class="others">
      <ul class="ul">
        <li>
          <div class="divide" style="width: 3px; height: 20px; background-color: black;"></div>
          <span class="newShare">最新分享</span>
          <div class="divide2" style="width: 100%; height: 2px; background-color: #f2f4f7;"></div>
          <img src="../assets/smversion.png" class="house">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Swipe,SwipeItem} from 'mint-ui';

  export default {
    data() {
      return {

      }
    },

    created() {

    },
    components: {
      Swipe,
      SwipeItem,
    },
    methods:{
      refresh() {
      },
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
    height: 130%;
    overflow-y: scroll;
    background-color: #f2f4f7;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    font-size: 22px;
  }
  .titleName{
    position: absolute;
    width: 100%;
    text-align: center;
    top: 5px;
  }
  .swipe{
    position: absolute;
    top: 30px;
    width: 100%;
    height: 140px;
  }
  .kefuImg{
    width: 40px;
    height: 40px;
  }
  .img {
    width: 100%;
    height: 140px;
  }
  .grid{
    position: absolute;
    top: 170px;
  }

  .mui-icon {
    width: 40px;
    height: 40px;
  }
  .mui-icon-home {
    background-image: url(../../static/images/menu3.png);
    background-repeat: round;
  }

  .mui-icon-email {
    background-image: url(../../static/images/menu4.png);
    background-repeat: round;
  }

  .mui-icon-chatbubble {
    background-image: url(../../static/images/menu5.png);
    background-repeat: round;
  }

  .mui-icon-location {
    background-image: url(../../static/images/menu6.png);
    background-repeat: round;
  }
  .mui-icon-search {
    background-image: url(../../static/images/menu9.png);
    background-repeat: round;
  }
  .mui-icon-phone {
    background-image: url(../../static/images/menu10.png);
    background-repeat: round;
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
  .others{
    position: absolute;
    top: 320px;
    width: 100%;
  }
  .ul{
    padding: 0px;
    list-style-type: none;
    background-color: white;
    width: 100%;
  }
  .divide{
    position: relative;
    top: 10px;
    left: 15px;
  }
  .newShare{
    position: relative;
    top: -10px;
    left: 30px;
  }
  .divide2{
    position: relative;
  }
  .house{
    position: relative;
    width: 100%;
    top: 10px;
  }
</style>
