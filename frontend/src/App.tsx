import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from '@/layout/PublicLayout';
import AuthLayout from '@/layout/AuthLayout';

import HomePage from '@/routes/HomePage';
import Login from '@/routes/Login';
import Signup from '@/routes/Signup';

import ProtectedRoutes from '@/layout/ProtectedRoutes';
import MainLayout from '@/layout/MainLayout';
import Generate from '@/components/Generate';
import Dashboard from '@/routes/Dashboard';
import EditPage from '@/routes/EditPage';
import MockLoadPage from './routes/MockLoadPage';
import MockInterviewPage from './routes/MockInterviewPage';
import AboutPage from './routes/AboutPage';
import ServicePage from './routes/ServicePage';
import ContactPage from './routes/ContactPage';
import Feedback  from './routes/Feedback';


const App = () => {
  return (
    <Router>
      <Routes>

        { /* public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        { /* authentication layout */}
        <Route element={<AuthLayout />}>
          <Route path='/login/*' element={<Login />} />
          <Route path='/signup/*' element={<Signup />} />
        </Route>


        { /* protected routes */}
        <Route element={
          <ProtectedRoutes>
            <MainLayout />
          </ProtectedRoutes>
        }>
          <Route element={<Generate />} path='/generate' >
            <Route index element={<Dashboard />} />
            <Route path=':interviewId' element={<EditPage />} />
            <Route path='interview/:interviewId' element={<MockLoadPage />} />
            <Route path='interview/:interviewId/start' element={<MockInterviewPage />} />

            <Route path='feedback/:interviewId' element={<Feedback />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App