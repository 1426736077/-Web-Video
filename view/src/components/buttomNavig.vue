<style lang="less" scoped>
.navig{
  box-sizing: border-box;
  position:fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: space-evenly;
  border: 3px solid #73AD21;
  justify-content: center;
  align-content: center;
  .icon{
    text-align: center;
    p{
        margin: 5px 0 0 0;
    }
  }
  .active{
    p{
        color:#ff00ff;
    }
  }
}
@media (min-width: 602px){
    .icon{
        img{
            height: 25px !important; 
        }
    }
}

</style>

<template>
    <div class="navig">
        <span class="icon" :class="{active:active==='home'}">
            <router-link :to="{name:'home'}">
            <img v-if="active==='home'" src="../../public/首页2.png" style="height: 4vw;">
            <img v-else src="../../public/首页1.png" style="height: 4vw;">
            <p style="font-size: 12px;">首页</p>
            </router-link>
        </span>
        <span class="icon" :class="{active:active === '2'}">
            <img v-if="active==='2'" src="../../public/上传2.png" style="height: 4vw;">
            <img v-else src="../../public/上传1.png" style="height: 4vw;">
            <p style="font-size: 12px;">上传</p>
        </span>
        <span class="icon" :class="{active:active === 'userInfo'}">
            <router-link :to="{name:'userInfo'}">
            <img v-if="active ==='userInfo'" src="../../public/个人信息2.png" style="height: 4vw;">
            <img v-else src="../../public/个人信息1.png" style="height: 4vw;">
            <p style="font-size: 12px;">个人</p>
            </router-link>
        </span>
    </div>
</template>

<script setup>
import { watch } from 'vue';
import { getCurrentInstance } from 'vue';
import { ref } from 'vue';
const {proxy} = getCurrentInstance()
let active = ref(proxy.$route.name)
// 当路由改变更新底部图表
watch(
  () => proxy.$route.name,
  (newVal) => {
    active.value = newVal;

  }
);
</script>