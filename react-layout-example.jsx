import SharedHeader from '@/components/SharedHeader';

/**
 * Root layout for Next.js (works for both app/ and pages/ router).
 *
 * app/ router:  use this as app/layout.jsx
 * pages/ router: use this as pages/_app.jsx, wrapping <Component {...pageProps} />
 *
 * The padding-top on <main> prevents page content from being hidden
 * behind the sticky header (64px desktop / 56px mobile).
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Injects the shared header into <body> via header.js */}
        <SharedHeader />

        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
