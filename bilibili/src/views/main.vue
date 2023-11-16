<template>
<div ref="myElement">
<mainTop></mainTop>
<router-view></router-view>
<buttomNavig :style="{ width: `${elementWidth}px` }"></buttomNavig>
</div>
</template>

<script>
import buttomNavig from '../components/buttomNavig.vue';
import mainTop from '../components/mainTop.vue'
export default{
    components:{mainTop,buttomNavig},
    data(){
        return{
            elementWidth:0,
        }
    },
    methods:{        
        switchLook(e){
            if(e.target.classList.contains('active')) {
                console.log(user);
                return
            }else{
                this.whereLook = e.target.innerText
            }
        },  
        handleResize(){
            this.elementWidth = this.$refs.myElement.offsetWidth;
            console.log("元素宽度：", this.elementWidth);
        }
    },
    mounted() {
    //视口大小变化时调用该函数 
    window.addEventListener('resize', this.handleResize);
    // 获取元素宽度
    this.handleResize()
    },
}
</script>

<style>

</style>