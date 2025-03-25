import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { MantineProvider } from '@mantine/core';
import App from './App.jsx';
import './index.css';
import '@mantine/core/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)
