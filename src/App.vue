<template>
  <div>
    <div id="content" class="routerview">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
  import Tabbar from "./components/Tabbar"

  export default {
    name: 'app',
    data () {
      return {

      }
    },
    components:{
      Tabbar
    }
    ,
    created (){
      //当app.vue创建完成以后，自动加载Home.vue模块
      // window.location='/#/Home';
    }
  }
</script>

<style>
  @import '../static/css/muihead.css';
  body{
    background-color:white;
  }
  .routerview{
    margin-top: 45px;
  }

</style>
