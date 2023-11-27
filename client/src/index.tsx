import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>,
);
