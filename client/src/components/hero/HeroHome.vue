<script setup lang="ts">
import { HERO_HOME } from '@/assets/img';
import { Input } from 'ant-design-vue';
import { ref } from 'vue';
import CustomTransition from '../transition/CustomTransition.vue';
const value = ref<string>('');

const onSearch = (searchValue: string) => {
  console.log('use value', searchValue);
  console.log('or use this.value', value.value);
};
</script>

<template>
  <div
    class="h-[calc(100vh-64px)] bg-primary-20/70 flex flex-col md:flex-row justify-between items-center gap-x-16 px-16"
  >
    <div class="w-full md:w-1/2 text-white flex flex-col gap-4">
      <CustomTransition name="slide-fade" appear>
        <h1 class="text-3xl font-bold">
          Build, sell & collect digital items.
        </h1>
      </CustomTransition>
      <CustomTransition name="slide-fade" appear>
        <p class="leading-7">
          Nulla facilisi. Maecenas ac tellus ut ligula interdum
          convallis. Nullam dapibus on erat in dolor posuere, none
          hendrerit lectus ornare. Suspendisse sit amet turpina
          sagittis, ultrices dui et, aliquam urna.
        </p>
      </CustomTransition>
      <CustomTransition name="bounce" appear>
        <Input.Search
          v-model:value="value"
          placeholder="input search text"
          enter-button="Search"
          size="large"
          @search="onSearch"
        />
      </CustomTransition>
    </div>
    <div class="w-full md:w-1/2">
      <CustomTransition name="scale" appear>
        <img
          :src="HERO_HOME"
          alt="Hero"
          class="w-full h-full object-cover"
        />
      </CustomTransition>
    </div>
  </div>
</template>
