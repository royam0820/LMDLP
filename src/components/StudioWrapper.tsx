'use client'

// Suppress known harmless React 19 / Sanity styled-components prop warnings in development
if (typeof window !== 'undefined') {
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
        const msg = args[0];
        if (
            typeof msg === 'string' &&
            (msg.includes('disableTransition') ||
             msg.includes('React does not recognize') ||
             msg.includes('Extra attributes from the server'))
        ) {
            return;
        }
        originalConsoleError.apply(console, args);
    };
}

import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity.config'

export default function Studio() {
    return <NextStudio config={config} />
}
