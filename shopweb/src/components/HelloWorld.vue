<template>
  <div id="background" @keyup.13="keyup($event)" >
    <canvas id="stars" style="position:absolute; top:0; left:0"></canvas>
    <img style="position:absolute; bottom:0; left:0;" src="../assets/zbztb_lognewyun.png" width="100%" alt="" />
    <div class="formbg">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="right" label-width="100px">   
        <h1 style="">欢迎登录</h1>
          <el-form-item  prop="username" label="登录名:">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="登录名"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密 码:" >
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-button @click="loginSubmit" style="position:relative">用户登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { stars } from '../assets/js/stars'
import * as axios from '../assets/js/myAxios' 
export default {
  name: 'HelloWorld',
  data () {
    return {
      loginForm: {
          username: 'admin',
          password: '111111'
        },
      rules: {
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
    }
  },
  methods:{
    stars() {
        stars();
    },
    loginSubmit(){
      let that=this;
      axios.ajaxGet('/login',this.loginForm,function (res) {
        console.log(res)
      });
      axios.ajaxPost('/login',this.loginForm,function (res) {
        console.log(res)
      });
    },
    keyup(ev){
      this.loginSubmit();
    }
  },
  mounted(){
    this.stars();
    // document.getElementById("background").style.height=window.innerHeight+"px";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
body {
    overflow: hidden;
    padding: 0;
  }
#background{
  background: -webkit-linear-gradient(left top, #061040 , #7575de); /* Safari 5.1 - 6.0 */
  height: 700px;
  z-index: -1;
}
.formbg{
  background: white;
  border-radius: 50%;
  width: 250px;
  height:400px;
  padding:50px 50px;
  float: right;
  margin: 50px;

}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
