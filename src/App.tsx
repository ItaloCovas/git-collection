import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import './index.scss';
import Fallback from './pages/Fallback';

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<Fallback />}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
