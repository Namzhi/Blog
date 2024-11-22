import { useSelector } from 'react-redux'

export function useAuth() {
  const { email, token, id, isAuth, loading, errorMessage } = useSelector((state) => state.user)

  return {
    isAuth: !!token,
    isLoading: loading,
    errorMessage,
    email,
    token,
    id,
  }
}
