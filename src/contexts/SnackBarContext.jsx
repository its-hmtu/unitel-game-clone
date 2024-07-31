import React, { createContext, useState } from 'react'

export const SnackBarContext = createContext();

const SnackBarProvider = ({children}) => {
  const [snackBar, setSnackBar] = useState({
    open: false,
    message: '',
    severity: ''
  })

  return (
    <SnackBarContext.Provider value={{snackBar, setSnackBar}}>
      {children}
    </SnackBarContext.Provider>
  )
}

export default SnackBarProvider