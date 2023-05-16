import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Repo = React.lazy(() => import('./pages/Repo'));

export const Router: React.FC = (): any => {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/repositories/:repository" Component={Repo} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
