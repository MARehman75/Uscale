import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Missing from './Missing';
import Dashboard from './paths/Dashboard/Dashboard';
import SocialAc from './paths/Dashboard/SocialAc';
import CalenderView from './paths/Dashboard/CalenderView';
import LandingPage from './paths/homepage/LandingPage';
import RequireAuth from './RequireAuth';
import Unauthorized from './Unauthorized';
import ResetPassword from './utils/modals/ResetPassword';
import ChangePassword from './paths/register/ChangePassword';
import Profile from './paths/register/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*<Route path="/" element={<Protected Component={Home}/>} />*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/SocialAc" element={<SocialAc />} />
          <Route path="/CalenderView" element={<CalenderView />} />

          {/*Authorized*/}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/*error pages*/}

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
