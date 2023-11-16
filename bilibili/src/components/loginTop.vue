<template>
    <div class="logintop">
      <div></div>
        <div>{{ middleTop }}</div>
        <div></div>
    </div>
</template>

<script>
export default{
    props:['middleTop']
}
</script>

<style lang="less" scoped>
  .logintop{
    background-color: white;
    display: flex;
    line-height: 12.5vw;
    div{
      aspect-ratio: 2.6;
      display: flex;
      flex: 1;
      justify-content: center;
      align-content: center;
      font-size: 4.44vw;
    }
  }
  @media (min-width: 602px) {
    .logintop{
    background-color: white;
    display: flex;
    line-height: 76px;
    div{
      aspect-ratio: 2.6;
      display: flex;
      flex: 1;
      justify-content: center;
      align-content: center;
      font-size: 36px;
    }
  }
  }
</style>