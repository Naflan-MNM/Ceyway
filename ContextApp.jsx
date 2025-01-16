import React from 'react';
import { CeywayContextProvider } from './context/CeywayContext';
import App from './App';

const MainApp = () => (
    <CeywayContextProvider>
        <App />
    </CeywayContextProvider>
);

export default MainApp;
