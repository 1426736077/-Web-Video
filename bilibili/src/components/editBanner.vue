<template>
    <div @click="bannerClick">
        <div class="editbanner">
            <span>{{left}}</span>
            <slot name="right"></slot>
        </div>
    </div>
  </template>
  
  <script>
  export default {
      props:['left'],
      methods:{
        bannerClick() {
          this.$emit('bannerClick')
        }
      }
  }
  </script>
  
  <style>
  .editbanner{
    background-color: white;
    padding: 20px;
    color: #333;
    font-size: 26.5px;
    border-bottom: 0.834px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  </style>