import './patch-local-storage-for-github-pages';
import './polyfill';

import React, {StrictMode} from 'react'
import { render } from 'react-dom';
import App from './app';
import { SDKProvider } from './components/SDKProvider';
import './index.scss';
import eruda from "eruda";

eruda.init();

render(
  <StrictMode>
    <SDKProvider>
      <App />
    </SDKProvider>
  </StrictMode>,
  document.getElementById('root') as HTMLElement
)
