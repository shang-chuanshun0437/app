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
  import Tabbar from './components/Tabbar'
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    components:{
      Tabbar
    },
    created (){
      this.$store.dispatch("version/save","2018.12.24");
    }
  }
</script>

<style>
  @import '../static/css/muihead.css';
  body{
    background-color:white;
  }
  .routerview{
    position: absolute;
    overflow-x: hidden;
    overflow-y: scroll;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

</style>
