import { render } from 'preact'
import {StrictMode} from 'react'
import { App } from './app.jsx'
import { BrowserRouter } from 'react-router-dom'

render(
<StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
</StrictMode>, document.getElementById('app'))
