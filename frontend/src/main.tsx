// src/main.tsx

// ✅ React imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ✅ App import
import App from './App';

// ✅ CSS import
import './index.css'; // old CSS
import './index.css'; // new CSS if you want both

// ✅ Render the root
const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
