import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { RootStoreProvider } from './context/RootStoreContext';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <RootStoreProvider>
      <App />
  </RootStoreProvider>
);
