<template style="width: 100px">
  <div class="wrapper">
    <mt-header title="个人信息" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>

    <div class="personalInfo">
      <div class="divide" style="width: 3px; height: 20px; background-color: black;"></div>
      <span class="info">个人资料</span>
    </div>

    <div class="portrait" @click="portrait()">
      <span class="myPortrait">头像</span>
      <img class="portraitImg" src="../../assets/logo.png">
    </div>
    <div>
      <ul class="ul">
        <li class="nickName" @click="nickName()">
          <mt-cell style="min-height: 40px;" title="昵称" is-link>
            <span>{{user.userName}}</span>
          </mt-cell>
        </li>
        <li class="account">
          <mt-cell style="min-height: 40px" title="账号" is-link>
            <span>{{user.userPhone}}</span>
          </mt-cell>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  import UserDB from "../../common/UserDB"

  export default {
    data(){
      return{
        user: {
          src: '../../assets/logo.png',
          userName: '未设置昵称',
          userPhone: "未登录",
          token:'',
        }
      }
    },
    methods:{
      back(){
        this.$router.go(-1);
      },
      portrait(){
        console.log('ssdddf')
      },
      nickName(){
        this.$messagebox.prompt('请输入昵称', {
          inputValidator: (val) => {
            if (val === null) {
              return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
            }
            return !(val.length < 1)
          }, inputErrorMessage: '请输入用户昵称'
        }).then((val) => {
          if (val.value != null){
            var obj = {userName: val.value};
            this.updateUserInfo(obj);
          }
        }, () => {
          console.info('cancel')
        })
      },
      updateUserInfo(obj){
        var param = {userPhone:this.user.userPhone,token: this.user.token,userName: obj.userName};
        //更新用户基本信息
        API.POST(URL.ACCOUNT_UPDATE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.user.userName = obj.userName;
              var userDB = new UserDB();
              userDB.clear();
              userDB.add(param);
            }else {
              this.$toast('修改失败！');
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      changeToLogin(){  //跳转到登录界面
        if (this.user.userPhone == '未登录'){
          this.$router.push('/lock/login');
        }else {
          console.log('ssdddf')
        }
      }
    },
    created() {
      console.log('created')
      var userDB = new UserDB();
      userDB.getAll().then((obj) => {
        if (obj != null) {
          this.user.userPhone = obj.userPhone;
          this.user.userName = obj.userName;
          this.user.token = obj.token;
        }
      })
    },
    computed: {
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
    background-color: #ff5053;
    font-size: 18px;
  }
  .personalInfo{
    position: absolute;
    top: 60px;
    width: 100%;
    height: 40px;
    background-color: white;
  }
  .divide{
    position: relative;
    top: 11px;
    left: 15px;
  }
  .info{
    position: relative;
    top: -10px;
    left: 30px;
    font-size: 16px;
    color: #000000;
  }
  .portrait{
    position: absolute;
    top: 110px;
    width: 100%;
    height: 40px;
    background-color: white;
  }
  .myPortrait{
    position: absolute;
    font-size: 16px;
    top: 10px;
    left: 10px;
  }
  .portraitImg{
    position: absolute;
    top: 5px;
    left: 85%;
    height: 30px;
    width: 30px;
  }
  .ul{
    position: absolute;
    top: 146px;
    width: 100%;
    padding: 0;
    list-style-type: none;
  }
  .nickName{
    width: 100%;
    max-height: 40px;
  }
  .account{
    width: 100%;
    max-height: 40px;
    font-size: 14px;
  }
</style>
