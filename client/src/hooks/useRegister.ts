import { register } from '@/api';
import { useCommit } from '@/store/helpers';
import {
  MutationKeys,
  MutationModalTypes,
  type IHandleRegister,
  type MutationsModal,
  type Register
} from '@/types';
import { useMutation } from '@tanstack/vue-query';
import { store } from '@/store';

export const useRegister = () => {
  const { mutate, data, error, isSuccess } = useMutation({
    mutationKey: [MutationKeys.REGISTER],
    mutationFn: (user: Register) => register(user),
    retry: false
  });

  const { commit } = useCommit<MutationsModal>({
    store,
    namespace: 'modal'
  });

  const handleRegister = ({ formFields }: IHandleRegister) => {
    mutate(formFields, {
      onSuccess: () => {
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
    handleRegister,
    data,
    error,
    isSuccess
  };
};
