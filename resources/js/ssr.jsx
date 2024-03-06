import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'MeldSmitte';

createServer((page) =>
  createInertiaApp({
      page,
      render: ReactDOMServer.renderToString,
      title: (title) => `${title} - ${appName}`,
      resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
      setup: ({ App, props }) => {
        return <App {...props} />;
      },
  })
);