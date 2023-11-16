<style lang="less">
.container{
  margin-top: 12px;
  display: grid;
  grid-template-columns: 40% 40%;
}
</style>

<template>
<van-tabs v-model:active="active">
  <van-tab title="首页">
    <div class="container">
      <div v-for="item in res.data.data" :key="item.uid">
        <video controls width="250">
        <source :src=item.url type="video/mp4" />
        抱歉，你的浏览器不支持内嵌视频，不过不用担心，你可以
        </video>
      </div>
    </div>
  </van-tab>
  <van-tab title="游戏">游戏</van-tab>
  <van-tab title="动漫">动漫</van-tab>
  <van-tab title="鬼畜">鬼畜</van-tab>
</van-tabs>

</template>

<script setup>
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';
import { ref} from 'vue';
const {proxy} = getCurrentInstance()
const active = ref(0)
const res = ref({
  data:{
    data:[]
  }
})
onMounted(async()=>{
      res.value = await proxy.$http.post('/demo')        
})
</script>