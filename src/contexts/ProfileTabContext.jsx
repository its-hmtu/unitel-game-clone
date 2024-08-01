import React from 'react'

export const ProfileTabContext = React.createContext()

function ProfileTabProvider({children}) {
  const [tab, setTab] = React.useState(0)

  return (
    <ProfileTabContext.Provider value={{tab, setTab}}>
      {children}
    </ProfileTabContext.Provider>
  )
}

export default ProfileTabProvider