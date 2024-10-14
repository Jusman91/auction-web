import type { HelpersStore } from '@/types';

export function useDispatch<
  T extends Record<string, (...args: any) => any>
>({ store, namespace }: HelpersStore) {
  return {
    dispatch: <K extends keyof T>({
      type,
      payload
    }: {
      type: K;
      payload?: Parameters<T[K]>[1];
    }) => {
      return store.dispatch(
        `${namespace}/${type as string}`,
        payload
      );
    }
  };
}
