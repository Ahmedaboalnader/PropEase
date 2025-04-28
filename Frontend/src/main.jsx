import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { MantineProvider } from '@mantine/core';
import App from './App.jsx';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';  // Add this line
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <Notifications position="top-right" zIndex={2077} />
        <Provider store={store}>
          <App />
        </Provider>
    </MantineProvider>
  </StrictMode>,
)
