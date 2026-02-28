import React from 'react'
import { useCurrentUser } from '../../hooks/userHooks'

const Profile = () => {

    const {isLoaded,email,fullName,imageUrl} = useCurrentUser()
  return (
    <div>
        <img src={imageUrl} height={100}/>
        <p>{email}</p>
        <p>{fullName}</p>
    </div>
  )
}

export default Profile