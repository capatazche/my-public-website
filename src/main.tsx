import {ReactNode, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import App from './App.tsx'
import HomePage from "./pages/HomePage.tsx";
import ResumePage from "./pages/ResumePage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App /> as ReactNode,
        children: [
            {
                index: true,
                element: <HomePage/> as ReactNode,
            },
            {
                path: 'resume',
                element: <ResumePage /> as ReactNode,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
  (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  ) as ReactNode,
)
