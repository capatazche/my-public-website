import { Outlet } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar.tsx";

function App() {
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
          <Outlet />
      </main>
    </div>
  )
}

export default App
