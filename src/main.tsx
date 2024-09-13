import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.scss';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css'; // Icons
import './apis/axiosConfig.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
