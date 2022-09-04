
import axios from "axios";
import {useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import './App.css'

type Hello = {
  greeting: string;
  content: string;
  count: number;
}

async function getHello() : Promise<Hello> {
  try {
    const response = await axios.get<Hello>("http://localhost:3000/hello")
    return response.data
  } catch (error) {
    console.log("get error")
    console.log(error)
    return {greeting: "", content: "", count: 0}
  }
}

async function postHello(hello: Hello) : Promise<Hello> {
  try {
    const config = {
      headers: {
        'Content-Type': 'text/plain',
      }
    }
    const response = await axios.post<Hello>(
      "http://localhost:3000/hello"
      , JSON.stringify(hello)
      , config )
    // console.log(response)
    return response.data
  } catch (error) {
    console.log("post error")
    console.log(error)
    return {greeting: "", content: "", count: 0}
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [hello, setHello] = useState({greeting: "", content: "", count: 0})

  useEffect( () => {
    const f = async () => {
        const new_hello = {greeting: "Hello", content: "World", count: count}
        const res_post = await postHello(new_hello)
        // const res_get = await getHello()
        console.log(res_post)
        setHello(res_post)
    }
    f()
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
          count is {count} response is {hello.count}
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
