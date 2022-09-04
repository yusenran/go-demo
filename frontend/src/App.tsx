
import axios from "axios";
import {useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [response, setResponse] = useState("")

  useEffect( () => {
    const f = async () => {
      const response = await axios.get<string>("http://localhost:3000")
        .then( response => {
          setResponse(response.data)
          return response.data
        })
        .catch( error => {
          console.log(error.data)
          return ""
        })
        return response
    }
    // console.log(f())
  }),[count]

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count} response is {response}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
