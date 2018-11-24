<template>
  <div>
    <mt-header fixed title="fixed top"></mt-header>
    <swipe class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </swipe>

    <!--描述：九宫格区域-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/doors">
					<span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">芝麻开门</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/car">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">客服</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/member">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">智能锁</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/photolist">
					<span class="mui-icon mui-icon-email"></span>
          <div class="mui-media-body">租房</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/search">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">生活服务</div>
        </router-link>
      </li>

      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">社区服务</div>
        </router-link>
      </li>

    </ul>
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
      SwipeItem
    }
  }
</script>

<style scoped>
  .swipe {
    width: 100%;
    height: 180px;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  .slide1 a,
  .slide1 img {
    display: block;
    width: 100%;
    height: 250px;
  }
  .mint-swipe-indicator {
    opacity: 1;
    background: rgba(239, 239, 239, 0.8);
  }
  .mint-swipe-indicator.is-active {
    opacity: 1;
    background: rgba(250, 250, 10, 0.8)
  }
  .mui-icon {
    width: 50px;
    height: 50px;
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
</style>
