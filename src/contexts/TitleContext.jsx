import React, {useState, useEffect, createContext} from 'react'

export const TitleContext = createContext()

function TitleProvider({children}) {
  const [title, setTitle] = useState("")

  return (
    <TitleContext.Provider value={{
      title,
      setTitle
    }}>
      {children}
    </TitleContext.Provider>
  )
}

export default TitleProvider