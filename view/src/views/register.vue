<template>
<div>
<loginTop middleTop="用户注册"></loginTop>
<loginText label="用户名" style="margin: 25px 0;" placeholder="请输入用户名(长度不超过6位)" rule="^.{1,6}$" @toContent="content => name=content"></loginText>
<loginText label="账号" placeholder="请输入6-8位账号" rule="^[0-9]{6,8}$" @toContent="content => userId=content"></loginText>
<loginText label="密码" placeholder="请输入6-10位数字或字母的密码" type="password" rule="^[a-zA-Z0-9]{6,10}$" @toContent="content => passWord=content"></loginText>
<switchLogin label="已有账号=>>去登录" url="/"></switchLogin>
<loginButton label="注册" style="margin-top: 40px;" @enrollUser="enrollUser"></loginButton>
</div>
</template>

<script>
import loginText from '../components/loginText.vue';
import loginTop from '../components/loginTop.vue';
import loginButton from '../components/loginButton.vue'
import switchLogin from '../components/switchLogin.vue';
import SwitchLogin from '../components/switchLogin.vue';
import { showToast } from 'vant';
export default{
    data(){
        return{
            name:'',
            userId:'',
            passWord:''
        }
    },
    components:{ loginTop, loginText, loginButton, SwitchLogin },
    methods:{
      async enrollUser(){        
        if(this.name&&this.userId&&this.passWord){
        const res = await this.$http.post('/enrollUser', {
        name: this.name,
        userId: this.userId,
        passWord: this.passWord
      })
      .then(res => {
        console.log(res);
        showToast(res.data);
        if(res.data.code == "账号创建成功"){
          localStorage.setItem('user',JSON.stringify({
            name:this.name,
            userId:this.userId,
            passWord:this.passWord            
          }))
          setTimeout(() => {            
            this.$router.push({
              name:'userInfo'
            })
          }, 800);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }else if(!this.name&&!this.userId&&!this.passWord){
      showToast("请确认信息输入正确")
    }else if(this.name == ''){
      showToast("用户名不规范请重新输入")
    }else if(this.userId==''){
      showToast("账号输入不规范")
    }else if(this.passWord==''){
      showToast("密码输入不规范请重新输入")
    }
    }
    }
}
</script>

<style>

</style>