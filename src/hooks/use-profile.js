import { useSelector } from 'react-redux'

export function useProfile() {
  const { email, username, image, bio } = useSelector((state) => state.user)
  // console.log(email, username, image, bio)
  return {
    email,
    username,
    image,
    bio,
  }
}
