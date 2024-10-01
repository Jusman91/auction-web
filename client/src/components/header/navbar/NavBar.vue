<script setup lang="ts">
import { Logo } from '@/components/elements';
import NavList from './NavList.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { PROFILEPIC } from '@/assets/img';
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav
    class="sticky top-0 h-16 flex items-center justify-between px-6 lg:px-12 z-[999] shadow-md"
  >
    <div class="w-full md:w-fit flex items-center gap-8">
      <Logo />
      <NavList />
    </div>
    <div class="flex items-center gap-2">
      <SearchOutlined />
      <RouterLink to="/dashboard" class="cursor-pointer">
        <img
          :src="PROFILEPIC"
          alt="Profile Picture"
          loading="lazy"
          class="w-8 h-8 object-cover"
        />
      </RouterLink>
    </div>
  </nav>
</template>
