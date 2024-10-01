<template>
  <Layout>
    <section class="w-full h-screen">
      <NavBar />
      <RouterView />
    </section>
  </Layout>
</template>

<script setup lang="ts">
import NavBar from '@/components/header/navbar/NavBar.vue';
import { Layout } from 'ant-design-vue';
</script>
