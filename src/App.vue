<template>
  <div>
    <div id="content" class="routerview">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {

      }
    },
    components:{

    }
    ,
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
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

</style>
