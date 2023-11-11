<template>
<div class="main">
    <div class="button1" v-text="label" @click="sendData"></div>
</div>
</template>

<script>
export default{
    props:['label'],
    methods:{
        sendData(){
            this.$emit('enrollUser')
        }
    }
}
</script>

<style lang="less" scoped>
.main{
    display: flex;
    justify-content: center;
    .button1{
    height: 12.5vw;
    width: 85%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap:wrap;
    // flex-wrap属性用于规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。
    background-color: rgb(211, 58, 152);
    color: white;
    border-radius: 6.25vw;
    font-size: 6.5vw;
}
}
@media(min-width: 602px){
    .main{
    .button1{
    height: 75.5px;
    border-radius: 37.75px;
    font-size: 37.75px;
}
}
}
</style>