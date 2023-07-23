import App from './app/';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import environment from "./environments/environment";

console.log(environment);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
