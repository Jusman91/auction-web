<script setup lang="ts">
import { Button, Image } from '@/components/elements';
import { useFetchItem } from '@/hooks';
import { getCollection } from '@/lib/realm/getCollection';
import { ObjectId } from '@/lib/realm/objectId';
import { Form, InputNumber, message } from 'ant-design-vue';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

// Retrieve the slug from route params
const route = useRoute();
const slug = route.params.slug as string;

// const data = ref<any>(null);
const currentBid = ref<number>(0);
const bidInput = ref<number | undefined>(0);
const { data } = useFetchItem(slug);
const dataItem = computed(() => (data.value ? data.value : null));
console.log(dataItem.value);
// Fetches the item data from MongoDB
// const fetchItem = async (slug: string) => {
//   try {
//     const itemCollection = await getCollection(
//       'auction',
//       'AuctionItem'
//     );
//     data.value = await itemCollection.findOne({ slug });
//     if (data.value) {
//       currentBid.value =
//         data.value.currentBid ?? data.value.startingBid;
//       bidInput.value = currentBid.value + 10000;
//       console.log(
//         `Fetched item: ${data.value.name} with currentBid: ${currentBid.value}`
//       );
//     } else {
//       console.error('Item not found');
//       message.error('Item tidak ditemukan');
//     }
//   } catch (error) {
//     console.error('Error fetching item:', error);
//     message.error('Terjadi kesalahan saat mengambil data item');
//   }
// };

// Watches for changes in the MongoDB collection
const getCollectionWatcher = async (ids: string[]) => {
  if (!ids.length) return;

  const objectIds = ids.map((id) => new ObjectId(id));
  const collection = await getCollection('auction', 'AuctionItem');
  if (!collection) return;

  const changeStream = collection.watch({ ids: objectIds });
  console.log(`Watcher started for IDs: ${ids.join(', ')}`);

  try {
    for await (const event of changeStream) {
      if (event.operationType === 'update') {
        const updatedFields = event.updateDescription.updatedFields;
        console.log('Change detected:', event);

        // Update the UI when the `currentBid` is updated
        if (
          dataItem.value &&
          dataItem.value._id.toString() ===
            event.documentKey._id.toString()
        ) {
          if (updatedFields.currentBid) {
            currentBid.value = updatedFields.currentBid;
            // bidInput.value = currentBid.value + 10000;
            console.log(`currentBid updated to: ${currentBid.value}`);
            message.info(
              `Bid diperbarui menjadi: ${currentBid.value}`
            );
          }
        }
      }
    }
  } catch (err) {
    console.error('Error in collection watcher:', err);
    message.error('Terjadi kesalahan dalam watcher');
  }
};

// Function to place a bid
const placeBid = async () => {
  if (!bidInput.value || bidInput.value < currentBid.value + 10000) {
    console.error('Bid must be higher than the current bid!');
    message.error('Bid harus lebih tinggi dari bid saat ini!');
    return;
  }

  try {
    const itemCollection = await getCollection(
      'auction',
      'AuctionItem'
    );
    const updateResult = await itemCollection.updateOne(
      { slug },
      { $set: { currentBid: bidInput.value } }
    );
    if (updateResult.matchedCount > 0) {
      console.log('Bid placed successfully!');
      message.success('Bid berhasil dipasang!');
      currentBid.value = bidInput.value;
    } else {
      console.error('Failed to place bid. Item not found.');
      message.error('Gagal memasang bid. Item tidak ditemukan.');
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    message.error('Terjadi kesalahan saat memasang bid.');
  }
};

// On component mount, fetch the item and start the watcher
onMounted(() => {
  watchEffect(() => {
    if (dataItem.value) {
      currentBid.value =
        dataItem.value.currentBid ?? dataItem.value.startingBid;
      bidInput.value = currentBid.value + 10000;

      // Periksa apakah _id sudah tersedia sebelum memulai watcher
      if (dataItem.value._id) {
        getCollectionWatcher([dataItem.value._id.toString()]);
      } else {
        console.error('Data tidak memiliki _id');
      }
    }
  });
});
</script>

<template>
  <section class="w-full h-screen p-8">
    <div class="flex justify-between gap-4 p-8">
      <div class="w-1/2">
        <Image
          :src="dataItem?.thumbnail"
          :alt="dataItem?.name"
          class="rounded-2xl"
        />
      </div>
      <div class="w-1/2 leading-[80px]">
        <h1 class="text-4xl font-bold">{{ dataItem?.name }}</h1>
        <p>{{ dataItem?.description }}</p>
        <div>
          <p>Start Time: {{ dataItem?.startTime }}</p>
          <p>End Time: {{ dataItem?.endTime }}</p>
        </div>
        <div>
          <p>Starting Bid: {{ dataItem?.startingBid }}</p>
          <p>Current Bid: {{ currentBid }}</p>
        </div>
        <Form class="flex gap-2 items-center">
          <InputNumber
            size="large"
            class="w-full"
            v-model:value="bidInput"
            :min="currentBid + 10000"
            :step="10000"
          />
          <Button
            type="primary"
            size="large"
            @click="bidInput = currentBid + 10000"
          >
            Reset
          </Button>
          <Button type="primary" size="large" @click="placeBid">
            Bid
          </Button>
        </Form>
      </div>
    </div>
  </section>
</template>
