import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import { UserContextProvider } from "./userContext";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserContextProvider>
                <App/>
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
