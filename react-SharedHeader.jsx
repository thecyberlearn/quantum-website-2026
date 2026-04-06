import { useEffect } from 'react';

/**
 * SharedHeader
 *
 * Dynamically loads the shared header script from your static site.
 * Renders nothing itself — the script injects the header into <body>.
 *
 * Usage:
 *   import SharedHeader from '@/components/SharedHeader';
 *   // Place it once in your root layout:
 *   <SharedHeader />
 *
 * To bust cache after updating header.js, change the version param:
 *   const HEADER_URL = 'https://quantumtaskai.com/header.js?v=2';
 */

const HEADER_URL = 'https://quantumtaskai.com/header.js';

export default function SharedHeader() {
  useEffect(() => {
    // Avoid loading twice (e.g. StrictMode double-invoke)
    if (document.getElementById('sh-header')) return;
    if (document.querySelector(`script[src="${HEADER_URL}"]`)) return;

    const script = document.createElement('script');
    script.src = HEADER_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up on unmount
      const injectedScript = document.querySelector(`script[src="${HEADER_URL}"]`);
      if (injectedScript) injectedScript.remove();

      const injectedHeader = document.getElementById('sh-header');
      if (injectedHeader) injectedHeader.remove();

      const injectedStyles = document.getElementById('sh-styles');
      if (injectedStyles) injectedStyles.remove();
    };
  }, []);

  return null;
}
