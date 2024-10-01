import type { Date } from '@/types';
import type { Dayjs } from 'dayjs';
import type {
  RouteLocationNormalizedLoaded,
  Router
} from 'vue-router';

export const handleEndTime = (
  date: Date,
  router: Router,
  route: RouteLocationNormalizedLoaded
) => {
  if (date) {
    const endTimeString = (date as Dayjs)
      ?.endOf('day')
      ?.format('YYYY-MM-DD HH:mm:ss');
    if (endTimeString) {
      router.push({
        query: {
          ...route.query,
          endTime: endTimeString
        }
      });
    } else {
      const { endTime, ...restQuery } = route.query;
      router.push({
        query: {
          ...restQuery
        }
      });
    }
  }
};
