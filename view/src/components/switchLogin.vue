<template>
<div class="a-link">
    <a :href="url" :text="label" >*****</a>
</div>
</template>

<script>
export default{
    props:['label','url']
}
</script>

<style scoped>
    a{
        color: rgb(246, 73, 73);
        float: right;
    }
</style>