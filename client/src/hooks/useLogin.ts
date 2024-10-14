import { login } from '@/api';
import { saveAccessToken } from '@/lib/utils';
import {
  MutationKeys,
  MutationModalTypes,
  type IHandleLogin,
  type Login,
  type MutationsModal
} from '@/types';
import { useMutation } from '@tanstack/vue-query';
import { useLoggedIn } from './useLoggedIn';
import { store } from '@/store';
import { useCommit } from '@/store/helpers';

export const useLogin = () => {
  const { mutate, data, error, isSuccess } = useMutation({
    mutationKey: [MutationKeys.LOGIN],
    mutationFn: (user: Login) => login(user),
    retry: false
  });

  const { commit } = useCommit<MutationsModal>({
    store,
    namespace: 'modal'
  });

  const { handleLoggedIn } = useLoggedIn();
  const handleLogin = ({ formFields }: IHandleLogin) => {
    mutate(formFields, {
      onSuccess: async (res) => {
        console.log(res);
        saveAccessToken(res?.accessToken ?? '');
        await handleLoggedIn();
        commit({
          type: MutationModalTypes.OPEN_MODAL,
          payload: 'auth'
        });
      },
      onError: (error) => {
        console.log(error);
        commit({
          type: MutationModalTypes.OPEN_MODAL,
          payload: 'auth'
        });
      }
    });
  };

  return {
    handleLogin,
    data,
    error,
    isSuccess
  };
};
