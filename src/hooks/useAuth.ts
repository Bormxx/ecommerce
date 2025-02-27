import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/auth';

const checkAuth = async ( isAuth: boolean ) => {

  if (!isAuth) {
    throw new Error('Пользователь не авторизирован');
  }

  const response = await fetch('/api/findUser');

  if (!response.ok) {
    throw new Error('Ошибка авторизации');
  }

  return response.json();
};

export const useAuth = () => {
  const {isAuthenticated} = useUserStore();

  const { isError, data, isSuccess } = useQuery(
    { 
      queryKey: [isAuthenticated],
      queryFn: () => checkAuth(isAuthenticated),
      enabled: isAuthenticated,
      retry: false,
    },
  );

  return { isError, data, isSuccess };
};