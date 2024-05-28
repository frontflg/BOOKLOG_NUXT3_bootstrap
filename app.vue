<script setup lang="ts">

// headerの設定
useHead({
  title: "nuxt3 booklog",
  link: [
    {
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      rel: "stylesheet", 
      integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC", 
      crossorigin: "anonymous"}
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js", 
      integrity:"sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
      crossorigin: "anonymous"
    }
  ]
})

</script>

<template>

  <div class="container">

    <h2 class="mt-5"> 読書履歴管理 </h2>

    <NuxtLink class="btn btn-primary me-3" v-bind:to="{name: 'index'}"> 一覧 </NuxtLink>
    <NuxtLink class="btn btn-primary me-3" v-bind:to="{name: 'post'}"> 登録 </NuxtLink>
    <NuxtLink class="btn btn-primary me-3" v-bind:to="{name: 'get'}"> 詳細 </NuxtLink>
    <NuxtLink class="btn btn-primary me-3" v-bind:to="{name: 'put'}"> 変更 </NuxtLink>
    <NuxtLink class="btn btn-primary me-3" v-bind:to="{name: 'delete'}"> 削除 </NuxtLink>

    <NuxtPage/>

  </div>

</template>
