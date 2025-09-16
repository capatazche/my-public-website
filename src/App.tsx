import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-screen">
      <header
        className="
            sticky top z-50
            bg-bg-nav
            backdrop-blur-sm
            border-b border-tertiary
            p-4"
      >
          <Navbar />
      </header>

      <main className="container mx-auto p-4 ">
          <h1>Welcome to my portfolio</h1>
          <div className="flex flex-row max-w-max mx-auto">
              <a href="https://vite.dev" target="_blank" className="px-1">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank" className="px-1">
                  <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
              </button>
              <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
              </p>
          </div>
          <p className="text-tertiary">
              Click on the Vite and React logos to learn more
          </p>
      </main>
    </div>
  )
}

export default App
