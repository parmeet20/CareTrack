import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Web3Provider } from './context/Web3Context.tsx'
import Navbar from './components/shared/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <Web3Provider>
    <Navbar/>
    <App />
  </Web3Provider>,
)
