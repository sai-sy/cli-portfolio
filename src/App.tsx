import { useState } from 'react'
import './App.css'
import Load from './views/Load.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Load />
    </>
  )
}

export default App
