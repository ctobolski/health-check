import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { environments } from './config.js'

ReactDOM.render(
  <App environments={environments} />,
  document.getElementById('root')
)
