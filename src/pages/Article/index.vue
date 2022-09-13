<template>
  article 页面 {{route.params.id}}
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()


</script>

<style lang="less" scoped>

</style>