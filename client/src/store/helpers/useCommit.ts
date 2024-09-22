import type { HelpersStore } from '@/types';

export function useCommit<
  T extends Record<string, (...args: any) => any>
>({ store, namespace }: HelpersStore) {
  return {
    commit: <K extends keyof T>({
      type,
      payload
    }: {
      type: K;
      payload?: Parameters<T[K]>[1];
    }) => {
      return store.commit(
        `${namespace}/${type as string}`,
        payload
      );
    }
  };
}
