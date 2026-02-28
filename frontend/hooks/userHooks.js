import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({
    username: null,
    fullName: null,
    imageUrl: null,
    email: null,
    isLoaded: false
  })

  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        setCurrentUser({
          username: user.username,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
          email: user.primaryEmailAddress?.emailAddress || "",
          isLoaded: true
        })
      } else {
        setCurrentUser({
          username: null,
          fullName: null,
          imageUrl: null,
          email: null,
          isLoaded: true
        })
      }
    }
  }, [user, isLoaded])

  return currentUser
}