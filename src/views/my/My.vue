<template>
  <div class="wrapper">
    <div class="header">
      <ul class="ul">
        <li class="title">
          我的
        </li>
        <li class="setting">
          <mt-button type="text" style="background-color: #2ac845">设置</mt-button>
        </li>
      </ul>
      <img :src="user.src" class="img"/>
      <ul class="ul">
        <li class="username">
          {{user.username}}
        </li>
        <li class="account">
          {{user.account}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      user: {
        src: 'http://img1.imgtn.bdimg.com/it/u=3198762613,766144830&fm=27&gp=0.jpg',
        username: '未设置昵称',
        account: "未登录",
         setting: {
          badge: 2,
       }
      }
    }
  },
  methods:{
    changeToSetting(){            //跳转到设置界面
      if(this.user.name){
        this.$router.push('/account/setting');
      }else{
        this.$router.push('/account/login');
      }
    },
    changeToLogin(){            //跳转到登录界面
      this.$router.push('/account/login');
    }
  },
  computed:{
  }
}
</script>

<style scoped>
  .header{
    position: absolute;
    top: 0px;
    width: 100%;
    height: 140px;
    background-color: #2ac845;
  }
  .title{
    position: absolute;
    top: 15px;
    left: 24%;
  }
  .setting{
    position: absolute;
    top: 10px;
    right: 50px;
    background-color: #2ac845;
  }
  .ul{
    padding: 0;
    list-style-type: none
  }
  .img{
    position: absolute;
    top: 40px;
    left: 18%;
    width: 80px;
    height: 80px;
    border-radius:100px;
    border: 2px solid #ced1da;
    display: inline-block;
    margin-left: 0.21333rem;
    margin-top: 0.21333rem
  }
  .username{
    position: absolute;
    top: 55px;
    left: 45%;
  }
  .account{
    position: absolute;
    top: 90px;
    left: 45%;
  }

</style>
