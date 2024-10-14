<script setup lang="ts">
interface IImageProps {
  src: string | undefined;
  alt: string | undefined;
}
const { src, alt } = defineProps<IImageProps>();
</script>

<template>
  <img
    loading="lazy"
    :src="src"
    :alt="alt"
    :class="['_ w-full h-full object-cover', $attrs.class]"
  />
</template>
