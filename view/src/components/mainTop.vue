<template>
    <div class="mainTop">
        <div><img src="../../public/logo.png" alt="logo"></div>
        <div ><span class="logo">鸡哥视频</span></div>
        <div><div class="circle"><img src="../../public/head.jpg" alt=""></div></div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
.mainTop{
    height: 12.5vw;
    background-color: white;
    display: flex;
    line-height: 12.5vw;
    div{
      aspect-ratio: 2.6;
      display: flex;
      // flex: 1;
      justify-content: center;
      align-content: center;
      font-size: 4.44vw;
    }
    .circle{
      height: 12.5vw;
      aspect-ratio: 1 ;
      border: 1px solid whitesmoke;
      border-radius: 50%; /* 将边框半径设置为50%，即成为一个圆形 */
      overflow: hidden; /* 设置溢出内容隐藏，确保图片不会超出圆形框 */
      img{
      width: 100%; /* 让图片充满整个圆形框 */
      height: auto; /* 根据宽度自适应调整高度 */
      }
    }
    .logo{
      background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
      -webkit-background-clip: text; /* for Safari */
      background-clip: text;
      background-size: 200% 100%;
      color: transparent;
      animation: animation 4s infinite;
      @keyframes animation{
        0%{
          background-position: 0 0;
        }
        100%{
          background-position: -100% 0;
        }
      }
      }
    }
       
  @media (min-width: 602px) {
    .mainTop{
    height: 76px;
    background-color: white;
    display: flex;
    line-height: 76px;
    div{
      aspect-ratio: 2.6;
      display: flex;
      justify-content: center;
      align-content: center;
      font-size: 36px;
    }
    .circle{
      height: 76px;
      aspect-ratio: 1;
      border: 1px solid whitesmoke;
      border-radius: 50%; /* 将边框半径设置为50%，即成为一个圆形 */
      overflow: hidden; /* 设置溢出内容隐藏，确保图片不会超出圆形框 */
      img{
      width: 100%; /* 让图片充满整个圆形框 */
      height: auto; /* 根据宽度自适应调整高度 */
      }
    }
  }
}
</style>