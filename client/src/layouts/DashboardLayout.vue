<script setup lang="ts">
import { PROFILEPIC } from '@/assets/img';
import ButtonCollapsedSideBar from '@/components/header/navbar/ButtonCollapsedSideBar.vue';
import SideBarDashboard from '@/components/header/navbar/SideBarDashboard.vue';
import type { RootState } from '@/types';
import { Layout } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
const { Sider, Content } = Layout;
const store = useStore<RootState>();
const collapsed = ref<boolean>(false);
const user = computed(() => store.state.user.user);
const profilePic = computed(() =>
  user.value?.profilePic ? user.value?.profilePic : PROFILEPIC
);
console.log(user.value);
</script>

<template>
  <Layout class="relative w-full h-screen">
    <Sider
      class="!bg-inherit"
      width="250"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <ButtonCollapsedSideBar
        :collapsed="collapsed"
        @toggle="collapsed = !collapsed"
      />
      <div class="flex flex-col items-center justify-center py-10">
        <img
          :class="[collapsed ? 'w-10 h-10' : 'w-20 h-20']"
          class="w-16 h-16 object-cover"
          :src="profilePic"
          alt="Profile Picture"
        />
        <p class="capitalize" v-if="!collapsed">{{ user?.name }}</p>
        <p v-if="!collapsed">{{ user?.email }}</p>
      </div>
      <SideBarDashboard />
    </Sider>
    <Content class="p-4">
      <RouterView />
    </Content>
  </Layout>
</template>

<style scoped></style>
