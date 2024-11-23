import { useSelector } from 'react-redux'
import { useMemo } from 'react'

export function useProfile() {
  const authState = useSelector((state) => state.user)

  return useMemo(
    () => ({
      isAuth: !!authState.token,
      isLoading: authState.loading,
      error: authState.error,
      errorMessage: authState.errorMessage,
      email: authState.email,
      token: authState.token,
      id: authState.id,
      username: authState.username,
      image: authState.image,
      bio: authState.bio,
      isSave: authState.isSave,
    }),
    [authState]
  )
}
