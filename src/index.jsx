import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import "./app/shared/i18n";
import App from './app/';
import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter forceRefresh={false}>
        <App />
    </BrowserRouter>
);
