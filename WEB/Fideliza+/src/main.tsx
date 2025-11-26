import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <div data-bs-theme="dark">
      <Provider store={store}>
        <BrowserRouter>
          <App data-bs-theme="dark"/>
        </BrowserRouter>
      </Provider>
    </div>
  </StrictMode>,
)
