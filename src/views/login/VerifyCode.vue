<template>
  <div>
    <div>
      <mt-header title="验证码" class="title">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
    </div>
    <div>
      <span class="tip">
       短信验证码已发送至
      </span>
      <span class="phoneNum">
        {{phoneNum}}
      </span>
      <span class="check">
        ，请查收
      </span>
      <el-button type="text" class="getCodeBtn" :disabled="disabled" @click.native.prevent="sendMsg">{{btnCode}}</el-button>
    </div>
    <div class="verify-tel">
      <div>
        <input class="verifyCode" ref="pwd"  autofocus :maxlength="digits.length" v-model="msg"/>
        <ul  class="pwd-wrap" @click="focusOn">
          <li v-for="(item,key) in digits" :style="{'margin-right': (100-10*digits.length)/(digits.length-1)+'%','width':'10%'}" >
            <span v-if="msgLength > key">{{msg.substring(key,key+1)}}</span>
          </li>
        </ul>
      </div>
    </div>
    <mt-button type="primary" class="confirmButton" :disabled="registerBtn" @click="next">下一步</mt-button>
  </div>
</template>

<script>
  import * as API from "../../axios/api";
  import * as URL from "../../axios/url";
  export default{
    data(){
      return {
        phoneNum:"",
        btnCode: "重新获取120s",
        disabled:false,
        digits:['','','','','',''],  //input框位数控制,这里可以配置多少个“输入框”
        msg:'',
        msgLength:0,
        registerBtn:true
      }
    },
    methods:{
      //使input框获得焦点
      focusOn(){
        this.$refs.pwd.focus();
      },
      back(){
        this.$router.go(-1);
      },
      getCode(time) {
        // 将按钮设置为不可点击状态
        this.disabled = true;
        // 120秒倒计时
        let timer = setInterval(() => {
          if (time <= 0) {
            //倒计时结束后，恢复
            this.disabled = false;
            this.btnCode = "获取短信验证码";
            clearInterval(timer);
          } else {
            this.btnCode = "重新获取" + time + "s";
            time--;
          }
        }, 1000);
      },
      sendMsg(){
        var param = {userPhone:this.userPhone};
        API.POST(URL.GET_VERIFY_CODE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.getCode(120);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      next(){
        //校验验证码
        var param = {userPhone: this.phoneNum,verificationCode: this.msg};
        API.POST(URL.CHECK_VERIFY_CODE_URL, param)
          .then(res => {
            if (res.result.retCode === 0) {
              this.$router.push({path:"/lock/registerPassword",query:{phoneNum:this.phoneNum,verificationCode: this.msg}});
            }else {
              this.$messagebox({
                title: '验证码错误',
                message: '请输入正确的验证码',
                confirmButtonText:"确定",
              }).then(action => {
              })
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    created() {
      this.phoneNum = this.$route.query.phoneNum;
      this.getCode(119)
    },
    watch: {
      msg(curVal){
        //监听输入的长度，如果输入完，自动调用校验接口函数
        if(curVal.trim().length===this.digits.length){
          this.registerBtn=false;
        }
        this.msgLength = curVal.length;
      },
    },
  }
</script>

<style scoped>
  html,body{
    width: 100%;
    height: 100%;
    background: #fbf9fe;
  }
  .title{
    position: absolute;
    width: 100%;
    top: 0px;
  }
  .tip{
    position: absolute;
    top: 60px;
    left:20px;
    font-size: 15px;
  }
  .phoneNum{
    position: absolute;
    top: 60px;
    left: 160px;
    color: #2ac845;
    font-size: 16px;
  }
  .check{
    position: absolute;
    top: 60px;
    left: 260px;
    font-size: 15px;
  }
  .getCodeBtn{
    position: absolute;
    top: 80px;
    left: 20px;
    font-size: 15px;
  }
  .verify-tel {
    position: absolute;
    top: 110px;
    background-color: #ffffff;
    left: 10%;
  }
  .verifyCode{
    width: 10%;
    border: none;
    z-index: -1;
    opacity: 0;
    border-bottom: 1px solid grey;
    background-color: #f9f9f9;
    text-align: center;
    margin-right: 10%;
    font-size: 25px;
  }
  .verifyCode:focus{
     border-bottom: 1px solid deepskyblue;
   }
  verifyCode:last-of-type{
     margin-right: 0 !important;
   }
  .pwd-wrap{
    padding-left: 0;
    width: 100%;
    height: 35px;
    padding-bottom: 1px;
    margin: 0 auto;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    cursor: pointer;
    border: none;
    background-color: #f9f9f9;
  }
  .pwd-wrap li {
    list-style-type: none;
    text-align: center;
    line-height: 44px;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    border: none;
    border-bottom: 1px solid black;
    background-color: #f9f9f9;
  }
  .pwd-wrap:last-of-type{
     margin-right: 0 !important;
   }
  .pwd-wrap span{
    font-size: 20px;
  }
  .confirmButton{
    position: absolute;
    top:200px;
    width: 90%;
    left: 5%;
  }
</style>
