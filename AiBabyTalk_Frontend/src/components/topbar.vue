<template lang="pug">
div(class="w-full h-[9%] bg-white flex items-center border-y-2 border-black")
  img(
    src="/list.png"
    alt="list" 
    class="ml-1 rounded-full cursor-pointer w-11 h-11 hover:bg-slate-200"
    @click="onChangeImg"
  )
  div(class="flex items-center justify-center ml-auto mr-1 rounded-full w-11 h-11 bg-slate-200 hover:bg-slate-300" @click="onOpenBox")
      img(src="/child.png" alt="list" class="w-6")
  div(v-if="signOutBox" class="absolute top-0 right-0 z-50 flex flex-col w-64 p-4 mt-12 mr-4 bg-white border-2 rounded-lg")
    p 金照曦  小朋友
    p 性別: 女
    p 生日: 111/10/1
    button(
      class='p-1 ml-auto border rounded hover:bg-slate-100'
      @click='onNavigate'
    ) 登出

  // 側邊框
  div(
    v-if="onOpenSideBar" 
    class="flex flex-col items-center fixed left-0 top-0 w-[20%] h-screen bg-slate-100 shadow-lg transition-transform duration-1000 transform" 
    :class="{'translate-x-0': onOpenSideBar, '-translate-x-full': !onOpenSideBar}")
    div(class='flex justify-center w-full h-8 py-1 text-xl') 家長資源中心
    div(class='flex w-full h-10 py-1 pl-1 mt-2 hover:bg-yellow-50 hover:animate-pulse') 
      p 聊天分析
      img(src='/chat.png' class='w-8 ml-auto mr-2')
    div(class='flex w-full h-10 py-1 pl-1 hover:bg-yellow-50 hover:animate-pulse') 
      p 遊戲狀況分析
      img(src='/game.png' class='w-8 ml-auto mr-2')
    div(class='flex w-full h-10 py-1 pl-1 hover:bg-yellow-50 hover:animate-pulse') 
      p 學習狀況分析
      img(src='/learn.png' class='w-8 ml-auto mr-2')
    div(class='flex w-full h-10 py-1 pl-1 hover:bg-yellow-50 hover:animate-pulse') 
      p 機器人設定
      img(src='/robot-face.png' class='w-8 ml-auto mr-2')
    button(
      class='p-1 mt-auto mb-16 border-2 hover:bg-white'
      @click="onChangeImg"
      ) 關閉
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onOpenSideBar = ref(false);
const signOutBox = ref(false);

function onChangeImg() {
  onOpenSideBar.value = !onOpenSideBar.value;
}

function onOpenBox() {
  signOutBox.value = !signOutBox.value;
}

function onNavigate() {
  router.push("/login");
}
</script>
