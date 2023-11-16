<template>
    <div class="userInfo">
    <img src="../../public/background.jpg" alt="个人背景" class="backImg">
    <div class="nav">
        <img :src="user[0].head" alt="" v-if="user[0].head">
        <img src="../../public/head.jpg" alt="" v-else>
        <div>
            <div class="info-diplomacy">
            <span>
                <span>0</span>
                <p style="margin: 8px;">粉丝</p>
            </span>
            <p class="gap">|</p>
            <span>
                <span>0</span>
                <p style="margin: 8px;">获赞</p>
            </span>
            <p class="gap">|</p>
            <span>
                <span>0</span>
                <p style="margin: 8px;">关注</p>
            </span>  
            </div>          
        <div class="edit" @click="$router.push('/edit')">编辑资料</div>   
        </div>  
    </div>
    <p>{{ user[0].name }}</p>
    <p v-if="!user[0].signature">这个人很神秘，什么也没写</p>   
    <!-- <p :text="这个人很神秘什么也没写">{{ user[0].signature }}</p>    -->
    <p v-else v-text="user[0].signature"></p>
    <div class="lookUser">
        <span :class="{active:whereLook === '收藏'}" @click="switchLook">收藏</span><span>|</span><span :class="{active:whereLook === '投稿'}" @click="switchLook">投稿</span>
    </div>     
    </div>
</template>

<script>
export default{
    data(){
        return{
            router:this.$router,
            elementWidth:0,
            whereLook:'收藏',
            user:null
        }
    },
    created(){              
        this.user = JSON.parse(localStorage.getItem('user'))  
        this.$http.post('/logonUser', {
        userId: this.user[0].userId,
        passWord: this.user[0].passWord
      }).then(res =>{
        this.user = res.data.result
      })          
    },
}
</script>

<style lang="less" scoped>
    .userInfo{
        background-color: white;  
        .backImg{
            height: 30vw;
            width: 100%;
            object-fit: none;//将图像保持原始大小，超出容器的部分会被隐藏。
        }
        p:nth-last-child(3){ //从后往前选
            font-size: 25px;
            margin: 2px 0 0 10px;
            padding: 0;
        }
        p:nth-last-child(2){
            font-size: 18px;
            color: #ccc;
            margin: 2px 0 2px 10px;
            padding: 0;
        }
        .lookUser{
            margin-top: 8px;
            font: 25px;
            .active{
                border-bottom: 4px solid red;
            }
            span{
                text-align: center;
                padding:0 4px;
            }
        }
        .nav{      
            display: flex;
            img{
                margin:auto auto;
                height: 20vw;
                aspect-ratio: 1/1;
                border-radius: 50%;
            }   
            div:nth-child(2){
                flex: 1; //占用剩余空间用于编辑信息
            }
            .info-diplomacy{
                height: 12vw;
                display:flex;  //元素的行为类似于内联元素并且它的内容根据弹性盒模型布局。
                justify-content: center;  //主轴
                align-items: center;    //让每一个单行居中
                flex-direction: row;
                span{
                    text-align: center; //行内内容的水平对齐
                    flex: 1;
                    span:nth-child(1){
                        color: #ccc;
                    }
                }
            }        
            .gap{
                color:#ccc;
                font-size: 30px;
            }
            .edit{
                height: 8vw;
                width:70%;
                border-radius: 4vw;
                text-align: center;
                margin: 0 auto;
                line-height: 8vw;
                background-color: fuchsia;
            }
        }
    }
    @media (min-width: 602px) {
        .userInfo{
        background-color: white;  
        .backImg{
            height: 180px;                        
        }
        .nav{                  
            img{
                height: 120px;
            }   
            .info-diplomacy{
                height: 72px;                        
                }                 
            .edit{
                height: 48px;               
                border-radius: 24px;
                line-height: 48px;                
            }
        }
    }
    }
</style>