<template lang="pug">
div(class="w-screen h-screen bg-[#FFFDD0]")
  top-bar
  div(class='flex items-center w-auto h-[91%] justify-around select-none')
    div(
      class='w-[30%] h-[80%] bg-white border-2 border-slate-900 rounded-lg flex justify-center items-center cursor-pointer text-3xl hover:bg-red-300'
      @click="onNavigate('chat')"
      )
      p 聊天機器人
    div(
      class='w-[30%] h-[80%] bg-white border-2 border-slate-900 rounded-lg flex justify-center items-center cursor-pointer text-3xl hover:bg-blue-300'
      @click="onNavigate('game')"
      )
      p 遊戲世界
    div(
      class='w-[30%] h-[80%] bg-white border-2 border-slate-900 rounded-lg flex justify-center items-center cursor-pointer text-3xl hover:bg-green-300'
      @click="onNavigate('learn')"
      )
      p 學習機器人
</template>
<script setup>
import topBar from "../components/topbar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function onNavigate(route) {
  router.push(`/${route}`);
}
</script>
