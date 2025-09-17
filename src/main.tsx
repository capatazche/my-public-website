import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";

import './index.css'
import App from './App.tsx'
import HomePage from "./pages/HomePage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
