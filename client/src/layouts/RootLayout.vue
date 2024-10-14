<template>
  <Layout
    class="w-full min-h-screen bg-gradient-to-br from-white to-primary-0/70 font-poppins"
  >
    <NavBar />
    <RouterView />
  </Layout>
</template>

<script setup lang="ts">
import NavBar from '@/components/header/navbar/NavBar.vue';
import { Layout } from 'ant-design-vue';
</script>
