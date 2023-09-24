import ReactDOM from 'react-dom/client';
import React from 'react';

import './index.css';
import App from './App';
import { CodeContextProvider } from './store/code-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<CodeContextProvider>
		<App />
	</CodeContextProvider>
);
