import type { Date } from '@/types';
import type { Dayjs } from 'dayjs';
import type {
  RouteLocationNormalizedLoaded,
  Router
} from 'vue-router';

export const handleStartTime = (
  date: Date,
  router: Router,
  route: RouteLocationNormalizedLoaded
) => {
  if (date) {
    const startTimeString = (date as Dayjs)
      ?.startOf('day')
      ?.format('YYYY-MM-DD HH:mm:ss');
    if (startTimeString) {
      router.push({
        query: {
          ...route.query,
          startTime: startTimeString
        }
      });
    }
  } else {
    const { startTime, ...restQuery } = route.query;
    router.push({
      query: {
        ...restQuery
      }
    });
  }
};
