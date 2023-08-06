import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './app/shared/store'

import App from './app/';
import "./app/shared/i18n";
import './index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter forceRefresh={false}>
            <App />
        </BrowserRouter>
    </Provider>
);
