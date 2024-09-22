import { loggedIn } from '@/api';
import { saveUser } from '@/lib/utils';
import { QueryKeys } from '@/types';
import { useQuery } from '@tanstack/vue-query';

export const useLoggedIn = () => {
  const { refetch } = useQuery({
    queryKey: [QueryKeys.LOGGEDIN],
    queryFn: loggedIn,
    enabled: false,
    retry: false
  });

  const handleLoggedIn = async () => {
    const { data: user } = await refetch();
    try {
      if (user) {
        saveUser({ user });
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  return {
    handleLoggedIn
  };
};
