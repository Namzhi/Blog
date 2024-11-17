import { useSelector } from 'react-redux'

export function useAuth() {
  const { email, token, id, isAuth, loading, errorMessage } = useSelector((state) => state.user)
  // console.log(token)

  return {
    isAuth: !!token,
    isLoading: loading,
    errorMessage,
    email,
    token,
    id,
  }
}
