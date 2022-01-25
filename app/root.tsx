import { Outlet, LiveReload, Links } from 'remix'
import type { LinksFunction } from 'remix'
import globalUrl from './styles/global.css'
import globalMediumUrl from './styles/global-medium.css'
import globalLargeUrl from './styles/global-large.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalUrl },
    { rel: 'stylesheet', href: globalMediumUrl },
    { rel: 'stylesheet', href: globalLargeUrl },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: So great, it's funny!</title>
        <Links />
      </head>
      <body>
        <Outlet />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}
