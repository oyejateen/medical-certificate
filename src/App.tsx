import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Form = lazy(() => import('./pages/Form'));
const Certificate = lazy(() => import('./pages/Certificate'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/certificate" element={<Certificate />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
