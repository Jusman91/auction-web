<script setup lang="ts">
import { defineProps } from 'vue';

// Props untuk menentukan nama transisi
const props = defineProps({
  name: {
    type: String,
    default: 'fade'
  },
  appear: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <!-- Menggunakan v-bind="$attrs" untuk meneruskan semua props -->
  <Transition :name="name" :appear="appear" v-bind="$attrs">
    <slot></slot>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-enter-active:nth-child(2) {
  transition-delay: 0.5s;
}

.bounce-enter-active {
  animation: bounce-in 1s;
  animation-delay: 1s;
  opacity: 0;
}
.bounce-leave-active {
  animation-delay: 1s;

  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
/* Animasi scale saat enter */
.scale-enter-active {
  animation: scaleIn 0.5s ease forwards;
}

/* Animasi scale saat leave */
.scale-leave-active {
  animation: scaleOut 0.5s ease forwards;
}

/* Keyframes untuk scale in */
@keyframes scaleIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Keyframes untuk scale out */
@keyframes scaleOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
