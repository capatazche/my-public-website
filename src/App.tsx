import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import {ThemeProvider} from "./contexts/ThemeContext.tsx";

import './App.css'

function App() {
  return (
    <div className="h-screen w-screen">
      <ThemeProvider>
          <header
            className={`
                sticky top z-50
                bg-bg-nav
                backdrop-blur-sm
                border-b border-tertiary
                p-4  
            `}
          >
              <Navbar />
          </header>

          <main className="container mx-auto p-4 ">
              <Outlet />
          </main>
      </ThemeProvider>
    </div>
  )
}

export default App
