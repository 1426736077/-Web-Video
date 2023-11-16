<template>
<div>
    <van-field :label="label" :placeholder="placeholder" :type="type" v-model="content"/>
</div>
</template>

<script>
export default{
    data(){
        return{
            content:''
        }
    },
    props:['label','placeholder','type','rule'],
    methods:{
        checked(){
            const rue = new RegExp(this.rule)            
            // console.log(rue);
            if(rue.test(this.content)){
                // console.log(1);
                this.$emit('toContent',this.content)
            }else{
                this.$emit('toContent','')
            }
        }
    },
    watch:{
        content(){
            this.checked()
        }
    }
}
</script>

<style scoped lang="less">

</style>