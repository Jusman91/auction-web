<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ClockCircleTwoTone } from '@ant-design/icons-vue';
import type { Dayjs } from 'dayjs';
import { computed } from 'vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  handleDateRange,
  handleEndTime,
  handleStartTime
} from '@/handlers/item';
import type { TableName } from '@/types/table';
import { Button } from '../elements';
import { disabledTime } from '@/lib/utils/disabledTime';
import { DatePicker, RangePicker, Tooltip } from 'ant-design-vue';

interface ITableFilterByDate {
  tableName: TableName | undefined;
}
const { tableName } = defineProps<ITableFilterByDate>();

const router = useRouter();
const route = useRoute();
const toggleFilterByDate = ref(false);
const startTime = ref<Dayjs | undefined>(undefined);
const endTime = ref<Dayjs | undefined>(undefined);
const dateRange = ref<[Dayjs, Dayjs] | undefined>(undefined);

const disabledStartTime = computed(
  () => !!endTime.value || !!dateRange.value
);
const disabledEndTime = computed(
  () => !!startTime.value || !!dateRange.value
);
const disabledRangeTime = computed(
  () => !!startTime.value || !!endTime.value
);

const handleSubmit = () => {
  if (startTime.value !== undefined) {
    handleStartTime(startTime.value, router, route);
  }
  if (endTime.value !== undefined) {
    handleEndTime(endTime.value, router, route);
  }
  if (dateRange.value !== undefined) {
    handleDateRange(dateRange.value, router, route);
  }
};

const resetTime = () => {
  const {
    startTime: _startTime,
    endTime: _endTime,
    dateRange: _dateRange,
    ...restQuery
  } = route.query;
  router.push({
    query: { ...restQuery }
  });
  startTime.value = undefined;
  endTime.value = undefined;
  dateRange.value = undefined;
};
</script>

<template>
  <Tooltip title="Filter by date">
    <ClockCircleTwoTone
      v-if="tableName === 'table-item'"
      class="text-xl leading-[0] cursor-pointer"
      @click="toggleFilterByDate = !toggleFilterByDate"
    />
  </Tooltip>

  <div
    :class="
      toggleFilterByDate ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
    "
    class="absolute right-0 top-8 z-10 w-96 grid transition-[grid-template-rows] duration-150 px-6 bg-slate-200 rounded-xl"
  >
    <div class="flex flex-col gap-4 overflow-hidden">
      <div class="pt-2">
        <h3>Filter by start time</h3>
        <DatePicker
          show-time
          v-model:value="startTime"
          placeholder="Input Time"
          :disabled="disabledStartTime"
          v-bind:allow-clear="false"
        />
      </div>
      <div>
        <h3>Filter by end time</h3>
        <DatePicker
          show-time
          v-model:value="endTime"
          :disabled-time="disabledTime"
          placeholder="Input Time"
          :disabled="disabledEndTime"
          v-bind:allow-clear="false"
        />
      </div>
      <div>
        <h3>Filter by range time</h3>
        <RangePicker
          show-time
          v-bind:allow-clear="false"
          :disabled="disabledRangeTime"
          :disabled-time="disabledTime"
          v-model:value="dateRange"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['Start Time', 'End Time']"
        />
      </div>
      <div class="flex items-center gap-2 pb-2">
        <Button
          size="small"
          @click="resetTime"
          class="hover:bg-yellow-300 hover:!text-white duration-150"
          >Reset</Button
        >
        <Button type="primary" size="small" @click="handleSubmit"
          >Filter</Button
        >
      </div>
    </div>
  </div>
</template>
