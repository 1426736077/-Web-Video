import { ref,computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {  //创建该函数可在全局引入并使用
  const count = ref(5)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function say(a) {
    console.log('hallo world'+a);  
  }
  return { count, doubleCount, increment,say} //返回了2个数值一个方法
})   
