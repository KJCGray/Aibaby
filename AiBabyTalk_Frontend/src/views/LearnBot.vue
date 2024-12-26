<template lang="pug">
    div(class="w-screen h-screen bg-[#FFFDD0]")
      topBar
      div(class='flex items-center w-auto h-[91%] justify-around select-none')
        div(class='w-[30%] h-[80%] bg-white border-2 border-slate-900 rounded-lg flex justify-center items-center cursor-pointer text-3xl hover:bg-red-300')
          p 學習機器人
    </template>
    <script>
    import topBar from "../components/topbar.vue";
    export default {
      components: { topBar },
    };
    </script>
    