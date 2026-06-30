import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../providers/theme-provider';
import { Navbar } from './components/Navbar.tsx';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
