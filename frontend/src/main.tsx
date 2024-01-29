import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";
import { SnackbarProvider } from 'notistack'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <SnackbarProvider
              maxSnack={5}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
              }}
          >
          <GlobalProvider>
            <App />
          </GlobalProvider>
          </SnackbarProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
