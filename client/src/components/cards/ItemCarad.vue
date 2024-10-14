<script setup lang="ts">
import type { IItem } from '@/types';
import { Image } from '../elements';
import { DollarCircleOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { formatTimeCountdown } from '@/lib/utils/formatTimeCountdown';
import { onMounted, ref } from 'vue';
import { onUnmounted } from 'vue';
interface IItemCardProps {
  item: IItem;
}
const { item } = defineProps<IItemCardProps>();
const timeUntilStart = ref('');
const timeLeft = ref('');
const intervalId = ref<number | null>(null);
const startTime = dayjs(item.startTime).toDate();
const endTime = dayjs(item.endTime).toDate();

const updateCountdown = () => {
  const { timeUntilStart: tUntilStart, timeLeft: tLeft } =
    formatTimeCountdown(startTime, endTime);
  timeUntilStart.value = tUntilStart;
  timeLeft.value = tLeft;
};

onMounted(() => {
  intervalId.value = setInterval(updateCountdown, 1000); // Perbarui setiap detik
  updateCountdown(); // Panggil fungsi untuk inisialisasi pertama kali
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value); // Bersihkan interval saat komponen dihapus
  }
});
</script>

<template>
  <div class="bg-white rounded-xl p-3">
    <div class="h-56 relative overflow-hidden">
      <RouterLink :to="`/items/${item.slug}`">
        <Image :src="item.thumbnail" :alt="item.name" />
      </RouterLink>
    </div>
    <div class="flex items-center justify-between">
      <div class="leading-5">
        <h3 class="text-lg font-semibold">{{ item.name }}</h3>
        <p><strong>Starting Bid:</strong> {{ item.startingBid }}</p>
        <p
          v-if="
            timeUntilStart !== 'Auction Started' &&
            timeLeft === 'Auction Not Started'
          "
        >
          <strong>Starts In:</strong> {{ timeUntilStart }}
        </p>
        <p v-if="timeUntilStart === 'Auction Started'">
          <strong>Ends In:</strong> {{ timeLeft }}
        </p>
        <p v-if="timeLeft === 'Auction Ended'">
          {{ timeLeft }}
        </p>
        <p>{{ item.currentBid }}</p>
      </div>
      <DollarCircleOutlined
        class="text-3xl text-green-400 leading-[0]"
      />
    </div>
  </div>
</template>
