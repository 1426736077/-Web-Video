<template>
<div>
<loginTop middleTop="用户登录"></loginTop>
<loginText label="账号" placeholder="请输入账号" rule="^[0-9]{6,8}$" @toContent="content => userId=content" style="margin: 25px 0;"></loginText>
<loginText label="密码" placeholder="请输入密码" type="password" rule="^[a-zA-Z0-9]{6,10}$" @toContent="content => passWord=content"></loginText>
<switchLogin label="没有账号=>>去注册" url="/register"></switchLogin>
<loginButton label="登录" style="margin-top: 40px;" @enrollUser="enrollUser"></loginButton>
</div>
</template>

<script>
import loginText from '../components/loginText.vue';
import loginButton from '../components/loginButton.vue';
import loginTop from '../components/loginTop.vue';
import switchLogin from '../components/switchLogin.vue';
import { showToast } from 'vant';

export default{
  created(){
    if(this.$route.query.alert){
      showToast(this.$route.query.alert)
    }
    if(localStorage.getItem('user')){
      this.$router.push('/main')
    }
  },
    data(){    
        return{
            userId:'',
            passWord:''
        }
    },
    components:{ loginTop,loginText,loginButton,switchLogin },
    methods:{  
      async enrollUser(){        
        if(this.userId&&this.passWord){
        const res = await this.$http.post('/logonUser', {
        userId: this.userId,
        passWord: this.passWord
      })
      .then(res => {
        console.log(res);
        if(res.data.code =='登录成功'){
          // console.log(JSON.stringify(res.data.result));
          localStorage.setItem('user',JSON.stringify(res.data.result))
          setTimeout(() => {            
            this.$router.push({
              name:'userInfo'
            })
          }, 800);
          showToast('登录成功,即将跳转到主页');
        }
      })
      .catch(error => {
        console.error(error);
      });
    }else if(!this.userId&&!this.passWord){
      showToast("请确认信息输入正确")
    }
    else if(this.userId==''){
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