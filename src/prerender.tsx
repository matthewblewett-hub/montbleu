import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export async function prerender(data: { url: string }) {
    const helmetContext: Record<string, unknown> = {};

    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={data.url}>
                <App />
            </StaticRouter>
        </HelmetProvider>
    );

    return {
        html,
        links: new Set<string>(),
    };
}
