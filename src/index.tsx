import 'src/platform/register/browser/registerService';
import App from './containers';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
