import { useState, useEffect } from 'react'
import './App.css';
import Main from "./components/Main"
import { ethers } from "ethers";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Main/>
      
    </>
  )
}

export default App
