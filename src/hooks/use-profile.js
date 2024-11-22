import { useSelector } from 'react-redux'

export function useProfile() {
  const { email, username, image, bio, isSave } = useSelector((state) => state.user)
  return {
    email,
    username,
    image,
    bio,
    isSave,
  }
}
