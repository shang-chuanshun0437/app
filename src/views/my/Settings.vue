<template style="width: 100px">
  <div class="wrapper">
    <mt-header title="设置" class="title">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div>
      <ul class="ul personal">
        <li class="changePwd" @click="changePwd()">
          <mt-cell style="min-height: 40px;" title="登录密码" is-link>
            <span>修改</span>
          </mt-cell>
        </li>
        <li class="account" @click="changePhone()">
          <mt-cell style="min-height: 40px" title="更换手机号" is-link>
            <span>{{user.userPhone}}</span>
          </mt-cell>
        </li>
        <li class="cancel" @click="destroy()">
          <mt-cell style="min-height: 40px" title="注销账号" is-link>
            <span>谨慎操作</span>
          </mt-cell>
        </li>
      </ul>
      <ul class="ul company">
        <li class="aboutUs" @click="aboutUs()">
          <mt-cell style="min-height: 40px;" title="关于我们" is-link></mt-cell>
        </li>
        <li class="suggestion">
          <mt-cell style="min-height: 40px" title="意见反馈" is-link>
            <span>让明天更美好</span>
          </mt-cell>
        </li>
      </ul>
      <mt-button type="primary" class="confirmButton" @click="logout">退出登陆</mt-button>
    </div>
  </div>
</template>

<script>
  import UserDB from "../../common/UserDB"
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";

  export default {
    data(){
      return{
        user: {
          userName: '未设置昵称',
          userPhone: "未登录",
          token:'',
        }
      }
    },
    methods:{
      refresh(){
        var userDB = new UserDB();
        userDB.getAll().then((obj) => {
          if (obj != null) {
            this.user.userPhone = obj.userPhone;
            this.user.userName = obj.userName;
            this.user.token = obj.token;
          }
        })
      },
      back(){
        this.$router.go(-1);
      },
      changePwd(){
        this.$router.push("/user/changePwd");
      },
      changePhone(){
        this.$messagebox.confirm('', {
          message: '您当前的手机号为 ' + this.user.userPhone,
          title: '确定要更换手机号码？',
          confirmButtonText: '更换',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            this.$router.push({path:"/user/checkPassword",query:{phoneNum:this.user.userPhone,token:this.user.token}});
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        });
      },
      destroy(){
        this.$messagebox.confirm('', {
          message: '账户注销后，您的信息将会丢失，确定要注销吗？',
          title: '提示',
          confirmButtonText: '注销',
          cancelButtonText: '取消'
        }).then(action => {
          if (action == 'confirm') {     //确认的回调
            this.passwordInput();
          }
        }).catch(err => {
          if (err == 'cancel') {     //取消的回调
            console.log(2);
          }
        });
      },
      passwordInput(){
        this.$messagebox.prompt('请输入登录密码', {
          inputValidator: (val) => {
            if (val === null) {
              return true;//初始化的值为null，不做处理的话，刚打开MessageBox就会校验出错，影响用户体验
            }
            return !(val.length < 1)
          }, inputErrorMessage: '请输入用户密码'
        }).then((val) => {
          if (val.value != null){
            this.destroyNow(val.value);
          }
        }, () => {
          console.info('cancel')
        });
      },
      destroyNow(password){
        var param = {userPhone:this.user.userPhone,password: password,token: this.user.token};
        //用户注销
        API.POST(URL.DESTROY_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$toast('注销成功');
              var userDB = new UserDB();
              userDB.clear();
              this.$router.push("/home");
            }else {
              this.$toast('密码不正确');
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      logout(){
        var userDB = new UserDB();
        userDB.clear();
        this.$router.push("/home");
      },
      aboutUs(){
        this.$router.push("/user/aboutUs");
      },
    },
    created() {
      this.refresh();
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
    background-color: #f2f4f7;
  }
  .title{
    position: absolute;
    top: 0px;
    width: 100%;
    background-color: #ff5053;
    font-size: 18px;
  }
  .ul{
    position: absolute;
    padding: 0;
    list-style-type: none;
  }
  .personal{
    top: 40px;
    width: 100%;
  }
  .changePwd{
    width: 100%;
    max-height: 40px;
  }
  .account{
    width: 100%;
    max-height: 40px;
    font-size: 14px;
  }
  .company{
    top: 180px;
    width: 100%;
  }
  .confirmButton{
    position: absolute;
    top: 380px;
    left: 5%;
    width: 90%;
  }
</style>
