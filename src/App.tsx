import './App.css';
import { ReactNode } from 'react';
import { Route, RouteProps, BrowserRouter, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';

interface AppCustomRouteProps {
  component: ReactNode;
  canActivate?: boolean;
  children?: AppRoute[];
}

type AppRoute = Omit<RouteProps, 'children'> & AppCustomRouteProps;

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
