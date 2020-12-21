import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import 'bulma/css/bulma.css';
import dotenv from 'dotenv'
dotenv.config();

ReactDOM.render(<App/>,document.getElementById('root'))

