import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/authContext.jsx'
import { ApplicationProvider } from './context/applicationContext.jsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ApplicationProvider>
          <App />
        </ApplicationProvider>
      </QueryClientProvider>
    </StrictMode>
  </AuthProvider>
  ,
)
