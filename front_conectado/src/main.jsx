import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login          from './pages/Login.jsx'
import Registro       from './pages/Registro.jsx'
import Home           from './pages/Home.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

const router = createBrowserRouter([
  { path: '/',                element: <Login /> },
  { path: '/registro',        element: <Registro /> },
  { path: '/paginaprincipal', element: <Home /> },
  { path: '/admin',           element: <AdminDashboard /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
