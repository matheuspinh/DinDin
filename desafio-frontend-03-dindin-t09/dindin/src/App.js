import { getItem } from './utils/storage';
import './App.css';
import { BrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';
import LogIn from './pages/login';
import SignUp from './pages/signup';
import Main from './pages/main'

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LogIn />} />
          <Route path='/sign-up' element={<SignUp />} />

          <Route element={<ProtectedRoutes redirectTo="/login" />}>
            <Route path='/' element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App