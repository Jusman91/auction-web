<script setup lang="ts">
import ItemCarad from '@/components/cards/ItemCarad.vue';
import HeroHome from '@/components/hero/HeroHome.vue';
import { useFetchItems } from '@/hooks';
import { useSearchParamsQuery } from '@/hooks/useSearchParams';
import { getCollection } from '@/lib/realm/getCollection';
import { useDispatch } from '@/store/helpers';
import {
  ActionItemTypes,
  type ActionItem,
  type IItem,
  type RootState
} from '@/types';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const { queryParams } = useSearchParamsQuery();
const store = useStore<RootState>();
const { dispatch } = useDispatch<ActionItem>({
  store,
  namespace: 'item'
});
// const items = computed(() => store.state.item.items as IItem[]);
const { data: items, isLoading } = useFetchItems(queryParams);
// onMounted(async () => {
//   await dispatch({
//     type: ActionItemTypes.GET_ITEMS,
//     payload: queryParams
//   });
// });
</script>

<template>
  <section class="w-full">
    <HeroHome />
    <div class="">
      <h1>Featured Auctions</h1>
      <!-- <h1>{{ data }}</h1>
      <h1>{{ isLoading }}</h1> -->
      <div
        class="grid grid-cols-1 lg:grid-cols-4 gap-8 px-6 lg:px-14 py-8 lg:py-16"
      >
        <ItemCarad
          v-for="item in items?.items"
          :key="item._id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>
