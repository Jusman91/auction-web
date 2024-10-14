import type { Dates } from '@/types';
import type { Dayjs } from 'dayjs';
import {
  useRoute,
  useRouter,
  type RouteLocationNormalizedLoaded,
  type Router
} from 'vue-router';

export const handleDateRange = (
  dates: Dates,
  router: Router,
  route: RouteLocationNormalizedLoaded
) => {
  // Cek apakah kedua tanggal (startTime dan endTime) sudah terisi
  if (dates && dates[0] && dates[1]) {
    const [startTime, endTime] = dates;

    const startTimeString =
      (startTime as Dayjs)
        ?.startOf('day')
        ?.format('YYYY-MM-DD HH:mm:ss') ?? startTime;
    const endTimeString =
      (endTime as Dayjs)
        ?.endOf('day')
        ?.format('YYYY-MM-DD HH:mm:ss') ?? endTime;

    // Hanya lakukan fetch atau navigasi jika endTime terisi
    if (startTimeString && endTimeString) {
      router.push({
        query: {
          ...route.query,
          page: 1,
          limit: 10,
          startTime: startTimeString,
          endTime: endTimeString
        }
      });
    } else {
      // Jika startTime dan endTime belum terisi, hapus startTime dan endTime dari query
      const { startTime, endTime, ...restQuery } = route.query;
      router.push({
        query: {
          ...restQuery
        }
      });
    }
  }
};
