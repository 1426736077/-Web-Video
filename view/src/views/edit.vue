<template>
    <div class="edit">
        <mainTop style="margin-bottom: 12px;"></mainTop>
        <div class="uploadfile">
        <editBanner left="头像">
            <template #right>
            <div class="uploadimg"><van-uploader preview-size="100vw" :after-read="afterRead" /></div>
            <img :src="model.head" alt="" v-if="model.head">
            <img src="../../public/head.jpg" alt="" v-else>
            </template>
        </editBanner>
    </div>
        <editBanner left="名称" @bannerClick="show = true">
            <template #right>
            <span>{{ model.name }}</span>
            </template>
        </editBanner>
        <editBanner left="个性签名" @bannerClick="textshow = true">
            <template #right>
            <span v-if="model.signature">{{ model.signature}}</span>
            <span v-else></span>
            </template>
        </editBanner>

        <div class="editback" @click="UserUpdate" style="color:red">保存修改</div>
        <div class="editback" @click="$router.back()">返回个人中心</div>

        <van-dialog v-model:show="show" 
      title="昵称" 
      show-cancel-button 
      @confirm="confirmClick"
      @cancel="content = ''"
      >
          <van-field v-model="content" autocomplete="off" autofocus />
      </van-dialog>


      <van-dialog 
         v-model:show="textshow"
         title="个签"
         show-cancel-button
         @confirm="textareaClick"
         @cancel="content = ''"
      >
          <van-field v-model="content" autocomplete="off" autofocus />
      </van-dialog>

    </div>
</template>

<script>
import mainTop from '../components/mainTop.vue'
import editBanner from '../components/editBanner.vue';
import { showToast } from 'vant';

export default{
    components:{mainTop,editBanner},
    data(){
        return{
            model:{},   
            show:false,
            textshow:false,
            content:'',          
        }
    },
    created(){
        const res = JSON.parse(localStorage.getItem('user'))
        this.model = res[0]
    },
    methods:{
        async afterRead(file) {            
           const formdata = new FormData()           
           formdata.append('file',file.file)
           formdata.append('user',this.model.userId)    
           const res =  await this.$http.post('/upload',formdata)
           console.log(res);
           this.model.head = res.data                              
       },
       async UserUpdate() {
           const res = await this.$http.post('/update',this.model)
           if(res.data.state == 200){
            localStorage.setItem('user',JSON.stringify([this.model]))
            showToast('修改成功')            
           } 
       },
       confirmClick() {
        if (this.content.length>=1&&this.content.length<=6) {
            this.model.name = this.content
            this.content = ''
        }else{        
            showToast("名称长度不得超过6位或为空")
        }

       },
       textareaClick() {
           this.model.signature = this.content
           this.content = ''
       },
    }
}
</script> 

<style scoped lang="less">
.uploadfile{
    overflow: hidden;
    position: relative;
    .uploadimg{
        opacity: 0;
        position: absolute;        
    }
}
.edit img{
    height: 12.778vw;
    width: 12.778vw;
    border-radius: 50%;
}
.editback{
    margin-top: 5.556vw;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    color: #999;
    padding: 4.167vw 0;
    font-size: 4vw;
}
/deep/ .van-field{
    font-size: 20px;
}

@media (min-width: 602px) {
.edit img{
    height: 77px;
    width: 77px;
    border-radius: 50%;
    }
    .editback{
    margin-top: 33.33px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    color: #999;
    padding: 25px 0;
    font-size: 31.7px;
}

}

</style>