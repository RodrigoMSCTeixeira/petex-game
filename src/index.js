import React from "react";
import ReactDOM from "react-dom/client";
import Router from './routes.js';
import './styles/_balls.css'

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)