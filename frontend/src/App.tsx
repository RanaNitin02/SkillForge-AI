import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from '@/layout/PublicLayout';
import AuthLayout from '@/layout/AuthLayout';

import HomePage from '@/routes/HomePage';
import Login from '@/routes/Login';
import Signup from '@/routes/Signup';

import ProtectedRoutes from '@/layout/ProtectedRoutes';
import MainLayout from '@/layout/MainLayout';

const App = () => {
  return (
    <Router>
      <Routes>

        { /* public routes */ }
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>
 
        { /* authentication layout */ }
        <Route element={<AuthLayout />}>
          <Route path='/login/*' element={<Login />} />
          <Route path='/signup/*' element={<Signup />} />
        </Route>


        { /* protected routes */ }
        <Route element={
          <ProtectedRoutes>
            <MainLayout />
          </ProtectedRoutes>
        }>
        </Route>

      </Routes>
    </Router>
  )
}

export default App