import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from 'src/app/shared/store'

//导入全局共用的 i18n 实例。
import "src/app/shared/i18n";

//导入全局共用的样式。
import 'src/index.scss';

//导入根组件。
import App from 'src/app/';

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter forceRefresh={false}>
            <App />
        </BrowserRouter>
    </Provider>
);
