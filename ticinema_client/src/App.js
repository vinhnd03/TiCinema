import './App.css';
import AboutPage from './pages/user/AboutPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/user/HomePage';
import SeatSelectionPage from './pages/user/SeatSelectionPage';
import SeatLayout from './pages/TestPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLayout from './components/layout/AdminLayout';
import DashBoard from './pages/admin/Dashboard';
import Preloader from './components/ui/Preloader';
import { useEffect, useState } from 'react';
import AdminRoute from './routes/AdminRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';

function App() {

  return (

    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/seat-select' element={
          <ProtectedRoute>
            <SeatSelectionPage />
          </ProtectedRoute>
        } />
        <Route path='/test' element={<SeatLayout />} />
        <Route path='/login' element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        } />
        <Route path='/register' element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        } />
      </Route>
      <Route path='/admin' element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<DashBoard />} />
        {/* <Route path='movies' element={<MoviesPage />} /> */}
        {/* <Route path='/showtimes' /> } */}
      </Route>
    </Routes>
  );
}

export default App;
