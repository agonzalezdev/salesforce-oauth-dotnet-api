import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StyledEngineProvider } from '@mui/material/styles';


ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
