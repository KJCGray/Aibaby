<template lang="pug">
    div(class="w-screen h-screen bg-[#FFFDD0]")
      topBar
      div(class='flex flex-col items-center w-auto h-[91%] justify-around select-none')
        img(src="/arrow-left.png" alt="back" class="w-10 h-10 ml-2 mr-auto")
        div(class='flex items-center w-auto h-auto mt-2 ml-auto mr-2')
          img(src="/audio.png" alt="audio" class="w-8 h-8 mr-2")
          div(class='w-auto h-auto p-2 bg-white border-2 rounded border-slate-500')
            p 你好,我是你的朋友,小米,一起來聊聊天吧！
        div(class='w-[90%] h-18 bg-white rounded-lg border-2 border-black flex items-center mt-auto mb-2')
          div(class='flex items-center justify-center w-12 h-12 ml-1 rounded-full hover:bg-slate-100')
            img(src="/record.png" alt="record" class="w-10 h-10")
          div(class='flex items-center justify-center w-12 h-12 ml-auto mr-1 rounded-full hover:bg-slate-100')
            img(src="/publish.png" alt="publish" class="w-8 h-8")
    </template>
    <script>
    import topBar from "../components/topbar.vue";
    export default {
      components: { topBar },
    };
    </script>
    