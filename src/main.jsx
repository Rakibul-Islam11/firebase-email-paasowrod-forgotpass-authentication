import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginForm from './ALL-COMPO/LoginForm.jsx'
import RegisterForm from './ALL-COMPO/RegisterForm.jsx'
import VerifyWarning from './ALL-COMPO/VerifyWarning.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <LoginForm></LoginForm>
      },
      {
        path: '/register',
        element: <RegisterForm></RegisterForm>
      },
      {
        path: '/VerifyWarning',
        element: <VerifyWarning></VerifyWarning>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
